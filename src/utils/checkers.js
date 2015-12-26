

// local imports
import toString from './toString';

/**
 * Returns true if object passed is array
 *
 * @param obj<Any>
 * @returns {boolean}
 */
const isArray = (obj: any) : boolean => {
    return toString.call(obj) === '[object Array]';
};

/**
 * Returns true if object passed is date
 *
 * @param obj<any>
 * @returns {boolean}
 */
const isDate = (obj: any) : boolean => {
    return toString.call(obj) === '[object Date]';
};

/**
 * Returns true if object passed is function
 *
 * @param obj<Any>
 * @returns {boolean}
 */
const isFunction = (obj: any) : boolean => {
    return toString.call(obj) === '[object Function]' || typeof obj === 'function';
};

/**
 * Returns true if object passed is object
 *
 * @param obj<Any>
 * @returns {boolean}
 */
const isObject = (obj: any) : boolean => {
    return toString.call(obj) === '[object Object]' && !!obj;
};

/**
 * Returns true if object passed is null
 *
 * @param obj<Any>
 * @returns {boolean}
 */
const isNull = (obj: any) : boolean => {
    return obj === null;
};

/**
 * Returns true if object passed is NaN
 *
 * @param obj<Any>
 * @returns {boolean}
 */
const isNAN = (obj: any) : boolean => {
    return obj !== obj;
};

/**
 * Returns true if object passed is number
 *
 * @param obj<Any>
 * @returns {boolean}
 */
const isNumber = (obj: any) : boolean => {
    return !isNAN(obj) && toString.call(obj) === '[object Number]';
};

/**
 * Returns true if object passed is string
 *
 * @param obj<Any>
 * @returns {boolean}
 */
const isString = (obj: any) : boolean => {
    return toString.call(obj) === '[object String]';
};

/**
 * Returns true if object passed is undefined
 *
 * @param obj<Any>
 * @returns {boolean}
 */
const isUndefined = (obj: any) : boolean => {
    return obj === void 0;
};

/**
 * Returns true if object passed is either null or undefined
 *
 * @param obj<any>
 * @returns {boolean}
 */
const isValueless = (obj) => {
    return isNull(obj) || isUndefined(obj);
};

/**
 * Returns true if object is Array-like (HTMLCollection, NodeList, etc)
 *
 * @param obj<any>
 * @returns {boolean}
 */
const isArrayLike = (obj: any) : boolean => {
    return isArray(obj) || (
            !isFunction(obj) && obj.hasOwnProperty('length') && isNumber(obj.length) &&
            (obj.length === 0 || (obj.length > 0 && obj.length -1) in obj)
        );
};

export {isArray as isArray};
export {isArrayLike as isArrayLike};
export {isDate as isDate};
export {isFunction as isFunction};
export {isObject as isObject};
export {isNAN as isNAN};
export {isNull as isNull};
export {isNumber as isNumber};
export {isString as isString};
export {isUndefined as isUndefined};
export {isValueless as isValueless};

export default {
    isArray,
    isArrayLike,
    isDate,
    isFunction,
    isObject,
    isNAN,
    isNull,
    isNumber,
    isString,
    isUndefined,
    isValueless
};