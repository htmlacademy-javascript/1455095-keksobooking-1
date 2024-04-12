import * as U from './util.js';

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

export const typeDecoding = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

export const featuresDecoding = {
  wifi: 'Wi-Fi',
  dishwasher: 'посудомойка',
  parking: 'парковка',
  washer: 'стиральная машина',
  elevator: 'лифт',
  conditioner: 'кондиционер',
};

const getUrl = (int) => int < 10 ? `img/avatars/user0${[int]}.png` : `img/avatars/user${[int]}.png`;

const createDataPost = (index) => ({
  author: {
    avatar: getUrl(index),
  },
  offer: {
    title: U.getValueOfArray(TITLE_ARRAY),
    address: `${U.getInt(LATITUDE_MIN, LATITUDE_MAX, 5)} ${U.getInt(LONGITUDE_MIN, LONGITUDE_MAX, 5)}`,
    price: U.getInt(1, 50000),
    type: U.getValueOfArray(TYPE_ARRAY),
    rooms: U.getInt(0, 5),
    guests: U.getInt(0, 10),
    checkin: U.getValueOfArray(TIME_ARRAY),
    checkout: U.getValueOfArray(TIME_ARRAY),
    features: U.getMixedArray(FEATURES_ARRAY),
    description: U.getValueOfArray(DESCRIPTION_ARRAY),
    photos: U.getMixedArray(PHOTOS_ARRAY),
  },
  location: {
    lat: U.getInt(LATITUDE_MIN, LATITUDE_MAX, 5),
    lng: U.getInt(LONGITUDE_MIN, LONGITUDE_MAX, 5),
  },
});

export const getPosts = () => {
  const posts = [];

  for (let i = 1; i <= POST_COUNT; i++){
    posts.push(createDataPost(i));
  }

  return posts;
};
