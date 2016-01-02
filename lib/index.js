'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _recursiveObjectModifications = require('./utils/recursiveObjectModifications');

var _checkers = require('./utils/checkers');

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// local imports

var defaults = {
    autoFreeze: true
};

var crio = function crio() {
    var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    if ((0, _checkers.isCrio)(obj)) {
        return obj;
    }

    if ((0, _checkers.isArray)(obj) || (0, _checkers.isObject)(obj) || (0, _checkers.isDate)(obj)) {
        var cleanedObj = (0, _checkers.isArrayLike)(obj) ? [].concat(_toConsumableArray(obj)) : obj;

        return (0, _recursiveObjectModifications.cloneObject)(cleanedObj, defaults.autoFreeze);
    }

    return obj;
};

crio.array = function () {
    var obj = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    function _ref2(_id2) {
        if (!Array.isArray(_id2)) {
            throw new TypeError('Function return value violates contract, expected Array got ' + (_id2 === null ? 'null' : (typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)) === 'object' && _id2.constructor ? _id2.constructor.name || '[Unknown Object]' : typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)));
        }

        return _id2;
    }

    if (!Array.isArray(obj)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Array got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    if ((0, _checkers.isCrio)(obj)) {
        return obj;
    }

    if ((0, _checkers.isArray)(obj) || (0, _checkers.isArrayLike)(obj)) {
        return _ref2(crio(obj));
    }

    throw new TypeError('Value passed to crio.array is not an Array.');
};

crio.array.from = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return crio.array(args);
};

crio.date = function () {
    var obj = arguments.length <= 0 || arguments[0] === undefined ? new Date() : arguments[0];

    function _ref3(_id3) {
        if (!(_id3 instanceof Date || _id3 instanceof Object)) {
            throw new TypeError('Function return value violates contract, expected Date | Object got ' + (_id3 === null ? 'null' : (typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)) === 'object' && _id3.constructor ? _id3.constructor.name || '[Unknown Object]' : typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)));
        }

        return _id3;
    }

    if (!(obj instanceof Date || obj instanceof Object)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Date | Object got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    if ((0, _checkers.isCrio)(obj)) {
        return _ref3(obj);
    }

    if ((0, _checkers.isDate)(obj)) {
        return _ref3(crio(obj));
    }

    throw new TypeError('Value passed to crio.date is not a Date.');
};

crio.date.from = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return crio.date(new (Function.prototype.bind.apply(Date, [null].concat(args)))());
};

crio.date.utc = function () {
    var _Date;

    if ((0, _checkers.isDate)(arguments.length <= 0 ? undefined : arguments[0])) {
        return crio.date(new Date(Date.UTC(arguments.length <= 0 ? undefined : arguments[0])));
    }

    return crio.date(new Date((_Date = Date).UTC.apply(_Date, arguments)));
};

crio.object = function () {
    var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    function _ref4(_id4) {
        if (!(_id4 instanceof Object)) {
            throw new TypeError('Function return value violates contract, expected Object got ' + (_id4 === null ? 'null' : (typeof _id4 === 'undefined' ? 'undefined' : _typeof(_id4)) === 'object' && _id4.constructor ? _id4.constructor.name || '[Unknown Object]' : typeof _id4 === 'undefined' ? 'undefined' : _typeof(_id4)));
        }

        return _id4;
    }

    if (!(obj instanceof Object)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Object got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    if ((0, _checkers.isCrio)(obj)) {
        return obj;
    }

    if ((0, _checkers.isObject)(obj)) {
        return _ref4(crio(obj));
    }

    throw new TypeError('Value passed to crio.object is not an Object.');
};

crio.setDefaults = function (newDefaults) {
    if (!(newDefaults instanceof Object)) {
        throw new TypeError('Value of argument "newDefaults" violates contract, expected Object got ' + (newDefaults === null ? 'null' : (typeof newDefaults === 'undefined' ? 'undefined' : _typeof(newDefaults)) === 'object' && newDefaults.constructor ? newDefaults.constructor.name || '[Unknown Object]' : typeof newDefaults === 'undefined' ? 'undefined' : _typeof(newDefaults)));
    }

    if (!(0, _checkers.isObject)(newDefaults)) {
        return;
    }

    defaults = _extends({}, defaults, newDefaults);
};
exports.default = crio;
module.exports = exports['default'];