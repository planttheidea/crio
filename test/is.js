// test
import test from 'ava';
import React from 'react';

// src
import * as is from 'src/is';
import CrioArray from 'src/CrioArray';
import CrioObject from 'src/CrioObject';

const array = ['foo'];
const bool = true;
const crioArray = new CrioArray(['foo']);
const crioObject = new CrioObject({foo: 'bar'});
const func = function() {};
const nul = null;
const number = 123;
const object = {};
const reactElement = <div />;
const regexp = /foo/;
const string = 'foo';
const symbol = Symbol('foo');
const undef = undefined;

test('if isCrio returns true if the object is an instance of CrioArray', (t) => {
  t.true(is.isCrio(crioArray));
});

test('if isCrio returns true if the object is an instance of CrioObject', (t) => {
  t.true(is.isCrio(crioObject));
});

test('if isCrio returns false if the object is not a crio', (t) => {
  t.false(is.isCrio(object));
});

test('if isEqual returns false if the object is not a crio', (t) => {
  t.false(is.isEqual(crioArray, array));
});

test('if isEqual returns false if the object is not equal in value', (t) => {
  const otherCrio = new CrioArray(['bar']);

  t.false(is.isEqual(crioArray, otherCrio));
});

test('if isEqual returns true if the object is equal in value', (t) => {
  const otherCrio = new CrioArray(['foo']);

  t.true(is.isEqual(crioArray, otherCrio));
});

test('if isFunction returns true if a function, false otherwise', (t) => {
  t.false(is.isFunction(array));
  t.false(is.isFunction(bool));
  t.false(is.isFunction(crioArray));
  t.false(is.isFunction(crioObject));
  t.true(is.isFunction(func));
  t.false(is.isFunction(number));
  t.false(is.isFunction(nul));
  t.false(is.isFunction(object));
  t.false(is.isFunction(reactElement));
  t.false(is.isFunction(regexp));
  t.false(is.isFunction(string));
  t.false(is.isFunction(symbol));
  t.false(is.isFunction(undef));
});

test('if isNumber returns true if a number, false otherwise', (t) => {
  t.false(is.isNumber(array));
  t.false(is.isNumber(bool));
  t.false(is.isNumber(crioArray));
  t.false(is.isNumber(crioObject));
  t.false(is.isNumber(func));
  t.false(is.isNumber(nul));
  t.true(is.isNumber(number));
  t.false(is.isNumber(object));
  t.false(is.isNumber(reactElement));
  t.false(is.isNumber(regexp));
  t.false(is.isNumber(string));
  t.false(is.isNumber(symbol));
  t.false(is.isNumber(undef));
});

test('if isObject returns true if an object, false otherwise', (t) => {
  t.false(is.isObject(array));
  t.false(is.isObject(bool));
  t.false(is.isObject(crioArray));
  t.false(is.isObject(crioObject));
  t.false(is.isObject(func));
  t.false(is.isObject(nul));
  t.false(is.isObject(number));
  t.true(is.isObject(object));
  t.false(is.isObject(reactElement));
  t.false(is.isObject(regexp));
  t.false(is.isObject(string));
  t.false(is.isObject(symbol));
  t.false(is.isObject(undef));
});

test('if isReactElement returns true if a React element, false otherwise', (t) => {
  t.false(is.isReactElement(array));
  t.false(is.isReactElement(bool));
  t.false(is.isReactElement(crioArray));
  t.false(is.isReactElement(crioObject));
  t.false(is.isReactElement(func));
  t.false(is.isReactElement(nul));
  t.false(is.isReactElement(number));
  t.false(is.isReactElement(object));
  t.true(is.isReactElement(reactElement));
  t.false(is.isReactElement(regexp));
  t.false(is.isReactElement(string));
  t.false(is.isReactElement(symbol));
  t.false(is.isReactElement(undef));
});

test('if isString returns true if a string, false otherwise', (t) => {
  t.false(is.isString(array));
  t.false(is.isString(bool));
  t.false(is.isString(crioArray));
  t.false(is.isString(crioObject));
  t.false(is.isString(func));
  t.false(is.isString(nul));
  t.false(is.isString(number));
  t.false(is.isString(object));
  t.false(is.isString(reactElement));
  t.false(is.isString(regexp));
  t.true(is.isString(string));
  t.false(is.isString(symbol));
  t.false(is.isString(undef));
});

test('if isUndefined returns true if a string, false otherwise', (t) => {
  t.false(is.isUndefined(array));
  t.false(is.isUndefined(bool));
  t.false(is.isUndefined(crioArray));
  t.false(is.isUndefined(crioObject));
  t.false(is.isUndefined(func));
  t.false(is.isUndefined(nul));
  t.false(is.isUndefined(number));
  t.false(is.isUndefined(object));
  t.false(is.isUndefined(reactElement));
  t.false(is.isUndefined(regexp));
  t.false(is.isUndefined(string));
  t.false(is.isUndefined(symbol));
  t.true(is.isUndefined(undef));
});
