import React from 'react';
import {
  render
} from 'react-dom';

import crio from '../src';

// const array = crio(['foo', 'bar']);
//
// console.log(array.set(0, 'baz'));


import seamlessImmutable from 'seamless-immutable';

const repeats = [1000, 5000, 10000/*, 50000, 100000, 500000, 1000000, 5000000*/];

const value = Math.random();
const array = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

const objectSetNative = (cycles) => {
  const obj = {value};

  for (let i = 0; i < cycles; i++) {
    const newValue = Math.random();
    Object.assign({}, obj, {value: newValue});
  }
};

const objectSetSeamlessImmutable = (cycles) => {
  const obj = seamlessImmutable.from({value});

  let newValue;

  for (let i = 0; i < cycles; i++) {
    newValue = Math.random();

    obj.set('value', newValue);
  }
};

const objectSetCrio = (cycles) => {
  const obj = crio.object({value});

  let newValue;

  for (let i = 0; i < cycles; i++) {
    newValue = Math.random();

    obj.set('value', newValue);
  }
};

const objectSetInNative = (cycles) => {
  const obj = {
    data: {value},
  };

  for (let i = 0; i < cycles; i++) {
    Object.assign({}, obj, {
      data: Object.assign({}, obj.data, {
        value: Math.random(),
      }),
    });
  }
};

const objectSetInSeamlessImmutable = (cycles) => {
  const obj = seamlessImmutable.from({
    data: {value},
  });

  for (let i = 0; i < cycles; i++) {
    obj.setIn(['data', 'value'], Math.random());
  }
};

const objectSetInCrio = (cycles) => {
  const obj = crio.object({
    data: {value},
  });

  for (let i = 0; i < cycles; i++) {
    obj.setIn(['data', 'value'], Math.random());
  }
};

const arraySetNative = (cycles) => {
  const arr = array;
  const maxIndex = arr.length - 1;

  let newArr, index, newVal;

  for (let i = 0; i < cycles; i++) {
    newArr = [].concat(arr);
    index = ~~(Math.random() * maxIndex);
    newVal = Math.random();

    newArr[index] = newVal;
  }
};

const arraySetCrio = (cycles) => {
  const arr = crio.array(array);
  const maxIndex = arr.length - 1;

  let index, newVal;

  for (let i = 0; i < cycles; i++) {
    index = ~~(Math.random() * maxIndex);
    newVal = Math.random();

    arr.set(index, newVal);
  }
};

const arraySetSeamlessImmutable = (cycles) => {
  const arr = seamlessImmutable.from(array);
  const maxIndex = arr.length - 1;

  let index, newVal;

  for (let i = 0; i < cycles; i++) {
    index = ~~(Math.random() * maxIndex);
    newVal = Math.random();

    arr.set(index, newVal);
  }
};

const arraySetInNative = (cycles) => {
  const arr = [array];
  const maxIndex = arr[0].length - 1;

  let newArr, index;

  for (let i = 0; i < cycles; i++) {
    newArr = [].concat(arr);
    newArr[0] = [].concat(arr[0]);

    index = ~~(Math.random() * maxIndex);

    newArr[0][index] = Math.random();
  }
};

const arraySetInSeamlessImmutable = (cycles) => {
  const arr = seamlessImmutable.from([array]);
  const maxIndex = arr[0].length - 1;

  for (let i = 0; i < cycles; i++) {
    arr.setIn([0, ~~(Math.random() * maxIndex)], Math.random());
  }
};

const arraySetInCrio = (cycles) => {
  const arr = crio([array]);
  const maxIndex = arr[0].length - 1;

  let index;

  for (let i = 0; i < cycles; i++) {
    index = ~~(Math.random() * maxIndex);

    arr.setIn([0, index], Math.random());
  }
};

const test = (name, benchmark, repeats) => {
  return `${name}: ${repeats.map((cycles) => {
    const startTime = Date.now();

    benchmark(cycles);

    return Date.now() - startTime;
  }).join(', ')}`;
};

const nativeObject = test('objectSetNative', objectSetNative, repeats);
const seamlessObject = test('objectSetSeamlessImmutable', objectSetSeamlessImmutable, repeats);
const crioObject = test('objectSetCrio', objectSetCrio, repeats);

console.log(nativeObject);
console.log(seamlessObject);
console.log(crioObject);

const nativeInObject = test('objectSetInNative', objectSetInNative, repeats);
const seamlessInObject = test('objectSetInSeamlessImmutable', objectSetInSeamlessImmutable, repeats);
const crioInObject = test('objectSetInCrio', objectSetInCrio, repeats);

console.log(nativeInObject);
console.log(seamlessInObject);
console.log(crioInObject);

const nativeArray = test('arraySetNative', arraySetNative, repeats);
const seamlessArray = test('arraySetSeamlessImmutable', arraySetSeamlessImmutable, repeats);
const crioArray = test('arraySetCrio', arraySetCrio, repeats);

console.log(nativeArray);
console.log(seamlessArray);
console.log(crioArray);

const nativeInArray = test('arraySetInNative', arraySetInNative, repeats);
const seamlessInArray = test('arraySetInSeamlessImmutable', arraySetInSeamlessImmutable, repeats);
const crioInArray = test('arraySetInCrio', arraySetInCrio, repeats);

console.log(nativeInArray);
console.log(seamlessInArray);
console.log(crioInArray);

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
