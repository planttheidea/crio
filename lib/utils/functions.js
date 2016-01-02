'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shallowClone = exports.setReadonly = exports.setNonEnumerable = exports.setDeeplyNested = exports.forOwn = exports.forEach = undefined;

var _setPrototypeOf = require('./setPrototypeOf');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _checkers = require('./checkers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local imports

// local partial imports

var ArrayOrObject = function ArrayOrObject(input) {
    return Array.isArray(input) || input instanceof Object;
};

/**
 * Loops over array, executing each function
 * If one of the iterations returns false, the forEach is canceled
 *
 * @param arr<Array>
 * @param fn<Function>
 */

var forEach = function forEach(arr, fn) {
    if (!ArrayOrObject(arr)) {
        throw new TypeError('Value of argument "arr" violates contract, expected ArrayOrObject got ' + (arr === null ? 'null' : (typeof arr === 'undefined' ? 'undefined' : _typeof(arr)) === 'object' && arr.constructor ? arr.constructor.name || '[Unknown Object]' : typeof arr === 'undefined' ? 'undefined' : _typeof(arr)));
    }

    if (!(typeof fn === 'function')) {
        throw new TypeError('Value of argument "fn" violates contract, expected Function got ' + (fn === null ? 'null' : (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'object' && fn.constructor ? fn.constructor.name || '[Unknown Object]' : typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
    }

    if ((0, _checkers.isUndefined)(fn)) {
        return;
    }

    for (var i = 0, _len = arr.length; i < _len; i++) {
        if (!(typeof _len === 'number')) {
            throw new TypeError('Value of variable "len" violates contract, expected number got ' + (_len === null ? 'null' : (typeof _len === 'undefined' ? 'undefined' : _typeof(_len)) === 'object' && _len.constructor ? _len.constructor.name || '[Unknown Object]' : typeof _len === 'undefined' ? 'undefined' : _typeof(_len)));
        }

        fn(arr[i], i, arr);
    }
};

/**
 * Loops over array of own properties, executing each function
 * If one of the iterations returns false, the forEach is canceled
 *
 * @param obj<Object>
 * @param fn<Function>
 */
var forOwn = function forOwn(obj, fn) {
    if (!(obj instanceof Object)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Object got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    if (!(typeof fn === 'function')) {
        throw new TypeError('Value of argument "fn" violates contract, expected Function got ' + (fn === null ? 'null' : (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'object' && fn.constructor ? fn.constructor.name || '[Unknown Object]' : typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
    }

    if ((0, _checkers.isUndefined)(fn)) {
        return;
    }

    var keys = Object.getOwnPropertyNames(obj);

    for (var i = 0, _len2 = keys.length; i < _len2; i++) {
        if (!(typeof _len2 === 'number')) {
            throw new TypeError('Value of variable "len" violates contract, expected number got ' + (_len2 === null ? 'null' : (typeof _len2 === 'undefined' ? 'undefined' : _typeof(_len2)) === 'object' && _len2.constructor ? _len2.constructor.name || '[Unknown Object]' : typeof _len2 === 'undefined' ? 'undefined' : _typeof(_len2)));
        }

        if (fn(obj[keys[i]], keys[i], obj) === false) {
            break;
        }
    }
};

var setDeeplyNested = function setDeeplyNested(obj, keys, value, prototype) {
    function _ref(_id) {
        if (!ArrayOrObject(_id)) {
            throw new TypeError('Function return value violates contract, expected ArrayOrObject got ' + (_id === null ? 'null' : (typeof _id === 'undefined' ? 'undefined' : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === 'undefined' ? 'undefined' : _typeof(_id)));
        }

        return _id;
    }

    if (!ArrayOrObject(obj)) {
        throw new TypeError('Value of argument "obj" violates contract, expected ArrayOrObject got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    if (!Array.isArray(keys)) {
        throw new TypeError('Value of argument "keys" violates contract, expected Array got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
    }

    if (!(prototype instanceof Object)) {
        throw new TypeError('Value of argument "prototype" violates contract, expected Object got ' + (prototype === null ? 'null' : (typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)) === 'object' && prototype.constructor ? prototype.constructor.name || '[Unknown Object]' : typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)));
    }

    forEach(keys, function (key, index) {
        if (index !== keys.length - 1) {
            keys.shift();

            obj[key] = setDeeplyNested(obj[key] || Object.create(prototype), keys, value, prototype);
        } else if (!(0, _checkers.isUndefined)(key)) {
            obj[key] = value;
        }
    });

    (0, _setPrototypeOf2.default)(obj, prototype);

    return _ref(obj);
};

var setNonEnumerable = function setNonEnumerable(obj, prop, value) {
    function _ref2(_id2) {
        if (!ArrayOrObject(_id2)) {
            throw new TypeError('Function return value violates contract, expected ArrayOrObject got ' + (_id2 === null ? 'null' : (typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)) === 'object' && _id2.constructor ? _id2.constructor.name || '[Unknown Object]' : typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)));
        }

        return _id2;
    }

    if (!ArrayOrObject(obj)) {
        throw new TypeError('Value of argument "obj" violates contract, expected ArrayOrObject got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    Object.defineProperty(obj, prop, {
        enumerable: false,
        configurable: true,
        value: value,
        writable: true
    });

    return _ref2(obj);
};

var setReadonly = function setReadonly(obj, prop, value) {
    function _ref3(_id3) {
        if (!ArrayOrObject(_id3)) {
            throw new TypeError('Function return value violates contract, expected ArrayOrObject got ' + (_id3 === null ? 'null' : (typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)) === 'object' && _id3.constructor ? _id3.constructor.name || '[Unknown Object]' : typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)));
        }

        return _id3;
    }

    if (!ArrayOrObject(obj)) {
        throw new TypeError('Value of argument "obj" violates contract, expected ArrayOrObject got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    Object.defineProperty(obj, prop, {
        enumerable: false,
        configurable: false,
        value: value,
        writable: false
    });

    return _ref3(obj);
};

var shallowClone = function shallowClone(obj) {
    function _ref4(_id4) {
        if (!ArrayOrObject(_id4)) {
            throw new TypeError('Function return value violates contract, expected ArrayOrObject got ' + (_id4 === null ? 'null' : (typeof _id4 === 'undefined' ? 'undefined' : _typeof(_id4)) === 'object' && _id4.constructor ? _id4.constructor.name || '[Unknown Object]' : typeof _id4 === 'undefined' ? 'undefined' : _typeof(_id4)));
        }

        return _id4;
    }

    if (!ArrayOrObject(obj)) {
        throw new TypeError('Value of argument "obj" violates contract, expected ArrayOrObject got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    if ((0, _checkers.isArray)(obj)) {
        var i = obj.length,
            newArray = new Array(i);

        for (; i--;) {
            newArray[i] = obj[i];
        }

        return _ref4(newArray);
    }

    return _ref4(_extends({}, obj));
};

exports.forEach = forEach;
exports.forOwn = forOwn;
exports.setDeeplyNested = setDeeplyNested;
exports.setNonEnumerable = setNonEnumerable;
exports.setReadonly = setReadonly;
exports.shallowClone = shallowClone;
exports.default = {
    forEach: forEach,
    forOwn: forOwn,
    setDeeplyNested: setDeeplyNested,
    setNonEnumerable: setNonEnumerable,
    setReadonly: setReadonly,
    shallowClone: shallowClone
};