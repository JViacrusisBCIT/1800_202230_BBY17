var newClassroommodal = document.getElementById('new-classroom-modal')
var confirmCreateButton = document.getElementById('confirm-create-button')


newClassroommodal.addEventListener('show.bs.modal', function (event) {
  console.log("modal toggled");
  // Button that triggered the modal
  let button = event.relatedTarget;
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  let modalTitle = newClassroommodal.querySelector('.modal-title');

  modalTitle.textContent = 'New Classroom';
})

confirmCreateButton.addEventListener('click', function (event) {
  console.log("confirm button clicked");

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log("user found");

      let className = document.getElementById('class-name').value;
      console.log(user.uid);
      db.collection("teachers").doc(user.uid).get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("doc exists")
          console.log(doc.data().teacherid)
          return doc.data().teacherid;
        } else {
          console.log("teacher doc not found");
        }
      }).then(function(teacherID){
        db.collection("classes").add({         //write to firestore. We are using the UID for the ID in users collection
          name: className,                    //"users" collection
                                   //with authenticated user's ID (user.uid)
          classid: makeid(),                      //optional default profile info                                //optional default profile info
          teacherid: teacherID
        }).then(function () {
          console.log("New class added to firestore");
        })
          .catch(function (error) {
            console.log("Error adding new classroom: " + error);
          })
      }
      );
    } else {
      console.log("no user is logged in")
    }
  }

  )
})

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