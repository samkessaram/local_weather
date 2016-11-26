  function setIcon(conditions,sun){
    var prefix;
    var weatherIcon;
    var icons = {
      partlysunny: 'cloudy',
      partlycloudy: 'cloudy-high',
      unknown: 'cloudy-high',
      hazy: 'fog',
      fog: 'fog',
      tstorms: 'lightning',
      rain: 'rain',
      chancerain: 'showers',
      chancesnow: 'snow',
      chanceflurries: 'snow',
      flurries: 'snow',
      snow: 'snow',
      sleat: 'sleet',
      chancesleat: 'sleet',
      chancetstorms: 'storm-showers', 
      mostlysunny: 'sunny',
      sunny: 'sunny'
    }

    if (sun){
      prefix = 'wi-day-';
    } else {
      prefix = 'wi-night-'
    }

    switch(conditions){
      case 'clear':
        if (sun){
          weatherIcon = prefix + 'sunny';
        } else {
          weatherIcon = 'wi-lunar-eclipse';
        }
        break;
      case 'cloudy':
      case 'mostlycloudy':
        weatherIcon = 'wi-cloudy';
        break;
      default:
        weatherIcon = prefix + icons[conditions];
    }
    
    $('#icon').addClass(weatherIcon);
  };