function inputForecast(forecast){
  console.log(forecast);
  var threeDay = []
  for (var i = 1; i < forecast.length; i++){
    var data = forecast[i];
    var day = {
      "day": data.date.weekday,
      "conditions": chooseIcon(data.icon,true),
    };
    console.log(day);
  }
}