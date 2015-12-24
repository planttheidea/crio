'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createNewCrio = require('./utils/createNewCrio');

var _createNewCrio2 = _interopRequireDefault(_createNewCrio);

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CrioList).call(this, obj));
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

            function _ref2(_id2) {
                if (!(_id2 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id2 === null ? 'null' : (typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)) === 'object' && _id2.constructor ? _id2.constructor.name || '[Unknown Object]' : typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)));
                }

                return _id2;
            }

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            if (!Array.isArray(args)) {
                throw new TypeError('Value of argument "args" violates contract, expected Array got ' + (args === null ? 'null' : (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.constructor ? args.constructor.name || '[Unknown Object]' : typeof args === 'undefined' ? 'undefined' : _typeof(args)));
            }

            var values = (_thaw = this.thaw()).filter.apply(_thaw, [callback].concat(args));

            return _ref2((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio2.default)(values)));
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
                    match = (0, _crioFunctions.getCrioInstance)(_this2, (0, _createNewCrio2.default)(value));
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
         * Executes forEach over values stored in this.object
         *
         * @param fn<Function>
         * @param thisArg<Object[optional]>
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

            (0, _functions.forEach)((0, _functions.thaw)(this), fn, thisArg);

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
            function _ref5(_id5) {
                if (!(typeof _id5 === 'boolean')) {
                    throw new TypeError('Function return value violates contract, expected bool got ' + (_id5 === null ? 'null' : (typeof _id5 === 'undefined' ? 'undefined' : _typeof(_id5)) === 'object' && _id5.constructor ? _id5.constructor.name || '[Unknown Object]' : typeof _id5 === 'undefined' ? 'undefined' : _typeof(_id5)));
                }

                return _id5;
            }

            return _ref5(this.indexOf(value) !== -1);
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
            function _ref6(_id6) {
                if (!(typeof _id6 === 'number')) {
                    throw new TypeError('Function return value violates contract, expected number got ' + (_id6 === null ? 'null' : (typeof _id6 === 'undefined' ? 'undefined' : _typeof(_id6)) === 'object' && _id6.constructor ? _id6.constructor.name || '[Unknown Object]' : typeof _id6 === 'undefined' ? 'undefined' : _typeof(_id6)));
                }

                return _id6;
            }

            if ((0, _checkers.isValueless)(value)) {
                return -1;
            }

            return _ref6(this.object.indexOf(value));
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

            function _ref7(_id7) {
                if (!(typeof _id7 === 'string')) {
                    throw new TypeError('Function return value violates contract, expected string got ' + (_id7 === null ? 'null' : (typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)) === 'object' && _id7.constructor ? _id7.constructor.name || '[Unknown Object]' : typeof _id7 === 'undefined' ? 'undefined' : _typeof(_id7)));
                }

                return _id7;
            }

            if (!(typeof joiner === 'string')) {
                throw new TypeError('Value of argument "joiner" violates contract, expected string got ' + (joiner === null ? 'null' : (typeof joiner === 'undefined' ? 'undefined' : _typeof(joiner)) === 'object' && joiner.constructor ? joiner.constructor.name || '[Unknown Object]' : typeof joiner === 'undefined' ? 'undefined' : _typeof(joiner)));
            }

            return _ref7(this.object.join(joiner));
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
            function _ref8(_id8) {
                if (!(typeof _id8 === 'number')) {
                    throw new TypeError('Function return value violates contract, expected number got ' + (_id8 === null ? 'null' : (typeof _id8 === 'undefined' ? 'undefined' : _typeof(_id8)) === 'object' && _id8.constructor ? _id8.constructor.name || '[Unknown Object]' : typeof _id8 === 'undefined' ? 'undefined' : _typeof(_id8)));
                }

                return _id8;
            }

            if ((0, _checkers.isValueless)(value)) {
                return -1;
            }

            return _ref8(this.object.lastIndexOf(value));
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
            function _ref9(_id9) {
                if (!(_id9 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id9 === null ? 'null' : (typeof _id9 === 'undefined' ? 'undefined' : _typeof(_id9)) === 'object' && _id9.constructor ? _id9.constructor.name || '[Unknown Object]' : typeof _id9 === 'undefined' ? 'undefined' : _typeof(_id9)));
                }

                return _id9;
            }

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            if (!(thisArg == null || thisArg instanceof Object)) {
                throw new TypeError('Value of argument "thisArg" violates contract, expected ?Object got ' + (thisArg === null ? 'null' : (typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)) === 'object' && thisArg.constructor ? thisArg.constructor.name || '[Unknown Object]' : typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)));
            }

            var values = this.thaw().map(callback, thisArg);

            return _ref9((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio2.default)(values)));
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
            var _ref21;

            for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                values[_key2] = arguments[_key2];
            }

            function _ref11(_id11) {
                if (!(_id11 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id11 === null ? 'null' : (typeof _id11 === 'undefined' ? 'undefined' : _typeof(_id11)) === 'object' && _id11.constructor ? _id11.constructor.name || '[Unknown Object]' : typeof _id11 === 'undefined' ? 'undefined' : _typeof(_id11)));
                }

                return _id11;
            }

            if (!Array.isArray(values)) {
                throw new TypeError('Value of argument "values" violates contract, expected Array got ' + (values === null ? 'null' : (typeof values === 'undefined' ? 'undefined' : _typeof(values)) === 'object' && values.constructor ? values.constructor.name || '[Unknown Object]' : typeof values === 'undefined' ? 'undefined' : _typeof(values)));
            }

            var newValues = (_ref21 = [].concat(_toConsumableArray(this.object))).concat.apply(_ref21, values);

            return _ref11((0, _createNewCrio2.default)(newValues));
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
            function _ref14(_id14) {
                if (!(_id14 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id14 === null ? 'null' : (typeof _id14 === 'undefined' ? 'undefined' : _typeof(_id14)) === 'object' && _id14.constructor ? _id14.constructor.name || '[Unknown Object]' : typeof _id14 === 'undefined' ? 'undefined' : _typeof(_id14)));
                }

                return _id14;
            }

            var reversedArray = [];

            (0, _functions.forEachRight)(this.thaw(), function (value) {
                reversedArray.push(value);
            });

            return _ref14((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio2.default)(reversedArray)));
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
            function _ref16(_id16) {
                if (!(_id16 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id16 === null ? 'null' : (typeof _id16 === 'undefined' ? 'undefined' : _typeof(_id16)) === 'object' && _id16.constructor ? _id16.constructor.name || '[Unknown Object]' : typeof _id16 === 'undefined' ? 'undefined' : _typeof(_id16)));
                }

                return _id16;
            }

            if (!(typeof begin === 'number')) {
                throw new TypeError('Value of argument "begin" violates contract, expected number got ' + (begin === null ? 'null' : (typeof begin === 'undefined' ? 'undefined' : _typeof(begin)) === 'object' && begin.constructor ? begin.constructor.name || '[Unknown Object]' : typeof begin === 'undefined' ? 'undefined' : _typeof(begin)));
            }

            if (!(end == null || typeof end === 'number')) {
                throw new TypeError('Value of argument "end" violates contract, expected ?number got ' + (end === null ? 'null' : (typeof end === 'undefined' ? 'undefined' : _typeof(end)) === 'object' && end.constructor ? end.constructor.name || '[Unknown Object]' : typeof end === 'undefined' ? 'undefined' : _typeof(end)));
            }

            var slicedArray = this.thaw().slice(begin, end);

            return _ref16((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio2.default)(slicedArray)));
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
            function _ref17(_id17) {
                if (!(typeof _id17 === 'boolean')) {
                    throw new TypeError('Function return value violates contract, expected bool got ' + (_id17 === null ? 'null' : (typeof _id17 === 'undefined' ? 'undefined' : _typeof(_id17)) === 'object' && _id17.constructor ? _id17.constructor.name || '[Unknown Object]' : typeof _id17 === 'undefined' ? 'undefined' : _typeof(_id17)));
                }

                return _id17;
            }

            if (!(typeof callback === 'function')) {
                throw new TypeError('Value of argument "callback" violates contract, expected Function got ' + (callback === null ? 'null' : (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.constructor ? callback.constructor.name || '[Unknown Object]' : typeof callback === 'undefined' ? 'undefined' : _typeof(callback)));
            }

            if (!(thisArg == null || thisArg instanceof Object)) {
                throw new TypeError('Value of argument "thisArg" violates contract, expected ?Object got ' + (thisArg === null ? 'null' : (typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)) === 'object' && thisArg.constructor ? thisArg.constructor.name || '[Unknown Object]' : typeof thisArg === 'undefined' ? 'undefined' : _typeof(thisArg)));
            }

            return _ref17(this.thaw().some.call(thisArg, callback));
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
            function _ref18(_id18) {
                if (!(_id18 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id18 === null ? 'null' : (typeof _id18 === 'undefined' ? 'undefined' : _typeof(_id18)) === 'object' && _id18.constructor ? _id18.constructor.name || '[Unknown Object]' : typeof _id18 === 'undefined' ? 'undefined' : _typeof(_id18)));
                }

                return _id18;
            }

            if (!(fn == null || typeof fn === 'function')) {
                throw new TypeError('Value of argument "fn" violates contract, expected ?Function got ' + (fn === null ? 'null' : (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'object' && fn.constructor ? fn.constructor.name || '[Unknown Object]' : typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
            }

            var sortedObject = this.thaw().sort(fn);

            return _ref18((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio2.default)(sortedObject)));
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

            function _ref19(_id19) {
                if (!(_id19 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id19 === null ? 'null' : (typeof _id19 === 'undefined' ? 'undefined' : _typeof(_id19)) === 'object' && _id19.constructor ? _id19.constructor.name || '[Unknown Object]' : typeof _id19 === 'undefined' ? 'undefined' : _typeof(_id19)));
                }

                return _id19;
            }

            if (!Array.isArray(keys)) {
                throw new TypeError('Value of argument "keys" violates contract, expected Array got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
            }

            if (keys.length === 0) {
                return _ref19((0, _createNewCrio2.default)());
            }

            var newValue = [].concat(_toConsumableArray(this.object));

            (0, _functions.forEach)(keys, function (index) {
                newValue = (0, _functions.splice)(_this3.object, index);

                if (!Array.isArray(newValue)) {
                    throw new TypeError('Value of variable "newValue" violates contract, expected Array got ' + (newValue === null ? 'null' : (typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' && newValue.constructor ? newValue.constructor.name || '[Unknown Object]' : typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)));
                }
            });

            return _ref19((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio2.default)(newValue)));
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
            var _ref22;

            for (var _len4 = arguments.length, values = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                values[_key4] = arguments[_key4];
            }

            function _ref20(_id20) {
                if (!(_id20 instanceof CrioList)) {
                    throw new TypeError('Function return value violates contract, expected CrioList got ' + (_id20 === null ? 'null' : (typeof _id20 === 'undefined' ? 'undefined' : _typeof(_id20)) === 'object' && _id20.constructor ? _id20.constructor.name || '[Unknown Object]' : typeof _id20 === 'undefined' ? 'undefined' : _typeof(_id20)));
                }

                return _id20;
            }

            if (!Array.isArray(values)) {
                throw new TypeError('Value of argument "values" violates contract, expected Array got ' + (values === null ? 'null' : (typeof values === 'undefined' ? 'undefined' : _typeof(values)) === 'object' && values.constructor ? values.constructor.name || '[Unknown Object]' : typeof values === 'undefined' ? 'undefined' : _typeof(values)));
            }

            var newValues = (_ref22 = [].concat(values)).concat.apply(_ref22, _toConsumableArray(this.object));

            return _ref20((0, _createNewCrio2.default)(newValues));
        }
    }]);

    return CrioList;
})(_CrioCollection3.default);

exports.default = CrioList;