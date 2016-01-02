'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _array = require('core-js/es6/array');

var _array2 = _interopRequireDefault(_array);

var _symbol = require('core-js/es6/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _array3 = require('core-js/es7/array');

var _array4 = _interopRequireDefault(_array3);

var _object = require('core-js/es6/object');

var _object2 = _interopRequireDefault(_object);

var _object3 = require('core-js/es7/object');

var _object4 = _interopRequireDefault(_object3);

require('babel-regenerator-runtime');

var _coalesceCrio = require('./coalesceCrio');

var _coalesceCrio2 = _interopRequireDefault(_coalesceCrio);

var _crioDefaultMethods = require('./crioDefaultMethods');

var _crioDefaultMethods2 = _interopRequireDefault(_crioDefaultMethods);

var _crioHelperMethods = require('./crioHelperMethods');

var _crioHelperMethods2 = _interopRequireDefault(_crioHelperMethods);

var _crioIdentifier = require('./crioIdentifier');

var _checkers = require('../utils/checkers');

var _functions = require('../utils/functions');

var _crioIterator = require('./crioIterator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// polyfills

// local imports

// local partial imports

var ArrayOrObject = function ArrayOrObject(input) {
    return Array.isArray(input) || input instanceof Object;
};

var CUSTOM_METHODS = ['entries', 'filter', 'forEach', 'freeze', 'get', 'equals', 'hashCode', 'isFrozen', 'keys', 'map', 'merge', 'mutate', 'set', 'thaw', 'toArray', 'toJS', 'toObject', 'values'];

var coalesceResultIfApplicable = function coalesceResultIfApplicable(obj, result, prototype) {
    if (!(prototype instanceof Object)) {
        throw new TypeError('Value of argument "prototype" violates contract, expected Object got ' + (prototype === null ? 'null' : (typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)) === 'object' && prototype.constructor ? prototype.constructor.name || '[Unknown Object]' : typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)));
    }

    if (!!result) {
        if (obj.equals(result)) {
            return obj;
        }

        if ((0, _checkers.isArray)(obj) || (0, _checkers.isObject)(result)) {
            return (0, _coalesceCrio2.default)(obj, result, prototype);
        }
    }

    return result;
};

