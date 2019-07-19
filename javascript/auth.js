

$(document).ready(function(){

  $("#login-button").on("click", () => {
    $("#train-display").removeClass("d-flex");
    openLogin(firebase);
    $("#login").addClass("d-flex");
  });

  $("#logout-button").on("click", () => {
    firebase.auth().signOut();
  });


  // listen for change on login
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $("#login").removeClass("d-flex");
      $("#logout-button").addClass("d-flex");
      $("#login-button").removeClass("d-flex");
      $("#welcome").text("Welcome: " + user.displayName);
    } else {
      $("#login").removeClass("d-flex");
      $("#logout-button").removeClass("d-flex");
      $("#login-button").addClass("d-flex");
      $("#welcome").text("");
    }
  });
})

function openLogin(firebase) {
  var uiConfig = {
    signInSuccessUrl: `${window.location.pathname}`, // needs to be changed if in github ... 
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    signInFlow: 'popup',
    callbacks: {
    signInFailure: (code)=>{console.log(code); return handleUIError(code);}
    }
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start("#firebaseui-auth-container", uiConfig);
}