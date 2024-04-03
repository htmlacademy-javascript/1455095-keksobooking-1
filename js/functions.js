// function checkStr (string) {
//   const strConverted = string.replaceAll(' ', '').toLowerCase();
//   const strReversed = string.replaceAll(' ', '').toLowerCase().split('').reverse().join('');

//   return strConverted === strReversed;
// }

// checkStr('ДовОд');

// function extractNum (param) {
//   let extractedNums = '';
//   const arr = param.toString().split('');

//   for (let i = 0; i < arr.length; i++) {
//     if (!isNaN(parseInt((arr[i]), 10))) {
//       extractedNums = extractedNums + (arr[i]);
//     }
//   }

//   if (extractedNums === ''){
//     return NaN;
//   }

//   return parseInt(extractedNums, 10);
// }

// extractNum('2023 год');

// const getFullStr = function(initStr, lengthStr, sumbols){
//   if (initStr.length > lengthStr) {
//     return initStr;
//   }

//   if (initStr.length < lengthStr){
//     const lackSumbols = lengthStr - initStr.length;
//     let needSymbols = '';

//     while (needSymbols.length < lackSumbols) {
//       needSymbols = needSymbols + sumbols;
//     }

//     needSymbols = needSymbols.slice(0, lackSumbols);

//     return needSymbols + initStr;
//   }
// };

// getFullStr('qwerty', 4, '0');


// const getInt1 = function(minInt, maxInt, countInt = 0){
//   if (minInt < 0 || maxInt < 0) {
//     return NaN;
//   }

//   if (maxInt < minInt) {
//     const saveInt = maxInt;
//     maxInt = minInt;
//     minInt = saveInt;
//   }

//   const floatInt = Math.random() * (maxInt - minInt) + minInt;

//   return parseFloat(floatInt.toFixed(countInt));
// };

// getInt1(1, 2);

/**
* Нужно написать функцию, которая принимает число N и возвращает функцию,
* вызов которой первые N раз возвращает 'yes', а потом  - 'no'.
*/

// function canGetCount(n) {
//   let count = 0;

//   return function(){
//     if (count < n) {
//       count++;
//       return 'yes';
//     } else {
//       return 'no';
//     }
//   }
// };

// const getOne = canGetCount(2);

// console.log(getOne()); // 'yes'
// console.log(getOne()); // 'yes'
// console.log(getOne()); // 'no'

// const array = [1, 2, 3, 4];

// const summ = array.reduce((accumulator, currentValue) => {
//   return accumulator + currentValue;
// }, 0)


// console.log(summ);

// const array1 = [1, 2, 3, 4];

// // 0 + 1 + 2 + 3 + 4
// const initialValue = 0;
// const sumWithInitial = array1.reduce(
//   (accumulator, currentValue) => accumulator + currentValue,
//   initialValue,
// );

// console.log(sumWithInitial);
// // Expected output: 10


// const numbers = [4, 3, 3, 1, 15, 7, 4, 19, 19]; // исходный массив

// const countItems = {}; // здесь будет храниться промежуточный результат

// // получаем объект в котором ключ - это элемент массива, а значение - сколько раз встречается элемент в списке
// // например так будет выглядеть этот объект после цикла:
// // {1: 1, 3: 2, 4: 2, 7: 1, 15: 1, 19: 2}
// // 1 встречается в тексте 1 раз, 2 встречается 2 раза, 4 встречается 2 раза и так далее
// for (const item of numbers) {
//   // если элемент уже был, то прибавляем 1, если нет - устанавливаем 1
//   if (countItems[item]) {
//     countItems[item] = countItems[item] + 1;
//   } else {
//     countItems[item] = 1;
//   }
// }

// // обрабатываем ключи объекта, отфильтровываем все, что меньше 1
// const result = Object.keys(countItems).filter((item) => countItems[item] > 1);
// console.log(result); // => ['3', '4', '19']
