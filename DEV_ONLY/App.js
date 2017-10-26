import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';

import crio from '../src';

import '../benchmarks';

const array = crio([
  {key: 0, value: 'foo'},
  {key: 1, value: 'bar'},
  {key: 2, value: 'baz'}
]);

const App = () => {
  return (
    <div>
      <h1>App</h1>

      <h4>Things</h4>

      {array.map(({key, value}) => {
        return <div key={`item-${key}`}>Item: {value}</div>;
      })}
    </div>
  );
};

const div = document.createElement('div');

div.id = 'app-container';

render(<App />, div);

document.body.appendChild(div);
