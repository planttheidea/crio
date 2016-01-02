'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toJS = exports.thaw = exports.isFrozen = exports.hashCode = exports.freeze = exports.equals = undefined;

var _deepFreeze = require('../utils/deepFreeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _crioIdentifier = require('./crioIdentifier');

var _hash = require('../utils/hash');

var _recursiveObjectModifications = require('../utils/recursiveObjectModifications');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local imports

// local partial imports

var Crio = function Crio(input) {
    return Array.isArray(input) || input instanceof Date || input instanceof Object;
};

var CRIO_IDENTIFIER = (0, _crioIdentifier.getCrioIdentifier)();

var equals = function equals(obj) {
    if (obj[CRIO_IDENTIFIER]) {
        return this.hashCode() === obj.hashCode();
    }

    return false;
};

var freeze = function freeze() {
    function _ref2(_id2) {
        if (!Crio(_id2)) {
            throw new TypeError('Function return value violates contract, expected Crio got ' + (_id2 === null ? 'null' : (typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)) === 'object' && _id2.constructor ? _id2.constructor.name || '[Unknown Object]' : typeof _id2 === 'undefined' ? 'undefined' : _typeof(_id2)));
        }

        return _id2;
    }

    return _ref2((0, _deepFreeze2.default)(this));
};

var hashCode = function hashCode() {
    function _ref3(_id3) {
        if (!(typeof _id3 === 'number')) {
            throw new TypeError('Function return value violates contract, expected number got ' + (_id3 === null ? 'null' : (typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)) === 'object' && _id3.constructor ? _id3.constructor.name || '[Unknown Object]' : typeof _id3 === 'undefined' ? 'undefined' : _typeof(_id3)));
        }

        return _id3;
    }

    return _ref3((0, _hash.hashObject)(this));
};

var isFrozen = function isFrozen() {
    function _ref4(_id4) {
        if (!(typeof _id4 === 'boolean')) {
            throw new TypeError('Function return value violates contract, expected bool got ' + (_id4 === null ? 'null' : (typeof _id4 === 'undefined' ? 'undefined' : _typeof(_id4)) === 'object' && _id4.constructor ? _id4.constructor.name || '[Unknown Object]' : typeof _id4 === 'undefined' ? 'undefined' : _typeof(_id4)));
        }

        return _id4;
    }

    return _ref4(Object.isFrozen(this));
};

var thaw = function thaw() {
    function _ref5(_id5) {
        if (!Crio(_id5)) {
            throw new TypeError('Function return value violates contract, expected Crio got ' + (_id5 === null ? 'null' : (typeof _id5 === 'undefined' ? 'undefined' : _typeof(_id5)) === 'object' && _id5.constructor ? _id5.constructor.name || '[Unknown Object]' : typeof _id5 === 'undefined' ? 'undefined' : _typeof(_id5)));
        }

        return _id5;
    }

    return _ref5((0, _recursiveObjectModifications.cloneObject)(this));
};

var toJS = function toJS() {
    function _ref6(_id6) {
        if (!Crio(_id6)) {
            throw new TypeError('Function return value violates contract, expected Crio got ' + (_id6 === null ? 'null' : (typeof _id6 === 'undefined' ? 'undefined' : _typeof(_id6)) === 'object' && _id6.constructor ? _id6.constructor.name || '[Unknown Object]' : typeof _id6 === 'undefined' ? 'undefined' : _typeof(_id6)));
        }

        return _id6;
    }

    return _ref6((0, _recursiveObjectModifications.cloneObject)(this, false, false));
};

exports.equals = equals;
exports.freeze = freeze;
exports.hashCode = hashCode;
exports.isFrozen = isFrozen;
exports.thaw = thaw;
exports.toJS = toJS;
exports.default = {
    equals: equals,
    freeze: freeze,
    hashCode: hashCode,
    isFrozen: isFrozen,
    thaw: thaw,
    toJS: toJS
};