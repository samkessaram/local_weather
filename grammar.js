function parseConditions(str){    // This is parsing the conditions from WUnderground
  if (str.length > 8){            // to make them suitable to display. Out of the possible 
    str = str.split('');          // conditions, if they're over 8 characters long they
    str.splice(6,0,' ');          // are made out of 2 or more words, the first one being 6
    str = str.join('');           // characters long. This puts a space between the first 
  }                               // two words. Below, any further changes are made. 

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
    return 'Partly cloudy';         // For the case of unknown conditons. Safe enough?
  }
  str = str.join('');
  return str;
}