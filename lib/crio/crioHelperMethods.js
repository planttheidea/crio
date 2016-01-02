'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toObject = exports.toArray = exports.set = exports.mutate = exports.merge = exports.mapObject = exports.mapArray = exports.get = exports.forEachObject = exports.forEachArray = exports.filterObject = exports.filterArray = undefined;

var _setPrototypeOf = require('../utils/setPrototypeOf');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _recursiveObjectModifications = require('../utils/recursiveObjectModifications');

var _checkers = require('../utils/checkers');

var _functions = require('../utils/functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local imports

// local partial imports

var OBJECT_CREATE = Object.create;

var ArrayOrObject = function ArrayOrObject(input) {
    return Array.isArray(input) || input instanceof Object;
};

var Keys = function Keys(input) {
    return typeof input === 'number' || typeof input === 'string' || Array.isArray(input);
};

var compareNewToOriginal = function compareNewToOriginal(originalObj, result) {
    function _ref(_id) {
        if (!ArrayOrObject(_id)) {
            throw new TypeError('Function return value violates contract, expected ArrayOrObject got ' + (_id === null ? 'null' : (typeof _id === 'undefined' ? 'undefined' : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === 'undefined' ? 'undefined' : _typeof(_id)));
        }

        return _id;
    }

    if (!ArrayOrObject(originalObj)) {
        throw new TypeError('Value of argument "originalObj" violates contract, expected ArrayOrObject got ' + (originalObj === null ? 'null' : (typeof originalObj === 'undefined' ? 'undefined' : _typeof(originalObj)) === 'object' && originalObj.constructor ? originalObj.constructor.name || '[Unknown Object]' : typeof originalObj === 'undefined' ? 'undefined' : _typeof(originalObj)));
    }

    if (!ArrayOrObject(result)) {
        throw new TypeError('Value of argument "result" violates contract, expected ArrayOrObject got ' + (result === null ? 'null' : (typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object' && result.constructor ? result.constructor.name || '[Unknown Object]' : typeof result === 'undefined' ? 'undefined' : _typeof(result)));
    }

    if ((0, _checkers.isFunction)(originalObj.equals) && originalObj.equals(result)) {
        return _ref(originalObj);
    }

    return _ref(result);
};

var isSingleKey = function isSingleKey(keys) {
    if (!Keys(keys)) {
        throw new TypeError('Value of argument "keys" violates contract, expected Keys got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
    }

    return (0, _checkers.isNumber)(keys) || (0, _checkers.isString)(keys);
};

var filterArray = function filterArray(callback, prototype) {
    var _this = this;

    function _ref2(_id2) {
        if (!ArrayOrObject(_id2)) {
            throw new TypeError('Function return value violates contract, expected ArrayOrObject got ' + (_id2 === null ? 'null' : (typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)) === 'object' && _id2.constructor ? _id2.constructor.name || '[Unknown Object]' : typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)));
        }

        return _id2;
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
    }

    if (!(prototype instanceof Object)) {
        throw new TypeError('Value of argument "prototype" violates contract, expected Object got ' + (prototype === null ? 'null' : (typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)) === 'object' && prototype.constructor ? prototype.constructor.name || '[Unknown Object]' : typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)));
    }

    var newArray = [];

    (0, _functions.forEach)(this, function (value, index) {
        if (callback(value, index, _this) !== false) {
            newArray[newArray.length] = value;
        }
    });

    (0, _setPrototypeOf2.default)(newArray, prototype);

    return _ref2(compareNewToOriginal(this, newArray));
};

var filterObject = function filterObject(callback, prototype) {
    function _ref3(_id3) {
        if (!(_id3 instanceof Object)) {
            throw new TypeError('Function return value violates contract, expected Object got ' + (_id3 === null ? 'null' : (typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)) === 'object' && _id3.constructor ? _id3.constructor.name || '[Unknown Object]' : typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)));
        }

        return _id3;
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
    }

    if (!(prototype instanceof Object)) {
        throw new TypeError('Value of argument "prototype" violates contract, expected Object got ' + (prototype === null ? 'null' : (typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)) === 'object' && prototype.constructor ? prototype.constructor.name || '[Unknown Object]' : typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)));
    }

    var filteredIterable = filterGeneratorObject.call(this, callback);

    var filteredIterableObject = OBJECT_CREATE(prototype);

    if (!(filteredIterableObject instanceof Object)) {
        throw new TypeError('Value of variable "filteredIterableObject" violates contract, expected Object got ' + (filteredIterableObject === null ? 'null' : (typeof filteredIterableObject === 'undefined' ? 'undefined' : _typeof(filteredIterableObject)) === 'object' && filteredIterableObject.constructor ? filteredIterableObject.constructor.name || '[Unknown Object]' : typeof filteredIterableObject === 'undefined' ? 'undefined' : _typeof(filteredIterableObject)));
    }

    (0, _functions.forEach)([].concat(_toConsumableArray(filteredIterable)), function (filteredIterableArrayItem) {
        var key = Object.keys(filteredIterableArrayItem)[0];

        filteredIterableObject[key] = filteredIterableArrayItem[key];
    });

    return _ref3(compareNewToOriginal(this, filteredIterableObject));
};

