// Injects a single card into the gallery
function displayCard(idIndex, cardTitle, filePath, thumbnailPath) {

    let cardTemplate = document.getElementById("cardTemplate");

    let newCard = cardTemplate.content.cloneNode(true);
    newCard.id = "card" + idIndex;

    newCard.querySelector('.card-title').innerHTML = cardTitle;
    newCard.querySelector('.card-logo').src = `../images/${filePath}`;

    if (thumbnailPath.length != 0) {
        newCard.querySelector('.card-img-top').src = '../images/' + thumbnailPath;
    } else {
        newCard.querySelector('.card-img-top').remove();
    }
    
    document.getElementById('gallery').appendChild(newCard);

    return newCard;

}


// Injects a card for each student in the database
function loadStudents() {

    db.collection("temp-students").get()
        .then(students => {

            let i = 0;

            // For each student, display a card with a unique ID and their full name in the footer.
            students.forEach(std => {

                let firstName = std.data().firstname.charAt(0).toUpperCase() + std.data().firstname.slice(1);
                let lastName = std.data().lastname.charAt(0).toUpperCase() + std.data().lastname.slice(1);
                let fullName = firstName + " " + lastName;

                let card = displayCard(i, fullName, "user.svg", "drink2.png");

                i++;

            })

        });

}

// Calls the inject_navfoot function
loadStudents();