import expect from 'expect';

import crio from '../../src/index';
import CRIO_IDENTIFIER from '../../src/crioIdentifier';

import {
  createTestObject,
  getValidLoopSize
} from './testFunctions';

const MUTABLE_METHODS = [];

let immutableMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(crio({}))),
    success = 0,
    testedObj = {},
    methodsToTest;

methodsToTest = immutableMethods.slice();

methodsToTest.forEach((method) => {
  if (method !== CRIO_IDENTIFIER) {
    testedObj[method] = false;
  }
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

const testDelete = (crioObject, size) => {
  const testObject = createTestObject(size);

  delete testObject[0];

  expect(crioObject.delete(0).thaw()).toEqual(testObject);
  success++;

  testedObj.delete = true;
};

const testDeleteIn = () => {
  const crioObject = crio({deep: {nested: 'value', thatHas: 'sibling'}});
  const testObject = {deep: {nested: 'value'}};

  expect(crioObject.deleteIn(['deep', 'thatHas']).thaw()).toEqual(testObject);
  success++;

  testedObj.deleteIn = true;
};

const testEquals = (crioObject, object) => {
  expect(crioObject.equals(crio(object))).toEqual(true);
  success++;

  expect(crioObject.equals(crio({}))).toEqual(false);
  success++;

  testedObj.equals = true;
};

const testForEach = (crioObject, size) => {
  const testObject = createTestObject(size);

  let newObject = {};

  crioObject.forEach((item, key) => {
    newObject[key] = item;
  });

  expect(newObject).toEqual(testObject);
  success++;

  testedObj.forEach = true;
};

const testFilter = (crioObject, size) => {
  const testObject = createTestObject(size);
  const halfWay = Math.ceil(size / 2);

  expect(crioObject.filter((item) => item > halfWay).thaw()).toEqual((() => {
    let object = {};

    for (let key in testObject) {
      if (testObject[key] > halfWay) {
        object[key] = testObject[key];
      }
    }

    return object;
  })());
  success++;

  testedObj.filter = true;
};

const testGet = (crioObject, object, size) => {
  const halfway = Math.ceil(size / 2);

  expect(crioObject.get(halfway)).toEqual(object[halfway]);
  success++;

  expect(crioObject[halfway]).toEqual(object[halfway]);
  success++;

  testedObj.get = true;
};

const testGetIn = () => {
  const testObject = {deep: {nested: {object: 'value'}}};
  const crioObject = crio(testObject);

  expect(crioObject.getIn(['deep', 'nested', 'object'])).toEqual(testObject.deep.nested.object);
  success++;

  testedObj.getIn = true;
};

const testLog = (crioObject, object) => {
  expect(crioObject.log().thaw()).toEqual(object);
  success++;

  testedObj.log = true;
};

const testMap = (crioObject, size) => {
  const testObject = createTestObject(size);

  expect(crioObject.map(() => 'test').thaw()).toEqual((() => {
    let object = {};

    for (let key in testObject) {
      object[key] = 'test';
    }

    return object;
  })());
  success++;

  testedObj.map = true;
};

const testMerge = () => {
  const crioObject = crio({foo: 'bar'});
  const testObjectNew = {foo: 'bar', test: 'new'};
  const testObjectOverwrite = {foo: 'test'};

  expect(crioObject.merge({test: 'new'}).thaw()).toEqual(testObjectNew);
  success++;

  expect(crioObject.merge({foo: 'test'}).thaw()).toEqual(testObjectOverwrite);
  success++;

  testedObj.merge = true;
};

const testMergeIn = () => {
  const crioObject = crio({deeply: {nested: {object: 'value'}}});
  const testObjectNew = {deeply: {nested: {object: 'value', something: 'else'}}};
  const testObjectOverwrite = {deeply: {nested: {object: 'test'}}};

  expect(crioObject.mergeIn(['deeply', 'nested'], {something: 'else'}).thaw()).toEqual(testObjectNew);
  success++;

  expect(crioObject.mergeIn(['deeply', 'nested'], {object: 'test'}).thaw()).toEqual(testObjectOverwrite);
  success++;

  testedObj.mergeIn = true;
};

const testMutate = (crioObject) => {
  const mutateFunction = () => true;

  expect(crioObject.mutate(mutateFunction)).toEqual(true);
  success++;

  testedObj.mutate = true;
};

const testSet = () => {
  const crioObject = crio({some: 'object'});
  const testObject = {some: 'test'};

  expect(crioObject.set('some', 'test').thaw()).toEqual(testObject);
  success++;

  testedObj.set = true;
};

const testSetIn = () => {
  const crioObject = crio({some: {deeply: {nested: 'object'}}});
  const testObjectNew = {some: {deeply: {nested: 'object', thatHas: 'siblings'}}};
  const testObjectOverwrite = {some: {deeply: {nested: 'test'}}};

  expect(crioObject.setIn(['some', 'deeply', 'thatHas'], 'siblings').thaw()).toEqual(testObjectNew);
  success++;

  expect(crioObject.setIn(['some', 'deeply', 'nested'], 'test').thaw()).toEqual(testObjectOverwrite);
  success++;

  testedObj.setIn = true;
};

const testThaw = (crioObject, object) => {
  expect(crioObject.thaw()).toEqual(object);
  success++;

  testedObj.thaw = true;
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
  const TEST_OBJECT = createTestObject(LOOP_SIZE);
  const TEST_CRIO_OBJECT = crio(TEST_OBJECT);

  console.group('Object ' + LOOP_SIZE);

  console.time('constructor');
  testConstructor();
  console.timeEnd('constructor');

  console.time('delete');
  testDelete(TEST_CRIO_OBJECT, LOOP_SIZE);
  console.timeEnd('delete');

  console.time('deleteIn');
  testDeleteIn();
  console.timeEnd('deleteIn');

  console.time('equals');
  testEquals(TEST_CRIO_OBJECT, TEST_OBJECT);
  console.timeEnd('equals');

  console.time('forEach');
  testForEach(TEST_CRIO_OBJECT, LOOP_SIZE);
  console.timeEnd('forEach');

  console.time('filter');
  testFilter(TEST_CRIO_OBJECT, LOOP_SIZE);
  console.timeEnd('filter');

  console.time('get');
  testGet(TEST_CRIO_OBJECT, TEST_OBJECT, LOOP_SIZE);
  console.timeEnd('get');

  console.time('getIn');
  testGetIn();
  console.timeEnd('getIn');

  console.time('log');
  testLog(TEST_CRIO_OBJECT, TEST_OBJECT);
  console.timeEnd('log');

  console.time('map');
  testMap(TEST_CRIO_OBJECT, LOOP_SIZE);
  console.timeEnd('map');

  console.time('merge');
  testMerge();
  console.timeEnd('merge');

  console.time('mergeIn');
  testMergeIn();
  console.timeEnd('mergeIn');

  console.time('mutate');
  testMutate(TEST_CRIO_OBJECT);
  console.timeEnd('mutate');

  console.time('set');
  testSet();
  console.timeEnd('set');

  console.time('setIn');
  testSetIn();
  console.timeEnd('setIn');

  console.time('thaw');
  testThaw(TEST_CRIO_OBJECT, TEST_OBJECT);
  console.timeEnd('thaw');

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