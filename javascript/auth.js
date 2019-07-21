/*
  Handle the authentication from firebase
*/

$(document).ready(function () {
  // setup listener for login button
  $("#login-button").on("click", () => {
    // hide the page for the login
    $("#train-display").removeClass("d-flex");
    // use firebase ui to handle login 
    openLogin(firebase);
    // show the login screen
    $("#login").addClass("d-flex");
  });

  // handle logging out when user clicks on logout button
  $("#logout-button").on("click", () => {
    firebase.auth().signOut();
  });


  // listen for change on login
  firebase.auth().onAuthStateChanged(function (user) {
    // if the user is logged in
    if (user) {
      $("#login").removeClass("d-flex");
      $("#logout-button").addClass("d-flex");
      $("#login-button").removeClass("d-flex");
      setUserInfo(user);
      showTrainManager();
    } else {
      // if the user is logged out
      $("#login").removeClass("d-flex");
      $("#logout-button").removeClass("d-flex");
      $("#login-button").addClass("d-flex");
      // remove the users info from the dom
      removeUserInfo();
      // hide the add a train form
      hideTrainManager();
    }
  });
})

function openLogin(firebase) {
  // firebase ui config
  var uiConfig = {
    signInSuccessUrl: `${window.location.pathname}`, // needs to be changed if in github ... 
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    signInFlow: 'popup',
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start("#firebaseui-auth-container", uiConfig);
}

function setUserInfo(user) {
  // get the current language to set the user info
  let lan = localStorage.getItem("language");
  // create a temp p element
  let insert = $("<p>");
  // set attritbutes based on user info 
  insert.attr("id", "generated-user");
  $(insert).attr("data-jp", `ユーザー: ${user.displayName}`);
  $(insert).attr("data-en", `User: ${user.displayName}`);
  // handle setting the user infor based on language
  if (lan === 'JP') {
    $(insert).text(`ユーザー: ${user.displayName}`);
    $("#login-bar").append(insert);
  } else {
    $(insert).text(`User: ${user.displayName}`);
    $("#login-bar").append(insert);
  }
}

function removeUserInfo() {
  $("#generated-user").remove();
}

function showTrainManager() {
  $("#train-manager").show()
}
function hideTrainManager() {
  $("#train-manager").hide()
}