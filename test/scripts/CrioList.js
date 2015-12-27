

import expect from 'expect';

import crio from '../../src/index';
import CrioCollection from '../../src/CrioCollection';
import CrioList from '../../src/CrioList';

import {
    createTestArray,
    getValidLoopSize
} from './testFunctions';

const METHODS_ALREADY_TESTED = Object.getOwnPropertyNames(CrioCollection.prototype);

let success = 0,
    testedObj = {},
    methodsToTest = Object.getOwnPropertyNames(CrioList.prototype);

methodsToTest.forEach((method) => {
    if (METHODS_ALREADY_TESTED.indexOf(method) === -1) {
        testedObj[method] = false;
    }
});

/*
 Create the functions used in the tests
 */
const testConstructor = () => {
    expect(crio([])).toBeA(CrioList);
    success++;

    expect(crio.list([])).toBeA(CrioList);
    success++;

    testedObj.constructor = true;
};

const testConcat = (list, array, size) => {
    const halfway = Math.ceil(size / 2);
    const newSize = size + halfway;
    const testArray = createTestArray(halfway);

    expect(list.concat(testArray).object).toEqual(array.concat(testArray));
    success++;

    expect(list.concat(testArray)).toEqual(crio(array.concat(testArray)));
    success++;

    expect(list.concat(testArray).size).toEqual(newSize);
    success++;

    testedObj.concat = true;
};

const testEvery = (list, size) => {
    const halfway = Math.ceil(size / 2);
    const trueFunction = (value, index) => value === index;
    const falseFunction = (value) => value < halfway;

    expect(list.every(trueFunction)).toEqual(true);
    success++;

    expect(list.every(falseFunction)).toEqual(false);
    success++;

    testedObj.every = true;
};

const testFill = (list, loopSize) => {
    const fillString = 'a';
    const testArray = createTestArray(loopSize, 0, fillString);

    expect(list.fill(fillString).object).toEqual(testArray);
    success++;

    expect(list.fill(fillString)).toEqual(crio(testArray));
    success++;

    testedObj.fill = true;
};

const testFilter = (list, array) => {
    const filterFunction = (value) => value % 2 === 0;
    const filteredArray = array.filter(filterFunction);

    expect(list.filter(filterFunction).object).toEqual(filteredArray);
    success++;

    expect(list.filter(filterFunction)).toEqual(crio(filteredArray));
    success++;

    expect(list.filter(filterFunction).size).toEqual(filteredArray.length);
    success++;

    testedObj.filter = true;
};

const testFind = (list, array, size) => {
    const match = Math.ceil(size / 2);
    const noMatch = size + 1;
    const findOnlyFunction = (value) => value === match;
    const findFirstFunction = (value) => value > match;
    const findNoneFunction = (value) => value === noMatch;

    expect(list.find(findOnlyFunction)).toEqual(array[match]);
    success++;

    expect(list.find(findFirstFunction)).toEqual(array[match + 1]);
    success++;

    expect(list.find(findNoneFunction)).toEqual(undefined);
    success++;

    testedObj.find = true;
};

const testFindIndex = (list, array, size) => {
    const match = Math.ceil(size / 2);
    const noMatch = size + 1;
    const findOnlyFunction = (value) => value === match;
    const findFirstFunction = (value) => value > match;
    const findNoneFunction = (value) => value === noMatch;

    expect(list.findIndex(findOnlyFunction)).toEqual(match);
    success++;

    expect(list.findIndex(findFirstFunction)).toEqual(match + 1);
    success++;

    expect(list.findIndex(findNoneFunction)).toEqual(-1);
    success++;

    testedObj.findIndex = true;
};

const testFirst = (list, array) => {
    const testNestedArray = [
        {
            object:'nested'
        }
    ];

    expect(list.first()).toEqual(array[0]);
    success++;

    expect(crio(testNestedArray).first().object).toEqual(testNestedArray[0]);
    success++;

    testedObj.first = true;
};

const testIncludes = (list, loopSize) => {
    const includesIndex = Math.ceil(loopSize / 2);
    const doesNotIncludeIndex = loopSize + 1;

    expect(list.includes(includesIndex)).toEqual(true);
    success++;

    expect(list.includes(doesNotIncludeIndex)).toEqual(false);
    success++;

    testedObj.includes = true;
};

