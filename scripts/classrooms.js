var newClassroomModal = document.getElementById('new-classroom-modal')
var bsNewClassroomModal = new bootstrap.Modal(document.getElementById('new-classroom-modal'), {
    keyboard: false
})
var confirmCreateButton = document.getElementById('confirm-create-button')

// toggle classroom creation modal
newClassroomModal.addEventListener('show.bs.modal', function (event) {
    console.log("modal toggled");
    let modalTitle = newClassroomModal.querySelector('.modal-title');
    modalTitle.textContent = 'New Classroom';
})

// confirm classroom creation
confirmCreateButton.addEventListener('click', function (event) {

    //hides the classroom creation modal
    bsNewClassroomModal.hide();

    let classNameField = document.getElementById('class-name');
    let className = classNameField.value;
    classNameField.value = "";

    getTeacherIdFromCurUser((teacherId) => {
        // if student list was not provided, just create a single classroom,
        // otherwise, make a whole bunch of classrooms
        let fileInputField = document.getElementById('myfile');

        if (fileInputField.files.length == 0) {
            createClassroom(className, teacherId, () => { });
        } else {
            createClassroom(className, teacherId, (classId) => {
                const reader = new FileReader();

                reader.onload = () => {
                    console.log(reader.result);
                    let nameIdPairs = reader.result.split(/,\r\n/);
                    nameIdPairs.forEach((item) => {
                        pairArr = item.split(", ");
                        let studentName = pairArr[0].trim();
                        let studentId = pairArr[1].trim();
                        createStudent(studentName, studentId, classId, teacherId);
                        // deleteStudentByName(studentName);
                    })
                };

                reader.readAsText(fileInputField.files[0])
            });
        }
    });


})

// creates a classroom in the firesetore database
function createClassroom(cName, teacherId, callback) {
    console.log(teacherId);
    let cId = makeId();
    db.collection("classes").add({
        name: cName,
        classid: cId,
        teacherid: teacherId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    callback(cId);
}

// creates a student in the firesetore database
function createStudent(sName, sId, classId, teacherId) {
    console.log(teacherId);
    db.collection("students").add({
        name: sName,
        studentid: sId,
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

// function deleteStudentByName(name) {

//     getTeacherIdFromCurUser((teacherId) => {
//         db.collection("students")
//             .where("name", "==", name)
//             .get()
//                 .then((students) => {
//                     students.forEach(std => {
//                         console.log(std.data().name);
//                         std.ref.delete();
//                     });
//                 })
//     })
// }
