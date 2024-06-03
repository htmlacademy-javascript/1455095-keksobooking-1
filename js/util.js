

export const getInt = (minInt, maxInt, countInt = 0) => {
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

export const getValueOfArray = (array) => array[getInt(0, array.length - 1)];

export const getMixedArray = (initArray) => {
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

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
}

export const isEscEvent = (evt) => {
  return (evt.key === Keys.ESC || evt.key === Keys.ESCAPE)
};

