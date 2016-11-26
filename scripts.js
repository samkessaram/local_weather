$(function(){

  var wunderground = 'https://api.wunderground.com/api/1f82a733ebea4fe0/geolookup/conditions/astronomy/q/autoip.json'
  var forecast;
  var sunTimes;
  var celsius = true;
  var kph = true;
  
  function getLocalForecast(){
    $.getJSON(wunderground, function(response){
      forecast = response.current_observation;
      sunTimes = response.moon_phase;
      inputForecastData();
      setIcon(forecast.icon);
    })
  };

  function  inputForecastData(){
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

  // function setBackground(conditions, daylight){
  //   var xColors;
  //   var yColors;
  //   var day = ['#ACF0F2','#F3FFE2','#FFFFFF'];
  //   var night = ['#130523','#090658','#0040A4'];

  //   var sunny = ['#FF9800','#FFF3AE','#FFC305'];
  //   var snow = ['#FFFFFF','#DEDEDE','#77E0F6','#B5B5B5','#A2F2F6'];
  //   var storm = ['#130029','#F3CE2F','#180033','#9B83B5'];
  //   var rain = ['#49668C','#72808C','#2D3359'];
  //   var cloudy = ['#263248','#D1DBBD','#7E8AA2','#263248'];
  //   var partlycloudy = ['#F3E565','#7E8AA2']

  //   if(daylight){
  //     yColors = day;
  //     $('#celsius').addClass('day-color');
  //     $('#fahrenheit').addClass('day-color');
  //   } else {
  //     yColors = night;
  //     $('body').css('color','white');
  //     $('#celsius').addClass('night-color');
  //     $('#fahrenheit').addClass('night-color');
  //   }

  //   switch(conditions){
  //     case 'sunny':
  //     case 'mostlysunny':
  //     case 'clear':
  //       xColors = sunny;
  //       break;
  //     case 'snow':
  //     case 'flurries':
  //     case 'chanceflurries':
  //     case 'chancesnow':
  //       xColors = snow;
  //       break;
  //     case 'sleat':
  //     case 'chancerain':
  //     case 'rain':
  //       xColors = rain;
  //       break;
  //     case 'storm-showers':
  //     case 'tstorms':
  //       xColors = storm;
  //       break;
  //     case 'partlycloudy':
  //       xColors = partlycloudy;
  //       break;
  //     case 'cloudy':
  //     case 'mostlycloudy':
  //       xColors = cloudy;
  //       break;
  //     default:
  //       xColors = cloudy;
  //   }

  //   var pattern = Trianglify({
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //     cell_size: 200,
  //     x_colors: xColors,
  //     y_colors: yColors
  //   })

  //   pattern.canvas(document.getElementById('canvas'));
  //   $('body').show();
  // }

  function parseConditions(str){
    if (str.length > 8){
      str = str.split('');
      str.splice(6,0,' ');
      str = str.join('');
    }

    if (str.includes('tstorms')){
      str.replace('tstorms','thunderstorms')
    }

    if (str.includes('chance')){
      str.replace('chance','chance of')
    }

    if (str.includes('sleat')){
      str.replace('sleat','sleet')
    }

    return upcase(str);
  }


  function upcase(str){
    str = str.split('');
    str[0] = str[0].toUpperCase();
    str = str.join('');
    return str;
  }

  function setIcon(conditions){
    var prefix;
    var weatherIcon;
    var daylight = sunUp();
    var icons = {
      partlysunny: 'cloudy',
      partlycloudy: 'cloudy-high',
      unknown: 'cloudy-high',
      hazy: 'fog',
      fog: 'fog',
      tstorms: 'lightning',
      rain: 'rain',
      chancerain: 'showers',
      chancesnow: 'snow',
      chanceflurries: 'snow',
      flurries: 'snow',
      snow: 'snow',
      sleat: 'sleet',
      chancesleat: 'sleet',
      chancetstorms: 'storm-showers', 
      mostlysunny: 'sunny',
      sunny: 'sunny'
    }

    if (daylight){
      prefix = 'wi-day-';
    } else {
      prefix = 'wi-night-'
    }

    setBackground(conditions, daylight);

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
      $('#celsius').addClass('alt-temperature');
      $('#fahrenheit').removeClass('alt-temperature');

      celsius = false;
    } else {
      $('#temperature').html(forecast.temp_c);
      $('#feels-like-temperature').html(forecast.feelslike_c);
      $('#temperature-unit').html('C');
      $('#fahrenheit').addClass('alt-temperature');
      $('#celsius').removeClass('alt-temperature');

      celsius = true;
    }
  })

  getLocalForecast();

});