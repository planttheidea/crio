import test from 'ava';

import {
  convertToNumber,
  createDeeplyNestedObject,
  forEachObject,
  mergeObjects,
  shallowCloneArray,
  shallowCloneObject
} from '../../src/utils/loops';

import crio from '../../src';

test('if convertToNumber will correctly convert value passed to the number', (t) => {
  const number = convertToNumber('0');
  const notNumber = convertToNumber('foo');

  t.is(number, 0);
  t.true(notNumber !== notNumber);
});

test('if createDeeplyNestedObject creates the correct deeply-nested object', (t) => {
  const objectKeys = ['some', 'deeply', 'nested', 'object', 'that', 'has'];
  const arrayKeys = [0, 0, 0, 0, 0, 0];
  const value = 'value';
  const deeplyNestedObject = createDeeplyNestedObject(objectKeys, value);
  const deeplyNestedArray = createDeeplyNestedObject(arrayKeys, value);

  t.deepEqual(deeplyNestedObject, {some: {deeply: {nested: {object: {that: {has: 'value'}}}}}});
  t.deepEqual(deeplyNestedArray, [[[[[['value']]]]]]);
});

test('if forEachObject loops over object correctly', (t) => {
  const object = crio({
    foo: 'bar',
    bar: 'baz',
    baz: 'foo'
  });

  let keys = [],
      values = [];

  forEachObject(object, (value, key) => {
    keys.push(key);
    values.push(value);
  });

  const expectedKeys = ['foo', 'bar', 'baz'];
  const expectedValues = ['bar', 'baz', 'foo'];

  t.deepEqual(keys, expectedKeys);
  t.deepEqual(values, expectedValues);
});

test('if mergeObjects will merge objects passed into a new plain object', (t) => {
  const object = {foo: 'bar'};
  const expectedNewResult = {
    foo: 'bar',
    bar: 'baz',
    baz: 'foo'
  };

  const newResult = mergeObjects(object, [{bar: 'baz'}, {baz: 'foo'}]);

  t.deepEqual(newResult, expectedNewResult);

  const expectedExistingResult = {
    foo: 'baz'
  };

  const existingResult = mergeObjects(object, [{foo: 'baz'}]);

  t.deepEqual(existingResult, expectedExistingResult);
});

test('if shallowCloneArray returns a non-crio shallowClone', (t) => {
  const array = ['foo', 'bar', 'baz'];
  const crioArray = crio(array);

  t.deepEqual(shallowCloneArray(crioArray), array);
});

test('if shallowCloneObject returns a non-crio shallowClone', (t) => {
  const object = {foo: 'bar', bar: 'baz'};
  const crioObject = crio(object);

  t.deepEqual(shallowCloneObject(crioObject), object);
});
