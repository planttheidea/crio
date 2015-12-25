'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isValueless = exports.isUndefined = exports.isString = exports.isNumber = exports.isNull = exports.isNAN = exports.isObject = exports.isFunction = exports.isConvertibleToCrio = exports.isArray = undefined;

var _toString = require('./toString');

var _toString2 = _interopRequireDefault(_toString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local imports

/**
 * Returns true if object passed is array
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isArray = function isArray(obj) {
    return _toString2.default.call(obj) === '[object Array]';
};

/**
 * Returns true if object passed is function
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isFunction = function isFunction(obj) {
    return _toString2.default.call(obj) === '[object Function]' || typeof obj === 'function';
};

/**
 * Returns true if object passed is object
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isObject = function isObject(obj) {
    return _toString2.default.call(obj) === '[object Object]' && !!obj;
};

/**
 * Returns true if object passed is either an array or object
 *
 * @param obj<any>
 * @returns {boolean}
 */
var isConvertibleToCrio = function isConvertibleToCrio(obj) {
    return isArray(obj) || isObject(obj);
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
    function _ref6(_id6) {
        if (!(typeof _id6 === 'boolean')) {
            throw new TypeError('Function return value violates contract, expected bool got ' + (_id6 === null ? 'null' : (typeof _id6 === 'undefined' ? 'undefined' : _typeof(_id6)) === 'object' && _id6.constructor ? _id6.constructor.name || '[Unknown Object]' : typeof _id6 === 'undefined' ? 'undefined' : _typeof(_id6)));
        }

        return _id6;
    }

    return _ref6(obj !== obj);
};

/**
 * Returns true if object passed is number
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isNumber = function isNumber(obj) {
    return !isNAN(obj) && _toString2.default.call(obj) === '[object Number]';
};

/**
 * Returns true if object passed is string
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isString = function isString(obj) {
    return _toString2.default.call(obj) === '[object String]';
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
 * @param obj
 * @returns {boolean}
 */
var isValueless = function isValueless(obj) {
    return isNull(obj) || isUndefined(obj);
};

exports.isArray = isArray;
exports.isConvertibleToCrio = isConvertibleToCrio;
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
    isConvertibleToCrio: isConvertibleToCrio,
    isFunction: isFunction,
    isObject: isObject,
    isNAN: isNAN,
    isNull: isNull,
    isNumber: isNumber,
    isString: isString,
    isUndefined: isUndefined,
    isValueless: isValueless
};