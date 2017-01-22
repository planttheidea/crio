// test
import test from 'ava';
import _ from 'lodash';
import React from 'react';

// src
import {
  CrioArray,
  CrioObject
} from '../src/Crio';
import * as utils from '../src/utils';

test('if createAssignToObject creates a function that will assign the value returned from it to the instance', (t) => {
  const assignToObject = utils.createAssignToObject(CrioArray, CrioObject);

  t.true(_.isFunction(assignToObject));

  const object = {};

  const assignmentFunction = assignToObject(object, (value) => {
    return value;
  });

  t.true(_.isFunction(assignmentFunction));

  assignmentFunction('bar', 'foo');

  t.is(object.foo, 'bar');
});

test('if freeze will deeply freeze the object passed', (t) => {
  const object = {
    foo: {
      bar: 'baz'
    }
  };

  const frozen = utils.freeze(object);

  t.true(Object.isFrozen(frozen));
  t.true(Object.isFrozen(frozen.foo));
});

test('if getCorrectConstructor will return CrioArray if an array is passed, else CrioObject', (t) => {
  const array = utils.getCorrectConstructor([], CrioArray, CrioObject);
  const object = utils.getCorrectConstructor({}, CrioArray, CrioObject);

  t.is(array, CrioArray);
  t.is(object, CrioObject);
});

test('if getCrioValue returns a crioed version of objects and arrays, but doesnt touch other value types', (t) => {
  const bool = true;
  const number = 123;
  const string = 'foo';
  const date = new Date();
  const regexp = /foo/;
  const array = [];
  const object = {};
  const crioArray = new CrioArray([]);
  const crioObject = new CrioObject({});

  t.is(utils.getCrioValue(bool, CrioArray), bool);
  t.is(utils.getCrioValue(number, CrioArray), number);
  t.is(utils.getCrioValue(string, CrioArray), string);
  t.is(utils.getCrioValue(date, CrioArray), date);
  t.is(utils.getCrioValue(regexp, CrioArray), regexp);
  t.is(utils.getCrioValue(crioArray, CrioArray), crioArray);
  t.is(utils.getCrioValue(crioObject, CrioArray), crioObject);

  const crioedArray = utils.getCrioValue(array, CrioArray);
  const crioedObject = utils.getCrioValue(object, CrioObject);

  t.not(crioedArray, array);
  t.true(utils.isCrio(crioedArray));
  t.true(crioedArray.isArray());
  t.not(crioedObject, object);
  t.true(utils.isCrio(crioedObject));
  t.true(crioedObject.isObject());
});

test('if getKeysMetadata returns an object of relevant metadata related to the keys parent value structure', (t) => {
  const instance = new CrioObject({foo: {bar: 'baz'}});
  const keys = ['foo', 'bar'];

  const result = utils.getKeysMetadata(keys, instance);

  t.deepEqual(result, {
    currentValue: instance.foo,
    lastIndex: 1,
    parentKeys: ['foo']
  });
});

test('if getRelativeValue returns a number between the 0 and the length, which is equal to the value if it falls in that ' +
  'range, and the difference of the length and the number when it is less than 0', (t) => {
  const length = 10;
  const inValue = 5;

  const inResult = utils.getRelativeValue(inValue, length);

  t.is(inResult, inValue);

  const overValue = 15;

  const overResult = utils.getRelativeValue(overValue, length);

  t.is(overResult, length);

  const underValue = -5;

  const underResult = utils.getRelativeValue(underValue, length);

  t.is(underResult, length + underValue);
});

test('if getStandardValue returns a plain JS version of the crio passed', (t) => {
  const object = new CrioObject({
    foo: ['bar']
  });
  const standardObject = utils.getStandardValue(object);

  t.deepEqual(standardObject, {foo: ['bar']});

  const array = new CrioArray([
    {foo: 'bar'}
  ]);
  const standardArray = utils.getStandardValue(array);

  t.deepEqual(standardArray, [{foo: 'bar'}]);
});

test('if isComplexObject returns true if object passed is an object or array, false otherwise', (t) => {
  const bool = true;
  const number = 123;
  const string = 'foo';
  const date = new Date();
  const regexp = /foo/;
  const array = [];
  const object = {};
  const reactElement = <div/>;

  t.false(utils.isComplexObject(bool));
  t.false(utils.isComplexObject(number));
  t.false(utils.isComplexObject(string));
  t.false(utils.isComplexObject(date));
  t.false(utils.isComplexObject(regexp));

  t.true(utils.isComplexObject(reactElement));
  t.true(utils.isComplexObject(array));
  t.true(utils.isComplexObject(object));
});

test('if isCrio returns true for crios but false otherwise', (t) => {
  const bool = true;
  const number = 123;
  const string = 'foo';
  const date = new Date();
  const regexp = /foo/;
  const array = [];
  const object = {};
  const crioArray = new CrioArray([]);
  const crioObject = new CrioObject({});
  const reactElement = <div/>;

  t.false(utils.isCrio(bool));
  t.false(utils.isCrio(number));
  t.false(utils.isCrio(string));
  t.false(utils.isCrio(date));
  t.false(utils.isCrio(regexp));
  t.false(utils.isCrio(array));
  t.false(utils.isCrio(object));
  t.false(utils.isCrio(reactElement));

  t.true(utils.isCrio(crioArray));
  t.true(utils.isCrio(crioObject));
});

test('if isEqual checks that second object is a crio and that their hashCodes are equal', (t) => {
  const object = new CrioObject({foo: 'bar'});
  const objectMatch = new CrioObject({foo: 'bar'});
  const objectNotCrio = {foo: 'bar'};
  const objectNotMatch = new CrioObject({foo: 'baz'});

  t.true(utils.isEqual(object, objectMatch));
  t.false(utils.isEqual(object, objectNotCrio));
  t.false(utils.isEqual(object, objectNotMatch));

  const array = new CrioArray(['foo']);
  const arrayMatch = new CrioArray(['foo']);
  const arrayNotCrio = ['foo'];
  const arrayNotMatch = new CrioArray(['bar']);

  t.true(utils.isEqual(array, arrayMatch));
  t.false(utils.isEqual(array, arrayNotCrio));
  t.false(utils.isEqual(array, arrayNotMatch));
});

test('if isReactElement returns true for react elements but false otherwise', (t) => {
  const bool = true;
  const number = 123;
  const string = 'foo';
  const date = new Date();
  const regexp = /foo/;
  const array = [];
  const object = {};
  const crioArray = new CrioArray([]);
  const crioObject = new CrioObject({});
  const reactElement = <div/>;

  t.false(utils.isReactElement(bool));
  t.false(utils.isReactElement(number));
  t.false(utils.isReactElement(string));
  t.false(utils.isReactElement(date));
  t.false(utils.isReactElement(regexp));
  t.false(utils.isReactElement(array));
  t.false(utils.isReactElement(object));
  t.false(utils.isReactElement(crioArray));
  t.false(utils.isReactElement(crioObject));

  t.true(utils.isReactElement(reactElement));
});

test('if stringify returns a stringified version of the object passed to it', (t) => {
  const object = new CrioObject({foo: 'bar'});
  const objectToString = utils.stringify(object);

  t.is(objectToString, 'CrioObject{foo:"bar"}');
});