var filterGeneratorObject = regeneratorRuntime.mark(function filterGeneratorObject(callback) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref5, _step$value, key, value;

    return regeneratorRuntime.wrap(function filterGeneratorObject$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (typeof callback === 'function') {
                        _context.next = 2;
                        break;
                    }

                    throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));

                case 2:
                    _ref5 = this;

                    if (_ref5 && typeof _ref5[Symbol.iterator] === 'function') {
                        _context.next = 5;
                        break;
                    }

                    throw new TypeError('Expected _ref5 to be iterable, got ' + (_ref5 === null ? 'null' : (typeof _ref5 === 'undefined' ? 'undefined' : _typeof(_ref5)) === 'object' && _ref5.constructor ? _ref5.constructor.name || '[Unknown Object]' : typeof _ref5 === 'undefined' ? 'undefined' : _typeof(_ref5)));

                case 5:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 8;
                    _iterator = _ref5[Symbol.iterator]();

                case 10:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context.next = 20;
                        break;
                    }

                    _step$value = _step.value;
                    key = _step$value.key;
                    value = _step$value.value;

                    if (!(callback(value, key, this) !== false)) {
                        _context.next = 17;
                        break;
                    }

                    _context.next = 17;
                    return _defineProperty({}, key, value);

                case 17:
                    _iteratorNormalCompletion = true;
                    _context.next = 10;
                    break;

                case 20:
                    _context.next = 26;
                    break;

                case 22:
                    _context.prev = 22;
                    _context.t0 = _context['catch'](8);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                case 26:
                    _context.prev = 26;
                    _context.prev = 27;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 29:
                    _context.prev = 29;

                    if (!_didIteratorError) {
                        _context.next = 32;
                        break;
                    }

                    throw _iteratorError;

                case 32:
                    return _context.finish(29);

                case 33:
                    return _context.finish(26);

                case 34:
                case 'end':
                    return _context.stop();
            }
        }
    }, filterGeneratorObject, this, [[8, 22, 26, 34], [27,, 29, 33]]);
});

/**
 * Loops over the iterable, breaking when function returns false
 *
 * @param obj<Array|Object>
 * @param callback<Function>
 */
var forEachArray = function forEachArray(callback) {
    if (!(typeof callback === 'function')) {
        throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
    }

    for (var index = 0, _length = this.length; index < _length; index++) {
        if (!(typeof _length === 'number')) {
            throw new TypeError('Value of variable "length" violates contract, expected number got ' + (_length === null ? 'null' : (typeof _length === 'undefined' ? 'undefined' : _typeof(_length)) === 'object' && _length.constructor ? _length.constructor.name || '[Unknown Object]' : typeof _length === 'undefined' ? 'undefined' : _typeof(_length)));
        }

        if (callback(this[index], index, this) === false) {
            break;
        }
    }
};

/**
 * Loops over the iterable, breaking when function returns false
 *
 * @param obj<Array|Object>
 * @param callback<Function>
 */
