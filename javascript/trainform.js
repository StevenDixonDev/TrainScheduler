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