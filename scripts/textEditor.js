
// Get the file ID from the URL
var params = new URL(window.location.href);

if (params.searchParams.get("fileid"))
  var fileID = params.searchParams.get("fileid");



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
var changed = sessionStorage.getItem('changed');
console.log(changed);

// Sets changed to true if user changes document
quill.on("text-change", function(delta, oldDelta, source) {

  if (source == "user") {

    sessionStorage.setItem('changed', true);

    console.log("changes made?", sessionStorage.getItem('changed'));

    // Saves everything locally
    saveToSessionStorage();

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

  var confirmation = document.getElementById("confirmation");
  confirmation.innerHTML = "saved!";


}


// Loads the text from the session storage
function loadFromSessionStorage() {

  console.log("load from session storage");

  // Reads the JSON from the session storage
  let json = sessionStorage.getItem("documentContents");

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
  sessionStorage.setItem('documentContents', json);

  console.log("saved to session storage", sessionStorage.getItem('documentContents'));
  
}


// Runs a different course of action depending on whether its a new or existing file.
function determineExistence() { 
  
  var saveButton = document.getElementById("save");
  var nextButton = document.getElementById("next");

  // if the file already exists
  if (fileID) {

    console.log("file exists!");

    if (changed)
      // gets those changes
      loadFromSessionStorage();
    else if (!changed)
      // gets the content from the database
      loadFromDatabase();

    saveButton.addEventListener("click", saveToDatabase);
    nextButton.remove();

  } 
  // if the file does not yet exist
  else {

    console.log("new file.");

    loadFromSessionStorage();

    saveButton.remove();
    // nextButton.addEventListener("click", );

  }

}

determineExistence();
