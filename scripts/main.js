// I want to get the user information from the database and put them in the form
function populateInfo ()
{

    app.auth().onAuthStateChanged( user =>
    {
        if ( user )
        {
            // go and get the curret user info from firestore
            var currentUser = db.collection( "teachers" ).doc( user.uid );

            currentUser.get()
                .then( userDoc =>
                {
                    let userName = userDoc.data().name;

                    if ( userName != null )
                    {
                        document.getElementById( "name-welcome" ).innerHTML = "Welcome, <br>" + userName ;
                    }

                } )

        } else
        {
            console.log( "no user is logged in" )
        }
    }

    );

}
populateInfo();