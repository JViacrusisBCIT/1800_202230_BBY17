var newClassroomModal = document.getElementById('new-classroom-modal')
var bsNewClassroomModal = new bootstrap.Modal(document.getElementById('new-classroom-modal'), {
  keyboard: false
})
var confirmCreateButton = document.getElementById('confirm-create-button')
newClassroomModal.addEventListener('show.bs.modal', function (event) {
  console.log("modal toggled");
  let modalTitle = newClassroomModal.querySelector('.modal-title');
  modalTitle.textContent = 'New Classroom';
})

confirmCreateButton.addEventListener('click', function (event) {
  console.log("confirm button clicked");
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log("user found");

      let className = document.getElementById('class-name').value;
      document.getElementById('class-name').value = "";
      bsNewClassroomModal.hide();
      console.log(user.uid);
      db.collection("teachers").doc(user.uid).get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("doc exists")
            console.log(doc.data().teacherid)
            return doc.data().teacherid;
          } else {
            console.log("teacher doc not found");
          }
        }).then(function (teacherID) {
          db.collection("classes").add({          
            name: className,                                           
            classid: makeid(),                    
            teacherid: teacherID,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
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
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  var idlen = 20;
  for (var i = 0; i < idlen; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}