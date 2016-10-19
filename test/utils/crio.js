import test from 'ava';

import {
  createPrototypeObject,
  freezeIfNotProduction,
  getCleanValue,
  getDeeplyNestedValue,
  getPlainObject,
  getSameCrioIfUnchanged,
  throwTypeErrorIfKeysInvalid
} from '../../src/utils/crio';

import crio from '../../src';

test('if createPrototypeObject will create an object with non-enumerable values', (t) => {
  const object = {
    foo() {},
    bar() {}
  };
  const prototype = createPrototypeObject(object);

  Object.getOwnPropertyNames(prototype).forEach((key) => {
    const {
      value
    } = Object.getOwnPropertyDescriptor(prototype, key);

    t.true(value.configurable);
    t.true(value.writable);

    t.false(value.enumerable);
  });
});

test('if freezeIfNotProduction will freeze the object', (t) => {
  const value = freezeIfNotProduction({foo: 'bar'});

  t.true(Object.isFrozen(value));
});

test('if getCleanValue will return the thawed value of the crio', (t) => {
  const array = ['foo', 'bar'];
  const crioValue = crio(array);
  const nonCrioValue = 'foo';

  t.is(getCleanValue(nonCrioValue), nonCrioValue);

  const cleanCrioValue = getCleanValue(crioValue);

  t.not(cleanCrioValue, crioValue);
  t.true(Array.isArray(cleanCrioValue));
  t.deepEqual(cleanCrioValue, array);
});

test('if getDeeplyNestedValue will deeply set the value in a nested object', (t) => {
  const plainObject = {foo: {bar: 'baz'}};
  const crioObject = crio.object(plainObject);

  t.is(getDeeplyNestedValue(plainObject, {bar: 'boo'}, false, []), plainObject);
  t.deepEqual(getDeeplyNestedValue(plainObject, {bar: 'boo'}, true, ['some']), {some: {bar: 'boo'}});

  const resultCrio = crio.object({
    ...plainObject,
    some: {bar: 'boo'}
  });

  t.is(getDeeplyNestedValue(crioObject, {bar: 'boo'}, false, []), crioObject);
  t.deepEqual(getDeeplyNestedValue(crioObject, {bar: 'boo'}, true, ['some']), resultCrio);
});

test('if getPlainObject will return the thawed crio', (t) => {
  const crioArray = crio.array(['foo']);
  const crioObject = crio.object({foo: 'bar'});

  t.deepEqual(getPlainObject(crioArray), []);
  t.deepEqual(getPlainObject(crioArray, true), new Array(1));

  t.deepEqual(getPlainObject(crioObject), {});
});

test('if getSameCrioIfUnchanged will return the same object if no values have changed', (t) => {
  const array = ['foo', 'bar'];
  const changedArray = ['foo', 'baz'];
  const crioArray = crio.array(array);

  t.is(getSameCrioIfUnchanged(crioArray, array), crioArray);
  t.not(getSameCrioIfUnchanged(crioArray, changedArray), crioArray);
});

test('if throwTypeErrorIfKeysInvalid throws when keys are not array', (t) => {
  t.throws(() => {
    throwTypeErrorIfKeysInvalid('foo');
  });
});