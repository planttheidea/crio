import test from 'ava';
import React from 'react';
import sinon from 'sinon';

import isObject from 'lodash/isObject';

import {
  CrioArray,
  CrioObject,
  getCrioedValue,
  mergeArrays,
  mergeCrios
} from '../src/classes';

import {
  CRIO_ARRAY,
  CRIO_TYPE,
  CRIO_OBJECT
} from '../src/utils/constants';

import {
  isCrio
} from '../src/utils/is';

import * as loops from '../src/utils/loops';

test('if values are created correctly, where arrays and objects are recursively crioed', (t) => {
  const primitiveArray = [1, 'foo', true];
  const primitiveCrioArray = new CrioArray(primitiveArray);

  t.true(primitiveCrioArray instanceof CrioArray);

  primitiveCrioArray.forEach((item, index) => {
    t.is(item, primitiveArray[index]);
  });

  const reactElementArray = [<div/>];
  const reactElementCrioArray = new CrioArray(reactElementArray);

  t.true(reactElementCrioArray instanceof CrioArray);

  reactElementCrioArray.forEach((item, index) => {
    t.is(item, reactElementArray[index]);
  });

  const primitiveObject = {foo: 'bar'};
  const primitiveCrioObject = new CrioObject(primitiveObject);

  t.true(primitiveCrioObject instanceof CrioObject);

  primitiveCrioObject.forEach((item, key) => {
    t.is(item, primitiveObject[key]);
  });

  const arrayArray = [[0, 'foo'], [1, 'bar']];
  const arrayCrioArray = new CrioArray(arrayArray);

  t.true(arrayCrioArray instanceof CrioArray);

  arrayCrioArray.forEach((item) => {
    t.true(item instanceof CrioArray);
  });

  const arrayObject = [{foo: 'bar'}, {bar: 'baz'}];
  const arrayCrioObject = new CrioArray(arrayObject);

  t.true(arrayCrioObject instanceof CrioArray);

  arrayCrioObject.forEach((item) => {
    t.true(item instanceof CrioObject);
  });

  const objectObject = {foo: {bar: 'baz'}, bar: {baz: 'foo'}};
  const objectCrioObject = new CrioObject(objectObject);

  t.true(objectCrioObject instanceof CrioObject);

  objectCrioObject.forEach((item) => {
    t.true(item instanceof CrioObject);
  });

  const objectArray = {foo: ['bar'], bar: ['baz']};
  const objectCrioArray = new CrioObject(objectArray);

  t.true(objectCrioArray instanceof CrioObject);

  objectCrioArray.forEach((item) => {
    t.true(item instanceof CrioArray);
  });
});

/*
  Shared prototype testing
 */
test('if clear() returns an empty version of the same Crio type', (t) => {
  const crioArray = new CrioArray(['foo', 'bar']);
  const crioObject = new CrioObject({foo: 'bar'});

  const clearedCrioArray = crioArray.clear();

  t.false(crioArray.length === 0);
  t.true(clearedCrioArray.length === 0);

  const clearedCrioObject = crioObject.clear();

  t.false(crioObject.length === 0);
  t.true(clearedCrioObject.length === 0);
});

test('if compact() removes all falsy values from the Crio object', (t) => {
  const array = new CrioArray(['foo', 0, false, null, undefined]);
  const object = new CrioObject({
    bool: false,
    foo: 'bar',
    nil: null,
    num: 0,
    undef: undefined
  });

  const expectedArray = ['foo'];
  const expectedObject = {
    foo: 'bar'
  };

  t.deepEqual(array.compact().thaw(), expectedArray);
  t.deepEqual(object.compact().thaw(), expectedObject);
});

test('if delete removes the item from the Crio', (t) => {
  const array = new CrioArray(['foo', 'bar']);

  t.deepEqual(array.delete(0).thaw(), ['bar']);

  const object = new CrioObject({foo: 'bar', bar: 'baz'});

  t.deepEqual(object.delete('foo'), {bar: 'baz'});
});

test('if deleteIn removes the deeply-nested item from the Crio', (t) => {
  const arrayArray = new CrioArray(['foo', ['bar', 'baz']]);

  t.deepEqual(arrayArray.deleteIn([1, 0]).thaw(), ['foo', ['baz']]);

  const arrayObject = new CrioArray(['foo', {bar: 'bar', baz: 'baz'}]);

  t.deepEqual(arrayObject.deleteIn([1, 'bar']).thaw(), ['foo', {baz: 'baz'}]);

  const objectArray = new CrioObject({foo: 'foo', bar: ['bar', 'baz']});

  t.deepEqual(objectArray.deleteIn(['bar', 0]).thaw(), {foo: 'foo', bar: ['baz']});

  const objectObject = new CrioObject({foo: 'foo', bar: {bar: 'bar', baz: 'baz'}});

  t.deepEqual(objectObject.deleteIn(['bar', 'bar']).thaw(), {foo: 'foo', bar: {baz: 'baz'}});
});

