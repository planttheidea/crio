import test from 'ava';
import React from 'react';

import {
  isArray,
  isCrio,
  isObject,
  isReactElement,
  isSameCrio,
  isUndefined
} from '../../src/utils/is';

import crio from '../../src';

const array = [];
const boolean = true;
const crioArray = crio([]);
const crioObject = crio({});
const date = new Date();
const map = new Map();
const nul = null;
const number = 123;
const object = {};
const regexp = /foo/;
const ReactClass = () => {
  return (
    <div/>
  );
};
const reactElement = <div/>;
const set = new Set();
const string = 'foo';
const undef = undefined;

test('if isArray correctly determines if object is an array', (t) => {
  t.true(isArray(array));

  t.false(isArray(boolean));
  t.false(isArray(crioArray));
  t.false(isArray(crioObject));
  t.false(isArray(date));
  t.false(isArray(map));
  t.false(isArray(nul));
  t.false(isArray(number));
  t.false(isArray(object));
  t.false(isArray(ReactClass));
  t.false(isArray(reactElement));
  t.false(isArray(regexp));
  t.false(isArray(set));
  t.false(isArray(string));
  t.false(isArray(undef));
});

test('if isCrio correctly determines if object is a CrioArray or CrioObject', (t) => {
  t.true(isCrio(crioArray));
  t.true(isCrio(crioObject));

  t.false(isCrio(array));
  t.false(isCrio(boolean));
  t.false(isCrio(date));
  t.false(isCrio(map));
  t.false(isCrio(number));
  t.false(isCrio(object));
  t.false(isCrio(ReactClass));
  t.false(isCrio(reactElement));
  t.false(isCrio(regexp));
  t.false(isCrio(set));
  t.false(isCrio(string));
  t.false(isCrio(undef));
});

test('if isObject correctly determines if object is an object', (t) => {
  t.true(isObject(crioArray));
  t.true(isObject(crioObject));
  t.true(isObject(object));
  t.true(isObject(reactElement));

  t.false(isObject(array));
  t.false(isObject(boolean));
  t.false(isObject(date));
  t.false(isObject(map));
  t.false(isObject(nul));
  t.false(isObject(number));
  t.false(isObject(ReactClass));
  t.false(isObject(regexp));
  t.false(isObject(set));
  t.false(isObject(string));
  t.false(isObject(undef));
});

test('if isReactElement correctly determines if object is a React element', (t) => {
  t.true(isReactElement(reactElement));

  t.false(isReactElement(array));
  t.false(isReactElement(boolean));
  t.false(isReactElement(crioArray));
  t.false(isReactElement(crioObject));
  t.false(isReactElement(date));
  t.false(isReactElement(map));
  t.false(isReactElement(nul));
  t.false(isReactElement(number));
  t.false(isReactElement(object));
  t.false(isReactElement(ReactClass));
  t.false(isReactElement(regexp));
  t.false(isReactElement(set));
  t.false(isReactElement(string));
  t.false(isReactElement(undef));
});

test('if isSameCrio correctly determines if the objects are both crio and equal in value', (t) => {
  t.false(isSameCrio({}, {}));
  t.false(isSameCrio([], []));
});

test('if isUndefined correctly determines if object is undefined', (t) => {
  t.true(isUndefined(undef));

  t.false(isUndefined(array));
  t.false(isUndefined(boolean));
  t.false(isUndefined(crioArray));
  t.false(isUndefined(crioObject));
  t.false(isUndefined(date));
  t.false(isUndefined(map));
  t.false(isUndefined(nul));
  t.false(isUndefined(number));
  t.false(isUndefined(object));
  t.false(isUndefined(ReactClass));
  t.false(isUndefined(reactElement));
  t.false(isUndefined(regexp));
  t.false(isUndefined(set));
  t.false(isUndefined(string));
});