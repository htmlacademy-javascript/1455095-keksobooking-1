function disableForm(selector) {
  const block = document.querySelector(selector);
  block.classList.add(`${selector.replace('.', '')}--disabled`);
  const list = block.querySelectorAll('select, input, button, textarea');

  list.forEach((item) => {
    item.setAttribute('disabled', '');
  });
}

disableForm('.ad-form');
disableForm('.map__filters');

function enableForm(selector) {
  const block = document.querySelector(selector);
  block.classList.remove(`${selector.replace('.', '')}--disabled`);
  const list = block.querySelectorAll('select, input, button, textarea');

  list.forEach((item) => {
    item.removeAttribute('disabled');
  });
}

enableForm('.ad-form');
enableForm('.map__filters');
