import test from 'ava';
import React from 'react';

import {
  isCrio,
  isReactElement,
  isSameCrio
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