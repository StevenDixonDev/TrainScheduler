

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
      setUserInfo(user);
      showTrainManager();
    } else {
      $("#login").removeClass("d-flex");
      $("#logout-button").removeClass("d-flex");
      $("#login-button").addClass("d-flex");
      removeUserInfo();
      hideTrainManager();
    }
  });
})

function openLogin(firebase) {
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

function setUserInfo(user){
  let lan = localStorage.getItem("language");
  let insert = $("<p>");
  insert.attr("id", "generated-user");
  $(insert).attr("data-jp", `ユーザー: ${user.displayName}`);
  $(insert).attr("data-en", `User: ${user.displayName}`);

  if(lan === 'JP'){
    $(insert).text(`ユーザー: ${user.displayName}`);
    $("#login-bar").append(insert);
    //$("login-bar").append(`<p id="generated-user" data-jp="ユーザー: ${user.displayName}" data-en="User: ${user.displayName}">ユーザー: ${user.displayName}</p>`)
  }else{
    $(insert).text(`User: ${user.displayName}`);
    $("#login-bar").append(insert);
    //$("login-bar").append(`<p id="generated-user" data-jp="ユーザー: ${user.displayName}" data-en="User: ${user.displayName}">User: ${user.displayName}</p>`)
  }
}

function removeUserInfo(){
  $("#generated-user").remove();
}

function showTrainManager(){
  $("#train-manager").show()
}
function hideTrainManager(){
  $("#train-manager").hide()
}