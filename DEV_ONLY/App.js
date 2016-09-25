import React from 'react';
import {
  render
} from 'react-dom';

import crio from '../src-new/index';
import crioOld from '../src/index';

let array = [];

for (let index = 0, length = 1000; index < length; index++) {
  array.push({
    value: Math.random() * index
  });
}

console.log(array);

console.time('create');

const crioArray = crio(array);

console.timeEnd('create');

console.time('create old');

const crioOldArray = crioOld(array);

console.timeEnd('create old');

console.time('map');

const mapped = crioArray.map(({value}) => {
  return {
    rand: Math.random() * value
  };
});

console.timeEnd('map');

console.time('map old');

const mappedOld = crioOldArray.map(({value}) => {
  return {
    rand: Math.random() * value
  };
});

console.timeEnd('map old');

console.log(mappedOld);

console.time('filter');

const filtered = mapped.filter((value, index) => {
  return index % 2;
});

console.timeEnd('filter');

console.log(filtered);

console.time('filter old');

const filteredOld = mappedOld.filter((value, index) => {
  return index % 2;
});

console.timeEnd('filter old');

console.log(filteredOld);











const crioObject = crio({
  foo: 'bar',
  bar: 'baz'
});

console.log(crioObject);

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
