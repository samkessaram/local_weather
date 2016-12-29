var xColors;
var yColors;

function setBackground(weather,sun){

  if(sun){
    yColors = ['#ACF0F2','#F3FFE2','#FFFFFF'];
    $('#celsius, #fahrenheit').addClass('day-color');
  } else {
    yColors = ['#130523','#090658','#0040A4'];
    $('body, #temperature-units, #celsius, #fahrenheit, .callout').addClass('night-color');
  }

  switch(weather){
    case 'sunny':
    case 'mostlysunny':
    case 'clear':
      xColors = ['#FF9800','#FFF3AE','#FFC305'];
      break;
    case 'snow':
    case 'flurries':
    case 'chanceflurries':
    case 'chancesnow':
      xColors = ['#FFFFFF','#DEDEDE','#77E0F6','#B5B5B5','#A2F2F6'];
      break;
    case 'sleat':
    case 'chancerain':
    case 'rain':
      xColors = ['#49668C','#72808C','#2D3359'];
      break;
    case 'storm-showers':
    case 'tstorms':
      xColors = ['#130029','#F3CE2F','#180033','#9B83B5'];
      break;
    case 'cloudy':
    case 'mostlycloudy':
      xColors = ['#263248','#D1DBBD','#7E8AA2','#263248'];
      break;
    default:
      xColors = ['#F3E565','#7E8AA2'];
  }

  var pattern = Trianglify({
    width: window.innerWidth,
    height: window.innerHeight,
    cell_size: 200,
    x_colors: xColors,
    y_colors: yColors
  })

  pattern.canvas(document.getElementById('canvas'));
  $('.container, canvas').fadeIn(1000);
}

$(window).on("orientationchange resize",function(){
  if ( xColors ){
    var pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight,
      cell_size: 200,
      x_colors: xColors,
      y_colors: yColors
    });
    pattern.canvas(document.getElementById('canvas'));
  }
});