import * as Data from './data.js';

const posts = Data.getPosts();

// Выводится ошибка Redundant Boolean call
// function isValueEmpty(value){
//   return !Boolean(value);
// }

function isValueEmpty(value){
  return !value;
}

function gereratePopupFeatures(features) {
  const featuresArray = features.map(
    (feature) => `<li class="popup__feature popup__feature--${feature}"></li>`
  );
  return featuresArray.join('');
}

function getType(value) {
  if (isValueEmpty(value)) {
    return '';
  }

  const type = Data.TYPE_ARRAY_DECODING[value];
  return type ? type : '';
}

// Не разобралась, как использовать условный рендеринг
// При таком написании в случае, если значение существует, то в коде ${isValueEmpty(author.avatar) && 'hidden'} вернется fale и это значение подставится в шаблонную строку
// Аналогично c src="${!(isValueEmpty(author.avatar)) && author.avatar}" - если значения не будет, то в шаблонную строку src подставится false

// function getFilledPostTempalte({ author, offer }) {
//   return `
//     <article class="popup">
//       <img class="popup__avatar ${isValueEmpty(author.avatar) && 'hidden'}" src="${!(isValueEmpty(author.avatar)) && author.avatar}" width="70" height="70" alt="Аватар пользователя">
//       <h3 class="popup__title ${isValueEmpty(offer.title) ? 'hidden' : ''}">${isValueEmpty(offer.title) ? '' : offer.title}</h3>
//       <p class="popup__text popup__text--address ${isValueEmpty(offer.address) ? 'hidden' : ''}">${isValueEmpty(offer.address) ? '' : offer.address}</p>
//       <p class="popup__text popup__text--price ${isValueEmpty(offer.price) ? 'hidden' : ''}">${isValueEmpty(offer.price) ? '' : offer.price}<span>₽/ночь</span></p>
//       <h4 class="popup__type ${isValueEmpty(offer.type) ? 'hidden' : ''}">${getType(offer.type)}</h4>
//       <p class="popup__text popup__text--capacity ${isValueEmpty(offer.guests) && isValueEmpty(offer.rooms) ? 'hidden' : ''}">${isValueEmpty(offer.rooms) ? '' : offer.rooms} комнаты для ${isValueEmpty(offer.guests) ? '' : offer.guests} гостей</p>
//       <p class="popup__text popup__text--time ${isValueEmpty(offer.checkin) && isValueEmpty(offer.checkout) ? 'hidden' : ''}">Заезд после ${isValueEmpty(offer.checkin) ? '' : offer.checkin}, выезд до ${isValueEmpty(offer.checkin) ? '' : offer.checkin}</p>
//       <ul class="popup__features">${gereratePopupFeatures(offer.features)}</ul>
//       <p class="popup__description ${isValueEmpty(offer.description) ? 'hidden' : ''}">${isValueEmpty(offer.description) ? '' : offer.description}</p>
//       <div class="popup__photos">${offer.photos.map((url) =>`<img src="${url}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('')}</div>
//     </article>
//   `;
// }

// Итоговый вариант с тернарным оператором.

function getFilledPostTempalte({ author, offer }) {
  return `
    <article class="popup">
      <img class="popup__avatar ${isValueEmpty(author.avatar) ? 'hidden' : ''}" src="${isValueEmpty(author.avatar) ? '' : author.avatar}" width="70" height="70" alt="Аватар пользователя">
      <h3 class="popup__title ${isValueEmpty(offer.title) ? 'hidden' : ''}">${isValueEmpty(offer.title) ? '' : offer.title}</h3>
      <p class="popup__text popup__text--address ${isValueEmpty(offer.address) ? 'hidden' : ''}">${isValueEmpty(offer.address) ? '' : offer.address}</p>
      <p class="popup__text popup__text--price ${isValueEmpty(offer.price) ? 'hidden' : ''}">${isValueEmpty(offer.price) ? '' : offer.price}<span>₽/ночь</span></p>
      <h4 class="popup__type ${isValueEmpty(offer.type) ? 'hidden' : ''}">${getType(offer.type)}</h4>
      <p class="popup__text popup__text--capacity ${isValueEmpty(offer.guests) && isValueEmpty(offer.rooms) ? 'hidden' : ''}">${isValueEmpty(offer.rooms) ? '' : offer.rooms} комнаты для ${isValueEmpty(offer.guests) ? '' : offer.guests} гостей</p>
      <p class="popup__text popup__text--time ${isValueEmpty(offer.checkin) && isValueEmpty(offer.checkout) ? 'hidden' : ''}">Заезд после ${isValueEmpty(offer.checkin) ? '' : offer.checkin}, выезд до ${isValueEmpty(offer.checkin) ? '' : offer.checkin}</p>
      <ul class="popup__features">${gereratePopupFeatures(offer.features)}</ul>
      <p class="popup__description ${isValueEmpty(offer.description) ? 'hidden' : ''}">${isValueEmpty(offer.description) ? '' : offer.description}</p>
      <div class="popup__photos">${offer.photos.map((url) =>`<img src="${url}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('')}</div>
    </article>
  `;
}

// Как было изначально. На мой взгляд если вынести действия в функцию, то шаблонная строка становится короче и код остается более читабельным. Или нет?

// function getHideClass(...args) {
//   if(args.some(isValueEmpty)){
//     return 'hidden';
//   } else {
//     return '';
//   }
// }

// function getContent(value){
//   if (!(isValueEmpty(value))) {
//     return value;
//   } else {
//     return '';
//   }
// }

// function getFilledPostTempalte({ author, offer }) {
//   return `
//     <article class="popup">
//       <img src="${getContent(author.avatar)}" class="popup__avatar ${getHideClass(author.avatar)}" width="70" height="70" alt="Аватар пользователя">
//       <h3 class="popup__title ${getHideClass(offer.title)}">${getContent(offer.title)}</h3>
//       <p class="popup__text popup__text--address ${getHideClass(offer.address)}">${getContent(offer.address)}</p>
//       <p class="popup__text popup__text--price ${getHideClass(offer.price)}">${getContent(offer.price)} <span>₽/ночь</span></p>
//       <h4 class="popup__type ${getHideClass(offer.type)}">${getType(offer.type)}</h4>
//       <p class="popup__text popup__text--capacity ${getHideClass(offer.rooms, offer.guests)}">${getContent(offer.rooms)} комнаты для ${getContent(offer.guests)} гостей</p>
//       <p class="popup__text popup__text--time ${getHideClass(offer.checkin, offer.checkout)}">Заезд после ${getContent(offer.checkin)}, выезд до ${getContent(offer.checkout)}</p>
//       <ul class="popup__features">${gereratePopupFeatures(offer.features)}</ul>
//       <p class="popup__description ${getHideClass(offer.description)}">${getContent(offer.description)}</p>
//       <div class="popup__photos">${offer.photos.map((url) =>`<img src="${url}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('')}</div>
//     </article>
//   `;
// }

function createPost(post) {
  const postTemplate = getFilledPostTempalte(post);
  const parser = new DOMParser();
  const doc = parser.parseFromString(postTemplate, 'text/html');
  const element = doc.body.firstChild;

  document.querySelector('#map-canvas').append(element);
}

createPost(posts[0]);
