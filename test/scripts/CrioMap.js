

import expect from 'expect';

import crio from '../../src/index';
import CrioCollection from '../../src/CrioCollection';
import CrioMap from '../../src/CrioMap';

import {
    createTestObject,
    getValidLoopSize
} from './testFunctions';

const METHODS_ALREADY_TESTED = Object.getOwnPropertyNames(CrioCollection.prototype);

let success = 0,
    testedObj = {},
    methodsToTest = Object.getOwnPropertyNames(CrioMap.prototype);

methodsToTest.forEach((method) => {
    if (METHODS_ALREADY_TESTED.indexOf(method) === -1) {
        testedObj[method] = false;
    }
});

/*
 Create the functions used in the tests
 */
const testConstructor = () => {
    expect(crio({})).toBeA(CrioMap);
    success++;

    expect(crio.map({})).toBeA(CrioMap);
    success++;

    testedObj.constructor = true;
};

const testDelete = (map, loopSize) => {
    const checker = Math.ceil(loopSize / 2);

    let testObject = createTestObject(loopSize);

    delete testObject[checker];

    expect(map.delete(checker).object).toEqual(testObject);
    success++;

    expect(map.delete(checker)).toEqual(crio(testObject));
    success++;

    testedObj.delete = true;
};

const testHas = (map, loopSize) => {
    const checker = Math.ceil(loopSize / 2);

    expect(map.has(checker)).toEqual(true);
    success++;

    expect(map.has('test')).toEqual(false);
    success++;

    testedObj.has = true;
};

const testToList = (map) => {
    const testList = (() => {
        let list = [];

        map.forEach((value) => {
            list.push(value);
        });

        return list;
    })();

    expect(map.toList(testList).thaw()).toEqual(testList);
    success++;

    expect(map.toList(testList)).toEqual(crio(testList));
    success++;

    testedObj.toList = true;
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
    const TEST_MAP = createTestObject(LOOP_SIZE);
    const TEST_CRIO_MAP = crio(TEST_MAP);

    // test constructor
    testConstructor();

    // test .delete()
    testDelete(TEST_CRIO_MAP, LOOP_SIZE);

    // test .has()
    testHas(TEST_CRIO_MAP, LOOP_SIZE);

    // test .toList()
    testToList(TEST_CRIO_MAP);
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