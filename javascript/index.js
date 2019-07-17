/*
  resources:
  https://www.japan-guide.com/e/e2018.html
  https://www.learn-japanese-adventure.com/japanese-trains.html

  Things needed: 
  number of trains
  train speeds
  stops 
*/

$(document).ready(function() {
  console.log("よろしくね おねがいします。");
  console.log("はじめましょう。");
  console.log("I look forward to working with you​");
  console.log("Let us begin.");

  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);

  var firebaseConfig = {
    apiKey: "AIzaSyBUA3JHYkBzf2xl1xZLt3qmFnFUBymd1KM",
    authDomain: "trainapp-fda47.firebaseapp.com",
    databaseURL: "https://trainapp-fda47.firebaseio.com",
    projectId: "trainapp-fda47",
    storageBucket: "",
    messagingSenderId: "534099270836",
    appId: "1:534099270836:web:a8f5baea92c2d019"
  };

  firebase.initializeApp(firebaseConfig);

  let database = firebase.database();

  // create login for screen
  //openLogin(firebase);

  $("#login-button").on("click", () => {
    $("#train-display").removeClass("d-flex");
    openLogin(firebase);
    $("#login").addClass("d-flex");
  });

  $("#logout-button").on("click", () => {
    firebase.auth().signOut();
  });

  if (user) {
    console.log(user)
    $("#welcome").text("Welcome: " + user.displayName);
  }

  // listen for change on login
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      $("#login").removeClass("d-flex");
      $("#logout-button").addClass("d-flex");
      $("#login-button").removeClass("d-flex");
    } else {
      localStorage.removeItem("user");
      $("#login").removeClass("d-flex");
      $("#logout-button").removeClass("d-flex");
      $("#login-button").addClass("d-flex");
    }
  });

});

//database.ref("/users")
//used to look at directories of the database

/*
  Web page layout

  Login
    - user can login using firebase.

  Train user display
    - see trains based on current station

  Train admin display
    - add a train
        - set direction
        - set type
*/

/*
  Program layout

  state 
    current trains
    language
    modal states
    page/tab

  Firebase Setup

  Firebase event listener tells the page controller the trains have been updated

  timer - updates all trains based on train handler every 60000ms, which will trigger the fb eventlistener

  train handler 
    - handles train based calculations.
    - creates new trains
    - tells firebase to update trains in db

  page handler 
    - handles mapping events to functions
    - updates state  

  page controller
    - tells handler and renderer to update

  page renderer
    - renders/updates page based on current tab && language
    - shows things if a user is logged in
    - sets event listeners based on the rendered page

*/

/*
  Train Schema:

  name: ( Kodama| Hikari )#
  departure-from:
  departure-time:
  direction: (osaka, tokyo)(east or west);

*/

/* 
Train handler

  calculations based on current train station

  get all trains and calculate when the next time they would stop at this station based on speed and distance....
 
  time = distance/speed;

  get trains

  compare departure time to current time 

  find the delta and calculate distance travelled based on speed

  use the starting location to determine where the train should currently be at
     will need to use direction and change direction if the train has turned around at tokyo or osaka.


  
*/

/*
  Allow user to select current station
   
  then don't show trains that wont stop at that station

  kodama stops at all stations but Hikari stops at only a few stations
*/

function distanceMap(userStation, startingStation, currentMileage) {
  const stops = {
    Tokyo: 0,
    Shinagawa: 6.8,
    "Shin-Yokohama": 25.5,
    Odawara: 76.7,
    Atami: 95.4,
    Mishima: 111.3,
    "Shin-Fuji": 135.0,
    Shizuoka: 167.4,
    Kakegawa: 211.3,
    Hamamatsu: 238.9,
    Toyohashi: 274.2,
    "Mikawa-Anjō": 312.8,
    Nagoya: 342.0,
    "Gifu-Hashima": 367.1,
    Maibara: 408.2,
    Kyoto: 476.3,
    "Shin-Ōsaka": 515.4
  };

  let userDistance = stops[userStation];
}

function openLogin(firebase) {
  var uiConfig = {
    signInSuccessUrl: "/",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    signInFlow: 'popup',
    tosUrl: "<your-tos-url>",
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign("<your-privacy-policy-url>");
    }
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start("#firebaseui-auth-container", uiConfig);
}
