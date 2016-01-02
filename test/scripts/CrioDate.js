

import expect from 'expect';

import crio from '../../src/index';
import crioDatePrototype from '../../src/crio/crioDatePrototype';

import {
    crioConstants
} from './testConstants';

import {
    cloneDate,
    createTestDate
} from './testFunctions';

const MUTABLE_METHODS = [
    'setTime',
    'setMilliseconds',
    'setUTCMilliseconds',
    'setSeconds',
    'setUTCSeconds',
    'setMinutes',
    'setUTCMinutes',
    'setHours',
    'setUTCHours',
    'setDate',
    'setUTCDate',
    'setMonth',
    'setUTCMonth',
    'setFullYear',
    'setUTCFullYear',
    'setYear'
];

let immutableMethods = Object.getOwnPropertyNames(crioDatePrototype),
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

// get rid of the constructor
const constructorIndex = immutableMethods.indexOf('constructor');

if (constructorIndex !== -1) {
    immutableMethods.splice(constructorIndex, 1);
}

/*
 Create the functions used in the tests
 */
const testConstructor = (date) => {
    expect(crio(date)).toBeA(Date);
    success++;

    expect(crio.date(date)).toBeA(Date);
    success++;

    expect(crio.date.from(2015, 11, 31)).toBeA(Date);
    success++;

    expect(crio.date.utc(date)).toBeA(Date);
    success++;

    expect(crio.date.utc(2015, 11, 31)).toBeA(Date);
    success++;

    testedObj.constructor = true;
};

const testDefaultImmutableMethod = (date, method) => {
    if (date[method]) {
        expect(crio(date)[method]()).toEqual(date[method]());
        success++;
    }

    testedObj[method] = true;
};

const testEquals = (date, object) => {
    expect(date.equals(crio(object))).toEqual(true);
    success++;

    expect(date.equals(crio(new Date(2015, 1, 1)))).toEqual(false);
    success++;

    testedObj.equals = true;
};

const testFreeze = (date) => {
    const thawedDate = date.thaw();

    expect(thawedDate.freeze().isFrozen()).toEqual(true);
    success++;

    expect(date.freeze().isFrozen()).toEqual(true);
    success++;

    testedObj.freeze = true;
};

const testIsFrozen = (date) => {
    const thawedDate = date.thaw();

    expect(thawedDate.isFrozen()).toEqual(false);
    success++;

    expect(date.isFrozen()).toEqual(true);
    success++;

    testedObj.isFrozen = true;
};

const testImmutableMethod = (date, method, arg) => {
    const increase = Math.ceil(Math.random() * 10);
    const clone = cloneDate(date);
    const newDate = arg + increase;

    clone[method](newDate);

    expect(crio(date)[method](newDate)).toEqual(clone);
    success++;

    testedObj[method] = true;
};

const testToJs = (date, object) => {
    expect(date.toJS()).toEqual(object);
    success++;

    expect(date.toJS()).toBeA(Date);
    success++;

    testedObj.toJS = true;
};

const testThaw = (object) => {
    expect(crio(object).thaw()).toEqual(object);
    success++;

    expect(crio(object).thaw()).toBeA(Date);
    success++;

    testedObj.thaw = true;
};

/*
 Run the tests, setting variables for the loops you want to incur
 */
const TEST_LOOP_SIZE = 10;

// run the tests in a loop
for (let i = TEST_LOOP_SIZE; i--;) {
    const NEW_DATE = createTestDate();
    const YEAR = NEW_DATE.getFullYear();
    const MONTH = NEW_DATE.getMonth();
    const DATE = NEW_DATE.getDate();
    const DAY = NEW_DATE.getDay();
    const TIME = NEW_DATE.getTime();
    const HOURS = NEW_DATE.getHours();
    const MINUTES = NEW_DATE.getMinutes();
    const SECONDS = NEW_DATE.getSeconds();
    const MILLISECONDS = NEW_DATE.getMilliseconds();

    // test constructor
    testConstructor(NEW_DATE);

    // test all normally immutable Date methods
    for (let j = immutableMethods.length; j--;) {
        testDefaultImmutableMethod(NEW_DATE, immutableMethods[j]);
    }

    for (let j = MUTABLE_METHODS.length; j--;) {
        const method = MUTABLE_METHODS[j];

        let argToPass;

        switch (true) {
            case /year/i.test(method):
                argToPass = YEAR;
                break;
            case /month/i.test(method):
                argToPass = MONTH;
                break;
            case /date/i.test(method):
                argToPass = DATE;
                break;
            case /day/i.test(method):
                argToPass = DAY;
                break;
            case /time/i.test(method):
                argToPass = TIME;
                break;
            case /hours/i.test(method):
                argToPass = HOURS;
                break;
            case /minutes/i.test(method):
                argToPass = MINUTES;
                break;
            case /seconds/i.test(method):
                argToPass = SECONDS;
                break;
            case /milliseconds/i.test(method):
                argToPass = MILLISECONDS;
                break;
        }

        testImmutableMethod(NEW_DATE, method, argToPass);
    }

    // test .equals()
    testEquals(crio(NEW_DATE), NEW_DATE);

    // test .equals()
    testFreeze(crio(NEW_DATE), NEW_DATE);

    // test .equals()
    testIsFrozen(crio(NEW_DATE), NEW_DATE);

    // test .thaw()
    testThaw(NEW_DATE);

    // test .thaw()
    testToJs(crio(NEW_DATE), NEW_DATE);
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