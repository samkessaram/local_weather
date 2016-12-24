var threeDay = [];

function inputForecast(forecast){
  for (var i = 1; i < forecast.length; i++){
    var data = forecast[i];
    var day = {
      "day": data.date.weekday,
      "conditions": parseConditions(data.icon),
      "icon": chooseIcon(data.icon,true),
      "c": data.high.celsius + '&deg;C',
      "f": data.high.fahrenheit + '&deg;F',
    };

    threeDay.push(day);

    $('#day-' + i).html('<p>' + day.day + '</p><p><i class="wi ' + day.icon + '"></i></p><p>'+ day.conditions +'</p><p class="forecast-unit">' + day.c + '</p>');

  }
}