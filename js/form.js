import * as Data from './data.js';

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

function enableForm(selector) {
  const block = document.querySelector(selector);
  block.classList.remove(`${selector.replace('.', '')}--disabled`);
  const list = block.querySelectorAll('select, input, button, textarea');

  list.forEach((item) => {
    item.disabled = false;
  });
}

enableForm('.ad-form');
enableForm('.map__filters');

const formElement = document.querySelector('.ad-form');

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  successClass: 'has-success',
  errorTextClass: 'text-help'
});

function validatePrice(value) {
  return /^[0-9]+$/.test(value) && value <= 100000;
}

pristine.addValidator(
  formElement.querySelector('#price'),
  validatePrice
);

function validateCapacity(value) {
  if (value.length) {
    const roomValue = parseInt(formElement.querySelector('#room_number').value, 10);
    const capacityValue = parseInt(value, 10);
    return Data.maxCapacityOfRoom[roomValue].includes(capacityValue);
  }
}

function getCapacityErrorMessage() {
  const roomValue = parseInt(formElement.querySelector('#room_number').value, 10);

  if (roomValue !== 100) {
    return 'В одной комнате должен быть размещен один гость';
  } else {
    return 'Данное помещение не предназначено для гостей';
  }
}

pristine.addValidator(
  formElement.querySelector('#capacity'),
  validateCapacity,
  getCapacityErrorMessage);

formElement.querySelector('#room_number').addEventListener('change', () => {
  pristine.validate(formElement.querySelector('#capacity'));
});

formElement.querySelector('#type').addEventListener('change', () => {
  const houseTypeElement = formElement.querySelector('#type');
  const priceElement = formElement.querySelector('#price');
  priceElement.min = Data.minPriceOfType[houseTypeElement.value];
  priceElement.placeholder = Data.minPriceOfType[houseTypeElement.value];
});

formElement.querySelector('.ad-form__element--time').addEventListener('change', (evt) => {
  if (evt.target.matches('#timein')) {
    formElement.querySelector('#timeout').value = evt.target.value;
  } else {
    formElement.querySelector('#timein').value = evt.target.value;
  }
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    formElement.submit();
  }
});
