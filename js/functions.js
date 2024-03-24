// Функция для проверки, является ли строка палиндромом

function checkStr (string) {
  let strConverted;
  let strReversed;

  strConverted = string.replaceAll(' ', '').toLowerCase();
  strReversed = string.replaceAll(' ', '').toLowerCase().split('').reverse().join('');

  if (strConverted === strReversed) {
    console.log('Строка \'' + string + '\' является палиндромом')
  } else {
    console.log('Строка \'' + string + '\' не является палиндромом')
  }
}

// // // Проверка
// checkStr('Ксюша');
// checkStr('топот');
// checkStr('ДовОд');
// checkStr('Кекс');
// checkStr('Лёша на полке клопа нашёл ')


// // Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
// // Если в строке нет ни одной цифры, функция должна вернуть NaN:


function extractNum (param) {
  let extractedNums = '';
  let arr = param.toString().split('');

  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(parseInt((arr[i])))) {
      extractedNums = extractedNums + (arr[i]);
    }
  }

  if (extractedNums == ''){
    return NaN;
  }


  return parseInt(extractedNums);
}

// // Проверка
// console.log(extractNum ('2023 год'));
// console.log(extractNum ('ECMAScript 2022'));
// console.log(extractNum ('1 кефир, 0.5 батона'));
// console.log(extractNum ('агент 007'));
// console.log(extractNum ('а я томат'));

// console.log(extractNum (2023));
// console.log(extractNum (-1));
// console.log(extractNum (1.5));


const getFullStr = function(initStr, lengthStr, sumbols){
  if (initStr.length > lengthStr) {
    return initStr;
  }

  if (initStr.length < lengthStr){
    let lackSumbols = lengthStr - initStr.length;
    let needSymbols = '';

    while (needSymbols.length < lackSumbols) {
      needSymbols = needSymbols + sumbols;
    }

    needSymbols = needSymbols.slice(0, lackSumbols)

    return needSymbols + initStr;
  }
}

// // Проверка
// console.log(getFullStr('1', 2, '0'));      // '01'
// console.log(getFullStr('1', 4, '0'));      // '0001'
// console.log(getFullStr('q', 4, 'werty'));  // 'werq'
// console.log(getFullStr('q', 4, 'we'));     // 'wweq'
// console.log(getFullStr('qwerty', 4, '0')); // 'qwerty'


const getInt = function(minInt, maxInt, countInt){
  if (minInt < 0 || maxInt < 0) {
    return NaN;
  }

  if (maxInt < minInt) {
    let saveInt = maxInt;
    maxInt = minInt;
    minInt = saveInt;
  }

  min = Math.ceil(minInt);
  max = Math.floor(maxInt);
  let floatInt = Math.random() * (max - min + 1) + min; // Максимум и минимум


  return parseFloat(floatInt.toFixed(countInt));
}

// // Проверка
// console.log(getInt(-1, 10, 1));
// console.log(getInt(20, 10, 1));
// console.log(getInt(1, 10, 1));
// console.log(getInt(1, 10, 1));

// Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"
