

// external dependencies
import murmur from 'murmur-hash-js';
import Cereal from 'cereal';

import {
    Buffer
} from 'buffer';

// local partial imports
import {
    isArray,
    isDate,
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
    forOwn
} from './functions';

type ArrayOrObject = Array|Object;

const isConvertibleToCrio = (obj: any) : boolean => {
    return isArray(obj) || isDate(obj) || isObject(obj);
};

const hashString = (obj: any) : number => {
    if (!isString(obj)) {
        obj = obj.toString();
    }

    const buf: Buffer = new Buffer(obj);

    return murmur(buf);
};

const hashFunctionInObject = (obj: ArrayOrObject) : ArrayOrObject => {
    const loopFunction: ArrayOrObject = isArray(obj) ? forEach : forOwn;

    let cleanObj: ArrayOrObject = isArray(obj) ? [] : {};

    loopFunction(obj, (value, key) => {
        if (isConvertibleToCrio(value)) {
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

    if (isDate(obj)) {
        return hashString(Date.prototype.valueOf.call(obj));
    }

    // if its an array, check if a function exists in there
    if (isConvertibleToCrio(obj)) {
        const objWithFunctionsHashed: ArrayOrObject = hashFunctionInObject(obj);

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