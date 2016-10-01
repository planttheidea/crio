import React from 'react';
import {
  render
} from 'react-dom';

import crio from '../src/index';
import oldCrio from '../src-old/index';

// let array = [];
//
// for (let index = 0, length = 1000; index < length; index++) {
//   array.push({
//     value: Math.random() * index
//   });
// }
//
// console.time('old crio create');
//
// let oldCrioArray = oldCrio(array);
//
// console.timeEnd('old crio create');
//
// console.time('old crio setIn');
//
// oldCrioArray.forEach((item, index) => {
//   oldCrioArray = oldCrioArray.setIn([index, 'value', 'some', 'deeply', 'nested'], 'thing');
// });
//
// console.timeEnd('old crio setIn');
//
// console.time('new crio create');
//
// let crioArray = crio(array);
//
// console.timeEnd('new crio create');
//
// console.time('new crio setIn');
//
// crioArray.forEach((item, index) => {
//   crioArray = crioArray.setIn([index, 'value', 'some', 'deeply', 'nested'], 'thing');
// });
//
// console.timeEnd('new crio setIn');
//
// console.log(crioArray);
// console.log(oldCrioArray);

const array = crio(['foo', 'foo', 'bar', 'foo', 'bar', {foo: 'bar'}, {foo: 'bar'}]);

console.log(array);
console.log(array.unique());

const App = () => {
  return (
    <div>
      <h1>
        App
      </h1>
    </div>
  );
};

const div = document.createElement('div');

div.id = 'app-container';

render((
  <App/>
), div);

document.body.appendChild(div);
