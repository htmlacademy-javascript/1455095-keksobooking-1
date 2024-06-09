import { addCards } from './map.js';

const filterElement = document.querySelector('.map__filters');
const type = filterElement.querySelector('#housing-type');
const price = filterElement.querySelector('#housing-price');
const rooms = filterElement.querySelector('#housing-rooms');
const guests = filterElement.querySelector('#housing-guests');
// const features = filterElement.querySelector('#housing-features');

const PriceFilter = {
  low: 10000,
  high: 50000,
  middle: 50000,
};

function filterArray(array){
  const newArr = array
    .filter((element) => type.value !== 'any' ? type.value === element.offer.type : true)
    .filter((element) => {
      switch (price.value) {
        case 'any': return true;
        case 'low': return element.offer.price < PriceFilter.low;
        case 'high': return element.offer.price > PriceFilter.high;
        case 'middle': return element.offer.price > PriceFilter.low && element.offer.price < PriceFilter.high;
      }
    })
    .filter((element) => rooms.value !== 'any' ? parseInt(rooms.value, 10) === parseInt(element.offer.rooms, 10) : true)
    .filter((element) => guests.value !== 'any' ? parseInt(guests.value, 10) === parseInt(element.offer.guests, 10) : true);
  addCards(newArr);
}

function filter(data){
  data = data.slice();
  filterElement.addEventListener('change', () => {
    filterArray(data);
  });
}

export { filter };
