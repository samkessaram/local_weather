function inputForecast(forecast){
  // console.log(forecast);
  var threeDay = []
  for (var i = 1; i < forecast.length; i++){
    var data = forecast[i];
    var day = {
      "day": data.date.weekday,
      "conditions": parseConditions(data.icon),
      "icon": chooseIcon(data.icon,true),
      "c": data.high.celsius + '&deg;C',
      "f": data.high.fahrenheit + '&deg;F',
    };

    $('#day-' + i).html('<p>' + day.day + '</p><p><i class="wi ' + day.icon + '"></i></p><p>'+ day.conditions +'</p><p>' + day.c + '</p>');
    console.log(day);
  }
}