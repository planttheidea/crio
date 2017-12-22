// test
import test from 'ava';

// src
import {Crio, CrioArray, CrioObject} from '../src/Crio';
import {UNSCOPABLES_PROPERTY_DESCRIPTOR} from '../src/constants';

test('if constructing a CrioArray produces a frozen array that has the same values passed', (t) => {
  const array = ['foo', 'bar', 'baz'];
  const crioArray = new CrioArray(array);

  t.true(crioArray instanceof CrioArray);
  t.true(crioArray instanceof Crio);
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
  t.true(crioObject instanceof Crio);
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

  t.is(array.deleteIn(), array);
  t.is(array.deleteIn([]), array);

  const object = new CrioObject({foo: ['bar', {baz: 'foo', foo: 'bar'}]});
  const deletedObject = object.deleteIn(['foo', 1, 'baz']);

  t.is(deletedObject.size, Object.keys(object).length);
  t.deepEqual(deletedObject.thaw(), {foo: ['bar', {foo: 'bar'}]});

  t.is(object.deleteIn(), object);
  t.is(object.deleteIn([]), object);
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

test('if equals checks for value equality of objects', (t) => {
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

  t.is(array.getIn(), array);
  t.is(array.getIn([]), array);

  const object = new CrioArray({foo: [{bar: 'baz'}], bar: 'baz'});
  const gottenInObject = object.getIn(['foo', 0, 'bar']);
  const notGottenInObject = object.getIn(['foo', 'bar', 'baz']);

  t.is(gottenInObject, 'baz');
  t.is(notGottenInObject, undefined);

  t.is(object.getIn(), object);
  t.is(object.getIn([]), object);
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

  t.false(array.hasIn());
  t.false(array.hasIn([]));

  const object = new CrioObject({foo: ['bar', {baz: 'foo'}]});
  const hasInObject = object.hasIn(['foo', 1, 'baz']);
  const notHasInObject = object.hasIn(['foo', 'bar', 'baz']);

  t.true(hasInObject);
  t.false(notHasInObject);

  t.false(object.hasIn());
  t.false(object.hasIn([]));
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

test('if map will map the result of the function passed to the key', (t) => {
  const mapFn = (value) => {
    return value
      .split('')
      .reverse()
      .join('');
  };

  const array = new CrioArray(['foo', 'bar', 'baz']);
  const mappedArray = array.map(mapFn);

  t.is(mappedArray.length, array.length);
  t.deepEqual(mappedArray.thaw(), ['oof', 'rab', 'zab']);

  const object = new CrioObject({foo: 'foo', bar: 'bar', baz: 'baz'});
  const mappedObject = object.map(mapFn);

  t.is(mappedObject.size, Object.keys(object).length);
  t.deepEqual(mappedObject.thaw(), {foo: 'oof', bar: 'rab', baz: 'zab'});
});

test('if merge will merge objects passed with crio  into new crio', (t) => {
  const object = new CrioObject({foo: 'bar', bar: 'baz'});

  const singleObjectMerge = object.merge({foo: 'foo'});

  t.deepEqual(singleObjectMerge.thaw(), {foo: 'foo', bar: 'baz'});

  const multipleObjectMerge = object.merge({foo: 'baz', bar: 'bar'});

  t.deepEqual(multipleObjectMerge.thaw(), {foo: 'baz', bar: 'bar'});

  const addKeyObjectMerge = object.merge({baz: 'foo'});

  t.deepEqual(addKeyObjectMerge.thaw(), {foo: 'bar', bar: 'baz', baz: 'foo'});

  t.is(object.merge(), object);

  const array = new CrioArray(['foo', 'bar', 'baz']);

  const singleArrayMerge = array.merge(['bar']);

  t.deepEqual(singleArrayMerge.thaw(), ['bar', 'bar', 'baz']);

  const multipleArrayMerge = array.merge(['bar', 'baz']);

  t.deepEqual(multipleArrayMerge.thaw(), ['bar', 'baz', 'baz']);

  const addKeyArrayMerge = array.merge(['baz', 'bar', 'foo', 'baz']);

  t.deepEqual(addKeyArrayMerge.thaw(), ['baz', 'bar', 'foo', 'baz']);

  t.is(array.merge(), array);
});

test('if mergeIn will merge objects with the crio at the nested path', (t) => {
  const array = new CrioArray(['foo', 'bar', {baz: {foo: 'bar'}}]);
  const mergedArray = array.mergeIn([2, 'baz'], {some: 'thing'});

  t.deepEqual(mergedArray.thaw(), [
    'foo',
    'bar',
    {baz: {foo: 'bar', some: 'thing'}}
  ]);

  t.is(array.mergeIn(), array);
  t.is(array.mergeIn([]), array);

  const object = new CrioObject({foo: {bar: {baz: 'foo'}}});
  const mergedObject = object.mergeIn(['foo', 'bar', 'baz'], {some: 'thing'});

  t.deepEqual(mergedObject.thaw(), {foo: {bar: {baz: {some: 'thing'}}}});

  t.is(object.mergeIn(), object);
  t.is(object.mergeIn([]), object);
});

test('if mutate will let you worth with the object directly and then re-crio the return', (t) => {
  const array = new CrioArray(['foo', 'bar']);
  const mutatedArray = array.mutate((thawed, frozen) => {
    t.false(thawed instanceof CrioArray);
    t.is(frozen, array);

    return {
      foo: 'bar'
    };
  });

  t.deepEqual(mutatedArray.thaw(), {foo: 'bar'});

  const object = new CrioObject({foo: 'bar'});
  const mutatedObject = object.mutate((thawed, frozen) => {
    t.false(thawed instanceof CrioObject);
    t.is(frozen, object);

    return ['foo', 'bar'];
  });

  t.deepEqual(mutatedObject.thaw(), ['foo', 'bar']);
});

test('if pluck will return the set of values matching in the collection', (t) => {
  const array = new CrioArray([{foo: 'bar'}, {bar: 'baz'}, {foo: 'foo'}]);
  const pluckedArray = array.pluck('foo');

  t.is(pluckedArray.length, array.length);
  t.deepEqual(pluckedArray.thaw(), ['bar', undefined, 'foo']);

  const object = new CrioObject({
    first: {foo: 'bar'},
    second: {bar: 'baz'},
    third: {foo: 'foo'}
  });
  const pluckedObject = object.pluck('foo');

  t.is(pluckedObject.length, Object.keys(object).length);
  t.deepEqual(pluckedObject.thaw(), ['bar', undefined, 'foo']);
});

test('if pluckIn will return the set of values matching in the nested collection', (t) => {
  const array = new CrioArray([
    [{foo: 'foo'}, {bar: 'baz'}, {foo: 'bar'}],
    [{foo: 'bar'}, {bar: 'baz'}, {foo: 'foo'}]
  ]);
  const pluckedInArray = array.pluckIn([1, 'foo']);

  t.is(pluckedInArray.length, array[1].length);
  t.deepEqual(pluckedInArray.thaw(), ['bar', undefined, 'foo']);

  const object = new CrioObject({
    collection: {
      first: {foo: 'bar'},
      second: {bar: 'baz'},
      third: {foo: 'foo'}
    },
    notCollection: {
      first: {foo: 'foo'},
      second: {bar: 'baz'},
      third: {foo: 'bar'}
    }
  });
  const pluckedInObject = object.pluckIn(['collection', 'foo']);

  t.is(pluckedInObject.length, object.collection.size);
  t.deepEqual(pluckedInObject.thaw(), ['bar', undefined, 'foo']);
});

test('if reduce will reduce the result down based on the initial value passed', (t) => {
  const numberArray = new CrioArray([1, 2, 3]);
  const numberArrayReduced = numberArray.reduce((sum, value) => {
    return sum + value;
  }, 0);

  t.is(numberArrayReduced, 6);

  const arrayArray = new CrioArray(['foo', false, 123]);
  const arrayReduced = arrayArray.reduce((compact, value) => {
    return !!value ? compact.concat([value]) : compact;
  }, []);

  t.deepEqual(arrayReduced.thaw(), ['foo', 123]);

  const objectArray = new CrioArray(['foo', 'bar', 'baz']);
  const objectReduced = objectArray.reduce((values, value, index) => {
    return {
      ...values,
      [index]: value
    };
  }, {});

  t.deepEqual(objectReduced.thaw(), {0: 'foo', 1: 'bar', 2: 'baz'});

  const numberObject = new CrioObject({one: 1, two: 2, three: 3});
  const numberObjectReduced = numberObject.reduce((sum, value) => {
    return sum + value;
  }, 0);

  t.is(numberObjectReduced, 6);

  const arrayObject = new CrioObject({one: 'foo', two: false, three: 123});
  const arrayObjectReduced = arrayObject.reduce((compact, value) => {
    return !!value ? compact.concat([value]) : compact;
  }, []);

  t.deepEqual(arrayObjectReduced.thaw(), ['foo', 123]);

  const objectObject = new CrioObject({one: 'foo', two: 'bar', three: 'baz'});

  let index = -1;

  const objectObjectReduced = objectObject.reduce((values, value) => {
    return {
      ...values,
      [++index]: value
    };
  }, {});

  t.deepEqual(objectObjectReduced.thaw(), {0: 'foo', 1: 'bar', 2: 'baz'});
});

test('if reduceRight will reduce the result down based on the initial value passed in reverse order', (t) => {
  const numberArray = new CrioArray([1, 2, 3]);
  const numberArrayReduced = numberArray.reduceRight((sum, value) => {
    return sum + value;
  }, 0);

  t.is(numberArrayReduced, 6);

  const arrayArray = new CrioArray(['foo', false, 123]);
  const arrayReduced = arrayArray.reduceRight((compact, value) => {
    return !!value ? compact.concat([value]) : compact;
  }, []);

  t.deepEqual(arrayReduced.thaw(), [123, 'foo']);

  const objectArray = new CrioArray(['foo', 'bar', 'baz']);
  const objectReduced = objectArray.reduceRight((values, value, index) => {
    return {
      ...values,
      [index]: value
    };
  }, {});

  t.deepEqual(objectReduced.thaw(), {2: 'baz', 1: 'bar', 0: 'foo'});

  const numberObject = new CrioObject({one: 1, two: 2, three: 3});
  const numberObjectReduced = numberObject.reduceRight((sum, value) => {
    return sum + value;
  }, 0);

  t.is(numberObjectReduced, 6);

  const arrayObject = new CrioObject({one: 'foo', two: false, three: 123});
  const arrayObjectReduced = arrayObject.reduceRight((compact, value) => {
    return !!value ? compact.concat([value]) : compact;
  }, []);

  t.deepEqual(arrayObjectReduced.thaw(), [123, 'foo']);

  const objectObject = new CrioObject({one: 'foo', two: 'bar', three: 'baz'});

  let index = -1;

  const objectObjectReduced = objectObject.reduceRight((values, value) => {
    return {
      ...values,
      [++index]: value
    };
  }, {});

  t.deepEqual(objectObjectReduced.thaw(), {0: 'baz', 1: 'bar', 2: 'foo'});
});

test('if set will assign the value to the key passed on a new crio', (t) => {
  const array = new CrioArray(['foo']);
  const setNewValueArray = array.set(1, 'bar');

  t.is(setNewValueArray.length, 2);
  t.deepEqual(setNewValueArray.thaw(), ['foo', 'bar']);

  const setExistingValueArray = array.set(0, 'baz');

  t.is(setExistingValueArray.length, 1);
  t.deepEqual(setExistingValueArray.thaw(), ['baz']);

  const object = new CrioObject({foo: 'bar'});
  const setNewValueObject = object.set('bar', 'baz');

  t.is(setNewValueObject.size, 2);
  t.deepEqual(setNewValueObject.thaw(), {foo: 'bar', bar: 'baz'});

  const setExistingValueObject = object.set('foo', 'foo');

  t.is(setExistingValueObject.size, 1);
  t.deepEqual(setExistingValueObject.thaw(), {foo: 'foo'});
});

test('if setIn will deeply assign the value to the path passed on a new crio', (t) => {
  const array = new CrioArray([{foo: 'foo'}]);
  const setNewValueArray = array.setIn([1, 'bar'], 'bar');

  t.is(setNewValueArray.length, 2);
  t.deepEqual(setNewValueArray.thaw(), [{foo: 'foo'}, {bar: 'bar'}]);

  const setExistingValueArray = array.setIn([0, 'foo'], 'baz');

  t.is(setExistingValueArray.length, 1);
  t.deepEqual(setExistingValueArray.thaw(), [{foo: 'baz'}]);

  t.is(array.setIn(), array);
  t.is(array.setIn([]), array);

  const object = new CrioObject({foo: {bar: 'baz'}});
  const setNewValueObject = object.setIn(['bar', 'baz'], 'foo');

  t.is(setNewValueObject.size, 2);
  t.deepEqual(setNewValueObject.thaw(), {foo: {bar: 'baz'}, bar: {baz: 'foo'}});

  const setExistingValueObject = object.setIn(['foo', 'baz'], 'bar');

  t.is(setExistingValueObject.size, 1);
  t.deepEqual(setExistingValueObject.thaw(), {foo: {bar: 'baz', baz: 'bar'}});

  t.is(object.setIn(), object);
  t.is(object.setIn([]), object);
});

test('if some will return true if any of the calls are truthy, else false', (t) => {
  const array = new CrioArray(['foo', 'barbie']);
  const someArrayMatch = array.some((value) => {
    return value.length === 3;
  });
  const someArrayNotMatch = array.some((value) => {
    return value === 'bar';
  });

  t.true(someArrayMatch);
  t.false(someArrayNotMatch);

  const object = new CrioObject({foo: 'bar', bar: 'baz'});
  const someObjectMatch = object.some((value, key) => {
    return key === 'bar';
  });
  const someObjectNotMatch = object.some((value) => {
    return value === 'foo';
  });

  t.true(someObjectMatch);
  t.false(someObjectNotMatch);
});

test('if thaw will return the standard version of the object', (t) => {
  const naturalArray = ['foo', 'bar'];
  const array = new CrioArray(naturalArray);
  const thawedArray = array.thaw();

  t.not(thawedArray, naturalArray);
  t.deepEqual(thawedArray, naturalArray);

  const naturalObject = {foo: 'bar', bar: 'baz'};
  const object = new CrioObject(naturalObject);
  const thawedObject = object.thaw();

  t.not(thawedObject, naturalObject);
  t.deepEqual(thawedObject, naturalObject);
});

test('if toArray converts an object to array, or returns the crio if it is already an array', (t) => {
  const array = new CrioArray(['foo']);
  const arrayToArray = array.toArray();

  t.is(arrayToArray, array);

  const object = new CrioObject({foo: 'bar'});
  const objectToArray = object.toArray();

  t.deepEqual(objectToArray.thaw(), ['bar']);
});

test('if toLocaleString converts the crio to a stringified form', (t) => {
  const array = new CrioArray(['foo']);
  const arrayToString = array.toLocaleString();

  t.is(arrayToString, 'CrioArray{"0":"foo"}');

  const object = new CrioObject({foo: 'bar'});
  const objectToString = object.toLocaleString();

  t.is(objectToString, 'CrioObject{foo:"bar"}');
});

test('if toObject converts an array to object, or returns the crio if it is already an object', (t) => {
  const array = new CrioArray(['foo']);
  const arrayToObject = array.toObject();

  t.deepEqual(arrayToObject.thaw(), {0: 'foo'});

  const object = new CrioObject({foo: 'bar'});
  const objectToObject = object.toObject();

  t.is(objectToObject, object);
});

test('if toString converts the crio to a stringified form', (t) => {
  const array = new CrioArray(['foo']);
  const arrayToString = array.toString();

  t.is(arrayToString, 'CrioArray{"0":"foo"}');

  const object = new CrioObject({foo: 'bar'});
  const objectToString = object.toString();

  t.is(objectToString, 'CrioObject{foo:"bar"}');
});

test('if valueOf returns the crio itself', (t) => {
  const array = new CrioArray([]);

  t.is(array, array.valueOf());

  const object = new CrioObject({});

  t.is(object, object.valueOf());
});

test('if values returns an array of values in the crio', (t) => {
  const array = new CrioArray(['foo', 'bar']);
  const arrayValues = array.values();

  t.deepEqual(arrayValues, ['foo', 'bar']);

  const object = new CrioObject({foo: 'bar', bar: 'baz'});
  const objectValues = object.values();

  t.deepEqual(objectValues, ['bar', 'baz']);
});

test('if the iterator will correctly loop a for-of', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);

  let arrayResults = [];

  for (let value of array) {
    arrayResults.push(value);
  }

  t.deepEqual(arrayResults, ['foo', 'bar', 'baz']);

  const object = new CrioObject({foo: 'foo', bar: 'bar', baz: 'baz'});

  let objectResults = [];

  for (let value of object) {
    objectResults.push(value);
  }

  t.deepEqual(objectResults, ['foo', 'bar', 'baz']);
});

test('if the unscopables symbol is correctly valued', (t) => {
  const array = new CrioArray([]);

  t.is(array[Symbol.unscopables], UNSCOPABLES_PROPERTY_DESCRIPTOR.value);
});

/* ------------------ ARRAY METHODS ------------------ */

test('if concat will append the values in the array passed to the crio', (t) => {
  const array = new CrioArray(['foo']);
  const concattedArray = array.concat(['bar']);

  t.deepEqual(concattedArray.thaw(), ['foo', 'bar']);
});

test('if copyWithin matches the spec', (t) => {
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

test('if fill matches the spec', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);

  t.deepEqual(array.fill(1).thaw(), [1, 1, 1]);
  t.deepEqual(array.fill(1, 1, 2).thaw(), ['foo', 1, 'baz']);
  t.deepEqual(array.fill(1, 1, 1).thaw(), ['foo', 'bar', 'baz']);
  t.deepEqual(array.fill(1, -3, -2).thaw(), [1, 'bar', 'baz']);
  t.deepEqual(array.fill(1, NaN, NaN).thaw(), ['foo', 'bar', 'baz']);
});

test('if findIndex will return the index for the correct object', (t) => {
  const array = new CrioArray(['foo', 'bar']);

  const foundArrayByIndex = array.findIndex((value, index) => {
    return index === 1;
  });
  const foundArrayByValue = array.findIndex((value) => {
    return value === 'foo';
  });

  t.is(foundArrayByIndex, 1);
  t.is(foundArrayByValue, 0);
});

test('if findLastIndex will return the index for the correct object', (t) => {
  const array = new CrioArray(['foo', 'bar', 'foo']);

  const foundArrayByValue = array.findLastIndex((value) => {
    return value === 'foo';
  });

  t.is(foundArrayByValue, 2);
});

test('if first returns a new CrioArray with the first n number of items in the CrioArray', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);

  t.deepEqual(array.first().thaw(), ['foo']);
  t.deepEqual(array.first(2).thaw(), ['foo', 'bar']);
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

test('if pop returns a new CrioArray with the last item removed', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz']);
  const poppedArray = array.pop();

  t.deepEqual(poppedArray.thaw(), ['foo', 'bar']);
});

test('if push returns a new CrioArray with the items added', (t) => {
  const array = new CrioArray(['foo']);
  const pushedArray = array.push('bar', 'baz');

  t.deepEqual(pushedArray.thaw(), ['foo', 'bar', 'baz']);
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

test('if sort will return a new crio that is sorted', (t) => {
  const array = new CrioArray([4, 1, 2, 6]);
  const sortedArray = array.sort();

  t.deepEqual(sortedArray.thaw(), [1, 2, 4, 6]);
});

test('if splice will apply correctly based on the arguments passed', (t) => {
  const array = new CrioArray(['foo', 'bar', 'baz', 'blah']);

  t.deepEqual(array.splice(2, 0, 'drum').thaw(), [
    'foo',
    'bar',
    'drum',
    'baz',
    'blah'
  ]);
  t.deepEqual(array.splice(2, 1).thaw(), ['foo', 'bar', 'blah']);
  t.deepEqual(array.splice(2, 1, 'drum').thaw(), [
    'foo',
    'bar',
    'drum',
    'blah'
  ]);
  t.deepEqual(array.splice(0, 2, 'drum').thaw(), ['drum', 'baz', 'blah']);
  t.deepEqual(array.splice(array.length - 3, 2).thaw(), ['foo', 'blah']);
});

test('if unique returns a new CrioArray with only unique values', (t) => {
  const array = new CrioArray([
    'foo',
    'foo',
    'bar',
    'foo',
    'bar',
    {foo: 'bar'},
    {foo: 'bar'}
  ]);

  t.deepEqual(array.unique().thaw(), ['foo', 'bar', {foo: 'bar'}]);
});

test('if unshift will add the passed values to the beginning of a new CrioArray', (t) => {
  const array = new CrioArray(['bar', 'baz']);

  t.deepEqual(array.unshift('foo').thaw(), ['foo', 'bar', 'baz']);
  t.deepEqual(array.unshift(['foo']).thaw(), [['foo'], 'bar', 'baz']);

  t.is(array.unshift(), array);
});

test('if xor produces the correct new CrioArray', (t) => {
  const array = new CrioArray(['foo', 1, true]);

  t.deepEqual(array.xor(['foo'], [true]).thaw(), [1]);
  t.deepEqual(array.xor(['foo', 1]).thaw(), [true]);
});

/* ------------------ OBJECT METHODS ------------------ */

test('if findKey will return the key for the correct object', (t) => {
  const array = new CrioObject({foo: 'bar', bar: 'baz'});

  const foundArrayByKey = array.findKey((value, key) => {
    return key === 'foo';
  });
  const foundArrayByValue = array.findKey((value) => {
    return value === 'baz';
  });

  t.is(foundArrayByKey, 'foo');
  t.is(foundArrayByValue, 'bar');
});

test('if findLastKey will return the key for the correct object', (t) => {
  const array = new CrioObject({foo: 'baz', bar: 'baz', baz: 'baz'});

  const foundArrayByValue = array.findLastKey((value) => {
    return value === 'baz';
  });

  t.is(foundArrayByValue, 'baz');
});
