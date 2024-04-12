import * as Data from './data.js';

const posts = Data.getPosts();

const container = document.querySelector('#map-canvas');
const postTemplate = document.querySelector('#card').content.querySelector('.popup');

const createPost = (post) => {
  const postElement = postTemplate.cloneNode(true);
  const offer = post.offer;

  const checkInsert = (selector, value) => {
    const element = postElement.querySelector(selector);
    if (value) {
      element.textContent = value;
    } else {
      element.style.display = 'none';
    }
  };

  checkInsert('.popup__title', offer.title);
  checkInsert('.popup__text--address', offer.address);
  checkInsert('.popup__description', offer.description);
  checkInsert('.popup__avatar', post.author.avatar);


  if (offer.price) {
    postElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  } else {
    postElement.querySelector('.popup__text--price').style.display = 'none';
  }

  if (offer.rooms && offer.guests) {
    postElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    postElement.querySelector('.popup__text--capacity').style.display = 'none';
  }

  if (offer.checkin && offer.checkout) {
    postElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    postElement.querySelector('.popup__text--time').style.display = 'none';
  }

  if (offer.type){
    for (const prop in Data.typeDecoding) {
      if (prop === offer.type) {
        postElement.querySelector('.popup__type').textContent = Data.typeDecoding[prop];
      }
    }
  }

  if (offer.features) {
    const arrRusFeatures = [];

    offer.features.forEach((element) => {
      for (const prop in Data.featuresDecoding) {
        if (element === prop) {
          arrRusFeatures.push(Data.featuresDecoding[prop]);
        }
      }
    });

    postElement.querySelector('.popup__features').textContent = arrRusFeatures.join(', ');
  }

  if (offer.photos){
    const photoList = postElement.querySelector('.popup__photos');
    const photoElement = postElement.querySelector('.popup__photo').cloneNode(true);
    postElement.querySelector('.popup__photo').remove();

    for (const value of offer.photos) {
      const photoClone = photoElement.cloneNode(true);
      photoClone.src = value;
      photoList.append(photoClone);
    }
  }

  const postFragment = document.createDocumentFragment();
  postFragment.append(postElement);
  container.append(postFragment);
};

createPost(posts[0]);

