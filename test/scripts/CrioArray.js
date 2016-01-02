

import expect from 'expect';
import _ from 'lodash';

import crio from '../../src/index';
import crioArrayprototype from '../../src/crio/crioArrayPrototype';

import {
    crioConstants
} from './testConstants';

import {
    createTestArray,
    getValidLoopSize
} from './testFunctions';

const MUTABLE_METHODS = [
    'fill',
    'pop',
    'push',
    'reverse',
    'shift',
    'sort',
    'splice',
    'unshift'
];

let immutableMethods = Object.getOwnPropertyNames(crioArrayprototype),
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
    expect(crio([])).toBeA(Array);
    success++;

    expect(crio.array([])).toBeA(Array);
    success++;

    testedObj.constructor = true;
};

const testConcat = (crioArray, array, size) => {
    const halfway = Math.ceil(size / 2);
    const newSize = size + halfway;
    const testArray = createTestArray(halfway);

    expect(crioArray.concat(testArray)).toEqual(array.concat(testArray));
    success++;

    expect(crioArray.concat(testArray).length).toEqual(newSize);
    success++;

    testedObj.concat = true;
};

const testEvery = (crioArray, size) => {
    const halfway = Math.ceil(size / 2);
    const trueFunction = (value, index) => value === index;
    const falseFunction = (value) => value < halfway;

    expect(crioArray.every(trueFunction)).toEqual(true);
    success++;

    expect(crioArray.every(falseFunction)).toEqual(false);
    success++;

    testedObj.every = true;
};

const testFill = (crioArray, loopSize) => {
    const fillString = 'a';
    const testArray = createTestArray(loopSize, 0, fillString);

    expect(crioArray.fill(fillString)).toEqual(testArray);
    success++;

    expect(crioArray.fill(fillString)).toEqual(crio(testArray));
    success++;

    testedObj.fill = true;
};

const testFilter = (crioArray, array) => {
    const filterFunction = (value) => value % 2 === 0;
    const filteredArray = array.filter(filterFunction);

    expect(_.isEqual(crioArray.filter(filterFunction), filteredArray)).toEqual(true);
    success++;

    expect(crioArray.filter(filterFunction)).toEqual(crio(filteredArray));
    success++;

    expect(crioArray.filter(filterFunction).length).toEqual(filteredArray.length);
    success++;

    testedObj.filter = true;
};

const testFind = (crioArray, array, size) => {
    const match = Math.ceil(size / 2);
    const noMatch = size + 1;
    const findOnlyFunction = (value) => value === match;
    const findFirstFunction = (value) => value > match;
    const findNoneFunction = (value) => value === noMatch;

    expect(crioArray.find(findOnlyFunction)).toEqual(array[match]);
    success++;

    expect(crioArray.find(findFirstFunction)).toEqual(array[match + 1]);
    success++;

    expect(crioArray.find(findNoneFunction)).toEqual(undefined);
    success++;

    testedObj.find = true;
};

const testFindIndex = (crioArray, array, size) => {
    const match = Math.ceil(size / 2);
    const noMatch = size + 1;
    const findOnlyFunction = (value) => value === match;
    const findFirstFunction = (value) => value > match;
    const findNoneFunction = (value) => value === noMatch;

    expect(crioArray.findIndex(findOnlyFunction)).toEqual(match);
    success++;

    expect(crioArray.findIndex(findFirstFunction)).toEqual(match + 1);
    success++;

    expect(crioArray.findIndex(findNoneFunction)).toEqual(-1);
    success++;

    testedObj.findIndex = true;
};

const testIncludes = (crioArray, loopSize) => {
    const includesIndex = Math.ceil(loopSize / 2);
    const doesNotIncludeIndex = loopSize + 1;

    expect(crioArray.includes(includesIndex)).toEqual(true);
    success++;

    expect(crioArray.includes(doesNotIncludeIndex)).toEqual(false);
    success++;

    testedObj.includes = true;
};

const testIndexOf = (crioArray, array, size) => {
    const testArray = createTestArray(size);
    const checker = Math.ceil(size / 2);

    expect(crioArray.indexOf(checker)).toEqual(array[checker]);
    success++;

    expect(crioArray.indexOf(checker)).toEqual(testArray[checker]);
    success++;

    testedObj.indexOf = true;
};

const testJoin = (crioArray, size) => {
    const testArrayJoin = createTestArray(size).join();
    const testArrayJoin2 = createTestArray(size).join('|');

    expect(crioArray.join()).toEqual(testArrayJoin);
    success++;

    expect(crioArray.join('|')).toEqual(testArrayJoin2);
    success++;

    testedObj.join = true;
};

