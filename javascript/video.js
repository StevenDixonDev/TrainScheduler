/*
  Functionality for video in jumbotron
*/

// loads video in each video tag on the page
function deferVideo() {
  //defer html5 video loading
  $("video source").each(function () {
    var sourceFile = $(this).attr("data-src");
    $(this).attr("src", sourceFile);
    var video = this.parentElement;
    video.load();
    // uncomment if video is not autoplay
    //video.play();
  });

}


$(document).ready(function () {
  // load video after page loads
  deferVideo();
})