test('if equals() returns correctly for deeply equal and unequal objects', (t) => {
  const array1 = new CrioArray(['foo']);
  const array2 = new CrioArray(['foo']);
  const array3 = new CrioArray(['bar']);

  t.true(array1.equals(array2));
  t.false(array1.equals(array3));
  t.false(array2.equals(array3));

  const object1 = new CrioObject({
    foo: 'bar'
  });
  const object2 = new CrioObject({
    foo: 'bar'
  });
  const object3 = new CrioObject({
    bar: 'baz'
  });

  t.true(object1.equals(object2));
  t.false(object1.equals(object3));
  t.false(object2.equals(object3));
});

test('if get() works for arrays and objects', (t) => {
  const crioArray = new CrioArray(['foo', 'bar']);
  const crioObject = new CrioObject({foo: 'bar'});

  t.is(crioArray.get(0), 'foo');
  t.is(crioArray.get(2), undefined);

  t.is(crioObject.get('foo'), 'bar');
  t.is(crioObject.get('bar'), undefined);
});

test('if getIn() works for arrays and objects', (t) => {
  const crioArray = new CrioArray([{
    foo: ['bar']
  }]);
  const crioObject = new CrioObject({foo: ['bar']});

  t.is(crioArray.getIn([0, 'foo', 0]), 'bar');
  t.is(crioArray.getIn([0, 'bar', 0]), undefined);

  t.is(crioObject.getIn(['foo', 0]), 'bar');
  t.is(crioObject.getIn(['bar', 0]), undefined);
});

test('if has returns true when property exists and false when it doesnt', (t) => {
  const array = new CrioArray(['foo']);

  t.true(array.has(0));
  t.true(array.has('0'));
  t.false(array.has(1));

  const object = new CrioObject({foo: 'bar'});

  t.true(object.has('foo'));
  t.false(object.has('bar'));
});

test('if hasIn returns true when property exists and false when it doesnt', (t) => {
  const array = new CrioArray([{foo: [{bar: 'baz'}]}]);

  t.true(array.hasIn([0, 'foo', 0, 'bar']));
  t.false(array.hasIn([0, 'bar', 1, 'baz']));

  const object = new CrioObject({foo: [{bar: 'baz'}]});

  t.true(object.hasIn(['foo', 0, 'bar']));
  t.false(object.hasIn(['bar', 1, 'baz']));
});

test('if hasOwnProperty returns true when property exists and false when it doesnt', (t) => {
  const array = new CrioArray(['foo']);

  t.true(array.hasOwnProperty(0));
  t.true(array.hasOwnProperty('0'));
  t.false(array.hasOwnProperty(1));

  const object = new CrioObject({foo: 'bar'});

  t.true(object.hasOwnProperty('foo'));
  t.false(array.hasOwnProperty('bar'));
});

test('if isArray returns the correct boolean value', (t) => {
  const array = new CrioArray(['foo']);
  const object = new CrioObject({foo: 'bar'});

  t.true(array.isArray());
  t.false(object.isArray());
});

test('if isObject returns the correct boolean value', (t) => {
  const array = new CrioArray(['foo']);
  const object = new CrioObject({foo: 'bar'});

  t.false(array.isObject());
  t.true(object.isObject());
});

test('if merge will shallowly merge the values in objects to the existing crio', (t) => {
  const object = new CrioObject({foo: 'bar', bar: 'baz'});

  const singleObjectMerge = object.merge({foo: 'foo'});

  t.deepEqual(singleObjectMerge.thaw(), {foo: 'foo', bar: 'baz'});

  const multipleObjectMerge = object.merge({foo: 'baz', bar: 'bar'});

  t.deepEqual(multipleObjectMerge.thaw(), {foo: 'baz', bar: 'bar'});

  const addKeyObjectMerge = object.merge({baz: 'foo'});

  t.deepEqual(addKeyObjectMerge.thaw(), {foo: 'bar', bar: 'baz', baz: 'foo'});

  const array = new CrioArray(['foo', 'bar', 'baz']);

  const singleArrayMerge = array.merge(['bar']);

  t.deepEqual(singleArrayMerge.thaw(), ['bar', 'bar', 'baz']);

  const multipleArrayMerge = array.merge(['bar', 'baz']);

  t.deepEqual(multipleArrayMerge.thaw(), ['bar', 'baz', 'baz']);

  const addKeyArrayMerge = array.merge(['baz', 'bar', 'foo', 'baz']);

  t.deepEqual(addKeyArrayMerge.thaw(), ['baz', 'bar', 'foo', 'baz']);
});

