import { initMap } from './map.js';
import { showAlert, showError} from './show-message.js';
import { filter } from './filters.js';

const BASE_URL = 'https://28.javascript.htmlacademy.pro/keksobooking';

// На время выполнения запроса к серверу кнопка «Опубликовать» блокируется.
// При сбросе фильтрация отфильтрованные метки сбрасывается;

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const getData = function(callback){
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showAlert(`${ErrorText.GET_DATA}`);
    })
    .then((data) => {
      callback(data);
      filter(data);
    })
    .catch(() => {
      showAlert(`${ErrorText.GET_DATA}`);
    });
};

getData(initMap);

const sendData = function(formData, callback){
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
      callback();
    })
    .catch(() => {
      showError();
    });
};


export { sendData };
