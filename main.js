$(function(){

  $('.container, canvas').hide();
  $('#wait-msg').show();
  $('#msg').html('Fetching forecast');

  var displayCelsius = true;
  var current;
  var searchTerm;

  function getLocation(){
    $.getJSON('https://freegeoip.net/json/',function(response){
      searchTerm = response.city + ', ' + response.region_name;
      $('#city').html(searchTerm);
    })
  }

  $('#city').focus(function(e){
    searchTerm = this.innerHTML;
    this.innerHTML = ''
  })

  $('#city').blur(function(e){
    if ( this.innerText === '' ){
      this.innerHTML = searchTerm;
    }
  })

  $('#city').keydown(function(e){
    if ( e.key === 'Enter'){
      e.preventDefault();
      if ( this.innerText !== searchTerm && this.innerText.length > 0 ){
        searchTerm = this.innerText;
        userSearch(searchTerm);
      }
      this.blur();
    }
  })

  function userSearch(city){
    $('#overlay').show()
    $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&key=AIzaSyBhkGzic5SLMJWPd4DYaRzh1yWBAzkB_b0', function(response){
      if ( response.status === 'OK' ){
        searchTerm = response.results[0].formatted_address;
        $('#city').html(searchTerm);
        var latLon = response.results[0].geometry.location.lat + ',' + response.results[0].geometry.location.lng;
        getForecast('https://api.wunderground.com/api/1f82a733ebea4fe0/geolookup/forecast10day/conditions/astronomy/q/' + latLon + '.json');
      } else {
        $('#city').html("No results for: " + "<em>" + searchTerm + "</em>");
        $('#overlay').hide()
      }
    })
  }
  
  function getForecast(url){
    waitStart = new Date();
    $.getJSON(url, function(response){
      $('#wait-msg').hide();
      current = response.current_observation;
      inputCurrentData(current);
      var sun = sunUp(response.moon_phase);
      setIcon(current.icon, sun);
      setBackground(current.icon, sun);
      inputForecast(response.forecast.simpleforecast.forecastday,displayCelsius);
      setContainerMarginTop();
      $('#overlay').hide()
    })
  };

  function  inputCurrentData(){
    var date = new Date();
    if ($('#city').html() === ''){
       $('#city').html(current.display_location.city + ', ' + current.display_location.state)
    }
    var temp; 
    displayCelsius ? temp = [current.temp_c,current.feelslike_c] : temp = [current.temp_f,current.feelslike_f]
    $('#temperature').html(temp[0]);
    $('#feels-like-temperature').html(temp[1]);
    $('#conditions').html(parseConditions(current.icon));
    $('#wind-speed-kph').html(current.wind_kph);
    $('#wind-gust-kph').html(current.wind_gust_kph);
    $('#wind-speed-mph').html(current.wind_mph);
    $('#wind-gust-mph').html(current.wind_gust_mph);
    $('#wind-direction').html(current.wind_dir);
    $('#humidity').html(current.relative_humidity);
  }

  function sunUp(sunTimes){
    var time = new Date();
    var sunrise = new Date();
    var sunset = new Date();

    time.setHours(sunTimes.current_time.hour)
    time.setMinutes(sunTimes.current_time.minute)
    
    sunrise.setHours(sunTimes.sunrise.hour);
    sunrise.setMinutes(sunTimes.sunrise.minute);

    sunset.setHours(sunTimes.sunset.hour);
    sunset.setMinutes(sunTimes.sunset.minute);
    return time > sunrise && time < sunset;  // Checking if sun is up or not (true or false) 
                                                // to determine which icon and background to display.

  };

  $('#temperature-units').click(function changeUnits(){
    $('#celsius, #fahrenheit').toggleClass('alt-temperature');
    if ( displayCelsius ){
      $('#temperature').html(current.temp_f);
      $('#feels-like-temperature').html(current.feelslike_f);
      $('#temperature-unit').html('F');

      for(var i = 0; i < sevenDay.length; i++){
        $('#day-' + i + ' .forecast-unit').html(sevenDay[i]["f"]);
      }

      displayCelsius = false;
    } else {
      $('#temperature').html(current.temp_c);
      $('#feels-like-temperature').html(current.feelslike_c);
      $('#temperature-unit').html('C');

      for(var i = 0; i < sevenDay.length; i++){
        $('#day-' + i + ' .forecast-unit').html(sevenDay[i]["c"]);
      }
      displayCelsius = true;
    }
  })

  getLocation();
  getForecast('https://api.wunderground.com/api/1f82a733ebea4fe0/geolookup/forecast10day/conditions/astronomy/q/autoip.json');

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
});