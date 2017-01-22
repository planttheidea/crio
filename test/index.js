// test
import test from 'ava';

// src
import crio from '../src/index';
import {
  CrioArray,
  CrioObject
} from '../src/Crio';
import * as utils from '../src/utils';

test('if crio will return a crio object or array if valid', (t) => {
  const array = [];
  const crioArray = crio(array);

  t.true(crioArray instanceof CrioArray);

  const object = {};
  const crioObject = crio(object);

  t.true(crioObject instanceof CrioObject);
});

test('if crio will default to a plain object when no value is passed', (t) => {
  const crioObject = crio();

  t.true(crioObject instanceof CrioObject);
});

test('if crio will return the original object if it is already a crio', (t) => {
  const crioObject = crio();
  const newCrioObject = crio(crioObject);

  t.is(crioObject, newCrioObject);
});

test('if crio will throw when the input type is incorrect', (t) => {
  t.throws(() => {
    crio('foo');
  }, TypeError);
});

test('if crio.array will generate an array without a value passed', (t) => {
  const array = crio.array();

  t.true(array instanceof CrioArray);
});

test('if crio.array will throw a TypeError when the object passed is not an array', (t) => {
  t.throws(() => {
    crio.array('foo');
  }, TypeError);
});

test('if crio.isArray correctly tests if the item is a crio array', (t) => {
  const array = [];
  const crioArray = crio.array();

  t.false(crio.isArray(array));
  t.true(crio.isArray(crioArray));
});

test('if crio.isCrio is the isCrio function in utils', (t) => {
  t.is(crio.isCrio, utils.isCrio);
});

test('if crio.isObject correctly tests if the item is a crio object', (t) => {
  const object = {};
  const crioObject = crio.object();

  t.false(crio.isObject(object));
  t.true(crio.isObject(crioObject));
});

test('if crio.object will generate an object without a value passed', (t) => {
  const object = crio.object();

  t.true(object instanceof CrioObject);
});

test('if crio.object will throw a TypeError when the object passed is not an object', (t) => {
  t.throws(() => {
    crio.object('foo');
  }, TypeError);
});
