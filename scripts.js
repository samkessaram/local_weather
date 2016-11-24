$(function(){

  var wunderground = 'https://api.wunderground.com/api/1f82a733ebea4fe0/geolookup/conditions/astronomy/q/autoip.json'
  var forecast;
  var sunTimes;
  var celsius = true;
  var kph = true;
  
  $.getJSON(wunderground, function(response){
    forecast = response.current_observation;
    sunTimes = response.moon_phase;
    inputForecastData(forecast);
  })

  function  inputForecastData(){
    $('#city').html(forecast.display_location.full);
    pickIcon(forecast.icon);
    $('#temperature').html(forecast.temp_c);
    $('#feels-like-temperature').html(forecast.feelslike_c);
    $('#conditions').html(upcase(forecast.icon));
    $('#wind-speed-kph').html(forecast.wind_kph);
    $('#wind-gust-kph').html(forecast.wind_gust_kph);
    $('#wind-speed-mph').html(forecast.wind_mph);
    $('#wind-gust-mph').html(forecast.wind_gust_mph);
    $('#wind-direction').html(forecast.wind_dir);
    $('#humidity').html(forecast.relative_humidity);
  }

  function upcase(str){
    str = str.split('');
    str[0] = str[0].toUpperCase();
    str = str.join('');
    return str;
  }

  function pickIcon(conditions){
    var prefix;
    var weatherIcon;
    var dayTime = sunUp();

    if (dayTime){
      prefix = 'wi-day-';
    } else {
      prefix = 'wi-night-'
    }

    var icons = {
      chanceflurries: 'snow',
      chancerain: 'showers',
      chancesleat: 'sleet',
      chancesnow: 'snow',
      chancetstorms: 'storm-showers', 
      cloudy: 'cloudy',
      flurries: 'show',
      hazy: 'fog',
      fog: 'fog',
      mostlysunny: 'sunny',
      partlycloudy: 'cloudy-high',
      partlysunny: 'cloudy',
      rain: 'rain',
      sleat: 'sleet',
      snow: 'snow',
      sunny: 'sunny',
      tstorms: 'lightning',
      unknown: 'cloudy-high'
    }

    switch(conditions){
      case 'clear':
        if (dayTime){
          weatherIcon = prefix + 'sunny';
        } else {
          weatherIcon = 'wi-lunar-eclipse';
        }
        break;
      case 'mostlycloudy':
        weatherIcon = 'wi-cloudy';
        break;
      default:
        weatherIcon = prefix + icons[conditions];
    }
    
    $('#icon').addClass(weatherIcon);

  };

  function sunUp(){
    var timeNow = new Date();
    var sunrise = new Date();
    var sunset = new Date();
    
    sunrise.setHours(sunTimes.sunrise.hour);
    sunrise.setMinutes(sunTimes.sunrise.minute);
    
    sunset.setHours(sunTimes.sunset.hour);
    sunset.setMinutes(sunTimes.sunset.minute);
    
    return timeNow > sunrise && timeNow < sunset;
  };

  $('#alt-temperature').click(function(){
    if ( celsius ){
      $('#temperature').html(forecast.temp_f);
      $('#feels-like-temperature').html(forecast.feelslike_f);
      $('.temperature-unit').html('&deg;F ');
      $('#alt-temperature').html('| C');
      celsius = false;
    } else {
      $('#temperature').html(forecast.temp_c);
      $('#feels-like-temperature').html(forecast.feelslike_c);
      $('.temperature-unit').html('&deg;C ');
      $('#alt-temperature').html('| F');
      celsius = true;
    }
  })

});