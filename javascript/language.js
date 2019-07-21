/*
  This JavaScript controls the language changing ability for the webpage
*/

// function loops through dom and changes all elements with en or jp tags
function changeLanguage(locality) {
  let wordsToChange = $(`[data-${locality}]`);
  $.each(wordsToChange, function (index, element) {
    $(element).text($(element).attr(`data-${locality}`));
  })
}


$(document).ready(function () {
  // get the current language settings from local storage
  let language = localStorage.getItem("language");
  // if there is a language stored 
  if (language) {
    // only need to check for jp as en is default
    if (language === 'JP') {
      // change to jp if true
      changeLanguage('jp')
      // check the check box on the page
      $("#cb3").attr("checked", "true");
    }
  }

  $(document).on("click", "#cb3", function (item) {
    // save the current status of the check box into a variable
    const checked = $(this).prop('checked');
    // check status
    if (checked) {
      // if true set langauge to jp
      changeLanguage('jp');
      // update local storage with current setting
      localStorage.setItem("language", "JP");
    } else {
      // if false set to default english
      changeLanguage('en');
      // update local storage with current setting
      localStorage.setItem("language", "EN");
    }
  })


})