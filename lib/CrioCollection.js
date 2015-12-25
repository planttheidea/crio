'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

// local imports

// local partial imports

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createNewCrio = require('./utils/createNewCrio');

var _createNewCrio2 = _interopRequireDefault(_createNewCrio);

var _checkers = require('./utils/checkers');

var _crioCheckers = require('./utils/crioCheckers');

var _crioFunctions = require('./utils/crioFunctions');

var _decorators = require('./utils/decorators');

var _functions = require('./utils/functions');

var _hash = require('./utils/hash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
            function _ref(_id) {
                if (!(_id instanceof CrioCollection)) {
                    throw new TypeError('Function return value violates contract, expected CrioCollection got ' + (_id === null ? 'null' : (typeof _id === 'undefined' ? 'undefined' : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === 'undefined' ? 'undefined' : _typeof(_id)));
                }

                return _id;
            }

            return _ref((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio2.default)((0, _checkers.isArray)(this.object) ? [] : {})));
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
         * a map of key:value pairs are returned, otherwise only the value is returned.
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
                return this.object;
            }

            if (keys.length === 1) {
                return (0, _crioFunctions.coalesceCrioValue)(this, this.object[keys[0]]);
            }

            var keyMap = {};

            (0, _functions.forEach)(keys, function (key) {
                keyMap[key] = (0, _crioFunctions.coalesceCrioValue)(_this, _this.object[key]);
            });

            return keyMap;
        }

        /**
         * Returns value of deeply nested item in this.object based on keys array
         *
         * @param keys
         * @returns {Array|Object}
         */

    }, {
        key: 'getIn',
        value: function getIn() {
            var keys = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            var retValue = this.thaw();

            (0, _functions.forEach)(keys, function (key) {
                retValue = retValue[key];

                if ((0, _checkers.isUndefined)(retValue)) {
                    return false;
                }
            });

            return (0, _crioFunctions.coalesceCrioValue)(this, retValue);
        }

        /**
         * Retrieves an array of the keys for this.object
         *
         * @returns keys<Array>
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

            function _ref3(_id3) {
                if (!(_id3 instanceof CrioCollection)) {
                    throw new TypeError('Function return value violates contract, expected CrioCollection got ' + (_id3 === null ? 'null' : (typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)) === 'object' && _id3.constructor ? _id3.constructor.name || '[Unknown Object]' : typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)));
                }

                return _id3;
            }

            if (!Array.isArray(sources)) {
                throw new TypeError('Value of argument "sources" violates contract, expected Array got ' + (sources === null ? 'null' : (typeof sources === 'undefined' ? 'undefined' : _typeof(sources)) === 'object' && sources.constructor ? sources.constructor.name || '[Unknown Object]' : typeof sources === 'undefined' ? 'undefined' : _typeof(sources)));
            }

            var mergedObject = _crioFunctions.merge.apply(undefined, [this.thaw()].concat(sources));

            console.log(mergedObject);

            return _ref3((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio2.default)(mergedObject)));
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

            if (!(0, _checkers.isObject)(key) && (0, _checkers.isUndefined)(value)) {
                throw new TypeError('If you are going to use the single-key implementation of this method, ' + 'you need to pass in a value to assign.');
            }

            var newValue = this.thaw();

            if (!Array.isArray(newValue)) {
                throw new TypeError('Value of variable "newValue" violates contract, expected Array got ' + (newValue === null ? 'null' : (typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' && newValue.constructor ? newValue.constructor.name || '[Unknown Object]' : typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)));
            }

            if ((0, _checkers.isObject)(key)) {
                (0, _functions.forIn)(key, function (value, index) {
                    newValue[index] = value;
                });
            } else {
                newValue[key] = value;
            }

            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio2.default)(newValue));
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
            var _this2 = this;

            var keys = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
            var value = arguments[1];

            function _ref4(_id4) {
                if (!(_id4 instanceof CrioCollection)) {
                    throw new TypeError('Function return value violates contract, expected CrioCollection got ' + (_id4 === null ? 'null' : (typeof _id4 === 'undefined' ? 'undefined' : _typeof(_id4)) === 'object' && _id4.constructor ? _id4.constructor.name || '[Unknown Object]' : typeof _id4 === 'undefined' ? 'undefined' : _typeof(_id4)));
                }

                return _id4;
            }

            if (!Array.isArray(keys)) {
                throw new TypeError('Value of argument "keys" violates contract, expected Array got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
            }

            if ((0, _checkers.isUndefined)(value)) {
                throw new TypeError('You need to pass in a value to apply for the key.');
            }

            var deepNewObject = {},
                isValidKeyset = true;

            (0, _functions.forEach)(keys, function (key, index) {
                if ((0, _checkers.isUndefined)(_this2.object[key])) {
                    isValidKeyset = false;
                    return false;
                }

                deepNewObject[key] = index === keys.length - 1 ? value : {};
            });

            return _ref4(!isValidKeyset ? undefined : (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio2.default)(_extends({}, this.thaw(), deepNewObject))));
        }

        /**
         * Returns a new vanillaJS object of the Crio's object that has been unfrzon
         *
         * @returns thawedCrio<Array|Object>
         */

    }, {
        key: 'thaw',
        value: function thaw() {
            function _ref5(_id5) {
                if (!(Array.isArray(_id5) || _id5 instanceof Object)) {
                    throw new TypeError('Function return value violates contract, expected Array | Object got ' + (_id5 === null ? 'null' : (typeof _id5 === 'undefined' ? 'undefined' : _typeof(_id5)) === 'object' && _id5.constructor ? _id5.constructor.name || '[Unknown Object]' : typeof _id5 === 'undefined' ? 'undefined' : _typeof(_id5)));
                }

                return _id5;
            }

            return _ref5((0, _crioFunctions.thaw)(this.object));
        }

        /**
         * Alias of Array.prototype.toLocaleString
         *
         * @returns {string}
         */

    }, {
        key: 'toLocaleString',
        value: function toLocaleString() {
            function _ref6(_id6) {
                if (!(typeof _id6 === 'string')) {
                    throw new TypeError('Function return value violates contract, expected string got ' + (_id6 === null ? 'null' : (typeof _id6 === 'undefined' ? 'undefined' : _typeof(_id6)) === 'object' && _id6.constructor ? _id6.constructor.name || '[Unknown Object]' : typeof _id6 === 'undefined' ? 'undefined' : _typeof(_id6)));
                }

                return _id6;
            }

            return _ref6(this.object.toLocaleString());
        }

        /**
         * Alias of Array.prototype.toString
         *
         * @returns {string}
         */

    }, {
        key: 'toString',
        value: function toString() {
            function _ref7(_id7) {
                if (!(typeof _id7 === 'string')) {
                    throw new TypeError('Function return value violates contract, expected string got ' + (_id7 === null ? 'null' : (typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)) === 'object' && _id7.constructor ? _id7.constructor.name || '[Unknown Object]' : typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)));
                }

                return _id7;
            }

            return _ref7(this.object.toString());
        }

        /**
         * Similar to .keys(), this will instead return an array of values. In the case of objects, the values
         * are plucked from the top-level mapping and returned as an array. In all other cases, this.object itself
         * is returned. In all scenarios, mutable is returned to the object.
         *
         * @returns {*}
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