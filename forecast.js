var sevenDay;
function inputForecast(forecast,c){
  sevenDay = [];
  $('#7-day').children().remove();
  for (var i = 0; i < 6; i++){
    var data = forecast[i];
    var day = {
      "day": data.date.weekday,
      "conditions": parseConditions(data.icon),
      "icon": chooseIcon(data.icon,true),
      "c": data.high.celsius + '°C',
      "f": data.high.fahrenheit + '°F',
    };

    if ( i === 0 ){
      if ( new Date().getHours() < 12 ){
        day.day = "Today";
      } else {
        day.day = "Tonight";
      }
    }

    sevenDay.push(day);

    var temp;
    c ? temp = day.c : temp = day.f;
    $('#7-day').append('<div id="day-' + i + '" class="forecast small-12 large-2 columns"><p>' + day.day + '</p><p><i class="wi ' + day.icon + '"></i></p><p>'+ day.conditions +'</p><p class="forecast-unit">' + temp + '</p></div>')
  }
}