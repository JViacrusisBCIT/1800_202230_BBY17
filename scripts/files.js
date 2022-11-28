var newFileModal = document.getElementById('new-file-modal')
var bsNewFileModal = new bootstrap.Modal(document.getElementById('new-file-modal'), {
    keyboard: false
})
var confirmCreateButton = document.getElementById('confirm-create-button')
// Get the URL String
var parameters = new URL(window.location.href);

// If the user is coming from 'create new doc' path, prompt for file name
var isNewDoc = parameters.searchParams.get("newDoc");
if (isNewDoc && sessionStorage.getItem("newDoc"))
    // toggle file creation modal
    bsNewFileModal.show();
    console.log("modal toggled");
    let modalTitle = newFileModal.querySelector('.modal-title');
    modalTitle.textContent = 'New File';

// confirm file creation 
confirmCreateButton.addEventListener('click', function (event) {
    //hides the file creation modal
    bsNewFileModal.hide();

    let fileNameField = document.getElementById('file-name');
    let fileName = fileNameField.value;
    fileNameField.value = "";

    console.log(fileName);

    writeNewFile(fileName, sessionStorage.getItem("newDoc"));


})

// creates a new file in the firesetore database
function writeNewFile(docName, docContents) {

    db.collection("files").add({
        content: docContents,
        fileid: makeId(7),
        filename: docName,
        filetype: "quill",
        isVisual: "false",
        studentid: parameters.searchParams.get("studentid")
    }).then(() => {
        window.location.replace("files.html?studentid=" + parameters.searchParams.get("studentid"));
    });

    isNewDoc = "";
    sessionStorage.removeItem("newDoc");
    sessionStorage.removeItem("newDoc_changed");

}

// makes a variable number character string using numbers
function makeId(length) {

    var result = 'fl';

    for (var i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }

    return result;

}

