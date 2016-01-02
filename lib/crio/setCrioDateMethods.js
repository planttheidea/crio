'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _date = require('core-js/es6/date');

var _date2 = _interopRequireDefault(_date);

var _symbol = require('core-js/es6/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

require('babel-regenerator-runtime');

var _coalesceCrio = require('./coalesceCrio');

var _coalesceCrio2 = _interopRequireDefault(_coalesceCrio);

var _crioDefaultMethods = require('./crioDefaultMethods');

var _crioDefaultMethods2 = _interopRequireDefault(_crioDefaultMethods);

var _crioIdentifier = require('./crioIdentifier');

var _checkers = require('../utils/checkers');

var _functions = require('../utils/functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// polyfills

// local imports

// local partial imports

//import {
//    cloneObject
//} from '../utils/recursiveObjectModifications';

var CUSTOM_METHODS = ['equals', 'freeze', 'hashCode', 'isFrozen', 'thaw', 'toJS'];

var toDatePrimitive = function toDatePrimitive(hint) {
    var hasToString = !!this.toString;
    var hasValueOf = !!this.valueOf;

    if (hint === 'number') {
        if (hasValueOf) {
            return this.valueOf();
        }

        if (hasToString) {
            return this.toString();
        }

        throw new TypeError('No valueOf or toString defined.');
    }

    if (hasToString) {
        return this.toString();
    }

    if (hasValueOf) {
        return this.valueOf();
    }

    throw new TypeError('No valueOf or toString defined.');
};

var setDateMethods = function setDateMethods(prototype, prototypeMethods, mutableMethods, customMethods) {
    if (!(prototype instanceof Object)) {
        throw new TypeError('Value of argument "prototype" violates contract, expected Object got ' + (prototype === null ? 'null' : (typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)) === 'object' && prototype.constructor ? prototype.constructor.name || '[Unknown Object]' : typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)));
    }

    if (!Array.isArray(prototypeMethods)) {
        throw new TypeError('Value of argument "prototypeMethods" violates contract, expected Array got ' + (prototypeMethods === null ? 'null' : (typeof prototypeMethods === 'undefined' ? 'undefined' : _typeof(prototypeMethods)) === 'object' && prototypeMethods.constructor ? prototypeMethods.constructor.name || '[Unknown Object]' : typeof prototypeMethods === 'undefined' ? 'undefined' : _typeof(prototypeMethods)));
    }

    if (!Array.isArray(mutableMethods)) {
        throw new TypeError('Value of argument "mutableMethods" violates contract, expected Array got ' + (mutableMethods === null ? 'null' : (typeof mutableMethods === 'undefined' ? 'undefined' : _typeof(mutableMethods)) === 'object' && mutableMethods.constructor ? mutableMethods.constructor.name || '[Unknown Object]' : typeof mutableMethods === 'undefined' ? 'undefined' : _typeof(mutableMethods)));
    }

    if (!Array.isArray(customMethods)) {
        throw new TypeError('Value of argument "customMethods" violates contract, expected Array got ' + (customMethods === null ? 'null' : (typeof customMethods === 'undefined' ? 'undefined' : _typeof(customMethods)) === 'object' && customMethods.constructor ? customMethods.constructor.name || '[Unknown Object]' : typeof customMethods === 'undefined' ? 'undefined' : _typeof(customMethods)));
    }

    var mainPrototype = Date.prototype;

    var customPrototype = _extends({}, _crioDefaultMethods2.default);

    prototypeMethods.splice(prototypeMethods.indexOf('valueOf'), 1);

    prototypeMethods.slice().forEach(function (method) {
        if (customMethods.indexOf(method) !== -1 || /__/.test(method) || /@@/.test(method)) {
            prototypeMethods.splice(prototypeMethods.indexOf(method), 1);
        }
    });

    CUSTOM_METHODS.forEach(function (method) {
        (0, _functions.setNonEnumerable)(prototype, method, customPrototype[method]);
    });

    var hasSymbol = typeof Symbol !== 'undefined';
    var hasDateToPrimitive = !!mainPrototype[Symbol.toPrimitive];

    (0, _functions.setNonEnumerable)(prototype, hasSymbol ? Symbol.toPrimitive : _symbol2.default.toPrimitive, hasDateToPrimitive ? mainPrototype[Symbol.toPrimitive] : toDatePrimitive);

    (0, _functions.setNonEnumerable)(prototype, 'valueOf', function valueOf() {
        function _ref2(_id2) {
            if (!(typeof _id2 === 'number')) {
                throw new TypeError('Function "valueOf" return value violates contract, expected number got ' + (_id2 === null ? 'null' : (typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)) === 'object' && _id2.constructor ? _id2.constructor.name || '[Unknown Object]' : typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)));
            }

            return _id2;
        }

        return _ref2(mainPrototype.valueOf.call(this));
    });

    prototypeMethods.forEach(function (method) {
        var newMethod = undefined;

        if (!(newMethod == null || typeof newMethod === 'function')) {
            throw new TypeError('Value of variable "newMethod" violates contract, expected ?Function got ' + (newMethod === null ? 'null' : (typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)) === 'object' && newMethod.constructor ? newMethod.constructor.name || '[Unknown Object]' : typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)));
        }

        if (mutableMethods.indexOf(method) !== -1) {
            if (mainPrototype[method]) {
                newMethod = function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    function _ref3(_id3) {
                        if (!(_id3 instanceof Date)) {
                            throw new TypeError('Function return value violates contract, expected Date got ' + (_id3 === null ? 'null' : (typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)) === 'object' && _id3.constructor ? _id3.constructor.name || '[Unknown Object]' : typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)));
                        }

                        return _id3;
                    }

                    if (!Array.isArray(args)) {
                        throw new TypeError('Value of argument "args" violates contract, expected Array got ' + (args === null ? 'null' : (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.constructor ? args.constructor.name || '[Unknown Object]' : typeof args === 'undefined' ? 'undefined' : _typeof(args)));
                    }

                    var clone = new Date(this.valueOf());

                    mainPrototype[method].apply(clone, args);

                    return _ref3((0, _coalesceCrio2.default)(this, clone, prototype));
                };

                if (!(newMethod == null || typeof newMethod === 'function')) {
                    throw new TypeError('Value of variable "newMethod" violates contract, expected ?Function got ' + (newMethod === null ? 'null' : (typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)) === 'object' && newMethod.constructor ? newMethod.constructor.name || '[Unknown Object]' : typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)));
                }
            } else {
                (function () {
                    var polyfilledMethod = _date2.default[method];

                    if (polyfilledMethod) {
                        newMethod = function () {
                            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                args[_key2] = arguments[_key2];
                            }

                            function _ref4(_id4) {
                                if (!(_id4 instanceof Date)) {
                                    throw new TypeError('Function return value violates contract, expected Date got ' + (_id4 === null ? 'null' : (typeof _id4 === 'undefined' ? 'undefined' : _typeof(_id4)) === 'object' && _id4.constructor ? _id4.constructor.name || '[Unknown Object]' : typeof _id4 === 'undefined' ? 'undefined' : _typeof(_id4)));
                                }

                                return _id4;
                            }

                            if (!Array.isArray(args)) {
                                throw new TypeError('Value of argument "args" violates contract, expected Array got ' + (args === null ? 'null' : (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.constructor ? args.constructor.name || '[Unknown Object]' : typeof args === 'undefined' ? 'undefined' : _typeof(args)));
                            }

                            var clone = new Date(this.valueOf());

                            console.log(this.isFrozen());

                            polyfilledMethod.apply(undefined, [clone].concat(args));

                            return _ref4((0, _coalesceCrio2.default)(this, clone, prototype));
                        };

                        if (!(newMethod == null || typeof newMethod === 'function')) {
                            throw new TypeError('Value of variable "newMethod" violates contract, expected ?Function got ' + (newMethod === null ? 'null' : (typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)) === 'object' && newMethod.constructor ? newMethod.constructor.name || '[Unknown Object]' : typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)));
                        }
                    }
                })();
            }
        } else {
            if (mainPrototype[method]) {
                newMethod = function () {
                    var clone = new Date(this.valueOf());

                    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        args[_key3] = arguments[_key3];
                    }

                    var result = mainPrototype[method].apply(clone, args);

                    if (!(0, _checkers.isDate)(result)) {
                        return result;
                    }

                    return (0, _coalesceCrio2.default)(this, result, prototype);
                };

                if (!(newMethod == null || typeof newMethod === 'function')) {
                    throw new TypeError('Value of variable "newMethod" violates contract, expected ?Function got ' + (newMethod === null ? 'null' : (typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)) === 'object' && newMethod.constructor ? newMethod.constructor.name || '[Unknown Object]' : typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)));
                }
            } else {
                (function () {
                    var polyfilledMethod = _date2.default[method];

                    if (polyfilledMethod) {
                        newMethod = function () {
                            var clone = new Date(this.valueOf());

                            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                                args[_key4] = arguments[_key4];
                            }

                            var result = polyfilledMethod.apply(undefined, [clone].concat(args));

                            if (!(0, _checkers.isDate)(result)) {
                                return result;
                            }

                            return (0, _coalesceCrio2.default)(this, result, prototype);
                        };

                        if (!(newMethod == null || typeof newMethod === 'function')) {
                            throw new TypeError('Value of variable "newMethod" violates contract, expected ?Function got ' + (newMethod === null ? 'null' : (typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)) === 'object' && newMethod.constructor ? newMethod.constructor.name || '[Unknown Object]' : typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)));
                        }
                    }
                })();
            }
        }

        if ((0, _checkers.isFunction)(newMethod)) {
            (0, _functions.setNonEnumerable)(prototype, method, newMethod);
        }
    });

    (0, _crioIdentifier.setCrioIdentifier)(prototype, Date);

    return prototype;
};

exports.default = setDateMethods;
module.exports = exports['default'];