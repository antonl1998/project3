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
  var id = $("#theatreList").val();
  console.log(id);

  $.ajax({
    url: "https://www.finnkino.fi/xml/Schedule/?area=" + id,
    type: "GET",
    dataType: "html",
    success: function(xml) {
        $(xml).find('Show').each(function() {
          var imageURLS = '<img class="images" src="' + $(this).find('EventSmallImagePortrait').text() + '">';
          var title = $(this).find('Title').text();
          var xmlSchedule = $(this).find('dttmShowStart').text();


        var time = xmlSchedule.slice(11, 16);
        var date = xmlSchedule.slice(8, 10);
        var month = xmlSchedule.slice(5,7);
        var year = xmlSchedule.slice(0,4);

          $("#list").append('<tr><td> ' + imageURLS + title + date + "."+ month+ "." + year + " " + time + '<br/>' + '</td></tr>');
         
          
        });
    }
  });
});
