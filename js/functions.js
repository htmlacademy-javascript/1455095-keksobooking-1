function checkStr (string) {
  const strConverted = string.replaceAll(' ', '').toLowerCase();
  const strReversed = string.replaceAll(' ', '').toLowerCase().split('').reverse().join('');

  return strConverted === strReversed;
}

checkStr('ДовОд');

function extractNum (param) {
  let extractedNums = '';
  const arr = param.toString().split('');

  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(parseInt((arr[i]), 10))) {
      extractedNums = extractedNums + (arr[i]);
    }
  }

  if (extractedNums === ''){
    return NaN;
  }

  return parseInt(extractedNums, 10);
}

extractNum('2023 год');

const getFullStr = function(initStr, lengthStr, sumbols){
  if (initStr.length > lengthStr) {
    return initStr;
  }

  if (initStr.length < lengthStr){
    const lackSumbols = lengthStr - initStr.length;
    let needSymbols = '';

    while (needSymbols.length < lackSumbols) {
      needSymbols = needSymbols + sumbols;
    }

    needSymbols = needSymbols.slice(0, lackSumbols);

    return needSymbols + initStr;
  }
};

getFullStr('qwerty', 4, '0');


const getInt1 = function(minInt, maxInt, countInt = 0){
  if (minInt < 0 || maxInt < 0) {
    return NaN;
  }

  if (maxInt < minInt) {
    const saveInt = maxInt;
    maxInt = minInt;
    minInt = saveInt;
  }

  const floatInt = Math.random() * (maxInt - minInt) + minInt;

  return parseFloat(floatInt.toFixed(countInt));
};

getInt1(1, 2);
