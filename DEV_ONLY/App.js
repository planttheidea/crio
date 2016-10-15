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

const arrayArray = crio.array(['foo', ['bar']]);
const newKeyArrayArray = arrayArray.setIn([1, 1], 'baz');

const object = crio.object({complex: {foo: 'bar'}});

console.log(object.includes({foo: 'bar'}));

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
