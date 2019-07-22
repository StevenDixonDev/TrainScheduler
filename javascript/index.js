/*
  Implements functionality for Train scheduling
*/

$(document).ready(function() {
  // list of trains that is updated when new trains are added through the train form
  let trainList = [];
  // fire base settings
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
  // store database in a variable so that it can be referenced later
  const database = firebase.database();
  database.ref("/trains").on("child_added", function(data) {
    // check that data exists
    if (data) {
      trainList.push(data.val());
      addTrainToList(data.val());
    }
  });
  // create an interval that updates the trains every minute
  let trainUpdater = setInterval(() => {
    updateTrains(trainList);
  }, 60000);
});

// map the correct stops for the trains based on the type of train
function getStops(trainType) {
  let stations = [];
  // Kodama stops at all stops currently
  if (trainType === "Kodama") {
    stations = [
      "Tokyo",
      "Shinagawa",
      "Shin-Yokohama",
      "Odawara",
      "Atami",
      "Mishima",
      "Shin-Fuji",
      "Shizouka",
      "Kakegawa",
      "Hamamatsu",
      "Toyohashi",
      "Mikawa-Anjō",
      "Nagoya",
      "Gifu-hashima",
      "Maibara",
      "Kyoto",
      "Shin-Ōsaka"
    ];
    // Hikari stops at only certain stops currenty
  } else if (trainType === "Hikari") {
    stations = [
      "Tokyo",
      "Shinagawa",
      "Shin-Yokohama",
      "Odawara",
      "Atami",
      "Mishima",
      "Shizouka",
      "Hamamatsu",
      "Nagoya",
      "Maibara",
      "Kyoto",
      "Shin-Ōsaka"
    ];
  } else {
    // handle unknown trains
    stations = [];
  }
  // get all of the stops and their mile locations
  const stops = trainMap();
  // map the available stops into a train map
  let mappedStops = stations.reduce((acc, cur) => {
    if (stops[cur] !== undefined) {
      acc[cur] = stops[cur];
    }
    return acc;
  }, {});
  // return the new mapped stops
  return mappedStops;
}

