'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.thaw = exports.getCrioInstance = exports.coalesceCrioValue = exports.cloneObject = undefined;

var _createNewCrio = require('./createNewCrio');

var _createNewCrio2 = _interopRequireDefault(_createNewCrio);

var _CrioCollection = require('./../CrioCollection');

var _CrioCollection2 = _interopRequireDefault(_CrioCollection);

var _checkers = require('./checkers');

var _crioCheckers = require('./crioCheckers');

var _functions = require('./functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// local imports

/**
 * If the Crio values are equal, then return the original instance, else return the new instance
 *
 * @param crio1<Object>
 * @param crio2<Object>
 * @returns isSameCrio<Boolean>
 */
var getCrioInstance = function getCrioInstance(crio1, crio2) {
    if (!(crio1 instanceof _CrioCollection2.default)) {
        throw new TypeError('Value of argument "crio1" violates contract, expected CrioCollection got ' + (crio1 === null ? 'null' : (typeof crio1 === 'undefined' ? 'undefined' : _typeof(crio1)) === 'object' && crio1.constructor ? crio1.constructor.name || '[Unknown Object]' : typeof crio1 === 'undefined' ? 'undefined' : _typeof(crio1)));
    }

    if (!(crio2 instanceof _CrioCollection2.default)) {
        throw new TypeError('Value of argument "crio2" violates contract, expected CrioCollection got ' + (crio2 === null ? 'null' : (typeof crio2 === 'undefined' ? 'undefined' : _typeof(crio2)) === 'object' && crio2.constructor ? crio2.constructor.name || '[Unknown Object]' : typeof crio2 === 'undefined' ? 'undefined' : _typeof(crio2)));
    }

    return (0, _crioCheckers.isSameCrio)(crio1, crio2) ? crio1 : crio2;
};

/**
 * Deep clone object passed, returning configurability and enumerabity back to it
 *
 * @param originalObj<Any>
 * @returns {*}
 */
var cloneObject = function cloneObject(originalObj) {
    var visited = [originalObj],
        circularSet = [{
        base: originalObj
    }];

    var pushToCircularSet = function pushToCircularSet(base, index, isValueArray) {
        var newBase = base[index] = isValueArray ? [] : {};

        circularSet.push({
            up: base,
            value: newBase
        });
    };

    var cloneObj = function cloneObj(obj) {
        var cleanObj = (0, _crioCheckers.isCrioList)(obj) || (0, _crioCheckers.isCrioMap)(obj) ? obj.object : obj;

        var base = [];

        if ((0, _checkers.isArray)(cleanObj)) {
            var _ret = (function () {
                var clonedArray = [];

                (0, _functions.forEach)(cleanObj, function (value, index) {
                    var visitedIndex = visited.indexOf(value);

                    if (visitedIndex === -1) {
                        var isValueArray = (0, _checkers.isArray)(value);

                        if (isValueArray || (0, _checkers.isObject)(value)) {
                            visited.push(value);

                            pushToCircularSet(base, index, isValueArray);

                            clonedArray.push(cloneObject(value));
                        } else {
                            clonedArray.push(value);
                        }
                    } else {
                        clonedArray.push(circularSet[visitedIndex].value);
                    }
                });

                return {
                    v: clonedArray
                };
            })();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }

        if ((0, _checkers.isObject)(cleanObj)) {
            var _ret2 = (function () {
                var clonedObject = {};

                (0, _functions.forOwn)(cleanObj, function (value, key) {
                    var visitedIndex = visited.indexOf(value);

                    if (visitedIndex === -1) {
                        var isValueArray = (0, _checkers.isArray)(value);

                        if (isValueArray || (0, _checkers.isObject)(value)) {
                            visited.push(value);

                            pushToCircularSet(base, key, isValueArray);

                            value = cloneObject(value);
                        }

                        Object.defineProperty(clonedObject, key, {
                            configurable: true,
                            enumerable: cleanObj.propertyIsEnumerable(key),
                            value: value,
                            writable: true
                        });
                    } else {
                        clonedObject[key] = circularSet[visitedIndex].value;
                    }
                });

                return {
                    v: clonedObject
                };
            })();

            if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
        }
    };

    return cloneObj(originalObj);
};

/**
 * Accepts any parameter, and if it is a Crio then return a cloned and unfrozen item
 *
 * @param obj<Any>
 * @returns {*}
 */
var thawCrio = function thawCrio(obj) {
    if ((0, _crioCheckers.isCrioList)(obj) || (0, _crioCheckers.isCrioMap)(obj)) {
        return cloneObject(obj.object);
    }

    if (Object.isFrozen(obj)) {
        return cloneObject(obj);
    }

    return obj;
};

var coalesceCrioValue = function coalesceCrioValue(Crio, obj) {
    if (!(Crio instanceof _CrioCollection2.default)) {
        throw new TypeError('Value of argument "Crio" violates contract, expected CrioCollection got ' + (Crio === null ? 'null' : (typeof Crio === 'undefined' ? 'undefined' : _typeof(Crio)) === 'object' && Crio.constructor ? Crio.constructor.name || '[Unknown Object]' : typeof Crio === 'undefined' ? 'undefined' : _typeof(Crio)));
    }

    if ((0, _checkers.isArray)(obj) || (0, _checkers.isObject)(obj) && !(0, _crioCheckers.isCrioList)(obj) && !(0, _crioCheckers.isCrioMap)(obj)) {
        return getCrioInstance(Crio, (0, _createNewCrio2.default)(obj));
    }

    return obj;
};

exports.cloneObject = cloneObject;
exports.coalesceCrioValue = coalesceCrioValue;
exports.getCrioInstance = getCrioInstance;
exports.thaw = thawCrio;
exports.default = {
    cloneObject: cloneObject,
    coalesceCrioValue: coalesceCrioValue,
    getCrioInstance: getCrioInstance,
    thaw: thawCrio
};