// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";


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



//'file' comes from the Blob or File API
uploadBytes(media, file).then((snapshot) => {
  console.log('Uploaded a blob or file!');
})

const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
uploadBytes(storageRef, bytes).then((snapshot) => {
  console.log('Uploaded an array!');
});

// Raw string is the default if no format is provided
const message = 'This is my message.';
uploadString(storageRef, message).then((snapshot) => {
  console.log('Uploaded a raw string!');
});

// Base64 formatted string
const message2 = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
uploadString(storageRef, message2, 'base64').then((snapshot) => {
  console.log('Uploaded a base64 string!');
});

// Base64url formatted string
const message3 = '5b6p5Y-344GX44G-44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
uploadString(storageRef, message3, 'base64url').then((snapshot) => {
  console.log('Uploaded a base64url string!');
});

// Data URL string
const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
uploadString(storageRef, message4, 'data_url').then((snapshot) => {
  console.log('Uploaded a data_url string!');
});

uploadBytes()
uploadString()
