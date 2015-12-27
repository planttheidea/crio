

// external dependencies
import murmur from 'murmur-hash-js';
import Cereal from 'cereal';

import {
    Buffer
} from 'buffer';

// local partial imports
import {
    isArray,
    isFunction,
    isNAN,
    isNull,
    isNumber,
    isString,
    isUndefined
} from './checkers';

import {
    isConvertibleToCrio
} from './crioCheckers';

import {
    forEach,
    forIn
} from './functions';

const hashString = (obj: any) : number => {
    if (!isString(obj)) {
        obj = obj.toString();
    }

    const buf: Buffer = new Buffer(obj);

    return murmur(buf);
};

const hashFunctionInObject = (obj: Array|Object) : Array|Object => {
    const loopFunction: Array|Object = isArray(obj) ? forEach : forIn;

    let cleanObj: Array|Object = isArray(obj) ? [] : {};

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

    // if its an array, check if a function exists in there
    if (isConvertibleToCrio(obj)) {
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