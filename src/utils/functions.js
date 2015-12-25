

// local partial imports
import {
    isArray,
    isObject,
    isUndefined
} from './checkers';

/**
 * Loops over array, executing each function
 * If one of the iterations returns false, the forEach is canceled
 *
 * @param arr<Array>
 * @param fn<Function>
 * @param thisArg<Object[optional]>
 */
const forEach = (arr: Array, fn: Function, thisArg: ?Object) => {
    if (!isArray(arr)) {
        throw new TypeError('Object passed to forEach is not an array.');
    }

    if (isUndefined(fn)) {
        return;
    }

    for (let i: number = 0, len: number = arr.length; i < len; i++) {
        if (fn.call(thisArg, arr[i], i, arr) === false) {
            break;
        }
    }
};

const forEachRight = (arr: Array, fn: Function, thisArg: ?Object) => {
    if (!isArray(arr)) {
        throw new TypeError('Object passed to forEach is not an array.');
    }

    if (isUndefined(fn)) {
        return;
    }

    for (let i: number = arr.length; i--;) {
        if (fn.call(thisArg, arr[i], i, arr) === false) {
            break;
        }
    }
};

/**
 * Creates flattened array of keys to be used in object loops
 *
 * @param args<Array>
 * @returns keys<Array>
 */
const getKeys = (...args: Array) => {
    let keys: Array = [];

    forEach(args, (keyArr) => {
        keys.push(...keyArr);
    });

    return keys;
};

/**
 * Executes standard for loop using the keys provided, which is faster than a traditional for-in
 *
 * @param obj<Object>
 * @param keys<Array>
 * @param fn<Function>
 * @param thisArg<Object[optional]>
 */
const forLoopFromKeys = (obj: Object, keys: Array, fn: Function, thisArg: ?Object) => {
    if (!isUndefined(fn)) {
        for (let i: number = 0, len: number = keys.length; i < len; i++) {
            const key: string = keys[i];

            if (fn.call(thisArg, obj[key], key, obj) === false) {
                break;
            }
        }
    }
};

/**
 * Checks if object passed is a plain object, and if so then loops over all own keys + prototype keys
 *
 * @param obj<Object>
 * @param fn<Function>
 * @param thisArg<Object[optional]>
 */
const forIn = (obj: Object, fn: Function, thisArg: ?Object) => {
    if (!isObject(obj)) {
        throw new TypeError('Object passed to forIn is not a plain object.');
    }

    if (!isUndefined(fn)) {
        const keys: Array = getKeys(Object.keys(obj), Object.keys(Object.getPrototypeOf(obj)));

        forLoopFromKeys(obj, keys, fn, thisArg);
    }
};

/**
 * Checks if object passed is a plain object, and if so then loops over all own keys
 *
 * @param obj<Object>
 * @param fn<Function>
 * @param thisArg<Object[optional]>
 */
const forOwn = (obj: Object, fn: Function, thisArg: ?Object) => {
    if (!isObject(obj)) {
        throw new TypeError('Object passed to forIn is not a plain object.');
    }

    if (!isUndefined(fn)) {
        const keys: Array = getKeys(Object.getOwnPropertyNames(obj));

        forLoopFromKeys(obj, keys, fn, thisArg);
    }
};

/**
 * Returns a new array with all values of the original array except for the value at the index passed
 *
 * @param obj<Array>
 * @param index<Number>
 * @param removeNum<Number>
 * @returns splicedArray<Array>
 */
const immutableSplice = (obj: Array, index: number, removeNum: number) => {
    if (!isArray(obj)) {
        throw new TypeError('Object passed to concat is not an array.');
    }

    if (isUndefined(obj[index])) {
        return obj;
    }

    return [
        ...obj.slice(0, index),
        ...obj.slice(index + removeNum)
    ];
};

export {forEach as forEach};
export {forEachRight as forEachRight};
export {forIn as forIn};
export {forOwn as forOwn};
export {immutableSplice as splice};

export default {
    forEach,
    forEachRight,
    forIn,
    forOwn,
    splice: immutableSplice
};