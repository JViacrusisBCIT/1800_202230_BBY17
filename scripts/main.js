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
                    // let userEmail = userDoc.data().email;
                    //let userCity = userDoc.data().city;

                    if ( userName != null )
                    {
                        document.getElementById( "name-welcome" ).innerHTML = "Welcome, " + userName ;
                    }
                    // if ( userEmail != null )
                    // {
                    //     document.getElementById( "emailInput" ).value = userEmail;
                    // }
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
populateInfo()
// console.log("hello")
// document.getElementById( "name-welcome" ).innerHTML = "Welcomedfgfdfgvcf";