var setArrayOrObjectPrototypeMethods = function setArrayOrObjectPrototypeMethods(mainObject, prototype, prototypeMethods, mutableMethods, customMethods) {
    if (!(Array.isArray(mainObject) || mainObject instanceof Object)) {
        throw new TypeError('Value of argument "mainObject" violates contract, expected Array | Object got ' + (mainObject === null ? 'null' : (typeof mainObject === 'undefined' ? 'undefined' : _typeof(mainObject)) === 'object' && mainObject.constructor ? mainObject.constructor.name || '[Unknown Object]' : typeof mainObject === 'undefined' ? 'undefined' : _typeof(mainObject)));
    }

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

    var isPrototypeForArray = mainObject === Array;
    var mainPrototype = mainObject.prototype;
    var es6 = isPrototypeForArray ? _array2.default : _object2.default;
    var es7 = isPrototypeForArray ? _array4.default : _object4.default;

    var customPrototype = _extends({}, _crioDefaultMethods2.default);

    prototypeMethods.splice(prototypeMethods.indexOf('constructor'), 1);

    prototypeMethods.slice().forEach(function (method) {
        if (customMethods.indexOf(method) !== -1 || /__/.test(method) || /@@/.test(method)) {
            prototypeMethods.splice(prototypeMethods.indexOf(method), 1);
        }
    });

    customPrototype.entries = function entries() {
        return es6.entries(this);
    };

    customPrototype.filter = (function (isThisArray, filterPrototype) {
        var filterMethod = isThisArray ? _crioHelperMethods2.default.filterArray : _crioHelperMethods2.default.filterObject;

        return function filter(callback) {
            function _ref3(_id3) {
                if (!ArrayOrObject(_id3)) {
                    throw new TypeError('Function "filter" return value violates contract, expected ArrayOrObject got ' + (_id3 === null ? 'null' : (typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)) === 'object' && _id3.constructor ? _id3.constructor.name || '[Unknown Object]' : typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)));
                }

                return _id3;
            }

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            if (!callback) {
                return _ref3(this);
            }

            return _ref3(filterMethod.call(this, callback, filterPrototype));
        };
    })(isPrototypeForArray, prototype);

    customPrototype.forEach = isPrototypeForArray ? _crioHelperMethods2.default.forEachArray : _crioHelperMethods2.default.forEachObject;

    customPrototype.get = _crioHelperMethods2.default.get;

    customPrototype.keys = function keys() {
        return es6.keys(this);
    };

    customPrototype.map = (function (isThisArray, mapPrototype) {
        var mapMethod = isThisArray ? _crioHelperMethods2.default.mapArray : _crioHelperMethods2.default.mapObject;

        return function map(callback) {
            function _ref4(_id4) {
                if (!ArrayOrObject(_id4)) {
                    throw new TypeError('Function "map" return value violates contract, expected ArrayOrObject got ' + (_id4 === null ? 'null' : (typeof _id4 === 'undefined' ? 'undefined' : _typeof(_id4)) === 'object' && _id4.constructor ? _id4.constructor.name || '[Unknown Object]' : typeof _id4 === 'undefined' ? 'undefined' : _typeof(_id4)));
                }

                return _id4;
            }

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            if (!callback) {
                return _ref4(this);
            }

            return _ref4(mapMethod.call(this, callback, mapPrototype));
        };
    })(isPrototypeForArray, prototype);

    customPrototype.merge = _crioHelperMethods2.default.merge;

    customPrototype.mutate = function mutate(callback) {
        if (!(typeof callback === 'function')) {
            throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
        }

        if (!callback) {
            return this;
        }

        return _crioHelperMethods2.default.mutate.call(this, callback);
    };

    customPrototype.set = (function (newPrototype) {
        return function (keys, value) {
            if (!(Array.isArray(keys) || keys instanceof Object || typeof keys === 'string' || typeof keys === 'number')) {
                throw new TypeError('Value of argument "keys" violates contract, expected Array | Object | string | number got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
            }

            return _crioHelperMethods2.default.set.call(this, keys, value, newPrototype);
        };
    })(prototype);

    customPrototype.toArray = _crioHelperMethods2.default.toArray;

    customPrototype.toObject = _crioHelperMethods2.default.toObject;

    customPrototype.values = function values() {
        return (isPrototypeForArray ? es6 : es7).values(this);
    };

    CUSTOM_METHODS.forEach(function (method) {
        (0, _functions.setNonEnumerable)(prototype, method, customPrototype[method]);
    });

    var hasSymbol = typeof Symbol !== 'undefined';
    var hasObjectSpecificIteratorFunction = hasSymbol && !!mainPrototype[Symbol.iterator];

    (0, _functions.setNonEnumerable)(prototype, hasSymbol ? Symbol.iterator : _symbol2.default.iterator, hasObjectSpecificIteratorFunction ? mainPrototype[Symbol.iterator] : isPrototypeForArray ? _array2.default.iterator : _crioIterator.iteratorFunction);

    prototypeMethods.forEach(function (method) {
        var newMethod = undefined;

        if (!(newMethod == null || typeof newMethod === 'function')) {
            throw new TypeError('Value of variable "newMethod" violates contract, expected ?Function got ' + (newMethod === null ? 'null' : (typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)) === 'object' && newMethod.constructor ? newMethod.constructor.name || '[Unknown Object]' : typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)));
        }

        if (mutableMethods.indexOf(method) !== -1) {
            if (mainPrototype[method]) {
                newMethod = function () {
                    function _ref6(_id6) {
                        if (!ArrayOrObject(_id6)) {
                            throw new TypeError('Function return value violates contract, expected ArrayOrObject got ' + (_id6 === null ? 'null' : (typeof _id6 === 'undefined' ? 'undefined' : _typeof(_id6)) === 'object' && _id6.constructor ? _id6.constructor.name || '[Unknown Object]' : typeof _id6 === 'undefined' ? 'undefined' : _typeof(_id6)));
                        }

                        return _id6;
                    }

                    var clone = (0, _functions.shallowClone)(this);

                    if (!ArrayOrObject(clone)) {
                        throw new TypeError('Value of variable "clone" violates contract, expected ArrayOrObject got ' + (clone === null ? 'null' : (typeof clone === 'undefined' ? 'undefined' : _typeof(clone)) === 'object' && clone.constructor ? clone.constructor.name || '[Unknown Object]' : typeof clone === 'undefined' ? 'undefined' : _typeof(clone)));
                    }

                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    mainPrototype[method].apply(clone, args);

                    return _ref6((0, _coalesceCrio2.default)(this, clone, prototype));
                };

                if (!(newMethod == null || typeof newMethod === 'function')) {
                    throw new TypeError('Value of variable "newMethod" violates contract, expected ?Function got ' + (newMethod === null ? 'null' : (typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)) === 'object' && newMethod.constructor ? newMethod.constructor.name || '[Unknown Object]' : typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)));
                }
            } else {
                (function () {
                    var polyfilledMethod = es6[method] || es7[method];

                    if (polyfilledMethod) {
                        newMethod = function () {
                            function _ref7(_id7) {
                                if (!ArrayOrObject(_id7)) {
                                    throw new TypeError('Function return value violates contract, expected ArrayOrObject got ' + (_id7 === null ? 'null' : (typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)) === 'object' && _id7.constructor ? _id7.constructor.name || '[Unknown Object]' : typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)));
                                }

                                return _id7;
                            }

                            var clone = (0, _functions.shallowClone)(this);

                            if (!ArrayOrObject(clone)) {
                                throw new TypeError('Value of variable "clone" violates contract, expected ArrayOrObject got ' + (clone === null ? 'null' : (typeof clone === 'undefined' ? 'undefined' : _typeof(clone)) === 'object' && clone.constructor ? clone.constructor.name || '[Unknown Object]' : typeof clone === 'undefined' ? 'undefined' : _typeof(clone)));
                            }

                            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                args[_key2] = arguments[_key2];
                            }

                            polyfilledMethod.apply(undefined, [clone].concat(args));

                            return _ref7((0, _coalesceCrio2.default)(this, clone, prototype));
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
                    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        args[_key3] = arguments[_key3];
                    }

                    var result = mainPrototype[method].apply(this, args);

                    if (!(0, _checkers.isArray)(result) && !(0, _checkers.isObject)(result)) {
                        return result;
                    }

                    return coalesceResultIfApplicable(this, result, prototype);
                };

                if (!(newMethod == null || typeof newMethod === 'function')) {
                    throw new TypeError('Value of variable "newMethod" violates contract, expected ?Function got ' + (newMethod === null ? 'null' : (typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)) === 'object' && newMethod.constructor ? newMethod.constructor.name || '[Unknown Object]' : typeof newMethod === 'undefined' ? 'undefined' : _typeof(newMethod)));
                }
            } else {
                (function () {
                    var polyfilledMethod = es6[method] || es7[method];

                    if (polyfilledMethod) {
                        newMethod = function () {
                            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                                args[_key4] = arguments[_key4];
                            }

                            var result = polyfilledMethod.apply(undefined, [this].concat(args));

                            if (!(0, _checkers.isArray)(result) && !(0, _checkers.isObject)(result)) {
                                return result;
                            }

                            return coalesceResultIfApplicable(this, result, prototype);
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

    (0, _crioIdentifier.setCrioIdentifier)(prototype, mainObject);

    return prototype;
};

exports.default = setArrayOrObjectPrototypeMethods;
module.exports = exports['default'];