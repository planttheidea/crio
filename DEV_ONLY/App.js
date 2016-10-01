import React from 'react';
import {
  render
} from 'react-dom';

import crio from '../src/index';

let array = [];

for (let index = 0, length = 1000; index < length; index++) {
  array.push({
    value: Math.random() * index
  });
}

console.time('new crio create');

let crioArray = crio(array);

console.timeEnd('new crio create');

console.time('new crio setIn');

crioArray.forEach((item, index) => {
  crioArray = crioArray.setIn([index, 'value', 'some', 'deeply', 'nested'], 'thing');
});

console.timeEnd('new crio setIn');

console.log(crioArray);

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
