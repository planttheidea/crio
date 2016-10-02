import test from 'ava';

import {
  createDeeplyNestedObject,
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
