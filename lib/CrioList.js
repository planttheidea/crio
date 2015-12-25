'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createNewCrio = require('./utils/createNewCrio');

var _CrioCollection2 = require('./CrioCollection');

var _CrioCollection3 = _interopRequireDefault(_CrioCollection2);

var _checkers = require('./utils/checkers');

var _crioFunctions = require('./utils/crioFunctions');

var _functions = require('./utils/functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// local imports

// local partial imports

var CrioList = (function (_CrioCollection) {
    _inherits(CrioList, _CrioCollection);

    function CrioList(obj) {
        _classCallCheck(this, CrioList);

        // this converts array-like objects to actual arrays
        return _possibleConstructorReturn(this, Object.getPrototypeOf(CrioList).call(this, Array.prototype.slice.call(obj)));
    }

    /**
     * Returns true if every item in the array finds a match based on the return from the callback
     *
     * @param callback<Function>
     * @param thisArg<Object[optional]>
     * @returns {boolean}
     */

    _createClass(CrioList, [{
        key: 'every',
        value: function every(callback, thisArg) {
            function _ref(_id) {
                if (!(typeof _id === 'boolean')) {
                    throw new TypeError('Function return value violates contract, expected bool got ' + (_id === null ? 'null' : (typeof _id === 'undefined' ? 'undefined' : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === 'undefined' ? 'undefined' : _typeof(_id)));
                }

                return _id;
            }

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            if (!(thisArg == null || thisArg instanceof Object)) {
                throw new TypeError('Value of argument "thisArg" violates contract, expected ?Object got ' + (thisArg === null ? 'null' : (typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)) === 'object' && thisArg.constructor ? thisArg.constructor.name || '[Unknown Object]' : typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)));
            }

            return _ref(this.thaw().every.call(thisArg, callback));
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

            function _ref2(_id2) {
                if (!(_id2 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id2 === null ? 'null' : (typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)) === 'object' && _id2.constructor ? _id2.constructor.name || '[Unknown Object]' : typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)));
                }

                return _id2;
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

            return _ref2((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(filledArray)));
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
            var _thaw;

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            function _ref3(_id3) {
                if (!(_id3 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id3 === null ? 'null' : (typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)) === 'object' && _id3.constructor ? _id3.constructor.name || '[Unknown Object]' : typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)));
                }

                return _id3;
            }

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            if (!Array.isArray(args)) {
                throw new TypeError('Value of argument "args" violates contract, expected Array got ' + (args === null ? 'null' : (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.constructor ? args.constructor.name || '[Unknown Object]' : typeof args === 'undefined' ? 'undefined' : _typeof(args)));
            }

            var values = (_thaw = this.thaw()).filter.apply(_thaw, [callback].concat(args));

            return _ref3((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(values)));
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

            (0, _functions.forEach)(this.thaw(), function (value, index, arr) {
                if (callback.call(thisArg, value, index, arr)) {
                    match = (0, _crioFunctions.getCrioInstance)(_this2, (0, _createNewCrio.createNewCrioList)(value));
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

            (0, _functions.forEach)(this.thaw(), function (value, index, arr) {
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
            return this.thaw()[0];
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

            (0, _functions.forEach)(this.thaw(), fn, thisArg);

            return this;
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
            function _ref7(_id7) {
                if (!(typeof _id7 === 'boolean')) {
                    throw new TypeError('Function return value violates contract, expected bool got ' + (_id7 === null ? 'null' : (typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)) === 'object' && _id7.constructor ? _id7.constructor.name || '[Unknown Object]' : typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)));
                }

                return _id7;
            }

            return _ref7(this.indexOf(value) !== -1);
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
            function _ref8(_id8) {
                if (!(typeof _id8 === 'number')) {
                    throw new TypeError('Function return value violates contract, expected number got ' + (_id8 === null ? 'null' : (typeof _id8 === 'undefined' ? 'undefined' : _typeof(_id8)) === 'object' && _id8.constructor ? _id8.constructor.name || '[Unknown Object]' : typeof _id8 === 'undefined' ? 'undefined' : _typeof(_id8)));
                }

                return _id8;
            }

            if ((0, _checkers.isValueless)(value)) {
                return -1;
            }

            return _ref8(this.object.indexOf(value));
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

            function _ref9(_id9) {
                if (!(typeof _id9 === 'string')) {
                    throw new TypeError('Function return value violates contract, expected string got ' + (_id9 === null ? 'null' : (typeof _id9 === 'undefined' ? 'undefined' : _typeof(_id9)) === 'object' && _id9.constructor ? _id9.constructor.name || '[Unknown Object]' : typeof _id9 === 'undefined' ? 'undefined' : _typeof(_id9)));
                }

                return _id9;
            }

            if (!(typeof joiner === 'string')) {
                throw new TypeError('Value of argument "joiner" violates contract, expected string got ' + (joiner === null ? 'null' : (typeof joiner === 'undefined' ? 'undefined' : _typeof(joiner)) === 'object' && joiner.constructor ? joiner.constructor.name || '[Unknown Object]' : typeof joiner === 'undefined' ? 'undefined' : _typeof(joiner)));
            }

            return _ref9(this.object.join(joiner));
        }

        /**
         * Returns mutable last item in the CrioList
         *
         * @returns {*}
         */

    }, {
        key: 'last',
        value: function last() {
            return this.thaw()[this.object.length - 1];
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
            function _ref11(_id11) {
                if (!(typeof _id11 === 'number')) {
                    throw new TypeError('Function return value violates contract, expected number got ' + (_id11 === null ? 'null' : (typeof _id11 === 'undefined' ? 'undefined' : _typeof(_id11)) === 'object' && _id11.constructor ? _id11.constructor.name || '[Unknown Object]' : typeof _id11 === 'undefined' ? 'undefined' : _typeof(_id11)));
                }

                return _id11;
            }

            if ((0, _checkers.isValueless)(value)) {
                return -1;
            }

            return _ref11(this.object.lastIndexOf(value));
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
            function _ref12(_id12) {
                if (!(_id12 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id12 === null ? 'null' : (typeof _id12 === 'undefined' ? 'undefined' : _typeof(_id12)) === 'object' && _id12.constructor ? _id12.constructor.name || '[Unknown Object]' : typeof _id12 === 'undefined' ? 'undefined' : _typeof(_id12)));
                }

                return _id12;
            }

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            if (!(thisArg == null || thisArg instanceof Object)) {
                throw new TypeError('Value of argument "thisArg" violates contract, expected ?Object got ' + (thisArg === null ? 'null' : (typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)) === 'object' && thisArg.constructor ? thisArg.constructor.name || '[Unknown Object]' : typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)));
            }

            var values = this.thaw().map(callback, thisArg);

            if (!(0, _checkers.isArray)(values)) {
                throw new Error('You cannot change the type of object when mapping. If you want to do this, ' + 'you can use the .mutate() method.');
            }

            return _ref12((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(values)));
        }

        /**
         * Alias function for pop
         *
         * @returns lastItemInArray<Any>
         */

    }, {
        key: 'pop',
        value: function pop() {
            return this.thaw().pop();
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
            var _ref26;

            for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                values[_key2] = arguments[_key2];
            }

            function _ref14(_id14) {
                if (!(_id14 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id14 === null ? 'null' : (typeof _id14 === 'undefined' ? 'undefined' : _typeof(_id14)) === 'object' && _id14.constructor ? _id14.constructor.name || '[Unknown Object]' : typeof _id14 === 'undefined' ? 'undefined' : _typeof(_id14)));
                }

                return _id14;
            }

            if (!Array.isArray(values)) {
                throw new TypeError('Value of argument "values" violates contract, expected Array got ' + (values === null ? 'null' : (typeof values === 'undefined' ? 'undefined' : _typeof(values)) === 'object' && values.constructor ? values.constructor.name || '[Unknown Object]' : typeof values === 'undefined' ? 'undefined' : _typeof(values)));
            }

            var newValues = (_ref26 = [].concat(_toConsumableArray(this.object))).concat.apply(_ref26, values);

            return _ref14((0, _createNewCrio.createNewCrioList)(newValues));
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

            var reducedValue = this.thaw().reduce(callback, initialValue);

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
            function _ref17(_id17) {
                if (!(_id17 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id17 === null ? 'null' : (typeof _id17 === 'undefined' ? 'undefined' : _typeof(_id17)) === 'object' && _id17.constructor ? _id17.constructor.name || '[Unknown Object]' : typeof _id17 === 'undefined' ? 'undefined' : _typeof(_id17)));
                }

                return _id17;
            }

            var reversedArray = [];

            (0, _functions.forEachRight)(this.thaw(), function (value) {
                reversedArray.push(value);
            });

            return _ref17((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(reversedArray)));
        }

        /**
         * ALias for shift function
         *
         * @returns firstItemInArray<Any>
         */

    }, {
        key: 'shift',
        value: function shift() {
            return this.thaw().shift();
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
            function _ref19(_id19) {
                if (!(_id19 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id19 === null ? 'null' : (typeof _id19 === 'undefined' ? 'undefined' : _typeof(_id19)) === 'object' && _id19.constructor ? _id19.constructor.name || '[Unknown Object]' : typeof _id19 === 'undefined' ? 'undefined' : _typeof(_id19)));
                }

                return _id19;
            }

            if (!(typeof begin === 'number')) {
                throw new TypeError('Value of argument "begin" violates contract, expected number got ' + (begin === null ? 'null' : (typeof begin === 'undefined' ? 'undefined' : _typeof(begin)) === 'object' && begin.constructor ? begin.constructor.name || '[Unknown Object]' : typeof begin === 'undefined' ? 'undefined' : _typeof(begin)));
            }

            if (!(end == null || typeof end === 'number')) {
                throw new TypeError('Value of argument "end" violates contract, expected ?number got ' + (end === null ? 'null' : (typeof end === 'undefined' ? 'undefined' : _typeof(end)) === 'object' && end.constructor ? end.constructor.name || '[Unknown Object]' : typeof end === 'undefined' ? 'undefined' : _typeof(end)));
            }

            var slicedArray = this.thaw().slice(begin, end);

            return _ref19((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(slicedArray)));
        }

        /**
         * Returns true if any items in the array are a match, based on the return in the callback
         *
         * @param callback<Function>
         * @param thisArg<Object[optional]>
         * @returns {boolean}
         */

    }, {
        key: 'some',
        value: function some(callback, thisArg) {
            function _ref20(_id20) {
                if (!(typeof _id20 === 'boolean')) {
                    throw new TypeError('Function return value violates contract, expected bool got ' + (_id20 === null ? 'null' : (typeof _id20 === 'undefined' ? 'undefined' : _typeof(_id20)) === 'object' && _id20.constructor ? _id20.constructor.name || '[Unknown Object]' : typeof _id20 === 'undefined' ? 'undefined' : _typeof(_id20)));
                }

                return _id20;
            }

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            if (!(thisArg == null || thisArg instanceof Object)) {
                throw new TypeError('Value of argument "thisArg" violates contract, expected ?Object got ' + (thisArg === null ? 'null' : (typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)) === 'object' && thisArg.constructor ? thisArg.constructor.name || '[Unknown Object]' : typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)));
            }

            return _ref20(this.thaw().some.call(thisArg, callback));
        }

        /**
         * Applies sort to object, and returns new CrioList with sorted objects
         *
         * @param fn<Function[optional]>
         * @returns {Crio}
         */

    }, {
        key: 'sort',
        value: function sort(fn) {
            function _ref21(_id21) {
                if (!(_id21 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id21 === null ? 'null' : (typeof _id21 === 'undefined' ? 'undefined' : _typeof(_id21)) === 'object' && _id21.constructor ? _id21.constructor.name || '[Unknown Object]' : typeof _id21 === 'undefined' ? 'undefined' : _typeof(_id21)));
                }

                return _id21;
            }

            if (!(fn == null || typeof fn === 'function')) {
                throw new TypeError('Value of argument "fn" violates contract, expected ?Function got ' + (fn === null ? 'null' : (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'object' && fn.constructor ? fn.constructor.name || '[Unknown Object]' : typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
            }

            var sortedObject = this.thaw().sort(fn);

            return _ref21((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(sortedObject)));
        }

        /**
         * Returns a new CrioList with an object including all values except that
         * of the key(s) passed.
         *
         * @param keys<Array>
         * @returns itemWithKeysRemoved<Crio>
         */

    }, {
        key: 'splice',
        value: function splice() {
            var _this3 = this;

            for (var _len3 = arguments.length, keys = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                keys[_key3] = arguments[_key3];
            }

            function _ref22(_id22) {
                if (!(_id22 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id22 === null ? 'null' : (typeof _id22 === 'undefined' ? 'undefined' : _typeof(_id22)) === 'object' && _id22.constructor ? _id22.constructor.name || '[Unknown Object]' : typeof _id22 === 'undefined' ? 'undefined' : _typeof(_id22)));
                }

                return _id22;
            }

            if (!Array.isArray(keys)) {
                throw new TypeError('Value of argument "keys" violates contract, expected Array got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
            }

            if (keys.length === 0) {
                return _ref22((0, _createNewCrio.createNewCrioList)());
            }

            var newValue = [].concat(_toConsumableArray(this.object));

            (0, _functions.forEach)(keys, function (index) {
                newValue = (0, _functions.splice)(_this3.object, index);

                if (!Array.isArray(newValue)) {
                    throw new TypeError('Value of variable "newValue" violates contract, expected Array got ' + (newValue === null ? 'null' : (typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' && newValue.constructor ? newValue.constructor.name || '[Unknown Object]' : typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)));
                }
            });

            return _ref22((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(newValue)));
        }

        /**
         * Converts CrioList into CrioMap
         *
         * @returns {any}
         */

    }, {
        key: 'toMap',
        value: function toMap() {
            function _ref23(_id23) {
                if (!(_id23 instanceof _CrioCollection3.default)) {
                    throw new TypeError('Function return value violates contract, expected CrioCollection got ' + (_id23 === null ? 'null' : (typeof _id23 === 'undefined' ? 'undefined' : _typeof(_id23)) === 'object' && _id23.constructor ? _id23.constructor.name || '[Unknown Object]' : typeof _id23 === 'undefined' ? 'undefined' : _typeof(_id23)));
                }

                return _id23;
            }

            return _ref23(this.mutate(function (mutableList) {
                var map = {};

                (0, _functions.forEach)(mutableList, function (value, index) {
                    map[index] = value;
                });

                return map;
            }));
        }

        /**
         * Returns CrioList with only unique items in original CrioList
         *
         * @returns {CrioList}
         */

    }, {
        key: 'unique',
        value: function unique() {
            function _ref24(_id24) {
                if (!(_id24 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id24 === null ? 'null' : (typeof _id24 === 'undefined' ? 'undefined' : _typeof(_id24)) === 'object' && _id24.constructor ? _id24.constructor.name || '[Unknown Object]' : typeof _id24 === 'undefined' ? 'undefined' : _typeof(_id24)));
                }

                return _id24;
            }

            var uniqueList = [];

            this.forEach(function (value) {
                if (uniqueList.indexOf(value) === -1) {
                    uniqueList.push(value);
                }
            });

            return _ref24((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(uniqueList)));
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
            var _ref27;

            for (var _len4 = arguments.length, values = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                values[_key4] = arguments[_key4];
            }

            function _ref25(_id25) {
                if (!(_id25 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id25 === null ? 'null' : (typeof _id25 === 'undefined' ? 'undefined' : _typeof(_id25)) === 'object' && _id25.constructor ? _id25.constructor.name || '[Unknown Object]' : typeof _id25 === 'undefined' ? 'undefined' : _typeof(_id25)));
                }

                return _id25;
            }

            if (!Array.isArray(values)) {
                throw new TypeError('Value of argument "values" violates contract, expected Array got ' + (values === null ? 'null' : (typeof values === 'undefined' ? 'undefined' : _typeof(values)) === 'object' && values.constructor ? values.constructor.name || '[Unknown Object]' : typeof values === 'undefined' ? 'undefined' : _typeof(values)));
            }

            var newValues = (_ref27 = [].concat(values)).concat.apply(_ref27, _toConsumableArray(this.object));

            return _ref25((0, _createNewCrio.createNewCrioList)(newValues));
        }
    }]);

    return CrioList;
})(_CrioCollection3.default);

exports.default = CrioList;