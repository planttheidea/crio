(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("crio", [], factory);
	else if(typeof exports === 'object')
		exports["crio"] = factory();
	else
		root["crio"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _recursiveObjectModifications = __webpack_require__(2);
	
	var _checkers = __webpack_require__(4);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	// local imports
	
	var defaults = {
	    autoFreeze: true
	};
	
	var crio = function crio() {
	    var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    if ((0, _checkers.isCrio)(obj)) {
	        return obj;
	    }
	
	    if ((0, _checkers.isArray)(obj) || (0, _checkers.isObject)(obj) || (0, _checkers.isDate)(obj)) {
	        var cleanedObj = (0, _checkers.isArrayLike)(obj) ? [].concat(_toConsumableArray(obj)) : obj;
	
	        return (0, _recursiveObjectModifications.cloneObject)(cleanedObj, defaults.autoFreeze);
	    }
	
	    return obj;
	};
	
	crio.array = function () {
	    var obj = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	    if ((0, _checkers.isCrio)(obj)) {
	        return obj;
	    }
	
	    if ((0, _checkers.isArray)(obj) || (0, _checkers.isArrayLike)(obj)) {
	        return crio(obj);
	    }
	
	    throw new TypeError('Value passed to crio.array is not an Array.');
	};
	
	crio.array.from = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }
	
	    return crio.array(args);
	};
	
	crio.date = function () {
	    var obj = arguments.length <= 0 || arguments[0] === undefined ? new Date() : arguments[0];
	
	    if ((0, _checkers.isCrio)(obj)) {
	        return obj;
	    }
	
	    if ((0, _checkers.isDate)(obj)) {
	        return crio(obj);
	    }
	
	    throw new TypeError('Value passed to crio.date is not a Date.');
	};
	
	crio.date.from = function () {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	    }
	
	    return crio.date(new (Function.prototype.bind.apply(Date, [null].concat(args)))());
	};
	
	crio.date.utc = function () {
	    var _Date;
	
	    if ((0, _checkers.isDate)(arguments.length <= 0 ? undefined : arguments[0])) {
	        return crio.date(new Date(Date.UTC(arguments.length <= 0 ? undefined : arguments[0])));
	    }
	
	    return crio.date(new Date((_Date = Date).UTC.apply(_Date, arguments)));
	};
	
	crio.object = function () {
	    var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    if ((0, _checkers.isCrio)(obj)) {
	        return obj;
	    }
	
	    if ((0, _checkers.isObject)(obj)) {
	        return crio(obj);
	    }
	
	    throw new TypeError('Value passed to crio.object is not an Object.');
	};
	
	crio.setDefaults = function (newDefaults) {
	    if (!(0, _checkers.isObject)(newDefaults)) {
	        return;
	    }
	
	    defaults = _extends({}, defaults, newDefaults);
	};
	exports.default = crio;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.setDeepPrototype = exports.cloneObject = undefined;
	
	var _setPrototypeOf = __webpack_require__(3);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _crioArrayPrototype = __webpack_require__(5);
	
	var _crioArrayPrototype2 = _interopRequireDefault(_crioArrayPrototype);
	
	var _crioDatePrototype = __webpack_require__(115);
	
	var _crioDatePrototype2 = _interopRequireDefault(_crioDatePrototype);
	
	var _crioObjectPrototype = __webpack_require__(119);
	
	var _crioObjectPrototype2 = _interopRequireDefault(_crioObjectPrototype);
	
	var _checkers = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// local imports
	
	var create = Object.create;
	
	// local partial imports
	
	// local imports
	
	var freeze = Object.freeze;
	var getOwnPropertyNames = Object.getOwnPropertyNames;
	var isFrozen = Object.isFrozen;
	
	var freezeIfApplicable = function freezeIfApplicable(obj, shouldFreeze) {
	    return shouldFreeze ? freeze(obj) : obj;
	};
	
	var cloneObj = function cloneObj(obj, visited, circularSet, shouldFreeze, shouldApplyPrototype) {
	    var isObjArray = (0, _checkers.isArray)(obj);
	
	    if (isObjArray || (0, _checkers.isObject)(obj)) {
	        var clonedObject = isObjArray ? [] : {};
	
	        if (shouldApplyPrototype) {
	            if (isObjArray) {
	                (0, _setPrototypeOf2.default)(clonedObject, _crioArrayPrototype2.default);
	            } else {
	                clonedObject = create(_crioObjectPrototype2.default);
	            }
	        }
	
	        if (isObjArray) {
	            for (var i = 0, len = obj.length; i < len; i++) {
	                clonedObject[i] = pushToCircularSetAndVisited(visited, i, circularSet, obj[i], [], i, isObjArray, shouldFreeze, shouldApplyPrototype);
	            }
	        } else {
	            var propertyNames = getOwnPropertyNames(obj);
	
	            for (var i = 0, len = propertyNames.length; i < len; i++) {
	                var prop = propertyNames[i];
	                var visitedIndex = visited.indexOf(obj[i]);
	
	                if (visitedIndex !== -1) {
	                    return visited[visitedIndex];
	                }
	
	                clonedObject[i] = pushToCircularSetAndVisited(visited, prop, circularSet, obj[prop], {}, prop, isObjArray, shouldFreeze, shouldApplyPrototype);
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
	
	var setProtos = function setProtos(obj, visited, circularSet, shouldFreeze) {
	    if (isFrozen(obj)) {
	        return cloneObj(obj, visited, circularSet, shouldFreeze, true);
	    }
	
	    if ((0, _checkers.isArray)(obj)) {
	        (0, _setPrototypeOf2.default)(obj, _crioArrayPrototype2.default);
	
	        for (var i = 0, len = obj.length; i < len; i++) {
	            if (visited.indexOf(obj[i]) === -1) {
	                pushToCircularSetAndVisited(visited, i, circularSet, obj[i], [], i, true, shouldFreeze, true);
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
	
	                pushToCircularSetAndVisited(visited, prop, circularSet, obj[prop], {}, prop, false, shouldFreeze, true);
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
	
	var pushToCircularSet = function pushToCircularSet(circularSet, base, key, isValueArray) {
	    var newBase = base[key] = isValueArray ? [] : {};
	
	    circularSet[circularSet.length] = {
	        up: base,
	        value: newBase
	    };
	};
	
	var pushToVisited = function pushToVisited(visited, prop, value) {
	    visited[visited.length] = value;
	};
	
	var pushToCircularSetAndVisited = function pushToCircularSetAndVisited(visited, prop, circularSet, value, base, key, isValueArray, shouldFreeze, shouldApplyPrototype) {
	    var isClone = arguments.length <= 9 || arguments[9] === undefined ? true : arguments[9];
	
	    pushToVisited(visited, prop, value);
	    pushToCircularSet(circularSet, base, key, isValueArray);
	
	    if (isClone) {
	        return cloneObj(value, visited, circularSet, shouldFreeze, shouldApplyPrototype);
	    }
	
	    return setProtos(value);
	};
	
	var cloneObject = function cloneObject(originalObj) {
	    var shouldFreeze = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    var shouldApplyPrototype = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	
	    var visited = [],
	        circularSet = [{ base: originalObj }];
	
	    return cloneObj(originalObj, visited, circularSet, shouldFreeze, shouldApplyPrototype);
	};
	
	var setDeepPrototype = function setDeepPrototype(obj) {
	    var shouldFreeze = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	    if (!(0, _checkers.isArray)(obj) && !(0, _checkers.isDate)(obj) && !(0, _checkers.isObject)(obj)) {
	        return obj;
	    }
	
	    var visited = [],
	        circularSet = [{ base: obj }];
	
	    return setProtos(obj, visited, circularSet, shouldFreeze);
	};
	
	exports.cloneObject = cloneObject;
	exports.setDeepPrototype = setDeepPrototype;
	exports.default = {
	    cloneObject: cloneObject,
	    setDeepPrototype: setDeepPrototype
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _checkers = __webpack_require__(4);
	
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	// make sure that IE's window.TO_STRING isn't used
	var TO_STRING = Object.prototype.toString;
	
	/**
	 * Returns true if object passed is array
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isArray = function isArray(obj) {
	    return TO_STRING.call(obj) === '[object Array]';
	};
	
	var isCrio = function isCrio(obj) {
	    return (isArray(obj) || isDate(obj) || isObject(obj)) && !!obj.$$crio;
	};
	
	/**
	 * Returns true if object passed is date
	 *
	 * @param obj<any>
	 * @returns {boolean}
	 */
	var isDate = function isDate(obj) {
	    return TO_STRING.call(obj) === '[object Date]';
	};
	
	/**
	 * Returns true if object passed is function
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isFunction = function isFunction(obj) {
	    return TO_STRING.call(obj) === '[object Function]' || typeof obj === 'function';
	};
	
	/**
	 * Returns true if object passed is object
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isObject = function isObject(obj) {
	    return TO_STRING.call(obj) === '[object Object]' && !!obj;
	};
	
	/**
	 * Returns true if object passed is null
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isNull = function isNull(obj) {
	    return obj === null;
	};
	
	/**
	 * Returns true if object passed is NaN
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isNAN = function isNAN(obj) {
	    return obj !== obj;
	};
	
	/**
	 * Returns true if object passed is number
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isNumber = function isNumber(obj) {
	    return !isNAN(obj) && TO_STRING.call(obj) === '[object Number]';
	};
	
	/**
	 * Returns true if object passed is string
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isString = function isString(obj) {
	    return TO_STRING.call(obj) === '[object String]';
	};
	
	/**
	 * Returns true if object passed is undefined
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isUndefined = function isUndefined(obj) {
	    return obj === void 0;
	};
	
	/**
	 * Returns true if object passed is either null or undefined
	 *
	 * @param obj<any>
	 * @returns {boolean}
	 */
	var isValueless = function isValueless(obj) {
	    return isNull(obj) || isUndefined(obj);
	};
	
	/**
	 * Returns true if object is Array-like (HTMLCollection, NodeList, etc)
	 *
	 * @param obj<any>
	 * @returns {boolean}
	 */
	var isArrayLike = function isArrayLike(obj) {
	    return !isArray(obj) && !isFunction(obj) && obj.hasOwnProperty('length') && isNumber(obj.length) && (obj.length === 0 || (obj.length > 0 && obj.length - 1) in obj);
	};
	
	exports.isArray = isArray;
	exports.isArrayLike = isArrayLike;
	exports.isCrio = isCrio;
	exports.isDate = isDate;
	exports.isFunction = isFunction;
	exports.isObject = isObject;
	exports.isNAN = isNAN;
	exports.isNull = isNull;
	exports.isNumber = isNumber;
	exports.isString = isString;
	exports.isUndefined = isUndefined;
	exports.isValueless = isValueless;
	exports.default = {
	    isArray: isArray,
	    isArrayLike: isArrayLike,
	    isCrio: isCrio,
	    isDate: isDate,
	    isFunction: isFunction,
	    isObject: isObject,
	    isNAN: isNAN,
	    isNull: isNull,
	    isNumber: isNumber,
	    isString: isString,
	    isUndefined: isUndefined,
	    isValueless: isValueless
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _setCrioArrayOrObjectMethods = __webpack_require__(6);
	
	var _setCrioArrayOrObjectMethods2 = _interopRequireDefault(_setCrioArrayOrObjectMethods);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PROTOTYPE_METHODS = ['concat', 'copyWithin', 'entries', 'every', 'fill', 'filter', 'find', 'findIndex', 'forEach', 'includes', 'indexOf', 'join', 'keys', 'lastIndexOf', 'map', 'pop', 'push', 'reduce', 'reduceRight', 'reverse', 'shift', 'slice', 'some', 'sort', 'splice', 'toLocaleString', 'toString', 'unshift', 'values'];
	
	// local imports
	
	var MUTABLE_METHODS = ['fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];
	
	var CUSTOM_METHODS = ['entries', 'filter', 'forEach', 'keys', 'map', 'values'];
	
	var crioArrayPrototype = Object.create(Array.prototype);
	
	exports.default = _setCrioArrayOrObjectMethods2.default.call(crioArrayPrototype, Array, crioArrayPrototype, PROTOTYPE_METHODS, MUTABLE_METHODS, CUSTOM_METHODS);
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	// polyfills
	
	// local imports
	
	// local partial imports
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _array = __webpack_require__(7);
	
	var _array2 = _interopRequireDefault(_array);
	
	var _symbol = __webpack_require__(61);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _array3 = __webpack_require__(68);
	
	var _array4 = _interopRequireDefault(_array3);
	
	var _object = __webpack_require__(71);
	
	var _object2 = _interopRequireDefault(_object);
	
	var _object3 = __webpack_require__(89);
	
	var _object4 = _interopRequireDefault(_object3);
	
	__webpack_require__(95);
	
	var _coalesceCrio = __webpack_require__(97);
	
	var _coalesceCrio2 = _interopRequireDefault(_coalesceCrio);
	
	var _crioDefaultMethods = __webpack_require__(100);
	
	var _crioDefaultMethods2 = _interopRequireDefault(_crioDefaultMethods);
	
	var _crioHelperMethods = __webpack_require__(113);
	
	var _crioHelperMethods2 = _interopRequireDefault(_crioHelperMethods);
	
	var _crioIdentifier = __webpack_require__(101);
	
	var _checkers = __webpack_require__(4);
	
	var _functions = __webpack_require__(102);
	
	var _crioIterator = __webpack_require__(114);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CUSTOM_METHODS = ['entries', 'filter', 'forEach', 'freeze', 'get', 'equals', 'hashCode', 'isFrozen', 'keys', 'map', 'merge', 'mutate', 'set', 'thaw', 'toArray', 'toJS', 'toObject', 'values'];
	
	var coalesceResultIfApplicable = function coalesceResultIfApplicable(obj, result, prototype) {
	    if (!!result) {
	        if (obj.equals(result)) {
	            return obj;
	        }
	
	        if ((0, _checkers.isArray)(obj) || (0, _checkers.isObject)(result)) {
	            return (0, _coalesceCrio2.default)(obj, result, prototype);
	        }
	    }
	
	    return result;
	};
	
	var setArrayOrObjectPrototypeMethods = function setArrayOrObjectPrototypeMethods(mainObject, prototype, prototypeMethods, mutableMethods, customMethods) {
	
	    var isPrototypeForArray = mainObject === Array;
	    var mainPrototype = mainObject.prototype;
	    var es6 = isPrototypeForArray ? _array2.default : _object2.default;
	    var es7 = isPrototypeForArray ? _array4.default : _object4.default;
	
	    var customPrototype = _extends({}, _crioDefaultMethods2.default);
	
	    prototypeMethods.splice(prototypeMethods.indexOf('constructor'), 1);
	
	    prototypeMethods.slice().forEach(function (method) {
	        if (customMethods.indexOf(method) !== -1 || /__/.test(method) || /@@/.test(method)) {
	            prototypeMethods.splice(prototypeMethods.indexOf(method), 1);
	        }
	    });
	
	    customPrototype.entries = function entries() {
	        return es6.entries(this);
	    };
	
	    customPrototype.filter = (function (isThisArray, filterPrototype) {
	        var filterMethod = isThisArray ? _crioHelperMethods2.default.filterArray : _crioHelperMethods2.default.filterObject;
	
	        return function filter(callback) {
	            if (!callback) {
	                return this;
	            }
	
	            return filterMethod.call(this, callback, filterPrototype);
	        };
	    })(isPrototypeForArray, prototype);
	
	    customPrototype.forEach = isPrototypeForArray ? _crioHelperMethods2.default.forEachArray : _crioHelperMethods2.default.forEachObject;
	
	    customPrototype.get = _crioHelperMethods2.default.get;
	
	    customPrototype.keys = function keys() {
	        return es6.keys(this);
	    };
	
	    customPrototype.map = (function (isThisArray, mapPrototype) {
	        var mapMethod = isThisArray ? _crioHelperMethods2.default.mapArray : _crioHelperMethods2.default.mapObject;
	
	        return function map(callback) {
	            if (!callback) {
	                return this;
	            }
	
	            return mapMethod.call(this, callback, mapPrototype);
	        };
	    })(isPrototypeForArray, prototype);
	
	    customPrototype.merge = _crioHelperMethods2.default.merge;
	
	    customPrototype.mutate = function mutate(callback) {
	        if (!callback) {
	            return this;
	        }
	
	        return _crioHelperMethods2.default.mutate.call(this, callback);
	    };
	
	    customPrototype.set = (function (newPrototype) {
	        return function (keys, value) {
	            return _crioHelperMethods2.default.set.call(this, keys, value, newPrototype);
	        };
	    })(prototype);
	
	    customPrototype.toArray = _crioHelperMethods2.default.toArray;
	
	    customPrototype.toObject = _crioHelperMethods2.default.toObject;
	
	    customPrototype.values = function values() {
	        return (isPrototypeForArray ? es6 : es7).values(this);
	    };
	
	    CUSTOM_METHODS.forEach(function (method) {
	        (0, _functions.setNonEnumerable)(prototype, method, customPrototype[method]);
	    });
	
	    var hasSymbol = typeof Symbol !== 'undefined';
	    var hasObjectSpecificIteratorFunction = hasSymbol && !!mainPrototype[Symbol.iterator];
	
	    (0, _functions.setNonEnumerable)(prototype, hasSymbol ? Symbol.iterator : _symbol2.default.iterator, hasObjectSpecificIteratorFunction ? mainPrototype[Symbol.iterator] : isPrototypeForArray ? _array2.default.iterator : _crioIterator.iteratorFunction);
	
	    prototypeMethods.forEach(function (method) {
	        var newMethod = undefined;
	
	        if (mutableMethods.indexOf(method) !== -1) {
	            if (mainPrototype[method]) {
	                newMethod = function () {
	                    var clone = (0, _functions.shallowClone)(this);
	
	                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                        args[_key] = arguments[_key];
	                    }
	
	                    mainPrototype[method].apply(clone, args);
	
	                    return (0, _coalesceCrio2.default)(this, clone, prototype);
	                };
	            } else {
	                (function () {
	                    var polyfilledMethod = es6[method] || es7[method];
	
	                    if (polyfilledMethod) {
	                        newMethod = function () {
	                            var clone = (0, _functions.shallowClone)(this);
	
	                            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                                args[_key2] = arguments[_key2];
	                            }
	
	                            polyfilledMethod.apply(undefined, [clone].concat(args));
	
	                            return (0, _coalesceCrio2.default)(this, clone, prototype);
	                        };
	                    }
	                })();
	            }
	        } else {
	            if (mainPrototype[method]) {
	                newMethod = function () {
	                    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	                        args[_key3] = arguments[_key3];
	                    }
	
	                    var result = mainPrototype[method].apply(this, args);
	
	                    if (!(0, _checkers.isArray)(result) && !(0, _checkers.isObject)(result)) {
	                        return result;
	                    }
	
	                    return coalesceResultIfApplicable(this, result, prototype);
	                };
	            } else {
	                (function () {
	                    var polyfilledMethod = es6[method] || es7[method];
	
	                    if (polyfilledMethod) {
	                        newMethod = function () {
	                            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	                                args[_key4] = arguments[_key4];
	                            }
	
	                            var result = polyfilledMethod.apply(undefined, [this].concat(args));
	
	                            if (!(0, _checkers.isArray)(result) && !(0, _checkers.isObject)(result)) {
	                                return result;
	                            }
	
	                            return coalesceResultIfApplicable(this, result, prototype);
	                        };
	                    }
	                })();
	            }
	        }
	
	        if ((0, _checkers.isFunction)(newMethod)) {
	            (0, _functions.setNonEnumerable)(prototype, method, newMethod);
	        }
	    });
	
	    (0, _crioIdentifier.setCrioIdentifier)(prototype, mainObject);
	
	    return prototype;
	};
	
	exports.default = setArrayOrObjectPrototypeMethods;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	__webpack_require__(32);
	__webpack_require__(43);
	__webpack_require__(44);
	__webpack_require__(46);
	__webpack_require__(51);
	__webpack_require__(54);
	__webpack_require__(56);
	__webpack_require__(60);
	module.exports = __webpack_require__(16).Array;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(9)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(12)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(10)
	  , defined   = __webpack_require__(11);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(13)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(22)
	  , hide           = __webpack_require__(17)
	  , has            = __webpack_require__(26)
	  , Iterators      = __webpack_require__(27)
	  , $iterCreate    = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(29)
	  , getProto       = __webpack_require__(18).getProto
	  , ITERATOR       = __webpack_require__(30)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getProto($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , core      = __webpack_require__(16)
	  , hide      = __webpack_require__(17)
	  , redefine  = __webpack_require__(22)
	  , ctx       = __webpack_require__(24)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target && !own)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 15 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.0.1'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(18)
	  , createDesc = __webpack_require__(19);
	module.exports = __webpack_require__(20) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(21)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// add fake Function#toString
	// for correct work wrapped methods / constructors with methods like LoDash isNative
	var global    = __webpack_require__(15)
	  , hide      = __webpack_require__(17)
	  , SRC       = __webpack_require__(23)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(16).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  if(typeof val == 'function'){
	    val.hasOwnProperty(SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	    val.hasOwnProperty('name') || hide(val, 'name', key);
	  }
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 23 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(25);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(18)
	  , descriptor     = __webpack_require__(19)
	  , setToStringTag = __webpack_require__(29)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(17)(IteratorPrototype, __webpack_require__(30)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(18).setDesc
	  , has = __webpack_require__(26)
	  , TAG = __webpack_require__(30)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(31)('wks')
	  , uid        = __webpack_require__(23)
	  , Symbol     = __webpack_require__(15).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(24)
	  , $export     = __webpack_require__(14)
	  , toObject    = __webpack_require__(33)
	  , call        = __webpack_require__(34)
	  , isArrayIter = __webpack_require__(37)
	  , toLength    = __webpack_require__(38)
	  , getIterFn   = __webpack_require__(39);
	$export($export.S + $export.F * !__webpack_require__(42)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(11);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(35);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(36);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(27)
	  , ITERATOR   = __webpack_require__(30)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(10)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(40)
	  , ITERATOR  = __webpack_require__(30)('iterator')
	  , Iterators = __webpack_require__(27);
	module.exports = __webpack_require__(16).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(41)
	  , TAG = __webpack_require__(30)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(30)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(14);
	
	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(21)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , aLen   = arguments.length
	      , result = new (typeof this == 'function' ? this : Array)(aLen);
	    while(aLen > index)result[index] = arguments[index++];
	    result.length = aLen;
	    return result;
	  }
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(45)('Array');

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(15)
	  , $           = __webpack_require__(18)
	  , DESCRIPTORS = __webpack_require__(20)
	  , SPECIES     = __webpack_require__(30)('species');
	
	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(47)
	  , step             = __webpack_require__(48)
	  , Iterators        = __webpack_require__(27)
	  , toIObject        = __webpack_require__(49);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(12)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(30)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(17)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(50)
	  , defined = __webpack_require__(11);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(41);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(14);
	
	$export($export.P, 'Array', {copyWithin: __webpack_require__(52)});
	
	__webpack_require__(47)('copyWithin');

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(33)
	  , toIndex  = __webpack_require__(53)
	  , toLength = __webpack_require__(38);
	
	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , end   = arguments.length > 2 ? arguments[2] : undefined
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(10)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(14);
	
	$export($export.P, 'Array', {fill: __webpack_require__(55)});
	
	__webpack_require__(47)('fill');

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(33)
	  , toIndex  = __webpack_require__(53)
	  , toLength = __webpack_require__(38);
	module.exports = function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this)
	    , length = toLength(O.length)
	    , aLen   = arguments.length
	    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
	    , end    = aLen > 2 ? arguments[2] : undefined
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(14)
	  , $find   = __webpack_require__(57)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(47)(KEY);

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(24)
	  , IObject  = __webpack_require__(50)
	  , toObject = __webpack_require__(33)
	  , toLength = __webpack_require__(38)
	  , asc      = __webpack_require__(58);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var isObject = __webpack_require__(36)
	  , isArray  = __webpack_require__(59)
	  , SPECIES  = __webpack_require__(30)('species');
	module.exports = function(original, length){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(41);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(14)
	  , $find   = __webpack_require__(57)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(47)(KEY);

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	__webpack_require__(67);
	module.exports = __webpack_require__(16).Symbol;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(18)
	  , global         = __webpack_require__(15)
	  , core           = __webpack_require__(16)
	  , has            = __webpack_require__(26)
	  , DESCRIPTORS    = __webpack_require__(20)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(22)
	  , META           = __webpack_require__(63).KEY
	  , $fails         = __webpack_require__(21)
	  , shared         = __webpack_require__(31)
	  , setToStringTag = __webpack_require__(29)
	  , uid            = __webpack_require__(23)
	  , wks            = __webpack_require__(30)
	  , keyOf          = __webpack_require__(64)
	  , $names         = __webpack_require__(65)
	  , enumKeys       = __webpack_require__(66)
	  , isArray        = __webpack_require__(59)
	  , anObject       = __webpack_require__(35)
	  , toIObject      = __webpack_require__(49)
	  , createDesc     = __webpack_require__(19)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , ObjectProto    = Object.prototype
	  , USE_NATIVE     = typeof $Symbol == 'function';
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};
	
	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , replacer, $replacer;
	  while(arguments.length > i)args.push(arguments[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var BUGGY_JSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });
	
	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };
	
	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(13)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var Wrapper = core.Symbol
	    , sym     = wks(it);
	  if(!(it in Wrapper))setDesc(Wrapper, it, {value: USE_NATIVE ? sym : wrap(sym)});
	});
	
	setter = true;
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || BUGGY_JSON), 'JSON', {stringify: $stringify});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(23)('meta')
	  , isObject = __webpack_require__(36)
	  , has      = __webpack_require__(26)
	  , setDesc  = __webpack_require__(18).setDesc
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(21)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(18)
	  , toIObject = __webpack_require__(49);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(49)
	  , getNames  = __webpack_require__(18).getNames
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(18);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(40)
	  , test    = {};
	test[__webpack_require__(30)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(22)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69);
	module.exports = __webpack_require__(16).Array;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export   = __webpack_require__(14)
	  , $includes = __webpack_require__(70)(true);
	
	$export($export.P, 'Array', {
	  // https://github.com/domenic/Array.prototype.includes
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	
	__webpack_require__(47)('includes');

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(49)
	  , toLength  = __webpack_require__(38)
	  , toIndex   = __webpack_require__(53);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	__webpack_require__(72);
	__webpack_require__(74);
	__webpack_require__(76);
	__webpack_require__(67);
	__webpack_require__(78);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(82);
	__webpack_require__(83);
	__webpack_require__(84);
	__webpack_require__(85);
	__webpack_require__(86);
	__webpack_require__(87);
	__webpack_require__(88);
	
	module.exports = __webpack_require__(16).Object;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(14);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(73)});

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(18)
	  , toObject = __webpack_require__(33)
	  , IObject  = __webpack_require__(50);
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(21)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(14);
	$export($export.S, 'Object', {is: __webpack_require__(75)});

/***/ },
/* 75 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(14);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(77).set});

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(18).getDesc
	  , isObject = __webpack_require__(36)
	  , anObject = __webpack_require__(35);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(24)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(36)
	  , meta     = __webpack_require__(63).onFreeze;
	
	__webpack_require__(79)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(14)
	  , core    = __webpack_require__(16)
	  , fails   = __webpack_require__(21);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(36)
	  , meta     = __webpack_require__(63).onFreeze;
	
	__webpack_require__(79)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(meta(it)) : it;
	  };
	});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(36)
	  , meta     = __webpack_require__(63).onFreeze;
	
	__webpack_require__(79)('preventExtensions', function($preventExtensions){
	  return function preventExtensions(it){
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(36);
	
	__webpack_require__(79)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(36);
	
	__webpack_require__(79)('isSealed', function($isSealed){
	  return function isSealed(it){
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(36);
	
	__webpack_require__(79)('isExtensible', function($isExtensible){
	  return function isExtensible(it){
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(49);
	
	__webpack_require__(79)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(33);
	
	__webpack_require__(79)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(33);
	
	__webpack_require__(79)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(79)('getOwnPropertyNames', function(){
	  return __webpack_require__(65).get;
	});

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(90);
	__webpack_require__(92);
	__webpack_require__(94);
	module.exports = __webpack_require__(16).Object;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/WebReflection/9353781
	var $          = __webpack_require__(18)
	  , $export    = __webpack_require__(14)
	  , ownKeys    = __webpack_require__(91)
	  , toIObject  = __webpack_require__(49)
	  , createDesc = __webpack_require__(19);
	
	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , setDesc = $.setDesc
	      , getDesc = $.getDesc
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key, D;
	    while(keys.length > i){
	      D = getDesc(O, key = keys[i++]);
	      if(key in result)setDesc(result, key, createDesc(0, D));
	      else result[key] = D;
	    } return result;
	  }
	});

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var $        = __webpack_require__(18)
	  , anObject = __webpack_require__(35)
	  , Reflect  = __webpack_require__(15).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = $.getNames(anObject(it))
	    , getSymbols = $.getSymbols;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $export = __webpack_require__(14)
	  , $values = __webpack_require__(93)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(18)
	  , toIObject = __webpack_require__(49)
	  , isEnum    = $.isEnum;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = $.getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $export  = __webpack_require__(14)
	  , $entries = __webpack_require__(93)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument
	        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
	        : Promise.resolve(value).then(function(unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            return result;
	          });
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return invoke(method, arg);
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : new Promise(function (resolve) {
	          resolve(callInvokeWithMethodAndArg());
	        });
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          context._sent = arg;
	
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(96)))

/***/ },
/* 96 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _deepFreeze = __webpack_require__(98);
	
	var _deepFreeze2 = _interopRequireDefault(_deepFreeze);
	
	var _setPrototypeOf = __webpack_require__(3);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// local imports
	
	var coalesceCrio = function coalesceCrio(obj, newObj) {
	    var prototype = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	    var applyPrototype = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
	
	    if (applyPrototype) {
	        (0, _setPrototypeOf2.default)(newObj, prototype);
	    }
	
	    if (obj.equals(newObj)) {
	        return obj;
	    }
	
	    return obj.isFrozen() ? (0, _deepFreeze2.default)(newObj, false) : newObj;
	};
	
	exports.default = coalesceCrio;
	module.exports = exports['default'];

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _deepFreezeStrict = __webpack_require__(99);
	
	var _deepFreezeStrict2 = _interopRequireDefault(_deepFreezeStrict);
	
	var _recursiveObjectModifications = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// external dependencies
	
	var deepFreezeWithClone = function deepFreezeWithClone(object) {
	    var shouldClone = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	    if (object) {
	        return shouldClone ? (0, _recursiveObjectModifications.cloneObject)(object, true) : (0, _deepFreezeStrict2.default)(object);
	    }
	
	    return object;
	};
	
	// local partial imports
	
	exports.default = deepFreezeWithClone;
	module.exports = exports['default'];

/***/ },
/* 99 */
/***/ function(module, exports) {

	module.exports = function deepFreeze (o) {
	  Object.freeze(o);
	
	  var oIsFunction = typeof o === "function";
	  var hasOwnProp = Object.prototype.hasOwnProperty;
	
	  Object.getOwnPropertyNames(o).forEach(function (prop) {
	    if (hasOwnProp.call(o, prop)
	    && (oIsFunction ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments' : true )
	    && o[prop] !== null
	    && (typeof o[prop] === "object" || typeof o[prop] === "function")
	    && !Object.isFrozen(o[prop])) {
	      deepFreeze(o[prop]);
	    }
	  });
	  
	  return o;
	};


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.toJS = exports.thaw = exports.isFrozen = exports.hashCode = exports.freeze = exports.equals = undefined;
	
	var _deepFreeze = __webpack_require__(98);
	
	var _deepFreeze2 = _interopRequireDefault(_deepFreeze);
	
	var _crioIdentifier = __webpack_require__(101);
	
	var _hash = __webpack_require__(103);
	
	var _recursiveObjectModifications = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// local imports
	
	var CRIO_IDENTIFIER = (0, _crioIdentifier.getCrioIdentifier)();
	
	// local partial imports
	
	var equals = function equals(obj) {
	    if (obj[CRIO_IDENTIFIER]) {
	        return this.hashCode() === obj.hashCode();
	    }
	
	    return false;
	};
	
	var freeze = function freeze() {
	    return (0, _deepFreeze2.default)(this);
	};
	
	var hashCode = function hashCode() {
	    return (0, _hash.hashObject)(this);
	};
	
	var isFrozen = function isFrozen() {
	    return Object.isFrozen(this);
	};
	
	var thaw = function thaw() {
	    return (0, _recursiveObjectModifications.cloneObject)(this);
	};
	
	var toJS = function toJS() {
	    return (0, _recursiveObjectModifications.cloneObject)(this, false, false);
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

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.setCrioIdentifier = exports.getCrioIdentifier = undefined;
	
	var _functions = __webpack_require__(102);
	
	var CRIO_IDENTIFIER = '$$crio';
	
	var getCrioIdentifier = function getCrioIdentifier() {
	    return CRIO_IDENTIFIER;
	};
	
	var setCrioIdentifier = function setCrioIdentifier(obj, type) {
	    (0, _functions.setReadonly)(obj, CRIO_IDENTIFIER, type);
	};
	
	exports.getCrioIdentifier = getCrioIdentifier;
	exports.setCrioIdentifier = setCrioIdentifier;
	exports.default = {
	    getCrioIdentifier: getCrioIdentifier,
	    setCrioIdentifier: setCrioIdentifier
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	// local imports
	
	// local partial imports
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.shallowClone = exports.setReadonly = exports.setNonEnumerable = exports.setDeeplyNested = exports.forOwn = exports.forEach = undefined;
	
	var _setPrototypeOf = __webpack_require__(3);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _checkers = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Loops over array, executing each function
	 * If one of the iterations returns false, the forEach is canceled
	 *
	 * @param arr<Array>
	 * @param fn<Function>
	 */
	var forEach = function forEach(arr, fn) {
	    if ((0, _checkers.isUndefined)(fn)) {
	        return;
	    }
	
	    for (var i = 0, len = arr.length; i < len; i++) {
	        fn(arr[i], i, arr);
	    }
	};
	
	/**
	 * Loops over array of own properties, executing each function
	 * If one of the iterations returns false, the forEach is canceled
	 *
	 * @param obj<Object>
	 * @param fn<Function>
	 */
	var forOwn = function forOwn(obj, fn) {
	    if ((0, _checkers.isUndefined)(fn)) {
	        return;
	    }
	
	    var keys = Object.getOwnPropertyNames(obj);
	
	    for (var i = 0, len = keys.length; i < len; i++) {
	        if (fn(obj[keys[i]], keys[i], obj) === false) {
	            break;
	        }
	    }
	};
	
	var setDeeplyNested = function setDeeplyNested(obj, keys, value, prototype) {
	    forEach(keys, function (key, index) {
	        if (index !== keys.length - 1) {
	            keys.shift();
	
	            obj[key] = setDeeplyNested(obj[key] || Object.create(prototype), keys, value, prototype);
	        } else if (!(0, _checkers.isUndefined)(key)) {
	            obj[key] = value;
	        }
	    });
	
	    (0, _setPrototypeOf2.default)(obj, prototype);
	
	    return obj;
	};
	
	var setNonEnumerable = function setNonEnumerable(obj, prop, value) {
	    Object.defineProperty(obj, prop, {
	        enumerable: false,
	        configurable: true,
	        value: value,
	        writable: true
	    });
	
	    return obj;
	};
	
	var setReadonly = function setReadonly(obj, prop, value) {
	    Object.defineProperty(obj, prop, {
	        enumerable: false,
	        configurable: false,
	        value: value,
	        writable: false
	    });
	
	    return obj;
	};
	
	var shallowClone = function shallowClone(obj) {
	    if ((0, _checkers.isArray)(obj)) {
	        var i = obj.length,
	            newArray = new Array(i);
	
	        for (; i--;) {
	            newArray[i] = obj[i];
	        }
	
	        return newArray;
	    }
	
	    return _extends({}, obj);
	};
	
	exports.forEach = forEach;
	exports.forOwn = forOwn;
	exports.setDeeplyNested = setDeeplyNested;
	exports.setNonEnumerable = setNonEnumerable;
	exports.setReadonly = setReadonly;
	exports.shallowClone = shallowClone;
	exports.default = {
	    forEach: forEach,
	    forOwn: forOwn,
	    setDeeplyNested: setDeeplyNested,
	    setNonEnumerable: setNonEnumerable,
	    setReadonly: setReadonly,
	    shallowClone: shallowClone
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.hashString = exports.hashObject = undefined;
	
	var _murmurHashJs = __webpack_require__(104);
	
	var _murmurHashJs2 = _interopRequireDefault(_murmurHashJs);
	
	var _cereal = __webpack_require__(111);
	
	var _cereal2 = _interopRequireDefault(_cereal);
	
	var _buffer = __webpack_require__(106);
	
	var _checkers = __webpack_require__(4);
	
	var _functions = __webpack_require__(102);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// local partial imports
	
	var isConvertibleToCrio = function isConvertibleToCrio(obj) {
	    return (0, _checkers.isArray)(obj) || (0, _checkers.isDate)(obj) || (0, _checkers.isObject)(obj);
	};
	
	// external dependencies
	
	var hashString = function hashString(obj) {
	    if (!(0, _checkers.isString)(obj)) {
	        obj = obj.toString();
	    }
	
	    var buf = new _buffer.Buffer(obj);
	
	    return (0, _murmurHashJs2.default)(buf);
	};
	
	var hashFunctionInObject = function hashFunctionInObject(obj) {
	    var loopFunction = (0, _checkers.isArray)(obj) ? _functions.forEach : _functions.forOwn;
	
	    var cleanObj = (0, _checkers.isArray)(obj) ? [] : {};
	
	    loopFunction(obj, function (value, key) {
	        if (isConvertibleToCrio(value)) {
	            cleanObj[key] = hashFunctionInObject(value);
	        } else if ((0, _checkers.isFunction)(value)) {
	            cleanObj[key] = value.toString();
	        } else {
	            cleanObj[key] = value;
	        }
	    });
	
	    return cleanObj;
	};
	
	var hashObject = function hashObject(obj) {
	    // just hash the value if its a string-like value
	    if ((0, _checkers.isNull)(obj) || (0, _checkers.isUndefined)(obj) || (0, _checkers.isString)(obj) || (0, _checkers.isNumber)(obj) || (0, _checkers.isNAN)(obj)) {
	        return hashString(obj);
	    }
	
	    if ((0, _checkers.isDate)(obj)) {
	        return hashString(Date.prototype.valueOf.call(obj));
	    }
	
	    // if its an array, check if a function exists in there
	    if (isConvertibleToCrio(obj)) {
	        var objWithFunctionsHashed = hashFunctionInObject(obj);
	
	        return hashString(_cereal2.default.stringify(objWithFunctionsHashed));
	    }
	
	    return hashString(_cereal2.default.stringify(obj));
	};
	
	exports.hashObject = hashObject;
	exports.hashString = hashString;
	exports.default = {
	    hashObject: hashObject,
	    hashString: hashString
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var murmur3 = __webpack_require__(105)
	var murmur2 = __webpack_require__(110)
	
	module.exports = murmur3
	module.exports.murmur3 = murmur3
	module.exports.murmur2 = murmur2


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/**
	 * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
	 * 
	 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
	 * @see http://github.com/garycourt/murmurhash-js
	 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
	 * @see http://sites.google.com/site/murmurhash/
	 * 
	 * @param {string}|{Buffer} key
	 * @param {number} seed Positive integer only
	 * @return {number} 32-bit positive integer hash 
	 */
	
	function murmurhash3_32_gc(key, seed) {
	  var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;
	
	  if (!Buffer.isBuffer(key)) {
	    key = new Buffer(key);
	  }
	  
	  remainder = key.length & 3; // key.length % 4
	  bytes = key.length - remainder;
	  h1 = seed || 0x01234567;
	  c1 = 0xcc9e2d51;
	  c2 = 0x1b873593;
	  i = 0;
	  
	  while (i < bytes) {
	    k1 = key.readInt32LE(i, i + 4);
	    i += 4;
	    
	    k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
	    k1 = (k1 << 15) | (k1 >>> 17);
	    k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;
	
	    h1 ^= k1;
	    h1 = (h1 << 13) | (h1 >>> 19);
	    h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
	    h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
	  }
	  
	  k1 = 0;
	  
	  switch (remainder) {
	    case 3: k1 ^= key[i + 2] << 16;
	    case 2: k1 ^= key[i + 1] << 8;
	    case 1: k1 ^= key[i];
	    
	    k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
	    k1 = (k1 << 15) | (k1 >>> 17);
	    k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
	    h1 ^= k1;
	  }
	  
	  h1 ^= key.length;
	
	  h1 ^= h1 >>> 16;
	  h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
	  h1 ^= h1 >>> 13;
	  h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
	  h1 ^= h1 >>> 16;
	
	  return h1 >>> 0;
	}
	
	module.exports = murmurhash3_32_gc
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(106).Buffer))

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(107)
	var ieee754 = __webpack_require__(108)
	var isArray = __webpack_require__(109)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation
	
	var rootParent = {}
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }
	
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0
	    this.parent = undefined
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }
	
	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }
	
	  // Unusual.
	  return fromObject(this, arg)
	}
	
	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'
	
	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)
	
	  that.write(string, encoding)
	  return that
	}
	
	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)
	
	  if (isArray(object)) return fromArray(that, object)
	
	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }
	
	  if (object.length) return fromArrayLike(that, object)
	
	  return fromJsonObject(that, object)
	}
	
	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}
	
	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0
	
	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)
	
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined
	  Buffer.prototype.parent = undefined
	}
	
	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }
	
	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent
	
	  return that
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)
	
	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break
	
	    ++i
	  }
	
	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')
	
	  if (list.length === 0) {
	    return new Buffer(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }
	
	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}
	
	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0
	
	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'binary':
	        return binarySlice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0
	
	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1
	
	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)
	
	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }
	
	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}
	
	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'binary':
	        return binaryWrite(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  if (newBuf.length) newBuf.parent = this.parent || this
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }
	
	  return len
	}
	
	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length
	
	  if (end < start) throw new RangeError('end < start')
	
	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return
	
	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')
	
	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var BP = Buffer.prototype
	
	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true
	
	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set
	
	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set
	
	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer
	
	  return arr
	}
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(106).Buffer, (function() { return this; }())))

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	
	;(function (exports) {
		'use strict';
	
	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array
	
		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)
	
		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}
	
		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr
	
			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}
	
			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0
	
			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)
	
			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length
	
			var L = 0
	
			function push (v) {
				arr[L++] = v
			}
	
			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}
	
			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}
	
			return arr
		}
	
		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length
	
			function encode (num) {
				return lookup.charAt(num)
			}
	
			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}
	
			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}
	
			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}
	
			return output
		}
	
		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 108 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 109 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/**
	 * JS Implementation of MurmurHash2
	 * 
	 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
	 * @see http://github.com/garycourt/murmurhash-js
	 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
	 * @see http://sites.google.com/site/murmurhash/
	 * 
	 * @param {string}|{Buffer} key
	 * @param {number} seed Positive integer only
	 * @return {number} 32-bit positive integer hash
	 */
	
	function murmurhash2_32_gc(key, seed) {
	  seed = seed || 0x01234567;
	  var l = key.length;
	  var h = seed ^ l;
	  var i = 0;
	  var k;
	  
	  if (!Buffer.isBuffer(key)) {
	    key = new Buffer(key);
	  }
	
	  while (l >= 4) {
	    k = key.readInt32LE(i, i + 4);
	    k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
	    k ^= k >>> 24;
	    k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
	    h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k;
	    l -= 4;
	    i += 4;
	  }
	  
	  switch (l) {
	  case 3: h ^= (key[i + 2] & 0xff) << 16;
	  case 2: h ^= (key[i + 1] & 0xff) << 8;
	  case 1: h ^= (key[i] & 0xff);
	          h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
	  }
	
	  h ^= h >>> 13;
	  h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
	  h ^= h >>> 15;
	
	  return h >>> 0;
	}
	
	module.exports = murmurhash2_32_gc
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(106).Buffer))

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(112);


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/*global exports */
	/*jslint browser: true, devel: true */
	
	var Cereal;
	
	(function (window) {
	    'use strict';
	
	    var util, cereal;
	
	    util = (function () {
	        return {
	            isPrimitive: function (obj) {
	                return obj !== Object(obj);
	            }
	        };
	    }());
	
	    (function () {
	        var undef  = 0,
	            nu     = 1,
	            prim   = 2,
	            object = 3,
	            array  = 4,
	            ref    = 5,
	            jsonify, dejsonify, generateEncodeWork, generateDecodeWork;
	
	        generateEncodeWork = function (obj, target) {
	            var worklist = [], names = Object.keys(obj),
	                i, name, item;
	            for (i = 0; i < names.length; i += 1) {
	                name = names[i];
	                target[name] = [];
	                worklist.push([target[name], obj[name]]);
	            }
	            return worklist;
	        };
	
	        jsonify = function (obj) {
	            var root = [], seen = [], seenIdx = 0, worklist = [[root, obj]],
	                item, target, refIdx;
	
	            while (worklist.length > 0) {
	                item = worklist.shift();
	                target = item[0];
	                obj = item[1];
	                if (undefined === obj) {
	                    target[0] = undef;
	                } else if (null === obj) {
	                    target[0] = nu;
	                } else if (util.isPrimitive(obj)) {
	                    target[0] = prim;
	                    target[1] = obj;
	                } else {
	                    refIdx = seen.lastIndexOf(obj);
	                    if (refIdx === -1) {
	                        refIdx = seenIdx;
	                        seenIdx += 1;
	                        seen[refIdx] = obj; // store orig obj, not result of obj.cerealise
	                        target[1] = refIdx;
	                        target[2] = {}; // always use an object to placate JSON itself
	                        if ('cerealise' in obj && typeof obj.cerealise === 'function') {
	                            obj = obj.cerealise();
	                        }
	                        if (Object.prototype.toString.apply(obj) === '[object Array]') {
	                            target[0] = array;
	                        } else {
	                            target[0] = object;
	                        }
	                        worklist = (generateEncodeWork(obj, target[2])).concat(worklist);
	                    } else {
	                        target[0] = ref;
	                        target[1] = refIdx;
	                    }
	                }
	            }
	
	            return root;
	        };
	
	        generateDecodeWork = function (obj, target) {
	            var worklist = [], names = Object.keys(obj),
	                i, name;
	            for (i = 0; i < names.length; i += 1) {
	                name = names[i];
	                obj[name].unshift(name);
	                obj[name].unshift(target);
	                worklist.push(obj[name]);
	            }
	            return worklist;
	        };
	
	        dejsonify = function (obj) {
	            var root = {}, seen = [], worklist = [obj],
	                item, target, field;
	            obj.unshift('value');
	            obj.unshift(root);
	
	            while (worklist.length > 0) {
	                item = worklist.shift();
	                target = item[0];
	                field = item[1];
	                switch (item[2]) {
	                case undef:
	                    target[field] = undefined;
	                    break;
	                case nu:
	                    target[field] = null;
	                    break;
	                case prim:
	                    target[field] = item[3];
	                    break;
	                case object:
	                    target[field] = {};
	                    seen[item[3]] = target[field];
	                    worklist = (generateDecodeWork(item[4], target[field])).concat(worklist);
	                    break;
	                case array:
	                    target[field] = [];
	                    seen[item[3]] = target[field];
	                    worklist = (generateDecodeWork(item[4], target[field])).concat(worklist);
	                    break;
	                case ref:
	                    target[field] = seen[item[3]];
	                    if (target[field] === undefined) {
	                        throw "Decoding error";
	                    }
	                    break;
	                default:
	                    throw "Decoding error";
	                }
	            }
	
	            return root.value;
	        };
	
	        cereal = {
	            stringify: function (obj) {
	                return JSON.stringify(jsonify(obj));
	            },
	
	            parse: function (str) {
	                return dejsonify(JSON.parse(str));
	            }
	        };
	    }());
	
	    if (false) {
	        Cereal = cereal;
	    } else {
	        exports.stringify = cereal.stringify;
	        exports.parse = cereal.parse;
	    }
	
	}(this));


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.toObject = exports.toArray = exports.set = exports.mutate = exports.merge = exports.mapObject = exports.mapArray = exports.get = exports.forEachObject = exports.forEachArray = exports.filterObject = exports.filterArray = undefined;
	
	var _setPrototypeOf = __webpack_require__(3);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _recursiveObjectModifications = __webpack_require__(2);
	
	var _checkers = __webpack_require__(4);
	
	var _functions = __webpack_require__(102);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	// local imports
	
	// local partial imports
	
	var OBJECT_CREATE = Object.create;
	
	var compareNewToOriginal = function compareNewToOriginal(originalObj, result) {
	    if ((0, _checkers.isFunction)(originalObj.equals) && originalObj.equals(result)) {
	        return originalObj;
	    }
	
	    return result;
	};
	
	var isSingleKey = function isSingleKey(keys) {
	    return (0, _checkers.isNumber)(keys) || (0, _checkers.isString)(keys);
	};
	
	var filterArray = function filterArray(callback, prototype) {
	    var _this = this;
	
	    var newArray = [];
	
	    (0, _functions.forEach)(this, function (value, index) {
	        if (callback(value, index, _this) !== false) {
	            newArray[newArray.length] = value;
	        }
	    });
	
	    (0, _setPrototypeOf2.default)(newArray, prototype);
	
	    return compareNewToOriginal(this, newArray);
	};
	
	var filterObject = function filterObject(callback, prototype) {
	    var filteredIterable = filterGeneratorObject.call(this, callback);
	
	    var filteredIterableObject = OBJECT_CREATE(prototype);
	
	    (0, _functions.forEach)([].concat(_toConsumableArray(filteredIterable)), function (filteredIterableArrayItem) {
	        var key = Object.keys(filteredIterableArrayItem)[0];
	
	        filteredIterableObject[key] = filteredIterableArrayItem[key];
	    });
	
	    return compareNewToOriginal(this, filteredIterableObject);
	};
	
	var filterGeneratorObject = regeneratorRuntime.mark(function filterGeneratorObject(callback) {
	    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, key, value;
	
	    return regeneratorRuntime.wrap(function filterGeneratorObject$(_context) {
	        while (1) {
	            switch (_context.prev = _context.next) {
	                case 0:
	                    _iteratorNormalCompletion = true;
	                    _didIteratorError = false;
	                    _iteratorError = undefined;
	                    _context.prev = 3;
	                    _iterator = this[Symbol.iterator]();
	
	                case 5:
	                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
	                        _context.next = 15;
	                        break;
	                    }
	
	                    _step$value = _step.value;
	                    key = _step$value.key;
	                    value = _step$value.value;
	
	                    if (!(callback(value, key, this) !== false)) {
	                        _context.next = 12;
	                        break;
	                    }
	
	                    _context.next = 12;
	                    return _defineProperty({}, key, value);
	
	                case 12:
	                    _iteratorNormalCompletion = true;
	                    _context.next = 5;
	                    break;
	
	                case 15:
	                    _context.next = 21;
	                    break;
	
	                case 17:
	                    _context.prev = 17;
	                    _context.t0 = _context['catch'](3);
	                    _didIteratorError = true;
	                    _iteratorError = _context.t0;
	
	                case 21:
	                    _context.prev = 21;
	                    _context.prev = 22;
	
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	
	                case 24:
	                    _context.prev = 24;
	
	                    if (!_didIteratorError) {
	                        _context.next = 27;
	                        break;
	                    }
	
	                    throw _iteratorError;
	
	                case 27:
	                    return _context.finish(24);
	
	                case 28:
	                    return _context.finish(21);
	
	                case 29:
	                case 'end':
	                    return _context.stop();
	            }
	        }
	    }, filterGeneratorObject, this, [[3, 17, 21, 29], [22,, 24, 28]]);
	});
	
	/**
	 * Loops over the iterable, breaking when function returns false
	 *
	 * @param obj<Array|Object>
	 * @param callback<Function>
	 */
	var forEachArray = function forEachArray(callback) {
	    for (var index = 0, length = this.length; index < length; index++) {
	        if (callback(this[index], index, this) === false) {
	            break;
	        }
	    }
	};
	
	/**
	 * Loops over the iterable, breaking when function returns false
	 *
	 * @param obj<Array|Object>
	 * @param callback<Function>
	 */
	var forEachObject = function forEachObject(callback) {
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;
	
	    try {
	        for (var _iterator2 = this[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var _step2$value = _step2.value;
	            var _key = _step2$value.key;
	            var _value = _step2$value.value;
	
	            if (callback(_value, _key, this) === false) {
	                break;
	            }
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }
	};
	
	var get = function get(keys) {
	    var _this2 = this;
	
	    if ((0, _checkers.isUndefined)(keys)) {
	        return this;
	    }
	
	    if (isSingleKey(keys)) {
	        return this[keys];
	    }
	
	    if ((0, _checkers.isArray)(keys)) {
	        var _ret = (function () {
	            var retrievalObj = _this2,
	                returnValue = undefined;
	
	            (0, _functions.forEach)(keys, function (key, index) {
	                if ((0, _checkers.isUndefined)(retrievalObj[key])) {
	                    return false;
	                }
	
	                if (index === keys.length - 1) {
	                    returnValue = retrievalObj[key];
	                } else {
	                    retrievalObj = retrievalObj[key];
	                }
	            });
	
	            return {
	                v: returnValue
	            };
	        })();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	
	    return this;
	};
	
	var getThawedObject = function getThawedObject(obj) {
	    if (obj.thaw) {
	        return obj.thaw();
	    }
	
	    return obj;
	};
	
	var mapArray = function mapArray(callback, prototype) {
	    var _this3 = this;
	
	    var mappedArray = [];
	
	    (0, _functions.forEach)(this, function (value, index) {
	        mappedArray[index] = callback(value, index, _this3);
	    });
	
	    (0, _setPrototypeOf2.default)(mappedArray, prototype);
	
	    return compareNewToOriginal(this, mappedArray);
	};
	
	var mapObject = function mapObject(callback, prototype) {
	    var mappedIterable = mapGeneratorObject.call(this, callback);
	
	    var mappedIterableObject = OBJECT_CREATE(prototype);
	
	    (0, _functions.forEach)([].concat(_toConsumableArray(mappedIterable)), function (mappedIterableArrayItem) {
	        var key = Object.keys(mappedIterableArrayItem)[0];
	
	        mappedIterableObject[key] = mappedIterableArrayItem[key];
	    });
	
	    return compareNewToOriginal(this, mappedIterableObject);
	};
	
	var mapGeneratorObject = regeneratorRuntime.mark(function mapGeneratorObject(callback) {
	    var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, _key2, _value2;
	
	    return regeneratorRuntime.wrap(function mapGeneratorObject$(_context2) {
	        while (1) {
	            switch (_context2.prev = _context2.next) {
	                case 0:
	                    _iteratorNormalCompletion3 = true;
	                    _didIteratorError3 = false;
	                    _iteratorError3 = undefined;
	                    _context2.prev = 3;
	                    _iterator3 = this[Symbol.iterator]();
	
	                case 5:
	                    if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
	                        _context2.next = 14;
	                        break;
	                    }
	
	                    _step3$value = _step3.value;
	                    _key2 = _step3$value.key;
	                    _value2 = _step3$value.value;
	                    _context2.next = 11;
	                    return _defineProperty({}, _key2, callback(_value2, _key2, this));
	
	                case 11:
	                    _iteratorNormalCompletion3 = true;
	                    _context2.next = 5;
	                    break;
	
	                case 14:
	                    _context2.next = 20;
	                    break;
	
	                case 16:
	                    _context2.prev = 16;
	                    _context2.t0 = _context2['catch'](3);
	                    _didIteratorError3 = true;
	                    _iteratorError3 = _context2.t0;
	
	                case 20:
	                    _context2.prev = 20;
	                    _context2.prev = 21;
	
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	
	                case 23:
	                    _context2.prev = 23;
	
	                    if (!_didIteratorError3) {
	                        _context2.next = 26;
	                        break;
	                    }
	
	                    throw _iteratorError3;
	
	                case 26:
	                    return _context2.finish(23);
	
	                case 27:
	                    return _context2.finish(20);
	
	                case 28:
	                case 'end':
	                    return _context2.stop();
	            }
	        }
	    }, mapGeneratorObject, this, [[3, 16, 20, 28], [21,, 23, 27]]);
	});
	
	/**
	 * Deeply merge objects or arrays
	 *
	 * @param target<any>
	 * @param sources<Array>
	 * @returns {*}
	 */
	var merge = function merge() {
	    for (var _len = arguments.length, sources = Array(_len), _key3 = 0; _key3 < _len; _key3++) {
	        sources[_key3] = arguments[_key3];
	    }
	
	    if (sources.length === 0) {
	        return this;
	    }
	
	    var target = getThawedObject(this);
	    var isTargetArr = (0, _checkers.isArray)(target);
	    var isTargetObj = (0, _checkers.isObject)(target);
	
	    if (!isTargetArr && !isTargetObj) {
	        return sources[sources.length - 1];
	    }
	
	    var dest = isTargetArr ? [] : {};
	
	    (0, _functions.forEach)(sources, function (source) {
	        var realSource = getThawedObject(source);
	
	        if ((0, _checkers.isArray)(realSource)) {
	            dest = dest.concat(target || []);
	
	            (0, _functions.forEach)(realSource, function (value, i) {
	                var realValue = getThawedObject(value);
	
	                dest[i] = (0, _checkers.isObject)(realValue) || (0, _checkers.isArray)(realValue) ? merge(target[i], realValue) : realValue;
	            });
	        } else {
	            dest = _extends({}, target || {});
	
	            (0, _functions.forOwn)(realSource, function (value, key) {
	                var realValue = getThawedObject(value);
	
	                dest[key] = (0, _checkers.isObject)(realValue) || (0, _checkers.isArray)(realValue) ? merge(target[key], realValue) : realValue;
	            });
	        }
	    });
	
	    return compareNewToOriginal(this, (0, _recursiveObjectModifications.setDeepPrototype)(dest));
	};
	
	var mutate = function mutate(callback) {
	    var result = callback.call(this, (0, _recursiveObjectModifications.cloneObject)(this, false), this);
	
	    return compareNewToOriginal(this, (0, _recursiveObjectModifications.setDeepPrototype)(result));
	};
	
	var set = function set(keys, value, prototype) {
	    if ((0, _checkers.isUndefined)(keys)) {
	        return this;
	    }
	
	    var isThisFrozen = this.isFrozen();
	
	    var mutatedThis = isThisFrozen ? this.thaw() : this;
	
	    if (isSingleKey(keys) || (0, _checkers.isObject)(keys) || (0, _checkers.isArray)(keys)) {
	        var updatedObject = undefined;
	
	        if (isSingleKey(keys)) {
	            mutatedThis[keys] = value;
	
	            updatedObject = mutatedThis;
	        }
	
	        if ((0, _checkers.isObject)(keys) || (0, _checkers.isArray)(keys)) {
	            updatedObject = (0, _functions.setDeeplyNested)(mutatedThis, keys, value, prototype);
	        }
	
	        return compareNewToOriginal(this, isThisFrozen ? updatedObject.freeze() : updatedObject);
	    }
	};
	
	var toArray = function toArray() {
	    if ((0, _checkers.isArray)(this)) {
	        return this;
	    }
	
	    return (0, _recursiveObjectModifications.setDeepPrototype)([].concat(_toConsumableArray(this.values())));
	};
	
	var toObject = function toObject() {
	    if ((0, _checkers.isObject)(this)) {
	        return this;
	    }
	
	    return (0, _recursiveObjectModifications.setDeepPrototype)(_extends({}, this));
	};
	
	exports.filterArray = filterArray;
	exports.filterObject = filterObject;
	exports.forEachArray = forEachArray;
	exports.forEachObject = forEachObject;
	exports.get = get;
	exports.mapArray = mapArray;
	exports.mapObject = mapObject;
	exports.merge = merge;
	exports.mutate = mutate;
	exports.set = set;
	exports.toArray = toArray;
	exports.toObject = toObject;
	exports.default = {
	    filterArray: filterArray,
	    filterObject: filterObject,
	    forEachArray: forEachArray,
	    forEachObject: forEachObject,
	    get: get,
	    mapArray: mapArray,
	    mapObject: mapObject,
	    merge: merge,
	    mutate: mutate,
	    set: set,
	    toArray: toArray,
	    toObject: toObject
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.iteratorFunction = exports.createIterator = undefined;
	
	var _array = __webpack_require__(7);
	
	var _array2 = _interopRequireDefault(_array);
	
	var _checkers = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// polyfills
	
	var iteratorFunction = function iteratorFunction() {
	    var self = this;
	    var isObjArray = (0, _checkers.isArray)(this);
	    var keys = Object.getOwnPropertyNames(this);
	    var length = isObjArray ? this.length : keys.length;
	
	    var index = 0;
	
	    return {
	        next: function next() {
	            var key = isObjArray ? index : keys[index];
	            var value = isObjArray ? self[index] : self[keys[index]];
	
	            var returnValue = {};
	
	            if (index === length) {
	                returnValue = {
	                    done: true
	                };
	            } else {
	                returnValue = {
	                    done: false,
	                    value: {
	                        key: key,
	                        value: value
	                    }
	                };
	            }
	
	            index++;
	
	            return returnValue;
	        }
	    };
	};
	
	// local partial imports
	
	var createIterator = function createIterator(obj) {
	    var symbolIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : _array2.default.iterator;
	
	    obj[symbolIterator] = iteratorFunction;
	
	    return obj;
	};
	
	exports.createIterator = createIterator;
	exports.iteratorFunction = iteratorFunction;
	exports.default = {
	    createIterator: createIterator,
	    iteratorFunction: iteratorFunction
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _setCrioDateMethods = __webpack_require__(116);
	
	var _setCrioDateMethods2 = _interopRequireDefault(_setCrioDateMethods);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PROTOTYPE_METHODS = ['getDate', 'getDay', 'getFullYear', 'getHours', 'getMilliseconds', 'getMinutes', 'getMonth', 'getSeconds', 'getTime', 'getTimezoneOffset', 'getUTCDate', 'getUTCDay', 'getUTCFullYear', 'getUTCHours', 'getUTCMilliseconds', 'getUTCMinutes', 'getUTCMonth', 'getUTCSeconds', 'getYear', 'setDate', 'setFullYear', 'setHours', 'setMilliseconds', 'setMinutes', 'setMonth', 'setSeconds', 'setTime', 'setUTCDate', 'setUTCFullYear', 'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes', 'setUTCMonth', 'setUTCSeconds', 'setYear', 'toDateString', 'toGMTString', 'toISOString', 'toJSON', 'toLocaleDateString', 'toLocaleString', 'toLocaleTimeString', 'toString', 'toTimeString', 'toUTCString', 'valueOf'];
	
	// local imports
	
	var MUTABLE_METHODS = ['setDate', 'setFullYear', 'setHours', 'setMilliseconds', 'setMinutes', 'setMonth', 'setSeconds', 'setTime', 'setUTCDate', 'setUTCFullYear', 'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes', 'setUTCMonth', 'setUTCSeconds', 'setYear'];
	
	var CUSTOM_METHODS = [];
	
	var crioDatePrototype = Object.create(Date.prototype);
	
	exports.default = _setCrioDateMethods2.default.call(crioDatePrototype, crioDatePrototype, PROTOTYPE_METHODS, MUTABLE_METHODS, CUSTOM_METHODS);
	module.exports = exports['default'];

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	// polyfills
	
	// local imports
	
	// local partial imports
	
	//import {
	//    cloneObject
	//} from '../utils/recursiveObjectModifications';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _date = __webpack_require__(117);
	
	var _date2 = _interopRequireDefault(_date);
	
	var _symbol = __webpack_require__(61);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	__webpack_require__(95);
	
	var _coalesceCrio = __webpack_require__(97);
	
	var _coalesceCrio2 = _interopRequireDefault(_coalesceCrio);
	
	var _crioDefaultMethods = __webpack_require__(100);
	
	var _crioDefaultMethods2 = _interopRequireDefault(_crioDefaultMethods);
	
	var _crioIdentifier = __webpack_require__(101);
	
	var _checkers = __webpack_require__(4);
	
	var _functions = __webpack_require__(102);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CUSTOM_METHODS = ['equals', 'freeze', 'hashCode', 'isFrozen', 'thaw', 'toJS'];
	
	var toDatePrimitive = function toDatePrimitive(hint) {
	    var hasToString = !!this.toString;
	    var hasValueOf = !!this.valueOf;
	
	    if (hint === 'number') {
	        if (hasValueOf) {
	            return this.valueOf();
	        }
	
	        if (hasToString) {
	            return this.toString();
	        }
	
	        throw new TypeError('No valueOf or toString defined.');
	    }
	
	    if (hasToString) {
	        return this.toString();
	    }
	
	    if (hasValueOf) {
	        return this.valueOf();
	    }
	
	    throw new TypeError('No valueOf or toString defined.');
	};
	
	var setDateMethods = function setDateMethods(prototype, prototypeMethods, mutableMethods, customMethods) {
	
	    var mainPrototype = Date.prototype;
	
	    var customPrototype = _extends({}, _crioDefaultMethods2.default);
	
	    prototypeMethods.splice(prototypeMethods.indexOf('valueOf'), 1);
	
	    prototypeMethods.slice().forEach(function (method) {
	        if (customMethods.indexOf(method) !== -1 || /__/.test(method) || /@@/.test(method)) {
	            prototypeMethods.splice(prototypeMethods.indexOf(method), 1);
	        }
	    });
	
	    CUSTOM_METHODS.forEach(function (method) {
	        (0, _functions.setNonEnumerable)(prototype, method, customPrototype[method]);
	    });
	
	    var hasSymbol = typeof Symbol !== 'undefined';
	    var hasDateToPrimitive = !!mainPrototype[Symbol.toPrimitive];
	
	    (0, _functions.setNonEnumerable)(prototype, hasSymbol ? Symbol.toPrimitive : _symbol2.default.toPrimitive, hasDateToPrimitive ? mainPrototype[Symbol.toPrimitive] : toDatePrimitive);
	
	    (0, _functions.setNonEnumerable)(prototype, 'valueOf', function valueOf() {
	        return mainPrototype.valueOf.call(this);
	    });
	
	    prototypeMethods.forEach(function (method) {
	        var newMethod = undefined;
	
	        if (mutableMethods.indexOf(method) !== -1) {
	            if (mainPrototype[method]) {
	                newMethod = function () {
	                    var clone = new Date(this.valueOf());
	
	                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                        args[_key] = arguments[_key];
	                    }
	
	                    mainPrototype[method].apply(clone, args);
	
	                    return (0, _coalesceCrio2.default)(this, clone, prototype);
	                };
	            } else {
	                (function () {
	                    var polyfilledMethod = _date2.default[method];
	
	                    if (polyfilledMethod) {
	                        newMethod = function () {
	                            var clone = new Date(this.valueOf());
	
	                            console.log(this.isFrozen());
	
	                            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                                args[_key2] = arguments[_key2];
	                            }
	
	                            polyfilledMethod.apply(undefined, [clone].concat(args));
	
	                            return (0, _coalesceCrio2.default)(this, clone, prototype);
	                        };
	                    }
	                })();
	            }
	        } else {
	            if (mainPrototype[method]) {
	                newMethod = function () {
	                    var clone = new Date(this.valueOf());
	
	                    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	                        args[_key3] = arguments[_key3];
	                    }
	
	                    var result = mainPrototype[method].apply(clone, args);
	
	                    if (!(0, _checkers.isDate)(result)) {
	                        return result;
	                    }
	
	                    return (0, _coalesceCrio2.default)(this, result, prototype);
	                };
	            } else {
	                (function () {
	                    var polyfilledMethod = _date2.default[method];
	
	                    if (polyfilledMethod) {
	                        newMethod = function () {
	                            var clone = new Date(this.valueOf());
	
	                            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	                                args[_key4] = arguments[_key4];
	                            }
	
	                            var result = polyfilledMethod.apply(undefined, [clone].concat(args));
	
	                            if (!(0, _checkers.isDate)(result)) {
	                                return result;
	                            }
	
	                            return (0, _coalesceCrio2.default)(this, result, prototype);
	                        };
	                    }
	                })();
	            }
	        }
	
	        if ((0, _checkers.isFunction)(newMethod)) {
	            (0, _functions.setNonEnumerable)(prototype, method, newMethod);
	        }
	    });
	
	    (0, _crioIdentifier.setCrioIdentifier)(prototype, Date);
	
	    return prototype;
	};
	
	exports.default = setDateMethods;
	module.exports = exports['default'];

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(118);
	module.exports = Date;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var DateProto    = Date.prototype
	  , INVALID_DATE = 'Invalid Date'
	  , TO_STRING    = 'toString'
	  , $toString    = DateProto[TO_STRING];
	if(new Date(NaN) + '' != INVALID_DATE){
	  __webpack_require__(22)(DateProto, TO_STRING, function toString(){
	    var value = +this;
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _setCrioArrayOrObjectMethods = __webpack_require__(6);
	
	var _setCrioArrayOrObjectMethods2 = _interopRequireDefault(_setCrioArrayOrObjectMethods);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PROTOTYPE_METHODS = ['entries', 'filter', 'forEach', 'hasOwnProperty', 'isPrototypeOf', 'keys', 'map', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'values'];
	
	// local imports
	
	var MUTABLE_METHODS = [];
	
	var CUSTOM_METHODS = ['entries', 'filter', 'forEach', 'keys', 'map', 'values'];
	
	var crioObjectPrototype = Object.create(Object.prototype);
	
	exports.default = _setCrioArrayOrObjectMethods2.default.call(crioObjectPrototype, Object, crioObjectPrototype, PROTOTYPE_METHODS, MUTABLE_METHODS, CUSTOM_METHODS);
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=crio.js.map