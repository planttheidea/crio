var crio =
/******/ (function(modules) { // webpackBootstrap
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
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createNewCrio = __webpack_require__(2);
	
	exports.default = _createNewCrio.createNewCrio;
	
	// local imports

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createNewCrioMap = exports.createNewCrioList = exports.createNewCrio = undefined;
	
	var _CrioDate = __webpack_require__(3);
	
	var _CrioDate2 = _interopRequireDefault(_CrioDate);
	
	var _CrioList = __webpack_require__(41);
	
	var _CrioList2 = _interopRequireDefault(_CrioList);
	
	var _CrioMap = __webpack_require__(42);
	
	var _CrioMap2 = _interopRequireDefault(_CrioMap);
	
	var _deepFreeze = __webpack_require__(4);
	
	var _deepFreeze2 = _interopRequireDefault(_deepFreeze);
	
	var _checkers = __webpack_require__(5);
	
	var _crioCheckers = __webpack_require__(7);
	
	var _crioFunctions = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates new CrioDate from passed object
	 *
	 * @param obj<Date>
	 * @returns {CrioDate}
	 */
	var createNewCrioDate = function createNewCrioDate(obj) {
	    return Object.freeze(new _CrioDate2.default((0, _deepFreeze2.default)(obj)));
	};
	
	/**
	 * Creates new CrioList from passed object
	 *
	 * @param obj<Date>
	 * @returns {CrioList}
	 */
	
	// local partial imports
	
	// local imports
	var createNewCrioList = function createNewCrioList(obj) {
	    return Object.freeze(new _CrioList2.default((0, _deepFreeze2.default)(obj)));
	};
	
	/**
	 * Creates new CrioMap from passed object
	 *
	 * @param obj<Date>
	 * @returns {CrioMap}
	 */
	var createNewCrioMap = function createNewCrioMap(obj) {
	    return Object.freeze(new _CrioMap2.default((0, _deepFreeze2.default)(obj)));
	};
	
	/**
	 * Creates new Crio from passed object
	 *
	 * @param obj<Array|Object>
	 * @returns {Array|Object}
	 */
	var createNewCrio = function createNewCrio() {
	    var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var isObjArray = (0, _checkers.isArray)(obj);
	    var cleanObj = !isObjArray && (0, _checkers.isArrayLike)(obj) ? Array.prototype.slice.call(obj) : obj;
	
	    if (isObjArray) {
	        return createNewCrioList(cleanObj);
	    }
	
	    if ((0, _checkers.isDate)(obj)) {
	        return createNewCrioDate(cleanObj);
	    }
	
	    if ((0, _checkers.isObject)(obj)) {
	        return createNewCrioMap(cleanObj);
	    }
	
	    return obj;
	};
	
	/**
	 * Creates new CrioDate from passed object
	 *
	 * @param obj<Date>
	 * @returns {CrioDate}
	 */
	createNewCrio.date = function (obj) {
	    return createNewCrioDate(obj);
	};
	
	/**
	 * Creates new CrioDate from arguments passed
	 *
	 * @param args<Array>
	 * @returns {CrioDate}
	 */
	createNewCrio.date.from = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }
	
	    return createNewCrioDate(new (Function.prototype.bind.apply(Date, [null].concat(args)))());
	};
	
	/**
	 * Creates new UTC-based CrioDate from arguments passed
	 *
	 * @param args<Array>
	 * @returns {CrioDate}
	 */
	createNewCrio.date.utc = function () {
	    var _Date;
	
	    if (arguments.length === 1 && (0, _checkers.isDate)(arguments[0])) {
	        var date = arguments[0];
	
	        return createNewCrio(new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds())));
	    }
	
	    return createNewCrio(new Date((_Date = Date).UTC.apply(_Date, arguments)));
	};
	
	/**
	 * Recursively freezes object passed to it
	 *
	 * @param obj<any>
	 * @returns {any}
	 */
	createNewCrio.freeze = function (obj) {
	    return (0, _deepFreeze2.default)(obj);
	};
	
	/**
	 * Returns true if object passed is frozen
	 *
	 * @param obj<any>
	 * @returns {boolean}
	 */
	createNewCrio.isFrozen = function (obj) {
	    return Object.isFrozen(obj);
	};
	
	createNewCrio.isList = _crioCheckers.isCrioList;
	createNewCrio.isMap = _crioCheckers.isCrioMap;
	
	createNewCrio.list = createNewCrioList;
	
	/**
	 * Creates new CrioList from passed object
	 *
	 * @param items<Date>
	 * @returns {CrioList}
	 */
	createNewCrio.list.of = function () {
	    for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        items[_key2] = arguments[_key2];
	    }
	
	    return createNewCrioList((0, _deepFreeze2.default)(items));
	};
	
	createNewCrio.map = createNewCrioMap;
	
	/**
	 * Returns mutable copy of the object that was Crio
	 *
	 * @param obj<any>
	 * @returns {any}
	 */
	createNewCrio.thaw = function (obj) {
	    if ((0, _crioCheckers.isCrioList)(obj) || (0, _crioCheckers.isCrioMap)(obj)) {
	        return obj.thaw();
	    }
	
	    if (undefined.isFrozen(obj)) {
	        return (0, _crioFunctions.cloneObject)(obj);
	    }
	
	    return obj;
	};
	
	exports.createNewCrio = createNewCrio;
	exports.createNewCrioList = createNewCrioList;
	exports.createNewCrioMap = createNewCrioMap;
	exports.default = {
	    createNewCrio: createNewCrio,
	    createNewCrioList: createNewCrioList,
	    createNewCrioMap: createNewCrioMap
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	// local imports
	
	// local partial imports
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _deepFreeze = __webpack_require__(4);
	
	var _deepFreeze2 = _interopRequireDefault(_deepFreeze);
	
	var _checkers = __webpack_require__(5);
	
	var _crioCheckers = __webpack_require__(7);
	
	var _crioFunctions = __webpack_require__(9);
	
	var _functions = __webpack_require__(10);
	
	var _decorators = __webpack_require__(30);
	
	var _hash = __webpack_require__(31);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MUTABLE_METHODS = ['setTime', 'setMilliseconds', 'setUTCMilliseconds', 'setSeconds', 'setUTCSeconds', 'setMinutes', 'setUTCMinutes', 'setHours', 'setUTCHours', 'setDate', 'setUTCDate', 'setMonth', 'setUTCMonth', 'setFullYear', 'setUTCFullYear', 'setYear'];
	
	var CrioDate = (function () {
	    function CrioDate(obj) {
	        _classCallCheck(this, CrioDate);
	
	        (0, _decorators.staticProperty)(this, 'hashCode', (0, _hash.hashString)(obj));
	        (0, _decorators.readonlyProperty)(this, 'object', obj);
	        (0, _decorators.readonlyProperty)(this, 'size', 1);
	    }
	
	    /**
	     * Tests if object passed is equal to the current Crio object
	     *
	     * @param crio2<Crio>
	     * @returns {boolean}
	     */
	
	    _createClass(CrioDate, [{
	        key: 'equals',
	        value: function equals(crio2) {
	            if ((0, _checkers.isValueless)(crio2)) {
	                return false;
	            }
	
	            return (0, _crioCheckers.isSameCrio)(this, crio2);
	        }
	    }, {
	        key: 'thaw',
	        value: function thaw() {
	            return (0, _crioFunctions.thaw)(this);
	        }
	    }]);
	
	    return CrioDate;
	})();
	
	var addPrototypeMethod = function addPrototypeMethod(method) {
	    if (MUTABLE_METHODS.indexOf(method) === -1) {
	        /**
	         * Accepts standard Date parameters and returns a CrioDate created with the
	         * existing immutable Date prototype functions.
	         *
	         * @param args<Array>
	         * @returns {CrioDate}
	         */
	        return function () {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }
	
	            var result = Date.prototype[method].apply(this.object, args);
	
	            if ((0, _checkers.isDate)(result)) {
	                var newDate = new Date(result.valueOf());
	
	                return new CrioDate((0, _deepFreeze2.default)(newDate));
	            }
	
	            return result;
	        };
	    }
	
	    /**
	     * Accepts standard Date parameters and returns a CrioDate created with a cloned version
	     * of the original date with the mutation applied
	     *
	     * @param args<Array>
	     * @returns {CrioDate}
	     */
	    return function () {
	        var cloneDate = new Date(this.object.valueOf());
	
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	        }
	
	        Date.prototype[method].apply(cloneDate, args);
	
	        return new CrioDate((0, _deepFreeze2.default)(cloneDate));
	    };
	};
	
	var prototypeMethods = Object.getOwnPropertyNames(Date.prototype);
	
	prototypeMethods.splice(prototypeMethods.indexOf('constructor'), 1);
	
	(0, _functions.forEach)(prototypeMethods, function (method) {
	    CrioDate.prototype[method] = addPrototypeMethod(method);
	});
	
	exports.default = CrioDate;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createNewCrio = __webpack_require__(2);
	
	var _checkers = __webpack_require__(5);
	
	var _crioCheckers = __webpack_require__(7);
	
	var _crioFunctions = __webpack_require__(9);
	
	var _functions = __webpack_require__(10);
	
	// local partial imports
	
	var deepFreeze = function deepFreeze(obj) {
	    var clonedObj = (0, _crioFunctions.cloneObject)(obj);
	
	    if ((0, _checkers.isDate)(obj)) {
	        return Object.freeze(obj);
	    }
	
	    var propNames = Object.getOwnPropertyNames(obj);
	
	    (0, _functions.forEach)(propNames, function (name) {
	        var value = clonedObj[name];
	
	        if ((0, _crioCheckers.isConvertibleToCrio)(value)) {
	            clonedObj[name] = (0, _createNewCrio.createNewCrio)(value);
	        }
	    });
	
	    return Object.freeze(clonedObj);
	};
	
	// local imports
	
	exports.default = deepFreeze;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isValueless = exports.isUndefined = exports.isString = exports.isNumber = exports.isNull = exports.isNAN = exports.isObject = exports.isFunction = exports.isDate = exports.isArrayLike = exports.isArray = undefined;
	
	var _toString = __webpack_require__(6);
	
	var _toString2 = _interopRequireDefault(_toString);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Returns true if object passed is array
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isArray = function isArray(obj) {
	    return _toString2.default.call(obj) === '[object Array]';
	};
	
	/**
	 * Returns true if object passed is date
	 *
	 * @param obj<any>
	 * @returns {boolean}
	 */
	
	// local imports
	var isDate = function isDate(obj) {
	    return _toString2.default.call(obj) === '[object Date]';
	};
	
	/**
	 * Returns true if object passed is function
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isFunction = function isFunction(obj) {
	    return _toString2.default.call(obj) === '[object Function]' || typeof obj === 'function';
	};
	
	/**
	 * Returns true if object passed is object
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isObject = function isObject(obj) {
	    return _toString2.default.call(obj) === '[object Object]' && !!obj;
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
	    return !isNAN(obj) && _toString2.default.call(obj) === '[object Number]';
	};
	
	/**
	 * Returns true if object passed is string
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isString = function isString(obj) {
	    return _toString2.default.call(obj) === '[object String]';
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
	    return isArray(obj) || !isFunction(obj) && obj.hasOwnProperty('length') && isNumber(obj.length) && (obj.length === 0 || (obj.length > 0 && obj.length - 1) in obj);
	};
	
	exports.isArray = isArray;
	exports.isArrayLike = isArrayLike;
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
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Object.prototype.toString;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isSameCrio = exports.isCrioMap = exports.isCrioList = exports.isCrioDate = exports.isCrioCollection = exports.isCrio = exports.isConvertibleToCrio = undefined;
	
	var _CrioCollection = __webpack_require__(8);
	
	var _CrioCollection2 = _interopRequireDefault(_CrioCollection);
	
	var _CrioDate = __webpack_require__(3);
	
	var _CrioDate2 = _interopRequireDefault(_CrioDate);
	
	var _checkers = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Returns true if object passed is CrioCollection
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isCrioCollection = function isCrioCollection(obj) {
	    return obj instanceof _CrioCollection2.default;
	};
	
	/**
	 * Returns true if object passed is CrioDate
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	
	// local partial imports
	
	// local imports
	var isCrioDate = function isCrioDate(obj) {
	    return obj instanceof _CrioDate2.default;
	};
	
	/**
	 * Returns true if object passed is CrioCollection or CrioDate
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isCrio = function isCrio(obj) {
	    return isCrioCollection(obj) || isCrioDate(obj);
	};
	
	/**
	 * Returns true if object passed is either an array or object
	 *
	 * @param obj<any>
	 * @returns {boolean}
	 */
	var isConvertibleToCrio = function isConvertibleToCrio(obj) {
	    return !isCrio(obj) && ((0, _checkers.isArray)(obj) || (0, _checkers.isObject)(obj) || (0, _checkers.isDate)(obj));
	};
	
	/**
	 * Returns true if object passed is CrioList
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isCrioList = function isCrioList(obj) {
	    return isCrioCollection(obj) && (0, _checkers.isArray)(obj.object);
	};
	
	/**
	 * Returns true if object passed is CrioMap
	 *
	 * @param obj<Any>
	 * @returns {boolean}
	 */
	var isCrioMap = function isCrioMap(obj) {
	    return isCrioCollection(obj) && (0, _checkers.isObject)(obj.object);
	};
	
	/**
	 * Returns true if both objects passed are Crio and are equal to one another
	 *
	 * @param obj1<Any>
	 * @param obj2<Any>
	 * @returns {boolean}
	 */
	var isSameCrio = function isSameCrio(obj1, obj2) {
	    if (isCrioDate(obj1) && isCrioDate(obj2) || isCrioList(obj1) && isCrioList(obj2) || isCrioMap(obj1) && isCrioMap(obj2)) {
	        return obj1.hashCode === obj2.hashCode;
	    }
	
	    return false;
	};
	
	exports.isConvertibleToCrio = isConvertibleToCrio;
	exports.isCrio = isCrio;
	exports.isCrioCollection = isCrioCollection;
	exports.isCrioDate = isCrioDate;
	exports.isCrioList = isCrioList;
	exports.isCrioMap = isCrioMap;
	exports.isSameCrio = isSameCrio;
	exports.default = {
	    isConvertibleToCrio: isConvertibleToCrio,
	    isCrio: isCrio,
	    isCrioCollection: isCrioCollection,
	    isCrioDate: isCrioDate,
	    isCrioList: isCrioList,
	    isCrioMap: isCrioMap,
	    isSameCrio: isSameCrio
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	// local imports
	
	// local partial imports
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createNewCrio = __webpack_require__(2);
	
	var _checkers = __webpack_require__(5);
	
	var _crioCheckers = __webpack_require__(7);
	
	var _crioFunctions = __webpack_require__(9);
	
	var _decorators = __webpack_require__(30);
	
	var _functions = __webpack_require__(10);
	
	var _hash = __webpack_require__(31);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var isInvalidKey = function isInvalidKey(obj, index, length) {
	    return index !== length - 1 && (0, _checkers.isUndefined)(obj);
	};
	
	var CrioCollection = (function () {
	    function CrioCollection(obj) {
	        _classCallCheck(this, CrioCollection);
	
	        (0, _decorators.staticProperty)(this, 'hashCode', (0, _hash.hashObject)(obj));
	        (0, _decorators.readonlyProperty)(this, 'object', obj);
	        (0, _decorators.readonlyProperty)(this, 'size', (0, _checkers.isArray)(obj) ? obj.length : Object.getOwnPropertyNames(obj).length);
	    }
	
	    /**
	     * Creates empty CrioMap
	     *
	     * @returns {CrioMap}
	     */
	
	    _createClass(CrioCollection, [{
	        key: 'clear',
	        value: function clear() {
	            var newObject = (0, _checkers.isArray)(this.object) ? [] : {};
	
	            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrio)(newObject));
	        }
	
	        /**
	         * Alias for Array.prototype.entries
	         *
	         * @returns {Iterator}
	         */
	
	    }, {
	        key: 'entries',
	        value: function entries() {
	            return (0, _functions.entries)(this.object);
	        }
	
	        /**
	         * Tests if object passed is equal to the current Crio object
	         *
	         * @param crio2<Crio>
	         * @returns {boolean}
	         */
	
	    }, {
	        key: 'equals',
	        value: function equals(crio2) {
	            if ((0, _checkers.isValueless)(crio2)) {
	                return false;
	            }
	
	            return (0, _crioCheckers.isSameCrio)(this, crio2);
	        }
	
	        /**
	         * Executes forEach over values stored in this.object
	         *
	         * @param fn<Function>
	         * @param thisArg<Object[optional]>
	         * @returns {CrioList}
	         */
	
	    }, {
	        key: 'forEach',
	        value: function forEach(fn, thisArg) {
	            var loopFunction = (0, _checkers.isArray)(this.object) ? _functions.forEach : _functions.forIn;
	
	            loopFunction(this.object, fn, thisArg);
	
	            return this;
	        }
	
	        /**
	         * Based on key(s) passed, retrieves value(s) associated. If multiple keys are passed,
	         * a CrioMap of key:value pairs are returned, otherwise the value itself is returned. If the value
	         * is an array or object, then it is returned as a CrioList or CrioMap to allow for chaining.
	         *
	         * @param keys<Array>
	         * @returns {*}
	         */
	
	    }, {
	        key: 'get',
	        value: function get() {
	            var _this = this;
	
	            for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	                keys[_key] = arguments[_key];
	            }
	
	            if (keys.length === 0) {
	                return this;
	            }
	
	            if (keys.length === 1) {
	                var value = this.object[keys[0]];
	
	                if ((0, _crioCheckers.isConvertibleToCrio)(value)) {
	                    return (0, _crioFunctions.coalesceCrioValue)(this, (0, _createNewCrio.createNewCrio)(this.object[keys[0]]));
	                }
	
	                return value;
	            }
	
	            var keyMap = (0, _createNewCrio.createNewCrio)({});
	
	            (0, _functions.forEach)(keys, function (key) {
	                keyMap = keyMap.set(key, _this.object[key]);
	            });
	
	            return (0, _crioFunctions.coalesceCrioValue)(this, keyMap);
	        }
	
	        /**
	         * Returns value of deeply nested item in this.object based on keys array. if value is an
	         * array or object, then a CrioList or CrioMap is returned to allow for chaining.
	         *
	         * @param keys
	         * @returns {Array|Object}
	         */
	
	    }, {
	        key: 'getIn',
	        value: function getIn() {
	            var keys = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	            var retValue = this.object,
	                foundKeyMatch = true;
	
	            (0, _functions.forEach)(keys, function (key, index) {
	                var value = retValue[key];
	
	                if (isInvalidKey(value, index, keys.length)) {
	                    foundKeyMatch = false;
	                    return false;
	                }
	
	                retValue = (0, _crioCheckers.isCrio)(value) ? value.object : value;
	            });
	
	            if (foundKeyMatch) {
	                if ((0, _crioCheckers.isConvertibleToCrio)(retValue)) {
	                    return (0, _crioFunctions.coalesceCrioValue)(this, (0, _createNewCrio.createNewCrio)(retValue));
	                }
	
	                return retValue;
	            }
	
	            return undefined;
	        }
	
	        /**
	         * Returns true if size is 0
	         *
	         * @returns {boolean}
	         */
	
	    }, {
	        key: 'isEmpty',
	        value: function isEmpty() {
	            return this.size === 0;
	        }
	
	        /**
	         * Retrieves an array of the keys for this.object
	         *
	         * @returns {Array}
	         */
	
	    }, {
	        key: 'keys',
	        value: function keys() {
	            return Object.keys(this.object);
	        }
	
	        /**
	         * Accepts any number of parameters and merges them into a new object / array
	         *
	         * @param sources<Array>
	         * @returns {CrioCollection}
	         */
	
	    }, {
	        key: 'merge',
	        value: function merge() {
	            for (var _len2 = arguments.length, sources = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                sources[_key2] = arguments[_key2];
	            }
	
	            var mergedObject = _crioFunctions.merge.apply(undefined, [this.object].concat(sources));
	
	            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrio)(mergedObject));
	        }
	
	        /**
	         * Accepts any number of parameters and merges them into a new object / array retrieved
	         * based on the keys passed
	         *
	         * @param keys<Array>
	         * @param sources<Array>
	         * @returns {CrioCollection}
	         */
	
	    }, {
	        key: 'mergeIn',
	        value: function mergeIn(keys) {
	            for (var _len3 = arguments.length, sources = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	                sources[_key3 - 1] = arguments[_key3];
	            }
	
	            if (keys.length === 0) {
	                return this.merge.apply(this, sources);
	            }
	
	            var objectToMerge = this.getIn(keys).object;
	
	            var objectToSet = _crioFunctions.merge.apply(undefined, sources);
	
	            if ((0, _crioCheckers.isConvertibleToCrio)(objectToMerge)) {
	                objectToSet = (0, _crioFunctions.merge)(objectToMerge, objectToSet);
	            }
	
	            return (0, _crioFunctions.getCrioInstance)(this, this.setIn(keys, (0, _crioFunctions.merge)(objectToMerge, objectToSet)));
	        }
	
	        /**
	         * Accepts a function which will receive single parameter of a thawed Crio object. This allows
	         * working with the object in a standard mutable way, and whatever you return in the function will
	         * be either be converted back to a CrioCollection (if array or object) or simply returned.
	         *
	         * @param callback<Function>
	         * @returns {any}
	         */
	
	    }, {
	        key: 'mutate',
	        value: function mutate(callback) {
	            var thawedObject = this.thaw();
	            var mutatedThis = callback(thawedObject) || thawedObject;
	
	            if ((0, _crioCheckers.isConvertibleToCrio)(mutatedThis)) {
	                return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrio)(mutatedThis));
	            }
	
	            return mutatedThis;
	        }
	
	        /**
	         * Based on values in this.object, sets the values called out by key and returns a new CrioList.
	         * If key is a string or number, then the value where the property / index is equal to key is updated
	         * to value. If key is an object, then each property in the object will set the equivalent property
	         * in this.object to the value in the key object.
	         *
	         * @param key<Array|String>
	         * @param value<Any[optional]>
	         * @returns {Object}
	         */
	
	    }, {
	        key: 'set',
	        value: function set(key, value) {
	            if ((0, _checkers.isUndefined)(key)) {
	                throw new TypeError('The set method requires a key.');
	            }
	
	            var newValue = this.thaw();
	
	            if ((0, _checkers.isObject)(key)) {
	                (0, _functions.forIn)(key, function (value, index) {
	                    newValue[index] = value;
	                });
	            } else {
	                newValue[key] = value;
	            }
	
	            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrio)(newValue));
	        }
	
	        /**
	         * Based on array of keys, sets deeply-nested value in object
	         *
	         * @param keys<Array>
	         * @param value<any>
	         * @returns {Object}
	         */
	
	    }, {
	        key: 'setIn',
	        value: function setIn() {
	            var keys = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	            var value = arguments[1];
	
	            if ((0, _checkers.isUndefined)(value)) {
	                throw new TypeError('You need to pass in a value to apply for the key.');
	            }
	
	            var updatedObject = (0, _functions.setDeeplyNested)(this.thaw(), keys, value);
	
	            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrio)(updatedObject));
	        }
	
	        /**
	         * Returns a new vanillaJS object of the Crio's object that has been unfrzon
	         *
	         * @returns thawedCrio<Array|Object>
	         */
	
	    }, {
	        key: 'thaw',
	        value: function thaw() {
	            return (0, _crioFunctions.thaw)(this);
	        }
	
	        /**
	         * Converts CrioCollection to a CrioList, where each item is a key:value object from the original map
	         *
	         * @returns {CrioCollection}
	         */
	
	    }, {
	        key: 'toCollection',
	        value: function toCollection() {
	            return this.mutate(function (mutableObject) {
	                var collection = [];
	
	                (0, _functions.forIn)(mutableObject, function (value, key) {
	                    collection.push(_defineProperty({}, key, value));
	                });
	
	                return collection;
	            });
	        }
	
	        /**
	         * Alias of Array.prototype.toLocaleString
	         *
	         * @returns {string}
	         */
	
	    }, {
	        key: 'toLocaleString',
	        value: function toLocaleString() {
	            return (0, _crioFunctions.convertToString)(this, true);
	        }
	
	        /**
	         * Alias of Array.prototype.toString
	         *
	         * @returns {string}
	         */
	
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return (0, _crioFunctions.convertToString)(this, false);
	        }
	
	        /**
	         * Similar to .keys(), this will instead return an array of values. In the case of objects, the values
	         * are plucked from the top-level mapping and returned as an array. In all other cases, this.object itself
	         * is returned. In all scenarios, mutable is returned to the object.
	         *
	         * @returns {Array}
	         */
	
	    }, {
	        key: 'values',
	        value: function values() {
	            var valueArray = [];
	
	            (0, _functions.forIn)(this.object, function (value) {
	                valueArray.push(value);
	            });
	
	            return valueArray;
	        }
	    }]);
	
	    return CrioCollection;
	})();
	
	exports.default = CrioCollection;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.thaw = exports.merge = exports.getCrioInstance = exports.convertToString = exports.coalesceCrioValue = exports.cloneObject = undefined;
	
	var _createNewCrio = __webpack_require__(2);
	
	var _CrioCollection = __webpack_require__(8);
	
	var _CrioCollection2 = _interopRequireDefault(_CrioCollection);
	
	var _CrioDate = __webpack_require__(3);
	
	var _CrioDate2 = _interopRequireDefault(_CrioDate);
	
	var _checkers = __webpack_require__(5);
	
	var _crioCheckers = __webpack_require__(7);
	
	var _functions = __webpack_require__(10);
	
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
	        var cleanObj = (0, _crioCheckers.isCrio)(obj) ? obj.object : obj;
	
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
	
	                cloneObj.prototype = cloneObj(obj.prototype);
	
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
	
	                cloneObj.prototype = cloneObj(obj.prototype);
	
	                return {
	                    v: clonedObject
	                };
	            })();
	
	            if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	        }
	
	        if ((0, _checkers.isDate)(cleanObj)) {
	            return new Date(cleanObj.valueOf());
	        }
	
	        return cleanObj;
	    };
	
	    return cloneObj(originalObj);
	};
	
	var convertToString = function convertToString(obj, isLocaleSpecific) {
	    var isThisObject = (0, _checkers.isObject)(obj.object);
	    var prefix = isThisObject ? 'CrioMap {' : 'CrioList [';
	    var suffix = isThisObject ? '}' : ']';
	
	    var stringReturn = '';
	
	    obj.forEach(function (value, key) {
	        if (stringReturn !== '') {
	            stringReturn += ', ';
	        }
	
	        if (isThisObject) {
	            stringReturn += key + ': ';
	        }
	
	        if ((0, _crioCheckers.isCrioCollection)(value)) {
	            stringReturn += convertToString(value, isLocaleSpecific);
	        } else if ((0, _crioCheckers.isCrioDate)(value)) {
	            stringReturn += value.toString();
	        } else if (isLocaleSpecific && ((0, _checkers.isNumber)(value) || (0, _checkers.isDate)(value))) {
	            stringReturn += value.toLocaleString();
	        } else {
	            stringReturn += value;
	        }
	    });
	
	    stringReturn = prefix + stringReturn + suffix;
	
	    return stringReturn;
	};
	
	/**
	 * Helper function to return either the thawed Crio object or the object itself
	 *
	 * @param obj<any>
	 * @returns {any}
	 */
	var getThawedObject = function getThawedObject(obj) {
	    return (0, _crioCheckers.isCrio)(obj) ? obj.thaw() : obj;
	};
	
	/**
	 * Deeply merge objects or arrays
	 *
	 * @param target<any>
	 * @param sources<Array>
	 * @returns {*}
	 */
	var mergeObject = function mergeObject(target) {
	    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        sources[_key - 1] = arguments[_key];
	    }
	
	    if (sources.length === 0) {
	        return target;
	    }
	
	    target = getThawedObject(target);
	
	    var isTargetArr = (0, _checkers.isArray)(target);
	    var isTargetObj = (0, _checkers.isObject)(target);
	
	    if (!isTargetArr && !isTargetObj) {
	        return sources[sources.length - 1];
	    }
	
	    var dest = isTargetArr ? [] : {};
	
	    (0, _functions.forEach)(sources, function (source) {
	        var realSource = getThawedObject(source);
	
	        if ((0, _checkers.isArray)(realSource)) {
	            target = target || [];
	            dest = dest.concat(target);
	
	            (0, _functions.forEach)(realSource, function (item, i) {
	                var realItem = getThawedObject(item);
	
	                if ((0, _checkers.isUndefined)(dest[i])) {
	                    dest[i] = realItem;
	                } else if ((0, _checkers.isObject)(realItem)) {
	                    dest[i] = mergeObject(target[i], realItem);
	                } else {
	                    if (target.indexOf(realItem) === -1) {
	                        dest.push(realItem);
	                    }
	                }
	            });
	        } else {
	            target = target || {};
	
	            (0, _functions.forOwn)(target, function (value, key) {
	                dest[key] = getThawedObject(value);
	            });
	
	            (0, _functions.forOwn)(realSource, function (value, key) {
	                var realValue = getThawedObject(value);
	
	                if ((0, _checkers.isObject)(realValue)) {
	                    dest[key] = mergeObject(target[key], realValue);
	                }
	
	                if (!(0, _checkers.isObject)(realValue) || !realValue) {
	                    dest[key] = realValue;
	                } else if (!target[key]) {
	                    dest[key] = realValue;
	                }
	            });
	        }
	    });
	
	    return dest;
	};
	
	/**
	 * Accepts any parameter, and if it is a Crio then return a cloned and unfrozen item
	 *
	 * @param obj<Any>
	 * @returns {*}
	 */
	var thawCrio = function thawCrio(obj) {
	    if ((0, _crioCheckers.isCrio)(obj)) {
	        return cloneObject(obj.object);
	    }
	
	    if (Object.isFrozen(obj)) {
	        return cloneObject(obj);
	    }
	
	    return obj;
	};
	
	var coalesceCrioValue = function coalesceCrioValue(Crio, obj) {
	    if ((0, _crioCheckers.isConvertibleToCrio)(obj) && !(0, _crioCheckers.isCrio)(obj)) {
	        return getCrioInstance(Crio, (0, _createNewCrio.createNewCrio)(obj));
	    }
	
	    return obj;
	};
	
	exports.cloneObject = cloneObject;
	exports.coalesceCrioValue = coalesceCrioValue;
	exports.convertToString = convertToString;
	exports.getCrioInstance = getCrioInstance;
	exports.merge = mergeObject;
	exports.thaw = thawCrio;
	exports.default = {
	    cloneObject: cloneObject,
	    coalesceCrioValue: coalesceCrioValue,
	    convertToString: convertToString,
	    getCrioInstance: getCrioInstance,
	    merge: mergeObject,
	    thaw: thawCrio
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.splice = exports.setDeeplyNested = exports.forOwn = exports.forIn = exports.forEachRight = exports.forEach = exports.entries = undefined;
	
	var _entries = __webpack_require__(11);
	
	var _entries2 = _interopRequireDefault(_entries);
	
	var _checkers = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	// external dependencies
	
	// local partial imports
	
	/**
	 * Loops over array, executing each function
	 * If one of the iterations returns false, the forEach is canceled
	 *
	 * @param arr<Array>
	 * @param fn<Function>
	 * @param thisArg<Object[optional]>
	 */
	var forEach = function forEach(arr, fn, thisArg) {
	    if (!(0, _checkers.isArray)(arr)) {
	        throw new TypeError('Object passed to forEach is not an array.');
	    }
	
	    if ((0, _checkers.isUndefined)(fn)) {
	        return;
	    }
	
	    for (var i = 0, len = arr.length; i < len; i++) {
	        if (fn.call(thisArg, arr[i], i, arr) === false) {
	            break;
	        }
	    }
	};
	
	var forEachRight = function forEachRight(arr, fn, thisArg) {
	    if (!(0, _checkers.isArray)(arr)) {
	        throw new TypeError('Object passed to forEach is not an array.');
	    }
	
	    if ((0, _checkers.isUndefined)(fn)) {
	        return;
	    }
	
	    for (var i = arr.length; i--;) {
	        if (fn.call(thisArg, arr[i], i, arr) === false) {
	            break;
	        }
	    }
	};
	
	/**
	 * Creates flattened array of keys to be used in object loops
	 *
	 * @param args<Array>
	 * @returns keys<Array>
	 */
	var getKeys = function getKeys() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }
	
	    var keys = [];
	
	    forEach(args, function (keyArr) {
	        keys.push.apply(keys, _toConsumableArray(keyArr));
	    });
	
	    return keys;
	};
	
	/**
	 * Executes standard for loop using the keys provided, which is faster than a traditional for-in
	 *
	 * @param obj<Object>
	 * @param keys<Array>
	 * @param fn<Function>
	 * @param thisArg<Object[optional]>
	 */
	var forLoopFromKeys = function forLoopFromKeys(obj, keys, fn, thisArg) {
	    if (!(0, _checkers.isUndefined)(fn)) {
	        for (var i = 0, len = keys.length; i < len; i++) {
	            var key = keys[i];
	
	            if (fn.call(thisArg, obj[key], key, obj) === false) {
	                break;
	            }
	        }
	    }
	};
	
	/**
	 * Checks if object passed is a plain object, and if so then loops over all own keys + prototype keys
	 *
	 * @param obj<Object>
	 * @param fn<Function>
	 * @param thisArg<Object[optional]>
	 */
	var forIn = function forIn(obj, fn, thisArg) {
	    if (!(0, _checkers.isUndefined)(fn)) {
	        var keys = getKeys(Object.keys(obj), Object.keys(Object.getPrototypeOf(obj)));
	
	        forLoopFromKeys(obj, keys, fn, thisArg);
	    }
	};
	
	/**
	 * Checks if object passed is a plain object, and if so then loops over all own keys
	 *
	 * @param obj<Object>
	 * @param fn<Function>
	 * @param thisArg<Object[optional]>
	 */
	var forOwn = function forOwn(obj, fn, thisArg) {
	    if (!(0, _checkers.isUndefined)(fn)) {
	        var keys = getKeys(Object.getOwnPropertyNames(obj));
	
	        forLoopFromKeys(obj, keys, fn, thisArg);
	    }
	};
	
	/**
	 * Returns a new array with all values of the original array except for the value at the index passed
	 *
	 * @param obj<Array>
	 * @param index<Number>
	 * @param removeNum<Number>
	 * @returns splicedArray<Array>
	 */
	var immutableSplice = function immutableSplice(obj, index, removeNum) {
	    if (!(0, _checkers.isArray)(obj)) {
	        throw new TypeError('Object passed to concat is not an array.');
	    }
	
	    if ((0, _checkers.isUndefined)(obj[index])) {
	        return obj;
	    }
	
	    return [].concat(_toConsumableArray(obj.slice(0, index)), _toConsumableArray(obj.slice(index + removeNum)));
	};
	
	var setDeeplyNested = function setDeeplyNested(obj, keys, value) {
	    forEach(keys, function (key, index) {
	        if (index < keys.length - 1) {
	            keys.shift();
	
	            obj[key] = setDeeplyNested(obj[key] || {}, keys, value);
	        } else if (!(0, _checkers.isUndefined)(key)) {
	            obj[key] = value;
	        }
	    });
	
	    return obj;
	};
	
	var entriesShim = function entriesShim(obj) {
	    if (obj.entries) {
	        return obj.entries();
	    }
	
	    return (0, _entries2.default)(obj);
	};
	
	exports.entries = entriesShim;
	exports.forEach = forEach;
	exports.forEachRight = forEachRight;
	exports.forIn = forIn;
	exports.forOwn = forOwn;
	exports.setDeeplyNested = setDeeplyNested;
	exports.splice = immutableSplice;
	exports.default = {
	    entries: entriesShim,
	    forEach: forEach,
	    forEachRight: forEachRight,
	    forIn: forIn,
	    forOwn: forOwn,
	    setDeeplyNested: setDeeplyNested,
	    splice: immutableSplice
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(12);
	module.exports = __webpack_require__(15).Object.entries;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $export  = __webpack_require__(13)
	  , $entries = __webpack_require__(25)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(14)
	  , core      = __webpack_require__(15)
	  , hide      = __webpack_require__(16)
	  , redefine  = __webpack_require__(21)
	  , ctx       = __webpack_require__(23)
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
/* 14 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.0.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(17)
	  , createDesc = __webpack_require__(18);
	module.exports = __webpack_require__(19) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 17 */
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
/* 18 */
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(20)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// add fake Function#toString
	// for correct work wrapped methods / constructors with methods like LoDash isNative
	var global    = __webpack_require__(14)
	  , hide      = __webpack_require__(16)
	  , SRC       = __webpack_require__(22)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(15).inspectSource = function(it){
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
/* 22 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(24);
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
/* 24 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(17)
	  , toIObject = __webpack_require__(26)
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(27)
	  , defined = __webpack_require__(29);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(28);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var staticProperty = function staticProperty(obj, property, value) {
	    Object.defineProperty(obj, property, {
	        configurable: false,
	        enumerable: false,
	        value: value,
	        writable: false
	    });
	};
	
	var readonlyProperty = function readonlyProperty(obj, property, value) {
	    Object.defineProperty(obj, property, {
	        configurable: false,
	        enumerable: true,
	        value: value,
	        writable: false
	    });
	};
	
	exports.readonlyProperty = readonlyProperty;
	exports.staticProperty = staticProperty;
	exports.default = {
	    readonlyProperty: readonlyProperty,
	    staticProperty: staticProperty
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.hashString = exports.hashObject = undefined;
	
	var _murmurHashJs = __webpack_require__(32);
	
	var _murmurHashJs2 = _interopRequireDefault(_murmurHashJs);
	
	var _cereal = __webpack_require__(39);
	
	var _cereal2 = _interopRequireDefault(_cereal);
	
	var _buffer = __webpack_require__(34);
	
	var _checkers = __webpack_require__(5);
	
	var _crioCheckers = __webpack_require__(7);
	
	var _functions = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// external dependencies
	
	var hashString = function hashString(obj) {
	    if (!(0, _checkers.isString)(obj)) {
	        obj = obj.toString();
	    }
	
	    var buf = new _buffer.Buffer(obj);
	
	    return (0, _murmurHashJs2.default)(buf);
	};
	
	// local partial imports
	
	var hashFunctionInObject = function hashFunctionInObject(obj) {
	    var loopFunction = (0, _checkers.isArray)(obj) ? _functions.forEach : _functions.forIn;
	
	    var cleanObj = (0, _checkers.isArray)(obj) ? [] : {};
	
	    loopFunction(obj, function (value, key) {
	        if ((0, _crioCheckers.isConvertibleToCrio)(value)) {
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
	
	    // if its an array, check if a function exists in there
	    if ((0, _crioCheckers.isConvertibleToCrio)(obj)) {
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var murmur3 = __webpack_require__(33)
	var murmur2 = __webpack_require__(38)
	
	module.exports = murmur3
	module.exports.murmur3 = murmur3
	module.exports.murmur2 = murmur2


/***/ },
/* 33 */
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34).Buffer))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(35)
	var ieee754 = __webpack_require__(36)
	var isArray = __webpack_require__(37)
	
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34).Buffer, (function() { return this; }())))

