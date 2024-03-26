const POST_COUNT = 10;

const TITLE_ARRAY = [
  'Апартаменты от Собственника!',
  'ЛУЧШАЯ В ЖК! Спешите! Топ вариант',
  'Апартаменты в Mercury Tower!',
  'Уют с видом на город',
  'Гардеробная-Да,Топ Цена,Спешите!',
  'Апартамент или офис для ценителей',
  'Идеальная локация',
];

const TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_ARRAY = ['12:00', '13:00', '14:00'];
const FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const DESCRIPTION_ARRAY = [
  'Сдается просторный, функциональный  апартамент элитного Комплекса',
  'Сдается отличный апартамент',
  'Просторные апартаменты. Меблированы и укомплектованы дизайнерской современной мебелью и техникой.',
  'УГОЛ!!! БЕЗ КОМИССИИ! ТОП АПАРТАМЕНТЫ! ПОКАЗЫ 24/7! ',
  'Апартаменты новые, после ремонта, никто не жил.',
  'Организуем МАКСИМАЛЬНО оперативный показ! Мы на связи и будем рады вам помочь!',
];

const PHOTOS_ARRAY = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;

const getInt = function(minInt, maxInt, countInt = 0){
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

const getUrl = (int) => {
  if (int < 10) {
    return `img/avatars/user0${[int]}.png`;
  } else {
    return `img/avatars/user${[int]}.png`;
  }
};

const createPost = (index) => ({
  author: {
    avatar: getUrl(index),
  },
  offer: {
    title: getValueOfArray(TITLE_ARRAY),
    address: `${getInt(LATITUDE_MIN, LATITUDE_MAX, 5)} ${getInt(LONGITUDE_MIN, LONGITUDE_MAX, 5)}`,
    price: getInt(1, 50000),
    type: getValueOfArray(TYPE_ARRAY),
    rooms: getInt(0, 5),
    guests: getInt(0, 10),
    checkin: getValueOfArray(TIME_ARRAY),
    checkout: getValueOfArray(TIME_ARRAY),
    features: getMixedArray(FEATURES_ARRAY),
    description: getValueOfArray(DESCRIPTION_ARRAY),
    photos: getMixedArray(PHOTOS_ARRAY),
  },
  location: {
    lat: getInt(LATITUDE_MIN, LATITUDE_MAX, 5),
    lng: getInt(LONGITUDE_MIN, LONGITUDE_MAX, 5),
  },
});

const getPosts = () => {
  const posts = [];

  for (let i = 1; i <= POST_COUNT; i++){
    posts.push(createPost(i));
  }

  return posts;
};

getPosts();
