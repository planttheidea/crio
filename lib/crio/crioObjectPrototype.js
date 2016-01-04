'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setCrioArrayOrObjectMethods = require('./setCrioArrayOrObjectMethods');

var _setCrioArrayOrObjectMethods2 = _interopRequireDefault(_setCrioArrayOrObjectMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PROTOTYPE_METHODS = ['entries', 'filter', 'forEach', 'hasOwnProperty', 'isPrototypeOf', 'keys', 'map', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'values'];

// local imports

var MUTABLE_METHODS = [];

var crioObjectPrototype = Object.create(Object.prototype);

exports.default = _setCrioArrayOrObjectMethods2.default.call(crioObjectPrototype, Object, crioObjectPrototype, PROTOTYPE_METHODS, MUTABLE_METHODS);
module.exports = exports['default'];