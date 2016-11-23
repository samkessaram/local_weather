$(function(){

  var wunderground = 'https://api.wunderground.com/api/1f82a733ebea4fe0/geolookup/conditions/q/autoip.json'
  var city;
  var forecast;
  $.getJSON(wunderground, function(response){
    city = response.current_observation.display_location.full;
    forecast = response.current_observation;
  })


});