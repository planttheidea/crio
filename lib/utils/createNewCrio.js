'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createNewCrioMap = exports.createNewCrioList = exports.createNewCrio = undefined;

var _CrioDate = require('./../CrioDate');

var _CrioDate2 = _interopRequireDefault(_CrioDate);

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
 * Creates new CrioDate from passed object
 *
 * @param obj<Date>
 * @returns {CrioDate}
 */
var createNewCrioDate = function createNewCrioDate(obj) {
    function _ref(_id) {
        if (!(_id instanceof _CrioDate2.default)) {
            throw new TypeError('Function return value violates contract, expected CrioDate got ' + (_id === null ? 'null' : (typeof _id === 'undefined' ? 'undefined' : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === 'undefined' ? 'undefined' : _typeof(_id)));
        }

        return _id;
    }

    if (!(obj instanceof Date)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Date got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    return _ref(Object.freeze(new _CrioDate2.default((0, _deepFreeze2.default)(obj))));
};

/**
 * Creates new CrioList from passed object
 *
 * @param obj<Date>
 * @returns {CrioList}
 */
var createNewCrioList = function createNewCrioList(obj) {
    function _ref2(_id2) {
        if (!(_id2 instanceof _CrioList2.default)) {
            throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id2 === null ? 'null' : (typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)) === 'object' && _id2.constructor ? _id2.constructor.name || '[Unknown Object]' : typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)));
        }

        return _id2;
    }

    if (!(obj instanceof Object)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Object got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    return _ref2(Object.freeze(new _CrioList2.default((0, _deepFreeze2.default)(obj))));
};

/**
 * Creates new CrioMap from passed object
 *
 * @param obj<Date>
 * @returns {CrioMap}
 */
var createNewCrioMap = function createNewCrioMap(obj) {
    function _ref3(_id3) {
        if (!(_id3 instanceof _CrioMap2.default)) {
            throw new TypeError('Function return value violates contract, expected CrioMap got ' + (_id3 === null ? 'null' : (typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)) === 'object' && _id3.constructor ? _id3.constructor.name || '[Unknown Object]' : typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)));
        }

        return _id3;
    }

    if (!(obj instanceof Object)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Object got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    return _ref3(Object.freeze(new _CrioMap2.default((0, _deepFreeze2.default)(obj))));
};

/**
 * Creates new Crio from passed object
 *
 * @param obj<Array|Object>
 * @returns {Array|Object}
 */
var createNewCrio = function createNewCrio() {
    var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var isObjArray = (0, _checkers.isArray)(obj);
    var cleanObj = !isObjArray && (0, _checkers.isArrayLike)(obj) ? Array.prototype.slice.call(obj) : obj;

    if (isObjArray) {
        return createNewCrioList(cleanObj);
    }

    if ((0, _checkers.isDate)(obj)) {
        return createNewCrioDate(cleanObj);
    }

    if ((0, _checkers.isObject)(obj)) {
        return createNewCrioMap(cleanObj);
    }

    return obj;
};

/**
 * Creates new CrioDate from passed object
 *
 * @param obj<Date>
 * @returns {CrioDate}
 */
createNewCrio.date = function (obj) {
    return createNewCrioDate(obj);
};

/**
 * Creates new CrioDate from arguments passed
 *
 * @param args<Array>
 * @returns {CrioDate}
 */
createNewCrio.date.from = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    if (!Array.isArray(args)) {
        throw new TypeError('Value of argument "args" violates contract, expected Array got ' + (args === null ? 'null' : (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.constructor ? args.constructor.name || '[Unknown Object]' : typeof args === 'undefined' ? 'undefined' : _typeof(args)));
    }

    return createNewCrioDate(new (Function.prototype.bind.apply(Date, [null].concat(args)))());
};

/**
 * Creates new UTC-based CrioDate from arguments passed
 *
 * @param args<Array>
 * @returns {CrioDate}
 */
createNewCrio.date.utc = function () {
    var _Date;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    if (!Array.isArray(args)) {
        throw new TypeError('Value of argument "args" violates contract, expected Array got ' + (args === null ? 'null' : (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.constructor ? args.constructor.name || '[Unknown Object]' : typeof args === 'undefined' ? 'undefined' : _typeof(args)));
    }

    if (args.length === 1 && (0, _checkers.isDate)(args[0])) {
        var date = args[0];

        return createNewCrio(new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds())));
    }

    return createNewCrio(new Date((_Date = Date).UTC.apply(_Date, args)));
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
    function _ref7(_id7) {
        if (!(typeof _id7 === 'boolean')) {
            throw new TypeError('Function return value violates contract, expected bool got ' + (_id7 === null ? 'null' : (typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)) === 'object' && _id7.constructor ? _id7.constructor.name || '[Unknown Object]' : typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)));
        }

        return _id7;
    }

    return _ref7(Object.isFrozen(obj));
};

createNewCrio.isList = _crioCheckers.isCrioList;
createNewCrio.isMap = _crioCheckers.isCrioMap;

createNewCrio.list = createNewCrioList;

/**
 * Creates new CrioList from passed object
 *
 * @param items<Date>
 * @returns {CrioList}
 */
createNewCrio.list.of = function () {
    for (var _len3 = arguments.length, items = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        items[_key3] = arguments[_key3];
    }

    if (!Array.isArray(items)) {
        throw new TypeError('Value of argument "items" violates contract, expected Array got ' + (items === null ? 'null' : (typeof items === 'undefined' ? 'undefined' : _typeof(items)) === 'object' && items.constructor ? items.constructor.name || '[Unknown Object]' : typeof items === 'undefined' ? 'undefined' : _typeof(items)));
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