$(function(){

  var displayCelsius = true; // Switch for temperature units to persist over multiple searches
  var current; // Current weather conditions
  var searchTerm; // The location inputted by user

  $('.container, canvas').hide(); // Hides elements for new searches
  $('#wait-msg').show(); 
  $('#msg').html('Fetching forecast');

  function getCoords(){ // Fired for initial search only to overwrite city name from weather API
    $.ajax({
      type: "POST",
      url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCMy8wsGnbua26y4lDHR-kaWZeGVvBUeV4',
      success: getCityName,
    });
  }

  function getCityName(response){ // Fired for initial search only to overwrite city name from weather API
    var coords = response.location
    $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + coords.lat + ',' + coords.lng +'&result_type=locality&key=AIzaSyCMy8wsGnbua26y4lDHR-kaWZeGVvBUeV4', function(response){
      $('#city').html(response.results[0].formatted_address);
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
    $('#overlay').show()  // Grey out display while search is active

    // Use Google Maps API to find searched location
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
    $.getJSON(url, function(response){
      $('#wait-msg').hide();
      current = response.current_observation;
      if (!!current){ // If non-empty response
        inputCurrentData(current);
        var sun = sunUp(response.moon_phase);
        setIcon(current.icon, sun);
        setBackground(current.icon, sun);
        inputForecast(response.forecast.simpleforecast.forecastday,displayCelsius, response.moon_phase);
        setContainerMarginTop();
      } else {
        $('#city').html("No results for: " + "<em>" + searchTerm + "</em>");
      }
      $('#overlay').hide()
    })
  };

  function  inputCurrentData(){
    var date = new Date();
    if ( searchTerm === '' ){ 
       $('#city').html(current.display_location.city + ', ' + current.display_location.state)
    }
    var temp; 
    displayCelsius ? temp = [current.temp_c,current.feelslike_c] : temp = [current.temp_f,current.feelslike_f] // Input correct temperature units
    $('#temperature').html(temp[0]);
    $('#feels-like-temperature').html(temp[1]);
    $('#conditions').html(parseConditions(current.icon)); // Rely on icon for consistent format from API
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
    } else {
      $('#temperature').html(current.temp_c);
      $('#feels-like-temperature').html(current.feelslike_c);
      $('#temperature-unit').html('C');

      for(var i = 0; i < sevenDay.length; i++){
        $('#day-' + i + ' .forecast-unit').html(sevenDay[i]["c"]);
      }
    }
    displayCelsius =! displayCelsius
  })

  function ellipsis(){ // Animated message so user knows it's working  (in case API takes a while to respond)
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

      if ( Date.now() - waitStart > 7000 ){
        $('#msg').html('Still waiting for Weather Underground. Hang in there, or try refreshing the page');
      }
    },200);
  }

  getCoords() // Get city name
  getForecast('https://api.wunderground.com/api/1f82a733ebea4fe0/geolookup/forecast10day/conditions/astronomy/q/autoip.json');

  $('#msg').html('Fetching forecast');

  ellipsis();
  

});