const testIndexOf = (list, array, size) => {
    const testArray = createTestArray(size);
    const checker = Math.ceil(size / 2);

    expect(list.indexOf(checker)).toEqual(array[checker]);
    success++;

    expect(list.indexOf(checker)).toEqual(testArray[checker]);
    success++;

    testedObj.indexOf = true;
};

const testJoin = (list, size) => {
    const testArrayJoin = createTestArray(size).join();
    const testArrayJoin2 = createTestArray(size).join('|');

    expect(list.join()).toEqual(testArrayJoin);
    success++;

    expect(list.join('|')).toEqual(testArrayJoin2);
    success++;

    testedObj.join = true;
};

const testLast = (list, array, length) => {
    const testNestedArray = [
        {
            object:'nested'
        }, {
            correct:'object'
        }
    ];

    expect(list.last()).toEqual(array[length - 1]);
    success++;

    expect(crio(testNestedArray).last().object).toEqual(testNestedArray[testNestedArray.length - 1]);
    success++;

    testedObj.last = true;
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

const testMap = (list, array) => {
    const mapFunction = (value) => value * 2;
    const mappedArray = array.map(mapFunction);

    expect(list.map(mapFunction).object).toEqual(mappedArray);
    success++;

    expect(list.map(mapFunction)).toEqual(crio(mappedArray));
    success++;

    expect(list.map(mapFunction).size).toEqual(mappedArray.length);
    success++;

    testedObj.map = true;
};

const testPop = (list, size) => {
    const testArray = createTestArray(size);
    const listMinusLast3 = list.pop().pop().pop();

    testArray.pop();

    expect(list.pop().object).toEqual(testArray);
    success++;

    testArray.pop();
    testArray.pop();

    expect(listMinusLast3.object).toEqual(testArray);
    success++;

    testedObj.pop = true;
};

const testPush = (list, size) => {
    const pushValue = 'test';
    const testArray = createTestArray(size);
    const listPlus3 = list.push(pushValue, pushValue, pushValue);

    testArray.push(pushValue);

    expect(list.push(pushValue).object).toEqual(testArray);
    success++;

    testArray.push(pushValue, pushValue);

    expect(listPlus3.object).toEqual(testArray);
    success++;

    testedObj.push = true;
};

const testReduce = (list, array) => {
    const reduceAddFunction = (previousValue, currentValue) => previousValue += currentValue;
    const reduceConcatFunction = (previousValue, currentValue) => previousValue.concat([currentValue]);
    const reducedAddArray = array.reduce(reduceAddFunction);
    const reducedConcatArray = array.reduce(reduceConcatFunction, []);

    expect(list.reduce(reduceAddFunction)).toEqual(reducedAddArray);
    success++;

    expect(list.reduce(reduceConcatFunction, []).object).toEqual(reducedConcatArray);
    success++;

    expect(list.reduce(reduceConcatFunction, [])).toEqual(crio(reducedConcatArray));
    success++;

    testedObj.reduce = true;
};

const testReduceRight = (list, array) => {
    const reduceAddFunction = (previousValue, currentValue) => previousValue += currentValue;
    const reduceConcatFunction = (previousValue, currentValue) => previousValue.concat([currentValue]);
    const reducedAddArray = array.reduceRight(reduceAddFunction);
    const reducedConcatArray = array.reduceRight(reduceConcatFunction, []);

    expect(list.reduceRight(reduceAddFunction)).toEqual(reducedAddArray);
    success++;

    expect(list.reduceRight(reduceConcatFunction, []).object).toEqual(reducedConcatArray);
    success++;

    expect(list.reduceRight(reduceConcatFunction, [])).toEqual(crio(reducedConcatArray));
    success++;

    testedObj.reduceRight = true;
};

const testReverse = (list, size) => {
    const testArray = createTestArray(size);

    testArray.reverse();

    expect(list.reverse().object).toEqual(testArray);
    success++;

    expect(list.reverse()).toEqual(crio(testArray));
    success++;

    testedObj.reverse = true;
};

const testShift = (list, size) => {
    const testArray = createTestArray(size);
    const listMinusFirst3 = list.shift().shift().shift();

    testArray.shift();

    expect(list.shift().object).toEqual(testArray);
    success++;

    testArray.shift();
    testArray.shift();

    expect(listMinusFirst3.object).toEqual(testArray);
    success++;

    testedObj.shift = true;
};

const testSlice = (list, size) => {
    const begin = 2;
    const end = 4;
    const testArrayBegin = createTestArray(size).slice(begin);
    const testArrayBeginEnd = createTestArray(size).slice(begin, end);

    expect(list.slice().object).toEqual(list.object);
    success++;

    expect(list.slice()).toEqual(list);
    success++;

    expect(list.slice(begin).object).toEqual(testArrayBegin);
    success++;

    expect(list.slice(begin)).toEqual(crio(testArrayBegin));
    success++;

    expect(list.slice(begin, end).object).toEqual(testArrayBeginEnd);
    success++;

    expect(list.slice(begin, end)).toEqual(crio(testArrayBeginEnd));
    success++;

    testedObj.slice = true;
};

const testSome = (list, size) => {
    const halfway = Math.ceil(size / 2);
    const trueFunction = (value) => value > halfway;
    const falseFunction = (value) => value === size + 1;

    expect(list.some(trueFunction)).toEqual(true);
    success++;

    expect(list.some(falseFunction)).toEqual(false);
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

    expect(crio(unsortedArray).sort().object).toEqual(sortedArrayAsc);
    success++;

    expect(crio(unsortedArray).sort()).toEqual(crio(sortedArrayAsc));
    success++;

    expect(crio(unsortedArray).sort(sortFunction).object).toEqual(sortedArrayDesc);
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

    expect(testCrio.splice(1).object).toEqual(testSplicedOneItemArray);
    success++;

    expect(testCrio.splice(1)).toEqual(crio(testSplicedOneItemArray));
    success++;

    expect(testCrio.splice(1, 4).object).toEqual(testSplicedFourItemsArray);
    success++;

    expect(testCrio.splice(1, 4)).toEqual(crio(testSplicedFourItemsArray));
    success++;

    testedObj.splice = true;
};

const testToMap = (list, array) => {
    let newMap = {};

    array.forEach((value, index) => {
        newMap[index] = value;
    });

    expect(list.toMap().object).toEqual(newMap);
    success++;

    expect(list.toMap()).toEqual(crio(newMap));
    success++;

    testedObj.toMap = true;
};

const testUnion = (list, array) => {
    const testArray = ['foo', 'foo'];
    const testUniqueArray = ['foo'];

    expect(list.union(array).object).toEqual(list.object);
    success++;

    expect(list.union(array)).toEqual(list);
    success++;

    expect(list.union(list).object).toEqual(list.object);
    success++;

    expect(list.union(list)).toEqual(list);
    success++;

    expect(list.union(testArray).object).toEqual(array.concat(testUniqueArray));
    success++;

    expect(list.union(testArray)).toEqual(crio(array.concat(testUniqueArray)));
    success++;

    testedObj.union = true;
};

const testUnique = () => {
    const arrayWithDuplicates = [1,1,1,1,1,1];
    const arrayUnique = [1];

    expect(crio(arrayWithDuplicates).unique().object).toEqual(arrayUnique);
    success++;

    expect(crio(arrayWithDuplicates).unique()).toEqual(crio(arrayUnique));
    success++;

    testedObj.unique = true;
};

const testUnshift = (list, size) => {
    const testArray = createTestArray(size);
    const foo = 'foo';
    const bar = 'bar';

    testArray.unshift(foo);

    expect(list.unshift(foo).object).toEqual(testArray);
    success++;

    expect(list.unshift(foo)).toEqual(crio(testArray));
    success++;

    testArray.unshift(bar);

    expect(list.unshift(foo, bar).object).toEqual(testArray);
    success++;

    expect(list.unshift(foo, bar)).toEqual(crio(testArray));
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

    // test .first()
    testFirst(TEST_CRIO_LIST, TEST_ARRAY);

    // test .includes()
    testIncludes(TEST_CRIO_LIST, LOOP_SIZE);

    // test .indexOf()
    testIndexOf(TEST_CRIO_LIST, TEST_ARRAY, LOOP_SIZE);

    // test .join()
    testJoin(TEST_CRIO_LIST, LOOP_SIZE);

    // test .last()
    testLast(TEST_CRIO_LIST, TEST_ARRAY, LOOP_SIZE);

    // test .lastIndexOf()
    testLastIndexOf(TEST_CRIO_LIST);

    // test .map()
    testMap(TEST_CRIO_LIST, TEST_ARRAY);

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

    // test .toMap()
    testToMap(TEST_CRIO_LIST, TEST_ARRAY);

    // test .union()
    testUnion(TEST_CRIO_LIST, TEST_ARRAY);

    // test .unique()
    testUnique(TEST_CRIO_LIST);

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