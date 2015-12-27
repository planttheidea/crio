'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createNewCrio = require('./utils/createNewCrio');

var _checkers = require('./utils/checkers');

var _crioCheckers = require('./utils/crioCheckers');

var _crioFunctions = require('./utils/crioFunctions');

var _decorators = require('./utils/decorators');

var _functions = require('./utils/functions');

var _hash = require('./utils/hash');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local imports

// local partial imports

var isInvalidKey = function isInvalidKey(obj, index, length) {
    function _ref(_id) {
        if (!(typeof _id === 'boolean')) {
            throw new TypeError('Function return value violates contract, expected bool got ' + (_id === null ? 'null' : (typeof _id === 'undefined' ? 'undefined' : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === 'undefined' ? 'undefined' : _typeof(_id)));
        }

        return _id;
    }

    if (!(typeof index === 'number')) {
        throw new TypeError('Value of argument "index" violates contract, expected number got ' + (index === null ? 'null' : (typeof index === 'undefined' ? 'undefined' : _typeof(index)) === 'object' && index.constructor ? index.constructor.name || '[Unknown Object]' : typeof index === 'undefined' ? 'undefined' : _typeof(index)));
    }

    if (!(typeof length === 'number')) {
        throw new TypeError('Value of argument "length" violates contract, expected number got ' + (length === null ? 'null' : (typeof length === 'undefined' ? 'undefined' : _typeof(length)) === 'object' && length.constructor ? length.constructor.name || '[Unknown Object]' : typeof length === 'undefined' ? 'undefined' : _typeof(length)));
    }

    return _ref(index !== length - 1 && (0, _checkers.isUndefined)(obj));
};

var ArrayOrObject = function ArrayOrObject(input) {
    return Array.isArray(input) || input instanceof Object;
};

var CrioCollection = (function () {
    function CrioCollection(obj) {
        _classCallCheck(this, CrioCollection);

        if (!ArrayOrObject(obj)) {
            throw new TypeError('Value of argument "obj" violates contract, expected ArrayOrObject got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
        }

        (0, _decorators.staticProperty)(this, 'hashCode', (0, _hash.hashObject)(obj));
        (0, _decorators.readonlyProperty)(this, 'object', obj);
        (0, _decorators.readonlyProperty)(this, 'size', (0, _checkers.isArray)(obj) ? obj.length : Object.getOwnPropertyNames(obj).length);
    }

    /**
     * Creates empty CrioMap
     *
     * @returns {CrioMap}
     */

    _createClass(CrioCollection, [{
        key: 'clear',
        value: function clear() {
            function _ref2(_id2) {
                if (!(_id2 instanceof CrioCollection)) {
                    throw new TypeError('Function return value violates contract, expected CrioCollection got ' + (_id2 === null ? 'null' : (typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)) === 'object' && _id2.constructor ? _id2.constructor.name || '[Unknown Object]' : typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)));
                }

                return _id2;
            }

            var newObject = (0, _checkers.isArray)(this.object) ? [] : {};

            if (!ArrayOrObject(newObject)) {
                throw new TypeError('Value of variable "newObject" violates contract, expected ArrayOrObject got ' + (newObject === null ? 'null' : (typeof newObject === 'undefined' ? 'undefined' : _typeof(newObject)) === 'object' && newObject.constructor ? newObject.constructor.name || '[Unknown Object]' : typeof newObject === 'undefined' ? 'undefined' : _typeof(newObject)));
            }

            return _ref2((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrio)(newObject)));
        }

        /**
         * Alias for Array.prototype.entries
         *
         * @returns {Iterator}
         */

    }, {
        key: 'entries',
        value: function entries() {
            return (0, _functions.entries)(this.object);
        }

        /**
         * Tests if object passed is equal to the current Crio object
         *
         * @param crio2<Crio>
         * @returns {boolean}
         */

    }, {
        key: 'equals',
        value: function equals(crio2) {
            function _ref3(_id3) {
                if (!(typeof _id3 === 'boolean')) {
                    throw new TypeError('Function return value violates contract, expected bool got ' + (_id3 === null ? 'null' : (typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)) === 'object' && _id3.constructor ? _id3.constructor.name || '[Unknown Object]' : typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)));
                }

                return _id3;
            }

            if (!(crio2 instanceof Object)) {
                throw new TypeError('Value of argument "crio2" violates contract, expected Object got ' + (crio2 === null ? 'null' : (typeof crio2 === 'undefined' ? 'undefined' : _typeof(crio2)) === 'object' && crio2.constructor ? crio2.constructor.name || '[Unknown Object]' : typeof crio2 === 'undefined' ? 'undefined' : _typeof(crio2)));
            }

            if ((0, _checkers.isValueless)(crio2)) {
                return false;
            }

            return _ref3((0, _crioCheckers.isSameCrio)(this, crio2));
        }

        /**
         * Executes forEach over values stored in this.object
         *
         * @param fn<Function>
         * @param thisArg<Object[optional]>
         * @returns {CrioList}
         */

    }, {
        key: 'forEach',
        value: function forEach(fn, thisArg) {
            if (!(typeof fn === 'function')) {
                throw new TypeError('Value of argument "fn" violates contract, expected Function got ' + (fn === null ? 'null' : (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'object' && fn.constructor ? fn.constructor.name || '[Unknown Object]' : typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
            }

            if (!(thisArg == null || thisArg instanceof Object)) {
                throw new TypeError('Value of argument "thisArg" violates contract, expected ?Object got ' + (thisArg === null ? 'null' : (typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)) === 'object' && thisArg.constructor ? thisArg.constructor.name || '[Unknown Object]' : typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)));
            }

            var loopFunction = (0, _checkers.isArray)(this.object) ? _functions.forEach : _functions.forIn;

            if (!(typeof loopFunction === 'function')) {
                throw new TypeError('Value of variable "loopFunction" violates contract, expected Function got ' + (loopFunction === null ? 'null' : (typeof loopFunction === 'undefined' ? 'undefined' : _typeof(loopFunction)) === 'object' && loopFunction.constructor ? loopFunction.constructor.name || '[Unknown Object]' : typeof loopFunction === 'undefined' ? 'undefined' : _typeof(loopFunction)));
            }

            loopFunction(this.object, fn, thisArg);

            return this;
        }

        /**
         * Based on key(s) passed, retrieves value(s) associated. If multiple keys are passed,
         * a CrioMap of key:value pairs are returned, otherwise the value itself is returned. If the value
         * is an array or object, then it is returned as a CrioList or CrioMap to allow for chaining.
         *
         * @param keys<Array>
         * @returns {*}
         */

    }, {
        key: 'get',
        value: function get() {
            var _this = this;

            for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
                keys[_key] = arguments[_key];
            }

            if (!Array.isArray(keys)) {
                throw new TypeError('Value of argument "keys" violates contract, expected Array got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
            }

            if (keys.length === 0) {
                return this;
            }

            if (keys.length === 1) {
                var value = this.object[keys[0]];

                if ((0, _crioCheckers.isConvertibleToCrio)(value)) {
                    return (0, _crioFunctions.coalesceCrioValue)(this, (0, _createNewCrio.createNewCrio)(this.object[keys[0]]));
                }

                return value;
            }

            var keyMap = (0, _createNewCrio.createNewCrio)({});

            if (!(keyMap instanceof CrioCollection)) {
                throw new TypeError('Value of variable "keyMap" violates contract, expected CrioCollection got ' + (keyMap === null ? 'null' : (typeof keyMap === 'undefined' ? 'undefined' : _typeof(keyMap)) === 'object' && keyMap.constructor ? keyMap.constructor.name || '[Unknown Object]' : typeof keyMap === 'undefined' ? 'undefined' : _typeof(keyMap)));
            }

            (0, _functions.forEach)(keys, function (key) {
                keyMap = keyMap.set(key, _this.object[key]);

                if (!(keyMap instanceof CrioCollection)) {
                    throw new TypeError('Value of variable "keyMap" violates contract, expected CrioCollection got ' + (keyMap === null ? 'null' : (typeof keyMap === 'undefined' ? 'undefined' : _typeof(keyMap)) === 'object' && keyMap.constructor ? keyMap.constructor.name || '[Unknown Object]' : typeof keyMap === 'undefined' ? 'undefined' : _typeof(keyMap)));
                }
            });

            return (0, _crioFunctions.coalesceCrioValue)(this, keyMap);
        }

        /**
         * Returns value of deeply nested item in this.object based on keys array. if value is an
         * array or object, then a CrioList or CrioMap is returned to allow for chaining.
         *
         * @param keys
         * @returns {Array|Object}
         */

    }, {
        key: 'getIn',
        value: function getIn() {
            var keys = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            var retValue = this.object,
                foundKeyMatch = true;

            (0, _functions.forEach)(keys, function (key, index) {
                var value = retValue[key];

                if (isInvalidKey(value, index, keys.length)) {
                    foundKeyMatch = false;
                    return false;
                }

                retValue = (0, _crioCheckers.isCrio)(value) ? value.object : value;
            });

            if (foundKeyMatch) {
                if ((0, _crioCheckers.isConvertibleToCrio)(retValue)) {
                    return (0, _crioFunctions.coalesceCrioValue)(this, (0, _createNewCrio.createNewCrio)(retValue));
                }

                return retValue;
            }

            return undefined;
        }

        /**
         * Returns true if size is 0
         *
         * @returns {boolean}
         */

    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.size === 0;
        }

        /**
         * Retrieves an array of the keys for this.object
         *
         * @returns {Array}
         */

    }, {
        key: 'keys',
        value: function keys() {
            return Object.keys(this.object);
        }

        /**
         * Accepts any number of parameters and merges them into a new object / array
         *
         * @param sources<Array>
         * @returns {CrioCollection}
         */

    }, {
        key: 'merge',
        value: function merge() {
            for (var _len2 = arguments.length, sources = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                sources[_key2] = arguments[_key2];
            }

            function _ref6(_id6) {
                if (!(_id6 instanceof CrioCollection)) {
                    throw new TypeError('Function return value violates contract, expected CrioCollection got ' + (_id6 === null ? 'null' : (typeof _id6 === 'undefined' ? 'undefined' : _typeof(_id6)) === 'object' && _id6.constructor ? _id6.constructor.name || '[Unknown Object]' : typeof _id6 === 'undefined' ? 'undefined' : _typeof(_id6)));
                }

                return _id6;
            }

            if (!Array.isArray(sources)) {
                throw new TypeError('Value of argument "sources" violates contract, expected Array got ' + (sources === null ? 'null' : (typeof sources === 'undefined' ? 'undefined' : _typeof(sources)) === 'object' && sources.constructor ? sources.constructor.name || '[Unknown Object]' : typeof sources === 'undefined' ? 'undefined' : _typeof(sources)));
            }

            var mergedObject = _crioFunctions.merge.apply(undefined, [this.object].concat(sources));

            if (!ArrayOrObject(mergedObject)) {
                throw new TypeError('Value of variable "mergedObject" violates contract, expected ArrayOrObject got ' + (mergedObject === null ? 'null' : (typeof mergedObject === 'undefined' ? 'undefined' : _typeof(mergedObject)) === 'object' && mergedObject.constructor ? mergedObject.constructor.name || '[Unknown Object]' : typeof mergedObject === 'undefined' ? 'undefined' : _typeof(mergedObject)));
            }

            return _ref6((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrio)(mergedObject)));
        }

        /**
         * Accepts any number of parameters and merges them into a new object / array retrieved
         * based on the keys passed
         *
         * @param keys<Array>
         * @param sources<Array>
         * @returns {CrioCollection}
         */

    }, {
        key: 'mergeIn',
        value: function mergeIn(keys) {
            for (var _len3 = arguments.length, sources = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                sources[_key3 - 1] = arguments[_key3];
            }

            function _ref7(_id7) {
                if (!(_id7 instanceof CrioCollection)) {
                    throw new TypeError('Function return value violates contract, expected CrioCollection got ' + (_id7 === null ? 'null' : (typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)) === 'object' && _id7.constructor ? _id7.constructor.name || '[Unknown Object]' : typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)));
                }

                return _id7;
            }

            if (!Array.isArray(keys)) {
                throw new TypeError('Value of argument "keys" violates contract, expected Array got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
            }

            if (!Array.isArray(sources)) {
                throw new TypeError('Value of argument "sources" violates contract, expected Array got ' + (sources === null ? 'null' : (typeof sources === 'undefined' ? 'undefined' : _typeof(sources)) === 'object' && sources.constructor ? sources.constructor.name || '[Unknown Object]' : typeof sources === 'undefined' ? 'undefined' : _typeof(sources)));
            }

            if (keys.length === 0) {
                return _ref7(this.merge.apply(this, sources));
            }

            var objectToMerge = this.getIn(keys).object;

            if (!ArrayOrObject(objectToMerge)) {
                throw new TypeError('Value of variable "objectToMerge" violates contract, expected ArrayOrObject got ' + (objectToMerge === null ? 'null' : (typeof objectToMerge === 'undefined' ? 'undefined' : _typeof(objectToMerge)) === 'object' && objectToMerge.constructor ? objectToMerge.constructor.name || '[Unknown Object]' : typeof objectToMerge === 'undefined' ? 'undefined' : _typeof(objectToMerge)));
            }

            var objectToSet = _crioFunctions.merge.apply(undefined, sources);

            if (!ArrayOrObject(objectToSet)) {
                throw new TypeError('Value of variable "objectToSet" violates contract, expected ArrayOrObject got ' + (objectToSet === null ? 'null' : (typeof objectToSet === 'undefined' ? 'undefined' : _typeof(objectToSet)) === 'object' && objectToSet.constructor ? objectToSet.constructor.name || '[Unknown Object]' : typeof objectToSet === 'undefined' ? 'undefined' : _typeof(objectToSet)));
            }

            if ((0, _crioCheckers.isConvertibleToCrio)(objectToMerge)) {
                objectToSet = (0, _crioFunctions.merge)(objectToMerge, objectToSet);

                if (!ArrayOrObject(objectToSet)) {
                    throw new TypeError('Value of variable "objectToSet" violates contract, expected ArrayOrObject got ' + (objectToSet === null ? 'null' : (typeof objectToSet === 'undefined' ? 'undefined' : _typeof(objectToSet)) === 'object' && objectToSet.constructor ? objectToSet.constructor.name || '[Unknown Object]' : typeof objectToSet === 'undefined' ? 'undefined' : _typeof(objectToSet)));
                }
            }

            return _ref7((0, _crioFunctions.getCrioInstance)(this, this.setIn(keys, (0, _crioFunctions.merge)(objectToMerge, objectToSet))));
        }

        /**
         * Accepts a function which will receive single parameter of a thawed Crio object. This allows
         * working with the object in a standard mutable way, and whatever you return in the function will
         * be either be converted back to a CrioCollection (if array or object) or simply returned.
         *
         * @param callback<Function>
         * @returns {any}
         */

    }, {
        key: 'mutate',
        value: function mutate(callback) {
            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            var thawedObject = this.thaw();

            if (!ArrayOrObject(thawedObject)) {
                throw new TypeError('Value of variable "thawedObject" violates contract, expected ArrayOrObject got ' + (thawedObject === null ? 'null' : (typeof thawedObject === 'undefined' ? 'undefined' : _typeof(thawedObject)) === 'object' && thawedObject.constructor ? thawedObject.constructor.name || '[Unknown Object]' : typeof thawedObject === 'undefined' ? 'undefined' : _typeof(thawedObject)));
            }

            var mutatedThis = callback(thawedObject) || thawedObject;

            if ((0, _crioCheckers.isConvertibleToCrio)(mutatedThis)) {
                return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrio)(mutatedThis));
            }

            return mutatedThis;
        }

        /**
         * Based on values in this.object, sets the values called out by key and returns a new CrioList.
         * If key is a string or number, then the value where the property / index is equal to key is updated
         * to value. If key is an object, then each property in the object will set the equivalent property
         * in this.object to the value in the key object.
         *
         * @param key<Array|String>
         * @param value<Any[optional]>
         * @returns {Object}
         */

    }, {
        key: 'set',
        value: function set(key, value) {
            if (!(key instanceof Object || typeof key === 'string' || typeof key === 'number')) {
                throw new TypeError('Value of argument "key" violates contract, expected Object | string | number got ' + (key === null ? 'null' : (typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object' && key.constructor ? key.constructor.name || '[Unknown Object]' : typeof key === 'undefined' ? 'undefined' : _typeof(key)));
            }

            if ((0, _checkers.isUndefined)(key)) {
                throw new TypeError('The set method requires a key.');
            }

            var newValue = this.thaw();

            if (!ArrayOrObject(newValue)) {
                throw new TypeError('Value of variable "newValue" violates contract, expected ArrayOrObject got ' + (newValue === null ? 'null' : (typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' && newValue.constructor ? newValue.constructor.name || '[Unknown Object]' : typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)));
            }

            if ((0, _checkers.isObject)(key)) {
                (0, _functions.forIn)(key, function (value, index) {
                    newValue[index] = value;
                });
            } else {
                newValue[key] = value;
            }

            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrio)(newValue));
        }

        /**
         * Based on array of keys, sets deeply-nested value in object
         *
         * @param keys<Array>
         * @param value<any>
         * @returns {Object}
         */

    }, {
        key: 'setIn',
        value: function setIn() {
            var keys = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
            var value = arguments[1];

            function _ref9(_id9) {
                if (!(_id9 == null || _id9 instanceof CrioCollection)) {
                    throw new TypeError('Function return value violates contract, expected ?CrioCollection got ' + (_id9 === null ? 'null' : (typeof _id9 === 'undefined' ? 'undefined' : _typeof(_id9)) === 'object' && _id9.constructor ? _id9.constructor.name || '[Unknown Object]' : typeof _id9 === 'undefined' ? 'undefined' : _typeof(_id9)));
                }

                return _id9;
            }

            if (!Array.isArray(keys)) {
                throw new TypeError('Value of argument "keys" violates contract, expected Array got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
            }

            if ((0, _checkers.isUndefined)(value)) {
                throw new TypeError('You need to pass in a value to apply for the key.');
            }

            var updatedObject = (0, _functions.setDeeplyNested)(this.thaw(), keys, value);

            return _ref9((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrio)(updatedObject)));
        }

        /**
         * Returns a new vanillaJS object of the Crio's object that has been unfrzon
         *
         * @returns thawedCrio<Array|Object>
         */

    }, {
        key: 'thaw',
        value: function thaw() {
            function _ref10(_id10) {
                if (!(Array.isArray(_id10) || _id10 instanceof Object)) {
                    throw new TypeError('Function return value violates contract, expected Array | Object got ' + (_id10 === null ? 'null' : (typeof _id10 === 'undefined' ? 'undefined' : _typeof(_id10)) === 'object' && _id10.constructor ? _id10.constructor.name || '[Unknown Object]' : typeof _id10 === 'undefined' ? 'undefined' : _typeof(_id10)));
                }

                return _id10;
            }

            return _ref10((0, _crioFunctions.thaw)(this));
        }

        /**
         * Converts CrioCollection to a CrioList, where each item is a key:value object from the original map
         *
         * @returns {CrioCollection}
         */

    }, {
        key: 'toCollection',
        value: function toCollection() {
            function _ref11(_id11) {
                if (!(_id11 instanceof CrioCollection)) {
                    throw new TypeError('Function return value violates contract, expected CrioCollection got ' + (_id11 === null ? 'null' : (typeof _id11 === 'undefined' ? 'undefined' : _typeof(_id11)) === 'object' && _id11.constructor ? _id11.constructor.name || '[Unknown Object]' : typeof _id11 === 'undefined' ? 'undefined' : _typeof(_id11)));
                }

                return _id11;
            }

            return _ref11(this.mutate(function (mutableObject) {
                var collection = [];

                (0, _functions.forIn)(mutableObject, function (value, key) {
                    collection.push(_defineProperty({}, key, value));
                });

                return collection;
            }));
        }

        /**
         * Alias of Array.prototype.toLocaleString
         *
         * @returns {string}
         */

    }, {
        key: 'toLocaleString',
        value: function toLocaleString() {
            function _ref12(_id12) {
                if (!(typeof _id12 === 'string')) {
                    throw new TypeError('Function return value violates contract, expected string got ' + (_id12 === null ? 'null' : (typeof _id12 === 'undefined' ? 'undefined' : _typeof(_id12)) === 'object' && _id12.constructor ? _id12.constructor.name || '[Unknown Object]' : typeof _id12 === 'undefined' ? 'undefined' : _typeof(_id12)));
                }

                return _id12;
            }

            return _ref12((0, _crioFunctions.convertToString)(this, true));
        }

        /**
         * Alias of Array.prototype.toString
         *
         * @returns {string}
         */

    }, {
        key: 'toString',
        value: function toString() {
            function _ref13(_id13) {
                if (!(typeof _id13 === 'string')) {
                    throw new TypeError('Function return value violates contract, expected string got ' + (_id13 === null ? 'null' : (typeof _id13 === 'undefined' ? 'undefined' : _typeof(_id13)) === 'object' && _id13.constructor ? _id13.constructor.name || '[Unknown Object]' : typeof _id13 === 'undefined' ? 'undefined' : _typeof(_id13)));
                }

                return _id13;
            }

            return _ref13((0, _crioFunctions.convertToString)(this, false));
        }

        /**
         * Similar to .keys(), this will instead return an array of values. In the case of objects, the values
         * are plucked from the top-level mapping and returned as an array. In all other cases, this.object itself
         * is returned. In all scenarios, mutable is returned to the object.
         *
         * @returns {Array}
         */

    }, {
        key: 'values',
        value: function values() {
            var valueArray = [];

            (0, _functions.forIn)(this.object, function (value) {
                valueArray.push(value);
            });

            return valueArray;
        }
    }]);

    return CrioCollection;
})();

exports.default = CrioCollection;