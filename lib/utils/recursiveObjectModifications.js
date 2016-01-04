'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setDeepPrototype = exports.cloneObject = undefined;

var _setPrototypeOf = require('./setPrototypeOf');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _crioArrayPrototype = require('../crio/crioArrayPrototype');

var _crioArrayPrototype2 = _interopRequireDefault(_crioArrayPrototype);

var _crioDatePrototype = require('../crio/crioDatePrototype');

var _crioDatePrototype2 = _interopRequireDefault(_crioDatePrototype);

var _crioObjectPrototype = require('../crio/crioObjectPrototype');

var _crioObjectPrototype2 = _interopRequireDefault(_crioObjectPrototype);

var _checkers = require('./checkers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local imports

// local imports

// local partial imports

var create = Object.create;
var freeze = Object.freeze;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var isFrozen = Object.isFrozen;

var freezeIfApplicable = function freezeIfApplicable(obj, shouldFreeze) {
    function _ref(_id) {
        if (!(Array.isArray(_id) || _id instanceof Object)) {
            throw new TypeError('Function return value violates contract, expected Array | Object got ' + (_id === null ? 'null' : (typeof _id === 'undefined' ? 'undefined' : _typeof(_id)) === 'object' && _id.constructor ? _id.constructor.name || '[Unknown Object]' : typeof _id === 'undefined' ? 'undefined' : _typeof(_id)));
        }

        return _id;
    }

    if (!(Array.isArray(obj) || obj instanceof Object)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Array | Object got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    if (!(typeof shouldFreeze === 'boolean')) {
        throw new TypeError('Value of argument "shouldFreeze" violates contract, expected bool got ' + (shouldFreeze === null ? 'null' : (typeof shouldFreeze === 'undefined' ? 'undefined' : _typeof(shouldFreeze)) === 'object' && shouldFreeze.constructor ? shouldFreeze.constructor.name || '[Unknown Object]' : typeof shouldFreeze === 'undefined' ? 'undefined' : _typeof(shouldFreeze)));
    }

    return _ref(shouldFreeze ? freeze(obj) : obj);
};

var cloneObj = function cloneObj(obj, visited, shouldFreeze, shouldApplyPrototype) {
    if (!(visited instanceof Object)) {
        throw new TypeError('Value of argument "visited" violates contract, expected Object got ' + (visited === null ? 'null' : (typeof visited === 'undefined' ? 'undefined' : _typeof(visited)) === 'object' && visited.constructor ? visited.constructor.name || '[Unknown Object]' : typeof visited === 'undefined' ? 'undefined' : _typeof(visited)));
    }

    if (!(typeof shouldFreeze === 'boolean')) {
        throw new TypeError('Value of argument "shouldFreeze" violates contract, expected bool got ' + (shouldFreeze === null ? 'null' : (typeof shouldFreeze === 'undefined' ? 'undefined' : _typeof(shouldFreeze)) === 'object' && shouldFreeze.constructor ? shouldFreeze.constructor.name || '[Unknown Object]' : typeof shouldFreeze === 'undefined' ? 'undefined' : _typeof(shouldFreeze)));
    }

    if (!(typeof shouldApplyPrototype === 'boolean')) {
        throw new TypeError('Value of argument "shouldApplyPrototype" violates contract, expected bool got ' + (shouldApplyPrototype === null ? 'null' : (typeof shouldApplyPrototype === 'undefined' ? 'undefined' : _typeof(shouldApplyPrototype)) === 'object' && shouldApplyPrototype.constructor ? shouldApplyPrototype.constructor.name || '[Unknown Object]' : typeof shouldApplyPrototype === 'undefined' ? 'undefined' : _typeof(shouldApplyPrototype)));
    }

    var isObjArray = (0, _checkers.isArray)(obj);

    if (isObjArray || (0, _checkers.isObject)(obj)) {
        var clonedObject = isObjArray ? [] : {};

        if (!(Array.isArray(clonedObject) || clonedObject instanceof Object)) {
            throw new TypeError('Value of variable "clonedObject" violates contract, expected Array | Object got ' + (clonedObject === null ? 'null' : (typeof clonedObject === 'undefined' ? 'undefined' : _typeof(clonedObject)) === 'object' && clonedObject.constructor ? clonedObject.constructor.name || '[Unknown Object]' : typeof clonedObject === 'undefined' ? 'undefined' : _typeof(clonedObject)));
        }

        if (shouldApplyPrototype) {
            if (isObjArray) {
                (0, _setPrototypeOf2.default)(clonedObject, _crioArrayPrototype2.default);
            } else {
                clonedObject = create(_crioObjectPrototype2.default);

                if (!(Array.isArray(clonedObject) || clonedObject instanceof Object)) {
                    throw new TypeError('Value of variable "clonedObject" violates contract, expected Array | Object got ' + (clonedObject === null ? 'null' : (typeof clonedObject === 'undefined' ? 'undefined' : _typeof(clonedObject)) === 'object' && clonedObject.constructor ? clonedObject.constructor.name || '[Unknown Object]' : typeof clonedObject === 'undefined' ? 'undefined' : _typeof(clonedObject)));
                }
            }
        }

        if (isObjArray) {
            for (var i = 0, len = obj.length; i < len; i++) {
                var visitedIndex = visited.indexOf(obj[i]);

                clonedObject[i] = visitedIndex !== -1 ? visited[visitedIndex] : pushToVisitedAndCloneNested(visited, i, obj[i], i, isObjArray, shouldFreeze, shouldApplyPrototype);
            }
        } else {
            var propertyNames = getOwnPropertyNames(obj);

            for (var i = 0, len = propertyNames.length; i < len; i++) {
                var prop = propertyNames[i];
                var visitedIndex = visited.indexOf(obj[prop]);

                clonedObject[prop] = visitedIndex !== -1 ? visited[visitedIndex] : pushToVisitedAndCloneNested(visited, prop, obj[prop], prop, isObjArray, shouldFreeze, shouldApplyPrototype);
            }
        }

        return freezeIfApplicable(clonedObject, shouldFreeze);
    }

    if ((0, _checkers.isDate)(obj)) {
        var newDate = new Date(obj.valueOf());

        if (shouldApplyPrototype) {
            (0, _setPrototypeOf2.default)(newDate, _crioDatePrototype2.default);
        }

        return freezeIfApplicable(newDate, shouldFreeze);
    }

    return obj;
};

var setProtos = function setProtos(obj, visited, shouldFreeze) {
    if (!(obj instanceof Object)) {
        throw new TypeError('Value of argument "obj" violates contract, expected Object got ' + (obj === null ? 'null' : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.constructor ? obj.constructor.name || '[Unknown Object]' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
    }

    if (!Array.isArray(visited)) {
        throw new TypeError('Value of argument "visited" violates contract, expected Array got ' + (visited === null ? 'null' : (typeof visited === 'undefined' ? 'undefined' : _typeof(visited)) === 'object' && visited.constructor ? visited.constructor.name || '[Unknown Object]' : typeof visited === 'undefined' ? 'undefined' : _typeof(visited)));
    }

    if (!(typeof shouldFreeze === 'boolean')) {
        throw new TypeError('Value of argument "shouldFreeze" violates contract, expected bool got ' + (shouldFreeze === null ? 'null' : (typeof shouldFreeze === 'undefined' ? 'undefined' : _typeof(shouldFreeze)) === 'object' && shouldFreeze.constructor ? shouldFreeze.constructor.name || '[Unknown Object]' : typeof shouldFreeze === 'undefined' ? 'undefined' : _typeof(shouldFreeze)));
    }

    if (isFrozen(obj)) {
        return cloneObj(obj, visited, shouldFreeze, true);
    }

    if ((0, _checkers.isArray)(obj)) {
        (0, _setPrototypeOf2.default)(obj, _crioArrayPrototype2.default);

        for (var i = 0, len = obj.length; i < len; i++) {
            if (visited.indexOf(obj[i]) === -1) {
                pushToVisitedAndCloneNested(visited, i, obj[i], i, true, shouldFreeze, true);
            }
        }

        return freezeIfApplicable(obj, shouldFreeze);
    }

    if ((0, _checkers.isObject)(obj)) {
        (0, _setPrototypeOf2.default)(obj, _crioObjectPrototype2.default);

        var propertyNames = getOwnPropertyNames(obj);

        for (var i = 0, len = propertyNames.length; i < len; i++) {
            if (visited.indexOf(obj[i]) === -1) {
                var prop = propertyNames[i];

                pushToVisitedAndCloneNested(visited, prop, obj[prop], prop, false, shouldFreeze, true);
            }
        }

        return freezeIfApplicable(obj, shouldFreeze);
    }

    if ((0, _checkers.isDate)(obj)) {
        (0, _setPrototypeOf2.default)(obj, _crioDatePrototype2.default);

        return freezeIfApplicable(obj, shouldFreeze);
    }

    return obj;
};

var pushToVisited = function pushToVisited(visited, value) {
    if (!(visited instanceof Object)) {
        throw new TypeError('Value of argument "visited" violates contract, expected Object got ' + (visited === null ? 'null' : (typeof visited === 'undefined' ? 'undefined' : _typeof(visited)) === 'object' && visited.constructor ? visited.constructor.name || '[Unknown Object]' : typeof visited === 'undefined' ? 'undefined' : _typeof(visited)));
    }

    visited[visited.length] = value;
};

var pushToVisitedAndCloneNested = function pushToVisitedAndCloneNested(visited, prop, value, key, isValueArray, shouldFreeze, shouldApplyPrototype) {
    var isClone = arguments.length <= 7 || arguments[7] === undefined ? true : arguments[7];

    if (!(visited instanceof Object)) {
        throw new TypeError('Value of argument "visited" violates contract, expected Object got ' + (visited === null ? 'null' : (typeof visited === 'undefined' ? 'undefined' : _typeof(visited)) === 'object' && visited.constructor ? visited.constructor.name || '[Unknown Object]' : typeof visited === 'undefined' ? 'undefined' : _typeof(visited)));
    }

    if (!(typeof prop === 'number' || typeof prop === 'string')) {
        throw new TypeError('Value of argument "prop" violates contract, expected number | string got ' + (prop === null ? 'null' : (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object' && prop.constructor ? prop.constructor.name || '[Unknown Object]' : typeof prop === 'undefined' ? 'undefined' : _typeof(prop)));
    }

    if (!(typeof key === 'number' || typeof key === 'string')) {
        throw new TypeError('Value of argument "key" violates contract, expected number | string got ' + (key === null ? 'null' : (typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object' && key.constructor ? key.constructor.name || '[Unknown Object]' : typeof key === 'undefined' ? 'undefined' : _typeof(key)));
    }

    if (!(typeof isValueArray === 'boolean')) {
        throw new TypeError('Value of argument "isValueArray" violates contract, expected bool got ' + (isValueArray === null ? 'null' : (typeof isValueArray === 'undefined' ? 'undefined' : _typeof(isValueArray)) === 'object' && isValueArray.constructor ? isValueArray.constructor.name || '[Unknown Object]' : typeof isValueArray === 'undefined' ? 'undefined' : _typeof(isValueArray)));
    }

    if (!(typeof shouldFreeze === 'boolean')) {
        throw new TypeError('Value of argument "shouldFreeze" violates contract, expected bool got ' + (shouldFreeze === null ? 'null' : (typeof shouldFreeze === 'undefined' ? 'undefined' : _typeof(shouldFreeze)) === 'object' && shouldFreeze.constructor ? shouldFreeze.constructor.name || '[Unknown Object]' : typeof shouldFreeze === 'undefined' ? 'undefined' : _typeof(shouldFreeze)));
    }

    if (!(typeof shouldApplyPrototype === 'boolean')) {
        throw new TypeError('Value of argument "shouldApplyPrototype" violates contract, expected bool got ' + (shouldApplyPrototype === null ? 'null' : (typeof shouldApplyPrototype === 'undefined' ? 'undefined' : _typeof(shouldApplyPrototype)) === 'object' && shouldApplyPrototype.constructor ? shouldApplyPrototype.constructor.name || '[Unknown Object]' : typeof shouldApplyPrototype === 'undefined' ? 'undefined' : _typeof(shouldApplyPrototype)));
    }

    if (!(typeof isClone === 'boolean')) {
        throw new TypeError('Value of argument "isClone" violates contract, expected bool got ' + (isClone === null ? 'null' : (typeof isClone === 'undefined' ? 'undefined' : _typeof(isClone)) === 'object' && isClone.constructor ? isClone.constructor.name || '[Unknown Object]' : typeof isClone === 'undefined' ? 'undefined' : _typeof(isClone)));
    }

    pushToVisited(visited, value);

    if (isClone) {
        return cloneObj(value, visited, shouldFreeze, shouldApplyPrototype);
    }

    return setProtos(value);
};

var cloneObject = function cloneObject(originalObj) {
    var shouldFreeze = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var shouldApplyPrototype = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

    if (!(typeof shouldFreeze === 'boolean')) {
        throw new TypeError('Value of argument "shouldFreeze" violates contract, expected bool got ' + (shouldFreeze === null ? 'null' : (typeof shouldFreeze === 'undefined' ? 'undefined' : _typeof(shouldFreeze)) === 'object' && shouldFreeze.constructor ? shouldFreeze.constructor.name || '[Unknown Object]' : typeof shouldFreeze === 'undefined' ? 'undefined' : _typeof(shouldFreeze)));
    }

    if (!(typeof shouldApplyPrototype === 'boolean')) {
        throw new TypeError('Value of argument "shouldApplyPrototype" violates contract, expected bool got ' + (shouldApplyPrototype === null ? 'null' : (typeof shouldApplyPrototype === 'undefined' ? 'undefined' : _typeof(shouldApplyPrototype)) === 'object' && shouldApplyPrototype.constructor ? shouldApplyPrototype.constructor.name || '[Unknown Object]' : typeof shouldApplyPrototype === 'undefined' ? 'undefined' : _typeof(shouldApplyPrototype)));
    }

    var visited = [];

    return cloneObj(originalObj, visited, shouldFreeze, shouldApplyPrototype);
};

var setDeepPrototype = function setDeepPrototype(obj) {
    var shouldFreeze = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    if (!(typeof shouldFreeze === 'boolean')) {
        throw new TypeError('Value of argument "shouldFreeze" violates contract, expected bool got ' + (shouldFreeze === null ? 'null' : (typeof shouldFreeze === 'undefined' ? 'undefined' : _typeof(shouldFreeze)) === 'object' && shouldFreeze.constructor ? shouldFreeze.constructor.name || '[Unknown Object]' : typeof shouldFreeze === 'undefined' ? 'undefined' : _typeof(shouldFreeze)));
    }

    if (!(0, _checkers.isArray)(obj) && !(0, _checkers.isDate)(obj) && !(0, _checkers.isObject)(obj)) {
        return obj;
    }

    var visited = [];

    return setProtos(obj, visited, shouldFreeze);
};

exports.cloneObject = cloneObject;
exports.setDeepPrototype = setDeepPrototype;
exports.default = {
    cloneObject: cloneObject,
    setDeepPrototype: setDeepPrototype
};