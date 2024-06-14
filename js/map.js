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

const mainMarkerLayer = L.layerGroup().addTo(map);

mainMarker.addTo(mainMarkerLayer);

mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  addressInput.value = `Широта ${coordinates.lat.toFixed(5)} Долгота ${coordinates.lng.toFixed(5)}`;
});

const minorMarkerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


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

  addMinorMarker(marker, card);
}

const markerGroup = L.layerGroup().addTo(map);

function addMinorMarker(marker, card){
  marker
    .addTo(markerGroup)
    .bindPopup(card);
}

const addCards = (array) => {
  markerGroup.clearLayers();
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