test('if mergeArrays will correctly merge the values into the array', (t) => {
  const array = ['foo'];
  const expectedSingleResult = ['bar', 'baz'];

  const singleResult = mergeArrays(array, [['bar', 'baz']]);

  t.deepEqual(singleResult, expectedSingleResult);

  const expectedMultipleResult = ['baz', 'foo'];

  const multipleResult = mergeArrays(array, [['bar', 'foo'], ['baz']]);

  t.deepEqual(multipleResult, expectedMultipleResult);
});

test('if mergeCrios will call the appropriate merge function based on the parameter passed', (t) => {
  const mergeObjectsStub = sinon.stub(loops, 'mergeObjects');

  const plainObject = {};
  const plainArray = [];
  const crioObject = new CrioObject({});
  const crioArray = new CrioArray([]);

  mergeCrios(plainObject, {});

  t.true(mergeObjectsStub.calledOnce);

  mergeCrios(crioObject, {});

  t.true(mergeObjectsStub.calledTwice);

  /**
   * @todo rather than check if mergeObjects was not called, find way to test if mergeArrays was called
   */

  mergeCrios(plainArray, []);

  t.true(mergeObjectsStub.calledTwice);

  mergeCrios(crioArray, []);

  t.true(mergeObjectsStub.calledTwice);
});

test('if mergeIn will correctly merge the values deeply', (t) => {
  const array = new CrioArray(['foo', 'bar', {baz: 'foo'}]);
  const object = new CrioObject({foo: {bar: {baz: 'foo'}}});

  const mergedArray = array.mergeIn([2, 'baz'], {some: 'thing'});

  t.deepEqual(mergedArray.thaw(), ['foo', 'bar', {baz: {some: 'thing'}}]);

  const mergedObject = object.mergeIn(['foo', 'bar', 'baz'], {some: 'thing'});

  t.deepEqual(mergedObject.thaw(), {foo: {bar: {baz: {some: 'thing'}}}});
});

test('if mutate will mutate the object to the correct result', (t) => {
  const array = ['foo'];
  const object = {foo: 'bar'};

  const crioArray = new CrioArray(array);
  const crioObject = new CrioObject(object);

  const mutatedArray = crioArray.mutate(() => {
    return object;
  });

  t.true(mutatedArray.equals(crioObject));
  t.deepEqual(mutatedArray.thaw(), object);

  const mutatedObject = crioObject.mutate(() => {
    return array;
  });

  t.true(mutatedObject.equals(crioArray));
  t.deepEqual(mutatedObject.thaw(), array);
});

test('if pluck correctly returns the values in the collection', (t) => {
  const array = new CrioArray([{foo: 'bar'}, {foo: 'baz'}]);
  const object = new CrioObject({one: {foo: 'bar'}, two: {foo: 'baz'}});

  const expectedResult = ['bar', 'baz'];

  const arrayResult = array.pluck('foo');

  t.deepEqual(arrayResult.thaw(), expectedResult);

  const objectResult = object.pluck('foo');

  t.deepEqual(objectResult.thaw(), expectedResult);
});

test('if pluckIn correctly returns the values in the collection', (t) => {
  const array = new CrioArray([{foo: ['bar']}, {foo: ['baz']}]);
  const object = new CrioObject({one: [{foo: 'bar'}], two: [{foo: 'baz'}]});

  const expectedResult = ['bar', 'baz'];

  const arrayResult = array.pluckIn(['foo', 0]);

  t.deepEqual(arrayResult.thaw(), expectedResult);

  const objectResult = object.pluckIn([0, 'foo']);

  t.deepEqual(objectResult.thaw(), expectedResult);
});

test('if set will assign both new and current key values to the Crio', (t) => {
  const array = new CrioArray(['foo']);
  const object = new CrioObject({foo: 'foo'});

  const newKeyArray = array.set(1, 'bar');

  t.deepEqual(newKeyArray.thaw(), ['foo', 'bar']);

  const existingKeyArray = array.set(0, 'bar');

  t.deepEqual(existingKeyArray.thaw(), ['bar']);

  const newKeyObject = object.set('bar', 'bar');

  t.deepEqual(newKeyObject.thaw(), {foo: 'foo', bar: 'bar'});

  const existingKeyObject = object.set('foo', 'bar');

  t.deepEqual(existingKeyObject.thaw(), {foo: 'bar'});
});

