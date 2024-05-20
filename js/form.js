const maxCapacityOfRoom = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const minPriceOfType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const formElement = document.querySelector('.ad-form');
const priceExpression = /^[0-9]+$/;
const maxPrice = 100000;
const roomNumber = formElement.querySelector('#room_number');

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

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  successClass: 'has-success',
  errorTextClass: 'text-help'
});


function validatePrice(value) {
  return priceExpression.test(value) && value <= maxPrice;
}

pristine.addValidator(
  formElement.querySelector('#price'),
  validatePrice
);

function validateCapacity(value) {
  if (!value.length) {
    return;
  }

  const roomValue = parseInt(formElement.querySelector('#room_number').value, 10);
  const capacityValue = parseInt(value, 10);
  return maxCapacityOfRoom[roomValue].includes(capacityValue);
}


function getCapacityErrorMessage() {
  const roomValue = parseInt(roomNumber.value, 10);

  return roomValue !== 100 ? 'В одной комнате должен быть размещен один гость' : 'Данное помещение не предназначено для гостей';
}

pristine.addValidator(
  formElement.querySelector('#capacity'),
  validateCapacity,
  getCapacityErrorMessage);

roomNumber.addEventListener('change', () => {
  pristine.validate(formElement.querySelector('#capacity'));
});

formElement.querySelector('#type').addEventListener('change', () => {
  const houseTypeElement = formElement.querySelector('#type');
  const priceElement = formElement.querySelector('#price');
  priceElement.min = minPriceOfType[houseTypeElement.value];
  priceElement.placeholder = minPriceOfType[houseTypeElement.value];
});

formElement.querySelector('.ad-form__element--time').addEventListener('change', (evt) => {
  if (evt.target.matches('#timein')) {
    formElement.querySelector('#timeout').value = evt.target.value;
  } else {
    formElement.querySelector('#timein').value = evt.target.value;
  }
});

const onFormElementSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    formElement.submit();
  }
};

formElement.addEventListener('submit', onFormElementSubmit);
