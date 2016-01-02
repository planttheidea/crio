'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setCrioIdentifier = exports.getCrioIdentifier = undefined;

var _functions = require('../utils/functions');

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var CRIO_IDENTIFIER = '$$crio';

var getCrioIdentifier = function getCrioIdentifier() {
    return CRIO_IDENTIFIER;
};

var setCrioIdentifier = function setCrioIdentifier(obj, type) {
    if (!(obj instanceof Object)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Object got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    if (!(Array.isArray(type) || type instanceof Date || type instanceof Object)) {
        throw new TypeError('Value of argument "type" violates contract, expected Array | Date | Object got ' + (type === null ? 'null' : (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type.constructor ? type.constructor.name || '[Unknown Object]' : typeof type === 'undefined' ? 'undefined' : _typeof(type)));
    }

    (0, _functions.setReadonly)(obj, CRIO_IDENTIFIER, type);
};

exports.getCrioIdentifier = getCrioIdentifier;
exports.setCrioIdentifier = setCrioIdentifier;
exports.default = {
    getCrioIdentifier: getCrioIdentifier,
    setCrioIdentifier: setCrioIdentifier
};