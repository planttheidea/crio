import test from 'ava';
import React from 'react';

import {
    forEach,
    forEachRight,
    getHashIfChanged,
    isArray,
    isObject,
    isReactElement,
    isUndefined,
    setNonEnumerable,
    setStandard,
    shallowCloneArray,
    stringifySerializerForHash
} from '../src/utils';

import crio from '../src';

const REACT_ELEMENT = React.createElement('div', {id: 'test'});

test('if forEach will execute function as loop that increments', (t) => {
    const length = 10;

    let array = [],
        finalValue;

    for (let index = 1; index <= length; index++) {
        array.push(index);
    }

    forEach(array, (index) => {
        finalValue = index;
    });

    t.is(length, finalValue);
});

test('if forEach will execute function as loop that decrements', (t) => {
    const length = 10;

    let array = [],
        finalValue;

    for (let index = 0; index < length; index++) {
        array.push(index);
    }

    forEachRight(array, (index) => {
        finalValue = index;
    });

    t.is(0, finalValue);
});

test('if getHashIfChanged will correctly identify if values have changed with hash', (t) => {
    const object = {foo: 'bar'};
    const crioObject = crio(object);

    t.false(getHashIfChanged(crioObject, {
        foo: 'bar'
    }));
    t.truthy(getHashIfChanged(crioObject, {
        foo: 'baz'
    }));
});

test('if isArray properly checks if something is an array or CrioArray', (t) => {
    const array = ['foo', 'bar'];
    const crioArray = crio(array);
    const object = {foo: 'bar'};
    const crioObject = crio(object);

    t.true(isArray(array));
    t.true(isArray(crioArray));
    t.false(isArray(object));
    t.false(isArray(crioObject));
    t.false(isArray('string'));
    t.false(isArray(1));
    t.false(isArray(true));
    t.false(isArray(undefined));
    t.false(isArray(null));
    t.false(isArray(REACT_ELEMENT));
});

test('if isObject properly checks if something is an object or CrioObject', (t) => {
    const array = ['foo', 'bar'];
    const crioArray = crio(array);
    const object = {foo: 'bar'};
    const crioObject = crio(object);

    t.false(isObject(array));
    t.false(isObject(crioArray));
    t.true(isObject(object));
    t.true(isObject(crioObject));
    t.false(isObject('string'));
    t.false(isObject(1));
    t.false(isObject(true));
    t.false(isObject(undefined));
    t.false(isObject(null));
    t.true(isObject(REACT_ELEMENT));
});

test('if isReactElement properly checks if something is a React element', (t) => {
    const array = ['foo', 'bar'];
    const crioArray = crio(array);
    const object = {foo: 'bar'};
    const crioObject = crio(object);

    t.false(isReactElement(array));
    t.false(isReactElement(crioArray));
    t.false(isReactElement(object));
    t.false(isReactElement(crioObject));
    t.false(isReactElement('string'));
    t.false(isReactElement(1));
    t.false(isReactElement(true));
    t.false(isReactElement(undefined));
    t.false(isReactElement(null));
    t.true(isReactElement(REACT_ELEMENT));
});

test('if isUndefined properly checks if something is undefined', (t) => {
    const array = ['foo', 'bar'];
    const crioArray = crio(array);
    const object = {foo: 'bar'};
    const crioObject = crio(object);

    t.false(isUndefined(array));
    t.false(isUndefined(crioArray));
    t.false(isUndefined(object));
    t.false(isUndefined(crioObject));
    t.false(isUndefined('string'));
    t.false(isUndefined(1));
    t.false(isUndefined(true));
    t.true(isUndefined(undefined));
    t.false(isUndefined(null));
    t.false(isUndefined(REACT_ELEMENT));
});

test('if setNonEnumerable adds a non-enumerable property to an object', (t) => {
    let object = {};

    setNonEnumerable(object, 'foo', 'bar');

    t.false(object.propertyIsEnumerable('foo'));
});

test('if setStandard adds a property to an object that is configurable or writable', (t) => {
    let object = {};

    setStandard(object, 'foo', 'bar');

    const {
        configurable,
        writable
    } = Object.getOwnPropertyDescriptor(object, 'foo');

    t.true(configurable);
    t.true(writable);
});

test('if shallowCloneArray produces a shallow clone', (t) => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const crioArray = crio(array);
    const shallowClone = shallowCloneArray(crioArray);

    t.is(crioArray.length, shallowClone.length);

    crioArray.forEach((value, index) => {
        t.is(value, shallowClone[index]);
    });

    t.false(crioArray === shallowClone);
    t.false(array === shallowClone);
});

test('if stringifySerializerForHash stringifies functions', (t) => {
    const arrayWithReactElement = [<div/>];
    const stringifiedArray = JSON.stringify(arrayWithReactElement, stringifySerializerForHash);
    const expectedString = '[0]';

    t.is(stringifiedArray, expectedString);
});