var forEachObject = function forEachObject(callback) {
    if (!(typeof callback === 'function')) {
        throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
    }

    _ref8 = this;

    if (!(_ref8 && typeof _ref8[Symbol.iterator] === 'function')) {
        throw new TypeError('Expected _ref8 to be iterable, got ' + (_ref8 === null ? 'null' : (typeof _ref8 === 'undefined' ? 'undefined' : _typeof(_ref8)) === 'object' && _ref8.constructor ? _ref8.constructor.name || '[Unknown Object]' : typeof _ref8 === 'undefined' ? 'undefined' : _typeof(_ref8)));
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = _ref8[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _ref8;

            var _step2$value = _step2.value;
            var _key = _step2$value.key;
            var _value = _step2$value.value;

            if (callback(_value, _key, this) === false) {
                break;
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
};

var get = function get(keys) {
    var _this2 = this;

    if (!Keys(keys)) {
        throw new TypeError('Value of argument "keys" violates contract, expected Keys got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
    }

    if ((0, _checkers.isUndefined)(keys)) {
        return this;
    }

    if (isSingleKey(keys)) {
        return this[keys];
    }

    if ((0, _checkers.isArray)(keys)) {
        var _ret = (function () {
            var retrievalObj = _this2,
                returnValue = undefined;

            (0, _functions.forEach)(keys, function (key, index) {
                if ((0, _checkers.isUndefined)(retrievalObj[key])) {
                    return false;
                }

                if (index === keys.length - 1) {
                    returnValue = retrievalObj[key];
                } else {
                    retrievalObj = retrievalObj[key];
                }
            });

            return {
                v: returnValue
            };
        })();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }

    return this;
};

var getThawedObject = function getThawedObject(obj) {
    if (obj.thaw) {
        return obj.thaw();
    }

    return obj;
};

var mapArray = function mapArray(callback, prototype) {
    var _this3 = this;

    function _ref10(_id8) {
        if (!ArrayOrObject(_id8)) {
            throw new TypeError('Function return value violates contract, expected ArrayOrObject got ' + (_id8 === null ? 'null' : (typeof _id8 === 'undefined' ? 'undefined' : _typeof(_id8)) === 'object' && _id8.constructor ? _id8.constructor.name || '[Unknown Object]' : typeof _id8 === 'undefined' ? 'undefined' : _typeof(_id8)));
        }

        return _id8;
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
    }

    if (!(prototype instanceof Object)) {
        throw new TypeError('Value of argument "prototype" violates contract, expected Object got ' + (prototype === null ? 'null' : (typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)) === 'object' && prototype.constructor ? prototype.constructor.name || '[Unknown Object]' : typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)));
    }

    var mappedArray = [];

    (0, _functions.forEach)(this, function (value, index) {
        mappedArray[index] = callback(value, index, _this3);
    });

    (0, _setPrototypeOf2.default)(mappedArray, prototype);

    return _ref10(compareNewToOriginal(this, mappedArray));
};

var mapObject = function mapObject(callback, prototype) {
    function _ref11(_id9) {
        if (!(_id9 instanceof Object)) {
            throw new TypeError('Function return value violates contract, expected Object got ' + (_id9 === null ? 'null' : (typeof _id9 === 'undefined' ? 'undefined' : _typeof(_id9)) === 'object' && _id9.constructor ? _id9.constructor.name || '[Unknown Object]' : typeof _id9 === 'undefined' ? 'undefined' : _typeof(_id9)));
        }

        return _id9;
    }

    if (!(typeof callback === 'function')) {
        throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
    }

    if (!(prototype instanceof Object)) {
        throw new TypeError('Value of argument "prototype" violates contract, expected Object got ' + (prototype === null ? 'null' : (typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)) === 'object' && prototype.constructor ? prototype.constructor.name || '[Unknown Object]' : typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)));
    }

    var mappedIterable = mapGeneratorObject.call(this, callback);

    var mappedIterableObject = OBJECT_CREATE(prototype);

    if (!(mappedIterableObject instanceof Object)) {
        throw new TypeError('Value of variable "mappedIterableObject" violates contract, expected Object got ' + (mappedIterableObject === null ? 'null' : (typeof mappedIterableObject === 'undefined' ? 'undefined' : _typeof(mappedIterableObject)) === 'object' && mappedIterableObject.constructor ? mappedIterableObject.constructor.name || '[Unknown Object]' : typeof mappedIterableObject === 'undefined' ? 'undefined' : _typeof(mappedIterableObject)));
    }

    (0, _functions.forEach)([].concat(_toConsumableArray(mappedIterable)), function (mappedIterableArrayItem) {
        var key = Object.keys(mappedIterableArrayItem)[0];

        mappedIterableObject[key] = mappedIterableArrayItem[key];
    });

    return _ref11(compareNewToOriginal(this, mappedIterableObject));
};

