import React from 'react';
import {
    render
} from 'react-dom';

import crio from '../src';
import Immutable from 'immutable';

const ARRAY_SIZE = 100;

let crioArray = crio([]),
    immutableArray = Immutable.List([]);

const crioStart = Date.now();

console.log('crio push');

for (let i = 0; i < ARRAY_SIZE; i++) {
    crioArray = crioArray.push({
        index: i
    });
}

console.log(Date.now() - crioStart);

const immutableStart = Date.now();

console.log('immutable push');

for (let i = 0; i < ARRAY_SIZE; i++) {
    immutableArray = immutableArray.push({
        index: i
    });
}

console.log(Date.now() - immutableStart);

const crioStartMap = Date.now();

console.log('map crio');

crioArray = crioArray.map((item, i) => {
    return {
        index: i
    };
});

console.log(Date.now() - crioStartMap);

const immutableStartMap = Date.now();

console.log('map immutable');

immutableArray = immutableArray.map((item, i) => {
    return {
        index: i
    };
});

console.log(Date.now() - immutableStartMap);

// const crioArray = crio([{foo: 'bar'}]);
// const changedArray = crioArray.map(() => {
//    return {
//        foo: 'baz'
//    };
// });
// const sameArray = crioArray.map(() => {
//    return {
//        foo: 'bar'
//    };
// });
//
// console.log(crioArray);

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
