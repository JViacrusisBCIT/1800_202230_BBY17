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



// Injects a single card into the gallery
function displayCard(idIndex, redirectPath, cardTitle, filePath, thumbnailPath) {

    let newCard = cardTemplate.content.cloneNode(true);
    newCard.id = "card" + idIndex;

    newCard.querySelector('.card-title').innerHTML = cardTitle;
    newCard.querySelector('.card-logo').src = `../images/${filePath}`;

    newCard.querySelector('.redirect').href = redirectPath;


    if (thumbnailPath.length != 0) {
        newCard.querySelector('.card-img-top').src = '../images/' + thumbnailPath;
        visualCards.appendChild(newCard);
    } else {
        newCard.querySelector('.card-img-top').remove();
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

    let teacherID = "XyqAS0lwHQX5Uz9IUYN6";

    db.collection("classes")
    .where("teacherid", "==", teacherID)
    .get()
        .then(classrooms => {

            let i = 0;

            setupGallery(6, "", "Classrooms");

            // For each classroom, display a card with a unique ID and the class name in the footer.
            classrooms.forEach(clsrm => {

                let redirectPath = "students.html?classid=" + clsrm.data().classid;

                let card = displayCard(i, redirectPath, clsrm.data().name, "user.svg", "");

                i++;

            })

        });
}


// Injects a card for each student in the database
function loadStudents() {

    let params = new URL(window.location.href);
    let classID = params.searchParams.get("classid");

    db.collection("students")
    .where("classid", "==", classID)
    .get()
        .then(students => {

            let i = 0;

            setupGallery(6, "", "Students");

            // For each student, display a card with a unique ID and their full name in the footer.
            students.forEach(std => {

                let fullName = "";
                const name = std.data().name.split(" ");
                
                name.forEach(n => {
                    fullName += n.charAt(0).toUpperCase() + n.slice(1) + " ";
                });

                let redirectPath = "files.html?studentid=" + std.data().studentid;

                let card = displayCard(i, redirectPath, fullName, "user.svg", "");

                i++;

            })

        });

}


// Injects a card for each file the student has
function loadFiles() {

    let params = new URL(window.location.href);
    let studentID = params.searchParams.get("studentid");

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

                    card = displayCard(i, redirectPath, file.data().filename, "user.svg", "drink1.png");

                } else {

                    card = displayCard(i, redirectPath, file.data().filename, "user.svg", "");

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
