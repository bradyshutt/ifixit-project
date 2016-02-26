
$(document).ready(function() { 
  $('.nav_wrapper').load("nav.html", function() {
    var pgurl = location.href.substr(location.href.lastIndexOf("/")+1);
    $("nav ul a").each(function(){ 
      var el = $(this).attr("href");
      if( el == pgurl || el == '' ) {
        $(this).children("li:first").addClass("nav_current");
      }
    }); 
  });
});

function searchAll() {
  alert("Starting search...");
//  $.ajax({
//   url: "https://www.ifixit.com/api/0.1/devices/"
//  }).done(function(result) {
//    $(".inner").empty();
//   alert("test");
// 
//  });
}

function getSavedDevices() {
  alert("Loading Devices");
}

function saveDevice() {
  alert("Saving device as a cookie");
}

function getSavedDevices() {
  alert("Loading the saved devices");
}






