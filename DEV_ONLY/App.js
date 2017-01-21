import _ from 'lodash';
import React from 'react';
import {
  render
} from 'react-dom';

import crio from '../src';

// import '../benchmarks';

const array = crio(['foo', 'bar', {baz: {foo: 'bar'}}]);
const mergedArray = array.mergeIn([2, 'baz'], {some: 'thing'});

console.log(mergedArray, mergedArray.thaw());

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
