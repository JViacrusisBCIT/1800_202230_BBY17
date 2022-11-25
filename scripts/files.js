// Get the URL String
var parameters = new URL(window.location.href);

// If the user is coming from 'create new doc' path
var isNewDoc = parameters.searchParams.get("newDoc");



if (isNewDoc && sessionStorage.getItem("newDoc"))
    writeNewFile(sessionStorage.getItem("newDoc"));



// creates a new file in the firesetore database
function writeNewFile(docContents) {

    db.collection("files").add({
        content: docContents,
        fileid: makeId(7),
        filename: "my new document",
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


// makes a 20 character string using uppers, lowers, and numbers
function makeId(length) {

    var result = 'fl';

    for (var i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }

    return result;

}