test('if setIn will assign both new and current key values to the Crio', (t) => {
  const arrayArray = new CrioArray(['foo', ['bar']]);
  const newKeyArrayArray = arrayArray.setIn([1, 1], 'baz');
  const existingKeyArrayArray = arrayArray.setIn([1, 0], 'baz');

  t.deepEqual(newKeyArrayArray.thaw(), ['foo', ['bar', 'baz']]);
  t.deepEqual(existingKeyArrayArray.thaw(), ['foo', ['baz']]);

  const arrayObject = new CrioArray(['foo', {bar: 'bar'}]);
  const newKeyArrayObject = arrayObject.setIn([1, 'baz'], 'baz');
  const existingKeyArrayObject = arrayObject.setIn([1, 'bar'], 'baz');

  t.deepEqual(newKeyArrayObject.thaw(), ['foo', {bar: 'bar', baz: 'baz'}]);
  t.deepEqual(existingKeyArrayObject.thaw(), ['foo', {bar: 'baz'}]);

  const objectArray = new CrioObject({foo: 'foo', bar: ['bar']});
  const newKeyObjectArray = objectArray.setIn(['bar', 1], 'baz');
  const existingKeyObjectArray = objectArray.setIn(['bar', 0], 'baz');

  t.deepEqual(newKeyObjectArray.thaw(), {foo: 'foo', bar: ['bar', 'baz']});
  t.deepEqual(existingKeyObjectArray.thaw(), {foo: 'foo', bar: ['baz']});

  const objectObject = new CrioObject({foo: 'foo', bar: {baz: 'bar'}});
  const newKeyObjectObject = objectObject.setIn(['bar', 'foo'], 'baz');
  const existingKeyObjectObject = objectObject.setIn(['bar', 'baz'], 'baz');

  t.deepEqual(newKeyObjectObject.thaw(), {foo: 'foo', bar: {baz: 'bar', foo: 'baz'}});
  t.deepEqual(existingKeyObjectObject.thaw(), {foo: 'foo', bar: {baz: 'baz'}});

  const shallowObject = new CrioObject({foo: 'foo'});
  const deeplyNestedObject = shallowObject.setIn(['bar', 'baz'], 'foo');

  t.deepEqual(deeplyNestedObject.thaw(), {foo: 'foo', bar: {baz: 'foo'}});
});

test('if thaw() will revert the Crio to its default object type', (t) => {
  const array = ['foo', ['bar']];
  const object = {
    foo: 'bar',
    bar: {
      baz: 'foo'
    }
  };

  const crioArray = new CrioArray(array);
  const crioObject = new CrioObject(object);

  t.deepEqual(crioArray.thaw(), array);
  t.deepEqual(crioObject.thaw(), object);
});

test('if toArray converts item to a CrioArray', (t) => {
  const array = new CrioArray(['foo']);
  const object = new CrioObject({foo: 'foo'});

  t.is(array.toArray(), array);
  t.true(object.toArray().equals(array));
});

test('if toLocaleString converts the item to the correct string', (t) => {
  const array = new CrioArray(['foo']);
  const object = new CrioObject({foo: 'bar'});

  const expectedArrayString =
`CrioArray{
  "0": "foo"
}`;
  const expectedObjectString =
`CrioObject{
  foo: "bar"
}`;

  t.is(array.toString(), expectedArrayString);
  t.is(object.toString(), expectedObjectString);
});

test('if toObject converts item to a CrioObject', (t) => {
  const array = new CrioArray(['foo']);
  const object = new CrioObject({'0': 'foo'});

  t.is(object.toObject(), object);
  t.true(array.toObject().equals(object));
});

test('if toString converts the item to the correct string', (t) => {
  const array = new CrioArray(['foo']);
  const object = new CrioObject({foo: 'bar'});

  const expectedArrayString =
`CrioArray{
  "0": "foo"
}`;
  const expectedObjectString =
`CrioObject{
  foo: "bar"
}`;

  t.is(array.toString(), expectedArrayString);
  t.is(object.toString(), expectedObjectString);
});

test('if valueOf returns the same object', (t) => {
  const array = new CrioArray(['foo']);
  const object = new CrioObject({foo: 'bar'});

  t.is(array.valueOf(), array);
  t.is(object.valueOf(), object);
});

/*
  CrioArray prototype testing
 */
test('if CrioArray produces an object with the same values', (t) => {
  const array = ['foo', 'bar'];
  const crioArray = new CrioArray(array);

  t.true(isObject(crioArray));

  t.is(crioArray.length, array.length);

  crioArray.forEach((value, index) => {
    t.is(value, array[index]);
  });
});

test('if concat produces an array with both values', (t) => {
  const array = new CrioArray(['foo']);
  const expectedResult = ['foo', 'bar'];

  t.deepEqual(array.concat(['bar']).thaw(), expectedResult);
});

