$(document).ready(function() {
  var $testi = $( "#result" ).load( "https://www.finnkino.fi/xml/TheatreAreas/" );
  console.log($testi.find("Name")[0]);
});
