$(document).ready(function() {
  $.ajax({
    url: "https://www.finnkino.fi/xml/TheatreAreas/",
    type: "GET",
    dataType: "html",
    success: function(xml) {
        $(xml).find('Name').each(function() {
          $("#theatreList").append('<option>' + $(this).text() + '</option>');
        });
    }
  });
});
