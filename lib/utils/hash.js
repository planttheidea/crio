'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hashString = exports.hashObject = undefined;

var _murmurHashJs = require('murmur-hash-js');

var _murmurHashJs2 = _interopRequireDefault(_murmurHashJs);

var _cereal = require('cereal');

var _cereal2 = _interopRequireDefault(_cereal);

var _buffer = require('buffer');

var _checkers = require('./checkers');

var _functions = require('./functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// external dependencies

// local partial imports

var ArrayOrObject = function ArrayOrObject(input) {
    return Array.isArray(input) || input instanceof Object;
};

var isConvertibleToCrio = function isConvertibleToCrio(obj) {
    function _ref(_id) {
        if (!(typeof _id === 'boolean')) {
            throw new TypeError('Function return value violates contract, expected bool got ' + (_id === null ? 'null' : (typeof _id === 'undefined' ? 'undefined' : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === 'undefined' ? 'undefined' : _typeof(_id)));
        }

        return _id;
    }

    return _ref((0, _checkers.isArray)(obj) || (0, _checkers.isDate)(obj) || (0, _checkers.isObject)(obj));
};

var hashString = function hashString(obj) {
    function _ref2(_id2) {
        if (!(typeof _id2 === 'number')) {
            throw new TypeError('Function return value violates contract, expected number got ' + (_id2 === null ? 'null' : (typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)) === 'object' && _id2.constructor ? _id2.constructor.name || '[Unknown Object]' : typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)));
        }

        return _id2;
    }

    if (!(0, _checkers.isString)(obj)) {
        obj = obj.toString();
    }

    var buf = new _buffer.Buffer(obj);

    return _ref2((0, _murmurHashJs2.default)(buf));
};

var hashFunctionInObject = function hashFunctionInObject(obj) {
    function _ref3(_id3) {
        if (!ArrayOrObject(_id3)) {
            throw new TypeError('Function return value violates contract, expected ArrayOrObject got ' + (_id3 === null ? 'null' : (typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)) === 'object' && _id3.constructor ? _id3.constructor.name || '[Unknown Object]' : typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)));
        }

        return _id3;
    }

    if (!ArrayOrObject(obj)) {
        throw new TypeError('Value of argument "obj" violates contract, expected ArrayOrObject got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    var loopFunction = (0, _checkers.isArray)(obj) ? _functions.forEach : _functions.forOwn;

    if (!ArrayOrObject(loopFunction)) {
        throw new TypeError('Value of variable "loopFunction" violates contract, expected ArrayOrObject got ' + (loopFunction === null ? 'null' : (typeof loopFunction === 'undefined' ? 'undefined' : _typeof(loopFunction)) === 'object' && loopFunction.constructor ? loopFunction.constructor.name || '[Unknown Object]' : typeof loopFunction === 'undefined' ? 'undefined' : _typeof(loopFunction)));
    }

    var cleanObj = (0, _checkers.isArray)(obj) ? [] : {};

    if (!ArrayOrObject(cleanObj)) {
        throw new TypeError('Value of variable "cleanObj" violates contract, expected ArrayOrObject got ' + (cleanObj === null ? 'null' : (typeof cleanObj === 'undefined' ? 'undefined' : _typeof(cleanObj)) === 'object' && cleanObj.constructor ? cleanObj.constructor.name || '[Unknown Object]' : typeof cleanObj === 'undefined' ? 'undefined' : _typeof(cleanObj)));
    }

    loopFunction(obj, function (value, key) {
        if (isConvertibleToCrio(value)) {
            cleanObj[key] = hashFunctionInObject(value);
        } else if ((0, _checkers.isFunction)(value)) {
            cleanObj[key] = value.toString();
        } else {
            cleanObj[key] = value;
        }
    });

    return _ref3(cleanObj);
};

var hashObject = function hashObject(obj) {
    // just hash the value if its a string-like value
    if ((0, _checkers.isNull)(obj) || (0, _checkers.isUndefined)(obj) || (0, _checkers.isString)(obj) || (0, _checkers.isNumber)(obj) || (0, _checkers.isNAN)(obj)) {
        return hashString(obj);
    }

    if ((0, _checkers.isDate)(obj)) {
        return hashString(Date.prototype.valueOf.call(obj));
    }

    // if its an array, check if a function exists in there
    if (isConvertibleToCrio(obj)) {
        var objWithFunctionsHashed = hashFunctionInObject(obj);

        if (!ArrayOrObject(objWithFunctionsHashed)) {
            throw new TypeError('Value of variable "objWithFunctionsHashed" violates contract, expected ArrayOrObject got ' + (objWithFunctionsHashed === null ? 'null' : (typeof objWithFunctionsHashed === 'undefined' ? 'undefined' : _typeof(objWithFunctionsHashed)) === 'object' && objWithFunctionsHashed.constructor ? objWithFunctionsHashed.constructor.name || '[Unknown Object]' : typeof objWithFunctionsHashed === 'undefined' ? 'undefined' : _typeof(objWithFunctionsHashed)));
        }

        return hashString(_cereal2.default.stringify(objWithFunctionsHashed));
    }

    return hashString(_cereal2.default.stringify(obj));
};

exports.hashObject = hashObject;
exports.hashString = hashString;
exports.default = {
    hashObject: hashObject,
    hashString: hashString
};