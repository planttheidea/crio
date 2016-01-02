'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _deepFreeze = require('../utils/deepFreeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _setPrototypeOf = require('../utils/setPrototypeOf');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local imports

var ArrayOrObject = function ArrayOrObject(input) {
    return Array.isArray(input) || input instanceof Object;
};

var coalesceCrio = function coalesceCrio(obj, newObj) {
    var prototype = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    var applyPrototype = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

    function _ref(_id) {
        if (!ArrayOrObject(_id)) {
            throw new TypeError('Function return value violates contract, expected ArrayOrObject got ' + (_id === null ? 'null' : (typeof _id === 'undefined' ? 'undefined' : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === 'undefined' ? 'undefined' : _typeof(_id)));
        }

        return _id;
    }

    if (!ArrayOrObject(obj)) {
        throw new TypeError('Value of argument "obj" violates contract, expected ArrayOrObject got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    if (!ArrayOrObject(newObj)) {
        throw new TypeError('Value of argument "newObj" violates contract, expected ArrayOrObject got ' + (newObj === null ? 'null' : (typeof newObj === 'undefined' ? 'undefined' : _typeof(newObj)) === 'object' && newObj.constructor ? newObj.constructor.name || '[Unknown Object]' : typeof newObj === 'undefined' ? 'undefined' : _typeof(newObj)));
    }

    if (!(prototype instanceof Object)) {
        throw new TypeError('Value of argument "prototype" violates contract, expected Object got ' + (prototype === null ? 'null' : (typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)) === 'object' && prototype.constructor ? prototype.constructor.name || '[Unknown Object]' : typeof prototype === 'undefined' ? 'undefined' : _typeof(prototype)));
    }

    if (!(typeof applyPrototype === 'boolean')) {
        throw new TypeError('Value of argument "applyPrototype" violates contract, expected bool got ' + (applyPrototype === null ? 'null' : (typeof applyPrototype === 'undefined' ? 'undefined' : _typeof(applyPrototype)) === 'object' && applyPrototype.constructor ? applyPrototype.constructor.name || '[Unknown Object]' : typeof applyPrototype === 'undefined' ? 'undefined' : _typeof(applyPrototype)));
    }

    if (applyPrototype) {
        (0, _setPrototypeOf2.default)(newObj, prototype);
    }

    if (obj.equals(newObj)) {
        return _ref(obj);
    }

    return _ref(obj.isFrozen() ? (0, _deepFreeze2.default)(newObj, false) : newObj);
};

exports.default = coalesceCrio;
module.exports = exports['default'];