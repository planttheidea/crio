

import expect from 'expect';
import _ from 'lodash';

import crio from '../../src/index';
import crioObjectPrototype from '../../src/crio/crioObjectPrototype';
import crioHelperMethods from '../../src/crio/crioHelperMethods';

import {
    crioConstants
} from './testConstants';

import {
    createTestObject,
    getValidLoopSize
} from './testFunctions';

const MUTABLE_METHODS = [];

let immutableMethods = Object.getOwnPropertyNames(crioObjectPrototype),
    success = 0,
    testedObj = {},
    methodsToTest;

if (immutableMethods.indexOf('$$crio') !== -1) {
    immutableMethods.splice(immutableMethods.indexOf('$$crio'), 1);
}

methodsToTest = immutableMethods.slice();

methodsToTest.forEach((method) => {
    testedObj[method] = false;
});

// get rid of methods added to class
crioConstants.forEach((method) => {
    immutableMethods.splice(immutableMethods.indexOf(method), 1);
});

// get rid of the mutable methods that we modified
MUTABLE_METHODS.forEach((method) => {
    immutableMethods.splice(immutableMethods.indexOf(method), 1);
});

/*
 Create the functions used in the tests
 */
const testConstructor = () => {
    expect(crio()).toBeA(Object);
    success++;

    expect(crio.object()).toBeA(Object);
    success++;

    expect(crio({})).toBeA(Object);
    success++;

    expect(crio.object({})).toBeA(Object);
    success++;

    testedObj.constructor = true;
};

const testDefaultImmutableMethod = (object, method) => {
    if (object[method]) {
        if (method === 'toString' || method === 'toLocaleString') {
            expect(_.isEqual(crio(object)[method](), crioHelperMethods.toString.call(object))).toEqual(true);
        } else {
            expect(_.isEqual(crio(object)[method](), object[method]())).toEqual(true);
        }
        success++;
    }

    testedObj[method] = true;
};

const testEquals = (crioObject, object) => {
    expect(crioObject.equals(crio(object))).toEqual(true);
    success++;

    expect(crioObject.equals(crio({}))).toEqual(false);
    success++;

    testedObj.equals = true;
};

const testFreeze = (object) => {
    const thawedObject = object.thaw();

    expect(thawedObject.freeze().isFrozen()).toEqual(true);
    success++;

    expect(object.freeze().isFrozen()).toEqual(true);
    success++;

    testedObj.freeze = true;
};

const testIsFrozen = (object) => {
    const thawedObject = object.thaw();

    expect(thawedObject.isFrozen()).toEqual(false);
    success++;

    expect(object.isFrozen()).toEqual(true);
    success++;

    testedObj.isFrozen = true;
};

const testThaw = (object) => {
    expect(_.isEqual(crio(object).thaw(), object)).toEqual(true);
    success++;

    testedObj.thaw = true;
};

const testToJs = (crioObject, object) => {
    expect(crioObject.toJS()).toEqual(object);
    success++;

    expect(crioObject.toJS()).toBeA(Object);
    success++;

    testedObj.toJS = true;
};

/*
 Run the tests, setting variables for the loops you want to incur
 */
const TEST_LOOP_SIZE = 10;
const OBJECT_SIZE_MINIMUM = 6;
const OBJECT_SIZE = 1000;

// run the tests in a loop
for (let i = TEST_LOOP_SIZE; i--;) {
    const LOOP_SIZE = getValidLoopSize(OBJECT_SIZE_MINIMUM, OBJECT_SIZE);
    const TEST_OBJECT = createTestObject(LOOP_SIZE);
    const TEST_CRIO_OBJECT = crio(TEST_OBJECT);

    // test constructor
    testConstructor();

    // test all normally immutable Date methods
    for (let j = immutableMethods.length; j--;) {
        testDefaultImmutableMethod(TEST_OBJECT, immutableMethods[j]);
    }

    // test .equals()
    testEquals(TEST_CRIO_OBJECT, TEST_OBJECT);

    // test .freeze()
    testFreeze(TEST_CRIO_OBJECT);

    // test .isFrozen()
    testIsFrozen(TEST_CRIO_OBJECT);

    // test .toJS()
    testToJs(TEST_CRIO_OBJECT, TEST_OBJECT);

    // test .thaw()
    testThaw(TEST_CRIO_OBJECT);
}

let untestedMethods = [];

for (let method in testedObj) {
    if (!testedObj[method]) {
        untestedMethods.push(method);
    }
}

export default {
    success,
    untestedMethods
};