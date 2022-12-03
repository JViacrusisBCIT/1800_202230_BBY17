
// Get the file ID from the URL
var params = new URL(window.location.href);
var fileID;

// Gets/Sets the FileID variable
if (params.searchParams.get("fileid"))
  fileID = params.searchParams.get("fileid");
else
  fileID = "newDoc";

  
// Sets up the speech recognition
var speak = document.getElementById('speak');
var textarea = document.getElementById("editor");
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();


// Finds the quill object
var quill = Quill.find(textarea);


// The current contents in the text editor
var delta;

// What the user says
var transcript;
  
  
// Activates the speech function
function activateSpeech () {

  transcript = 0;
  
  // stores the content so we don't lose it
  delta = quill.getContents();

  recognition.start();
  quill.setText("...speaking");

}


// When the app obtains speech content from the user
recognition.onresult = function (e) {

  transcript = e.results [0][0].transcript;

  quill.setContents(delta);

  // Adds the speech text to the end of the contents in the quill
  if (transcript)
    quill.insertText(quill.getText().length, transcript, "api");

  // Saves to session storage because the user made a change
  saveToSessionStorage();

}


// If app does not pick up speech, put back the quill's contents
recognition.onend = function (e) {

  if (!transcript)
    quill.setContents(delta);

}


// Sets up the automatic activation of speech when the user clicks the voice tile on the main page
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
