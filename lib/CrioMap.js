'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _checkers = require('./utils/checkers');

var _createNewCrio = require('./utils/createNewCrio');

var _CrioCollection2 = require('./CrioCollection');

var _CrioCollection3 = _interopRequireDefault(_CrioCollection2);

var _crioFunctions = require('./utils/crioFunctions');

var _functions = require('./utils/functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// local imports

// local partial imports

var CrioMap = (function (_CrioCollection) {
    _inherits(CrioMap, _CrioCollection);

    function CrioMap(obj) {
        _classCallCheck(this, CrioMap);

        if (!(obj instanceof Object)) {
            throw new TypeError('Value of argument "obj" violates contract, expected Object got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
        }

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CrioMap).call(this, obj));
    }

    /**
     * Returns a new Crio with an object including all values except that
     * of the key(s) passed.
     *
     * @param keys<Array>
     * @returns itemWithKeysRemoved<Crio>
     */

    _createClass(CrioMap, [{
        key: 'delete',
        value: function _delete() {
            for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
                keys[_key] = arguments[_key];
            }

            function _ref(_id) {
                if (!(_id instanceof CrioMap)) {
                    throw new TypeError('Function return value violates contract, expected CrioMap got ' + (_id === null ? 'null' : (typeof _id === 'undefined' ? 'undefined' : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === 'undefined' ? 'undefined' : _typeof(_id)));
                }

                return _id;
            }

            if (!Array.isArray(keys)) {
                throw new TypeError('Value of argument "keys" violates contract, expected Array got ' + (keys === null ? 'null' : (typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) === 'object' && keys.constructor ? keys.constructor.name || '[Unknown Object]' : typeof keys === 'undefined' ? 'undefined' : _typeof(keys)));
            }

            if (keys.length === 0) {
                return _ref((0, _createNewCrio.createNewCrioMap)());
            }

            var newValue = _extends({}, this.object);

            (0, _functions.forEach)(keys, function (key) {
                delete newValue[key];
            });

            return _ref((0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioMap)(newValue)));
        }

        /**
         * Alias for Object.prototype.hasOwnProperty
         *
         * @param
         * @returns {boolean}prop<any>
         */

    }, {
        key: 'has',
        value: function has(prop) {
            function _ref2(_id2) {
                if (!(typeof _id2 === 'boolean')) {
                    throw new TypeError('Function return value violates contract, expected bool got ' + (_id2 === null ? 'null' : (typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)) === 'object' && _id2.constructor ? _id2.constructor.name || '[Unknown Object]' : typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)));
                }

                return _id2;
            }

            if (!(0, _checkers.isString)(prop)) {
                prop = prop.toString();
            }

            return _ref2(this.object.hasOwnProperty(prop));
        }

        /**
         * Converts CrioMap to a CrioList, where each item is a value from the key:value pairs
         * in the original map
         *
         * @returns {CrioCollection}
         */

    }, {
        key: 'toList',
        value: function toList() {
            function _ref3(_id3) {
                if (!(_id3 instanceof _CrioCollection3.default)) {
                    throw new TypeError('Function return value violates contract, expected CrioCollection got ' + (_id3 === null ? 'null' : (typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)) === 'object' && _id3.constructor ? _id3.constructor.name || '[Unknown Object]' : typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)));
                }

                return _id3;
            }

            return _ref3(this.mutate(function (mutableObject) {
                var list = [];

                (0, _functions.forIn)(mutableObject, function (value) {
                    list.push(value);
                });

                return list;
            }));
        }
    }]);

    return CrioMap;
})(_CrioCollection3.default);

exports.default = CrioMap;