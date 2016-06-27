import React from 'react';
import {
    render
} from 'react-dom';

import crio from '../src';
import Immutable from 'immutable';

let crioArray = crio([]),
    immutableArray = Immutable.List([]);

const crioStart = Date.now();

console.log('create crio', crioStart);

for (let i = 0, length = 1000; i < length; i++) {
    crioArray = crioArray.push({
        index: i
    });
}

console.log(Date.now() - crioStart);

const immutableStart = Date.now();

console.log('create immutable', immutableStart);

for (let i = 0, length = 100000; i < length; i++) {
    immutableArray = immutableArray.push({
        index: i
    });
}

console.log(Date.now() - immutableStart);

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
