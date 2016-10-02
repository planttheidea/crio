import React from 'react';
import {
  render
} from 'react-dom';

import crio from '../src';

const repeats = [1000, 5000, 10000, 50000, 100000/*, 500000, 1000000, 5000000*/];

const value = Math.random();
const array = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

const objectSetNative = (cycles) => {
  const obj = {value};
  for (let i = 0; i < cycles; i++) {
    const newValue = Math.random();
    Object.assign({}, obj, {value: newValue});
  }
};

const objectSetCrio = (cycles) => {
  const obj = crio({value});
  for (let i = 0; i < cycles; i++) {
    const newValue = Math.random();
    obj.set('value', newValue);
  }
};

const arraySetNative = (cycles) => {
  const arr = array;
  const maxIndex = arr.length - 1;
  for (let i = 0; i < cycles; i++) {
    const newArr = [].concat(arr);
    const index = ~~(Math.random() * maxIndex);
    const newVal = Math.random();
    newArr[index] = newVal;
  }
};

const arraySetCrio = (cycles) => {
  const arr = crio(array);
  const maxIndex = arr.length - 1;
  for (let i = 0; i < cycles; i++) {
    const index = ~~(Math.random() * maxIndex);
    const newVal = Math.random();
    arr.set(index, newVal);
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
const crioObject = test('objectSetCrio', objectSetCrio, repeats);

console.log(nativeObject);
console.log(crioObject);

const nativeArray = test('arraySetNative', arraySetNative, repeats);
const crioArray = test('arraySetCrio', arraySetCrio, repeats);

console.log(nativeArray);
console.log(crioArray);

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
