/*
  Öööö mites vitussa noi paskat saa tohon select listaan
*/

$(document).ready(function() {
  console.log( "document loaded" );
  $("#theatreList").load("https://www.finnkino.fi/xml/TheatreAreas/", function(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
      $("#theatreList").append("<option>"+ xhr.html + "</option>");

    }
    if(statusTxt == "error") {
      alert("Error: " + xhr.status + ": " + xhr.statusTxt);
    }
  });
});
