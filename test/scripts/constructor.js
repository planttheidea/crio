

import expect from 'expect';

import crio from '../../src/index';
import CrioCollection from '../../src/CrioCollection';
import CrioList from '../../src/CrioList';
import CrioMap from '../../src/CrioMap';

import {
    createTestArray,
    createTestObject,
    getValidLoopSize
} from './testFunctions';

let success = 0,
    testedObj = {},
    constructorAspetsToTest = [
        'constructor',
        'size',
        'assignment',
        'frozen',
        'hash'
    ];

constructorAspetsToTest.forEach((aspect) => {
    testedObj[aspect] = false;
});

/*
    Create the functions used in the test
 */
const testConstructors = () => {
    expect(crio()).toBeA(CrioCollection);
    success++;

    expect(crio([])).toBeA(CrioList);
    success++;

    expect(crio({})).toBeA(CrioMap);
    success++;
    
    testedObj.constructor = true;
};

const testSize = (loop) => {
    expect(crio([]).size).toEqual(0);
    success++;

    expect(crio({}).size).toEqual(0);
    success++;

    expect(crio(createTestArray(loop)).size).toEqual(loop);
    success++;

    expect(crio(createTestObject(loop)).size).toEqual(loop);
    success++;

    testedObj.size = true;
};

const testAssignment = (loop, array, object) => {
    expect(crio(createTestArray(loop)).object).toEqual(array);
    success++;

    expect(crio(createTestObject(loop)).object).toEqual(object);
    success++;

    testedObj.assignment = true;
};

const testFrozen = (loop) => {
    expect(Object.isFrozen(crio(createTestArray(loop)).object)).toEqual(true);
    success++;

    expect(Object.isFrozen(crio(createTestObject(loop)).object)).toEqual(true);
    success++;

    testedObj.frozen = true;
};

const testHash = (loop, arrayHash, mapHash) => {
    expect(crio(createTestArray(loop)).hashCode).toEqual(arrayHash);
    success++;

    expect(crio(createTestObject(loop)).hashCode).toEqual(mapHash);
    success++;

    testedObj.hash = true;
};

/*
    Run the tests, setting variables for the loops you want to incur
*/
const TEST_LOOP_SIZE = 10;
const OBJECT_SIZE_MINIMUM = 2;
const OBJECT_SIZE = 1000;

for (let i = TEST_LOOP_SIZE; i--;) {
    const LOOP_SIZE = getValidLoopSize(OBJECT_SIZE_MINIMUM, OBJECT_SIZE);
    const TEST_ARRAY = createTestArray(LOOP_SIZE);
    const TEST_MAP = createTestObject(LOOP_SIZE);
    const TEST_ARRAY_HASH = crio(TEST_ARRAY).hashCode;
    const TEST_MAP_HASH = crio(TEST_MAP).hashCode;

    // test constructors
    testConstructors();

    // test size
    testSize(LOOP_SIZE);

    // test object assignment
    testAssignment(LOOP_SIZE, TEST_ARRAY, TEST_MAP);

    // test object is frozen
    testFrozen(LOOP_SIZE);

    // test hash is consistent
    testHash(LOOP_SIZE, TEST_ARRAY_HASH, TEST_MAP_HASH);
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