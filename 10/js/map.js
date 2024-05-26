import { enableForm } from './form.js';
import { posts } from './data.js';
import { createCard } from './popup.js';


const LAT_MAIN = 35.6850;
const LNG_MAIN = 139.7528;

const addressInput = document.querySelector('#address');

addressInput.value = `Lat ${LAT_MAIN} Lng ${LNG_MAIN}`;

const map = L.map('map-canvas')
  .on('load', () => {
    enableForm('.ad-form');
    enableForm('.map__filters');
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

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});


const mainMarker = L.marker(
  {
    lat: LAT_MAIN,
    lng: LNG_MAIN,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  addressInput.value = `Lat ${coordinates.lat.toFixed(5)} Lng ${coordinates.lng.toFixed(5)}`;
});

// вернуть координату на место
// resetButton.addEventListener('click', () => {
//   mainMarker.setLatLng({
//     lat: 59.96831,
//     lng: 30.31748,
//   });

// вернуть настройки карты на место
// map.setView({
//   lat: 59.96831,
//   lng: 30.31748,
// }, 16);
// });

const minorPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createMinorMarker = (lat, lng, card) => {
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      minorPinIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(card);
};

for (const variable of posts) {
  const { offer } = variable;
  const [lat, lng] = offer.address.split(' ');
  const card = createCard(variable);

  createMinorMarker(lat, lng, card);
}


