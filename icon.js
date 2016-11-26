  function setIcon(conditions){
    var prefix;
    var weatherIcon;
    var daylight = sunUp();
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

    if (daylight){
      prefix = 'wi-day-';
    } else {
      prefix = 'wi-night-'
    }

    setBackground(conditions, daylight);

    switch(conditions){
      case 'clear':
        if (daylight){
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

  function sunUp(){
    var timeNow = new Date();
    var sunrise = new Date();
    var sunset = new Date();
    
    sunrise.setHours(sunTimes.sunrise.hour);
    sunrise.setMinutes(sunTimes.sunrise.minute);
    
    sunset.setHours(sunTimes.sunset.hour);
    sunset.setMinutes(sunTimes.sunset.minute);
    
    return timeNow > sunrise && timeNow < sunset;
  };