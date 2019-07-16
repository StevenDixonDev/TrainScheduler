/*
  resources:
  https://www.japan-guide.com/e/e2018.html
  https://www.learn-japanese-adventure.com/japanese-trains.html

  how to format train schedules ????

  Things needed: 
  number of trains
  train speeds
  stops

  
*/

$(document).ready(function(){
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
})

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
  last-stop:
  next-stop: 
  mile:
  mile-to:   
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

 Return the number of milliseconds since 1970/01/01:

  var d = new Date();
  var n = d.getTime();

  need to convert ms into hours (time/(1000*60*60))

 update current mileage based on delta  (if it has been multiple days we are gonna get large numbers)

 if mile is greater than mile-to, the train has passed the stop...

  use while loop to calculate the next stop

  subtract the next stops distance from the total distance until the mile-to is greater than mile
  (we have a list of stops with distances)
  need to check direction during this process because train will need turn around if it arrive at the end of the line...   

  if mile is less than mile-to , the train is still in transit
    set new mileage
    update time to arriaval at current station
    
*/

/*
  Allow user to select current station
   
  then don't show trains that wont stop at that station

  kodama stops at all stations but Hikari stops at only a few stations

*/
