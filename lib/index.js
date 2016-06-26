'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CrioObject = exports.CrioArray = exports.isCrio = exports.getRealValue = exports.assignOnDeepMatch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('core-js/fn/symbol');

require('core-js/fn/object/entries');

require('core-js/fn/object/keys');

require('core-js/fn/object/values');

var _utils = require('./utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ARRAY_PROTOTYPE = Array.prototype;

var OBJECT_ENTRIES = Object.entries;
var OBJECT_FREEZE = Object.freeze;
var OBJECT_KEYS = Object.keys;
var OBJECT_OWN_PROPERTY_NAMES = Object.getOwnPropertyNames;
var OBJECT_PROTOTYPE = Object.prototype;
var OBJECT_VALUES = Object.values;

var NATIVE_KEYS = ['$$hashCode', '$$type', 'length'];

/**
 * is object a CrioArray or CrioObject
 *
 * @param {any} object
 * @returns {boolean}
 */
var isCrio = function isCrio(object) {
    return object instanceof CrioArray || object instanceof CrioObject;
};

/**
 * if the value is not a crio and is an array or object, convert
 * it to crio and return it, else just return it
 *
 * @param {any} value
 * @returns {any}
 */
var getRealValue = function getRealValue(value) {
    if (!isCrio(value)) {
        if ((0, _utils.isArray)(value)) {
            return new CrioArray(value);
        }

        if ((0, _utils.isObject)(value)) {
            return new CrioObject(value);
        }
    }

    return value;
};

/**
 * on deep match via setIn or mergeIn, perform assignment
 *
 * @param {object} object
 * @param {array<string>} keys
 * @param {any} value
 * @param {boolean} isMerge=false
 * @returns {CrioArray|CrioObject}
 */
var assignOnDeepMatch = function assignOnDeepMatch(object, keys, value) {
    var isMerge = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    var length = keys.length;
    var lastIndex = length - 1;
    var FinalCrio = (0, _utils.isArray)(object) ? CrioArray : CrioObject;

    var currentObject = object.thaw(),
        referenceToCurrentObject = currentObject,
        Crio = void 0;

    for (var index = 0; index < length; index++) {
        var key = keys[index] + '';
        var currentValue = currentObject[key];

        if (!(0, _utils.isArray)(currentValue) && !(0, _utils.isObject)(currentValue)) {
            currentObject[key] = {};
        }

        if (index === lastIndex) {
            Crio = (0, _utils.isArray)(currentObject) ? CrioArray : CrioObject;

            currentObject[key] = isMerge ? Crio.prototype.merge.apply(currentObject[key], value) : value;
        } else {
            currentObject = currentObject[key];
        }
    }

    var crioedObject = new FinalCrio(referenceToCurrentObject);

    return (0, _utils.returnObjectOnlyIfNew)(undefined, crioedObject);
};

var CrioArray = function () {
    function CrioArray(array) {
        _classCallCheck(this, CrioArray);

        if (isCrio(array)) {
            return array;
        }

        var length = array.length;

        for (var index = 0; index < length; index++) {
            var value = getRealValue(array[index]);

            (0, _utils.setReadOnly)(this, index, value, array.propertyIsEnumerable(index));
        }

        (0, _utils.setNonEnumerable)(this, 'length', length);

        return OBJECT_FREEZE(this);
    }

    /**
     * return unique hash of this values
     *
     * @return {number}
     */


    _createClass(CrioArray, [{
        key: 'concat',


        /**
         * based on items passed, combine with this to create new CrioArray
         *
         * @param {array<any>} items
         * @returns {CrioArray}
         */
        value: function concat() {
            for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
                items[_key] = arguments[_key];
            }

            if (!items.length) {
                return this;
            }

            return new CrioArray([].concat(_toConsumableArray(this), items));
        }

        /**
         * based on arguments passed, return new CrioArray with copyWithin applied
         *
         * @param {array<any>} args
         * @returns {CrioArray}
         */

    }, {
        key: 'copyWithin',
        value: function copyWithin() {
            var _thaw;

            var copiedClone = (_thaw = this.thaw()).copyWithin.apply(_thaw, arguments);
            var crioedClone = new CrioArray(copiedClone);

            return (0, _utils.returnObjectOnlyIfNew)(this, crioedClone);
        }

        /**
         * returns an oterable array of [index, value] pairs
         *
         * @returns {array<array>}
         */

    }, {
        key: 'entries',
        value: function entries() {
            return OBJECT_ENTRIES(this.thaw());
        }

        /**
         * is the object passed equal in value to this
         *
         * @param {any} object
         * @returns {boolean}
         */

    }, {
        key: 'equals',
        value: function equals(object) {
            if (!isCrio(object)) {
                return false;
            }

            return this.$$hashCode === object.$$hashCode;
        }

        /**
         * does the function applied to every value in this return truthy
         *
         * @param {function} fn
         * @param {any} thisArg
         * @returns {boolean}
         */

    }, {
        key: 'every',
        value: function every(fn) {
            var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];

            for (var index = 0, length = this.length; index < length; index++) {
                if (!fn.call(thisArg, this[index], index, this)) {
                    return false;
                }
            }

            return true;
        }

        /**
         * fill this based on arguments and return new CrioArray
         *
         * @param {array<any>} args
         * @returns {CrioArray}
         */

    }, {
        key: 'fill',
        value: function fill() {
            var clone = this.thaw();

            clone.fill.apply(clone, arguments);

            return new CrioArray(clone);
        }

        /**
         * based on return values of fn being truthy, return a new reduced CrioArray
         * from this
         *
         * @param {function} fn
         * @param {any} thisArg
         * @returns {CrioArray}
         */

    }, {
        key: 'filter',
        value: function filter(fn) {
            var _this = this;

            var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];

            var filteredArray = OBJECT_KEYS(this).reduce(function (array, key) {
                var result = fn.call(thisArg, _this[key], +key, _this);

                if (result) {
                    return array.concat(_this[key]);
                }

                return array;
            }, []);
            var crioedArray = new CrioArray(filteredArray);

            return (0, _utils.returnObjectOnlyIfNew)(this, crioedArray);
        }

        /**
         * find a specific value in the CrioArray and return it, else return undefined
         *
         * @param {function} fn
         * @param {any} thisArg
         * @returns {any}
         */

    }, {
        key: 'find',
        value: function find(fn) {
            var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];

            for (var index = 0; index < this.length; index++) {
                var value = this[index];

                if (fn.call(thisArg, value, index, this)) {
                    return value;
                }
            }

            return undefined;
        }

        /**
         * find a specific value in the CrioArray and return its index, else return -1
         *
         * @param {function} fn
         * @param {any} thisArg
         * @returns {number}
         */

    }, {
        key: 'findIndex',
        value: function findIndex(fn) {
            var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];

            for (var index = 0; index < this.length; index++) {
                if (fn.call(thisArg, this[index], index, this)) {
                    return index;
                }
            }

            return -1;
        }

        /**
         * iterate over this and execute fn for each value
         *
         * @param {function} fn
         * @param {any} thisArg
         */

    }, {
        key: 'forEach',
        value: function forEach(fn) {
            var _this2 = this;

            var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];

            this.keys().forEach(function (key) {
                fn.call(thisArg, _this2[key], +key, _this2);
            });
        }

        /**
         * retrieve the value at index from this
         *
         * @param {number} index
         * @returns {any}
         */

    }, {
        key: 'get',
        value: function get(index) {
            return this[index];
        }

        /**
         * return value at nested point based on keys in this
         *
         * @param {array<string|number>} keys
         * @return {any}
         */

    }, {
        key: 'getIn',
        value: function getIn(keys) {
            if (!(0, _utils.isArray)(keys)) {
                throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
            }

            var length = keys.length;
            var lastIndex = length - 1;

            var currentObject = this;

            for (var index = 0; index < length; index++) {
                var key = keys[index];

                if ((0, _utils.isUndefined)(currentObject[key]) || index === lastIndex) {
                    return currentObject[key];
                }

                currentObject = currentObject[key];
            }
        }
    }, {
        key: 'includes',


        /**
         * does this have a value of item contained in it
         *
         * @param {any} item
         * @returns {boolean}
         */
        value: function includes(item) {
            return this.indexOf(item) !== -1;
        }

        /**
         * what is the index of item in this (if not found, defaults to -1)
         *
         * @param {any} item
         * @returns {number}
         */

    }, {
        key: 'indexOf',
        value: function indexOf(item) {
            return ARRAY_PROTOTYPE.indexOf.call(this, item);
        }

        /**
         * joins this into string based on separator delimiting between values
         *
         * @param {string} separator
         * @returns {string}
         */

    }, {
        key: 'join',
        value: function join() {
            var _this3 = this;

            var separator = arguments.length <= 0 || arguments[0] === undefined ? ',' : arguments[0];

            var string = '';

            this.keys().forEach(function (key, keyIndex) {
                if (keyIndex !== 0) {
                    string += separator;
                }

                string += _this3[key].toString();
            });

            return string;
        }

        /**
         * returns keys of array (list of indices)
         *
         * @returns {array<string>}
         */

    }, {
        key: 'keys',
        value: function keys() {
            return OBJECT_KEYS(this);
        }

        /**
         * last index of item in this
         *
         * @param {any} item
         * @returns {number}
         */

    }, {
        key: 'lastIndexOf',
        value: function lastIndexOf(item) {
            return ARRAY_PROTOTYPE.lastIndexOf.call(this, item);
        }

        /**
         * iterate over this and assign values returned from calling
         * fn to a new CrioArray
         *
         * @param {function} fn
         * @param {any} thisArg
         * @returns {CrioArray}
         */

    }, {
        key: 'map',
        value: function map(fn) {
            var _this4 = this;

            var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];

            var mappedArray = this.keys().map(function (key) {
                return fn.call(thisArg, _this4[key], +key, _this4);
            });
            var crioedArray = new CrioArray(mappedArray);

            return (0, _utils.returnObjectOnlyIfNew)(this, crioedArray);
        }

        /**
         * shallowly merge each object into this
         *
         * @param {array<any>} objects
         * @returns {CrioArray}
         */

    }, {
        key: 'merge',
        value: function merge() {
            var clone = isCrio(this) ? this.thaw() : this;

            for (var _len2 = arguments.length, objects = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                objects[_key2] = arguments[_key2];
            }

            objects.forEach(function (object) {
                clone = clone.map(function (key, index) {
                    return object[index] || clone[index];
                });
            });

            var crioedArray = new CrioArray(clone);

            return (0, _utils.returnObjectOnlyIfNew)(this, crioedArray);
        }

        /**
         * deeply merge all objects into location specified by keys
         *
         * @param {array<string|number>} keys
         * @param {array<any>} objects
         * @returns {CrioArray}
         */

    }, {
        key: 'mergeIn',
        value: function mergeIn(keys) {
            if (!(0, _utils.isArray)(keys)) {
                throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
            }

            for (var _len3 = arguments.length, objects = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                objects[_key3 - 1] = arguments[_key3];
            }

            if (!objects.length) {
                return this;
            }

            return assignOnDeepMatch(this, keys, objects, true);
        }

        /**
         * convenience function to work with mutable version of this,
         * in case many modifications need to be made and performance
         * is paramount
         *
         * @param {function} fn
         * @param {any} thisArg
         * @returns {any}
         */

    }, {
        key: 'mutate',
        value: function mutate(fn) {
            var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];

            var result = fn.call(thisArg, this.thaw(), this);
            var crioedValue = getRealValue(result);

            return (0, _utils.returnObjectOnlyIfNew)(this, crioedValue);
        }

        /**
         * return array with last item removed
         *
         * @returns {CrioArray}
         */

    }, {
        key: 'pop',
        value: function pop() {
            return this.slice(0, this.length - 1);
        }

        /**
         * return new CrioArray with items pushed to it
         *
         * @param {array<any>} items
         * @returns {CrioArray}
         */

    }, {
        key: 'push',
        value: function push() {
            return this.concat.apply(this, arguments);
        }

        /**
         * based on fn, reduce the CrioArray and return either the crio of the reduced object
         * or the object itself
         *
         * @param {function} fn
         * @param {any} object
         * @param {any} thisArg
         * @returns {any}
         */

    }, {
        key: 'reduce',
        value: function reduce(fn, object) {
            var thisArg = arguments.length <= 2 || arguments[2] === undefined ? this : arguments[2];

            var reduction = ARRAY_PROTOTYPE.reduce.call(this, fn, object, thisArg);
            var crioedReduction = getRealValue(reduction);

            return !crioedReduction || !crioedReduction.$$hashCode ? crioedReduction : (0, _utils.returnObjectOnlyIfNew)(this, crioedReduction);
        }

        /**
         * based on fn, reduceRight the CrioArray and return either the crio of the reduced object
         * or the object itself
         *
         * @param {function} fn
         * @param {any} object
         * @param {any} thisArg
         * @returns {any}
         */

    }, {
        key: 'reduceRight',
        value: function reduceRight(fn, object) {
            var thisArg = arguments.length <= 2 || arguments[2] === undefined ? this : arguments[2];

            var reduction = ARRAY_PROTOTYPE.reduceRight.call(this, fn, object, thisArg);
            var crioedReduction = getRealValue(reduction);

            return !crioedReduction || !crioedReduction.$$hashCode ? crioedReduction : (0, _utils.returnObjectOnlyIfNew)(this, crioedReduction);
        }

        /**
         * set key to value in this and return new CrioArray
         *
         * @param {number} key
         * @param {any} value
         *
         * @returns {CrioArray}
         */

    }, {
        key: 'set',
        value: function set(key, value) {
            var index = +key;

            if (index > this.length) {
                throw new Error('Cannot set a key for sparsed array on crio objects.');
            }

            var clone = this.thaw();

            clone[index] = value;

            var crioedArray = new CrioArray(clone);

            return (0, _utils.returnObjectOnlyIfNew)(this, crioedArray);
        }

        /**
         * deeply assign value to key in this and return new CrioArray
         *
         * @param {array<string|number>} keys
         * @param {any} value
         * @returns {CrioArray}
         */

    }, {
        key: 'setIn',
        value: function setIn(keys, value) {
            if (!(0, _utils.isArray)(keys)) {
                throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
            }

            return assignOnDeepMatch(this, keys, value);
        }

        /**
         * return this with first item removed as new CrioArray
         *
         * @returns {CrioArray}
         */

    }, {
        key: 'shift',
        value: function shift() {
            return this.slice(1, this.length);
        }

        /**
         * return a section of this as a new CrioArray
         *
         * @param {array<number>} args
         * @returns {CrioArray}
         */

    }, {
        key: 'slice',
        value: function slice() {
            var _ARRAY_PROTOTYPE$slic;

            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            if (!args.length) {
                return this;
            }

            return new CrioArray((_ARRAY_PROTOTYPE$slic = ARRAY_PROTOTYPE.slice).call.apply(_ARRAY_PROTOTYPE$slic, [this].concat(args)));
        }
    }, {
        key: 'some',


        /**
         * does some of the returns from fn return truthy
         *
         * @param {function} fn
         * @param {any} thisArg
         * @returns {boolean}
         */
        value: function some(fn) {
            var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];

            for (var index = 0, length = this.length; index < length; index++) {
                if (fn.call(thisArg, this[index], index, this)) {
                    return true;
                }
            }

            return false;
        }

        /**
         * sort this and return it as a new CrioArray
         *
         * @param {function} fn
         * @returns {CrioArray}
         */

    }, {
        key: 'sort',
        value: function sort(fn) {
            var sortedArray = this.thaw().sort(fn);
            var crioedArray = new CrioArray(sortedArray);

            return (0, _utils.returnObjectOnlyIfNew)(this, crioedArray);
        }

        /**
         * based on args passed, splice this and return it as a new CrioArray
         *
         * @param {any} args
         * @returns {CrioArray}
         */

    }, {
        key: 'splice',
        value: function splice() {
            var clone = this.thaw();

            clone.splice.apply(clone, arguments);

            var crioedArray = new CrioArray(clone);

            return (0, _utils.returnObjectOnlyIfNew)(this, crioedArray);
        }

        /**
         * convert this back to a vanilla array
         *
         * @returns {array<any>}
         */

    }, {
        key: 'thaw',
        value: function thaw() {
            return ARRAY_PROTOTYPE.map.call(this, function (item) {
                return isCrio(item) ? item.thaw() : item;
            });
        }

        /**
         * convert this to a locale-specific string
         *
         * @returns {string}
         */

    }, {
        key: 'toLocaleString',
        value: function toLocaleString() {
            return this.toString();
        }

        /**
         * convert this to a string showing key: value pair combos
         *
         * @returns {string}
         */

    }, {
        key: 'toString',
        value: function toString() {
            var _this5 = this;

            var string = 'CrioArray {';

            this.keys().forEach(function (key, keyIndex) {
                if (keyIndex !== 0) {
                    string += ', ';
                }

                var value = _this5[key];
                var cleanValue = isCrio(value) ? value.toString() : '"' + value + '"';

                string += key + ': ' + cleanValue;
            });

            string += '}';

            return string;
        }

        /**
         * add items to the beginning of this and return it as a new CrioArray
         *
         * @param {array<any>} items
         * @returns {CrioArray}
         */

    }, {
        key: 'unshift',
        value: function unshift() {
            for (var _len5 = arguments.length, items = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                items[_key5] = arguments[_key5];
            }

            if (!items.length) {
                return this;
            }

            return new CrioArray([].concat(items, _toConsumableArray(this)));
        }

        /**
         * get the iterable array of values for this
         *
         * @returns {array<any>}
         */

    }, {
        key: 'values',
        value: function values() {
            return OBJECT_VALUES(this);
        }

        /**
         * make CrioArray into an iterable
         *
         * @returns {{next: (function(): {value: any, done: boolean})}}
         */

    }, {
        key: Symbol.iterator,
        value: function value() {
            var _this6 = this;

            var index = 0;

            return {
                next: function next() {
                    var value = _this6[index];
                    var done = index >= _this6.length;

                    index++;

                    return {
                        value: value,
                        done: done
                    };
                }
            };
        }
    }, {
        key: '$$hashCode',
        get: function get() {
            return (0, _utils.hash)(this.toString());
        }

        /**
         * return type of CrioArray
         *
         * @return {string}
         */

    }, {
        key: '$$type',
        get: function get() {
            return 'CrioArray';
        }
    }]);

    return CrioArray;
}();

