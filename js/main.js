//.ready tarkistaa, että DOM -sisältö on kokonaan valmis käsiteltäväksi
$(document).ready(function() {
  //kutsutaan .ajaxilla XML sivuston dataa
  $.ajax({
    url: "https://www.finnkino.fi/xml/TheatreAreas/",
    type: "GET",
    dataType: "html",
    success: function(xml) {
      //jos data on kunnossa (success), lähtee alla oleva fuktio toimintaan
      //etsitään tag TheatreArea xml tiedostosta .each loopilla
        $(xml).find('TheatreArea').each(function() {
          //haetaan jokainen tag theatrearea ja niiden sisältä 'name' ja 'id'
          var theatreText = $(this).find('Name').text();
          var theatreID = $(this).find('ID').text();
          //tulostetaan select tauluun sisällöt
          $("#theatreList").append('<option value = ' + theatreID + '>' + theatreText + '</option>');
        });
    }
  });
});

/* Kun käyttäjä valitsee teatterin niin se kutsuu tätä funktiota
   joka hakee finnkinon sivuilta kyseisen teatterin elokuva aikataulun */
$("#theatreList").change(function(){
  $("#list").text("");
  var id = $("#theatreList").val();
  $("#userInput").css("display", "block");

  //Elokuvan tietojen ajax kutsu
  $.ajax({
    url: "https://www.finnkino.fi/xml/Schedule/?area=" + id,
    type: "GET",
    dataType: "html",
    success: function(xml) {
      //haetaan xml tiedot looppia hyödyntäen
        $(xml).find('Show').each(function() {
          //tallennetaan eri tiedot muuttujiin
          var imageURL = '<img class="images" src="' + $(this).find('EventSmallImagePortrait').text() + '">';
          var title = $(this).find('Title').text();
          var xmlSchedule = $(this).find('dttmShowStart').text();
          var ratingIMG = '<img src="' + $(this).find('RatingImageUrl').text() + '">'
          var xmlDuration = $(this).find('LengthInMinutes').text();

          //parsitaan xml:stä vain tarvittavat aikataulutiedot
          var time = xmlSchedule.slice(11, 16);
          var date = xmlSchedule.slice(8, 10);
          var month = xmlSchedule.slice(5,7);
          var year = xmlSchedule.slice(0,4);

          //elokuvan varoitukset(niitä voi mahdollisesti olla monta joten käytetään each looppia)
         var contentDescriptors = "";
         $($(this).find('ContentDescriptors')).find('contentDescriptor').each(function() {
           contentDescriptors += '<img src="' + $(this).find('ImageURL').text() + '">';
         });

         //lopullinen tulostus tauluun
          $("#list").append('<tr><td>'+ imageURL + '</td><td>' + title + '<br/>' + date + "."+ month+ "." + year + " " + time + '<br/>' + "Kesto: " + xmlDuration + " minuuttia <br/> <br/>" + ratingIMG +  contentDescriptors  +   '</td>');
        });
    }
  });
});

//Erillisen hakukentän funktiot
$("#userInput").keyup(function(){
   //Declare variables
  var input = $("#userInput").val();
  var filter = input.toUpperCase();
  var table = $("#list");
  // Loop through all list items, and hide those who don't match the search query
  $(table).find('tr').each(function() {
    var tdText = $(this).text();
    if(tdText.toUpperCase().indexOf(filter) > -1 ) {
      $(this).fadeIn(1000);
    } else {
      $(this).fadeOut(1000);
    }
  });
});
