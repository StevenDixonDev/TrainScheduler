/*
  Implements functionality for Train scheduling

  resources:
  https://www.japan-guide.com/e/e2018.html
  https://www.learn-japanese-adventure.com/japanese-trains.html

*/

$(document).ready(function () {
  console.log("よろしくね おねがいします。");
  console.log("はじめましょう。");
  console.log("I look forward to working with you​");
  console.log("Let us begin.");

  let trainList = [];

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

  database.ref("/trains").on('child_added', function (data) {
    trainList.push(data.val());
    addTrainToList(data.val())
  })

  let trainUpdater = setInterval(()=>{
    updateTrains(trainList);
  }, 60000);
});



function getStops(trainType) {
  let stations = [];
  if(trainType === "Kodama"){
    stations = ["Tokyo", "Shinagawa", "Shin-Yokohama", "Odawara", "Atami", "Mishima", "Shin-Fuji", "Shizouka", "Kakegawa", "Hamamatsu", "Toyohashi" ,"Mikawa-Anjō", "Nagoya", "Gifu-hashima", "Maibara", "Kyoto", "Shin-Ōsaka"];
  }else{
    stations = ["Tokyo", "Shinagawa", "Shin-Yokohama", "Odawara", "Atami", "Mishima", "Shizouka", "Hamamatsu", "Nagoya", "Maibara", "Kyoto", "Shin-Ōsaka"];
  }
  const stops = trainMap();
  let mappedStops = stations.reduce((acc, cur)=>{
    if(stops[cur] !== undefined){
      acc[cur] = stops[cur];
    }
    return acc;
  }, {});
  return mappedStops;
}

function trainMap(){
  return {
    "Tokyo": 0,
    "Shinagawa": 6.8,
    "Shin-Yokohama": 25.5,
    "Odawara": 76.7,
    "Atami": 95.4,
    "Mishima": 111.3,
    "Shin-Fuji": 135.0,
    "Shizuoka": 167.4,
    "Kakegawa": 211.3,
    "Hamamatsu": 238.9,
    "Toyohashi": 274.2,
    "Mikawa-Anjō": 312.8,
    "Nagoya": 342.0,
    "Gifu-Hashima": 367.1,
    "Maibara": 408.2,
    "Kyoto": 476.3,
    "Shin-Ōsaka": 515.4
  };
}

function getDistance(train){
  const currentTime = moment(new Date());
  const lastTime = moment(train.date);
  const hours = moment.duration(currentTime.diff(lastTime)).asHours();
  const speed = 175;
  return (hours * speed);
}

function getRemainingDistance(rate, distance, train){
  let tempD = parseInt(distance);
  let currentDir = train.direction;
  while (tempD - rate > 0) {
    tempD = tempD - rate;
    currentDir = {"East": "West", "West": "East"}[currentDir];
  }
  console.log(train.name, train.direction, currentDir)
  return {distance: tempD, direction: currentDir};
}

function trainCalculator(train) {
  // edge case if user selects first or last stop in the opposite direction
  if(train.direction === "East" && train.stop === "Tokyo"){
    train.direction = "West";
  }else if(train.direction === "West" && train.stop === "Shin-Ōsaka") {
    train.direction = "East";
  }
  // get the dinstance delta distance or how far the train has travelled since starting
  const distance = getDistance(train);
  const rate = 514.4;
  const speed = 175;
  const calculatedDD = getRemainingDistance(rate, distance, train);
  let cdistance = calculatedDD.distance;
  let cDirection = calculatedDD.direction;
  //console.log(train.name, cdistance, cDirection)
  // get the stops object
  let map = getStops(train.type);
  // get the keys which are locations
  let stops = Object.keys(map);

  let currentMile = 0;
  if (cDirection === 'West') {    
    currentMile = cdistance;
  }
  if (cDirection === 'East') { 
    currentMile = 515.4 - cdistance;
  }

  let nextStop = "";
  
  stops.forEach((stop)=>{
    if(cDirection === "West"){
      if(nextStop === "" && map[stop] > currentMile){
        nextStop = stop
      }
    }
    if(cDirection === "East"){
      if(map[stop] < currentMile ){
        nextStop = stop
      }
    }
  })



  // determine distance from
  let distanceTill = calcDistance(trainMap()[nextStop], currentMile);
  

  // determine time away
  let timeTill = calcTime(distanceTill, speed)

  //console.log(cdistance);
  train.nextStop = nextStop;
  train.milleage = distanceTill.toFixed(2);
  train.arrival = timeTill;
  train.currentDirection = cDirection;
  return train;
}

function calcTime(distance, speed){
  // use math to get what we need
  return moment().add(Math.floor((distance/speed)*60), 'minutes').format('LT');
}

function calcDistance(next, current){
  let d = 0;
  if(next > current){
    d = next - current;
  }else{
    d = current - next;
  }
  return d;
}


function addTrainToList(train) {
  train = trainCalculator(train);
  $("#train-table > tbody").append(`
  <tr>
      <th scope="row">${train.type}-${train.name}</th>
      <td>${train.nextStop}</td>
      <td>${train.milleage}</td>
      <td>${train.arrival}</td>
      <td>${train.currentDirection}</td>
  </tr>
`)
}

function updateTrains(trains){
  $("#train-table > tbody").empty();
  trains.forEach(train => addTrainToList(train));
}

