
var speak = document.getElementById('speak');
var texarea = document.getElementById('textarea');
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
speak.addEventListener('click', function () {
  recognition.start();
  textarea.innerHTML = '...speaking';

})

recognition.onresult = function (e) {
  console.log(e);
  var transcript = e.results [0][0].transcript;
  textarea.innerHTML = transcript;

}

