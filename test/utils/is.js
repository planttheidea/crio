import test from 'ava';
import React from 'react';

import {
  isCrio,
  isCrioArray,
  isCrioObject,
  isReactElement
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

test('if isCrioArray correctly determines if object is a CrioArray', (t) => {
  t.true(isCrioArray(crioArray));

  t.false(isCrioArray(crioObject));
  t.false(isCrioArray(array));
  t.false(isCrioArray(boolean));
  t.false(isCrioArray(date));
  t.false(isCrioArray(map));
  t.false(isCrioArray(number));
  t.false(isCrioArray(object));
  t.false(isCrioArray(ReactClass));
  t.false(isCrioArray(reactElement));
  t.false(isCrioArray(regexp));
  t.false(isCrioArray(set));
  t.false(isCrioArray(string));
  t.false(isCrioArray(undef));
});

test('if isCrioObject correctly determines if object is a CrioObject', (t) => {
  t.true(isCrioObject(crioObject));

  t.false(isCrioObject(crioArray));
  t.false(isCrioObject(array));
  t.false(isCrioObject(boolean));
  t.false(isCrioObject(date));
  t.false(isCrioObject(map));
  t.false(isCrioObject(number));
  t.false(isCrioObject(object));
  t.false(isCrioObject(ReactClass));
  t.false(isCrioObject(reactElement));
  t.false(isCrioObject(regexp));
  t.false(isCrioObject(set));
  t.false(isCrioObject(string));
  t.false(isCrioObject(undef));
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