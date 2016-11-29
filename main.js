$(function(){

  var localURL = 'https://api.wunderground.com/api/1f82a733ebea4fe0/geolookup/conditions/astronomy/q/autoip.json'
  var celsius = true;
  var forecast;
  
  function getForecast(url){
    $.getJSON(url, function(response){
      forecast = response.current_observation;
      inputForecastData(forecast);
      checkSunUp(response.moon_phase);
    })
  };

  function  inputForecastData(forecast){
    $('#city').html(forecast.display_location.full);
    $('#temperature').html(forecast.temp_c);
    $('#feels-like-temperature').html(forecast.feelslike_c);
    $('#conditions').html(parseConditions(forecast.icon));
    $('#wind-speed-kph').html(forecast.wind_kph);
    $('#wind-gust-kph').html(forecast.wind_gust_kph);
    $('#wind-speed-mph').html(forecast.wind_mph);
    $('#wind-gust-mph').html(forecast.wind_gust_mph);
    $('#wind-direction').html(forecast.wind_dir);
    $('#humidity').html(forecast.relative_humidity);
  }

  function checkSunUp(sunTimes){
    var timeNow = new Date();
    var sunrise = new Date();
    var sunset = new Date();
    
    sunrise.setHours(sunTimes.sunrise.hour);
    sunrise.setMinutes(sunTimes.sunrise.minute);
    
    sunset.setHours(sunTimes.sunset.hour);
    sunset.setMinutes(sunTimes.sunset.minute);

    var sun = timeNow > sunrise && timeNow < sunset;  // Checking if sun is up or not (true or false) 
                                                      // to determine which icon and background to display.
    setIcon(forecast.icon, sun);
    setBackground(forecast.icon, sun);
  };

  $('#temperature-units').click(function changeUnits(){
    $('#celsius, #fahrenheit').toggleClass('alt-temperature');
    if ( celsius ){
      $('#temperature').html(forecast.temp_f);
      $('#feels-like-temperature').html(forecast.feelslike_f);
      $('#temperature-unit').html('F');
      celsius = false;
    } else {
      $('#temperature').html(forecast.temp_c);
      $('#feels-like-temperature').html(forecast.feelslike_c);
      $('#temperature-unit').html('C');
      celsius = true;
    }
  })

  getForecast(localURL);

});