const testLastIndexOf = () => {
    const testArray = [1,2,1,2,1];
    const testCrio = crio(testArray);

    expect(testCrio.lastIndexOf(1)).toEqual(4);
    success++;

    expect(testCrio.lastIndexOf(2)).toEqual(3);
    success++;

    testedObj.lastIndexOf = true;
};

const testPop = (crioArray, size) => {
    const testArray = createTestArray(size);
    const listMinusLast3 = crioArray.pop().pop().pop();

    testArray.pop();

    expect(crioArray.pop()).toEqual(testArray);
    success++;

    testArray.pop();
    testArray.pop();

    expect(listMinusLast3).toEqual(testArray);
    success++;

    testedObj.pop = true;
};

const testPush = (crioArray, size) => {
    const pushValue = 'test';
    const testArray = createTestArray(size);
    const listPlus3 = crioArray.push(pushValue, pushValue, pushValue);

    testArray.push(pushValue);

    expect(crioArray.push(pushValue)).toEqual(testArray);
    success++;

    testArray.push(pushValue, pushValue);

    expect(listPlus3).toEqual(testArray);
    success++;

    testedObj.push = true;
};

const testReduce = (crioArray, array) => {
    const reduceAddFunction = (previousValue, currentValue) => previousValue += currentValue;
    const reduceConcatFunction = (previousValue, currentValue) => previousValue.concat([currentValue]);
    const reducedAddArray = array.reduce(reduceAddFunction);
    const reducedConcatArray = array.reduce(reduceConcatFunction, []);

    expect(crioArray.reduce(reduceAddFunction)).toEqual(reducedAddArray);
    success++;

    expect(crioArray.reduce(reduceConcatFunction, [])).toEqual(reducedConcatArray);
    success++;

    expect(crioArray.reduce(reduceConcatFunction, [])).toEqual(crio(reducedConcatArray));
    success++;

    testedObj.reduce = true;
};

const testReduceRight = (crioArray, array) => {
    const reduceAddFunction = (previousValue, currentValue) => previousValue += currentValue;
    const reduceConcatFunction = (previousValue, currentValue) => previousValue.concat([currentValue]);
    const reducedAddArray = array.reduceRight(reduceAddFunction);
    const reducedConcatArray = array.reduceRight(reduceConcatFunction, []);

    expect(crioArray.reduceRight(reduceAddFunction)).toEqual(reducedAddArray);
    success++;

    expect(crioArray.reduceRight(reduceConcatFunction, [])).toEqual(reducedConcatArray);
    success++;

    expect(crioArray.reduceRight(reduceConcatFunction, [])).toEqual(crio(reducedConcatArray));
    success++;

    testedObj.reduceRight = true;
};

const testReverse = (crioArray, size) => {
    const testArray = createTestArray(size);

    testArray.reverse();

    expect(crioArray.reverse()).toEqual(testArray);
    success++;

    expect(crioArray.reverse()).toEqual(crio(testArray));
    success++;

    testedObj.reverse = true;
};

const testShift = (crioArray, size) => {
    const testArray = createTestArray(size);
    const listMinusFirst3 = crioArray.shift().shift().shift();

    testArray.shift();

    expect(crioArray.shift()).toEqual(testArray);
    success++;

    testArray.shift();
    testArray.shift();

    expect(listMinusFirst3).toEqual(testArray);
    success++;

    testedObj.shift = true;
};

const testSlice = (crioArray, size) => {
    const begin = 2;
    const end = 4;
    const testArrayBegin = createTestArray(size).slice(begin);
    const testArrayBeginEnd = createTestArray(size).slice(begin, end);

    expect(crioArray.slice()).toEqual(crioArray);
    success++;

    expect(crioArray.slice(begin)).toEqual(testArrayBegin);
    success++;

    expect(crioArray.slice(begin)).toEqual(crio(testArrayBegin));
    success++;

    expect(crioArray.slice(begin, end)).toEqual(testArrayBeginEnd);
    success++;

    expect(crioArray.slice(begin, end)).toEqual(crio(testArrayBeginEnd));
    success++;

    testedObj.slice = true;
};

const testSome = (crioArray, size) => {
    const halfway = Math.ceil(size / 2);
    const trueFunction = (value) => value > halfway;
    const falseFunction = (value) => value === size + 1;

    expect(crioArray.some(trueFunction)).toEqual(true);
    success++;

    expect(crioArray.some(falseFunction)).toEqual(false);
    success++;

    testedObj.some = true;
};

