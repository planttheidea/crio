'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createNewCrio = undefined;

var _CrioList = require('./../CrioList');

var _CrioList2 = _interopRequireDefault(_CrioList);

var _CrioMap = require('./../CrioMap');

var _CrioMap2 = _interopRequireDefault(_CrioMap);

var _deepFreeze = require('./deepFreeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _checkers = require('./checkers');

var _crioCheckers = require('./crioCheckers');

var _crioFunctions = require('./crioFunctions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local imports

// local partial imports

/**
 * Creates new Crio from passed object
 *
 * @param obj<Array|Object>
 * @returns {Array|Object}
 */
var createNewCrio = function createNewCrio(obj) {
    var frozenObj = (0, _deepFreeze2.default)(obj);

    if ((0, _checkers.isArray)(obj)) {
        return new _CrioList2.default(frozenObj);
    }

    if ((0, _checkers.isObject)(obj)) {
        return new _CrioMap2.default(frozenObj);
    }

    throw new TypeError('Cannot create a Crio for standard objects, such as Strings, Numbers, Dates, etc. They ' + 'are already immutable!');
};

/**
 * Recursively freezes object passed to it
 *
 * @param obj<any>
 * @returns {any}
 */
createNewCrio.freeze = function (obj) {
    return (0, _deepFreeze2.default)(obj);
};

/**
 * Returns true if object passed is frozen
 *
 * @param obj<any>
 * @returns {boolean}
 */
createNewCrio.isFrozen = function (obj) {
    function _ref3(_id3) {
        if (!(typeof _id3 === 'boolean')) {
            throw new TypeError('Function return value violates contract, expected bool got ' + (_id3 === null ? 'null' : (typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)) === 'object' && _id3.constructor ? _id3.constructor.name || '[Unknown Object]' : typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)));
        }

        return _id3;
    }

    return _ref3(Object.isFrozen(obj));
};

createNewCrio.isList = _crioCheckers.isCrioList;
createNewCrio.isMap = _crioCheckers.isCrioMap;

/**
 * Returns mutable copy of the object that was Crio
 *
 * @param obj<any>
 * @returns {any}
 */
createNewCrio.thaw = function (obj) {
    if ((0, _crioCheckers.isCrioList)(obj) || (0, _crioCheckers.isCrioMap)(obj)) {
        return obj.thaw();
    }

    if (undefined.isFrozen(obj)) {
        return (0, _crioFunctions.cloneObject)(obj);
    }

    return obj;
};

exports.createNewCrio = createNewCrio;
exports.default = createNewCrio;