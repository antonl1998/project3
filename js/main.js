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
          var imageURL = '<img class="images" src="' + $(this).find('EventSmallImagePortrait').text() + '">';
          var title = $(this).find('Title').text();
          var xmlSchedule = $(this).find('dttmShowStart').text();
          var ratingIMG = '<img src="' + $(this).find('RatingImageUrl').text() + '">'
          var xmlDuration = $(this).find('LengthInMinutes').text();

          var time = xmlSchedule.slice(11, 16);
          var date = xmlSchedule.slice(8, 10);
          var month = xmlSchedule.slice(5,7);
          var year = xmlSchedule.slice(0,4);

          // Tähän alle pitäisi änkeä .each loop. en tajuu miten se toimii
         // var descriptionImages = $(this).find('ContentDescriptors').text()
         var contentDescriptors = "";
         $($(this).find('ContentDescriptors')).find('contentDescriptor').each(function() {
           contentDescriptors += '<img src="' + $(this).find('ImageURL').text() + '">';
         });


          $("#list").append('<tr><td>'+ imageURL + '</td><td>' + title + '<br/>' + date + "."+ month+ "." + year + " " + time + '<br/>' + "Kesto: " + xmlDuration + " minuuttia <br/> <br/>" + ratingIMG +  contentDescriptors  +   '</td>');

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
