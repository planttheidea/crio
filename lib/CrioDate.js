'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

// local imports

// local partial imports

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _deepFreeze = require('./utils/deepFreeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _checkers = require('./utils/checkers');

var _crioCheckers = require('./utils/crioCheckers');

var _crioFunctions = require('./utils/crioFunctions');

var _functions = require('./utils/functions');

var _decorators = require('./utils/decorators');

var _hash = require('./utils/hash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MUTABLE_METHODS = ['setTime', 'setMilliseconds', 'setUTCMilliseconds', 'setSeconds', 'setUTCSeconds', 'setMinutes', 'setUTCMinutes', 'setHours', 'setUTCHours', 'setDate', 'setUTCDate', 'setMonth', 'setUTCMonth', 'setFullYear', 'setUTCFullYear', 'setYear'];

var CrioDate = (function () {
    function CrioDate(obj) {
        _classCallCheck(this, CrioDate);

        if (!(obj instanceof Date)) {
            throw new TypeError('Value of argument "obj" violates contract, expected Date got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
        }

        (0, _decorators.staticProperty)(this, 'hashCode', (0, _hash.hashString)(obj));
        (0, _decorators.readonlyProperty)(this, 'object', obj);
        (0, _decorators.readonlyProperty)(this, 'size', 1);
    }

    /**
     * Tests if object passed is equal to the current Crio object
     *
     * @param crio2<Crio>
     * @returns {boolean}
     */

    _createClass(CrioDate, [{
        key: 'equals',
        value: function equals(crio2) {
            function _ref(_id) {
                if (!(typeof _id === 'boolean')) {
                    throw new TypeError('Function return value violates contract, expected bool got ' + (_id === null ? 'null' : (typeof _id === 'undefined' ? 'undefined' : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === 'undefined' ? 'undefined' : _typeof(_id)));
                }

                return _id;
            }

            if (!(crio2 instanceof Object)) {
                throw new TypeError('Value of argument "crio2" violates contract, expected Object got ' + (crio2 === null ? 'null' : (typeof crio2 === 'undefined' ? 'undefined' : _typeof(crio2)) === 'object' && crio2.constructor ? crio2.constructor.name || '[Unknown Object]' : typeof crio2 === 'undefined' ? 'undefined' : _typeof(crio2)));
            }

            if ((0, _checkers.isValueless)(crio2)) {
                return false;
            }

            return _ref((0, _crioCheckers.isSameCrio)(this, crio2));
        }
    }, {
        key: 'thaw',
        value: function thaw() {
            function _ref2(_id2) {
                if (!(_id2 instanceof Date)) {
                    throw new TypeError('Function return value violates contract, expected Date got ' + (_id2 === null ? 'null' : (typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)) === 'object' && _id2.constructor ? _id2.constructor.name || '[Unknown Object]' : typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)));
                }

                return _id2;
            }

            return _ref2((0, _crioFunctions.thaw)(this));
        }
    }]);

    return CrioDate;
})();

var addPrototypeMethod = function addPrototypeMethod(method) {
    if (!(typeof method === 'string')) {
        throw new TypeError('Value of argument "method" violates contract, expected string got ' + (method === null ? 'null' : (typeof method === 'undefined' ? 'undefined' : _typeof(method)) === 'object' && method.constructor ? method.constructor.name || '[Unknown Object]' : typeof method === 'undefined' ? 'undefined' : _typeof(method)));
    }

    if (MUTABLE_METHODS.indexOf(method) === -1) {
        /**
         * Accepts standard Date parameters and returns a CrioDate created with the
         * existing immutable Date prototype functions.
         *
         * @param args<Array>
         * @returns {CrioDate}
         */
        return function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            function _ref3(_id3) {
                if (!(_id3 instanceof CrioDate || typeof _id3 === 'number' || typeof _id3 === 'string')) {
                    throw new TypeError('Function return value violates contract, expected CrioDate | number | string got ' + (_id3 === null ? 'null' : (typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)) === 'object' && _id3.constructor ? _id3.constructor.name || '[Unknown Object]' : typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)));
                }

                return _id3;
            }

            if (!Array.isArray(args)) {
                throw new TypeError('Value of argument "args" violates contract, expected Array got ' + (args === null ? 'null' : (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.constructor ? args.constructor.name || '[Unknown Object]' : typeof args === 'undefined' ? 'undefined' : _typeof(args)));
            }

            var result = Date.prototype[method].apply(this.object, args);

            if (!(result instanceof Date || typeof result === 'number' || typeof result === 'string')) {
                throw new TypeError('Value of variable "result" violates contract, expected Date | number | string got ' + (result === null ? 'null' : (typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object' && result.constructor ? result.constructor.name || '[Unknown Object]' : typeof result === 'undefined' ? 'undefined' : _typeof(result)));
            }

            if ((0, _checkers.isDate)(result)) {
                var newDate = new Date(result.valueOf());

                return new CrioDate((0, _deepFreeze2.default)(newDate));
            }

            return _ref3(result);
        };
    }

    /**
     * Accepts standard Date parameters and returns a CrioDate created with a cloned version
     * of the original date with the mutation applied
     *
     * @param args<Array>
     * @returns {CrioDate}
     */
    return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        if (!Array.isArray(args)) {
            throw new TypeError('Value of argument "args" violates contract, expected Array got ' + (args === null ? 'null' : (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.constructor ? args.constructor.name || '[Unknown Object]' : typeof args === 'undefined' ? 'undefined' : _typeof(args)));
        }

        var cloneDate = new Date(this.object.valueOf());

        Date.prototype[method].apply(cloneDate, args);

        return new CrioDate((0, _deepFreeze2.default)(cloneDate));
    };
};

var prototypeMethods = Object.getOwnPropertyNames(Date.prototype);

if (!Array.isArray(prototypeMethods)) {
    throw new TypeError('Value of variable "prototypeMethods" violates contract, expected Array got ' + (prototypeMethods === null ? 'null' : (typeof prototypeMethods === 'undefined' ? 'undefined' : _typeof(prototypeMethods)) === 'object' && prototypeMethods.constructor ? prototypeMethods.constructor.name || '[Unknown Object]' : typeof prototypeMethods === 'undefined' ? 'undefined' : _typeof(prototypeMethods)));
}

prototypeMethods.splice(prototypeMethods.indexOf('constructor'), 1);

(0, _functions.forEach)(prototypeMethods, function (method) {
    CrioDate.prototype[method] = addPrototypeMethod(method);
});

exports.default = CrioDate;