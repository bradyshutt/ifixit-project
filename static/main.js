
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
    url: "https://www.ifixit.com/api/2.0/search/" + searchQuery + "?filter=wiki&filter=category"
  }).done(function(result) {
    $("#testDevTbl").empty();
    $(result["results"]).each(function(k, device) {


      $("#testDevTbl").append($('<tr>'));
      var rowNumber = $("#testDevTbl > tr").length;
      $("#testDevTbl tr:last-child").append('<td><img src="https://www.ifixit.com/igi/' + 
          device["image"]["guid"] + '.thumbnail" > </td>');
      $("#testDevTbl tr:last-child").append('<td>' + device["title"] + '</td>');
      var elementNumber = $("#testDevTbl tr:last-child > td").length;
      $("#testDevTbl tr:last-child").append('<td><button onclick="saveDevice()" >&nbsp;I Own It!&nbsp;</button></td>');




      //$("#results_list").append("<li>" + v["title"] + "</li>");
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
      $("#listCategories").append('<li><button onclick="listSubCategories(\'' + k + '\')"> ' + k + '</button></li>');
    });
  });
}

function listSubCategories(cat, loc){
  $("#listSubCategories").empty();
  $(".categoriesWrapper").append('<ul class="categories" id="listSubCategories"> </ul>')
    $.ajax({
      url: "https://www.ifixit.com/api/2.0/categories/" + cat
    }).done(function(result) {
      //alert(Object.keys(result["hierarchy"])[0]);
      Object.keys(result["children"]).forEach(function(i,v) {
        $("#listSubCategories").append('<li><button onclick="listSubCategories(\'' +result['children'][i] + '\')"> ' + result['children'][i] + '</button></li>');
        //$("#listSubCategories").append("<li onclick=\"listSubCategories\"(" + result['children'][i] + ")'> " + result['children'][i] + "</li>");
      });
    });

}

function clearResults() {
  $("#results_list").empty();
}



function getSavedDevices() {
  //$("body").data(JSON.parse($.cookie("owned-devices")));
  alert("Loading saved devices");
  var ownedDevicesStr = $.cookie("owned-devices");
  var ownedDevices = JSON.parse(ownedDevicesStr);

  alert("Str: " + ownedDevicesStr);
  alert("Loaded: " + ownedDevices['0']['name']);
  alert("length: " + Object.keys(ownedDevices).length);

  $(ownedDevices).each(function(numInCart, device) {
    alert("numInCart: " + numInCart);
    alert("device: " + device[numInCart]['name']);
    $(".loadedDevices").append('<h1>' + device['0']["name"] + '</h1>');

  });

  alert("Loaded.");

}

function saveDevice() {
  alert("Saving device as a cookie");

  var cartSize = 0;
  $("body").data( String(cartSize), {'name':'iphone4s', 'id':'5'} );
  cartSize += 1;
  $("body").data( String(cartSize), {'name':'gs6', 'id':'5'} );
  cartSize += 1;
  $("body").data( String(cartSize), {'name':'nokia lumia', 'id':'5'} );
  cartSize += 1;

  //$("body").data( "cartSize", cartSize );
  $.cookie("owned-devices", JSON.stringify($("body").data()));
  alert("Saved.");
}








