import test from 'ava';

import {
    hash,
    isArray,
    isObject,
    isUndefined,
    returnObjectOnlyIfNew,
    setNonEnumerable,
    setStandard
} from '../src/utils';

import crio from '../src';

test('if hash will consistently has string values', (t) => {
    const stringOne = 'STRING_ONE';
    const stringTwo = 'STRING_TWO';
    const stringThree = 'STRING_THREE';

    let previousHashOne = '43cdfc9a946da59bf2abd44b590c1b7656c571e7',
        previousHashTwo = 'fe9cc8a3822290b8377a3a1d221a3473b5dc3759',
        previousHashThree = '804aa9d7b29e72565e281fd82722759399845aee';

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

test('if returnObjectOnlyIfNew returns original crio when the values are the same', (t) => {
    const originalCrioObject = crio({foo: 'bar'});
    const otherCrioObject = crio({foo: 'bar'});
    const newCrioObject = returnObjectOnlyIfNew(originalCrioObject, otherCrioObject);

    t.is(originalCrioObject, newCrioObject);
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
