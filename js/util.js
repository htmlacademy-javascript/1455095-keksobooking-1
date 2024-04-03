const getInt = (minInt, maxInt, countInt = 0) => {
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

const getValueOfArray = (array) => array[getInt(0, array.length - 1)];

const getMixedArray = (initArray) => {
  const randomLength = getInt(0, initArray.length - 1);
  const mixedArray = [];

  for (let i = 0; i <= randomLength; i++) {
    const randomIndex = getInt(0, initArray.length - 1);
    const randomValue = initArray[randomIndex];

    if (mixedArray.includes(randomValue)) {
      continue;
    }

    mixedArray.push(randomValue);
  }

  return mixedArray;
};

export {getInt, getValueOfArray, getMixedArray};