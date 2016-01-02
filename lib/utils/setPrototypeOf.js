'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _checkers = require('./checkers');

// polyfill for back to IE9 (since core-js doesn't do this)
var setDeprecatedProtoProperty = function setDeprecatedProtoProperty(obj, proto) {
    obj.__proto__ = proto;
};

// really old fallback in case __proto__ property is unavailable

// local imports
var assignProtoPropsDirectly = function assignProtoPropsDirectly(obj, proto) {
    for (var prop in proto) {
        if (proto.hasOwnProperty(prop)) {
            obj[prop] = proto[prop];
        }
    }
};

exports.default = (0, _checkers.isFunction)(Object.setPrototypeOf) ? Object.setPrototypeOf : ({ __proto__: [] }) instanceof Array ? setDeprecatedProtoProperty : assignProtoPropsDirectly;
module.exports = exports['default'];