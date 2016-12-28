var sevenDay = [];

function inputForecast(forecast){
  for (var i = 0; i < 6; i++){
    var data = forecast[i];
    var day = {
      "day": data.date.weekday,
      "conditions": parseConditions(data.icon),
      "icon": chooseIcon(data.icon,true),
      "c": data.high.celsius + '&deg;C',
      "f": data.high.fahrenheit + '&deg;F',
    };

    if ( i === 0 ){
      day.day = "Tonight";
    }

    sevenDay.push(day);

    $('#7-day').append('<div id="day-' + i + '" class="forecast small-12 large-2 columns"><p>' + day.day + '</p><p><i class="wi ' + day.icon + '"></i></p><p>'+ day.conditions +'</p><p class="forecast-unit">' + day.c + '</p></div>')
  }
}