import test from 'ava';

import {
    forEach,
    hasChanged,
    hash,
    isArray,
    isObject,
    isString,
    isUndefined,
    setNonEnumerable,
    setStandard,
    shallowCloneArray,
    stringifySerializerForHash
} from '../src/utils';

import crio from '../src';

test('if forEach will execute function as loop', (t) => {
    const length = 10;

    let array = [],
        finalValue;

    for (let index = 0; index < length; index++) {
        array.push(index + 1);
    }

    forEach(array, (index) => {
        finalValue = index;
    });

    t.is(length, finalValue);
});

test('if hasChanged will correctly identify if values have changed with hash', (t) => {
    const object = {foo: 'bar'};
    const crioObject = crio(object);

    t.false(hasChanged(crioObject, {
        foo: 'bar'
    }));
    t.true(hasChanged(crioObject, {
        foo: 'baz'
    }));
});

test('if hash will consistently has string values', (t) => {
    const stringOne = 'STRING_ONE';
    const stringTwo = 'STRING_TWO';
    const stringThree = 'STRING_THREE';

    let previousHashOne = 765875368,
        previousHashTwo = 766033282,
        previousHashThree = 1704848752;

    for (let i = 10000; i--;) {
        const currentHashOne = hash(stringOne);
        const currentHashTwo = hash(stringTwo);
        const currentHashThree = hash(stringThree);

        t.is(previousHashOne, currentHashOne);
        t.is(previousHashTwo, currentHashTwo);
        t.is(previousHashThree, currentHashThree);
    }
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
});

test('if isString properly checks if something is a string', (t) => {
    const array = ['foo', 'bar'];
    const crioArray = crio(array);
    const object = {foo: 'bar'};
    const crioObject = crio(object);

    t.false(isString(array));
    t.false(isString(crioArray));
    t.false(isString(object));
    t.false(isString(crioObject));
    t.true(isString('string'));
    t.false(isString(1));
    t.false(isString(true));
    t.false(isString(undefined));
    t.false(isString(null));
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

    t.deepEqual(crioArray, shallowClone);
    t.false(crioArray === shallowClone);
    t.false(array === shallowClone);
});

test('if stringifySerializerForHash stringifies functions', (t) => {
    const arrayWithFunction = [function() {}];
    const stringifiedArray = JSON.stringify(arrayWithFunction, stringifySerializerForHash);
    const expectedString = '["function () {}"]';

    t.is(stringifiedArray, expectedString);
});