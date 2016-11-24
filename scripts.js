$(function(){

  var wunderground = 'https://api.wunderground.com/api/1f82a733ebea4fe0/geolookup/conditions/astronomy/q/autoip.json'
  var forecast;
  var sunTimes;
  var celsius = true;
  // var kph = true;
  
  $.getJSON(wunderground, function(response){
    forecast = response.current_observation;
    sunTimes = response.moon_phase;
    inputForecastData(forecast);
  })

  function  inputForecastData(){
    $('#city').html(forecast.display_location.full);
    pickIcon(forecast.icon);
    $('#temperature').html(forecast.temp_c);
    $('#feels-like').html(forecast.feelslike_c);
    $('#conditions').html(forecast.icon);
    $('#wind-chill').html(forecast.windchill_c);
    $('#wind-speed').html(forecast.wind_kph);
    $('#wind-gust').html(forecast.wind_gust_kph);
    $('#wind-direction').html(forecast.wind_dir);
    $('#humidity').html(forecast.relative_humidity);
    
  }

  function pickIcon(icon){
    var prefix;

    if (sunUp()){
      prefix = 'wi-day-';
    } else {
      prefix = 'wi-night-';
    }

    var icons = {
      chanceflurries: // your shortened icon class here
      chancerain
      chancesleat
      chancesnow
      chancetstorms
      clear
      cloudy
      flurries
      hazy
      mostlycloudy
      mostlysunny
      partlycloudy
      partlysunny
      rain
      sleat
      snow
      sunny
      tstorms
      unknown
    }
    
    
    $('#icon').html('<i class="wi wi-' + icon + '"></i>');
  }

  function sunUp(){
    var timeNow = new Date();
    var sunrise = new Date();
    var sunset = new Date();
    
    sunrise.setHours(sunTimes.sunrise.hour);
    sunrise.setMinutes(sunTimes.sunrise.minute);
    
    sunset.setHours(sunTimes.sunset.hour);
    sunset.setMinutes(sunTimes.sunset.minute);
    
    return timeNow > sunrise && timeNow < sunset;
  }

});