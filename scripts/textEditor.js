
// Declaring variables for discard functionality
var discardButton = document.getElementById("discard");
var cancelButton = document.getElementById("cancel");
var warning = document.getElementById("warning");

// Declaring variables for saving text
var continueButton = document.getElementById("continue");
var confirmation = document.getElementById("confirmation");



// Get the file ID from the URL
var params = new URL(window.location.href);
var fileID;

if (params.searchParams.get("fileid")) {

  fileID = params.searchParams.get("fileid");

} else {

  fileID = "newDoc";
  console.log("removing visual-head and visual");
  document.getElementById("visual-head").remove();
  document.getElementById("visual").remove();

}





// Creates a new quill object
var quill = new Quill('#editor', {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ]
  },
  placeholder: 'Add some text and images...',
  theme: 'snow'
});



// If user has changed that document
var changed = sessionStorage.getItem(fileID + '_changed');


// Sets changed to true if user changes document
quill.on("text-change", function(delta, oldDelta, source) {

  if (source == "user") {

    sessionStorage.setItem(fileID + '_changed', true);

    // Saves everything locally
    saveToSessionStorage();

    warning.innerHTML = "";
    confirmation.innerHTML = "";
    discardButton.innerHTML = "Discard Changes";
    cancelButton.hidden = true;

  }

});



// Takes the JSON of content in the database and displays it in quill.
function loadFromDatabase() {
  
  console.log("load from database");

  db.collection("files")
    .where("fileid", "==", fileID)
    .get()
    .then(files => {

      files.forEach(file => {

        // Reads the JSON from the database
        let json = file.data().content;

        // Converts out of JSON
        delta = JSON.parse(json);

        if (file.data().isvisual) {

          console.log(delta);

          document.getElementById("visual-head").innerHTML = file.data().filename;
          document.getElementById("visual").src = delta;

          document.getElementById("nonvisual").remove();

        } else {

          console.log("removing visual-head and visual");
          document.getElementById("visual-head").remove();
          document.getElementById("visual").remove();

          // Puts those contents into quill
          quill.setContents(delta);

        }     
        

      });

    });

}


// Takes the content in the text editor and writes it to the database.
function saveToDatabase(json) {

  console.log("save to database");

  // Delta Object
  let delta = quill.getContents();
  
  // Convert to JSON
  var json = JSON.stringify(delta);

  db.collection("files")
  .where("fileid", "==", fileID)
  .get()
      .then(files => {

        files.forEach(file => {

          db.collection("files").doc(file.id).update({
            content: json
          });
          
        });

      });

  // if doc exists and changes have been made
  if (fileID != "newDoc" && sessionStorage.getItem(fileID)) {

    confirmation.innerHTML = "saved!";
    sessionStorage.removeItem(fileID);
    sessionStorage.removeItem(fileID + "_changed");

  } else {

    confirmation.innerHTML = "No changes have been made!";

  }

}


// Loads the text from the session storage
function loadFromSessionStorage() {

  console.log("load from session storage");

  // Reads the JSON from the session storage
  let json = sessionStorage.getItem(fileID);

  // Converts to the Delta object
  delta = JSON.parse(json);

  // Puts those contents into quill
  quill.setContents(delta);

}


// Saves the text to the session storage (automatic!)
function saveToSessionStorage() {

  // Delta Object
  let delta = quill.getContents();

  // Convert to JSON
  var json = JSON.stringify(delta);

  // Puts the text editor contents into the session's storage
  sessionStorage.setItem(fileID, json);

  console.log("saved to session storage", sessionStorage.getItem(fileID));
  
}


function discardChanges(choice) {

  // if the new document is empty OR if an existing document has not been modified
  if (quill.getText() == "\n" || fileID != "newDoc" && !sessionStorage.getItem(fileID)) {
    
    warning.innerHTML = "No changes to discard!";
    
    if (sessionStorage.getItem(fileID)) {
      sessionStorage.removeItem(fileID);
      sessionStorage.removeItem(fileID + "_changed");
    }

  }

  if (sessionStorage.getItem(fileID)) {

    // first time user discards changes
    if (choice == "discard" && cancelButton.hidden == true) {

      discardButton.innerHTML = "Confirm";
      cancelButton.hidden = false;
      warning.innerHTML = "Are you sure you would like to discard your changes?";

    } 
    // second time when user clicks confirm
    else if (choice == "discard" && cancelButton.hidden == false) {

      sessionStorage.removeItem(fileID);
      sessionStorage.removeItem(fileID + "_changed");

      warning.innerHTML = "Changes discarded.";
      quill.setContents("");

      discardButton.innerHTML = "Discard Changes";
      cancelButton.hidden = true;

      if (fileID != "newDoc")
        loadFromDatabase();

    } else if (choice == "cancel") {

      discardButton.innerHTML = "Discard Changes";
      cancelButton.hidden = true;
      warning.innerHTML = "Cancelled!";

    }

  } 

}


// Runs a different course of action depending on whether its a new or existing file.
function setupEditor() { 

  cancelButton.hidden = true;

  // if file is not a new document
  if (fileID != "newDoc") {

    if (changed)
      // gets those changes
      loadFromSessionStorage();
    else if (!changed)
      // gets the content from the database
      loadFromDatabase();

    continueButton.innerHTML = "Save";
    continueButton.addEventListener("click", saveToDatabase);

  } 
  // if the file is a new document
  else {

    loadFromSessionStorage();

    continueButton.innerHTML = "Next";

    // when users clicks next it will bring them to the classrooms page
    continueButton.addEventListener("click", () => {

      // checks if empty
      // quill automatically puts \n at the end of their deltas even if no content
      if (quill.getText() == "\n") {

        confirmation.innerHTML = "Cannot save empty file!";

      } else {

        window.location.href = "../pages/classrooms.html?newDoc=true";

      }

    });

  }

}

setupEditor();
