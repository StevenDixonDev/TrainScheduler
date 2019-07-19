/*
  Implements functionality for Train scheduling

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
  return stops[userStation] || 0;
}

/*
  At any point if a train is further than 515.4 it has passed its starting station
  
  train starts in kyoto 476.3
  train travels 100 miles
  (476.3 + 100) - 515.4 = 60.9
  puts the train between yokohama and odawara 

  we can get the arrival time to odawara by subtracting the current milleage from the distance to 
  76.7 - 60.9 = 15.1 / speed(175 mph)

*/

function trainFactory(){
  // makes trains?
}








