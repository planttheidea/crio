'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createNewCrio = require('./utils/createNewCrio');

var _CrioCollection2 = require('./CrioCollection');

var _CrioCollection3 = _interopRequireDefault(_CrioCollection2);

var _checkers = require('./utils/checkers');

var _crioCheckers = require('./utils/crioCheckers');

var _crioFunctions = require('./utils/crioFunctions');

var _functions = require('./utils/functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local imports

// local partial imports

/**
 * Accepts sources of various types and converts them to an array of arrays
 *
 * @param sources<Array>
 * @returns {Array}
 */
var getCleanSources = function getCleanSources(sources) {
    if (!Array.isArray(sources)) {
        throw new TypeError('Value of argument "sources" violates contract, expected Array got ' + (sources === null ? 'null' : (typeof sources === 'undefined' ? 'undefined' : _typeof(sources)) === 'object' && sources.constructor ? sources.constructor.name || '[Unknown Object]' : typeof sources === 'undefined' ? 'undefined' : _typeof(sources)));
    }

    var cleanSources = [];

    (0, _functions.forEach)(sources, function (source) {
        if (!(0, _checkers.isArray)(source)) {
            var cleanSource = (0, _crioCheckers.isCrio)(source) ? source.thaw() : source;

            cleanSources.push((0, _checkers.isArray)(cleanSource) ? cleanSource : [cleanSource]);
        } else {
            cleanSources.push(source);
        }
    });

    return cleanSources;
};

var CrioList = (function (_CrioCollection) {
    _inherits(CrioList, _CrioCollection);

    function CrioList(obj) {
        _classCallCheck(this, CrioList);

        if (!Array.isArray(obj)) {
            throw new TypeError('Value of argument "obj" violates contract, expected Array got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
        }

        // this converts array-like objects to actual arrays
        return _possibleConstructorReturn(this, Object.getPrototypeOf(CrioList).call(this, obj));
    }

    /**
     * Returns new array of object concatentation with sources
     *
     * @param sources<Array>
     * @returns {CrioList}
     */

    _createClass(CrioList, [{
        key: 'concat',
        value: function concat() {
            var _object;

            for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
                sources[_key] = arguments[_key];
            }

            function _ref2(_id2) {
                if (!(_id2 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id2 === null ? 'null' : (typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)) === 'object' && _id2.constructor ? _id2.constructor.name || '[Unknown Object]' : typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)));
                }

                return _id2;
            }

            if (!Array.isArray(sources)) {
                throw new TypeError('Value of argument "sources" violates contract, expected Array got ' + (sources === null ? 'null' : (typeof sources === 'undefined' ? 'undefined' : _typeof(sources)) === 'object' && sources.constructor ? sources.constructor.name || '[Unknown Object]' : typeof sources === 'undefined' ? 'undefined' : _typeof(sources)));
            }

            var arrays = getCleanSources(sources);

            return _ref2((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)((_object = this.object).concat.apply(_object, arrays))));
        }

        /**
         * Returns true if every item in the array finds a match based on the return from the callback
         *
         * @param callback<Function>
         * @returns {boolean}
         */

    }, {
        key: 'every',
        value: function every(callback) {
            function _ref3(_id3) {
                if (!(typeof _id3 === 'boolean')) {
                    throw new TypeError('Function return value violates contract, expected bool got ' + (_id3 === null ? 'null' : (typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)) === 'object' && _id3.constructor ? _id3.constructor.name || '[Unknown Object]' : typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)));
                }

                return _id3;
            }

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            return _ref3(this.object.every(callback));
        }

        /**
         * Returns new CrioList with items at indices starting at start and prior to end replaced with fillValue
         *
         * @param fillValue
         * @param start
         * @param end
         * @returns {CrioCollection}
         */

    }, {
        key: 'fill',
        value: function fill(fillValue) {
            var start = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var end = arguments.length <= 2 || arguments[2] === undefined ? this.size : arguments[2];

            function _ref4(_id4) {
                if (!(_id4 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id4 === null ? 'null' : (typeof _id4 === 'undefined' ? 'undefined' : _typeof(_id4)) === 'object' && _id4.constructor ? _id4.constructor.name || '[Unknown Object]' : typeof _id4 === 'undefined' ? 'undefined' : _typeof(_id4)));
                }

                return _id4;
            }

            if (!(typeof start === 'number')) {
                throw new TypeError('Value of argument "start" violates contract, expected number got ' + (start === null ? 'null' : (typeof start === 'undefined' ? 'undefined' : _typeof(start)) === 'object' && start.constructor ? start.constructor.name || '[Unknown Object]' : typeof start === 'undefined' ? 'undefined' : _typeof(start)));
            }

            if (!(typeof end === 'number')) {
                throw new TypeError('Value of argument "end" violates contract, expected number got ' + (end === null ? 'null' : (typeof end === 'undefined' ? 'undefined' : _typeof(end)) === 'object' && end.constructor ? end.constructor.name || '[Unknown Object]' : typeof end === 'undefined' ? 'undefined' : _typeof(end)));
            }

            var filledArray = [];

            (0, _functions.forEach)(this.object, function (value, index) {
                filledArray[index] = index >= start && index < end ? fillValue : value;
            });

            return _ref4((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(filledArray)));
        }

        /**
         * Executes standard filter function (as filter returns new array)
         *
         * @param callback<Function>
         * @param args<Array>
         * @returns filteredArray<CrioList>
         */

    }, {
        key: 'filter',
        value: function filter(callback) {
            var _object2;

            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            function _ref5(_id5) {
                if (!(_id5 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id5 === null ? 'null' : (typeof _id5 === 'undefined' ? 'undefined' : _typeof(_id5)) === 'object' && _id5.constructor ? _id5.constructor.name || '[Unknown Object]' : typeof _id5 === 'undefined' ? 'undefined' : _typeof(_id5)));
                }

                return _id5;
            }

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            if (!Array.isArray(args)) {
                throw new TypeError('Value of argument "args" violates contract, expected Array got ' + (args === null ? 'null' : (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.constructor ? args.constructor.name || '[Unknown Object]' : typeof args === 'undefined' ? 'undefined' : _typeof(args)));
            }

            var values = (_object2 = this.object).filter.apply(_object2, [callback].concat(args));

            if (!Array.isArray(values)) {
                throw new TypeError('Value of variable "values" violates contract, expected Array got ' + (values === null ? 'null' : (typeof values === 'undefined' ? 'undefined' : _typeof(values)) === 'object' && values.constructor ? values.constructor.name || '[Unknown Object]' : typeof values === 'undefined' ? 'undefined' : _typeof(values)));
            }

            return _ref5((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(values)));
        }

        /**
         * Finds first item in array that returns a value, and returns a new Crio of it
         *
         * @param callback<Function>
         * @param thisArg<Object[optional]>
         * @returns {any}
         */

    }, {
        key: 'find',
        value: function find(callback, thisArg) {
            var _this2 = this;

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            if (!(thisArg == null || thisArg instanceof Object)) {
                throw new TypeError('Value of argument "thisArg" violates contract, expected ?Object got ' + (thisArg === null ? 'null' : (typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)) === 'object' && thisArg.constructor ? thisArg.constructor.name || '[Unknown Object]' : typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)));
            }

            var match = undefined;

            (0, _functions.forEach)(this.object, function (value, index, arr) {
                if (callback.call(thisArg, value, index, arr)) {
                    match = (0, _crioCheckers.isConvertibleToCrio)(value) ? (0, _crioFunctions.getCrioInstance)(_this2, (0, _createNewCrio.createNewCrioList)(value)) : value;

                    return false;
                }
            });

            return match;
        }

        /**
         * Finds first item in array that returns a value, and returns index of it in array
         *
         * @param callback<Function>
         * @param thisArg<Object[optional]>
         * @returns {number}
         */

    }, {
        key: 'findIndex',
        value: function findIndex(callback, thisArg) {
            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            if (!(thisArg == null || thisArg instanceof Object)) {
                throw new TypeError('Value of argument "thisArg" violates contract, expected ?Object got ' + (thisArg === null ? 'null' : (typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)) === 'object' && thisArg.constructor ? thisArg.constructor.name || '[Unknown Object]' : typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)));
            }

            var matchIndex = -1;

            (0, _functions.forEach)(this.object, function (value, index, arr) {
                if (callback.call(thisArg, value, index, arr)) {
                    matchIndex = index;

                    if (!(typeof matchIndex === 'number')) {
                        throw new TypeError('Value of variable "matchIndex" violates contract, expected number got ' + (matchIndex === null ? 'null' : (typeof matchIndex === 'undefined' ? 'undefined' : _typeof(matchIndex)) === 'object' && matchIndex.constructor ? matchIndex.constructor.name || '[Unknown Object]' : typeof matchIndex === 'undefined' ? 'undefined' : _typeof(matchIndex)));
                    }

                    return false;
                }
            });

            return matchIndex;
        }

        /**
         * Returns mutable first item in the object
         *
         * @returns {CrioCollection}
         */

    }, {
        key: 'first',
        value: function first() {
            var firstObject = this.object[0];

            if ((0, _checkers.isArray)(firstObject)) {
                return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(firstObject));
            }

            return firstObject;
        }

        /**
         * Convenience function for checking if array includes value or not
         *
         * @param value
         * @returns includesMatch<Boolean>
         */

    }, {
        key: 'includes',
        value: function includes(value) {
            function _ref9(_id9) {
                if (!(typeof _id9 === 'boolean')) {
                    throw new TypeError('Function return value violates contract, expected bool got ' + (_id9 === null ? 'null' : (typeof _id9 === 'undefined' ? 'undefined' : _typeof(_id9)) === 'object' && _id9.constructor ? _id9.constructor.name || '[Unknown Object]' : typeof _id9 === 'undefined' ? 'undefined' : _typeof(_id9)));
                }

                return _id9;
            }

            return _ref9(this.indexOf(value) !== -1);
        }

        /**
         * Returns index of first matching element in this.object
         *
         * @param value<Any>
         * @returns indexOfMatch<Number>
         */

    }, {
        key: 'indexOf',
        value: function indexOf(value) {
            function _ref10(_id10) {
                if (!(typeof _id10 === 'number')) {
                    throw new TypeError('Function return value violates contract, expected number got ' + (_id10 === null ? 'null' : (typeof _id10 === 'undefined' ? 'undefined' : _typeof(_id10)) === 'object' && _id10.constructor ? _id10.constructor.name || '[Unknown Object]' : typeof _id10 === 'undefined' ? 'undefined' : _typeof(_id10)));
                }

                return _id10;
            }

            if ((0, _checkers.isValueless)(value)) {
                return -1;
            }

            return _ref10(this.object.indexOf(value));
        }

        /**
         * Joins array values into string separated by joiner
         *
         * @param joiner<String>
         * @returns joinedArray<String>
         */

    }, {
        key: 'join',
        value: function join() {
            var joiner = arguments.length <= 0 || arguments[0] === undefined ? ',' : arguments[0];

            function _ref11(_id11) {
                if (!(typeof _id11 === 'string')) {
                    throw new TypeError('Function return value violates contract, expected string got ' + (_id11 === null ? 'null' : (typeof _id11 === 'undefined' ? 'undefined' : _typeof(_id11)) === 'object' && _id11.constructor ? _id11.constructor.name || '[Unknown Object]' : typeof _id11 === 'undefined' ? 'undefined' : _typeof(_id11)));
                }

                return _id11;
            }

            if (!(typeof joiner === 'string')) {
                throw new TypeError('Value of argument "joiner" violates contract, expected string got ' + (joiner === null ? 'null' : (typeof joiner === 'undefined' ? 'undefined' : _typeof(joiner)) === 'object' && joiner.constructor ? joiner.constructor.name || '[Unknown Object]' : typeof joiner === 'undefined' ? 'undefined' : _typeof(joiner)));
            }

            return _ref11(this.object.join(joiner));
        }

        /**
         * Returns mutable last item in the CrioList
         *
         * @returns {*}
         */

    }, {
        key: 'last',
        value: function last() {
            var lastObject = this.object[this.object.length - 1];

            if ((0, _checkers.isArray)(lastObject)) {
                return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(lastObject));
            }

            return lastObject;
        }

        /**
         * Same as .indexOf(), except returns last item in array that matches instead of first
         *
         * @param value<Any>
         * @returns lastIndexMatch<Number>
         */

    }, {
        key: 'lastIndexOf',
        value: function lastIndexOf(value) {
            function _ref13(_id13) {
                if (!(typeof _id13 === 'number')) {
                    throw new TypeError('Function return value violates contract, expected number got ' + (_id13 === null ? 'null' : (typeof _id13 === 'undefined' ? 'undefined' : _typeof(_id13)) === 'object' && _id13.constructor ? _id13.constructor.name || '[Unknown Object]' : typeof _id13 === 'undefined' ? 'undefined' : _typeof(_id13)));
                }

                return _id13;
            }

            if ((0, _checkers.isValueless)(value)) {
                return -1;
            }

            return _ref13(this.object.lastIndexOf(value));
        }

        /**
         * Executes standard map function (as map returns new array)
         *
         * @param callback<Function>
         * @param thisArg<Object[optional]>
         * @returns mappedArray<CrioList>
         */

    }, {
        key: 'map',
        value: function map(callback, thisArg) {
            function _ref14(_id14) {
                if (!(_id14 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id14 === null ? 'null' : (typeof _id14 === 'undefined' ? 'undefined' : _typeof(_id14)) === 'object' && _id14.constructor ? _id14.constructor.name || '[Unknown Object]' : typeof _id14 === 'undefined' ? 'undefined' : _typeof(_id14)));
                }

                return _id14;
            }

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            if (!(thisArg == null || thisArg instanceof Object)) {
                throw new TypeError('Value of argument "thisArg" violates contract, expected ?Object got ' + (thisArg === null ? 'null' : (typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)) === 'object' && thisArg.constructor ? thisArg.constructor.name || '[Unknown Object]' : typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)));
            }

            var values = this.object.map(callback, thisArg);

            if (!Array.isArray(values)) {
                throw new TypeError('Value of variable "values" violates contract, expected Array got ' + (values === null ? 'null' : (typeof values === 'undefined' ? 'undefined' : _typeof(values)) === 'object' && values.constructor ? values.constructor.name || '[Unknown Object]' : typeof values === 'undefined' ? 'undefined' : _typeof(values)));
            }

            if (!(0, _checkers.isArray)(values)) {
                throw new Error('You cannot change the type of object when mapping. If you want to do this, ' + 'you can use the .mutate() method.');
            }

            return _ref14((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(values)));
        }

        /**
         * Alias function for pop
         *
         * @returns lastItemInArray<Any>
         */

    }, {
        key: 'pop',
        value: function pop() {
            return this.splice(this.size - 1);
        }

        /**
         * Adds values passed to array at the back, after the existing items
         *
         * @param values<Array>
         * @returns {Crio}
         */

    }, {
        key: 'push',
        value: function push() {
            var _ref29;

            for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                values[_key3] = arguments[_key3];
            }

            function _ref16(_id16) {
                if (!(_id16 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id16 === null ? 'null' : (typeof _id16 === 'undefined' ? 'undefined' : _typeof(_id16)) === 'object' && _id16.constructor ? _id16.constructor.name || '[Unknown Object]' : typeof _id16 === 'undefined' ? 'undefined' : _typeof(_id16)));
                }

                return _id16;
            }

            if (!Array.isArray(values)) {
                throw new TypeError('Value of argument "values" violates contract, expected Array got ' + (values === null ? 'null' : (typeof values === 'undefined' ? 'undefined' : _typeof(values)) === 'object' && values.constructor ? values.constructor.name || '[Unknown Object]' : typeof values === 'undefined' ? 'undefined' : _typeof(values)));
            }

            var newValues = (_ref29 = [].concat(_toConsumableArray(this.object))).concat.apply(_ref29, values);

            if (!Array.isArray(newValues)) {
                throw new TypeError('Value of variable "newValues" violates contract, expected Array got ' + (newValues === null ? 'null' : (typeof newValues === 'undefined' ? 'undefined' : _typeof(newValues)) === 'object' && newValues.constructor ? newValues.constructor.name || '[Unknown Object]' : typeof newValues === 'undefined' ? 'undefined' : _typeof(newValues)));
            }

            return _ref16((0, _createNewCrio.createNewCrioList)(newValues));
        }

        /**
         * Based on action in callback, each item in array executes function to somehow modify
         * initialValue. If the resulting reduction is an array or an object, then return a new
         * Crio, otherwise return the reduction.
         *
         * @param callback<Function>
         * @param initialValue<any>
         * @returns {any}
         */

    }, {
        key: 'reduce',
        value: function reduce(callback) {
            var initialValue = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            var reducedValue = this.object.reduce(callback, initialValue);

            return (0, _crioFunctions.coalesceCrioValue)(this, reducedValue);
        }

        /**
         * Identical to .reduce(), but performs action on the array from right to left.
         *
         * @param callback<Function>
         * @param initialValue<any>
         * @returns {any}
         */

    }, {
        key: 'reduceRight',
        value: function reduceRight(callback) {
            var initialValue = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            return this.reverse().reduce(callback, initialValue);
        }

        /**
         * Reverses the order of the array in this.object and returns new Crio
         *
         * @returns reversedArray<CrioList>
         */

    }, {
        key: 'reverse',
        value: function reverse() {
            function _ref19(_id19) {
                if (!(_id19 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id19 === null ? 'null' : (typeof _id19 === 'undefined' ? 'undefined' : _typeof(_id19)) === 'object' && _id19.constructor ? _id19.constructor.name || '[Unknown Object]' : typeof _id19 === 'undefined' ? 'undefined' : _typeof(_id19)));
                }

                return _id19;
            }

            var reversedArray = [];

            (0, _functions.forEachRight)(this.object, function (value) {
                reversedArray.push(value);
            });

            return _ref19((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(reversedArray)));
        }

        /**
         * ALias for shift function
         *
         * @returns firstItemInArray<Any>
         */

    }, {
        key: 'shift',
        value: function shift() {
            return this.splice(0);
        }

        /**
         * Returns an array of items that is a window of original array, from passed begin to passed end.
         * If no end is passed, then window is from begin to end of the original array.
         *
         * @param begin<Number>
         * @param end<Number[optional]>
         * @returns {CrioList}
         */

    }, {
        key: 'slice',
        value: function slice(begin, end) {
            function _ref21(_id21) {
                if (!(_id21 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id21 === null ? 'null' : (typeof _id21 === 'undefined' ? 'undefined' : _typeof(_id21)) === 'object' && _id21.constructor ? _id21.constructor.name || '[Unknown Object]' : typeof _id21 === 'undefined' ? 'undefined' : _typeof(_id21)));
                }

                return _id21;
            }

            if (!(begin == null || typeof begin === 'number')) {
                throw new TypeError('Value of argument "begin" violates contract, expected ?number got ' + (begin === null ? 'null' : (typeof begin === 'undefined' ? 'undefined' : _typeof(begin)) === 'object' && begin.constructor ? begin.constructor.name || '[Unknown Object]' : typeof begin === 'undefined' ? 'undefined' : _typeof(begin)));
            }

            if (!(end == null || typeof end === 'number')) {
                throw new TypeError('Value of argument "end" violates contract, expected ?number got ' + (end === null ? 'null' : (typeof end === 'undefined' ? 'undefined' : _typeof(end)) === 'object' && end.constructor ? end.constructor.name || '[Unknown Object]' : typeof end === 'undefined' ? 'undefined' : _typeof(end)));
            }

            if ((0, _checkers.isValueless)(begin)) {
                return _ref21(this);
            }

            var slicedArray = [].concat(_toConsumableArray(this.object)).slice(begin, end);

            if (!Array.isArray(slicedArray)) {
                throw new TypeError('Value of variable "slicedArray" violates contract, expected Array got ' + (slicedArray === null ? 'null' : (typeof slicedArray === 'undefined' ? 'undefined' : _typeof(slicedArray)) === 'object' && slicedArray.constructor ? slicedArray.constructor.name || '[Unknown Object]' : typeof slicedArray === 'undefined' ? 'undefined' : _typeof(slicedArray)));
            }

            return _ref21((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(slicedArray)));
        }

        /**
         * Returns true if any items in the array are a match, based on the return in the callback
         *
         * @param callback<Function>
         * @returns {boolean}
         */

    }, {
        key: 'some',
        value: function some(callback) {
            function _ref22(_id22) {
                if (!(typeof _id22 === 'boolean')) {
                    throw new TypeError('Function return value violates contract, expected bool got ' + (_id22 === null ? 'null' : (typeof _id22 === 'undefined' ? 'undefined' : _typeof(_id22)) === 'object' && _id22.constructor ? _id22.constructor.name || '[Unknown Object]' : typeof _id22 === 'undefined' ? 'undefined' : _typeof(_id22)));
                }

                return _id22;
            }

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            return _ref22(this.object.some(callback));
        }

        /**
         * Applies sort to object, and returns new CrioList with sorted objects
         *
         * @param fn<Function[optional]>
         * @returns {Crio}
         *
         * @todo Modify this so that it doesn't require thawing (for use with native sort it's necessary)
         */

    }, {
        key: 'sort',
        value: function sort(fn) {
            function _ref23(_id23) {
                if (!(_id23 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id23 === null ? 'null' : (typeof _id23 === 'undefined' ? 'undefined' : _typeof(_id23)) === 'object' && _id23.constructor ? _id23.constructor.name || '[Unknown Object]' : typeof _id23 === 'undefined' ? 'undefined' : _typeof(_id23)));
                }

                return _id23;
            }

            if (!(fn == null || typeof fn === 'function')) {
                throw new TypeError('Value of argument "fn" violates contract, expected ?Function got ' + (fn === null ? 'null' : (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'object' && fn.constructor ? fn.constructor.name || '[Unknown Object]' : typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
            }

            var sortedObject = this.thaw().sort(fn);

            return _ref23((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(sortedObject)));
        }

        /**
         * Returns a new CrioList with an object including all values except that
         * of the key(s) passed.
         *
         * @param index<Number>
         * @param removeNum<Number>
         * @param itemsToAdd<Array>
         * @returns itemWithKeysRemoved<Crio>
         */

    }, {
        key: 'splice',
        value: function splice(index) {
            for (var _len4 = arguments.length, itemsToAdd = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
                itemsToAdd[_key4 - 2] = arguments[_key4];
            }

            var removeNum = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            function _ref24(_id24) {
                if (!(_id24 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id24 === null ? 'null' : (typeof _id24 === 'undefined' ? 'undefined' : _typeof(_id24)) === 'object' && _id24.constructor ? _id24.constructor.name || '[Unknown Object]' : typeof _id24 === 'undefined' ? 'undefined' : _typeof(_id24)));
                }

                return _id24;
            }

            if (!(typeof index === 'number')) {
                throw new TypeError('Value of argument "index" violates contract, expected number got ' + (index === null ? 'null' : (typeof index === 'undefined' ? 'undefined' : _typeof(index)) === 'object' && index.constructor ? index.constructor.name || '[Unknown Object]' : typeof index === 'undefined' ? 'undefined' : _typeof(index)));
            }

            if (!(typeof removeNum === 'number')) {
                throw new TypeError('Value of argument "removeNum" violates contract, expected number got ' + (removeNum === null ? 'null' : (typeof removeNum === 'undefined' ? 'undefined' : _typeof(removeNum)) === 'object' && removeNum.constructor ? removeNum.constructor.name || '[Unknown Object]' : typeof removeNum === 'undefined' ? 'undefined' : _typeof(removeNum)));
            }

            if (!Array.isArray(itemsToAdd)) {
                throw new TypeError('Value of argument "itemsToAdd" violates contract, expected Array got ' + (itemsToAdd === null ? 'null' : (typeof itemsToAdd === 'undefined' ? 'undefined' : _typeof(itemsToAdd)) === 'object' && itemsToAdd.constructor ? itemsToAdd.constructor.name || '[Unknown Object]' : typeof itemsToAdd === 'undefined' ? 'undefined' : _typeof(itemsToAdd)));
            }

            if (!(0, _checkers.isNumber)(index)) {
                return _ref24(this);
            }

            return _ref24((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)((0, _functions.splice)(this.object, index, removeNum)).concat(itemsToAdd)));
        }

        /**
         * Converts CrioList into CrioMap
         *
         * @returns {any}
         */

    }, {
        key: 'toMap',
        value: function toMap() {
            function _ref25(_id25) {
                if (!(_id25 instanceof _CrioCollection3.default)) {
                    throw new TypeError('Function return value violates contract, expected CrioCollection got ' + (_id25 === null ? 'null' : (typeof _id25 === 'undefined' ? 'undefined' : _typeof(_id25)) === 'object' && _id25.constructor ? _id25.constructor.name || '[Unknown Object]' : typeof _id25 === 'undefined' ? 'undefined' : _typeof(_id25)));
                }

                return _id25;
            }

            return _ref25(this.mutate(function (mutableList) {
                var map = {};

                (0, _functions.forEach)(mutableList, function (value, index) {
                    map[index] = value;
                });

                return map;
            }));
        }

        /**
         * Returns a unique list of all arrays passed concatenated with the original this.object
         *
         * @param sources<Array>
         * @returns {CrioList}
         */

    }, {
        key: 'union',
        value: function union() {
            for (var _len5 = arguments.length, sources = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                sources[_key5] = arguments[_key5];
            }

            function _ref26(_id26) {
                if (!(_id26 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id26 === null ? 'null' : (typeof _id26 === 'undefined' ? 'undefined' : _typeof(_id26)) === 'object' && _id26.constructor ? _id26.constructor.name || '[Unknown Object]' : typeof _id26 === 'undefined' ? 'undefined' : _typeof(_id26)));
                }

                return _id26;
            }

            if (!Array.isArray(sources)) {
                throw new TypeError('Value of argument "sources" violates contract, expected Array got ' + (sources === null ? 'null' : (typeof sources === 'undefined' ? 'undefined' : _typeof(sources)) === 'object' && sources.constructor ? sources.constructor.name || '[Unknown Object]' : typeof sources === 'undefined' ? 'undefined' : _typeof(sources)));
            }

            var arrays = getCleanSources(sources);

            return _ref26((0, _crioFunctions.getCrioInstance)(this, this.concat.apply(this, arrays).unique()));
        }

        /**
         * Returns CrioList with only unique items in original CrioList
         *
         * @returns {CrioList}
         */

    }, {
        key: 'unique',
        value: function unique() {
            function _ref27(_id27) {
                if (!(_id27 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id27 === null ? 'null' : (typeof _id27 === 'undefined' ? 'undefined' : _typeof(_id27)) === 'object' && _id27.constructor ? _id27.constructor.name || '[Unknown Object]' : typeof _id27 === 'undefined' ? 'undefined' : _typeof(_id27)));
                }

                return _id27;
            }

            var uniqueList = [];

            this.forEach(function (value) {
                if (uniqueList.indexOf(value) === -1) {
                    uniqueList.push(value);
                }
            });

            return _ref27((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(uniqueList)));
        }

        /**
         * Adds values passed to array at the front, before the existing items
         *
         * @param values<Array>
         * @returns {Crio}
         */

    }, {
        key: 'unshift',
        value: function unshift() {
            var _ref30;

            for (var _len6 = arguments.length, values = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                values[_key6] = arguments[_key6];
            }

            function _ref28(_id28) {
                if (!(_id28 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id28 === null ? 'null' : (typeof _id28 === 'undefined' ? 'undefined' : _typeof(_id28)) === 'object' && _id28.constructor ? _id28.constructor.name || '[Unknown Object]' : typeof _id28 === 'undefined' ? 'undefined' : _typeof(_id28)));
                }

                return _id28;
            }

            if (!Array.isArray(values)) {
                throw new TypeError('Value of argument "values" violates contract, expected Array got ' + (values === null ? 'null' : (typeof values === 'undefined' ? 'undefined' : _typeof(values)) === 'object' && values.constructor ? values.constructor.name || '[Unknown Object]' : typeof values === 'undefined' ? 'undefined' : _typeof(values)));
            }

            var newValues = (_ref30 = [].concat(_toConsumableArray(values.reverse()))).concat.apply(_ref30, _toConsumableArray(this.object));

            if (!Array.isArray(newValues)) {
                throw new TypeError('Value of variable "newValues" violates contract, expected Array got ' + (newValues === null ? 'null' : (typeof newValues === 'undefined' ? 'undefined' : _typeof(newValues)) === 'object' && newValues.constructor ? newValues.constructor.name || '[Unknown Object]' : typeof newValues === 'undefined' ? 'undefined' : _typeof(newValues)));
            }

            return _ref28((0, _createNewCrio.createNewCrioList)(newValues));
        }
    }]);

    return CrioList;
})(_CrioCollection3.default);

exports.default = CrioList;
module.exports = exports['default'];