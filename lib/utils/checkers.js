'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// make sure that IE's window.TO_STRING isn't used
var TO_STRING = Object.prototype.toString;

/**
 * Returns true if object passed is array
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isArray = function isArray(obj) {
    return TO_STRING.call(obj) === '[object Array]';
};

var isCrio = function isCrio(obj) {
    return (isArray(obj) || isDate(obj) || isObject(obj)) && !!obj.$$crio;
};

/**
 * Returns true if object passed is date
 *
 * @param obj<any>
 * @returns {boolean}
 */
var isDate = function isDate(obj) {
    return TO_STRING.call(obj) === '[object Date]';
};

/**
 * Returns true if object passed is function
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isFunction = function isFunction(obj) {
    return TO_STRING.call(obj) === '[object Function]' || typeof obj === 'function';
};

/**
 * Returns true if object passed is object
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isObject = function isObject(obj) {
    return TO_STRING.call(obj) === '[object Object]' && !!obj;
};

/**
 * Returns true if object passed is null
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isNull = function isNull(obj) {
    return obj === null;
};

/**
 * Returns true if object passed is NaN
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isNAN = function isNAN(obj) {
    function _ref7(_id7) {
        if (!(typeof _id7 === 'boolean')) {
            throw new TypeError('Function return value violates contract, expected bool got ' + (_id7 === null ? 'null' : (typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)) === 'object' && _id7.constructor ? _id7.constructor.name || '[Unknown Object]' : typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)));
        }

        return _id7;
    }

    return _ref7(obj !== obj);
};

/**
 * Returns true if object passed is number
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isNumber = function isNumber(obj) {
    return !isNAN(obj) && TO_STRING.call(obj) === '[object Number]';
};

/**
 * Returns true if object passed is string
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isString = function isString(obj) {
    return TO_STRING.call(obj) === '[object String]';
};

/**
 * Returns true if object passed is undefined
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isUndefined = function isUndefined(obj) {
    return obj === void 0;
};

/**
 * Returns true if object passed is either null or undefined
 *
 * @param obj<any>
 * @returns {boolean}
 */
var isValueless = function isValueless(obj) {
    return isNull(obj) || isUndefined(obj);
};

/**
 * Returns true if object is Array-like (HTMLCollection, NodeList, etc)
 *
 * @param obj<any>
 * @returns {boolean}
 */
var isArrayLike = function isArrayLike(obj) {
    return !isArray(obj) && !isFunction(obj) && obj.hasOwnProperty('length') && isNumber(obj.length) && (obj.length === 0 || (obj.length > 0 && obj.length - 1) in obj);
};

exports.isArray = isArray;
exports.isArrayLike = isArrayLike;
exports.isCrio = isCrio;
exports.isDate = isDate;
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isNAN = isNAN;
exports.isNull = isNull;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.isValueless = isValueless;
exports.default = {
    isArray: isArray,
    isArrayLike: isArrayLike,
    isCrio: isCrio,
    isDate: isDate,
    isFunction: isFunction,
    isObject: isObject,
    isNAN: isNAN,
    isNull: isNull,
    isNumber: isNumber,
    isString: isString,
    isUndefined: isUndefined,
    isValueless: isValueless
};