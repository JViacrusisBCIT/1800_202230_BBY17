
var params = new URL(window.location.href);
var fileID = params.searchParams.get("fileid");


var quill = new Quill('#editor', {
  theme: 'snow'
});



function loadText() {

 db.collection("files")
  .where("fileid", "==", fileID)
  .get()
  .then(files => {

    files.forEach(file => {

      let json = file.data().content;

      delta = JSON.parse(json);

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


