
// Get the URL String
var parameters = new URL(window.location.href);


// Locates the div container that holds the gallery
var gallery = document.getElementById('gallery');

// Locates the template for the cards
var cardTemplate = document.getElementById("cardTemplate");


// The header that describes the visual cards
var visualHeader;

// The container for the visual cards
var visualCards;

// The header that describes the non visual cards
var nonVisualHeader;

// The container for the non-visual cards
var nonVisualCards;


// If the user is coming from 'create new doc' path
if (sessionStorage.getItem("newDoc"))
    var isNewDoc = parameters.searchParams.get("newDoc");

// If the user just took an image
if (sessionStorage.getItem("image"))
    var tookImage = parameters.searchParams.get("image");



// Injects a single card into the gallery
function displayCard(idIndex, redirectPath, cardTitle, filePath, thumbnailPath) {

    let newCard = cardTemplate.content.cloneNode(true);
    newCard.id = "card" + idIndex;

    newCard.querySelector('.card-title').innerHTML = cardTitle;
    newCard.querySelector('.card-logo').src = `../images/${filePath}`;

    newCard.querySelector('.redirect').href = redirectPath;

    // Appends the thumbnail depending on if card is visual or not
    if (thumbnailPath.length != 0) {
        newCard.querySelector('.card-img-top').src = thumbnailPath;
        visualCards.appendChild(newCard);
    } else {

        newCard.querySelector('.card-img-container').remove();
        nonVisualCards.appendChild(newCard);
    }
    
    return newCard;

}


// Sets up the gallery before displaying the cards
function setupGallery(columns, visualHeaderDesc, nonVisualHeaderDesc) {

    if (visualHeaderDesc.length != 0) {

        // Inserts a header label above the visual cards
        visualHeader = document.createElement("h3");
        visualHeader.innerHTML = visualHeaderDesc;
        visualHeader.id = "visual-header";
        visualHeader.className = "cards-header";

        gallery.appendChild(visualHeader);


        // Inserts a container to display the visual cards in
        visualCards = document.createElement("div");
        visualCards.id = "visual-cards";

        visualCards.className = "row rows-cols-1 g-4";
        visualCards.classList.add("row-cols-md-" + columns);

        gallery.appendChild(visualCards);
        
    }

    if (nonVisualHeaderDesc.length != 0) {

        // Inserts a header label above the non visual cards
        nonVisualHeader = document.createElement("h3");
        nonVisualHeader.innerHTML = nonVisualHeaderDesc;
        nonVisualHeader.id = "non-visual-header";
        nonVisualHeader.className = "cards-header";

        gallery.appendChild(nonVisualHeader);


        // Inserts a container to display the non visual cards in
        nonVisualCards = document.createElement("div");
        nonVisualCards.id = "non-visual-cards";

        nonVisualCards.className = "row rows-cols-1 g-4";
        nonVisualCards.classList.add("row-cols-md-" + columns);

        gallery.appendChild(nonVisualCards);
        
    }

}


// Injects a card for each classroom in the database
function loadClassrooms() {

    firebase.auth().onAuthStateChanged(user => {
        
        // If a user is logged in...
        if (user) {

            var teacherID = db.collection("teachers").doc(user.uid);
            var numOfCards = 0;

            // Loads in the cards when the user first initializes the page
            db.collection("teachers").doc(user.uid)
            .get()
                .then(teacher => {

                    teacherID = teacher.data().teacherid;

                    db.collection("classes")
                    .where("teacherid", "==", teacherID)
                    .get()
                        .then(classrooms => {

                            var header = isNewDoc ? "Select a Classroom..." : "Classrooms";

                            setupGallery(6, "", header);

                            // For each classroom, display a card with a unique ID and the class name in the footer.
                            classrooms.forEach(classroom => {

                                let redirectPath = "students.html?classid=" + classroom.data().classid;

                                if (isNewDoc && sessionStorage.getItem("newDoc"))
                                    redirectPath += "&newDoc=true";

                                if (tookImage && sessionStorage.getItem("image"))
                                    redirectPath += "&image=true";

                                displayCard(numOfCards, redirectPath, classroom.data().name, "classroom-icon.svg", "");

                                numOfCards++;
                        
                            })

                        })  

                });

            // Immediately loads a new card when a user writes a classroom to the database
            db.collection("classes")
                .onSnapshot(classrooms => { 

                    db.collection("classes").where("teacherid", "==", teacherID).orderBy("timestamp")
                    .get()
                        .then(classrooms => {
                            
                            if ( !classrooms.metadata.hasPendingWrites ) {

                                let alreadyCreated = 0;

                                classrooms.forEach(classroom => {

                                    let redirectPath = "students.html?classid=" + classroom.data().classid;

                                    if (isNewDoc && sessionStorage.getItem("newDoc"))
                                        redirectPath += "&newDoc=true";

                                    if (tookImage && sessionStorage.getItem("image"))
                                        redirectPath += "&image=true";
                                    
                                    if (numOfCards <= alreadyCreated) {

                                        displayCard(numOfCards, redirectPath, classroom.data().name, "classroom.svg", "");
                                        numOfCards++;

                                    }
                                    
                                    alreadyCreated++;
            
                                })   

                            }
                             

                        });

                })  

        } else {

            location.href = 'login.html';

        }

    });

}


