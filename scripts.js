$(function(){

  var wunderground = 'https://api.wunderground.com/api/1f82a733ebea4fe0/geolookup/conditions/astronomy/q/autoip.json'
  var forecast;
  var sunTimes;
  var celsius = true;
  var kph = true;
  
  function getForecast(){
    $.getJSON(wunderground, function(response){
      forecast = response.current_observation;
      sunTimes = response.moon_phase;
      inputForecastData(forecast);
      pickIcon(forecast.icon);
    })
  };

  function  inputForecastData(){
    $('#city').html(forecast.display_location.full);
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

  function setBackground(icon, daylight){
    var cellSize;
    var xColors = ['#000000','#92C4FF','#22527F','#5977FF','#26317F','#000000'];
    var yColors;
    var pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight,
      cell_size: 40,
      variance: 0.2,
      x_colors: xColors,
      y_colors: 'match_x',
      stroke_width: 1.51
    })

    pattern.canvas(document.getElementById('canvas'));
  }

  function pickIcon(conditions){
    var prefix;
    var weatherIcon;
    var daylight = sunUp();
    var icons = {
      chanceflurries: 'snow',
      chancerain: 'showers',
      chancesleat: 'sleet',
      chancesnow: 'snow',
      chancetstorms: 'storm-showers', 
      flurries: 'snow',
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

    if (daylight){
      prefix = 'wi-day-';
    } else {
      prefix = 'wi-night-'
    }

    switch(conditions){
      case 'clear':
        if (daylight){
          weatherIcon = prefix + 'sunny';
        } else {
          weatherIcon = 'wi-lunar-eclipse';
        }
        break;
      case 'cloudy':
      case 'mostlycloudy':
        weatherIcon = 'wi-cloudy';
        break;
      default:
        weatherIcon = prefix + icons[conditions];
    }
    
    $('#icon').addClass(weatherIcon);
    // setBackground(weatherIcon, daylight);
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

  $('#temperature-units').click(function changeUnits(){
    if ( celsius ){
      $('#temperature').html(forecast.temp_f);
      $('#feels-like-temperature').html(forecast.feelslike_f);
      $('#temperature-unit').html('F');
      $('#fahrenheit').addClass('current-temperature');
      $('#celsius').removeClass('current-temperature');
      $('#celsius').addClass('alt-temperature');
      $('#fahrenheit').removeClass('alt-temperature');

      celsius = false;
    } else {
      $('#temperature').html(forecast.temp_c);
      $('#feels-like-temperature').html(forecast.feelslike_c);
      $('#temperature-unit').html('C');
      $('#fahrenheit').addClass('alt-temperature');
      $('#celsius').removeClass('alt-temperature');
      $('#celsius').addClass('current-temperature');
      $('#fahrenheit').removeClass('current-temperature');

      celsius = true;
    }
  })

  getForecast();
  // setBackground();

});