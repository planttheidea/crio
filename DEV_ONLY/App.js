import _ from 'lodash';
import React from 'react';
import {
  render
} from 'react-dom';

import crio from '../src';

// import '../benchmarks';

const array = crio.array(['foo', 'bar', 'baz']);

const listItems = array.map((value, index) => {
  return (
    <li key={`value-${index}`}>
      {value}
    </li>
  );
});

const foo = crio.object({foo: 'bar', bar: 'bar'});

console.log(foo.every((value) => {
  return value === 'bar';
}));

console.log(foo.every((value, key) => {
  return key === 'bar';
}));

console.log(foo.every((value) => {
  return value === 'baz';
}));

console.log(foo.every((value, key) => {
  return key === 'baz';
}));

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
