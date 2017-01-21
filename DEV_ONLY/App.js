import _ from 'lodash';
import React from 'react';
import {
  render
} from 'react-dom';

import crio from '../src';

// import '../benchmarks';

const object = crio({foo: ['bar', {baz: 'foo', foo: 'bar'}]});
const deletedObject = object.deleteIn(['foo', 1, 'baz']);

console.log(deletedObject, deletedObject.thaw());

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
