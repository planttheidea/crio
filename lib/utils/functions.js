'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.splice = exports.forOwn = exports.forIn = exports.forEachRight = exports.forEach = undefined;

var _checkers = require('./checkers');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local partial imports

/**
 * Loops over array, executing each function
 * If one of the iterations returns false, the forEach is canceled
 *
 * @param arr<Array>
 * @param fn<Function>
 * @param thisArg<Object[optional]>
 */
var forEach = function forEach(arr, fn, thisArg) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Value of argument "arr" violates contract, expected Array got ' + (arr === null ? 'null' : (typeof arr === 'undefined' ? 'undefined' : _typeof(arr)) === 'object' && arr.constructor ? arr.constructor.name || '[Unknown Object]' : typeof arr === 'undefined' ? 'undefined' : _typeof(arr)));
    }

    if (!(typeof fn === 'function')) {
        throw new TypeError('Value of argument "fn" violates contract, expected Function got ' + (fn === null ? 'null' : (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'object' && fn.constructor ? fn.constructor.name || '[Unknown Object]' : typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
    }

    if (!(thisArg == null || thisArg instanceof Object)) {
        throw new TypeError('Value of argument "thisArg" violates contract, expected ?Object got ' + (thisArg === null ? 'null' : (typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)) === 'object' && thisArg.constructor ? thisArg.constructor.name || '[Unknown Object]' : typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)));
    }

    if (!(0, _checkers.isArray)(arr)) {
        throw new TypeError('Object passed to forEach is not an array.');
    }

    if ((0, _checkers.isUndefined)(fn)) {
        return;
    }

    for (var _i = 0, _len = arr.length; _i < _len; _i++) {
        if (!(typeof _len === 'number')) {
            throw new TypeError('Value of variable "len" violates contract, expected number got ' + (_len === null ? 'null' : (typeof _len === 'undefined' ? 'undefined' : _typeof(_len)) === 'object' && _len.constructor ? _len.constructor.name || '[Unknown Object]' : typeof _len === 'undefined' ? 'undefined' : _typeof(_len)));
        }

        if (fn.call(thisArg, arr[_i], _i, arr) === false) {
            break;
        }
    }
};

var forEachRight = function forEachRight(arr, fn, thisArg) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Value of argument "arr" violates contract, expected Array got ' + (arr === null ? 'null' : (typeof arr === 'undefined' ? 'undefined' : _typeof(arr)) === 'object' && arr.constructor ? arr.constructor.name || '[Unknown Object]' : typeof arr === 'undefined' ? 'undefined' : _typeof(arr)));
    }

    if (!(typeof fn === 'function')) {
        throw new TypeError('Value of argument "fn" violates contract, expected Function got ' + (fn === null ? 'null' : (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'object' && fn.constructor ? fn.constructor.name || '[Unknown Object]' : typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
    }

    if (!(thisArg == null || thisArg instanceof Object)) {
        throw new TypeError('Value of argument "thisArg" violates contract, expected ?Object got ' + (thisArg === null ? 'null' : (typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)) === 'object' && thisArg.constructor ? thisArg.constructor.name || '[Unknown Object]' : typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)));
    }

    if (!(0, _checkers.isArray)(arr)) {
        throw new TypeError('Object passed to forEach is not an array.');
    }

    if ((0, _checkers.isUndefined)(fn)) {
        return;
    }

    for (var _i2 = arr.length; _i2--;) {
        if (!(typeof _i2 === 'number')) {
            throw new TypeError('Value of variable "i" violates contract, expected number got ' + (_i2 === null ? 'null' : (typeof _i2 === 'undefined' ? 'undefined' : _typeof(_i2)) === 'object' && _i2.constructor ? _i2.constructor.name || '[Unknown Object]' : typeof _i2 === 'undefined' ? 'undefined' : _typeof(_i2)));
        }

        if (fn.call(thisArg, arr[_i2], _i2, arr) === false) {
            break;
        }
    }
};

/**
 * Creates flattened array of keys to be used in object loops
 *
 * @param args<Array>
 * @returns keys<Array>
 */