var mapGeneratorObject = regeneratorRuntime.mark(function mapGeneratorObject(callback) {
    var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _ref13, _step3$value, _key2, _value2;

    return regeneratorRuntime.wrap(function mapGeneratorObject$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    if (typeof callback === 'function') {
                        _context2.next = 2;
                        break;
                    }

                    throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));

                case 2:
                    _ref13 = this;

                    if (_ref13 && typeof _ref13[Symbol.iterator] === 'function') {
                        _context2.next = 5;
                        break;
                    }

                    throw new TypeError('Expected _ref13 to be iterable, got ' + (_ref13 === null ? 'null' : (typeof _ref13 === 'undefined' ? 'undefined' : _typeof(_ref13)) === 'object' && _ref13.constructor ? _ref13.constructor.name || '[Unknown Object]' : typeof _ref13 === 'undefined' ? 'undefined' : _typeof(_ref13)));

                case 5:
                    _iteratorNormalCompletion3 = true;
                    _didIteratorError3 = false;
                    _iteratorError3 = undefined;
                    _context2.prev = 8;
                    _iterator3 = _ref13[Symbol.iterator]();

                case 10:
                    if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                        _context2.next = 19;
                        break;
                    }

                    _step3$value = _step3.value;
                    _key2 = _step3$value.key;
                    _value2 = _step3$value.value;
                    _context2.next = 16;
                    return _defineProperty({}, _key2, callback(_value2, _key2, this));

                case 16:
                    _iteratorNormalCompletion3 = true;
                    _context2.next = 10;
                    break;

                case 19:
                    _context2.next = 25;
                    break;

                case 21:
                    _context2.prev = 21;
                    _context2.t0 = _context2['catch'](8);
                    _didIteratorError3 = true;
                    _iteratorError3 = _context2.t0;

                case 25:
                    _context2.prev = 25;
                    _context2.prev = 26;

                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }

                case 28:
                    _context2.prev = 28;

                    if (!_didIteratorError3) {
                        _context2.next = 31;
                        break;
                    }

                    throw _iteratorError3;

                case 31:
                    return _context2.finish(28);

                case 32:
                    return _context2.finish(25);

                case 33:
                case 'end':
                    return _context2.stop();
            }
        }
    }, mapGeneratorObject, this, [[8, 21, 25, 33], [26,, 28, 32]]);
});

/**
 * Deeply merge objects or arrays
 *
 * @param target<any>
 * @param sources<Array>
 * @returns {*}
 */
