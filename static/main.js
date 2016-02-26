
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
  $.ajax({
    url: "https://www.ifixit.com/api/2.0/search/iphone"
  }).done(function(result) {
    $("#results_list").empty();
    $(result["results"]).each(function(k,v) {
      $("#results_list").append("<li>" + v["title"] + "</li>");
    });
  });
}

function clearResults() {
  $("#results_list").empty();
}

function getSavedDevices() {


}

function saveDevice() {
  alert("Saving device as a cookie");
}

function getSavedDevices() {


}






