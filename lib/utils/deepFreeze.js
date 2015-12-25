'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createNewCrio = require('./createNewCrio');

var _checkers = require('./checkers');

var _functions = require('./functions');

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local imports

// local partial imports

var deepFreeze = function deepFreeze(obj) {
    var propNames = Object.getOwnPropertyNames(obj);

    if (!Array.isArray(propNames)) {
        throw new TypeError('Value of variable "propNames" violates contract, expected Array got ' + (propNames === null ? 'null' : (typeof propNames === 'undefined' ? 'undefined' : _typeof(propNames)) === 'object' && propNames.constructor ? propNames.constructor.name || '[Unknown Object]' : typeof propNames === 'undefined' ? 'undefined' : _typeof(propNames)));
    }

    (0, _functions.forEach)(propNames, function (name) {
        var value = obj[name];

        if ((0, _checkers.isArray)(value) || (0, _checkers.isObject)(value)) {
            obj[name] = (0, _createNewCrio.createNewCrio)(value);
        }
    });

    return Object.freeze(obj);
};

exports.default = deepFreeze;