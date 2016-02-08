import expect from 'expect';

import crio from '../../src/index';
import CRIO_IDENTIFIER from '../../src/crioIdentifier';

import {
  crioConstants
} from './testConstants';

import {
  createTestArray,
  //createTestObject,
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

let immutableMethods = Object.getOwnPropertyNames(crio([])),
    success = 0,
    testedObj = {},
    methodsToTest;

methodsToTest = immutableMethods.slice();

delete methodsToTest[CRIO_IDENTIFIER];

methodsToTest.forEach((method) => {
  if (method !== CRIO_IDENTIFIER) {
    testedObj[method] = false;
  }
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
const testCopyWithin = () => {
  const crioArray = crio([1, 2, 3, 4, 5]);
  const zeroThree = [4, 5, 3, 4, 5];
  const zeroThreeFour = [4, 2, 3, 4, 5];
  const zeroMinusTwoMinusOne = [4, 2, 3, 4, 5];

  expect(crioArray.copyWithin(0, 3)).toEqual(zeroThree);
  success++;

  expect(crioArray.copyWithin(0, 3, 4)).toEqual(zeroThreeFour);
  success++;

  expect(crioArray.copyWithin(0, -2, -1)).toEqual(zeroMinusTwoMinusOne);
  success++;

  testedObj.copyWithin = true;
};

const testDelete = (crioArray, size) => {
  const random = Math.floor(size * Math.random());
  const testArray = createTestArray(size);

  testArray.splice(random, 1);

  expect(crioArray.delete(random)).toEqual(testArray);
  success++;

  testedObj.delete = true;
};

const testDeleteIn = () => {
  const crioArray = crio([{foo: 'bar'}, {bar: 'foo'}]);
  const testArray = [{}, {bar: 'foo'}];

  expect(crioArray.deleteIn([0, 'foo']).thaw()).toEqual(testArray);
  success++;

  testedObj.deleteIn = true;
};

const testEquals = (crioArray, object) => {
  expect(crioArray.equals(crio(object))).toEqual(true);
  success++;

  expect(crioArray.equals(crio([]))).toEqual(false);
  success++;

  testedObj.equals = true;
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

  expect(crioArray.filter(filterFunction)).toEqual(filteredArray);
  success++;

  expect(crioArray.filter(filterFunction)).toEqual(crio(filteredArray));
  success++;

  expect(crioArray.filter(filterFunction).length).toEqual(filteredArray.length);
  success++;

  testedObj.filter = true;
};

const testForEach = (crioArray, array) => {
  let crioResult = [],
      plainResult = [];

  const forEachCrioFunction = (value, index) => crioResult[index] = value;
  const forEachNativeFunction = (value, index) => plainResult[index] = value;

  crioArray.forEach(forEachCrioFunction);
  array.forEach(forEachNativeFunction);

  expect(crioResult).toEqual(plainResult);
  success++;

  testedObj.forEach = true;
};

const testGet = (crioArray, size) => {
  const match = Math.ceil(size / 2);

  expect(crioArray.get(match)).toEqual(match);
  success++;

  testedObj.get = true;
};

const testGetIn = () => {
  const deeplyNested = [
    {foo: 'bar'}
  ];

  expect(crio(deeplyNested).getIn([0, 'foo'])).toEqual('bar');
  success++;

  testedObj.getIn = true;
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

const testLength = (crioArray, array) => {
  expect(crioArray.length).toEqual(array.length);
  success++;

  testedObj.length = true;
};

const testLog = (crioArray, array) => {
  expect(crioArray.log()).toEqual(array);
  success++;

  testedObj.log = true;
};

const testMap = (crioArray, array) => {
  const mapFunction = (value) => value * 2;
  const mappedArray = array.map(mapFunction);

  expect(crioArray.map(mapFunction)).toEqual(mappedArray);
  success++;

  expect(crioArray.map(mapFunction)).toEqual(crio(mappedArray));
  success++;

  testedObj.map = true;
};

const testMerge = () => {
  const crioArray = crio([1, 2, 3, 4, 5]);
  const testArray = [4, 5, 6];

  expect(crioArray.merge(testArray)).toEqual([4, 5, 6, 4, 5]);
  success++;

  testedObj.merge = true;
};

const testMergeIn = () => {
  const crioArray = crio([{foo: 'bar', deep: {nested: 'object'}}, [1, 2, 3]]);

  expect(crioArray.mergeIn([0, 'deep'], {test: 'new', nested: 'overwrite'}).thaw())
    .toEqual([{foo: 'bar', deep: {nested: 'overwrite', test: 'new'}}, [1, 2, 3]]);
  success++;

  testedObj.mergeIn = true;
};

const testMutate = (crioArray) => {
  const mutateFunction = () => true;

  expect(crioArray.mutate(mutateFunction)).toEqual(true);
  success++;

  testedObj.mutate = true;
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

  expect(crioArray.reduce(reduceConcatFunction, crio([]))).toEqual(reducedConcatArray);
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

  expect(crioArray.reduceRight(reduceConcatFunction, crio.array())).toEqual(reducedConcatArray);
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

const testSet = () => {
  const crioArray = crio([1, 2, 3, 4, 5]);
  const testArray = [1, 2, 'set', 4, 5];

  expect(crioArray.set(2, 'set')).toEqual(testArray);
  success++;

  testedObj.set = true;
};

const testSetIn = () => {
  const crioArray = crio([1, 2, [1, 2, 3, 4, 5], 4, 5]);
  const testArray = [1, 2, [1, 2, 'set', 4, 5], 4, 5];

  expect(crioArray.setIn([2, 2], 'set')).toEqual(testArray);
  success++;

  testedObj.setIn = true;
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

  expect(testCrio.splice(1, 1)).toEqual(testSplicedOneItemArray);
  success++;

  expect(testCrio.splice(1, 1)).toEqual(crio(testSplicedOneItemArray));
  success++;

  expect(testCrio.splice(1, 4)).toEqual(testSplicedFourItemsArray);
  success++;

  expect(testCrio.splice(1, 4)).toEqual(crio(testSplicedFourItemsArray));
  success++;

  testedObj.splice = true;
};

const testThaw = (array) => {
  expect(crio(array).thaw()).toEqual(array);
  success++;

  testedObj.thaw = true;
};

const testToLocaleString = (crioArray, array) => {
  expect(crioArray.toLocaleString()).toEqual(array.toLocaleString());
  success++;

  testedObj.toLocaleString = true;
};

const testToString = (crioArray, array) => {
  expect(crioArray.toString()).toEqual(array.toString());
  success++;

  testedObj.toString = true;
};

const testUnshift = (crioArray, size) => {
  const testArrayFoo = createTestArray(size);
  const testArrayFooBar = createTestArray(size);
  const foo = 'foo';
  const bar = 'bar';

  testArrayFoo.unshift(foo);

  expect(crioArray.unshift(foo)).toEqual(testArrayFoo);
  success++;

  expect(crioArray.unshift(foo)).toEqual(crio(testArrayFoo));
  success++;

  testArrayFooBar.unshift(foo, bar);

  expect(crioArray.unshift(foo, bar)).toEqual(testArrayFooBar);
  success++;

  expect(crioArray.unshift(foo, bar)).toEqual(crio(testArrayFooBar));
  success++;

  testedObj.unshift = true;
};

/*
 Run the tests, setting variables for the loops you want to incur
 */
const TEST_LOOP_SIZE = 10;
const OBJECT_SIZE_MINIMUM = 6;
const OBJECT_SIZE = 500;

// run the tests in a loop
for (let i = TEST_LOOP_SIZE; i--;) {
  const LOOP_SIZE = getValidLoopSize(OBJECT_SIZE_MINIMUM, OBJECT_SIZE);
  const TEST_ARRAY = createTestArray(LOOP_SIZE);
  const TEST_CRIO_ARRAY = crio(TEST_ARRAY);

  console.group('Array ' + LOOP_SIZE);

  console.time('constructor');
  testConstructor();
  console.timeEnd('constructor');

  console.time('concat');
  testConcat(TEST_CRIO_ARRAY, TEST_ARRAY, LOOP_SIZE);
  console.timeEnd('concat');

  console.time('copyWithin');
  testCopyWithin();
  console.timeEnd('copyWithin');

  console.time('delete');
  testDelete(TEST_CRIO_ARRAY, LOOP_SIZE);
  console.timeEnd('delete');

  console.time('deleteIn');
  testDeleteIn();
  console.timeEnd('deleteIn');

  console.time('equals');
  testEquals(TEST_CRIO_ARRAY, TEST_ARRAY);
  console.timeEnd('equals');

  console.time('fill');
  testFill(TEST_CRIO_ARRAY, LOOP_SIZE);
  console.timeEnd('fill');

  console.time('filter');
  testFilter(TEST_CRIO_ARRAY, TEST_ARRAY);
  console.timeEnd('filter');

  console.time('forEach');
  testForEach(TEST_CRIO_ARRAY, TEST_ARRAY);
  console.timeEnd('forEach');

  console.time('get');
  testGet(TEST_CRIO_ARRAY, LOOP_SIZE);
  console.timeEnd('get');

  console.time('getIn');
  testGetIn(TEST_CRIO_ARRAY, LOOP_SIZE);
  console.timeEnd('getIn');

  console.time('indexOf');
  testIndexOf(TEST_CRIO_ARRAY, TEST_ARRAY, LOOP_SIZE);
  console.timeEnd('indexOf');

  console.time('join');
  testJoin(TEST_CRIO_ARRAY, LOOP_SIZE);
  console.timeEnd('join');

  console.time('lastIndexOf');
  testLastIndexOf(TEST_CRIO_ARRAY);
  console.timeEnd('lastIndexOf');

  console.time('length');
  testLength(TEST_CRIO_ARRAY, TEST_ARRAY);
  console.timeEnd('length');

  console.time('log');
  testLog(TEST_CRIO_ARRAY, TEST_ARRAY);
  console.timeEnd('log');

  console.time('map');
  testMap(TEST_CRIO_ARRAY, TEST_ARRAY);
  console.timeEnd('map');

  console.time('merge');
  testMerge();
  console.timeEnd('merge');

  console.time('mergeIn');
  testMergeIn();
  console.timeEnd('mergeIn');

  console.time('mutate');
  testMutate(TEST_CRIO_ARRAY);
  console.timeEnd('mutate');

  console.time('pop');
  testPop(TEST_CRIO_ARRAY, LOOP_SIZE);
  console.timeEnd('pop');

  console.time('push');
  testPush(TEST_CRIO_ARRAY, LOOP_SIZE);
  console.timeEnd('push');

  console.time('reduce');
  testReduce(TEST_CRIO_ARRAY, TEST_ARRAY);
  console.timeEnd('reduce');

  console.time('reduceRight');
  testReduceRight(TEST_CRIO_ARRAY, TEST_ARRAY);
  console.timeEnd('reduceRight');

  console.time('reverse');
  testReverse(TEST_CRIO_ARRAY, LOOP_SIZE);
  console.timeEnd('reverse');

  console.time('set');
  testSet();
  console.timeEnd('set');

  console.time('setIn');
  testSetIn();
  console.timeEnd('setIn');

  console.time('shift');
  testShift(TEST_CRIO_ARRAY, LOOP_SIZE);
  console.timeEnd('shift');

  console.time('slice');
  testSlice(TEST_CRIO_ARRAY, LOOP_SIZE);
  console.timeEnd('slice');

  console.time('sort');
  testSort(TEST_CRIO_ARRAY);
  console.timeEnd('sort');

  console.time('splice');
  testSplice(LOOP_SIZE);
  console.timeEnd('splice');

  console.time('thaw');
  testThaw(TEST_CRIO_ARRAY);
  console.timeEnd('thaw');

  console.time('toLocaleString');
  testToLocaleString(TEST_CRIO_ARRAY, TEST_ARRAY);
  console.timeEnd('toLocaleString');

  console.time('toString');
  testToString(TEST_CRIO_ARRAY, TEST_ARRAY);
  console.timeEnd('toString');

  console.time('unshift');
  testUnshift(TEST_CRIO_ARRAY, LOOP_SIZE);
  console.timeEnd('unshift');

  console.groupEnd();
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