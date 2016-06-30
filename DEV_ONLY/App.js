import React from 'react';
import {
    render
} from 'react-dom';

import crio from '../src';

const array = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

const REPEATS = [1000, 5000, 10000, 50000, 100000/*, 500000, 1000000, 5000000*/];

const crioArray = crio(array);
const maxIndex = crioArray.length -1;

const test = (cycles) => {
    const start = Date.now();

    for (let index = 0; index < cycles; index++) {
        const i = ~~(Math.random() * maxIndex);
        const newVal = Math.random();

        crioArray.setIn([0, i], newVal);
    }

    return Date.now() - start;
};

const results = REPEATS.map(test);
const sum = results.reduce((total, result) => {
    return total + result;
}, 0);

console.log(sum);

// const crioObject = crio({
//     foo: {
//         bar: 'baz'
//     },
//     some: {
//         other: 'object'
//     }
// });
//
// crioObject.setIn(['foo', 'bar'], 'baz');

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
