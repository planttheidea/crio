import React from 'react';
import {
    render
} from 'react-dom';

import crio from '../src';

const crioArray = crio([{foo: 'bar'}]);
const addedCrioArray = crioArray.push({foo: 'baz'});

console.log(crioArray[0] === addedCrioArray[0]); // true

const mappedCrioArray = addedCrioArray.map((item) => {
    return item.set('foo', 'bar');
});

console.log(crioArray[0] === mappedCrioArray[0]); // true

const filteredCrioArray = addedCrioArray.filter((item, index) => {
    return index === 0;
});

console.log(crioArray[0] === filteredCrioArray[0]); // true

const concattedArray = crioArray.concat([{foo: 'baz'}]);

console.log(crioArray[0] === concattedArray[0]); // true

const test = crioArray.concat([{foo: 'baz'}], [{foo: 'baz'}]);

console.log(test);

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