var merge = function merge() {
    function _ref14(_id11) {
        if (!ArrayOrObject(_id11)) {
            throw new TypeError('Function return value violates contract, expected ArrayOrObject got ' + (_id11 === null ? 'null' : (typeof _id11 === 'undefined' ? 'undefined' : _typeof(_id11)) === 'object' && _id11.constructor ? _id11.constructor.name || '[Unknown Object]' : typeof _id11 === 'undefined' ? 'undefined' : _typeof(_id11)));
        }

        return _id11;
    }

    for (var _len = arguments.length, sources = Array(_len), _key3 = 0; _key3 < _len; _key3++) {
        sources[_key3] = arguments[_key3];
    }

    if (sources.length === 0) {
        return _ref14(this);
    }

    var target = getThawedObject(this);
    var isTargetArr = (0, _checkers.isArray)(target);
    var isTargetObj = (0, _checkers.isObject)(target);

    if (!isTargetArr && !isTargetObj) {
        return _ref14(sources[sources.length - 1]);
    }

    var dest = isTargetArr ? [] : {};

    if (!ArrayOrObject(dest)) {
        throw new TypeError('Value of variable "dest" violates contract, expected ArrayOrObject got ' + (dest === null ? 'null' : (typeof dest === 'undefined' ? 'undefined' : _typeof(dest)) === 'object' && dest.constructor ? dest.constructor.name || '[Unknown Object]' : typeof dest === 'undefined' ? 'undefined' : _typeof(dest)));
    }

    (0, _functions.forEach)(sources, function (source) {
        var realSource = getThawedObject(source);

        if ((0, _checkers.isArray)(realSource)) {
            dest = dest.concat(target || []);

            if (!ArrayOrObject(dest)) {
                throw new TypeError('Value of variable "dest" violates contract, expected ArrayOrObject got ' + (dest === null ? 'null' : (typeof dest === 'undefined' ? 'undefined' : _typeof(dest)) === 'object' && dest.constructor ? dest.constructor.name || '[Unknown Object]' : typeof dest === 'undefined' ? 'undefined' : _typeof(dest)));
            }

            (0, _functions.forEach)(realSource, function (value, i) {
                var realValue = getThawedObject(value);

                dest[i] = (0, _checkers.isObject)(realValue) || (0, _checkers.isArray)(realValue) ? merge(target[i], realValue) : realValue;
            });
        } else {
            dest = _extends({}, target || {});

            if (!ArrayOrObject(dest)) {
                throw new TypeError('Value of variable "dest" violates contract, expected ArrayOrObject got ' + (dest === null ? 'null' : (typeof dest === 'undefined' ? 'undefined' : _typeof(dest)) === 'object' && dest.constructor ? dest.constructor.name || '[Unknown Object]' : typeof dest === 'undefined' ? 'undefined' : _typeof(dest)));
            }

            (0, _functions.forOwn)(realSource, function (value, key) {
                var realValue = getThawedObject(value);

                dest[key] = (0, _checkers.isObject)(realValue) || (0, _checkers.isArray)(realValue) ? merge(target[key], realValue) : realValue;
            });
        }
    });

    return _ref14(compareNewToOriginal(this, (0, _recursiveObjectModifications.setDeepPrototype)(dest)));
};

var mutate = function mutate(callback) {
    if (!(typeof callback === 'function')) {
        throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
    }

    var result = callback.call(this, (0, _recursiveObjectModifications.cloneObject)(this, false), this);

    return compareNewToOriginal(this, (0, _recursiveObjectModifications.setDeepPrototype)(result));
};

