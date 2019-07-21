/*
  Implements the forms ability to add train
*/

$(document).ready(function () {
  // handle the user changing the train type
  $(document).on('change', '#train-type', changeTrainStations);
  // handle the user clicking the add a train button
  $(document).on('click', '#submit-train', addATrain);
})

// function to add a train to firebase
function addATrain(e) {
  e.preventDefault();
  // get all relevant train information
  let name = $("#train-nick").val().trim();
  let type = $("#train-type").val().trim();
  let stop = $("#train-stop").val().trim();
  let depart = $("#train-depart").val().trim();
  let direction = $("#train-direction").val().trim();
  let date = $("#train-date").val().trim();
  // get unix epoch time
  let time = moment(`${date} ${depart}`, "YYYY-MM-DD HH:mm");
  // make sure everything is filled out
  if (name && type && stop && depart && direction && time.isValid()) {
    // add the new train to firebase
    firebase.database().ref("/trains").push({
      name,
      type,
      stop,
      direction,
      date: `${date} ${depart}`,
    })
    // clear the from
    clearForm();
  } else {
    // handle error
    console.log("form error");
  }
}

function clearForm() {
  // clear fields that are not drop downs or dates
  $("#train-nick").val("");
  $("#train-depart").val("");
}

// function to update the list of available stops when user changes train type
function changeTrainStations(e) {
  // temporary train type variable
  let type = e.target;
  // set a variable for stations
  let stations = [];
  if (type === 'Hikari') {
    stations = ["Tokyo", "Shinagawa", "Shin-Yokohama", "Odawara", "Atami", "Mishima", "Shizouka", "Hamamatsu", "Nagoya", "Maibara", "Kyoto", "Shin-Ōsaka"];
  } else if (type === 'Kodama') {
    stations = ["Tokyo", "Shinagawa", "Shin-Yokohama", "Odawara", "Atami", "Mishima", "Shin-Fuji", "Shizouka", "Kakegawa", "Hamamatsu", "Toyohashi", "Mikawa-Anjō", "Nagoya", "Gifu-hashima", "Maibara", "Kyoto", "Shin-Ōsaka"];
  }
  // based on train stops add the stations to dom
  addStationsToDom(stations);
}

function addStationsToDom(stations) {
  // empty the stops list
  $("#train-stop").empty();
  // add the stations to the DOM
  $.each(stations, function (index, station) {
    $("#train-stop").append(`<option value="${station}">${station}</option>`)
  })
}

