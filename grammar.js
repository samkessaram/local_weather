function parseConditions(str){
  if (str.length > 8){
    str = str.split('');
    str.splice(6,0,' ');
    str = str.join('');
  }

  if (str.includes('tstorms')){
    str.replace('tstorms','thunderstorms')
  }

  if (str.includes('chance')){
    str.replace('chance','chance of')
  }

  if (str.includes('sleat')){
    str.replace('sleat','sleet')
  }

  return upcase(str);
}


function upcase(str){
  str = str.split('');
  if ( str[0] ){
    str[0] = str[0].toUpperCase();
  } else {
    return 'Partly cloudy';
  }
  str = str.join('');
  return str;
}