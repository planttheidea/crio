'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.iteratorFunction = exports.createIterator = undefined;

var _array = require('core-js/es6/array');

var _array2 = _interopRequireDefault(_array);

var _checkers = require('../utils/checkers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// polyfills

// local partial imports

var ArrayOrObject = function ArrayOrObject(input) {
    return Array.isArray(input) || input instanceof Object;
};

var iteratorFunction = function iteratorFunction() {
    var self = this;
    var isObjArray = (0, _checkers.isArray)(this);
    var keys = Object.getOwnPropertyNames(this);

    if (!Array.isArray(keys)) {
        throw new TypeError('Value of variable "keys" violates contract, expected Array got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
    }

    var length = isObjArray ? this.length : keys.length;

    if (!(typeof length === 'number')) {
        throw new TypeError('Value of variable "length" violates contract, expected number got ' + (length === null ? 'null' : (typeof length === 'undefined' ? 'undefined' : _typeof(length)) === 'object' && length.constructor ? length.constructor.name || '[Unknown Object]' : typeof length === 'undefined' ? 'undefined' : _typeof(length)));
    }

    var index = 0;

    return {
        next: function next() {
            var key = isObjArray ? index : keys[index];
            var value = isObjArray ? self[index] : self[keys[index]];

            var returnValue = {};

            if (index === length) {
                returnValue = {
                    done: true
                };
            } else {
                returnValue = {
                    done: false,
                    value: {
                        key: key,
                        value: value
                    }
                };
            }

            index++;

            return returnValue;
        }
    };
};

var createIterator = function createIterator(obj) {
    function _ref(_id) {
        if (!ArrayOrObject(_id)) {
            throw new TypeError('Function return value violates contract, expected ArrayOrObject got ' + (_id === null ? 'null' : (typeof _id === 'undefined' ? 'undefined' : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === 'undefined' ? 'undefined' : _typeof(_id)));
        }

        return _id;
    }

    if (!ArrayOrObject(obj)) {
        throw new TypeError('Value of argument "obj" violates contract, expected ArrayOrObject got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    var symbolIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : _array2.default.iterator;

    obj[symbolIterator] = iteratorFunction;

    return _ref(obj);
};

exports.createIterator = createIterator;
exports.iteratorFunction = iteratorFunction;
exports.default = {
    createIterator: createIterator,
    iteratorFunction: iteratorFunction
};