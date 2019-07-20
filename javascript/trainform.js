/*
  Implements the forms ability to add train

  form-name
*/

$(document).ready(function(){

  console.log(moment("12-25-1995 24:00", "MM-DD-YY HH:mm").valueOf())
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
  console.log(date, depart)
  let time = moment(`${date} ${depart}`, "YYYY-MM-DD HH:mm").valueOf();
 
  console.log(name, type, stop, depart, direction, date, time)
  if(name && type && stop && depart && direction){
    firebase.database().ref("/trains").push({
      name,
      type,
      stop,
      depart,
      direction,
      date,
      time
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
  const stations = ["Tokyo", "Shingawa", "Shin-yokohama", "Nagoya", "Kyoto", "Shin-osaka", "Osawara", "Atami", "Mishima", "Shizouka", "Hamamatsu", "Maibara"];
  $("#train-stop").empty();
  $.each(stations, function(index, station){
    $("#train-stop").append(`<option value="${station}">${station}</option>`)
  })
}

function addKodamaStations(){
  const stations = ["Tokyo", "Shingawa", "Shin-yokohama", "Osawara", "Atami", "Mishima", "Shin-fuji", "Shizouka", "Kakegawa", "Hamamatsu", "Toyohashi" ,"Mikawa-Anjo", "Nagoya", "Gifu-hashima", "Maibara", "Kyoto", "Shin-Osaka"];
  $("#train-stop").empty();
  $.each(stations, function(index, station){
    $("#train-stop").append(`<option value="${station}">${station}</option>`);
  })
}