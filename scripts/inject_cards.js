// Injects cards into the gallery
function inject_cards(num_of_students) {

    const gallery = document.getElementById('gallery');

    for (let i = 0; i < num_of_students; i++) {

        const currentCard = document.createElement('div');
        currentCard.className = 'col';
        currentCard.id = 'card' + i;

        gallery.appendChild(currentCard);

        console.log($('#' + currentCard.id).load('../text/card_template.html'));

    }

    
}

var test_num = 14;

// Calls the inject_navfoot function
inject_cards(test_num);