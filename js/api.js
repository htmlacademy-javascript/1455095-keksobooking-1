import { addCards } from './map.js';
import { enableForm, resetForm} from './form.js';
import { showAlert, showSuccess, showError} from './show-message.js';

const BASE_URL = 'https://28.javascript.htmlacademy.pro/keksobooking';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};


const getData = function(){
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showAlert(`${ErrorText.GET_DATA}`);
    })
    .then((data) => {
      addCards(data);
      enableForm('.map__filters');
    })
    .catch(() => {
      showAlert(`${ErrorText.GET_DATA}`);
    });
};

getData();

const sendData = function(formData){
  fetch(
    `${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      showSuccess();
      resetForm();
    })
    .catch(() => {
      showError();
    });
};

export { sendData };
