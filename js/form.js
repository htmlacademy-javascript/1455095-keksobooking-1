import { sendData } from './api.js';
import { resetMap } from './map.js';
import { showSuccess } from './show-message.js';

const MIN_PRICE_OF_TYPE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const MAX_CAPACITY_OF_ROOM = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const EXPRESSION_PRICE = /^[0-9]+$/;
const MAX_PRICE = 100000;

const formElement = document.querySelector('.ad-form');
const filtersElement = document.querySelector('.map__filters');
const roomElement = formElement.querySelector('#room_number');
const priceElement = formElement.querySelector('#price');
const houseElement = formElement.querySelector('#type');
const capacityElement = formElement.querySelector('#capacity');
const sliderElement = formElement.querySelector('.ad-form__slider');
const resetButtonElement = formElement.querySelector('.ad-form__reset');

formElement.querySelector('.ad-form__element--time').addEventListener('change', (evt) => {
  if (evt.target.matches('#timein')) {
    formElement.querySelector('#timeout').value = evt.target.value;
  } else {
    formElement.querySelector('#timein').value = evt.target.value;
  }
});

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  successClass: 'has-success',
  errorTextClass: 'text-help'
});

houseElement.addEventListener('change', () => {
  priceElement.min = MIN_PRICE_OF_TYPE[houseElement.value];
  priceElement.placeholder = MIN_PRICE_OF_TYPE[houseElement.value];
  pristine.validate(priceElement);
});

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 10,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('change', () => {
  priceElement.value = parseInt(sliderElement.noUiSlider.get(), 10);
  pristine.validate(priceElement);
});

priceElement.addEventListener('input', () => {
  sliderElement.noUiSlider.set(priceElement.value);
});

function validatePrice(value) {
  return EXPRESSION_PRICE.test(value) && parseInt(value, 10) > formElement.querySelector('#price').min && parseInt(value, 10) <= MAX_PRICE;
}

function getPriceErrorMessage(value) {
  if (!(EXPRESSION_PRICE.test(value))) {
    return 'Введите число';
  } else if (!(parseInt(value, 10) > formElement.querySelector('#price').min)) {
    return `Минимальная стоимость для этого типа жилья ${formElement.querySelector('#price').min}`;
  } else if (!(parseInt(value, 10) <= MAX_PRICE)) {
    return 'Максимальная стоимость 100000';
  }
}

pristine.addValidator(
  priceElement,
  validatePrice,
  getPriceErrorMessage
);

function validateCapacity(value) {
  if (!value.length) {
    return;
  }

  const roomValue = parseInt(formElement.querySelector('#room_number').value, 10);
  const capacityValue = parseInt(value, 10);
  return MAX_CAPACITY_OF_ROOM[roomValue].includes(capacityValue);
}

function getCapacityErrorMessage() {
  const roomValue = parseInt(roomElement.value, 10);
  return roomValue !== 100 ? 'В одной комнате должен быть размещен один гость' : 'Данное помещение не предназначено для гостей';
}

pristine.addValidator(
  capacityElement,
  validateCapacity,
  getCapacityErrorMessage);

roomElement.addEventListener('change', () => {
  pristine.validate(formElement.querySelector('#capacity'));
});

export function resetForm(){
  formElement.reset();
  filtersElement.reset();
  resetMap();
  priceElement.placeholder = 0;
  sliderElement.noUiSlider.reset();
}

function completeSend(){
  showSuccess();
  resetForm();
}

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    sendData(formData, completeSend);
  }
});

resetButtonElement.addEventListener('click', resetForm);

function disableForm(selector) {
  const block = document.querySelector(selector);
  block.classList.add(`${selector.replace('.', '')}--disabled`);
  const list = block.querySelectorAll('select, input, button, textarea');

  list.forEach((item) => {
    item.disabled = true;
  });
}

disableForm('.ad-form');
disableForm('.map__filters');


export function enableForm(selector) {
  const block = document.querySelector(selector);
  block.classList.remove(`${selector.replace('.', '')}--disabled`);
  const list = block.querySelectorAll('select, input, button, textarea');

  list.forEach((item) => {
    item.disabled = false;
  });
}
