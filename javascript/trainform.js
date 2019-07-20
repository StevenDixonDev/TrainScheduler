/*
  Implements the forms ability to add train

  form-name
*/

$(document).ready(function(){

$(document).on('change', '#train-type', changeTrainStations);

$(document).on('click', '#submit-train', addATrain);
})

function addATrain(e){
  e.preventDefault();
  let name = $("#train-nick").val().trim();
  let type = $("#train-type").val().trim();
  let stop = $("#train-stop").val().trim();
  let depart = $("#train-depart").val().trim();
  let direction = $("#train-direction").val().trim();
  let date = $("#train-date").val().trim();
  // get unix epoch time
  let time = moment(`${date} ${depart}`, "YYYY-MM-DD HH:mm");
  // make sure everything is filled out
  if(name && type && stop && depart && direction && time.isValid()){
    firebase.database().ref("/trains").push({
      name,
      type,
      stop,
      direction,
      date: `${date} ${depart}`,
      //time: time.valueOf()
    })
  }else{
    console.log("form error");
  }
}


function changeTrainStations(e){
  let type = e.target;
  switch($(type).val()){
    case 'Hikari': addHikariStations(); break;
    case 'Kodama': addKodamaStations(); break;
  }
}


function addHikariStations(){
  const stations = ["Tokyo", "Shinagawa", "Shin-Yokohama", "Odawara", "Atami", "Mishima", "Shizouka", "Hamamatsu", "Nagoya", "Maibara", "Kyoto", "Shin-Ōsaka"];
  $("#train-stop").empty();
  $.each(stations, function(index, station){
    $("#train-stop").append(`<option value="${station}">${station}</option>`)
  })
}

function addKodamaStations(){
  const stations = ["Tokyo", "Shinagawa", "Shin-Yokohama", "Odawara", "Atami", "Mishima", "Shin-Fuji", "Shizouka", "Kakegawa", "Hamamatsu", "Toyohashi" ,"Mikawa-Anjō", "Nagoya", "Gifu-hashima", "Maibara", "Kyoto", "Shin-Ōsaka"];
  $("#train-stop").empty();
  $.each(stations, function(index, station){
    $("#train-stop").append(`<option value="${station}">${station}</option>`);
  })
}