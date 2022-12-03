

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

                    if ( userName != null )
                    {
                        document.getElementById( "nameInput" ).value = userName;
                    }
                    if ( userEmail != null )
                    {
                        document.getElementById( "emailInput" ).value = userEmail;
                    }

                } )

        } else
        {
            location.href = 'login.html';
        }
    }

    );

}

function editUserInfo() {
    
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }

 function saveUserInfo() {

    app.auth().onAuthStateChanged( user =>{
    userName = document.getElementById('nameInput').value;
    userEmail = document.getElementById('emailInput').value;

    var currentUser = db.collection( "teachers" ).doc( user.uid );

    currentUser.update({
        name: userName,
        email: userEmail,
    })

    document.getElementById('personalInfoFields').disabled = true;
    
})}