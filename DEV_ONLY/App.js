import React from 'react';
import {
    render
} from 'react-dom';

import crio from '../src';

import Immutable from 'immutable';

const ARRAY_SIZE = 1009;

let arrayForCrio = [],
    arrayForImmutable = [];

for (let i = 0; i < ARRAY_SIZE; i++) {
  arrayForCrio.push({
      index: 'test'
  });
    arrayForImmutable.push({
        index: i
    });
}

console.log('crio create');

const crioCreateStart = Date.now();

const crioArray = crio(arrayForCrio);

console.log(Date.now() - crioCreateStart);

console.log('immutable create');

const immutableCreateStart = Date.now();

Immutable.List(arrayForImmutable);

console.log(Date.now() - immutableCreateStart);

console.log('crio push');

const crioPushStart = Date.now();

let crioPush = crio([]);

for (let index = 0; index < ARRAY_SIZE; index++) {
  crioPush = crioPush.push({
    index
  });
}

console.log(Date.now() - crioPushStart);

const App = () => {
    return (
        <div>
            App
        </div>
    );
};

const div = document.createElement('div');

div.id = 'app-container';

render((
    <App/>
), div);

document.body.appendChild(div);