/***/ },
/* 35 */
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
/* 36 */
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
/* 37 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 38 */
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34).Buffer))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(40);


/***/ },
/* 40 */
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createNewCrio = __webpack_require__(2);
	
	var _CrioCollection2 = __webpack_require__(8);
	
	var _CrioCollection3 = _interopRequireDefault(_CrioCollection2);
	
	var _checkers = __webpack_require__(5);
	
	var _crioCheckers = __webpack_require__(7);
	
	var _crioFunctions = __webpack_require__(9);
	
	var _functions = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// local imports
	
	// local partial imports
	
	/**
	 * Accepts sources of various types and converts them to an array of arrays
	 *
	 * @param sources<Array>
	 * @returns {Array}
	 */
	var getCleanSources = function getCleanSources(sources) {
	    var cleanSources = [];
	
	    (0, _functions.forEach)(sources, function (source) {
	        if (!(0, _checkers.isArray)(source)) {
	            var cleanSource = (0, _crioCheckers.isCrio)(source) ? source.thaw() : source;
	
	            cleanSources.push((0, _checkers.isArray)(cleanSource) ? cleanSource : [cleanSource]);
	        } else {
	            cleanSources.push(source);
	        }
	    });
	
	    return cleanSources;
	};
	
	var CrioList = (function (_CrioCollection) {
	    _inherits(CrioList, _CrioCollection);
	
	    function CrioList(obj) {
	        _classCallCheck(this, CrioList);
	
	        // this converts array-like objects to actual arrays
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(CrioList).call(this, obj));
	    }
	
	    /**
	     * Returns new array of object concatentation with sources
	     *
	     * @param sources<Array>
	     * @returns {CrioList}
	     */
	
	    _createClass(CrioList, [{
	        key: 'concat',
	        value: function concat() {
	            var _object;
	
	            for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
	                sources[_key] = arguments[_key];
	            }
	
	            var arrays = getCleanSources(sources);
	
	            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)((_object = this.object).concat.apply(_object, _toConsumableArray(arrays))));
	        }
	
	        /**
	         * Returns true if every item in the array finds a match based on the return from the callback
	         *
	         * @param callback<Function>
	         * @returns {boolean}
	         */
	
	    }, {
	        key: 'every',
	        value: function every(callback) {
	            return this.object.every(callback);
	        }
	
	        /**
	         * Returns new CrioList with items at indices starting at start and prior to end replaced with fillValue
	         *
	         * @param fillValue
	         * @param start
	         * @param end
	         * @returns {CrioCollection}
	         */
	
	    }, {
	        key: 'fill',
	        value: function fill(fillValue) {
	            var start = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var end = arguments.length <= 2 || arguments[2] === undefined ? this.size : arguments[2];
	
	            var filledArray = [];
	
	            (0, _functions.forEach)(this.object, function (value, index) {
	                filledArray[index] = index >= start && index < end ? fillValue : value;
	            });
	
	            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(filledArray));
	        }
	
	        /**
	         * Executes standard filter function (as filter returns new array)
	         *
	         * @param callback<Function>
	         * @param args<Array>
	         * @returns filteredArray<CrioList>
	         */
	
	    }, {
	        key: 'filter',
	        value: function filter(callback) {
	            var _object2;
	
	            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                args[_key2 - 1] = arguments[_key2];
	            }
	
	            var values = (_object2 = this.object).filter.apply(_object2, [callback].concat(args));
	
	            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(values));
	        }
	
	        /**
	         * Finds first item in array that returns a value, and returns a new Crio of it
	         *
	         * @param callback<Function>
	         * @param thisArg<Object[optional]>
	         * @returns {any}
	         */
	
	    }, {
	        key: 'find',
	        value: function find(callback, thisArg) {
	            var _this2 = this;
	
	            var match = undefined;
	
	            (0, _functions.forEach)(this.object, function (value, index, arr) {
	                if (callback.call(thisArg, value, index, arr)) {
	                    match = (0, _crioCheckers.isConvertibleToCrio)(value) ? (0, _crioFunctions.getCrioInstance)(_this2, (0, _createNewCrio.createNewCrioList)(value)) : value;
	
	                    return false;
	                }
	            });
	
	            return match;
	        }
	
	        /**
	         * Finds first item in array that returns a value, and returns index of it in array
	         *
	         * @param callback<Function>
	         * @param thisArg<Object[optional]>
	         * @returns {number}
	         */
	
	    }, {
	        key: 'findIndex',
	        value: function findIndex(callback, thisArg) {
	            var matchIndex = -1;
	
	            (0, _functions.forEach)(this.object, function (value, index, arr) {
	                if (callback.call(thisArg, value, index, arr)) {
	                    matchIndex = index;
	                    return false;
	                }
	            });
	
	            return matchIndex;
	        }
	
	        /**
	         * Returns mutable first item in the object
	         *
	         * @returns {CrioCollection}
	         */
	
	    }, {
	        key: 'first',
	        value: function first() {
	            var firstObject = this.object[0];
	
	            if ((0, _checkers.isArray)(firstObject)) {
	                return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(firstObject));
	            }
	
	            return firstObject;
	        }
	
	        /**
	         * Convenience function for checking if array includes value or not
	         *
	         * @param value
	         * @returns includesMatch<Boolean>
	         */
	
	    }, {
	        key: 'includes',
	        value: function includes(value) {
	            return this.indexOf(value) !== -1;
	        }
	
	        /**
	         * Returns index of first matching element in this.object
	         *
	         * @param value<Any>
	         * @returns indexOfMatch<Number>
	         */
	
	    }, {
	        key: 'indexOf',
	        value: function indexOf(value) {
	            if ((0, _checkers.isValueless)(value)) {
	                return -1;
	            }
	
	            return this.object.indexOf(value);
	        }
	
	        /**
	         * Joins array values into string separated by joiner
	         *
	         * @param joiner<String>
	         * @returns joinedArray<String>
	         */
	
	    }, {
	        key: 'join',
	        value: function join() {
	            var joiner = arguments.length <= 0 || arguments[0] === undefined ? ',' : arguments[0];
	
	            return this.object.join(joiner);
	        }
	
	        /**
	         * Returns mutable last item in the CrioList
	         *
	         * @returns {*}
	         */
	
	    }, {
	        key: 'last',
	        value: function last() {
	            var lastObject = this.object[this.object.length - 1];
	
	            if ((0, _checkers.isArray)(lastObject)) {
	                return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(lastObject));
	            }
	
	            return lastObject;
	        }
	
	        /**
	         * Same as .indexOf(), except returns last item in array that matches instead of first
	         *
	         * @param value<Any>
	         * @returns lastIndexMatch<Number>
	         */
	
	    }, {
	        key: 'lastIndexOf',
	        value: function lastIndexOf(value) {
	            if ((0, _checkers.isValueless)(value)) {
	                return -1;
	            }
	
	            return this.object.lastIndexOf(value);
	        }
	
	        /**
	         * Executes standard map function (as map returns new array)
	         *
	         * @param callback<Function>
	         * @param thisArg<Object[optional]>
	         * @returns mappedArray<CrioList>
	         */
	
	    }, {
	        key: 'map',
	        value: function map(callback, thisArg) {
	            var values = this.object.map(callback, thisArg);
	
	            if (!(0, _checkers.isArray)(values)) {
	                throw new Error('You cannot change the type of object when mapping. If you want to do this, ' + 'you can use the .mutate() method.');
	            }
	
	            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(values));
	        }
	
	        /**
	         * Alias function for pop
	         *
	         * @returns lastItemInArray<Any>
	         */
	
	    }, {
	        key: 'pop',
	        value: function pop() {
	            return this.splice(this.size - 1);
	        }
	
	        /**
	         * Adds values passed to array at the back, after the existing items
	         *
	         * @param values<Array>
	         * @returns {Crio}
	         */
	
	    }, {
	        key: 'push',
	        value: function push() {
	            var _ref;
	
	            var newValues = (_ref = [].concat(_toConsumableArray(this.object))).concat.apply(_ref, arguments);
	
	            return (0, _createNewCrio.createNewCrioList)(newValues);
	        }
	
	        /**
	         * Based on action in callback, each item in array executes function to somehow modify
	         * initialValue. If the resulting reduction is an array or an object, then return a new
	         * Crio, otherwise return the reduction.
	         *
	         * @param callback<Function>
	         * @param initialValue<any>
	         * @returns {any}
	         */
	
	    }, {
	        key: 'reduce',
	        value: function reduce(callback) {
	            var initialValue = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            var reducedValue = this.object.reduce(callback, initialValue);
	
	            return (0, _crioFunctions.coalesceCrioValue)(this, reducedValue);
	        }
	
	        /**
	         * Identical to .reduce(), but performs action on the array from right to left.
	         *
	         * @param callback<Function>
	         * @param initialValue<any>
	         * @returns {any}
	         */
	
	    }, {
	        key: 'reduceRight',
	        value: function reduceRight(callback) {
	            var initialValue = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            return this.reverse().reduce(callback, initialValue);
	        }
	
	        /**
	         * Reverses the order of the array in this.object and returns new Crio
	         *
	         * @returns reversedArray<CrioList>
	         */
	
	    }, {
	        key: 'reverse',
	        value: function reverse() {
	            var reversedArray = [];
	
	            (0, _functions.forEachRight)(this.object, function (value) {
	                reversedArray.push(value);
	            });
	
	            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(reversedArray));
	        }
	
	        /**
	         * ALias for shift function
	         *
	         * @returns firstItemInArray<Any>
	         */
	
	    }, {
	        key: 'shift',
	        value: function shift() {
	            return this.splice(0);
	        }
	
	        /**
	         * Returns an array of items that is a window of original array, from passed begin to passed end.
	         * If no end is passed, then window is from begin to end of the original array.
	         *
	         * @param begin<Number>
	         * @param end<Number[optional]>
	         * @returns {CrioList}
	         */
	
	    }, {
	        key: 'slice',
	        value: function slice(begin, end) {
	            if ((0, _checkers.isValueless)(begin)) {
	                return this;
	            }
	
	            var slicedArray = [].concat(_toConsumableArray(this.object)).slice(begin, end);
	
	            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(slicedArray));
	        }
	
	        /**
	         * Returns true if any items in the array are a match, based on the return in the callback
	         *
	         * @param callback<Function>
	         * @returns {boolean}
	         */
	
	    }, {
	        key: 'some',
	        value: function some(callback) {
	            return this.object.some(callback);
	        }
	
	        /**
	         * Applies sort to object, and returns new CrioList with sorted objects
	         *
	         * @param fn<Function[optional]>
	         * @returns {Crio}
	         *
	         * @todo Modify this so that it doesn't require thawing (for use with native sort it's necessary)
	         */
	
	    }, {
	        key: 'sort',
	        value: function sort(fn) {
	            var sortedObject = this.thaw().sort(fn);
	
	            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(sortedObject));
	        }
	
	        /**
	         * Returns a new CrioList with an object including all values except that
	         * of the key(s) passed.
	         *
	         * @param index<Number>
	         * @param removeNum<Number>
	         * @returns itemWithKeysRemoved<Crio>
	         */
	
	    }, {
	        key: 'splice',
	        value: function splice(index) {
	            var removeNum = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
	
	            if (!(0, _checkers.isNumber)(index)) {
	                return this;
	            }
	
	            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)((0, _functions.splice)(this.object, index, removeNum)));
	        }
	
	        /**
	         * Converts CrioList into CrioMap
	         *
	         * @returns {any}
	         */
	
	    }, {
	        key: 'toMap',
	        value: function toMap() {
	            return this.mutate(function (mutableList) {
	                var map = {};
	
	                (0, _functions.forEach)(mutableList, function (value, index) {
	                    map[index] = value;
	                });
	
	                return map;
	            });
	        }
	
	        /**
	         * Returns a unique list of all arrays passed concatenated with the original this.object
	         *
	         * @param sources<Array>
	         * @returns {CrioList}
	         */
	
	    }, {
	        key: 'union',
	        value: function union() {
	            for (var _len3 = arguments.length, sources = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	                sources[_key3] = arguments[_key3];
	            }
	
	            var arrays = getCleanSources(sources);
	
	            return (0, _crioFunctions.getCrioInstance)(this, this.concat.apply(this, _toConsumableArray(arrays)).unique());
	        }
	
	        /**
	         * Returns CrioList with only unique items in original CrioList
	         *
	         * @returns {CrioList}
	         */
	
	    }, {
	        key: 'unique',
	        value: function unique() {
	            var uniqueList = [];
	
	            this.forEach(function (value) {
	                if (uniqueList.indexOf(value) === -1) {
	                    uniqueList.push(value);
	                }
	            });
	
	            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioList)(uniqueList));
	        }
	
	        /**
	         * Adds values passed to array at the front, before the existing items
	         *
	         * @param values<Array>
	         * @returns {Crio}
	         */
	
	    }, {
	        key: 'unshift',
	        value: function unshift() {
	            var _ref2;
	
	            for (var _len4 = arguments.length, values = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	                values[_key4] = arguments[_key4];
	            }
	
	            var newValues = (_ref2 = [].concat(_toConsumableArray(values.reverse()))).concat.apply(_ref2, _toConsumableArray(this.object));
	
	            return (0, _createNewCrio.createNewCrioList)(newValues);
	        }
	    }]);
	
	    return CrioList;
	})(_CrioCollection3.default);
	
	exports.default = CrioList;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _checkers = __webpack_require__(5);
	
	var _createNewCrio = __webpack_require__(2);
	
	var _CrioCollection2 = __webpack_require__(8);
	
	var _CrioCollection3 = _interopRequireDefault(_CrioCollection2);
	
	var _crioFunctions = __webpack_require__(9);
	
	var _functions = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// local imports
	
	// local partial imports
	
	var CrioMap = (function (_CrioCollection) {
	    _inherits(CrioMap, _CrioCollection);
	
	    function CrioMap(obj) {
	        _classCallCheck(this, CrioMap);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(CrioMap).call(this, obj));
	    }
	
	    /**
	     * Returns a new Crio with an object including all values except that
	     * of the key(s) passed.
	     *
	     * @param keys<Array>
	     * @returns itemWithKeysRemoved<Crio>
	     */
	
	    _createClass(CrioMap, [{
	        key: 'delete',
	        value: function _delete() {
	            for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	                keys[_key] = arguments[_key];
	            }
	
	            if (keys.length === 0) {
	                return (0, _createNewCrio.createNewCrioMap)();
	            }
	
	            var newValue = _extends({}, this.object);
	
	            (0, _functions.forEach)(keys, function (key) {
	                delete newValue[key];
	            });
	
	            return (0, _crioFunctions.getCrioInstance)(this, (0, _createNewCrio.createNewCrioMap)(newValue));
	        }
	
	        /**
	         * Alias for Object.prototype.hasOwnProperty
	         *
	         * @param
	         * @returns {boolean}prop<any>
	         */
	
	    }, {
	        key: 'has',
	        value: function has(prop) {
	            if (!(0, _checkers.isString)(prop)) {
	                prop = prop.toString();
	            }
	
	            return this.object.hasOwnProperty(prop);
	        }
	
	        /**
	         * Converts CrioMap to a CrioList, where each item is a value from the key:value pairs
	         * in the original map
	         *
	         * @returns {CrioCollection}
	         */
	
	    }, {
	        key: 'toList',
	        value: function toList() {
	            return this.mutate(function (mutableObject) {
	                var list = [];
	
	                (0, _functions.forIn)(mutableObject, function (value) {
	                    list.push(value);
	                });
	
	                return list;
	            });
	        }
	    }]);
	
	    return CrioMap;
	})(_CrioCollection3.default);
	
	exports.default = CrioMap;

/***/ }
/******/ ]);
//# sourceMappingURL=crio.js.map