import { isEscEvent } from './util.js';

const ALERT_SHOW_TIME = 5000;
const SUCCESS_SHOW_TIME = 2000;

const body = document.querySelector('body');

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-active');
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export function showSuccess(){
  const messageElement = body.querySelector('#success').content.querySelector('.success').cloneNode(true);
  body.appendChild(messageElement);

  setTimeout(() => {
    messageElement.remove();
  }, SUCCESS_SHOW_TIME);
}

export function showError(){
  const messageElement = body.querySelector('#error').content.querySelector('.error').cloneNode(true);
  body.appendChild(messageElement);

  window.addEventListener('click', cleanDisplay);
  window.addEventListener('keydown', onWindowKeydown);

  function cleanDisplay(){
    messageElement.remove();
    window.removeEventListener('click', cleanDisplay);
  }

  function onWindowKeydown(evt){
    if (isEscEvent(evt)) {
      evt.preventDefault();
      messageElement.remove();
      window.removeEventListener('keydown', onWindowKeydown);
    }
  }
}
