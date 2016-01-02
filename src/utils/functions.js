

// local imports
import setPrototypeOf from './setPrototypeOf';

// local partial imports
import {
    isArray,
    isUndefined
} from './checkers';

type ArrayOrObject = Array|Object;

/**
 * Loops over array, executing each function
 * If one of the iterations returns false, the forEach is canceled
 *
 * @param arr<Array>
 * @param fn<Function>
 */
const forEach = (arr: ArrayOrObject, fn: Function) => {
    if (isUndefined(fn)) {
        return;
    }

    for (let i: number = 0, len: number = arr.length; i < len; i++) {
        fn(arr[i], i, arr);
    }
};

/**
 * Loops over array of own properties, executing each function
 * If one of the iterations returns false, the forEach is canceled
 *
 * @param obj<Object>
 * @param fn<Function>
 */
const forOwn = (obj: Object, fn: Function) => {
    if (isUndefined(fn)) {
        return;
    }

    const keys = Object.getOwnPropertyNames(obj);

    for (let i: number = 0, len: number = keys.length; i < len; i++) {
        if (fn(obj[keys[i]], keys[i], obj) === false) {
            break;
        }
    }
};

const setDeeplyNested = (obj: ArrayOrObject, keys: Array, value: any, prototype: Object) : ArrayOrObject => {
    forEach(keys, (key, index) => {
        if (index !== keys.length - 1) {
            keys.shift();

            obj[key] = setDeeplyNested(obj[key] || Object.create(prototype), keys, value, prototype);
        } else if (!isUndefined(key)) {
            obj[key] = value;
        }
    });

    setPrototypeOf(obj, prototype);

    return obj;
};

const setNonEnumerable = (obj: ArrayOrObject, prop: any, value: any) : ArrayOrObject => {
    Object.defineProperty(obj, prop, {
        enumerable: false,
        configurable: true,
        value,
        writable: true
    });

    return obj;
};

const setReadonly = (obj: ArrayOrObject, prop: any, value: any) : ArrayOrObject => {
    Object.defineProperty(obj, prop, {
        enumerable: false,
        configurable: false,
        value,
        writable: false
    });

    return obj;
};

const shallowClone = (obj: ArrayOrObject) : ArrayOrObject => {
    if (isArray(obj)) {
        let i = obj.length,
            newArray = new Array(i);

        for (; i--;) {
            newArray[i] = obj[i];
        }

        return newArray;
    }

    return {...obj};
};

export {forEach as forEach};
export {forOwn as forOwn};
export {setDeeplyNested as setDeeplyNested};
export {setNonEnumerable as setNonEnumerable};
export {setReadonly as setReadonly};
export {shallowClone as shallowClone};

export default {
    forEach,
    forOwn,
    setDeeplyNested,
    setNonEnumerable,
    setReadonly,
    shallowClone
};