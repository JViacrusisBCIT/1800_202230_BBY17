
// Get the file ID from the URL
var params = new URL(window.location.href);
var fileID;

if (params.searchParams.get("fileid"))
  fileID = params.searchParams.get("fileid");
else
  fileID = "newDoc";

  
var speak = document.getElementById('speak');
var textarea = document.getElementById("editor");
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

var quill = Quill.find(textarea);
 
var delta;
var transcript;
  
  
function activateSpeech () {

  transcript = 0;
  delta = quill.getContents();
  recognition.start();
  quill.setText("...speaking");

}



recognition.onresult = function (e) {
  console.log(e);
  transcript = e.results [0][0].transcript;

  quill.setContents(delta);

  if (transcript)
    quill.insertText(quill.getText().length, transcript, "api");

  saveToSessionStorage();

}


recognition.onend = function (e) {

  if (!transcript)
    quill.setContents(delta);

}


var params = new URL(window.location.href);

if (params.searchParams.get("voice"))
  activateSpeech();





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
