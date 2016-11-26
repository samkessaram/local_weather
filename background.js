var xColors;
var yColors;

function setBackground(conditions,sun){
  var day = ['#ACF0F2','#F3FFE2','#FFFFFF'];
  var night = ['#130523','#090658','#0040A4'];

  var sunny = ['#FF9800','#FFF3AE','#FFC305'];
  var snow = ['#FFFFFF','#DEDEDE','#77E0F6','#B5B5B5','#A2F2F6'];
  var storm = ['#130029','#F3CE2F','#180033','#9B83B5'];
  var rain = ['#49668C','#72808C','#2D3359'];
  var cloudy = ['#263248','#D1DBBD','#7E8AA2','#263248'];
  var partlycloudy = ['#F3E565','#7E8AA2']

  if(sun){
    yColors = day;
    $('#celsius').addClass('day-color');
    $('#fahrenheit').addClass('day-color');
  } else {
    yColors = night;
    $('body').css('color','white');
    $('#celsius').addClass('night-color');
    $('#fahrenheit').addClass('night-color');
  }

  switch(conditions){
    case 'sunny':
    case 'mostlysunny':
    case 'clear':
      xColors = sunny;
      break;
    case 'snow':
    case 'flurries':
    case 'chanceflurries':
    case 'chancesnow':
      xColors = snow;
      break;
    case 'sleat':
    case 'chancerain':
    case 'rain':
      xColors = rain;
      break;
    case 'storm-showers':
    case 'tstorms':
      xColors = storm;
      break;
    case 'partlycloudy':
      xColors = partlycloudy;
      break;
    case 'cloudy':
    case 'mostlycloudy':
      xColors = cloudy;
      break;
    default:
      xColors = cloudy;
  }

  var pattern = Trianglify({
    width: window.innerWidth,
    height: window.innerHeight,
    cell_size: 200,
    x_colors: xColors,
    y_colors: yColors
  })

  pattern.canvas(document.getElementById('canvas'));
  $('body').show();
}


var previousOrientation = window.orientation;
var checkOrientation = function(){
    if(window.orientation !== previousOrientation){
        previousOrientation = window.orientation;
        console.log('orientation changed!');
        // orientation changed, do your magic here
    }
};

window.addEventListener("resize", checkOrientation, false);
window.addEventListener("orientationchange", checkOrientation, false);


$(window).on("orientationchange resize",function(){
  var pattern = Trianglify({
    width: window.innerWidth,
    height: window.innerHeight,
    cell_size: 200,
    x_colors: xColors,
    y_colors: yColors
  });
  pattern.canvas(document.getElementById('canvas'));
});