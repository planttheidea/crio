

// local partial imports
import {
    isArray,
    isBoolean,
    isDate,
    isFunction,
    isNull,
    isNumber,
    isObject,
    isString,
    isUndefined
} from './checkers';

/**
 * Modified from Dojo's implementation, this is a helper function to escape sequences for non-visual
 * characters, double quotes, and backslashes, where they are surrounded with double quotes to form
 * a valid string literal
 *
 * @param str<String>
 * @returns escapedString<String>
 */
const escapeString = (str: string) : string => {
    return ('"' + str.replace(/(["\\])/g, '\\$1') + '"').
        replace(/[\f]/g, '\\f').replace(/[\b]/g, '\\b').replace(/[\n]/g, '\\n').
        replace(/[\t]/g, '\\t').replace(/[\r]/g, '\\r');
};

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
 * @returns splicedArray<Array>
 */
const immutableSplice = (obj: Array, index: number) => {
    if (!isArray(obj)) {
        throw new TypeError('Object passed to concat is not an array.');
    }

    if (isUndefined(obj[index])) {
        return obj;
    }

    return [
        ...obj.slice(0, index),
        ...obj.slice(index + 1)
    ];
};

/**
 * Modified from Dojo's implementation, this function will convert anything into JSON, meaning
 * circular references will be coalesced
 *
 * @param obj<Any>
 * @param replacer<String[optional]>
 * @param spacer<String[optional]>
 * @returns json<String>
 */
const circularStringify = (obj, replacer, spacer) => {
    if (isString(replacer)) {
        spacer = replacer;
        replacer = null;
    }

    function stringify(objectToStringify, indent = '', key = ''){
        if (isFunction(replacer)) {
            objectToStringify = replacer(key, objectToStringify);
        }

        let val;

        if (isNumber(objectToStringify)) {
            return isFinite(objectToStringify) ? objectToStringify + '' : 'null';
        }

        if (isBoolean(objectToStringify)) {
            return objectToStringify + '';
        }

        if (isNull(objectToStringify)) {
            return 'null';
        }

        if (isString(objectToStringify)) {
            return escapeString(objectToStringify);
        }

        if (isFunction(objectToStringify) || isUndefined(objectToStringify)) {
            return void 0; // undefined
        }

        // short-circuit for objects that support 'json' serialization
        // if they return 'self' then just pass-through...
        if (isFunction(objectToStringify.toJSON)) {
            return stringify(objectToStringify.toJSON(key), indent, key);
        }

        if (isDate(objectToStringify)) {
            return '\'{FullYear}-{Month+}-{Date}T{Hours}:{Minutes}:{Seconds}Z\''.replace(/\{(\w+)(\+)?\}/g, (t, prop, plus) => {
                let num = objectToStringify['getUTC' + prop]() + (plus ? 1 : 0);

                return num < 10 ? '0' + num : num;
            });
        }

        if (objectToStringify.valueOf() !== objectToStringify) {
            // primitive wrapper, try again unwrapped:
            return stringify(objectToStringify.valueOf(), indent, key);
        }

        const nextIndent: string = spacer ? (indent + spacer) : '';
        /* we used to test for DOM nodes and throw, but FF serializes them as {}, so cross-browser consistency is probably not efficiently attainable */

        const sep: string = spacer ? ' ' : '';
        const newLine: string = spacer ? '\n' : '';

        // array
        if (isArray(objectToStringify)) {
            const itl: number = objectToStringify.length;

            let res: Array = [];

            for (key = 0; key < itl; key++){
                const obj = objectToStringify[key];

                val = stringify(obj, nextIndent, key);

                if (!isString(val)) {
                    val = 'null';
                }

                res.push(newLine + nextIndent + val);
            }

            return '[' + res.join(',') + newLine + indent + ']';
        }

        // generic object code path
        let output: Array = [];

        for (key in objectToStringify) {
            let keyStr: ?string;

            if (objectToStringify.hasOwnProperty(key)) {
                if (isNumber(key)) {
                    keyStr = '\'' + key + '\'';
                } else if (isString(key)) {
                    keyStr = escapeString(key);
                } else {
                    // skip non-string or number keys
                    continue;
                }

                val = stringify(objectToStringify[key], nextIndent, key);

                if (!isString(val)) {
                    // skip non-serializable values
                    continue;
                }

                // At this point, the most non-IE browsers don't get in this branch
                // (they have native JSON), so push is definitely the way to
                output.push(newLine + nextIndent + keyStr + ':' + sep + val);
            }
        }

        return '{' + output.join(',') + newLine + indent + '}'; // String
    }

    return stringify(obj, '', '');
};

export {forEach as forEach};
export {forEachRight as forEachRight};
export {forIn as forIn};
export {forOwn as forOwn};
export {immutableSplice as splice};
export {circularStringify as stringify};

export default {
    forEach,
    forEachRight,
    forIn,
    forOwn,
    splice: immutableSplice,
    stringify: circularStringify
};