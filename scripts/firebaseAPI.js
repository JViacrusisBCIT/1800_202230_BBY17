//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------


const firebaseConfig = {
  apiKey: "AIzaSyCwdmFMGBQ-v4KXMCDzh2EF_r9fIiyDzC0",
  authDomain: "iinsight-32b02.firebaseapp.com",
  projectId: "iinsight-32b02",
  storageBucket: "iinsight-32b02.appspot.com",
  messagingSenderId: "120022641448",
  appId: "1:120022641448:web:dca1161bba52396426fe1d",
  measurementId: "G-KKQMGYJT9W"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
var storage = firebase.storage;