const testSort = () => {
    const unsortedArray = [5,2,4,1,3];
    const sortedArrayAsc = [1,2,3,4,5];
    const sortedArrayDesc = [5,4,3,2,1];
    const sortFunction = (previousValue, currentValue) => {
        if (previousValue > currentValue) {
            return -1;
        }

        if (previousValue < currentValue) {
            return 1;
        }

        return 0;
    };

    expect(crio(unsortedArray).sort()).toEqual(sortedArrayAsc);
    success++;

    expect(crio(unsortedArray).sort()).toEqual(crio(sortedArrayAsc));
    success++;

    expect(crio(unsortedArray).sort(sortFunction)).toEqual(sortedArrayDesc);
    success++;

    expect(crio(unsortedArray).sort(sortFunction)).toEqual(crio(sortedArrayDesc));
    success++;

    testedObj.sort = true;
};

const testSplice = (size) => {
    const spliceIndex = 1;
    const spliceSize = 4;

    const testArray = createTestArray(size);
    const testSplicedOneItemArray = createTestArray(size);
    const testSplicedFourItemsArray = createTestArray(size);
    const testCrio = crio(testArray);

    testSplicedOneItemArray.splice(spliceIndex, 1);
    testSplicedFourItemsArray.splice(spliceIndex, spliceSize);

    expect(_.isEqual(testCrio.splice(1, 1), testSplicedOneItemArray)).toEqual(true);
    success++;

    expect(_.isEqual(testCrio.splice(1, 1), crio(testSplicedOneItemArray))).toEqual(true);
    success++;

    expect(_.isEqual(testCrio.splice(1, 4), testSplicedFourItemsArray)).toEqual(true);
    success++;

    expect(_.isEqual(testCrio.splice(1, 4), crio(testSplicedFourItemsArray))).toEqual(true);
    success++;

    testedObj.splice = true;
};

const testUnshift = (crioArray, size) => {
    const testArrayFoo = createTestArray(size);
    const testArrayFooBar = createTestArray(size);
    const foo = 'foo';
    const bar = 'bar';

    testArrayFoo.unshift(foo);

    expect(_.isEqual(crioArray.unshift(foo), testArrayFoo)).toEqual(true);
    success++;

    expect(_.isEqual(crioArray.unshift(foo), crio(testArrayFoo))).toEqual(true);
    success++;

    testArrayFooBar.unshift(foo, bar);

    expect(_.isEqual(crioArray.unshift(foo, bar), testArrayFooBar)).toEqual(true);
    success++;

    expect(_.isEqual(crioArray.unshift(foo, bar), crio(testArrayFooBar))).toEqual(true);
    success++;

    testedObj.unshift = true;
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
    const TEST_ARRAY = createTestArray(LOOP_SIZE);
    const TEST_CRIO_LIST = crio(TEST_ARRAY);

    // test constructor
    testConstructor();

    // test .concat()
    testConcat(TEST_CRIO_LIST, TEST_ARRAY, LOOP_SIZE);

    // test .every()
    testEvery(TEST_CRIO_LIST, LOOP_SIZE);

    // test .fill()
    testFill(TEST_CRIO_LIST, LOOP_SIZE);

    // test .filter()
    testFilter(TEST_CRIO_LIST, TEST_ARRAY);

    // test .find()
    testFind(TEST_CRIO_LIST, TEST_ARRAY, LOOP_SIZE);

    // test .findIndex()
    testFindIndex(TEST_CRIO_LIST, TEST_ARRAY, LOOP_SIZE);

    // test .includes()
    testIncludes(TEST_CRIO_LIST, LOOP_SIZE);

    // test .indexOf()
    testIndexOf(TEST_CRIO_LIST, TEST_ARRAY, LOOP_SIZE);

    // test .join()
    testJoin(TEST_CRIO_LIST, LOOP_SIZE);

    // test .lastIndexOf()
    testLastIndexOf(TEST_CRIO_LIST);

    // test .pop()
    testPop(TEST_CRIO_LIST, LOOP_SIZE);

    // test .push()
    testPush(TEST_CRIO_LIST, LOOP_SIZE);

    // test .reduce()
    testReduce(TEST_CRIO_LIST, TEST_ARRAY);

    // test .reduceRight()
    testReduceRight(TEST_CRIO_LIST, TEST_ARRAY);

    // test .reverse()
    testReverse(TEST_CRIO_LIST, LOOP_SIZE);

    // test .shift()
    testShift(TEST_CRIO_LIST, LOOP_SIZE);

    // test .slice()
    testSlice(TEST_CRIO_LIST, LOOP_SIZE);

    // test .some()
    testSome(TEST_CRIO_LIST, LOOP_SIZE);

    // test .sort()
    testSort(TEST_CRIO_LIST);

    // test .splice()
    testSplice(LOOP_SIZE);

    // test .unshift()
    testUnshift(TEST_CRIO_LIST, LOOP_SIZE);
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