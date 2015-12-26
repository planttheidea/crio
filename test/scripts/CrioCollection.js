

import entries from 'core-js/fn/object/entries';
import expect from 'expect';

import crio from '../../src/index';
import CrioCollection from '../../src/CrioCollection';

import {
    createTestArray,
    createTestObject,
    getValidLoopSize
} from './testFunctions';

let success = 0,
    untested = 0;

/*
    Create the functions used in the tests
 */
const testConstructor = () => {
    expect(crio({})).toBeA(CrioCollection);
    success++;
};

const testClear = (list, map) => {
    expect(list.clear().object).toEqual([]);
    success++;

    expect(map.clear().object).toEqual({});
    success++;

    expect(list.clear()).toEqual(crio([]));
    success++;

    expect(map.clear()).toEqual(crio({}));
    success++;
};

const testEntries = (list, map, array, object) => {
    expect(list.entries()).toEqual(array.entries());
    success++;

    expect(map.entries()).toEqual(entries(object));
    success++;
};

const testEquals = (list, map, array, object) => {
    expect(list.equals(crio(array))).toEqual(true);
    success++;

    expect(map.equals(crio(object))).toEqual(true);
    success++;

    expect(list.equals(crio(object))).toEqual(false);
    success++;

    expect(map.equals(crio(array))).toEqual(false);
    success++;
};

const testForEach = (list, map, array, object) => {
    const testList = (() => {
        let testArray = [];

        list.forEach((value) => {
            testArray.push(value);
        });

        return testArray;
    })();
    const testMap = (() => {
        let testMap = {};

        map.forEach((value, key) => {
            testMap[key] = value;
        });

        return testMap;
    })();

    expect(testList).toEqual(array);
    success++;

    expect(testMap).toEqual(object);
    success++;
};

const testGet = (list, map) => {
    const getObject = {
        '1':1,
        '3':3,
        '5':5
    };

    expect(list.get(1)).toEqual(1);
    success++;

    expect(map.get(2)).toEqual(2);
    success++;

    expect(list.get(1, 3, 5).object).toEqual(getObject);
    success++;

    expect(map.get(1, 3, 5).object).toEqual(getObject);
    success++;
};

const testGetIn = () => {
    const deeplyNestedObject = {
        some:{
            deep:{
                nesting:{
                    going:'on'
                }
            }
        }
    };
    const deeplyNestedArray = [
        deeplyNestedObject
    ];

    expect(crio(deeplyNestedObject).getIn(['some', 'deep', 'nesting', 'going'])).toEqual('on');
    success++;

    expect(crio(deeplyNestedArray).getIn([0, 'some', 'deep', 'nesting', 'going'])).toEqual('on');
    success++;
};

const testIsEmpty = () => {
    expect(crio([]).isEmpty()).toEqual(true);
    success++;

    expect(crio({}).isEmpty()).toEqual(true);
    success++;

    expect(crio(['foo']).isEmpty()).toEqual(false);
    success++;

    expect(crio({foo: 'bar'}).isEmpty()).toEqual(false);
    success++;
};

const testKeys = (list, map, array, object) => {
    expect(list.keys()).toEqual(Object.keys(array));
    success++;

    expect(map.keys()).toEqual(Object.keys(object));
    success++;
};

const testMerge = (list, map, loopSize) => {
    const size = getValidLoopSize(5, 20);
    const mergeArray = createTestArray(size, loopSize);
    const mergeObject = createTestObject(size, loopSize);

    expect(list.merge(mergeArray).object).toEqual(createTestArray(loopSize + size));
    success++;

    expect(map.merge(mergeObject).object).toEqual(createTestObject(loopSize + size));
    success++;

    expect(list.merge(mergeArray)).toEqual(crio(createTestArray(loopSize + size)));
    success++;

    expect(map.merge(mergeObject)).toEqual(crio(createTestObject(loopSize + size)));
    success++;
};

const testMutate = (list, map) => {
    const string = 'foo';
    const array = [1, 2, 3];
    const object = {foo: 'bar'};

    expect(list.mutate(() => string)).toEqual(string);
    success++;

    expect(map.mutate(() => string)).toEqual(string);
    success++;

    expect(list.mutate(() => array)).toEqual(crio(array));
    success++;

    expect(map.mutate(() => object)).toEqual(crio(object));
    success++;
};

const testSet = (list, map, array, object, loopSize) => {
    let changedArray = createTestArray(loopSize);
    let changedMap = createTestObject(loopSize);

    changedArray[0] = 'foo';
    changedMap[0] = 'foo';

    expect(list.set(0, 'foo').object).toEqual(changedArray);
    success++;

    expect(map.set(0, 'foo').object).toEqual(changedMap);
    success++;

    expect(list.set(0, 'foo')).toEqual(crio(changedArray));
    success++;

    expect(map.set(0, 'foo')).toEqual(crio(changedMap));
    success++;
};

