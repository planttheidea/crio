'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setCrioArrayOrObjectMethods = require('./setCrioArrayOrObjectMethods');

var _setCrioArrayOrObjectMethods2 = _interopRequireDefault(_setCrioArrayOrObjectMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PROTOTYPE_METHODS = ['concat', 'copyWithin', 'entries', 'every', 'fill', 'filter', 'find', 'findIndex', 'forEach', 'includes', 'indexOf', 'join', 'keys', 'lastIndexOf', 'map', 'pop', 'push', 'reduce', 'reduceRight', 'reverse', 'shift', 'slice', 'some', 'sort', 'splice', 'toLocaleString', 'toString', 'unshift', 'values'];

// local imports

var MUTABLE_METHODS = ['copyWithin', 'fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];

var crioArrayPrototype = Object.create(Array.prototype);

exports.default = _setCrioArrayOrObjectMethods2.default.call(crioArrayPrototype, Array, crioArrayPrototype, PROTOTYPE_METHODS, MUTABLE_METHODS);
module.exports = exports['default'];