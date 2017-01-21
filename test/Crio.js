// test
import test from 'ava';

// src
import {
  Crio,
  CrioArray,
  CrioObject
} from '../src/Crio';

test('if constructing a CrioArray produces a frozen array that has the same values passed', (t) => {
  const array = ['foo', 'bar', 'baz'];
  const crioArray = new CrioArray(array);

  t.true(crioArray instanceof CrioArray);
  t.is(array.length, crioArray.length);

  array.forEach((value, index) => {
    t.deepEqual(array[index], crioArray[index]);
  });
});

test('if constructing a CrioObject produces a frozen object that has the same values passed', (t) => {
  const object = {
    foo: 'bar',
    bar: 'baz'
  };
  const crioObject = new CrioObject(object);

  t.true(crioObject instanceof CrioObject);
  t.is(Object.keys(object).length, crioObject.size);

  Object.keys(object).forEach((key) => {
    t.deepEqual(object[key], crioObject[key]);
  });
});

test('if clear removes all values and returns a default object', (t) => {
  const array = new CrioArray(['foo']);
  const clearedArray = array.clear();

  t.is(clearedArray.length, 0);
  t.deepEqual(clearedArray.thaw(), []);

  const object = new CrioObject({foo: 'bar'});
  const clearedObject = object.clear();

  t.is(clearedObject.size, 0);
  t.deepEqual(clearedObject.thaw(), {});
});

test('if compact removes falsy values', (t) => {
  const array = new CrioArray(['foo', false, undefined, null]);

  const compactedArray = array.compact();

  t.is(compactedArray.length, 1);
  t.deepEqual(compactedArray.thaw(), ['foo']);

  const object = new CrioObject({
    foo: 'foo',
    false: false,
    undef: undefined,
    nil: null
  });

  const compactedObject = object.compact();

  t.is(compactedObject.size, 1);
  t.deepEqual(compactedObject.thaw(), {
    foo: 'foo'
  });
});

test('if delete returns a new crio with the item removed', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);
  const deletedArray = array.delete(1);

  t.is(deletedArray.length, array.length - 1);
  t.deepEqual(deletedArray.thaw(), ['foo', 'baz']);

  const object = new CrioObject({foo: 'bar', bar: 'baz'});
  const deletedObject = object.delete('bar');

  t.is(deletedObject.size, Object.keys(object).length - 1);
  t.deepEqual(deletedObject.thaw(), {foo: 'bar'});
});

test('if deleteIn returns a new crio with the nested item removed', (t) => {
  const array = new CrioArray([{foo: ['bar', 'baz'], bar: 'baz'}]);
  const deletedArray = array.deleteIn([0, 'foo', 1]);

  t.is(deletedArray.length, array.length);
  t.deepEqual(deletedArray.thaw(), [{foo: ['bar'], bar: 'baz'}]);

  const object = new CrioObject({foo: ['bar', {baz: 'foo', foo: 'bar'}]});
  const deletedObject = object.deleteIn(['foo', 1, 'baz']);

  t.is(deletedObject.size, Object.keys(object).length);
  t.deepEqual(deletedObject.thaw(), {foo: ['bar', {foo: 'bar'}]});
});

test('if entries returns an array of key / value pairs', (t) => {
  const array = new CrioArray(['foo', 'bar']);
  const entriesArray = array.entries();

  t.is(entriesArray.length, array.length);
  t.deepEqual(entriesArray, [['0', 'foo'], ['1', 'bar']]);

  const object = new CrioObject({foo: 'bar', bar: 'baz'});
  const entriesObject = object.entries();

  t.is(entriesObject.length, Object.keys(object).length);
  t.deepEqual(entriesObject, [['foo', 'bar'], ['bar', 'baz']]);
});

test('if isEqual checks for value equality of objects', (t) => {
  const array = new CrioArray(['foo', 'bar']);
  const matchingArray = new CrioArray(['foo', 'bar']);
  const notMatchingArray = new CrioArray(['bar', 'baz']);

  t.true(array.equals(matchingArray));
  t.false(array === matchingArray);
  t.false(array.equals(notMatchingArray));

  const object = new CrioObject({foo: 'bar'});
  const matchingObject = new CrioObject({foo: 'bar'});
  const notMatchingObject = new CrioObject({bar: 'baz'});

  t.true(object.equals(matchingObject));
  t.false(object === matchingObject);
  t.false(object.equals(notMatchingObject));
});

test('if every confirms every value matches return function', (t) => {
  const array = new CrioArray(['foo', 'bar']);
  const everyArrayMatch = array.every((value) => {
    return value.length === 3;
  });
  const everyArrayNotMatch = array.every((value) => {
    return value === 'foo';
  });

  t.true(everyArrayMatch);
  t.false(everyArrayNotMatch);

  const object = new CrioObject({foo: 'bar', bar: 'baz'});
  const everyObjectMatch = object.every((value, key) => {
    return key === 'bar' || value === 'bar';
  });
  const everyObjectNotMatch = object.every((value) => {
    return value === 'bar';
  });

  t.true(everyObjectMatch);
  t.false(everyObjectNotMatch);
});

test('if filter reduces the crio down to the matching results', (t) => {
  const array = new CrioArray(['foo', 'bar', 'bazzy']);
  const filteredArray = array.filter((value) => {
    return value.length === 3;
  });

  t.is(filteredArray.length, 2);
  t.deepEqual(filteredArray.thaw(), ['foo', 'bar']);

  const object = new CrioObject({foo: 'bar', bar: 'baz', baz: 'blah'});
  const filteredObject = object.filter((value, key) => {
    return key === 'bar' || value === 'bar';
  });

  t.is(filteredObject.size, 2);
  t.deepEqual(filteredObject.thaw(), {foo: 'bar', bar: 'baz'});
});

