(() => {
  window.Symbol = undefined;
})();

import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';

import crio from '../src';

console.log(typeof Symbol);

// import '../benchmarks';

document.body.style.backgroundColor = '#1d1d1d';
document.body.style.color = '#d5d5d5';
document.body.style.margin = 0;
document.body.style.padding = 0;

const existing = crio(['foo', 'bar']);

console.log(existing);
console.log(existing.indexOf('bar'));
console.log(existing.includes('bar'));

const result = existing.delete(0);

console.log(existing, result);

// console.group('object');
//
// const object = crio({
//   foo: 'bar',
//   bar: null,
//   baz: [
//     {
//       deep: 'value'
//     }
//   ],
//   quz: null
// });
//
// console.log(object);
// console.log(object.set('baz[0].deep', 'new value'));
// console.log(
//   object.findLast((value) => {
//     return !!value;
//   })
// );
// console.log(object.thaw(), object);
// console.log(
//   object.map((value, key, ref) => {
//     console.log(value, key, ref);
//
//     return 'baz';
//   })
// );
// console.log(object.values());
// console.log(object.compact());
// console.log(object.delete('foo'));
// console.log(object.delete('baz[0].deep'));
// console.log(
//   object.every((item) => {
//     return item === null;
//   })
// );
// console.log(object.toArray());
// console.log(object.toString(null, 2));
//
// console.log(object.lastKeyOf(null));
//
// console.groupEnd('object');
//
// console.group('array');
//
// const otherObject = crio({bar: 'baz'});
//
// const array = crio([otherObject]);
//
// console.log(array);
// console.log(
//   array.map(() => {
//     return 'nope';
//   })
// );
// console.log(array.values());
// console.log(
//   array.every((item) => {
//     return crio.isCrio(item);
//   })
// );
// console.log(array.toObject());
// console.log(array.toString());
// console.log(array.thaw());
// console.log(array.equals(crio([{bar: 'baz'}])));
// console.log(array.lastIndexOf(otherObject));
//
// const otherArray = array.concat(['bar']);
//
// console.log(otherArray.copyWithin(1, 0));
//
// console.log(
//   otherArray.find((value) => {
//     return typeof value === 'string';
//   })
// );
//
// console.log(otherArray.first(2));
// console.log(otherArray.reverse());
//
// console.log(Array.isArray(otherArray));
//
// for (let value of otherArray) {
//   console.log(value);
// }
//
// console.groupEnd('array');

const elementArray = crio([{key: 0, value: 'foo'}, {key: 1, value: 'bar'}, {key: 2, value: 'baz'}]);

const App = () => (
  <div>
    <h1>App</h1>

    <h4>Things</h4>

    {elementArray.map(({key, value}) => <div key={`item-${key}`}>Item: {value}</div>)}
  </div>
);

const div = document.createElement('div');

div.id = 'app-container';

render(<App />, div);

document.body.appendChild(div);