const testSetIn = () => {
    const deeplyNestedObject = crio({
        some:{
            deep:{
                nesting:{
                    going:'on'
                }
            }
        }
    });
    const deeplyNestedArray = crio([
        deeplyNestedObject
    ]);
    const deeplyNestedObjectChanged = {
        some:{
            deep:{
                nesting:{
                    going:'better'
                }
            }
        }
    };
    const deeplyNestedArrayChanged = [
        deeplyNestedObjectChanged
    ];
    const deeplyNestedObjectNew = {
        some:{
            deep:{
                nesting:{
                    going:'on'
                }
            },
            newer:{
                nested:'field'
            }
        }
    };
    const deeplyNestedArrayNew = [
        deeplyNestedObjectNew
    ];

    expect(deeplyNestedObject.setIn(['some', 'deep', 'nesting', 'going'], 'better').thaw())
        .toEqual(deeplyNestedObjectChanged);
    success++;

    expect(deeplyNestedArray.setIn([0, 'some', 'deep', 'nesting', 'going'], 'better').thaw())
        .toEqual(deeplyNestedArrayChanged);
    success++;

    expect(deeplyNestedObject.setIn(['some', 'newer', 'nested'], 'field').thaw())
        .toEqual(deeplyNestedObjectNew);
    success++;

    expect(deeplyNestedArray.setIn([0, 'some', 'newer', 'nested'], 'field').thaw())
        .toEqual(deeplyNestedArrayNew);
    success++;
};

const testThaw = (list, map) => {
    expect(Object.isFrozen(list.thaw())).toEqual(false);
    success++;

    expect(Object.isFrozen(map.thaw())).toEqual(false);
    success++;
};

const testToLocaleString = () => {
    const dateString = (new Date()).toLocaleString();
    const numberString = Number(1).toLocaleString();

    expect(crio([]).toString()).toEqual('CrioList []');
    success++;

    expect(crio({}).toString()).toEqual('CrioMap {}');
    success++;

    expect(crio([numberString, dateString]).toString())
        .toEqual(`CrioList [${numberString}, ${dateString}]`);
    success++;

    expect(crio({number:numberString,date:dateString}).toString())
        .toEqual(`CrioMap {number: ${numberString}, date: ${dateString}}`);
    success++;
};

const testToString = () => {
    expect(crio([]).toString()).toEqual('CrioList []');
    success++;

    expect(crio({}).toString()).toEqual('CrioMap {}');
    success++;

    expect(crio(['foo', 1]).toString()).toEqual('CrioList [foo, 1]');
    success++;

    expect(crio({foo:'bar',bouncy:'ball'}).toString()).toEqual('CrioMap {foo: bar, bouncy: ball}');
    success++;
};

const testValues = (list, map, array, object) => {
    expect(list.values()).toEqual(array);
    success++;

    expect(map.values()).toEqual((() => {
        let values = [];

        for (let key in object) {
            values.push(object[key]);
        }

        return values;
    })());
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
    const TEST_MAP = createTestObject(LOOP_SIZE);
    const TEST_CRIO_LIST = crio(TEST_ARRAY);
    const TEST_CRIO_MAP = crio(TEST_MAP);

    // test constructor
    testConstructor();

    // test .clear()
    testClear(TEST_CRIO_LIST, TEST_CRIO_MAP);

    // test .entries()
    testEntries(TEST_CRIO_LIST, TEST_CRIO_MAP, TEST_ARRAY, TEST_MAP);

    // test .equals()
    testEquals(TEST_CRIO_LIST, TEST_CRIO_MAP, TEST_ARRAY, TEST_MAP);

    // test .forEach()
    testForEach(TEST_CRIO_LIST, TEST_CRIO_MAP, TEST_ARRAY, TEST_MAP);

    // test .get()
    testGet(TEST_CRIO_LIST, TEST_CRIO_MAP);

    // test .getIn()
    testGetIn();

    // test .isEmpty()
    testIsEmpty();

    // test .keys()
    testKeys(TEST_CRIO_LIST, TEST_CRIO_MAP, TEST_ARRAY, TEST_MAP);

    // test .merge()
    testMerge(TEST_CRIO_LIST, TEST_CRIO_MAP, LOOP_SIZE);

    // test .mutate()
    testMutate(TEST_CRIO_LIST, TEST_CRIO_MAP);

    // test .set()
    testSet(TEST_CRIO_LIST, TEST_CRIO_MAP, TEST_ARRAY, TEST_MAP, LOOP_SIZE);

    // test .setIn()
    testSetIn();

    // test .thaw()
    testThaw(TEST_CRIO_LIST, TEST_CRIO_MAP);

    // test .toLocaleString()
    testToLocaleString();

    // test .toString()
    testToString();

    // test .values()
    testValues(TEST_CRIO_LIST, TEST_CRIO_MAP, TEST_ARRAY, TEST_MAP);
}

export default {
    success,
    untested
};