test('if copyWithin produces the correct new CrioArray', (t) => {
  const array = new CrioArray([1, 2, 3, 4, 5]);

  t.deepEqual(array.copyWithin(-2).thaw(), [1, 2, 3, 1, 2]);
  t.deepEqual(array.copyWithin(0, 3).thaw(), [4, 5, 3, 4, 5]);
  t.deepEqual(array.copyWithin(0, 3, 4).thaw(), [4, 2, 3, 4, 5]);
  t.deepEqual(array.copyWithin(-2, -3, -1).thaw(), [1, 2, 3, 3, 4]);
});

test('if difference produces the correct new CrioArray', (t) => {
  const array = new CrioArray(['foo', 1, true]);

  t.deepEqual(array.difference(['foo'], [true]).thaw(), [1]);
  t.deepEqual(array.difference(['foo', 1]).thaw(), [true]);
});

test('if entries will return index,value pairs from the array', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);
  const entries = array.entries();

  t.deepEqual(entries, [['0', 'foo'], ['1', 'bar'], ['2', 'baz']]);
});

test('if every returns a boolean that is true if every function call in the loop returns true', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);

  t.false(array.every((value) => {
    return value === 'foo' || value === 'bar';
  }));

  t.true(array.every((value) => {
    return value.length === 3;
  }));
});

test('if fill will apply the value passed appropriately based on the arguments', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);

  t.deepEqual(array.fill(1).thaw(), [1, 1, 1]);
  t.deepEqual(array.fill(1, 1, 2).thaw(), ['foo', 1, 'baz']);
  t.deepEqual(array.fill(1, 1, 1).thaw(), ['foo', 'bar', 'baz']);
  t.deepEqual(array.fill(1, -3, -2).thaw(), [1, 'bar', 'baz']);
  t.deepEqual(array.fill(1, NaN, NaN).thaw(), ['foo', 'bar', 'baz']);
});

test('if filter will reduce the array based on falsy returns from the function', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);
  const filteredArray = array.filter((value) => {
    return value !== 'bar';
  });

  t.deepEqual(filteredArray.thaw(), ['foo', 'baz']);
});

test('if find will return the correct object', (t) => {
  const array = new CrioArray(['foo', 'bar']);

  const foundArrayByIndex = array.find((value, index) => {
    return index === 1;
  });
  const foundArrayByValue = array.find((value) => {
    return value === 'bar';
  });

  t.is(foundArrayByIndex, 'bar');
  t.is(foundArrayByValue, 'bar');
});

test('if findIndex will return the index for the correct object', (t) => {
  const array = new CrioArray(['foo', 'bar']);

  const foundArrayByIndex = array.findIndex((value, index) => {
    return index === 1;
  });
  const foundArrayByValue = array.findIndex((value) => {
    return value === 'bar';
  });

  t.is(foundArrayByIndex, 1);
  t.is(foundArrayByValue, 1);
});

test('if first returns a new CrioArray with the first n number of items in the CrioArray', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);

  t.deepEqual(array.first().thaw(), ['foo']);
  t.deepEqual(array.first(2).thaw(), ['foo', 'bar']);
});

test('if forEach appropriately loops over the array', (t) => {
  const array = ['foo', 'bar', 'baz'];
  const crioArray = new CrioArray(array);

  let resultObject = {};

  crioArray.forEach((item, index) => {
    resultObject[index] = item;
  });

  t.deepEqual(resultObject, {
    0: 'foo',
    1: 'bar',
    2: 'baz'
  });
});

test('if includes appropriately determines if item is in the array or not', (t) => {
  const array = new CrioArray(['foo', 'bar']);

  t.true(array.includes('foo'));
  t.false(array.includes('baz'));
});

test('if indexOf returns the first index when found and -1 when not', (t) => {
  const array = new CrioArray(['foo', 'baz', 'foo']);

  t.is(array.indexOf('foo'), 0);
  t.is(array.indexOf('baz'), 1);
  t.is(array.indexOf('bar'), -1);
});

test('if intersection produces the correct new CrioArray', (t) => {
  const array = new CrioArray(['foo', 1, true]);

  t.deepEqual(array.intersection(['foo'], [true]).thaw(), []);
  t.deepEqual(array.intersection(['foo', 1]).thaw(), ['foo', 1]);
});

test('if join builds a string with the separator passed', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);

  t.is(array.join(), 'foo,bar,baz');
  t.is(array.join('|'), 'foo|bar|baz');
});

test('if keys returns an array of indices for all values in the CrioArray', (t) => {
  const array = ['foo', 'bar', 'baz'];
  const crioArray = new CrioArray(array);
  const keys = crioArray.keys();

  t.is(keys.length, array.length);
  t.deepEqual(keys, [0, 1, 2]);
});

