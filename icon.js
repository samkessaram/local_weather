function chooseIcon(weather,sun){
  var weatherIcon;

  weatherIcon = sun ? 'wi-day-' : 'wi-night-';

  switch(weather){
    case 'clear':
      weatherIcon = sun ? 'wi-day-sunny' : 'wi-lunar-eclipse';
      break;
    case 'partlysunny':
      weatherIcon += 'cloudy';
      break;
    case 'hazy':
    case 'fog':
      weatherIcon += 'fog';
      break;
    case 'tstorms':
      weatherIcon += 'lightning';
      break;
    case 'rain':
      weatherIcon += 'rain';
      break;
    case 'chancerain':
      weatherIcon += 'showers';
      break;
    case 'chancesnow':
    case 'chanceflurries':
    case 'flurries':
    case 'snow':
      weatherIcon += 'snow';
      break;
    case 'sleat':
    case 'chancesleat':
      weatherIcon += 'sleet';
      break;
    case 'chancetstorms':
      weatherIcon += 'storm-showers';
      break;
    case 'mostlysunny':
    case 'sunny':
      weatherIcon += 'sunny';
      break;      
    case 'cloudy':
    case 'mostlycloudy':
      weatherIcon = 'wi-cloudy';
      break;
    case 'unknown':
      weatherIcon = 'wi-na';
      break;
    case 'partlycloudy':
    default:
      weatherIcon += 'cloudy-high'; // Partly cloudy icon just in case there's no match. 
  }

  return weatherIcon;
  
};

function setIcon(weather,sun){
  $('#icon').removeClass().addClass('wi ' + chooseIcon(weather,sun));
}