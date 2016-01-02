'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _setCrioDateMethods = require('./setCrioDateMethods');

var _setCrioDateMethods2 = _interopRequireDefault(_setCrioDateMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PROTOTYPE_METHODS = ['getDate', 'getDay', 'getFullYear', 'getHours', 'getMilliseconds', 'getMinutes', 'getMonth', 'getSeconds', 'getTime', 'getTimezoneOffset', 'getUTCDate', 'getUTCDay', 'getUTCFullYear', 'getUTCHours', 'getUTCMilliseconds', 'getUTCMinutes', 'getUTCMonth', 'getUTCSeconds', 'getYear', 'setDate', 'setFullYear', 'setHours', 'setMilliseconds', 'setMinutes', 'setMonth', 'setSeconds', 'setTime', 'setUTCDate', 'setUTCFullYear', 'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes', 'setUTCMonth', 'setUTCSeconds', 'setYear', 'toDateString', 'toGMTString', 'toISOString', 'toJSON', 'toLocaleDateString', 'toLocaleString', 'toLocaleTimeString', 'toString', 'toTimeString', 'toUTCString', 'valueOf'];

// local imports

var MUTABLE_METHODS = ['setDate', 'setFullYear', 'setHours', 'setMilliseconds', 'setMinutes', 'setMonth', 'setSeconds', 'setTime', 'setUTCDate', 'setUTCFullYear', 'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes', 'setUTCMonth', 'setUTCSeconds', 'setYear'];

var CUSTOM_METHODS = [];

var crioDatePrototype = Object.create(Date.prototype);

exports.default = _setCrioDateMethods2.default.call(crioDatePrototype, crioDatePrototype, PROTOTYPE_METHODS, MUTABLE_METHODS, CUSTOM_METHODS);
module.exports = exports['default'];