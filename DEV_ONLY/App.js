import React from 'react';
import {
  render
} from 'react-dom';

import crio from '../src';

import '../benchmarks';

const array = crio.array(['foo', 'bar', 'baz']);

const listItems = array.map((value, index) => {
  return (
    <li key={`value-${index}`}>
      {value}
    </li>
  );
});

console.log(crio.isArray(array));
console.log(crio.isCrio(array));
console.log(crio.isObject(array));

const App = () => {
  return (
    <div>
      <h1>
        App
      </h1>

      <ul>
        {listItems}
      </ul>
    </div>
  );
};

const div = document.createElement('div');

div.id = 'app-container';

render((
  <App/>
), div);

document.body.appendChild(div);
