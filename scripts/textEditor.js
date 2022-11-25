
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

if (params.searchParams.get("fileid"))
  fileID = params.searchParams.get("fileid");
else
  fileID = "newDoc";



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
console.log(changed);

// Sets changed to true if user changes document
quill.on("text-change", function(delta, oldDelta, source) {

  if (source == "user") {

    sessionStorage.setItem(fileID + '_changed', true);

    console.log("changes made?", sessionStorage.getItem(fileID + '_changed'));

    // Saves everything locally
    saveToSessionStorage();

    confirmation.innerHTML = "";

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

        // Converts to the Delta object
        delta = JSON.parse(json);

        // Puts those contents into quill
        quill.setContents(delta);

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

  confirmation.innerHTML = "saved!";

  sessionStorage.removeItem(fileID);
  sessionStorage.removeItem(fileID + "_changed");

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

  // if (sessionStorage.getItem(fileID)) {

  //   //confirmation.innerHTML = "Click "
  //   sessionStorage.removeItem(fileID);
  //   sessionStorage.removeItem(fileID + "_changed");

  // }  

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
    // continueButton.addEventListener("click", );

  }

}

setupEditor();