// Injects a card for each student in the database
function loadStudents() {

    let classID = parameters.searchParams.get("classid");

    var numOfCards = 0;

    // Loads in the cards when the user first initializes the page
    db.collection("students")
    .where("classid", "==", classID)
    .get()
        .then(students => {

            var header = isNewDoc ? "Select a Student..." : "Students";

            setupGallery(6, "", header);

            // For each student, display a card with a unique ID and their full name in the footer.
            students.forEach(std => {

                let fullName = "";
                const name = std.data().name.split(" ");
                
                name.forEach(n => {
                    fullName += n.charAt(0).toUpperCase() + n.slice(1) + " ";
                });

                let redirectPath = "files.html?studentid=" + std.data().studentid;

                if (isNewDoc && sessionStorage.getItem("newDoc"))
                    redirectPath += "&newDoc=true";

                if (tookImage && sessionStorage.getItem("image"))
                    redirectPath += "&image=true";
                
                let card = displayCard(numOfCards, redirectPath, fullName, "student-icon.svg", "");

                numOfCards++;

            })

        });

    // Immediately loads a new card when a user writes a student to the database
    db.collection("students")
    .onSnapshot(students => { 

        db.collection("students").where("classid", "==", classID).orderBy("timestamp")
        .get()
            .then(students => {
                
                if ( !students.metadata.hasPendingWrites ) {

                    let alreadyCreated = 0;

                    students.forEach(std => {

                        let redirectPath = "students.html?classid=" + std.data().classid;

                        if (isNewDoc && sessionStorage.getItem("newDoc"))
                            redirectPath += "&newDoc=true";

                        if (tookImage && sessionStorage.getItem("image"))
                            redirectPath += "&image=true";

                        if (numOfCards <= alreadyCreated) {

                            displayCard(numOfCards, redirectPath, std.data().name, "student.svg", "");
                            numOfCards++;

                        }
                        
                        alreadyCreated++;

                    })   

                }
                 

            });

    })  

}


// Injects a card for each file the student has
function loadFiles() {

    let studentID = parameters.searchParams.get("studentid");

    db.collection("files")
    .where("studentid", "==", studentID)
    .get()
        .then(files => {

            let i = 0;

            setupGallery(6, "Media Files", "Documents");

            // For each file the student has, display a card with a unique ID and the file name in the footer.
            files.forEach(file => {

                let card;

                let redirectPath = "textEditor.html?fileid=" + file.data().fileid;
                
                if (file.data().isvisual) {

                    // Reads the JSON from the database
                    var json = file.data().content;

                    // Converts out of JSON
                    var delta = JSON.parse(json);

                    card = displayCard(i, redirectPath, file.data().filename, "file-icon.svg", delta);

                } else {

                    card = displayCard(i, redirectPath, file.data().filename, "file-icon.svg", "");

                }                

                i++;

            })

            // if db doesn't fill a section with cards, remove that section
            if (!visualCards.hasChildNodes()) {

                visualHeader.remove();
                visualHeader.remove();

            }
            
            if (!nonVisualCards.hasChildNodes()) {

                nonVisualHeader.remove();
                nonVisualCards.remove();

            }

        });

}
