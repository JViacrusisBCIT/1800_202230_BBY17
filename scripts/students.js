const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

var newStudentModal = document.getElementById('new-student-modal')
var bsNewStudentModal = new bootstrap.Modal(document.getElementById('new-student-modal'), {
    keyboard: false
})
var confirmCreateButton = document.getElementById('confirm-create-button')


newStudentModal.addEventListener('show.bs.modal', function (event) {
    console.log("modal toggled");
    let modalTitle = newStudentModal.querySelector('.modal-title');
    modalTitle.textContent = 'New Student';
})

confirmCreateButton.addEventListener('click', function (event) {

    //hides the classroom creation modal
    bsNewStudentModal.hide();

    let studentNameField = document.getElementById('student-name');
    let studentName = studentNameField.value;
    studentNameField.value = "";

    getTeacherIdFromCurUser((teacherId) => {
        createStudent(studentName, params.classid, teacherId)
    });


})

// creates a student in the firesetore database
function createStudent(sName, classId, teacherId) {
    console.log(teacherId);
    db.collection("students").add({
        name: sName,
        studentid: makeId(),
        classid: classId,
        teacherid: teacherId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
}

// get the teacherID of the currently logged on user
function getTeacherIdFromCurUser(callback) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("teachers").doc(user.uid)
                .get()
                .then((doc) => {
                    callback(doc.data().teacherid);
                });
        } else {
            console.log("no user is logged in");
            return null;
        }
    });
}

// makes a 20 character string using uppers, lowers, and numbers
function makeId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var idlen = 20;
    for (var i = 0; i < idlen; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}