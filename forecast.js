var sevenDay; // The seven day forecast, global for temperature unit toggle
function inputForecast(forecast, c, moonPhase){
  sevenDay = [];
  $('#7-day').children().remove(); // Clear previous data
  for (var i = 0; i < 6; i++){
    var data = forecast[i];
    var day = {
      "day": data.date.weekday,
      "conditions": parseConditions(data.icon),
      "icon": chooseIcon(data.icon,true), // Set 'sun' to true, forecast will show day icons
      "c": data.high.celsius + '°C',
      "f": data.high.fahrenheit + '°F',
    };

    if ( i === 0 ){ //
      if ( moonPhase.current_time.hour < 12 ){ // Checking if before or after noon
        day.day = "Today"; // Changing display date
      } else {
        day.day = "Tonight";
        day.icon = chooseIcon(data.icon,false) // Set 'sun' to false, changing icon to night
      }
    }

    sevenDay.push(day);

    var temp;
    c ? temp = day.c : temp = day.f;
    $('#7-day').append('<div id="day-' + i + '" class="forecast small-12 large-2 columns"><p>' + day.day + '</p><p><i class="wi ' + day.icon + '"></i></p><p>'+ day.conditions +'</p><p class="forecast-unit">' + temp + '</p></div>')
  }
}