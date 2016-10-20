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

const collection = crio([{foo: 'bar'}, {foo: 'baz'}]);

console.log(collection.pluck('foo'));

const deepCollection = crio([
  {foo: [{bar: 'foo'}]},
  {foo: [{bar: 'bar'}]},
  {foo: [{bar: 'baz'}]},
  {foo: [{baz: 'bar'}]}
]);

const deepCollectionObject = deepCollection.toObject();

console.log(deepCollectionObject);

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