var set = function set(keys, value, prototype) {
    if (!Keys(keys)) {
        throw new TypeError('Value of argument "keys" violates contract, expected Keys got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
    }

    if (!(prototype instanceof Object)) {
        throw new TypeError('Value of argument "prototype" violates contract, expected Object got ' + (prototype === null ? 'null' : (typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)) === 'object' && prototype.constructor ? prototype.constructor.name || '[Unknown Object]' : typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)));
    }

    if ((0, _checkers.isUndefined)(keys)) {
        return this;
    }

    var isThisFrozen = this.isFrozen();

    if (!(typeof isThisFrozen === 'boolean')) {
        throw new TypeError('Value of variable "isThisFrozen" violates contract, expected bool got ' + (isThisFrozen === null ? 'null' : (typeof isThisFrozen === 'undefined' ? 'undefined' : _typeof(isThisFrozen)) === 'object' && isThisFrozen.constructor ? isThisFrozen.constructor.name || '[Unknown Object]' : typeof isThisFrozen === 'undefined' ? 'undefined' : _typeof(isThisFrozen)));
    }

    var mutatedThis = isThisFrozen ? this.thaw() : this;

    if (isSingleKey(keys) || (0, _checkers.isObject)(keys) || (0, _checkers.isArray)(keys)) {
        var updatedObject = undefined;

        if (!(updatedObject == null || ArrayOrObject(updatedObject))) {
            throw new TypeError('Value of variable "updatedObject" violates contract, expected ?ArrayOrObject got ' + (updatedObject === null ? 'null' : (typeof updatedObject === 'undefined' ? 'undefined' : _typeof(updatedObject)) === 'object' && updatedObject.constructor ? updatedObject.constructor.name || '[Unknown Object]' : typeof updatedObject === 'undefined' ? 'undefined' : _typeof(updatedObject)));
        }

        if (isSingleKey(keys)) {
            mutatedThis[keys] = value;

            updatedObject = mutatedThis;

            if (!(updatedObject == null || ArrayOrObject(updatedObject))) {
                throw new TypeError('Value of variable "updatedObject" violates contract, expected ?ArrayOrObject got ' + (updatedObject === null ? 'null' : (typeof updatedObject === 'undefined' ? 'undefined' : _typeof(updatedObject)) === 'object' && updatedObject.constructor ? updatedObject.constructor.name || '[Unknown Object]' : typeof updatedObject === 'undefined' ? 'undefined' : _typeof(updatedObject)));
            }
        }

        if ((0, _checkers.isObject)(keys) || (0, _checkers.isArray)(keys)) {
            updatedObject = (0, _functions.setDeeplyNested)(mutatedThis, keys, value, prototype);

            if (!(updatedObject == null || ArrayOrObject(updatedObject))) {
                throw new TypeError('Value of variable "updatedObject" violates contract, expected ?ArrayOrObject got ' + (updatedObject === null ? 'null' : (typeof updatedObject === 'undefined' ? 'undefined' : _typeof(updatedObject)) === 'object' && updatedObject.constructor ? updatedObject.constructor.name || '[Unknown Object]' : typeof updatedObject === 'undefined' ? 'undefined' : _typeof(updatedObject)));
            }
        }

        return compareNewToOriginal(this, isThisFrozen ? updatedObject.freeze() : updatedObject);
    }
};

var toArray = function toArray() {
    function _ref16(_id13) {
        if (!ArrayOrObject(_id13)) {
            throw new TypeError('Function return value violates contract, expected ArrayOrObject got ' + (_id13 === null ? 'null' : (typeof _id13 === 'undefined' ? 'undefined' : _typeof(_id13)) === 'object' && _id13.constructor ? _id13.constructor.name || '[Unknown Object]' : typeof _id13 === 'undefined' ? 'undefined' : _typeof(_id13)));
        }

        return _id13;
    }

    if ((0, _checkers.isArray)(this)) {
        return _ref16(this);
    }

    return _ref16((0, _recursiveObjectModifications.setDeepPrototype)([].concat(_toConsumableArray(this.values()))));
};

var toObject = function toObject() {
    function _ref17(_id14) {
        if (!ArrayOrObject(_id14)) {
            throw new TypeError('Function return value violates contract, expected ArrayOrObject got ' + (_id14 === null ? 'null' : (typeof _id14 === 'undefined' ? 'undefined' : _typeof(_id14)) === 'object' && _id14.constructor ? _id14.constructor.name || '[Unknown Object]' : typeof _id14 === 'undefined' ? 'undefined' : _typeof(_id14)));
        }

        return _id14;
    }

    if ((0, _checkers.isObject)(this)) {
        return _ref17(this);
    }

    return _ref17((0, _recursiveObjectModifications.setDeepPrototype)(_extends({}, this)));
};

exports.filterArray = filterArray;
exports.filterObject = filterObject;
exports.forEachArray = forEachArray;
exports.forEachObject = forEachObject;
exports.get = get;
exports.mapArray = mapArray;
exports.mapObject = mapObject;
exports.merge = merge;
exports.mutate = mutate;
exports.set = set;
exports.toArray = toArray;
exports.toObject = toObject;
exports.default = {
    filterArray: filterArray,
    filterObject: filterObject,
    forEachArray: forEachArray,
    forEachObject: forEachObject,
    get: get,
    mapArray: mapArray,
    mapObject: mapObject,
    merge: merge,
    mutate: mutate,
    set: set,
    toArray: toArray,
    toObject: toObject
};