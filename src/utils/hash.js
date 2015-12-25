

// external dependencies
import murmur from 'murmur-hash-js';
import Cereal from 'cereal';

import {
    Buffer
} from 'buffer';

// local imports
import toString from './toString';

// local partial imports
import {
    isArray,
    isFunction,
    isNAN,
    isNull,
    isNumber,
    isObject,
    isString,
    isUndefined
} from './checkers';

import {
    forEach,
    forIn
} from './functions';

const hashString = (obj: any) : number => {
    if (!isString(obj)) {
        obj = toString.call(obj);
    }

    const buf: Buffer = new Buffer(obj);

    return murmur(buf);
};

const hashFunctionInObject = (obj: Array|Object) : Array|Object => {
    const loopFunction: Array|Object = isArray(obj) ? forEach : forIn;

    let cleanObj: Array|Object = isArray(obj) ? [] : {};

    loopFunction(obj, (value, key) => {
        if (isArray(value) || isObject(value)) {
            cleanObj[key] = hashFunctionInObject(value);
        } else if (isFunction(value)) {
            cleanObj[key] = value.toString();
        } else {
            cleanObj[key] = value;
        }
    });

    return cleanObj;
};

const hashObject = (obj: any) : number => {
    // just hash the value if its a string-like value
    if (isNull(obj) || isUndefined(obj) ||
        isString(obj) || isNumber(obj) || isNAN(obj)) {
        return hashString(obj);
    }

    // if its an array, check if a function exists in there
    if (isArray(obj) || isObject(obj)) {
        const objWithFunctionsHashed: Array|Object = hashFunctionInObject(obj);

        return hashString(Cereal.stringify(objWithFunctionsHashed));
    }

    return hashString(Cereal.stringify(obj));
};

export {hashObject as hashObject};
export {hashString as hashString};

export default {
    hashObject,
    hashString
};