var getKeys = function getKeys() {
    for (var _len2 = arguments.length, args = Array(_len2), _key = 0; _key < _len2; _key++) {
        args[_key] = arguments[_key];
    }

    if (!Array.isArray(args)) {
        throw new TypeError('Value of argument "args" violates contract, expected Array got ' + (args === null ? 'null' : (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.constructor ? args.constructor.name || '[Unknown Object]' : typeof args === 'undefined' ? 'undefined' : _typeof(args)));
    }

    var keys = [];

    forEach(args, function (keyArr) {
        keys.push.apply(keys, _toConsumableArray(keyArr));
    });

    return keys;
};

/**
 * Executes standard for loop using the keys provided, which is faster than a traditional for-in
 *
 * @param obj<Object>
 * @param keys<Array>
 * @param fn<Function>
 * @param thisArg<Object[optional]>
 */
var forLoopFromKeys = function forLoopFromKeys(obj, keys, fn, thisArg) {
    if (!(obj instanceof Object)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Object got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    if (!Array.isArray(keys)) {
        throw new TypeError('Value of argument "keys" violates contract, expected Array got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
    }

    if (!(typeof fn === 'function')) {
        throw new TypeError('Value of argument "fn" violates contract, expected Function got ' + (fn === null ? 'null' : (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'object' && fn.constructor ? fn.constructor.name || '[Unknown Object]' : typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
    }

    if (!(thisArg == null || thisArg instanceof Object)) {
        throw new TypeError('Value of argument "thisArg" violates contract, expected ?Object got ' + (thisArg === null ? 'null' : (typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)) === 'object' && thisArg.constructor ? thisArg.constructor.name || '[Unknown Object]' : typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)));
    }

    if (!(0, _checkers.isUndefined)(fn)) {
        for (var _i3 = 0, _len3 = keys.length; _i3 < _len3; _i3++) {
            if (!(typeof _len3 === 'number')) {
                throw new TypeError('Value of variable "len" violates contract, expected number got ' + (_len3 === null ? 'null' : (typeof _len3 === 'undefined' ? 'undefined' : _typeof(_len3)) === 'object' && _len3.constructor ? _len3.constructor.name || '[Unknown Object]' : typeof _len3 === 'undefined' ? 'undefined' : _typeof(_len3)));
            }

            var key = keys[_i3];

            if (!(typeof key === 'string')) {
                throw new TypeError('Value of variable "key" violates contract, expected string got ' + (key === null ? 'null' : (typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object' && key.constructor ? key.constructor.name || '[Unknown Object]' : typeof key === 'undefined' ? 'undefined' : _typeof(key)));
            }

            if (fn.call(thisArg, obj[key], key, obj) === false) {
                break;
            }
        }
    }
};

/**
 * Checks if object passed is a plain object, and if so then loops over all own keys + prototype keys
 *
 * @param obj<Object>
 * @param fn<Function>
 * @param thisArg<Object[optional]>
 */
var forIn = function forIn(obj, fn, thisArg) {
    if (!(obj instanceof Object)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Object got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    if (!(typeof fn === 'function')) {
        throw new TypeError('Value of argument "fn" violates contract, expected Function got ' + (fn === null ? 'null' : (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'object' && fn.constructor ? fn.constructor.name || '[Unknown Object]' : typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
    }

    if (!(thisArg == null || thisArg instanceof Object)) {
        throw new TypeError('Value of argument "thisArg" violates contract, expected ?Object got ' + (thisArg === null ? 'null' : (typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)) === 'object' && thisArg.constructor ? thisArg.constructor.name || '[Unknown Object]' : typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)));
    }

    if (!(0, _checkers.isObject)(obj)) {
        throw new TypeError('Object passed to forIn is not a plain object.');
    }

    if (!(0, _checkers.isUndefined)(fn)) {
        var keys = getKeys(Object.keys(obj), Object.keys(Object.getPrototypeOf(obj)));

        if (!Array.isArray(keys)) {
            throw new TypeError('Value of variable "keys" violates contract, expected Array got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
        }

        forLoopFromKeys(obj, keys, fn, thisArg);
    }
};

/**
 * Checks if object passed is a plain object, and if so then loops over all own keys
 *
 * @param obj<Object>
 * @param fn<Function>
 * @param thisArg<Object[optional]>
 */
var forOwn = function forOwn(obj, fn, thisArg) {
    if (!(obj instanceof Object)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Object got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    if (!(typeof fn === 'function')) {
        throw new TypeError('Value of argument "fn" violates contract, expected Function got ' + (fn === null ? 'null' : (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'object' && fn.constructor ? fn.constructor.name || '[Unknown Object]' : typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
    }

    if (!(thisArg == null || thisArg instanceof Object)) {
        throw new TypeError('Value of argument "thisArg" violates contract, expected ?Object got ' + (thisArg === null ? 'null' : (typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)) === 'object' && thisArg.constructor ? thisArg.constructor.name || '[Unknown Object]' : typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)));
    }

    if (!(0, _checkers.isObject)(obj)) {
        throw new TypeError('Object passed to forIn is not a plain object.');
    }

    if (!(0, _checkers.isUndefined)(fn)) {
        var keys = getKeys(Object.getOwnPropertyNames(obj));

        if (!Array.isArray(keys)) {
            throw new TypeError('Value of variable "keys" violates contract, expected Array got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
        }

        forLoopFromKeys(obj, keys, fn, thisArg);
    }
};

/**
 * Returns a new array with all values of the original array except for the value at the index passed
 *
 * @param obj<Array>
 * @param index<Number>
 * @param removeNum<Number>
 * @returns splicedArray<Array>
 */
var immutableSplice = function immutableSplice(obj, index, removeNum) {
    if (!Array.isArray(obj)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Array got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    if (!(typeof index === 'number')) {
        throw new TypeError('Value of argument "index" violates contract, expected number got ' + (index === null ? 'null' : (typeof index === 'undefined' ? 'undefined' : _typeof(index)) === 'object' && index.constructor ? index.constructor.name || '[Unknown Object]' : typeof index === 'undefined' ? 'undefined' : _typeof(index)));
    }

    if (!(typeof removeNum === 'number')) {
        throw new TypeError('Value of argument "removeNum" violates contract, expected number got ' + (removeNum === null ? 'null' : (typeof removeNum === 'undefined' ? 'undefined' : _typeof(removeNum)) === 'object' && removeNum.constructor ? removeNum.constructor.name || '[Unknown Object]' : typeof removeNum === 'undefined' ? 'undefined' : _typeof(removeNum)));
    }

    if (!(0, _checkers.isArray)(obj)) {
        throw new TypeError('Object passed to concat is not an array.');
    }

    if ((0, _checkers.isUndefined)(obj[index])) {
        return obj;
    }

    return [].concat(_toConsumableArray(obj.slice(0, index)), _toConsumableArray(obj.slice(index + removeNum)));
};

exports.forEach = forEach;
exports.forEachRight = forEachRight;
exports.forIn = forIn;
exports.forOwn = forOwn;
exports.splice = immutableSplice;
exports.default = {
    forEach: forEach,
    forEachRight: forEachRight,
    forIn: forIn,
    forOwn: forOwn,
    splice: immutableSplice
};