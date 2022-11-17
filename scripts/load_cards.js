// Locates the div container that holds the gallery
var gallery = document.getElementById('gallery');

// The container for the visual cards
var visualCards;

// The container for the non-visual cards
var nonVisualCards;

// Locates the template for the cards
var cardTemplate = document.getElementById("cardTemplate");


// Injects a single card into the gallery
function displayCard(idIndex, cardTitle, filePath, thumbnailPath) {

    let newCard = cardTemplate.content.cloneNode(true);
    newCard.id = "card" + idIndex;

    newCard.querySelector('.card-title').innerHTML = cardTitle;
    newCard.querySelector('.card-logo').src = `../images/${filePath}`;


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
        let visualHeader = document.createElement("h3");
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
        let nonVisualHeader = document.createElement("h3");
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


// Injects a card for each student in the database
function loadStudents() {

    db.collection("temp-students").get()
        .then(students => {

            let i = 0;

            setupGallery(6, "", "Students");

            // For each student, display a card with a unique ID and their full name in the footer.
            students.forEach(std => {

                let firstName = std.data().firstname.charAt(0).toUpperCase() + std.data().firstname.slice(1);
                let lastName = std.data().lastname.charAt(0).toUpperCase() + std.data().lastname.slice(1);
                let fullName = firstName + " " + lastName;

                let card = displayCard(i, fullName, "user.svg", "");

                i++;

            })

        });

}


// Injects a card for each classroom in the database
function loadClassrooms() {

    db.collection("temp-classrooms").get()
        .then(classrooms => {

            let i = 0;

            setupGallery(6, "", "Classrooms");

            // For each classroom, display a card with a unique ID and the class name in the footer.
            classrooms.forEach(clsrm => {

                let card = displayCard(i, "Classroom " + clsrm.data().homeroomid, "user.svg", "");

                i++;

            })

        });

}
