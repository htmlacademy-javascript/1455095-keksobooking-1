import { addCards } from './map.js';
import { debounce } from './util.js';

const filterElement = document.querySelector('.map__filters');
const type = filterElement.querySelector('#housing-type');
const price = filterElement.querySelector('#housing-price');
const rooms = filterElement.querySelector('#housing-rooms');
const guests = filterElement.querySelector('#housing-guests');
const featuresElement = filterElement.querySelector('#housing-features');

const PriceFilter = {
  low: 10000,
  high: 50000,
};

function filterArray(array){
  let newArr = array
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

  const featuresList = featuresElement.querySelectorAll('.map__checkbox');
  const matches = Array.from(featuresList).some((item) => item.checked === true);

  if (matches) {
    newArr = newArr.filter((element) => {
      const features = element.offer.features || [];
      const filterWifi = document.querySelector('#filter-wifi').checked ? features.includes('wifi') : true;
      const filterDishwasher = document.querySelector('#filter-dishwasher').checked ? features.includes('dishwasher') : true;
      const filterParking = document.querySelector('#filter-parking').checked ? features.includes('parking') : true;
      const filterWasher = document.querySelector('#filter-washer').checked ? features.includes('washer') : true;
      const filterElevator = document.querySelector('#filter-elevator').checked ? features.includes('elevator') : true;
      const filterConditioner = document.querySelector('#filter-conditioner').checked ? features.includes('conditioner') : true;

      return filterWifi && filterDishwasher && filterParking && filterWasher && filterElevator && filterConditioner;
    });
  }

  addCards(newArr);
}

function filter(data){
  data = data.slice();
  filterElement.addEventListener('change', debounce(() => {
    filterArray(data);
  }));

  filterElement.addEventListener('reset', () => {
    addCards(data);
  });
}

function resetFilters(){
  filterElement.reset();
}

export { filter, resetFilters };