test('if last returns the last n number of items in the CrioArray', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);

  t.deepEqual(array.last().thaw(), ['baz']);
  t.deepEqual(array.last(2).thaw(), ['bar', 'baz']);
});

test('if lastIndexOf returns the last index when found and -1 when not', (t) => {
  const array = new CrioArray(['foo', 'baz', 'foo']);

  t.is(array.lastIndexOf('foo'), 2);
  t.is(array.lastIndexOf('baz'), 1);
  t.is(array.lastIndexOf('bar'), -1);
});

test('if map returns a new CrioArray with the mapped values', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);

  const mappedArray = array.map((value) => {
    return {
      value
    };
  });

  t.deepEqual(mappedArray.thaw(), [{value: 'foo'}, {value: 'bar'}, {value: 'baz'}]);
});

test('if pop returns a new CrioArray with the last item removed', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);
  const poppedArray = array.pop();

  t.deepEqual(poppedArray.thaw(), ['foo', 'bar']);
});

test('if push returns a new CrioArray with the item passed appended to the end', (t) => {
  const array = new CrioArray(['foo', 'bar']);
  const pushedArrayNormal = array.push('baz');

  t.deepEqual(pushedArrayNormal.thaw(), ['foo', 'bar', 'baz']);

  const pushedArrayNested = array.push(['baz']);

  t.deepEqual(pushedArrayNested.thaw(), ['foo', 'bar', ['baz']]);
});

test('if reduce returns a new reduced value (Crio or not)', (t) => {
  const array = new CrioArray([1, 2, 3, 4, 5, 6]);
  const reducedValuePrimitive = array.reduce((sum, value) => {
    return sum + value;
  }, 0);

  t.is(reducedValuePrimitive, 21);

  const reducedValueObject = array.reduce((acc, value, index) => {
    return {
      ...acc,
      [index]: value
    };
  }, {});

  t.deepEqual(reducedValueObject.thaw(), {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 6
  });

  const reducedValueArray = array.reduce((acc, value) => {
    return acc.concat([value * 2]);
  }, []);

  t.deepEqual(reducedValueArray.thaw(), [2, 4, 6, 8, 10, 12]);
});

test('if reduceRight returns a new reduced value (Crio or not) in reverse order', (t) => {
  const array = new CrioArray([1, 2, 3, 4, 5, 6]);
  const reducedValuePrimitive = array.reduceRight((sum, value) => {
    return sum + value;
  }, 0);

  t.is(reducedValuePrimitive, 21);

  const reducedValueObject = array.reduceRight((acc, value, index) => {
    return {
      ...acc,
      [index]: value
    };
  }, {});

  t.deepEqual(reducedValueObject.thaw(), {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 6
  });

  const reducedValueArray = array.reduceRight((acc, value) => {
    return acc.concat([value * 2]);
  }, []);

  t.deepEqual(reducedValueArray.thaw(), [12, 10, 8, 6, 4, 2]);
});

test('if reverse will reverse the order of the CrioArray', (t) => {
  const array = new CrioArray([1, 2, 3]);

  t.deepEqual(array.reverse().thaw(), [3, 2, 1]);
});

test('if shift will return a new CrioArray with the first item removed', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);
  const shiftedArray = array.shift();

  t.deepEqual(shiftedArray.thaw(), ['bar', 'baz']);
});

test('if slice will return a new CrioArray with the appropriate result', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);

  t.true(array.slice(0).equals(array));

  t.deepEqual(array.slice(0, 2).thaw(), ['foo', 'bar']);
  t.deepEqual(array.slice(1, 3).thaw(), ['bar', 'baz']);
});

test('if some will return a boolean value being true if function returns true for at least one item in the CrioArray', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);

  t.true(array.some((value) => {
    return value === 'bar';
  }));

  t.false(array.some((value) => {
    return value === 'blah';
  }));
});

test('if sort will return a new sorted CrioArray based on the original', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);
  const sortedArray = array.sort();

  t.deepEqual(sortedArray.thaw(), ['bar', 'baz', 'foo']);
});

test('if splice will apply correctly based on the arguments passed', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz', 'blah']);

  t.deepEqual(array.splice(2, 0, 'drum').thaw(), ['foo', 'bar', 'drum', 'baz', 'blah']);
  t.deepEqual(array.splice(2, 1).thaw(), ['foo', 'bar', 'blah']);
  t.deepEqual(array.splice(2, 1, 'drum').thaw(), ['foo', 'bar', 'drum', 'blah']);
  t.deepEqual(array.splice(0, 2, 'drum').thaw(), ['drum', 'baz', 'blah']);
  t.deepEqual(array.splice(array.length - 3, 2).thaw(), ['foo', 'blah']);
});

