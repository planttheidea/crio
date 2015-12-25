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

var _toString = require('./toString');

var _toString2 = _interopRequireDefault(_toString);

var _checkers = require('./checkers');

var _functions = require('./functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// external dependencies

// local imports

// local partial imports

var hashString = function hashString(obj) {
    function _ref(_id) {
        if (!(typeof _id === 'number')) {
            throw new TypeError('Function return value violates contract, expected number got ' + (_id === null ? 'null' : (typeof _id === 'undefined' ? 'undefined' : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === 'undefined' ? 'undefined' : _typeof(_id)));
        }

        return _id;
    }

    if (!(0, _checkers.isString)(obj)) {
        obj = _toString2.default.call(obj);
    }

    var buf = new _buffer.Buffer(obj);

    return _ref((0, _murmurHashJs2.default)(buf));
};

var hashFunctionInObject = function hashFunctionInObject(obj) {
    function _ref2(_id2) {
        if (!(Array.isArray(_id2) || _id2 instanceof Object)) {
            throw new TypeError('Function return value violates contract, expected Array | Object got ' + (_id2 === null ? 'null' : (typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)) === 'object' && _id2.constructor ? _id2.constructor.name || '[Unknown Object]' : typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)));
        }

        return _id2;
    }

    if (!(Array.isArray(obj) || obj instanceof Object)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Array | Object got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    var loopFunction = (0, _checkers.isArray)(obj) ? _functions.forEach : _functions.forIn;

    if (!(Array.isArray(loopFunction) || loopFunction instanceof Object)) {
        throw new TypeError('Value of variable "loopFunction" violates contract, expected Array | Object got ' + (loopFunction === null ? 'null' : (typeof loopFunction === 'undefined' ? 'undefined' : _typeof(loopFunction)) === 'object' && loopFunction.constructor ? loopFunction.constructor.name || '[Unknown Object]' : typeof loopFunction === 'undefined' ? 'undefined' : _typeof(loopFunction)));
    }

    var cleanObj = (0, _checkers.isArray)(obj) ? [] : {};

    if (!(Array.isArray(cleanObj) || cleanObj instanceof Object)) {
        throw new TypeError('Value of variable "cleanObj" violates contract, expected Array | Object got ' + (cleanObj === null ? 'null' : (typeof cleanObj === 'undefined' ? 'undefined' : _typeof(cleanObj)) === 'object' && cleanObj.constructor ? cleanObj.constructor.name || '[Unknown Object]' : typeof cleanObj === 'undefined' ? 'undefined' : _typeof(cleanObj)));
    }

    loopFunction(obj, function (value, key) {
        if ((0, _checkers.isArray)(value) || (0, _checkers.isObject)(value)) {
            cleanObj[key] = hashFunctionInObject(value);
        } else if ((0, _checkers.isFunction)(value)) {
            cleanObj[key] = value.toString();
        } else {
            cleanObj[key] = value;
        }
    });

    return _ref2(cleanObj);
};

var hashObject = function hashObject(obj) {
    // just hash the value if its a string-like value
    if ((0, _checkers.isNull)(obj) || (0, _checkers.isUndefined)(obj) || (0, _checkers.isString)(obj) || (0, _checkers.isNumber)(obj) || (0, _checkers.isNAN)(obj)) {
        return hashString(obj);
    }

    // if its an array, check if a function exists in there
    if ((0, _checkers.isArray)(obj) || (0, _checkers.isObject)(obj)) {
        var objWithFunctionsHashed = hashFunctionInObject(obj);

        if (!(Array.isArray(objWithFunctionsHashed) || objWithFunctionsHashed instanceof Object)) {
            throw new TypeError('Value of variable "objWithFunctionsHashed" violates contract, expected Array | Object got ' + (objWithFunctionsHashed === null ? 'null' : (typeof objWithFunctionsHashed === 'undefined' ? 'undefined' : _typeof(objWithFunctionsHashed)) === 'object' && objWithFunctionsHashed.constructor ? objWithFunctionsHashed.constructor.name || '[Unknown Object]' : typeof objWithFunctionsHashed === 'undefined' ? 'undefined' : _typeof(objWithFunctionsHashed)));
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