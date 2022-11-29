
var speak = document.getElementById('speak');
var textarea = document.getElementById("editor");
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
/*speak.addEventListener('click', */
function activateSpeech () {
  recognition.start();
  textarea.innerHTML = '...speaking';

}

activateSpeech();

recognition.onresult = function (e) {
  console.log(e);
  var transcript = e.results [0][0].transcript;
  textarea.innerHTML = transcript;

}

