
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
  var searchQuery = $("#searchQueryInput").val();
  $.ajax({
    url: "https://www.ifixit.com/api/2.0/search/" + searchQuery
  }).done(function(result) {
    $("#results_list").empty();
    $(result["results"]).each(function(k,v) {
      $("#results_list").append("<li>" + v["title"] + "</li>");
    });
  });
}

function generateTestDevice() { 
  $.ajax({
    url: "https://www.ifixit.com/api/2.0/search/phone"
  }).done(function(result) {
    $("#testDeviceWrapper").empty();
    var device = $(result["results"])[0];


    $("#testDevTbl").append($('<tr>'));
    var rowNumber = $("#testDevTbl > tr").length;
    $("#testDevTbl tr:last-child").append('<td><img src="https://www.ifixit.com/igi/' + 
        device["image"]["guid"] + '.thumbnail" > </td>');
    $("#testDevTbl tr:last-child").append('<td>' + device["title"] + '</td>');
    var elementNumber = $("#testDevTbl tr:last-child > td").length;
    $("#testDevTbl tr:last-child").append('<td><button onclick="saveDevice()" >&nbsp;I Own It!&nbsp;</button></td>');
  });
}

function listCategories() {
  $.ajax({
    url: "https://www.ifixit.com/api/2.0/categories"
  }).done(function(result) {
    //alert(Object.keys(result["hierarchy"])[0]);
    Object.keys(result).forEach(function(k) {
      //$("#listCategories ul").append("<li (" + k + ")'> " + k + "</li>");
      $("#listCategories ul").append('<li><button onclick="listSubCategories(\'' + k + '\')"> ' + k + '</button></li>');
    });
  });
}

function listSubCategories(cat){
  $("#listCategories ul").empty();
  $.ajax({
    url: "https://www.ifixit.com/api/2.0/categories/" + cat
  }).done(function(result) {
    //alert(Object.keys(result["hierarchy"])[0]);
    Object.keys(result["children"]).forEach(function(i,v) {
      $("#listCategories ul").append("<li onclick=\"listSubCategories\"(" + result['children'][i] + ")'> " + result['children'][i] + "</li>");
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







