import * as Data from './data.js';

const posts = Data.getPosts();

function isValueEmpty(value){
  return (value === '' || value === undefined || value === null);
}

function getHideClass(...args) {
  if(args.some(isValueEmpty)){
    return 'hidden';
  } else {
    return '';
  }
}

function getContent(value){
  if (!(isValueEmpty(value))) {
    return value;
  } else {
    return '';
  }
}

function gereratePopupFeatures(features) {
  const featuresArray = features.map(
    (feature) => `<li class="popup__feature popup__feature--${feature}"></li>`
  );
  return featuresArray.join('');
}

function getType(value) {
  if (!(isValueEmpty(value))) {
    for (const prop in Data.TYPE_ARRAY_DECODING) {
      if (prop === value) {
        return Data.TYPE_ARRAY_DECODING[prop];
      }
    }
    return '';
  }
}

function getFilledPostTempalte({ author, offer }) {
  return `
    <article class="popup">
      <img src="${getContent(author.avatar)}" class="popup__avatar ${getHideClass(author.avatar)}" width="70" height="70" alt="Аватар пользователя">
      <h3 class="popup__title ${getHideClass(offer.title)}">${getContent(offer.title)}</h3>
      <p class="popup__text popup__text--address ${getHideClass(offer.address)}">${getContent(offer.address)}</p>
      <p class="popup__text popup__text--price ${getHideClass(offer.price)}">${getContent(offer.price)} <span>₽/ночь</span></p>
      <h4 class="popup__type ${getHideClass(offer.type)}">${getType(offer.type)}</h4>
      <p class="popup__text popup__text--capacity ${getHideClass(offer.rooms, offer.guests)}">${getContent(offer.rooms)} комнаты для ${getContent(offer.guests)} гостей</p>
      <p class="popup__text popup__text--time ${getHideClass(offer.checkin, offer.checkout)}">Заезд после ${getContent(offer.checkin)}, выезд до ${getContent(offer.checkout)}</p>
      <ul class="popup__features">${gereratePopupFeatures(offer.features)}</ul>
      <p class="popup__description ${getHideClass(offer.description)}">${getContent(offer.description)}</p>
      <div class="popup__photos">${offer.photos.map((url) =>`<img src="${url}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('')}</div>
    </article>
  `;
}

function createPost(post) {
  const postTemplate = getFilledPostTempalte(post);
  const parser = new DOMParser();
  const doc = parser.parseFromString(postTemplate, 'text/html');
  const element = doc.body.firstChild;

  document.querySelector('#map-canvas').append(element);
}

createPost(posts[0]);
