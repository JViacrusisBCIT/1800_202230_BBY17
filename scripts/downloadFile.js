// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, ref } from "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwdmFMGBQ-v4KXMCDzh2EF_r9fIiyDzC0",
  authDomain: "iinsight-32b02.firebaseapp.com",
  projectId: "iinsight-32b02",
  storageBucket: "iinsight-32b02.appspot.com",
  messagingSenderId: "120022641448",
  appId: "1:120022641448:web:dca1161bba52396426fe1d",
  measurementId: "G-KKQMGYJT9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();


//Create a reference
const storageRef = ref(storage, 'images');
const mediaRef = ref(storage, 'images/media.jpg');


//Downloading Files
getDownloadURL(ref(storage, 'images/media.jpg'))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    const img = document.getElementById('myimg');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  });




