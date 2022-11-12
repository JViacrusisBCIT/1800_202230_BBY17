function showUploadedPicture(){
  const fileInput = document.getElementById("mypic-input");   // pointer #1
  const image = document.getElementById("mypic-goes-here");   // pointer #2
      
  //attach listener to input file
  //when this file changes, do something
  fileInput.addEventListener('change', function(e){
      
      //the change event returns a file "e.target.files[0]"
      var blob = URL.createObjectURL(e.target.files[0]);
      
      //change the DOM img element source to point to this file
      image.src = blob;    //assign the "src" property of the "img" tag
 })}
 
showUploadedPicture();
