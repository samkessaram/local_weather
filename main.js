$(function(){

  var celsius = true;
  var current;
  
  function getForecast(url){
    $('.container, canvas').hide();
    $('#wait-msg').show();
    $('#msg').html('Fetching forecast');
    waitStart = new Date();
    $.getJSON(url, function(response){
      $('#wait-msg').hide();
      console.log(response);
      current = response.current_observation;
      inputCurrentData(current);
      checkSunUp(response.moon_phase);
      inputForecast(response.forecast.simpleforecast.forecastday);
    })
  };

  function  inputCurrentData(){
    var date = new Date();
    $('#city').html(current.display_location.full);
    $('#temperature').html(current.temp_c);
    $('#feels-like-temperature').html(current.feelslike_c);
    $('#conditions').html(parseConditions(current.icon));
    $('#wind-speed-kph').html(current.wind_kph);
    $('#wind-gust-kph').html(current.wind_gust_kph);
    $('#wind-speed-mph').html(current.wind_mph);
    $('#wind-gust-mph').html(current.wind_gust_mph);
    $('#wind-direction').html(current.wind_dir);
    $('#humidity').html(current.relative_humidity);
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
    setIcon(current.icon, sun);
    setBackground(current.icon, sun);
  };

  $('#temperature-units').click(function changeUnits(){
    $('#celsius, #fahrenheit').toggleClass('alt-temperature');
    if ( celsius ){
      $('#temperature').html(current.temp_f);
      $('#feels-like-temperature').html(current.feelslike_f);
      $('#temperature-unit').html('F');

      for(var i = 0; i < sevenDay.length; i++){
        $('#day-' + i + ' .forecast-unit').html(sevenDay[i]["f"]);
      }

      celsius = false;
    } else {
      $('#temperature').html(current.temp_c);
      $('#feels-like-temperature').html(current.feelslike_c);
      $('#temperature-unit').html('C');

      for(var i = 0; i < sevenDay.length; i++){
        $('#day-' + i + ' .forecast-unit').html(sevenDay[i]["c"]);
      }
      celsius = true;
    }
  })

  function geoSuccess(pos){
    console.log(pos);
    getForecast('https://api.wunderground.com/api/1f82a733ebea4fe0/geolookup/forecast10day/conditions/astronomy/q/' + pos.coords.latitude + ',' + pos.coords.longitude + '.json')
  }

  function geoError(){
    alert('Location based on IP address. Enable geolocation for more accurate results.')
    getForecast('https://api.wunderground.com/api/1f82a733ebea4fe0/geolookup/forecast10day/conditions/astronomy/q/autoip.json')
  }

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, {enableHighAccuracy: true});
  $('#msg').html('Determining location');
  ellipsis();
  
  function ellipsis(){
    var dots = 1;
    var waitStart = new Date();
    var interval = window.setInterval(function(){
      if ( dots > 3 ){
        dots = 1;
      } else {
        $('#ellipsis').html('.'.repeat(dots));
        dots++;
      }
      
      if ($('#wait-msg').css('display') === 'none'){
        window.clearInterval(interval);
      }

      var msg = $('#msg').html()

      if ( Date.now() - waitStart > 10000 ){
        var errMsg;
        if ( msg === 'Fetching forecast'){
          errMsg = 'Weather Underground is taking longer than normal to respond. Hang in there'
        } else {
          errMsg = 'Still waiting for location'
        }
        $('#msg').html(errMsg);
      }
    },200);
  }

  $('#icon').click(function(){
    getForecast('https://api.wunderground.com/api/1f82a733ebea4fe0/geolookup/forecast10day/conditions/astronomy/q/Ontario/Toronto.json');
    ellipsis();
  })

});