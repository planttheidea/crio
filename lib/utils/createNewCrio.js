'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createNewCrioMap = exports.createNewCrioList = exports.createNewCrio = undefined;

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

var createNewCrioList = function createNewCrioList(obj) {
    function _ref(_id) {
        if (!(_id instanceof _CrioList2.default)) {
            throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id === null ? 'null' : (typeof _id === 'undefined' ? 'undefined' : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === 'undefined' ? 'undefined' : _typeof(_id)));
        }

        return _id;
    }

    if (!(obj instanceof Object)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Object got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    return _ref(Object.seal(new _CrioList2.default(obj)));
};

var createNewCrioMap = function createNewCrioMap(obj) {
    function _ref2(_id2) {
        if (!(_id2 instanceof _CrioMap2.default)) {
            throw new TypeError('Function return value violates contract, expected CrioMap got ' + (_id2 === null ? 'null' : (typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)) === 'object' && _id2.constructor ? _id2.constructor.name || '[Unknown Object]' : typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)));
        }

        return _id2;
    }

    if (!(obj instanceof Object)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Object got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    return _ref2(Object.seal(new _CrioMap2.default(obj)));
};

/**
 * Creates new Crio from passed object
 *
 * @param obj<Array|Object>
 * @returns {Array|Object}
 */
var createNewCrio = function createNewCrio(obj) {
    var frozenObj = (0, _deepFreeze2.default)(obj);

    if ((0, _checkers.isArray)(obj)) {
        return createNewCrioList(frozenObj);
    }

    if ((0, _checkers.isObject)(obj)) {
        return createNewCrioMap(frozenObj);
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
    function _ref5(_id5) {
        if (!(typeof _id5 === 'boolean')) {
            throw new TypeError('Function return value violates contract, expected bool got ' + (_id5 === null ? 'null' : (typeof _id5 === 'undefined' ? 'undefined' : _typeof(_id5)) === 'object' && _id5.constructor ? _id5.constructor.name || '[Unknown Object]' : typeof _id5 === 'undefined' ? 'undefined' : _typeof(_id5)));
        }

        return _id5;
    }

    return _ref5(Object.isFrozen(obj));
};

createNewCrio.isList = _crioCheckers.isCrioList;
createNewCrio.isMap = _crioCheckers.isCrioMap;

createNewCrio.list = createNewCrioList;
createNewCrio.list.of = function () {
    for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
        items[_key] = arguments[_key];
    }

    return createNewCrioList((0, _deepFreeze2.default)(items));
};

createNewCrio.map = createNewCrioMap;

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
exports.createNewCrioList = createNewCrioList;
exports.createNewCrioMap = createNewCrioMap;
exports.default = {
    createNewCrio: createNewCrio,
    createNewCrioList: createNewCrioList,
    createNewCrioMap: createNewCrioMap
};