var CrioObject = function () {
    function CrioObject(object) {
        _classCallCheck(this, CrioObject);

        if (isCrio(object)) {
            return object;
        }

        var keys = OBJECT_OWN_PROPERTY_NAMES(object).filter(function (key) {
            return NATIVE_KEYS.indexOf(key) === -1;
        });
        var length = keys.length;

        for (var index = 0; index < length; index++) {
            var key = keys[index];
            var value = getRealValue(object[key]);

            (0, _utils.setReadOnly)(this, key, value, object.propertyIsEnumerable(key));
        }

        return OBJECT_FREEZE(this);
    }

    /**
     * return unique hash of this values
     *
     * @return {number}
     */


    _createClass(CrioObject, [{
        key: 'entries',


        /**
         * return iterable array of keys in this
         *
         * @returns {array<string>}
         */
        value: function entries() {
            return OBJECT_ENTRIES(this);
        }

        /**
         * is the object passed equal in value to this
         *
         * @param {any} object
         * @returns {boolean}
         */

    }, {
        key: 'equals',
        value: function equals(object) {
            if (!isCrio(object)) {
                return false;
            }

            return this.$$hashCode === object.$$hashCode;
        }

        /**
         * return value at key in this
         *
         * @param {string} key
         * @returns {any}
         */

    }, {
        key: 'get',
        value: function get(key) {
            return this[key.toString()];
        }

        /**
         * return value at nested point based on keys in this
         * 
         * @param {array<string|number>} keys
         * @return {any}
         */

    }, {
        key: 'getIn',
        value: function getIn(keys) {
            if (!(0, _utils.isArray)(keys)) {
                throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
            }

            var length = keys.length;
            var lastIndex = length - 1;

            var currentObject = this;

            for (var index = 0; index < length; index++) {
                var key = keys[index];

                if ((0, _utils.isUndefined)(currentObject[key]) || index === lastIndex) {
                    return currentObject[key];
                }

                currentObject = currentObject[key];
            }
        }
    }, {
        key: 'hasOwnProperty',


        /**
         * return if this has the property passed
         *
         * @param {string} property
         * @returns {boolean}
         */
        value: function hasOwnProperty(property) {
            return OBJECT_PROTOTYPE.hasOwnProperty.call(this, property);
        }

        /**
         * return if this has the prototype of object passed
         *
         * @param {any} object
         * @returns {boolean}
         */

    }, {
        key: 'isPrototypeOf',
        value: function isPrototypeOf(object) {
            return OBJECT_PROTOTYPE.isPrototypeOf.call(this, object);
        }

        /**
         * return iterable of keys in this
         *
         * @returns {array<string>}
         */

    }, {
        key: 'keys',
        value: function keys() {
            return OBJECT_KEYS(this);
        }

        /**
         * shallowly merge all objects into this and return as new CrioObject
         *
         * @param {array<any>} objects
         * @returns {CrioObject}
         */

    }, {
        key: 'merge',
        value: function merge() {
            var clone = isCrio(this) ? this.thaw() : this;

            for (var _len6 = arguments.length, objects = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                objects[_key6] = arguments[_key6];
            }

            objects.forEach(function (object) {
                Object.assign(clone, object);
            });

            var crioedObject = new CrioObject(clone);

            return (0, _utils.returnObjectOnlyIfNew)(this, crioedObject);
        }

        /**
         * deeply merge all objects into this at key value determined by keys,
         * and return as a new CrioObject
         *
         * @param {array<string|number>} keys
         * @param {array<any>} objects
         * @returns {CrioObject}
         */

    }, {
        key: 'mergeIn',
        value: function mergeIn(keys) {
            if (!(0, _utils.isArray)(keys)) {
                throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
            }

            for (var _len7 = arguments.length, objects = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
                objects[_key7 - 1] = arguments[_key7];
            }

            if (!objects.length) {
                return this;
            }

            return assignOnDeepMatch(this, keys, objects, true);
        }

        /**
         * convenience function to work with mutable version of this,
         * in case many modifications need to be made and performance
         * is paramount
         *
         * @param {function} fn
         * @param {any} thisArg
         * @returns {any}
         */

    }, {
        key: 'mutate',
        value: function mutate(fn) {
            var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];

            var result = fn.call(thisArg, this.thaw(), this);
            var crioedValue = getRealValue(result);

            return (0, _utils.returnObjectOnlyIfNew)(this, crioedValue);
        }

        /**
         * determine if property passed is enumerable in this
         *
         * @param {string} property
         * @returns {boolean}
         */

    }, {
        key: 'propertyIsEnumerable',
        value: function propertyIsEnumerable(property) {
            return OBJECT_PROTOTYPE.propertyIsEnumerable.call(this, property);
        }

        /**
         * set value at key in this
         *
         * @param {string} key
         * @param {any} value
         * @returns {CrioObject}
         */

    }, {
        key: 'set',
        value: function set(key, value) {
            var clone = this.thaw();

            clone[key] = value;

            var crioedObject = new CrioObject(clone);

            return (0, _utils.returnObjectOnlyIfNew)(this, crioedObject);
        }

        /**
         * deeply set value at location determined by keys in this
         *
         * @param {array<string|number>} keys
         * @param {any} value
         * @returns {CrioObject}
         */

    }, {
        key: 'setIn',
        value: function setIn(keys, value) {
            if (!(0, _utils.isArray)(keys)) {
                throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
            }

            return assignOnDeepMatch(this, keys, value);
        }

        /**
         * convert this back to a vanilla array
         *
         * @returns {array<any>}
         */

    }, {
        key: 'thaw',
        value: function thaw() {
            var _this7 = this;

            return OBJECT_OWN_PROPERTY_NAMES(this).reduce(function (object, key) {
                if (NATIVE_KEYS.indexOf(key) === -1) {
                    var value = _this7[key];
                    var cleanValue = isCrio(value) ? value.thaw() : value;

                    (0, _utils.setStandard)(object, key, cleanValue, _this7.propertyIsEnumerable(key));
                }

                return object;
            }, {});
        }

        /**
         * convert this to a locale-specific string
         *
         * @returns {string}
         */

    }, {
        key: 'toLocaleString',
        value: function toLocaleString() {
            return this.toString();
        }

        /**
         * convert this to a string showing key: value pair combos
         *
         * @returns {string}
         */

    }, {
        key: 'toString',
        value: function toString() {
            var _this8 = this;

            var startString = 'CrioObject {';

            var string = startString;

            OBJECT_OWN_PROPERTY_NAMES(this).forEach(function (key) {
                if (NATIVE_KEYS.indexOf(key) === -1) {
                    if (string !== startString) {
                        string += ', ';
                    }

                    var value = _this8[key];
                    var cleanValue = isCrio(value) ? value.toString() : '"' + value + '"';

                    string += '"' + key + '": ' + cleanValue;
                }
            });

            string += '}';

            return string;
        }

        /**
         * get the valueOf for this
         *
         * @return {any}
         */

    }, {
        key: 'valueOf',
        value: function valueOf() {
            return OBJECT_PROTOTYPE.valueOf.call(this);
        }

        /**
         * get the iterable array of values for this
         *
         * @returns {array<any>}
         */

    }, {
        key: 'values',
        value: function values() {
            return OBJECT_VALUES(this);
        }

        /**
         * make CrioObject into an iterable
         *
         * @returns {{next: (function(): {value: any, done: boolean})}}
         */

    }, {
        key: Symbol.iterator,
        value: function value() {
            var _this9 = this;

            var keys = OBJECT_KEYS(this);

            var index = 0;

            return {
                next: function next() {
                    var key = keys[index];
                    var value = _this9[key];
                    var done = index >= _this9.length;

                    index++;

                    return {
                        value: value,
                        done: done
                    };
                }
            };
        }
    }, {
        key: '$$hashCode',
        get: function get() {
            return (0, _utils.hash)(this.toString());
        }

        /**
         * return type of CrioObject
         *
         * @return {string}
         */

    }, {
        key: '$$type',
        get: function get() {
            return 'CrioObject';
        }

        /**
         * return number of keys in object (getter here because it will show up in console,
         * whereas for CrioArray it is an expected property and is appropriately hidden)
         *
         * @return {number}
         */

    }, {
        key: 'length',
        get: function get() {
            var keys = OBJECT_OWN_PROPERTY_NAMES(this).filter(function (key) {
                return NATIVE_KEYS.indexOf(key) === -1;
            });

            return keys.length;
        }
    }]);

    return CrioObject;
}();

/**
 * entry function, assigning to either CrioArray or CrioObject or neither
 *
 * @param {any} object
 * @return {any}
 */


var crio = function crio(object) {
    if ((0, _utils.isArray)(object)) {
        return new CrioArray(object);
    }

    if ((0, _utils.isObject)(object)) {
        return new CrioObject(object);
    }

    return object;
};

exports.assignOnDeepMatch = assignOnDeepMatch;
exports.getRealValue = getRealValue;
exports.isCrio = isCrio;
exports.CrioArray = CrioArray;
exports.CrioObject = CrioObject;
exports.default = crio;