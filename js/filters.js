// 5.8. Объекты, расположенные неподалёку, можно фильтровать. Фильтрация производится при изменении значений
// соответствующих полей формы .map__filters по тем же параметрам, которые указываются для объявления:

//     тип жилья;
//     цена за ночь;
//     число комнат;
//     число гостей;
//     дополнительные удобства.


// import { createPostElement } from './popup.js';
import { addCards } from './map.js';

const filterElement = document.querySelector('.map__filters');
// const price = filterElement.querySelector('#housing-price');
// const rooms = filterElement.querySelector('#housing-rooms');
// const guests = filterElement.querySelector('#housing-guests');
// const features = filterElement.querySelector('#housing-features');


// function isType(post){
//   const type = filterElement.querySelector('#housing-type');
//   const offer = { post };
//   return type.value === offer.type;
// }


function sortArrType(array){
  const type = filterElement.querySelector('#housing-type');

  type.addEventListener('change', () => {
    if (type.value !== 'any') {
      const newArr = [];
      for (const variable of array) {
        const offer = variable.offer;
        if (type.value === offer.type){
          newArr.push(variable);
        }
      }
      addCards(newArr);
      // return newArr;
    }
  });

}

export function filter(data){
  data = data.slice();
  sortArrType(data);
  // console.log(sortArrType(data));
  // const posts = data;
  // console.log(posts);
}
