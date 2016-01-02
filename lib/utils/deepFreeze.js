'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _deepFreezeStrict = require('deep-freeze-strict');

var _deepFreezeStrict2 = _interopRequireDefault(_deepFreezeStrict);

var _recursiveObjectModifications = require('./recursiveObjectModifications');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// external dependencies

// local partial imports

var deepFreezeWithClone = function deepFreezeWithClone(object) {
    var shouldClone = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    if (!(typeof shouldClone === 'boolean')) {
        throw new TypeError('Value of argument "shouldClone" violates contract, expected bool got ' + (shouldClone === null ? 'null' : (typeof shouldClone === 'undefined' ? 'undefined' : _typeof(shouldClone)) === 'object' && shouldClone.constructor ? shouldClone.constructor.name || '[Unknown Object]' : typeof shouldClone === 'undefined' ? 'undefined' : _typeof(shouldClone)));
    }

    if (object) {
        return shouldClone ? (0, _recursiveObjectModifications.cloneObject)(object, true) : (0, _deepFreezeStrict2.default)(object);
    }

    return object;
};

exports.default = deepFreezeWithClone;
module.exports = exports['default'];