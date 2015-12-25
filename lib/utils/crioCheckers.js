'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isSameCrio = exports.isCrioMap = exports.isCrioList = exports.isCrioCollection = undefined;

var _CrioCollection = require('./../CrioCollection');

var _CrioCollection2 = _interopRequireDefault(_CrioCollection);

var _checkers = require('./checkers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local imports

// local partial imports

var isCrioCollection = function isCrioCollection(obj) {
    return obj instanceof _CrioCollection2.default;
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
    if (!(obj1 instanceof _CrioCollection2.default)) {
        throw new TypeError('Value of argument "obj1" violates contract, expected CrioCollection got ' + (obj1 === null ? 'null' : (typeof obj1 === 'undefined' ? 'undefined' : _typeof(obj1)) === 'object' && obj1.constructor ? obj1.constructor.name || '[Unknown Object]' : typeof obj1 === 'undefined' ? 'undefined' : _typeof(obj1)));
    }

    if (!(obj2 instanceof _CrioCollection2.default)) {
        throw new TypeError('Value of argument "obj2" violates contract, expected CrioCollection got ' + (obj2 === null ? 'null' : (typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2)) === 'object' && obj2.constructor ? obj2.constructor.name || '[Unknown Object]' : typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2)));
    }

    if ((isCrioList(obj1) || isCrioMap(obj1)) && (isCrioList(obj2) || isCrioMap(obj2))) {
        return obj1.hashCode === obj2.hashCode;
    }

    return false;
};

exports.isCrioCollection = isCrioCollection;
exports.isCrioList = isCrioList;
exports.isCrioMap = isCrioMap;
exports.isSameCrio = isSameCrio;
exports.default = {
    isCrioCollection: isCrioCollection,
    isCrioList: isCrioList,
    isCrioMap: isCrioMap,
    isSameCrio: isSameCrio
};