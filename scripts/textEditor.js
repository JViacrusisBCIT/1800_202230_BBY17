
// Get the file ID from the URL
var params = new URL(window.location.href);
var fileID = params.searchParams.get("fileid");


// Creates a new quill object
var quill = new Quill('#editor', {
  theme: 'snow'
});


// Takes the JSON of content in the database and displays it in quill.
function loadText() {

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
function saveText() {

  // Delta Object
  let delta = quill.getContents();
  
  // Convert to JSON
  let json = JSON.stringify(delta);

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

}

loadText();
