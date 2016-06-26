import React from 'react';
import {
    render
} from 'react-dom';

import crio from '../src';

const crioArray = crio(['foo', 'bar']);

console.log(crioArray);
console.log(crioArray.indexOf('bar'));
console.log(crioArray.join('|'));

const reduced = crioArray.reduce((array, item, index) => {
    return array.concat(index);
}, []);

console.log(Object.getPrototypeOf(reduced));

console.log(reduced);;
console.log(crioArray);
console.log(crioArray.$$hashCode);

const crioObject = crio({
    foo: 'bar',
    some: {
        nested: 'thing'
    }
});

console.log(crioObject);
console.log('length', crioObject.length);

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