test('if unique returns a new CrioArray with only unique values', (t) => {
  const array = new CrioArray(['foo', 'foo', 'bar', 'foo', 'bar', {foo: 'bar'}, {foo: 'bar'}]);

  t.deepEqual(array.unique().thaw(), ['foo', 'bar', {foo: 'bar'}]);
});

test('if unshift will add the passed values to the beginning of a new CrioArray', (t) => {
  const array = new CrioArray(['bar', 'baz']);

  t.deepEqual(array.unshift('foo').thaw(), ['foo', 'bar', 'baz']);
  t.deepEqual(array.unshift(['foo']).thaw(), [['foo'], 'bar', 'baz']);
});

test('if values will return the array of values in the CrioArray', (t) => {
  const array = ['foo', 'bar', 'baz'];
  const crioArray = new CrioArray(array);
  const values = crioArray.values();

  let resultValues = [];

  for (let value of values) {
    resultValues.push(value);
  }

  t.deepEqual(resultValues, array);
});

test('if xor produces the correct new CrioArray', (t) => {
  const array = new CrioArray(['foo', 1, true]);

  t.deepEqual(array.xor(['foo'], [true]).thaw(), [1]);
  t.deepEqual(array.xor(['foo', 1]).thaw(), [true]);
});

test('if the type of the CrioArray is correct', (t) => {
  const object = new CrioArray([]);

  t.is(object[CRIO_TYPE], CRIO_ARRAY);
});

test('if CrioArray allows use of for-of operator', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);

  t.notThrows(() => {
    let noop;

    for (let value of array) {
      noop = value;
    }
  });
});

/*
  CrioObject prototype testing
 */
test('if CrioObject produces an object with the same values', (t) => {
  const object = {foo: 'bar'};
  const crioObject = new CrioObject(object);

  t.true(isObject(crioObject));

  t.is(crioObject.length, Object.keys(object).length);

  crioObject.forEach((value, key) => {
    t.is(value, object[key]);
  });
});

test('if entries returns an iterator for both keys and values', (t) => {
  const object = new CrioObject({foo: 'bar', bar: 'baz'});
  const entries = object.entries();

  let resultObject = {};

  for (let [key, value] of entries) {
    resultObject[key] = value;
  }

  t.deepEqual(object.thaw(), resultObject);
});

test('if every returns true if all of the function call results are truthy', (t) => {
  const foo = new CrioObject({foo: 'bar', bar: 'bar'});

  t.true(foo.every((value) => {
    return value === 'bar';
  }));

  t.false(foo.every((value, key) => {
    return key === 'bar';
  }));

  t.false(foo.every((value) => {
    return value === 'baz';
  }));

  t.false(foo.every((value, key) => {
    return key === 'baz';
  }));
});

test('if filter creates new CrioObject with falsy returns removed', (t) => {
  const object = new CrioObject({foo: 'bar', bar: 'baz', baz: 'foo'});
  const filteredObject = object.filter((value, key) => {
    return key === 'foo' || value === 'foo';
  });

  t.deepEqual(filteredObject.thaw(), {foo: 'bar', baz: 'foo'});
});

test('if find will return the correct object', (t) => {
  const object = new CrioObject({foo: 'bar', bar: 'baz'});

  const foundObjectByKey = object.find((value, key) => {
    return key === 'foo';
  });
  const foundObjectByValue = object.find((value) => {
    return value === 'bar';
  });

  t.is(foundObjectByKey, 'bar');
  t.is(foundObjectByValue, 'bar');
});

test('if findKey will return the key for the correct object', (t) => {
  const object = new CrioObject({foo: 'bar', bar: 'baz'});

  const foundObjectByKey = object.findKey((value, key) => {
    return key === 'foo';
  });
  const foundObjectByValue = object.findKey((value) => {
    return value === 'bar';
  });

  t.is(foundObjectByKey, 'foo');
  t.is(foundObjectByValue, 'foo');
});

test('if forEach loops over the object providing both value and key', (t) => {
  const object = new CrioObject({foo: 'bar', bar: 'baz'});

  let resultObject = {};

  object.forEach((value, key) => {
    resultObject[key] = value;
  });

  t.deepEqual(object.thaw(), resultObject);
});

test('if includes returns the correct boolean value based on the existence of a value in the CrioObject', (t) => {
  const simple = 'foo';
  const complex = new CrioObject({bar: 'baz'});

  const crioObject = new CrioObject({
    complex,
    simple
  });

  t.true(crioObject.includes('foo'));
  t.false(crioObject.includes('bar'));

  t.true(crioObject.includes(complex));
  t.false(crioObject.includes({foo: 'bar'}));
});

