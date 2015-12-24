'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stringify = exports.splice = exports.forOwn = exports.forIn = exports.forEachRight = exports.forEach = undefined;

var _checkers = require('./checkers');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local partial imports

/**
 * Modified from Dojo's implementation, this is a helper function to escape sequences for non-visual
 * characters, double quotes, and backslashes, where they are surrounded with double quotes to form
 * a valid string literal
 *
 * @param str<String>
 * @returns escapedString<String>
 */
var escapeString = function escapeString(str) {
    function _ref(_id) {
        if (!(typeof _id === 'string')) {
            throw new TypeError('Function return value violates contract, expected string got ' + (_id === null ? 'null' : (typeof _id === 'undefined' ? 'undefined' : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === 'undefined' ? 'undefined' : _typeof(_id)));
        }

        return _id;
    }

    if (!(typeof str === 'string')) {
        throw new TypeError('Value of argument "str" violates contract, expected string got ' + (str === null ? 'null' : (typeof str === 'undefined' ? 'undefined' : _typeof(str)) === 'object' && str.constructor ? str.constructor.name || '[Unknown Object]' : typeof str === 'undefined' ? 'undefined' : _typeof(str)));
    }

    return _ref(('"' + str.replace(/(["\\])/g, '\\$1') + '"').replace(/[\f]/g, '\\f').replace(/[\b]/g, '\\b').replace(/[\n]/g, '\\n').replace(/[\t]/g, '\\t').replace(/[\r]/g, '\\r'));
};

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
 * @returns splicedArray<Array>
 */
var immutableSplice = function immutableSplice(obj, index) {
    if (!Array.isArray(obj)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Array got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    if (!(typeof index === 'number')) {
        throw new TypeError('Value of argument "index" violates contract, expected number got ' + (index === null ? 'null' : (typeof index === 'undefined' ? 'undefined' : _typeof(index)) === 'object' && index.constructor ? index.constructor.name || '[Unknown Object]' : typeof index === 'undefined' ? 'undefined' : _typeof(index)));
    }

    if (!(0, _checkers.isArray)(obj)) {
        throw new TypeError('Object passed to concat is not an array.');
    }

    if ((0, _checkers.isUndefined)(obj[index])) {
        return obj;
    }

    return [].concat(_toConsumableArray(obj.slice(0, index)), _toConsumableArray(obj.slice(index + 1)));
};

/**
 * Modified from Dojo's implementation, this function will convert anything into JSON, meaning
 * circular references will be coalesced
 *
 * @param obj<Any>
 * @param replacer<String[optional]>
 * @param spacer<String[optional]>
 * @returns json<String>
 */
var circularStringify = function circularStringify(obj, replacer, spacer) {
    if ((0, _checkers.isString)(replacer)) {
        spacer = replacer;
        replacer = null;
    }

    function stringify(objectToStringify) {
        var indent = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
        var key = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

        if ((0, _checkers.isFunction)(replacer)) {
            objectToStringify = replacer(key, objectToStringify);
        }

        var val = undefined;

        if ((0, _checkers.isNumber)(objectToStringify)) {
            return isFinite(objectToStringify) ? objectToStringify + '' : 'null';
        }

        if ((0, _checkers.isBoolean)(objectToStringify)) {
            return objectToStringify + '';
        }

        if ((0, _checkers.isNull)(objectToStringify)) {
            return 'null';
        }

        if ((0, _checkers.isString)(objectToStringify)) {
            return escapeString(objectToStringify);
        }

        if ((0, _checkers.isFunction)(objectToStringify) || (0, _checkers.isUndefined)(objectToStringify)) {
            return void 0; // undefined
        }

        // short-circuit for objects that support 'json' serialization
        // if they return 'self' then just pass-through...
        if ((0, _checkers.isFunction)(objectToStringify.toJSON)) {
            return stringify(objectToStringify.toJSON(key), indent, key);
        }

        if ((0, _checkers.isDate)(objectToStringify)) {
            return '\'{FullYear}-{Month+}-{Date}T{Hours}:{Minutes}:{Seconds}Z\''.replace(/\{(\w+)(\+)?\}/g, function (t, prop, plus) {
                var num = objectToStringify['getUTC' + prop]() + (plus ? 1 : 0);

                return num < 10 ? '0' + num : num;
            });
        }

        if (objectToStringify.valueOf() !== objectToStringify) {
            // primitive wrapper, try again unwrapped:
            return stringify(objectToStringify.valueOf(), indent, key);
        }

        var nextIndent = spacer ? indent + spacer : '';
        /* we used to test for DOM nodes and throw, but FF serializes them as {}, so cross-browser consistency is probably not efficiently attainable */

        var sep = spacer ? ' ' : '';
        var newLine = spacer ? '\n' : '';

        // array
        if ((0, _checkers.isArray)(objectToStringify)) {
            var itl = objectToStringify.length;

            if (!(typeof itl === 'number')) {
                throw new TypeError('Value of variable "itl" violates contract, expected number got ' + (itl === null ? 'null' : (typeof itl === 'undefined' ? 'undefined' : _typeof(itl)) === 'object' && itl.constructor ? itl.constructor.name || '[Unknown Object]' : typeof itl === 'undefined' ? 'undefined' : _typeof(itl)));
            }

            var res = [];

            for (key = 0; key < itl; key++) {
                var _obj = objectToStringify[key];

                val = stringify(_obj, nextIndent, key);

                if (!(0, _checkers.isString)(val)) {
                    val = 'null';
                }

                res.push(newLine + nextIndent + val);
            }

            return '[' + res.join(',') + newLine + indent + ']';
        }

        // generic object code path
        var output = [];

        for (key in objectToStringify) {
            var keyStr = undefined;

            if (!(keyStr == null || typeof keyStr === 'string')) {
                throw new TypeError('Value of variable "keyStr" violates contract, expected ?string got ' + (keyStr === null ? 'null' : (typeof keyStr === 'undefined' ? 'undefined' : _typeof(keyStr)) === 'object' && keyStr.constructor ? keyStr.constructor.name || '[Unknown Object]' : typeof keyStr === 'undefined' ? 'undefined' : _typeof(keyStr)));
            }

            if (objectToStringify.hasOwnProperty(key)) {
                if ((0, _checkers.isNumber)(key)) {
                    keyStr = '\'' + key + '\'';

                    if (!(keyStr == null || typeof keyStr === 'string')) {
                        throw new TypeError('Value of variable "keyStr" violates contract, expected ?string got ' + (keyStr === null ? 'null' : (typeof keyStr === 'undefined' ? 'undefined' : _typeof(keyStr)) === 'object' && keyStr.constructor ? keyStr.constructor.name || '[Unknown Object]' : typeof keyStr === 'undefined' ? 'undefined' : _typeof(keyStr)));
                    }
                } else if ((0, _checkers.isString)(key)) {
                    keyStr = escapeString(key);
                } else {
                    // skip non-string or number keys
                    continue;
                }

                val = stringify(objectToStringify[key], nextIndent, key);

                if (!(0, _checkers.isString)(val)) {
                    // skip non-serializable values
                    continue;
                }

                // At this point, the most non-IE browsers don't get in this branch
                // (they have native JSON), so push is definitely the way to
                output.push(newLine + nextIndent + keyStr + ':' + sep + val);
            }
        }

        return '{' + output.join(',') + newLine + indent + '}'; // String
    }

    return stringify(obj, '', '');
};

exports.forEach = forEach;
exports.forEachRight = forEachRight;
exports.forIn = forIn;
exports.forOwn = forOwn;
exports.splice = immutableSplice;
exports.stringify = circularStringify;
exports.default = {
    forEach: forEach,
    forEachRight: forEachRight,
    forIn: forIn,
    forOwn: forOwn,
    splice: immutableSplice,
    stringify: circularStringify
};