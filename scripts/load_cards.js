// Injects a single card into the gallery
function displayCard(idIndex, cardTitle, fileType, thumbnailPath) {

    let cardTemplate = document.getElementById("cardTemplate");

    let newCard = cardTemplate.content.cloneNode(true);
    newCard.id = idIndex;

    newCard.querySelector('.card-title').innerHTML = cardTitle;
    newCard.querySelector('.card-logo').src = `../images/${fileType}.jpg`;

    if (thumbnailPath.length != 0) {
        displayThumbnail(newCard, thumbnailPath);
    }
    
    document.getElementById('gallery').appendChild(newCard);

    return newCard;

}


// Displays the thumbnail if the card is visual
function displayThumbnail(card, thumbnailPath) {

    console.log(card);
    card.querySelector('.card-img-top').src = '../images/' + thumbnailPath;

}


// Injects a card for each student in the database
function loadStudents(num_of_students) {

    for (let i = 0; i < num_of_students; i++) {

        let card = displayCard(i, "Justin Victor Viacrusis", "image2", "drink2.png");

    }

}

var test_num = 14;

// Calls the inject_navfoot function
loadStudents(test_num);