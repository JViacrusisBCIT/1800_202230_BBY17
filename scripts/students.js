const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

var newStudentModal = document.getElementById('new-student-modal')
var confirmCreateButton = document.getElementById('confirm-create-button')


newStudentModal.addEventListener('show.bs.modal', function (event) {
    console.log("modal toggled");
    let modalTitle = newStudentModal.querySelector('.modal-title');
    modalTitle.textContent = 'New Student';
})

confirmCreateButton.addEventListener('click', function (event) {
    console.log("confirm button clicked");
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("user found");

            let studentName = document.getElementById('student-name').value;
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
                    db.collection("students").add({
                        name: studentName,
                        studentid: makeid(),
                        teacherid: teacherID,
                        classid: params.classid
                    }).then(function () {
                        console.log("New student added to firestore");
                    })
                        .catch(function (error) {
                            console.log("Error adding new student: " + error);
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