test('if the CrioObject is the prototype of another object', (t) => {
  const object = new CrioObject({foo: 'bar', bar: 'baz'});

  t.false(object.isPrototypeOf({foo: 'bar'}));

  const weirdObject = Object.create(object);

  t.true(object.isPrototypeOf(weirdObject));
});

test('if keys return an array of keys in the object', (t) => {
  const object = new CrioObject({foo: 'bar', bar: 'baz'});

  t.is(object.keys().length, object.length);

  object.forEach((value, key) => {
    t.true(object.keys().includes(key));
  });
});

test('if map will map the return of each function call to the key', (t) => {
  const object = new CrioObject({foo: 'bar', bar: 'baz'});
  const mappedObject = object.map((value, key) => {
    if (key === 'foo') {
      return true;
    }

    return false;
  });

  t.deepEqual(mappedObject.thaw(), {foo: true, bar: false});
});

test('if propertyIsEnumerable correctly identifies enumerable properties vs not', (t) => {
  const object = new CrioObject({foo: 'bar', bar: 'baz'});

  t.true(object.propertyIsEnumerable('foo'));
  t.true(object.propertyIsEnumerable('bar'));
  t.false(object.propertyIsEnumerable('length'));
});

test('if reduce returns a new reduced value (Crio or not)', (t) => {
  const object = new CrioObject({foo: 1, bar: 2, baz: 3});
  const reducedValuePrimitive = object.reduce((sum, value) => {
    return sum + value;
  }, 0);

  t.is(reducedValuePrimitive, 6);

  const reducedValueObject = object.reduce((acc, value, key) => {
    return {
      ...acc,
      [value]: key
    };
  }, {});

  t.deepEqual(reducedValueObject.thaw(), {
    1: 'foo',
    2: 'bar',
    3: 'baz'
  });

  const reducedValueArray = object.reduce((acc, value, key) => {
    return {
      ...acc,
      [key]: value * 2
    };
  }, {});

  t.deepEqual(reducedValueArray.thaw(), {foo: 2, bar: 4, baz: 6});
});

test('if reduceRight returns a new reduced value (Crio or not) in reverse order', (t) => {
  const object = new CrioObject({foo: 1, bar: 2, baz: 3});
  const reducedValuePrimitive = object.reduce((sum, value) => {
    return sum + value;
  }, 0);

  t.is(reducedValuePrimitive, 6);

  const reducedValueObject = object.reduce((acc, value, key) => {
    return {
      ...acc,
      [value]: key
    };
  }, {});

  t.deepEqual(reducedValueObject.thaw(), {
    1: 'foo',
    2: 'bar',
    3: 'baz'
  });

  const reducedValueArray = object.reduce((acc, value, key) => {
    return {
      ...acc,
      [key]: value * 2
    };
  }, {});

  t.deepEqual(reducedValueArray.thaw(), {foo: 2, bar: 4, baz: 6});
});

test('if some returns true if any of the function call results are truthy', (t) => {
  const foo = new CrioObject({foo: 'bar', bar: 'baz'});

  t.true(foo.some((value) => {
    return value === 'bar';
  }));

  t.true(foo.some((value, key) => {
    return key === 'bar';
  }));

  t.true(foo.some((value) => {
    return value === 'baz';
  }));

  t.false(foo.some((value, key) => {
    return key === 'baz';
  }));
});

test('if values return an array of values in the object', (t) => {
  const object = new CrioObject({foo: 'bar', bar: 'baz'});

  t.is(object.values().length, object.length);

  object.forEach((value) => {
    t.true(object.values().includes(value));
  });
});

test('if the type of the CrioObject is correct', (t) => {
  const object = new CrioObject({});

  t.is(object[CRIO_TYPE], CRIO_OBJECT);
});

test('if CrioObject has a valid iterator', (t) => {
  const object = new CrioObject({foo: 'bar', bar: 'baz'});

  t.notThrows(() => {
    let noop;

    for (let value of object) {
      noop = value;
    }
  });
});

test('if getCrioedValue returns a Crio if an array or object, else returns original object', (t) => {
  const array = [];
  const boolean = true;
  const date = new Date();
  const func = function() {};
  const number = 12;
  const object = {};
  const regexp = /foo/;
  const string = 'foo';

  const validItems = [
    array,
    object
  ];
  const invalidItems = [
    boolean,
    date,
    func,
    number,
    regexp,
    string
  ];

  validItems.forEach((item) => {
    const result = getCrioedValue(item);

    t.true(isCrio(result));
    t.not(result, item);
  });

  invalidItems.forEach((item) => {
    const result = getCrioedValue(item);

    t.false(isCrio(result));
    t.is(result, item);
  });
});