test('if find will find the matching item, or return undefined', (t) => {
  const array = new CrioArray(['foo', 'bar']);
  const foundArray = array.find((value) => {
    return value === 'foo';
  });
  const notFoundArray = array.find((value) => {
    return value === 'baz';
  });

  t.is(foundArray, 'foo');
  t.is(notFoundArray, undefined);

  const object = new CrioObject({foo: 'bar', bar: 'baz'});
  const foundObject = object.find((value) => {
    return value === 'bar';
  });
  const notFoundObject = object.find((value) => {
    return value === 'foo';
  });

  t.is(foundObject, 'bar');
  t.is(notFoundObject, undefined);
});

test('if forEach properly loops over the crio and returns itself', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);

  let arrayItems = [];

  const arrayResult = array.forEach((value, key) => {
    arrayItems.push({
      key,
      value
    });
  });

  t.is(array.length, arrayItems.length);
  t.deepEqual(arrayItems, [
    {key: 0, value: 'foo'},
    {key: 1, value: 'bar'},
    {key: 2, value: 'baz'}
  ]);
  t.is(array, arrayResult);

  const object = new CrioObject({foo: 'bar', bar: 'baz', baz: 'foo'});

  let objectItems = [];

  const objectResult = object.forEach((value, key) => {
    objectItems.push({
      key,
      value
    });
  });

  t.is(objectItems.length, object.size);
  t.deepEqual(objectItems, [
    {key: 'foo', value: 'bar'},
    {key: 'bar', value: 'baz'},
    {key: 'baz', value: 'foo'}
  ]);
  t.is(objectResult, object);
});

test('if get will retrive the item at the top level, or undefined', (t) => {
  const array = new CrioArray(['foo', 'bar']);
  const getArray = array.get(1);
  const notGetArray = array.get(2);

  t.is(getArray, 'bar');
  t.is(notGetArray, undefined);

  const object = new CrioObject({foo: 'bar', bar: 'baz'});
  const getObject = object.get('foo');
  const notGetObject = object.get('baz');

  t.is(getObject, 'bar');
  t.is(notGetObject, undefined);
});

test('if getIn will retrieve the nested item, or undefined', (t) => {
  const array = new CrioArray(['foo', {bar: ['baz']}]);
  const gottenInArray = array.getIn([1, 'bar', 0]);
  const notGottenInArray = array.getIn('foo', 'bar', 'baz');

  t.is(gottenInArray, 'baz');
  t.is(notGottenInArray, undefined);

  const object = new CrioArray({foo: [{bar: 'baz'}], bar: 'baz'});
  const gottenInObject = object.getIn(['foo', 0, 'bar']);
  const notGottenInObject = object.getIn(['foo', 'bar', 'baz']);

  t.is(gottenInObject, 'baz');
  t.is(notGottenInObject, undefined);
});

test('if has will return true if the property exists, false if not', (t) => {
  const array = new CrioArray(['foo']);
  const hasArray = array.has(0);
  const notHasArray = array.has(1);

  t.true(hasArray);
  t.false(notHasArray);

  const object = new CrioObject({foo: 'bar'});
  const hasObject = object.has('foo');
  const notHasObject = object.has('bar');

  t.true(hasObject);
  t.false(notHasObject);
});

test('if hasIn will return true if the nested property exists, false if not', (t) => {
  const array = new CrioArray(['foo', {bar: ['baz']}]);
  const hasInArray = array.hasIn([1, 'bar', 0]);
  const notHasInArray = array.hasIn(['foo', 'bar', 'baz']);

  t.true(hasInArray);
  t.false(notHasInArray);

  const object = new CrioObject({foo: ['bar', {baz: 'foo'}]});
  const hasInObject = object.hasIn(['foo', 1, 'baz']);
  const notHasInObject = object.hasIn(['foo', 'bar', 'baz']);

  t.true(hasInObject);
  t.false(notHasInObject);
});

test('if includes checks for the value in the crio', (t) => {
  const array = new CrioArray(['foo', 'bar']);
  const arrayIncludes = array.includes('foo');
  const notArrayIncludes = array.includes('baz');

  t.true(arrayIncludes);
  t.false(notArrayIncludes);

  const object = new CrioObject({foo: 'bar'}, {bar: 'baz'});
  const objectIncludes = object.includes('bar');
  const notObjectIncludes = object.includes('foo');

  t.true(objectIncludes);
  t.false(notObjectIncludes);
});

test('if isArray tests correctly for the right crio type', (t) => {
  const array = new CrioArray([]);
  const object = new CrioObject({});

  t.true(array.isArray());
  t.false(object.isArray());
});

test('if isObject tests correctly for the right crio type', (t) => {
  const array = new CrioArray([]);
  const object = new CrioObject({});

  t.false(array.isObject());
  t.true(object.isObject());
});

test('if keys returns an array of the keys in the crio', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);
  const arrayKeys = array.keys();

  t.deepEqual(arrayKeys, ['0', '1', '2']);

  const object = new CrioObject({foo: 0, bar: 1, baz: 2});
  const objectKeys = object.keys();

  t.deepEqual(objectKeys, ['foo', 'bar', 'baz']);
});
