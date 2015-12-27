

import expect from 'expect';

import crio from '../../src/index';
import CrioDate from '../../src/CrioDate';

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

const CRIO_DATE_METHODS = [
    'equals',
    'thaw'
];

let immutableMethods = Object.getOwnPropertyNames(CrioDate.prototype),
    success = 0,
    testedObj = {},
    methodsToTest = Object.getOwnPropertyNames(CrioDate.prototype);

methodsToTest.forEach((method) => {
    testedObj[method] = false;
});

// get rid of methods added to class
CRIO_DATE_METHODS.forEach((method) => {
    immutableMethods.splice(immutableMethods.indexOf(method), 1);
});

// get rid of the mutable methods that we modified
MUTABLE_METHODS.forEach((method) => {
    immutableMethods.splice(immutableMethods.indexOf(method), 1);
});

// get rid of the constructor
immutableMethods.splice(immutableMethods.indexOf('constructor'), 1);

/*
 Create the functions used in the tests
 */
const testConstructor = (date) => {
    expect(crio(date)).toBeA(CrioDate);
    success++;

    expect(crio.date(date)).toBeA(CrioDate);
    success++;

    expect(crio.date.from(2015, 11, 31)).toBeA(CrioDate);
    success++;

    expect(crio.date.utc(date)).toBeA(CrioDate);
    success++;

    expect(crio.date.utc(2015, 11, 31)).toBeA(CrioDate);
    success++;

    testedObj.constructor = true;
};

const testDefaultImmutableMethod = (date, method) => {
    expect(crio(date)[method]()).toEqual(date[method]());
    success++;

    testedObj[method] = true;
};

const testEquals = (date, object) => {
    expect(date.equals(crio(object))).toEqual(true);
    success++;

    expect(date.equals(crio(new Date(2015, 1, 1)))).toEqual(false);
    success++;

    testedObj.equals = true;
};

const testImmutableMethod = (date, method, arg) => {
    const increase = Math.ceil(Math.random() * 10);
    const clone = cloneDate(date);
    const newDate = arg + increase;

    clone[method](newDate);

    expect(crio(date)[method](newDate).object).toEqual(clone);
    success++;

    expect(crio(date)[method](newDate)).toEqual(crio(clone));
    success++;

    testedObj[method] = true;
};

const testThaw = (date) => {
    expect(crio(date).thaw()).toEqual(date);

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

    // test .thaw()
    testThaw(NEW_DATE);
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