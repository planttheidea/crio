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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local imports

// local partial imports

var isValidKey = function isValidKey(obj, index, length) {
    if (!(typeof index === 'number')) {
        throw new TypeError('Value of argument "index" violates contract, expected number got ' + (index === null ? 'null' : (typeof index === 'undefined' ? 'undefined' : _typeof(index)) === 'object' && index.constructor ? index.constructor.name || '[Unknown Object]' : typeof index === 'undefined' ? 'undefined' : _typeof(index)));
    }

    if (!(typeof length === 'number')) {
        throw new TypeError('Value of argument "length" violates contract, expected number got ' + (length === null ? 'null' : (typeof length === 'undefined' ? 'undefined' : _typeof(length)) === 'object' && length.constructor ? length.constructor.name || '[Unknown Object]' : typeof length === 'undefined' ? 'undefined' : _typeof(length)));
    }

    return !(0, _checkers.isUndefined)(obj) && index < length - 1;
};

var CrioCollection = (function () {
    function CrioCollection(obj) {
        _classCallCheck(this, CrioCollection);

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

            return _ref2((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrio)((0, _checkers.isArray)(this.object) ? [] : {})));
        }

        /**
         * Alias for Array.prototype.entries
         *
         * @returns {Iterator}
         */

    }, {
        key: 'entries',
        value: function entries() {
            return this.thaw().entries();
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
            if (!(crio2 instanceof Object)) {
                throw new TypeError('Value of argument "crio2" violates contract, expected Object got ' + (crio2 === null ? 'null' : (typeof crio2 === 'undefined' ? 'undefined' : _typeof(crio2)) === 'object' && crio2.constructor ? crio2.constructor.name || '[Unknown Object]' : typeof crio2 === 'undefined' ? 'undefined' : _typeof(crio2)));
            }

            if ((0, _checkers.isValueless)(crio2)) {
                return false;
            }

            return (0, _crioCheckers.isSameCrio)(this, crio2);
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

                if ((0, _checkers.isConvertibleToCrio)(value)) {
                    return (0, _crioFunctions.coalesceCrioValue)(this, (0, _createNewCrio.createNewCrio)(this.object[keys[0]]));
                }

                return value;
            }

            var keyMap = (0, _createNewCrio.createNewCrio)({});

            (0, _functions.forEach)(keys, function (key) {
                keyMap = keyMap.set(key, _this.object[key]);
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

            var retValue = this.thaw(),
                foundKeyMatch = true;

            (0, _functions.forEach)(keys, function (key, index) {
                if (!isValidKey(retValue[key], index, keys.length)) {
                    foundKeyMatch = false;
                    return false;
                }

                retValue = retValue[key];
            });

            if (foundKeyMatch) {
                if ((0, _checkers.isConvertibleToCrio)(retValue)) {
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

            function _ref5(_id5) {
                if (!(_id5 instanceof CrioCollection)) {
                    throw new TypeError('Function return value violates contract, expected CrioCollection got ' + (_id5 === null ? 'null' : (typeof _id5 === 'undefined' ? 'undefined' : _typeof(_id5)) === 'object' && _id5.constructor ? _id5.constructor.name || '[Unknown Object]' : typeof _id5 === 'undefined' ? 'undefined' : _typeof(_id5)));
                }

                return _id5;
            }

            if (!Array.isArray(sources)) {
                throw new TypeError('Value of argument "sources" violates contract, expected Array got ' + (sources === null ? 'null' : (typeof sources === 'undefined' ? 'undefined' : _typeof(sources)) === 'object' && sources.constructor ? sources.constructor.name || '[Unknown Object]' : typeof sources === 'undefined' ? 'undefined' : _typeof(sources)));
            }

            var mergedObject = _crioFunctions.merge.apply(undefined, [this.thaw()].concat(sources));

            return _ref5((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrio)(mergedObject)));
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
            var mutatedThis = callback(thawedObject) || thawedObject;

            if ((0, _checkers.isConvertibleToCrio)(mutatedThis)) {
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

            if (!(newValue instanceof Object || Array.isArray(newValue))) {
                throw new TypeError('Value of variable "newValue" violates contract, expected Object | Array got ' + (newValue === null ? 'null' : (typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' && newValue.constructor ? newValue.constructor.name || '[Unknown Object]' : typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)));
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

            function _ref7(_id7) {
                if (!(_id7 == null || _id7 instanceof CrioCollection)) {
                    throw new TypeError('Function return value violates contract, expected ?CrioCollection got ' + (_id7 === null ? 'null' : (typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)) === 'object' && _id7.constructor ? _id7.constructor.name || '[Unknown Object]' : typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)));
                }

                return _id7;
            }

            if (!Array.isArray(keys)) {
                throw new TypeError('Value of argument "keys" violates contract, expected Array got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
            }

            if ((0, _checkers.isUndefined)(value)) {
                throw new TypeError('You need to pass in a value to apply for the key.');
            }

            var foundKeyMatch = true,
                checkObj = this.thaw();

            (0, _functions.forEach)(keys, function (key, index) {
                if (!isValidKey(checkObj[key], index, keys.length)) {
                    foundKeyMatch = false;
                    return false;
                }

                if (index === keys.length - 1) {
                    checkObj[key] = value;
                } else {
                    checkObj = checkObj[key];
                }
            });

            if (foundKeyMatch) {
                return _ref7((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrio)(checkObj)));
            }

            return _ref7(undefined);
        }

        /**
         * Returns a new vanillaJS object of the Crio's object that has been unfrzon
         *
         * @returns thawedCrio<Array|Object>
         */

    }, {
        key: 'thaw',
        value: function thaw() {
            function _ref8(_id8) {
                if (!(Array.isArray(_id8) || _id8 instanceof Object)) {
                    throw new TypeError('Function return value violates contract, expected Array | Object got ' + (_id8 === null ? 'null' : (typeof _id8 === 'undefined' ? 'undefined' : _typeof(_id8)) === 'object' && _id8.constructor ? _id8.constructor.name || '[Unknown Object]' : typeof _id8 === 'undefined' ? 'undefined' : _typeof(_id8)));
                }

                return _id8;
            }

            return _ref8((0, _crioFunctions.thaw)(this.object));
        }

        /**
         * Alias of Array.prototype.toLocaleString
         *
         * @returns {string}
         */

    }, {
        key: 'toLocaleString',
        value: function toLocaleString() {
            function _ref9(_id9) {
                if (!(typeof _id9 === 'string')) {
                    throw new TypeError('Function return value violates contract, expected string got ' + (_id9 === null ? 'null' : (typeof _id9 === 'undefined' ? 'undefined' : _typeof(_id9)) === 'object' && _id9.constructor ? _id9.constructor.name || '[Unknown Object]' : typeof _id9 === 'undefined' ? 'undefined' : _typeof(_id9)));
                }

                return _id9;
            }

            return _ref9(this.object.toLocaleString());
        }

        /**
         * Alias of Array.prototype.toString
         *
         * @returns {string}
         */

    }, {
        key: 'toString',
        value: function toString() {
            function _ref10(_id10) {
                if (!(typeof _id10 === 'string')) {
                    throw new TypeError('Function return value violates contract, expected string got ' + (_id10 === null ? 'null' : (typeof _id10 === 'undefined' ? 'undefined' : _typeof(_id10)) === 'object' && _id10.constructor ? _id10.constructor.name || '[Unknown Object]' : typeof _id10 === 'undefined' ? 'undefined' : _typeof(_id10)));
                }

                return _id10;
            }

            return _ref10(this.object.toString());
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
            var thawedObject = this.thaw();

            var valueArray = [];

            (0, _functions.forIn)(thawedObject, function (value) {
                valueArray.push(value);
            });

            return valueArray;
        }
    }]);

    return CrioCollection;
})();

exports.default = CrioCollection;