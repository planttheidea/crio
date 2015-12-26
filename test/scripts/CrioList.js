

import expect from 'expect';

import crio from '../../src/index';
import CrioList from '../../src/CrioList';

import {
    createTestArray,
    getValidLoopSize
} from './testFunctions';

let success = 0,
    untested = 0;

/*
 Create the functions used in the tests
 */
const testConstructor = () => {
    expect(crio([])).toBeA(CrioList);
    success++;

    expect(crio.list([])).toBeA(CrioList);
    success++;
};

const testEvery = (list, size) => {
    const halfway = Math.ceil(size / 2);
    const trueFunction = (value, index) => value === index;
    const falseFunction = (value) => value < halfway;

    expect(list.every(trueFunction)).toEqual(true);
    success++;

    expect(list.every(falseFunction)).toEqual(false);
    success++;
};

const testFill = (list, loopSize) => {
    const fillString = 'a';
    const testArray = createTestArray(loopSize, 0, fillString);

    expect(list.fill(fillString).object).toEqual(testArray);
    success++;

    expect(list.fill(fillString)).toEqual(crio(testArray));
    success++;
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
};

const testIncludes = (list, loopSize) => {
    const includesIndex = Math.ceil(loopSize / 2);
    const doesNotIncludeIndex = loopSize + 1;

    expect(list.includes(includesIndex)).toEqual(true);
    success++;

    expect(list.includes(doesNotIncludeIndex)).toEqual(false);
    success++;
};

const testIndexOf = (list, array, size) => {
    const testArray = createTestArray(size);
    const checker = Math.ceil(size / 2);

    expect(list.indexOf(checker)).toEqual(array[checker]);
    success++;

    expect(list.indexOf(checker)).toEqual(testArray[checker]);
    success++;
};

const testJoin = (list, size) => {
    const testArrayJoin = createTestArray(size).join();
    const testArrayJoin2 = createTestArray(size).join('|');

    expect(list.join()).toEqual(testArrayJoin);
    success++;

    expect(list.join('|')).toEqual(testArrayJoin2);
    success++;
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
};

const testLastIndexOf = () => {
    const testArray = [1,2,1,2,1];
    const testCrio = crio(testArray);

    expect(testCrio.lastIndexOf(1)).toEqual(4);
    success++;

    expect(testCrio.lastIndexOf(2)).toEqual(3);
    success++;
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
};

const testReverse = (list, size) => {
    const testArray = createTestArray(size);

    testArray.reverse();

    expect(list.reverse().object).toEqual(testArray);
    success++;

    expect(list.reverse()).toEqual(crio(testArray));
    success++;
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
};

const testSome = (list, size) => {
    const halfway = Math.ceil(size / 2);
    const trueFunction = (value) => value > halfway;
    const falseFunction = (value) => value === size + 1;

    expect(list.some(trueFunction)).toEqual(true);
    success++;

    expect(list.some(falseFunction)).toEqual(false);
    success++;
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
};

const testUnique = () => {
    const arrayWithDuplicates = [1,1,1,1,1,1];
    const arrayUnique = [1];

    expect(crio(arrayWithDuplicates).unique().object).toEqual(arrayUnique);
    success++;

    expect(crio(arrayWithDuplicates).unique()).toEqual(crio(arrayUnique));
    success++;
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

    //test constructor
    testConstructor();

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

    // test .some()
    testSome(TEST_CRIO_LIST, LOOP_SIZE);

    // test .sort()
    testSort(TEST_CRIO_LIST);

    // test .splice()
    testSplice(LOOP_SIZE);

    // test .toMap()
    testToMap(TEST_CRIO_LIST, TEST_ARRAY);

    // test .unique()
    testUnique(TEST_CRIO_LIST);

    // test .unshift()
    testUnshift(TEST_CRIO_LIST, LOOP_SIZE);
}

export default {
    success,
    untested
};