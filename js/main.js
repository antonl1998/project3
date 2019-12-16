$(document).ready(function() {
  $.ajax({
    url: "https://www.finnkino.fi/xml/TheatreAreas/",
    type: "GET",
    dataType: "html",
    success: function(data) {
        var xml = $.parseXML(data);
        $(xml).find('ID').each(function() {
          var name = $(this).attr('name');
          console.log(name);
        });
    }
  });
});
