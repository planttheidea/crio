import React from 'react';
import {
  render
} from 'react-dom';

import crio from '../src';

let index = -1,
    items = [];

while (++index < 1000) {
  items.push({
    some: {
      deeply: {
        nested: 'object'
      }
    }
  });
}

let crioItems = crio(items);

const App = () => {
  console.time('crio');

  crioItems.forEach(() => {
    crioItems = crioItems.setIn([0, 'some', 'deeply', 'nested'], 'thing');
  });
  
  console.timeEnd('crio');

  console.log(crioItems);

  console.time('native');

  items.forEach((item, index) => {
    items[index].some.deeply.nested = 'thing';
  });

  console.timeEnd('native');

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
