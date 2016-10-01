import test from 'ava';

import {
  createDeeplyNestedObject,
  forEach,
  forEachArray,
  forEachArrayRight,
  forEachObject,
  shallowCloneArray
} from '../../src/utils/loops';

import crio from '../../src';

test('if createDeeplyNestedObject creates the correct deeply-nested object', (t) => {
  const objectKeys = ['some', 'deeply', 'nested', 'object', 'that', 'has'];
  const arrayKeys = [0, 0, 0, 0, 0, 0];
  const value = 'value';
  const deeplyNestedObject = createDeeplyNestedObject(objectKeys, value);
  const deeplyNestedArray = createDeeplyNestedObject(arrayKeys, value);

  t.deepEqual(deeplyNestedObject, {some: {deeply: {nested: {object: {that: {has: 'value'}}}}}});
  t.deepEqual(deeplyNestedArray, [[[[[['value']]]]]]);
});

test('if forEach loops correctly based on objects or arrays', (t) => {
  const array = ['foo'];
  const object = {foo: 'bar'};

  let arrayCalled = false,
      objectCalled = false;

  forEach(array, () => {
    arrayCalled = true;
  });

  t.true(arrayCalled);

  forEach(object, () => {
    objectCalled = true;
  }, object, true);

  t.true(objectCalled);
});

test('if forEachArray loops correctly', (t) => {
  const length = 1000;

  let array = [];

  for (let i = 0; i < length; i++) {
    array.push(i);
  }

  let index = 0;

  forEachArray(array, () => {
    index++;
  });

  t.is(index, length);
});

test('if forEachArray loops correctly', (t) => {
  let index = 1000,
      array = [];

  for (let i = 0; i < index; i++) {
    array.push(i);
  }

  forEachArrayRight(array, () => {
    index--;
  });

  t.is(index, 0);
});

test('if forEachObject loops over object correctly', (t) => {
  const object = {
    foo: 'bar',
    bar: 'baz',
    baz: 'foo'
  };

  let keys = [],
      values = [];

  forEachObject(object, Object.keys(object), (value, key) => {
    keys.push(key);
    values.push(value);
  });

  const expectedKeys = ['baz', 'bar', 'foo'];
  const expectedValues = ['foo', 'baz', 'bar'];

  t.deepEqual(keys, expectedKeys);
  t.deepEqual(values, expectedValues);
});

test('if shallowCloneArray returns a non-crio shallowClone', (t) => {
  const array = ['foo', 'bar', 'baz'];
  const crioArray = crio(array);

  t.deepEqual(shallowCloneArray(crioArray), array);
});
