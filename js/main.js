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
  console.log("Toimiiko?"); 
});
