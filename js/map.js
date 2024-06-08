import { enableForm } from './form.js';
import { createPostElement } from './popup.js';

const LAT_MAIN = 35.6850;
const LNG_MAIN = 139.7528;

const addressInput = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    enableForm('.ad-form');
  })
  .setView({
    lat: LAT_MAIN,
    lng: LNG_MAIN,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const minorMarkerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: LAT_MAIN,
    lng: LNG_MAIN,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);

function createMinorMarker(lat, lng, card) {
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      minorMarkerIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(card);
}

mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  addressInput.value = `Lat ${coordinates.lat.toFixed(5)} Lng ${coordinates.lng.toFixed(5)}`;
});

const addCards = (array) => {
  array = array.slice(0, 10);
  for (const variable of array) {
    const { location } = variable;
    const [lat, lng] = [location.lat, location.lng];
    const card = createPostElement(variable);
    createMinorMarker(lat, lng, card);
  }
};

const resetMap = function(){
  mainMarker.setLatLng({
    lat: LAT_MAIN,
    lng: LNG_MAIN,
  });
  map.setView({
    lat: LAT_MAIN,
    lng: LNG_MAIN,
  }, 12);
};

function initMap(data){
  addCards(data);
  enableForm('.map__filters');
}

export { initMap, addCards, resetMap };
