

// I want to get the user information from the database and put them in the form
function populateInfo ()
{

    app.auth().onAuthStateChanged( user =>
    {
        if ( user )
        {
            // go and get the curret user info from firestore
            var currentUser = db.collection( "teachers" ).doc( user.uid );
            console.log(currentUser)
            currentUser.get()
                .then( userDoc =>
                {
                    let userName = userDoc.data().name;
                    let userEmail = userDoc.data().email;
                    //let userCity = userDoc.data().city;

                    if ( userName != null )
                    {
                        document.getElementById( "nameInput" ).value = userName;
                    }
                    if ( userEmail != null )
                    {
                        document.getElementById( "emailInput" ).value = userEmail;
                    }
                    // if ( userCity != null )
                    // { 
                    //     console.log(userCity)
                    //     document.getElementById( "cityInput" ).value = userCity;
                    // }
                } )

        } else
        {
            console.log( "no user is logged in" )
        }
    }

    )

}

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }

 function saveUserInfo() {
    userName = document.getElementById('nameInput').value;
    userEmail = document.getElementById('emailInput').value;
    //userCity = document.getElementById('cityInput').value;

    currentUser.update({
        name: userName,
        email: userEmail,
        //city: userCity
    })
    .then(() => {
        console.log("Document successfully updated!");
    })

    document.getElementById('personalInfoFields').disabled = true;
}