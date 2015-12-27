'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isSameCrio = exports.isCrioMap = exports.isCrioList = exports.isCrioDate = exports.isCrioCollection = exports.isCrio = exports.isConvertibleToCrio = undefined;

var _CrioCollection = require('./../CrioCollection');

var _CrioCollection2 = _interopRequireDefault(_CrioCollection);

var _CrioDate = require('./../CrioDate');

var _CrioDate2 = _interopRequireDefault(_CrioDate);

var _checkers = require('./checkers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local imports

// local partial imports

var CrioInstance = function CrioInstance(input) {
    return input instanceof _CrioCollection2.default || input instanceof _CrioDate2.default;
};

/**
 * Returns true if object passed is CrioCollection
 *
 * @param obj<Any>
 * @returns {boolean}
 */

var isCrioCollection = function isCrioCollection(obj) {
    return obj instanceof _CrioCollection2.default;
};

/**
 * Returns true if object passed is CrioDate
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isCrioDate = function isCrioDate(obj) {
    return obj instanceof _CrioDate2.default;
};

/**
 * Returns true if object passed is CrioCollection or CrioDate
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isCrio = function isCrio(obj) {
    return isCrioCollection(obj) || isCrioDate(obj);
};

/**
 * Returns true if object passed is either an array or object
 *
 * @param obj<any>
 * @returns {boolean}
 */
var isConvertibleToCrio = function isConvertibleToCrio(obj) {
    return !isCrio(obj) && ((0, _checkers.isArray)(obj) || (0, _checkers.isObject)(obj) || (0, _checkers.isDate)(obj));
};

/**
 * Returns true if object passed is CrioList
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isCrioList = function isCrioList(obj) {
    return isCrioCollection(obj) && (0, _checkers.isArray)(obj.object);
};

/**
 * Returns true if object passed is CrioMap
 *
 * @param obj<Any>
 * @returns {boolean}
 */
var isCrioMap = function isCrioMap(obj) {
    return isCrioCollection(obj) && (0, _checkers.isObject)(obj.object);
};

/**
 * Returns true if both objects passed are Crio and are equal to one another
 *
 * @param obj1<Any>
 * @param obj2<Any>
 * @returns {boolean}
 */
var isSameCrio = function isSameCrio(obj1, obj2) {
    if (!CrioInstance(obj1)) {
        throw new TypeError('Value of argument "obj1" violates contract, expected CrioInstance got ' + (obj1 === null ? 'null' : (typeof obj1 === 'undefined' ? 'undefined' : _typeof(obj1)) === 'object' && obj1.constructor ? obj1.constructor.name || '[Unknown Object]' : typeof obj1 === 'undefined' ? 'undefined' : _typeof(obj1)));
    }

    if (!CrioInstance(obj2)) {
        throw new TypeError('Value of argument "obj2" violates contract, expected CrioInstance got ' + (obj2 === null ? 'null' : (typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2)) === 'object' && obj2.constructor ? obj2.constructor.name || '[Unknown Object]' : typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2)));
    }

    if (isCrioDate(obj1) && isCrioDate(obj2) || isCrioList(obj1) && isCrioList(obj2) || isCrioMap(obj1) && isCrioMap(obj2)) {
        return obj1.hashCode === obj2.hashCode;
    }

    return false;
};

exports.isConvertibleToCrio = isConvertibleToCrio;
exports.isCrio = isCrio;
exports.isCrioCollection = isCrioCollection;
exports.isCrioDate = isCrioDate;
exports.isCrioList = isCrioList;
exports.isCrioMap = isCrioMap;
exports.isSameCrio = isSameCrio;
exports.default = {
    isConvertibleToCrio: isConvertibleToCrio,
    isCrio: isCrio,
    isCrioCollection: isCrioCollection,
    isCrioDate: isCrioDate,
    isCrioList: isCrioList,
    isCrioMap: isCrioMap,
    isSameCrio: isSameCrio
};