//object to hold all of the trains stops in the tokaido line
function trainMap() {
  return {
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
}

// calculate the distance the train has travelled
function getDistance(train, speed) {
  // use moment to create a current time object
  const currentTime = moment(new Date());
  // use moment to create a time object from the trains date of departure
  const lastTime = moment(train.date);
  // calculate the hours by subtracting the previous time from the current time
  const hours = moment.duration(currentTime.diff(lastTime)).asHours();
  // distance = hours * speed
  return hours * speed;
}

function getRemainingDistance(rate, distance, train) {
  // set a temporary distance equal to the calculated distance
  let tempD = parseInt(distance);
  // save the trains current direction into variable
  let currentDir = train.direction;
  // use math to calculate the correct distance and direction based on the time delta calculations
  while (tempD - rate > 0) {
    tempD = tempD - rate;
    // if train reaches the last station in the line the train will turn around
    currentDir = { East: "West", West: "East" }[currentDir];
  }
  return { distance: tempD, direction: currentDir };
}

function trainCalculator(train) {
  // edge case if user selects first or last stop in the opposite direction
  if (train.direction === "East" && train.stop === "Tokyo") {
    train.direction = "West";
  } else if (train.direction === "West" && train.stop === "Shin-Ōsaka") {
    train.direction = "East";
  }

  // distance from one end of the tokaido line to the other
  const rate = 514.4;
  // trains average speed with stops considered
  const speed = train.speed || 175;
  // get the dinstance delta distance or how far the train has travelled since starting
  const distance = getDistance(train, speed);
  // calculate trains remaining distance
  const calculatedDD = getRemainingDistance(rate, distance, train);
  // calculatedDD returns and object with these keys
  let cdistance = calculatedDD.distance;
  let cDirection = calculatedDD.direction;
  // get the stops for the current trains type
  let map = getStops(train.type);
  // get the keys which are locations
  let stops = Object.keys(map);
  // stores the current location of the train bases on direction of the current train
  let currentMile = 0;
  if (cDirection === "West") {
    // if train is traveling west the current location is just the current location
    currentMile = cdistance;
  }
  if (cDirection === "East") {
    // if the train is travelling east the current mill will be the full distance - the current distance
    currentMile = rate - cdistance;
  }

  // create a variable to store the next stop the train will be arriving at
  let nextStop = "";
  // loop through the trains avaialble stops
  stops.forEach(stop => {
    // if travelling west
    if (cDirection === "West") {
      if (nextStop === "" && map[stop] > currentMile) {
        // stop will be equal to the first stop that is greater than the trains current location
        nextStop = stop;
      }
    }
    if (cDirection === "East") {
      // if traveling east
      if (map[stop] < currentMile) {
        // stop will be equal to the last stop that is less than the trains current location
        nextStop = stop;
      }
    }
  });

  let mileTillRoundTrip = calcRoundTime(
    cDirection,
    currentMile,
    map[train.stop],
    rate
  );

  let timeTillRoundTrip = moment().add(mileTillRoundTrip / speed, "hours");

  // determine distance from current location and next stop see below
  let distanceTill = calcDistance(trainMap()[nextStop], currentMile);

  // determine time away see below
  let timeTill = calcTime(distanceTill, speed);

  if (timeTill === 0) {
    timeTill = "Arriving";
  }



  // set new items in current train
  train.nextStop = nextStop;
  // use toFixed to make sure the distance is not a long number
  train.distance = distanceTill.toFixed(2);
  train.arrival = timeTill;

  train.roundTripTime = timeTillRoundTrip.format("hh:mm a");
  train.frequency = moment.utc((rate/speed*3600*1000)*2).format('HH:mm');
  train.minRoundAway = timeTillRoundTrip.diff(moment(), 'minutes');
  
  train.currentDirection = cDirection;
  // return the updated train
  return train;
}

function calcRoundTime(direction, currentMile, stop, fullDistance) {
  let mileFrom = 0;
  if (direction === "East") {
    if (currentMile > stop) {
      mileFrom = currentMile - stop;
    } else {
      mileFrom = currentMile + stop
    }
  } else if (direction === "West") {
    if (currentMile < stop) {
      mileFrom = stop - currentMile;
    } else {
      mileFrom = fullDistance - currentMile + (fullDistance - stop);
    }
  }
  return mileFrom;
}

function calcTime(distance, speed) {
  // use math and moment to get what we need in regards to time

  return Math.floor((distance / speed) * 60);
}

function calcDistance(next, current) {
  // temporary value for distance
  let d = 0;
  // check if one value is greater than the other so we don't get a negative value
  if (next > current) {
    // u
    d = next - current;
  } else {
    d = current - next;
  }
  // return distance delta
  return d;
}

function addTrainToList(train) {
  // use train calculator to get a train with the relevant information mapped
  train = trainCalculator(train);
  // make sure the train has the proper values before adding it to the DOM
    $("#train-table  tbody").append(`
    <tr>
        <th scope="row">${train.type}-${train.name}</th>
        <td>${train.stop}</td>
        <td>${train.minRoundAway}</td>
        <td>${train.roundTripTime}</td>
        <td>${train.frequency}</td>
    </tr>
    `);

    $("#train-short-table  tbody").append(`
    <tr>
        <th scope="row">${train.type}-${train.name}</th>
        <td>${train.nextStop}</td>
        <td>${train.arrival}</td>
        <td>${train.distance}</td>
    </tr>
    `);
}

function updateTrains(trains) {
  // empty the table before updating the trains
  $("#train-table  tbody").empty();
  $("#train-short-table  tbody").empty();
  // loop through the train object and update each train based on the train calculations
  trains.forEach(train => addTrainToList(train));
}
