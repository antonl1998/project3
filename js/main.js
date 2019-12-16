$(document).ready(function() {
  $.ajax({
    url: "https://www.finnkino.fi/xml/TheatreAreas/",
    type: "GET",
    dataType: "html",
    success: function(xml) {
        $(xml).find('TheatreArea').each(function() {
          var theatreText = $(this).find('Name').text();
          var theatreID = $(this).find('ID').text();
          $("#theatreList").append('<option value = ' + theatreID + '>' + theatreText + '</option>');
        });
    }
  });
});


$("#theatreList").change(function(){
  $("#list").text("");
  var id = $("#theatreList").val();
  $("#userInput").css("display", "block");

  $.ajax({
    url: "https://www.finnkino.fi/xml/Schedule/?area=" + id,
    type: "GET",
    dataType: "html",
    success: function(xml) {
        $(xml).find('Show').each(function() {
          var title = $(this).find('Title').text();
          $("#list").append('<tr><td> ' + title + '</td></tr>');
        });
    }
  });
});

$("#userInput").keyup(function(){
  var input = $("#userInput").val();
  var filter = input.toUpperCase();
  var table = $("#list");

  $(table).find('tr').each(function() {
    var tdText = $(this).text();
    if(tdText.toUpperCase().indexOf(filter) > -1 ) {
      $(this).fadeIn(1000);
    } else {
      $(this).fadeOut(1000);
    }
  });
  //console.log(filter);
});
