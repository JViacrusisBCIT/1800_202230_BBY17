function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  var idlen = 20;
  for ( var i = 0; i < idlen; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {

      var user = authResult.user;                           
      if (authResult.additionalUserInfo.isNewUser) {         
        db.collection("teachers").doc(user.uid).set({         
          name: user.displayName,                             
          email: user.email,                             
          teacherid: makeid(),                              
        }).then(function () {
          window.location.assign("main.html");                
        })
          .catch(function (error) {
            console.log("Error adding new user: " + error);
          });
      } else {
        return true;
      }
      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'main.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);