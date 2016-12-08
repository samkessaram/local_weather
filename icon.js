  function setIcon(weather,sun){
    var weatherIcon;

    if (sun){
      weatherIcon = 'wi-day-';
    } else {
      weatherIcon = 'wi-night-'
    }

    switch(weather){
      case 'clear':
        if (sun){
          weatherIcon += 'sunny';
        } else {
          weatherIcon = 'wi-lunar-eclipse';
        }
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
        weatherIcon += 'cloudy-high';
    }
    
    $('#icon').addClass(weatherIcon);
  };