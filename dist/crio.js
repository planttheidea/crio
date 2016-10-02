(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("hash-it"), require("stringifier"));
	else if(typeof define === 'function' && define.amd)
		define("crio", ["hash-it", "stringifier"], factory);
	else if(typeof exports === 'object')
		exports["crio"] = factory(require("hash-it"), require("stringifier"));
	else
		root["crio"] = factory(root["hashIt"], root["stringifier"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_181__, __WEBPACK_EXTERNAL_MODULE_189__) {
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
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(2);
	
	__webpack_require__(30);
	
	__webpack_require__(38);
	
	__webpack_require__(40);
	
	__webpack_require__(41);
	
	__webpack_require__(42);
	
	__webpack_require__(59);
	
	__webpack_require__(60);
	
	__webpack_require__(61);
	
	__webpack_require__(62);
	
	__webpack_require__(63);
	
	var _isArray = __webpack_require__(64);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _isObject = __webpack_require__(65);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	var _classes = __webpack_require__(66);
	
	var _is = __webpack_require__(187);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * generate a new CrioArray or CrioObject
	 *
	 * @param {*} object
	 * @returns {CrioArray|CrioObject|*}
	 */
	
	
	// external dependencies
	
	
	// ESNext
	var createCrio = function createCrio() {
	  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  if ((0, _is.isCrio)(object)) {
	    return object;
	  }
	
	  if ((0, _isArray2.default)(object)) {
	    return new _classes.CrioArray(object);
	  }
	
	  if ((0, _isObject2.default)(object)) {
	    return new _classes.CrioObject(object);
	  }
	
	  return object;
	}; // ES2015
	
	
	createCrio.array = function () {
	  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	
	  return new _classes.CrioArray(array);
	};
	
	createCrio.object = function () {
	  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  return new _classes.CrioObject(object);
	};
	
	exports.default = createCrio;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(3);
	
	$export($export.P, 'Array', {copyWithin: __webpack_require__(21)});
	
	__webpack_require__(27)('copyWithin');

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , core      = __webpack_require__(5)
	  , hide      = __webpack_require__(6)
	  , redefine  = __webpack_require__(16)
	  , ctx       = __webpack_require__(19)
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
	    if(target)redefine(target, key, out, type & $export.U);
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
/* 4 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(7)
	  , createDesc = __webpack_require__(15);
	module.exports = __webpack_require__(11) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(8)
	  , IE8_DOM_DEFINE = __webpack_require__(10)
	  , toPrimitive    = __webpack_require__(14)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(11) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(11) && !__webpack_require__(12)(function(){
	  return Object.defineProperty(__webpack_require__(13)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(12)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9)
	  , document = __webpack_require__(4).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(9);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , hide      = __webpack_require__(6)
	  , has       = __webpack_require__(17)
	  , SRC       = __webpack_require__(18)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(5).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
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
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(20);
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
/* 20 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(22)
	  , toIndex  = __webpack_require__(24)
	  , toLength = __webpack_require__(26);
	
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(23);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(25)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(25)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(28)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(6)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(29)('wks')
	  , uid        = __webpack_require__(18)
	  , Symbol     = __webpack_require__(4).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(3)
	  , $every  = __webpack_require__(31)(4);
	
	$export($export.P + $export.F * !__webpack_require__(37)([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */){
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(19)
	  , IObject  = __webpack_require__(32)
	  , toObject = __webpack_require__(22)
	  , toLength = __webpack_require__(26)
	  , asc      = __webpack_require__(34);
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(33);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(35);
	
	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9)
	  , isArray  = __webpack_require__(36)
	  , SPECIES  = __webpack_require__(28)('species');
	
	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(33);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var fails = __webpack_require__(12);
	
	module.exports = function(method, arg){
	  return !!method && fails(function(){
	    arg ? method.call(null, function(){}, 1) : method.call(null);
	  });
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(3);
	
	$export($export.P, 'Array', {fill: __webpack_require__(39)});
	
	__webpack_require__(27)('fill');

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(22)
	  , toIndex  = __webpack_require__(24)
	  , toLength = __webpack_require__(26);
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(3)
	  , $find   = __webpack_require__(31)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(27)(KEY);

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(3)
	  , $find   = __webpack_require__(31)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(27)(KEY);

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(27)
	  , step             = __webpack_require__(43)
	  , Iterators        = __webpack_require__(44)
	  , toIObject        = __webpack_require__(45);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(46)(Array, 'Array', function(iterated, kind){
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
/* 43 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(32)
	  , defined = __webpack_require__(23);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(47)
	  , $export        = __webpack_require__(3)
	  , redefine       = __webpack_require__(16)
	  , hide           = __webpack_require__(6)
	  , has            = __webpack_require__(17)
	  , Iterators      = __webpack_require__(44)
	  , $iterCreate    = __webpack_require__(48)
	  , setToStringTag = __webpack_require__(57)
	  , getPrototypeOf = __webpack_require__(58)
	  , ITERATOR       = __webpack_require__(28)('iterator')
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
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
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
/* 47 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(49)
	  , descriptor     = __webpack_require__(15)
	  , setToStringTag = __webpack_require__(57)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(6)(IteratorPrototype, __webpack_require__(28)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(8)
	  , dPs         = __webpack_require__(50)
	  , enumBugKeys = __webpack_require__(55)
	  , IE_PROTO    = __webpack_require__(54)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(13)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(56).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(7)
	  , anObject = __webpack_require__(8)
	  , getKeys  = __webpack_require__(51);
	
	module.exports = __webpack_require__(11) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(52)
	  , enumBugKeys = __webpack_require__(55);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(17)
	  , toIObject    = __webpack_require__(45)
	  , arrayIndexOf = __webpack_require__(53)(false)
	  , IE_PROTO     = __webpack_require__(54)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(45)
	  , toLength  = __webpack_require__(26)
	  , toIndex   = __webpack_require__(24);
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
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(29)('keys')
	  , uid    = __webpack_require__(18);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4).document && document.documentElement;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(7).f
	  , has = __webpack_require__(17)
	  , TAG = __webpack_require__(28)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(17)
	  , toObject    = __webpack_require__(22)
	  , IE_PROTO    = __webpack_require__(54)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(3)
	  , $some   = __webpack_require__(31)(3);
	
	$export($export.P + $export.F * !__webpack_require__(37)([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */){
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/Array.prototype.includes
	var $export   = __webpack_require__(3)
	  , $includes = __webpack_require__(53)(true);
	
	$export($export.P, 'Array', {
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	
	__webpack_require__(27)('includes');

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/leobalter/object-enumerables
	var $export  = __webpack_require__(3)
	  , toObject = __webpack_require__(22);
	
	$export($export.S, 'Object', {
	  enumerableEntries: function enumerableEntries(O){
	    var T          = toObject(O)
	      , properties = [];
	    for(var key in T)properties.push([key, T[key]]);
	    return properties;
	  }
	});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/leobalter/object-enumerables
	var $export  = __webpack_require__(3)
	  , toObject = __webpack_require__(22);
	
	$export($export.S, 'Object', {
	  enumerableKeys: function enumerableKeys(O){
	    var T          = toObject(O)
	      , properties = [];
	    for(var key in T)properties.push(key);
	    return properties;
	  }
	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/leobalter/object-enumerables
	var $export  = __webpack_require__(3)
	  , toObject = __webpack_require__(22);
	
	$export($export.S, 'Object', {
	  enumerableValues: function enumerableValues(O){
	    var T          = toObject(O)
	      , properties = [];
	    for(var key in T)properties.push(T[key]);
	    return properties;
	  }
	});

/***/ },
/* 64 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ },
/* 65 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CrioObject = exports.CrioArray = undefined;
	
	var _CRIO_ARRAY_PROTOTYPE, _CRIO_OBJECT_PROTOTYP;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _forEach = __webpack_require__(67);
	
	var _forEach2 = _interopRequireDefault(_forEach);
	
	var _forEachRight = __webpack_require__(176);
	
	var _forEachRight2 = _interopRequireDefault(_forEachRight);
	
	var _hashIt = __webpack_require__(181);
	
	var _hashIt2 = _interopRequireDefault(_hashIt);
	
	var _isArray = __webpack_require__(64);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _isObject = __webpack_require__(65);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	var _isUndefined = __webpack_require__(182);
	
	var _isUndefined2 = _interopRequireDefault(_isUndefined);
	
	var _constants = __webpack_require__(183);
	
	var _loops = __webpack_require__(185);
	
	var _is = __webpack_require__(187);
	
	var _stringify = __webpack_require__(188);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // external dependencies
	
	
	var OBJECT_CREATE = _constants.OBJECT.create;
	var OBJECT_ENTRIES = _constants.OBJECT.entries;
	var OBJECT_KEYS = _constants.OBJECT.keys;
	
	/**
	 * build prototype object to add to default prototype
	 *
	 * @param {object} prototype
	 * @returns {object}
	 */
	var createPrototypeObject = function createPrototypeObject(prototype) {
	  var keys = OBJECT_KEYS(prototype);
	  var propertySymbols = _constants.OBJECT.getOwnPropertySymbols(prototype);
	  var allPropertyItems = [].concat(_toConsumableArray(keys), _toConsumableArray(propertySymbols));
	
	  return allPropertyItems.reduce(function (accumulatedPrototype, key) {
	    var value = prototype[key];
	
	    return _extends({}, accumulatedPrototype, _defineProperty({}, key, {
	      enumerable: false,
	      value: value
	    }));
	  }, {});
	};
	
	/**
	 * run Object.freeze on the crio only in non-production environments
	 *
	 * @param {CrioArray|CrioObject} crio
	 * @returns {CrioArray|CrioObject}
	 */
	var freezeIfNotProduction = function freezeIfNotProduction(crio) {
	  if (_constants.IS_PRODUCTION) {
	    return crio;
	  }
	
	  return Object.freeze(crio);
	};
	
	/**
	 * get the crioed value if it is an array or object,
	 * else return the value itself
	 *
	 * @param {*} value
	 * @returns {*}
	 */
	var getCrioedValue = function getCrioedValue(value) {
	  if ((0, _is.isCrio)(value) || (0, _is.isReactElement)(value)) {
	    return value;
	  }
	
	  if ((0, _isArray2.default)(value)) {
	    return new CrioArray(value);
	  }
	
	  if ((0, _isObject2.default)(value)) {
	    return new CrioObject(value);
	  }
	
	  return value;
	};
	
	/**
	 * get the plain object version of the crio type
	 *
	 * @param {CrioArray|CrioObject} crio
	 * @returns {{}|[]}
	 */
	var getPlainObject = function getPlainObject(crio) {
	  return crio[_constants.CRIO_TYPE] === _constants.CRIO_OBJECT ? {} : [];
	};
	
	/**
	 * return the original object if the values have not changed
	 *
	 * @param {CrioArray|CrioObject} crio
	 * @param {CrioArray|CrioObject} newCrio
	 * @returns {CrioArray|CrioObject}
	 */
	var getSameCrioIfUnchanged = function getSameCrioIfUnchanged(crio, newCrio) {
	  if ((0, _is.isSameCrio)(newCrio)) {
	    return crio;
	  }
	
	  return newCrio;
	};
	
	/**
	 * shallowly merge sources into target
	 *
	 * @param {CrioArray|CrioObject} target
	 * @param {array<array|object>} sources
	 * @returns {CrioArray|CrioObject}
	 */
	var mergeCrioedObjects = function mergeCrioedObjects(target) {
	  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    sources[_key - 1] = arguments[_key];
	  }
	
	  if (!sources.length) {
	    return target;
	  }
	
	  var isTargetCrio = (0, _is.isCrio)(target);
	
	  var plainObject = void 0;
	
	  if (!isTargetCrio || target[_constants.CRIO_TYPE] === _constants.CRIO_OBJECT) {
	    plainObject = isTargetCrio ? _extends({}, target) : {};
	
	    (0, _forEach2.default)(sources, function (object) {
	      if ((0, _isObject2.default)(object)) {
	        plainObject = _extends({}, plainObject, object);
	      }
	    });
	
	    return getSameCrioIfUnchanged(target, new CrioObject(plainObject));
	  }
	
	  plainObject = [];
	
	  (0, _forEach2.default)(sources, function (array) {
	    if ((0, _isArray2.default)(array)) {
	      (0, _forEach2.default)(array, function (value, index) {
	        plainObject[index] = getCrioedValue(value);
	      });
	    }
	  });
	
	  if (plainObject.length < target.length) {
	    var index = plainObject.length - 1;
	
	    while (++index < target.length) {
	      plainObject[index] = target[index];
	    }
	  }
	
	  return getSameCrioIfUnchanged(target, new CrioArray(plainObject));
	};
	
	/**
	 * create based Crio class with a null prototype that will assign
	 * the values passed to itself
	 */
	
	var Crio = function Crio(object) {
	  var _this = this;
	
	  _classCallCheck(this, Crio);
	
	  if ((0, _is.isCrio)(object)) {
	    return object;
	  }
	
	  var length = 0;
	
	  (0, _forEach2.default)(object, function (value, key) {
	    _this[key] = getCrioedValue(value);
	
	    length++;
	  });
	
	  _constants.OBJECT.defineProperties(this, _defineProperty({
	    length: {
	      enumerable: false,
	      value: length
	    }
	
	  }, _constants.CRIO_HASH_CODE, {
	    enumerable: false,
	    value: (0, _hashIt2.default)(object)
	  }));
	
	  return freezeIfNotProduction(this);
	};
	
	var CRIO_PROTOTYPE = {
	  /**
	   * return an empty crio
	   *
	   * @returns {CrioArray|CrioObject}
	   */
	  clear: function clear() {
	    if (!this.length) {
	      return this;
	    }
	
	    var plainObject = getPlainObject(this);
	
	    return new this.constructor(plainObject);
	  },
	
	
	  /**
	   * reduce the Crio to only having values that are truthy
	   *
	   * @returns {CrioArray|CrioObject}
	   */
	  compact: function compact() {
	    var compactedCrio = this.filter(function (value) {
	      return !!value;
	    });
	
	    return getSameCrioIfUnchanged(this, compactedCrio);
	  },
	
	
	  constructor: Crio,
	
	  /**
	   * remove key from this
	   *
	   * @param {string|number} key
	   * @returns {CrioArray|CrioObject}
	   */
	  delete: function _delete(key) {
	    var _this2 = this;
	
	    var plainObject = getPlainObject(this),
	        isThisArray = (0, _isArray2.default)(plainObject);
	
	    (0, _forEach2.default)(this.keys(), function (currentKey) {
	      if (currentKey !== key) {
	        if (isThisArray) {
	          plainObject.push(_this2[currentKey]);
	        } else {
	          plainObject[currentKey] = _this2[currentKey];
	        }
	      }
	    });
	
	    return getSameCrioIfUnchanged(this, new this.constructor(plainObject));
	  },
	
	
	  /**
	   * remove deeply-nested key from this
	   *
	   * @param {array<string|number>} keys
	   * @returns {CrioArray|CrioObject}
	   */
	  deleteIn: function deleteIn(keys) {
	    var _this3 = this;
	
	    if (!keys.length) {
	      return this;
	    }
	
	    var key = keys.shift();
	
	    if (!keys.length) {
	      return this.delete(key);
	    }
	
	    var plainObject = getPlainObject(this),
	        isTargetKey = false;
	
	    this.forEach(function (currentValue, currentKey) {
	      isTargetKey = currentKey === key;
	      currentValue = _this3[currentKey];
	
	      if (isTargetKey) {
	        if ((0, _is.isCrio)(currentValue)) {
	          plainObject[currentKey] = currentValue.deleteIn(keys);
	        }
	      } else {
	        plainObject[currentKey] = currentValue;
	      }
	    });
	
	    return getSameCrioIfUnchanged(this, new this.constructor(plainObject));
	  },
	
	
	  /**
	   * determine if object passed is equal in value to this
	   *
	   * @param {CrioArray|CrioObject} object
	   * @returns {boolean}
	   */
	  equals: function equals(object) {
	    if (!(0, _is.isCrio)(object)) {
	      return false;
	    }
	
	    return this[_constants.CRIO_TYPE] === object[_constants.CRIO_TYPE] && this[_constants.CRIO_HASH_CODE] === object[_constants.CRIO_HASH_CODE];
	  },
	
	
	  /**
	   * get the value that matches at key
	   *
	   * @param {string|number} key
	   * @returns {*}
	   */
	  get: function get(key) {
	    return this[key];
	  },
	
	
	  /**
	   * get the value that matches at the deeply nested location from keys
	   *
	   * @param {array<string|number>} keys
	   * @returns {*}
	   */
	  getIn: function getIn(keys) {
	    var length = keys.length;
	
	    switch (length) {
	      case 0:
	        return this;
	
	      case 1:
	        return this[keys[0]];
	    }
	
	    var currentObject = this,
	        index = -1,
	        key = void 0;
	
	    while (++index < length) {
	      key = keys[index];
	
	      if ((0, _isUndefined2.default)(currentObject[key])) {
	        return undefined;
	      }
	
	      if (index === length - 1) {
	        return currentObject[key];
	      }
	
	      currentObject = currentObject[key];
	    }
	
	    return undefined;
	  },
	
	
	  /**
	   * does this have the property passed
	   *
	   * @param {number|string} property
	   * @returns {boolean}
	   */
	  has: function has(property) {
	    return this.hasOwnProperty(property);
	  },
	
	
	  /**
	   * does this have the property passed
	   *
	   * @param {number|string} property
	   * @returns {boolean}
	   */
	  hasOwnProperty: function hasOwnProperty(property) {
	    return _constants.OBJECT_PROTOTYPE.hasOwnProperty.call(this, property);
	  },
	
	
	  /**
	   * shallowly merge the objects passed with this
	   *
	   * @param {array<object>} objects
	   * @returns {CrioObject}
	   */
	  merge: function merge() {
	    for (var _len2 = arguments.length, objects = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      objects[_key2] = arguments[_key2];
	    }
	
	    return mergeCrioedObjects.apply(undefined, [this].concat(objects));
	  },
	
	
	  /**
	   * shallowly merge the objects passed with the deeply-nested location determined by keys
	   *
	   * @param {array<string|number>} keys
	   * @param {array<object>} objects
	   * @returns {CrioObject}
	   */
	  mergeIn: function mergeIn(keys) {
	    for (var _len3 = arguments.length, objects = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      objects[_key3 - 1] = arguments[_key3];
	    }
	
	    if (!keys.length) {
	      return this;
	    }
	
	    var _keys = _toArray(keys);
	
	    var key = _keys[0];
	
	    var restOfKeys = _keys.slice(1);
	
	    if (!restOfKeys.length) {
	      if ((0, _is.isCrio)(this[key])) {
	        return this.set(key, mergeCrioedObjects.apply(undefined, [this[key]].concat(objects)));
	      }
	
	      var object = objects[0];
	      var restOfObjects = objects.slice(1);
	
	
	      return this.set(key, mergeCrioedObjects.apply(undefined, [object].concat(_toConsumableArray(restOfObjects))));
	    }
	
	    var plainObject = getPlainObject(this),
	        isKeySet = false,
	        isTargetKey = false;
	
	    this.forEach(function (currentValue, currentKey) {
	      isTargetKey = currentKey === key;
	
	      if (isTargetKey) {
	        isKeySet = true;
	
	        plainObject[currentKey] = (0, _is.isCrio)(currentValue) ? currentValue.mergeIn.apply(currentValue, [restOfKeys].concat(objects)) : _loops.createDeeplyNestedObject.apply(undefined, [restOfKeys].concat(objects));
	      } else {
	        plainObject[currentKey] = currentValue;
	      }
	    });
	
	    if (!isKeySet) {
	      var _object = objects[0];
	
	      var _restOfObjects = objects.slice(1);
	
	      plainObject[key] = mergeCrioedObjects.apply(undefined, [_object].concat(_toConsumableArray(_restOfObjects)));
	    }
	
	    return getSameCrioIfUnchanged(this, new this.constructor(plainObject));
	  },
	
	
	  /**
	   * execute a function with the mutated value of this and return the re-crioed version
	   *
	   * @param {function} fn
	   * @param {*} thisArg
	   * @returns {*}
	   */
	  mutate: function mutate(fn) {
	    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
	
	    var result = fn.call(thisArg, this.thaw(), this);
	
	    return getSameCrioIfUnchanged(this, getCrioedValue(result));
	  },
	
	
	  /**
	   * set key in this to be value
	   *
	   * @param {string|number} key
	   * @param {*} value
	   * @returns {CrioArray|CrioObject}
	   */
	  set: function set(key, value) {
	    var plainObject = getPlainObject(this);
	
	    plainObject[key] = value;
	
	    this.forEach(function (currentValue, currentKey) {
	      if (currentKey !== key) {
	        plainObject[currentKey] = currentValue;
	      }
	    });
	
	    return getSameCrioIfUnchanged(this, new this.constructor(plainObject));
	  },
	
	
	  /**
	   * set deeply-nested value in this based on keys
	   *
	   * @param {array<string|number>} keys
	   * @param {number} keys.length
	   * @param {*} value
	   * @returns {CrioArray|CrioObject}
	   */
	  setIn: function setIn(keys, value) {
	    if (!keys.length) {
	      return this;
	    }
	
	    var _keys2 = _toArray(keys);
	
	    var key = _keys2[0];
	
	    var restOfKeys = _keys2.slice(1);
	
	    if (!restOfKeys.length) {
	      return this.set(key, value);
	    }
	
	    var hasKey = this.has(key);
	
	    var plainObject = getPlainObject(this);
	
	    if (!hasKey) {
	      plainObject[key] = (0, _is.isCrio)(value) ? value : (0, _loops.createDeeplyNestedObject)(restOfKeys, value);
	    }
	
	    this.forEach(function (currentValue, currentKey) {
	      if (hasKey && currentKey === key) {
	        plainObject[currentKey] = (0, _is.isCrio)(currentValue) ? currentValue.setIn(restOfKeys, value) : (0, _loops.createDeeplyNestedObject)(restOfKeys, value);
	      } else {
	        plainObject[currentKey] = currentValue;
	      }
	    });
	
	    return getSameCrioIfUnchanged(this, new this.constructor(plainObject));
	  },
	
	
	  /**
	   * return the non-crio version of the object
	   *
	   * @returns {array<*>|object}
	   */
	  thaw: function thaw() {
	    var plainObject = getPlainObject(this);
	
	    this.forEach(function (value, key) {
	      plainObject[key] = (0, _is.isCrio)(value) ? value.thaw() : value;
	    });
	
	    return plainObject;
	  },
	
	
	  /**
	   * convert this to a CrioArray
	   *
	   * @returns {CrioArray}
	   */
	  toArray: function toArray() {
	    if (this[_constants.CRIO_TYPE] === _constants.CRIO_ARRAY) {
	      return this;
	    }
	
	    var array = [];
	
	    this.forEach(function (value) {
	      array.push(value);
	    });
	
	    return new CrioArray(array);
	  },
	
	
	  /**
	   * get the stringified version of this
	   *
	   * @returns {string}
	   */
	  toLocaleString: function toLocaleString() {
	    return (0, _stringify2.default)(this);
	  },
	
	
	  /**
	   * convert this to a CrioObject
	   *
	   * @returns {CrioObject}
	   */
	  toObject: function toObject() {
	    if (this[_constants.CRIO_TYPE] === _constants.CRIO_OBJECT) {
	      return this;
	    }
	
	    var object = {};
	
	    this.forEach(function (value, index) {
	      object[index] = value;
	    });
	
	    return new CrioObject(object);
	  },
	
	
	  /**
	   * get the stringified version of this
	   *
	   * @returns {string}
	   */
	  toString: function toString() {
	    return (0, _stringify2.default)(this);
	  },
	
	
	  /**
	   * get the valueOf for this
	   *
	   * @returns {CrioArray|CrioObject}
	   */
	  valueOf: function valueOf() {
	    return this;
	  }
	};
	
	Crio.prototype = OBJECT_CREATE(null, createPrototypeObject(CRIO_PROTOTYPE));
	
	/**
	 * create CrioArray class extending Crio with built prototype
	 */
	
	var CrioArray = function (_Crio) {
	  _inherits(CrioArray, _Crio);
	
	  function CrioArray(array) {
	    _classCallCheck(this, CrioArray);
	
	    return _possibleConstructorReturn(this, (CrioArray.__proto__ || Object.getPrototypeOf(CrioArray)).call(this, array));
	  }
	
	  return CrioArray;
	}(Crio);
	
	var CRIO_ARRAY_PROTOTYPE = (_CRIO_ARRAY_PROTOTYPE = {
	  /**
	   * concatenate the arguments passed with the current array
	   *
	   * @param {array<*> } args
	   * @returns {CrioArray}
	   */
	  concat: function concat() {
	    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	      args[_key4] = arguments[_key4];
	    }
	
	    if (!args.length) {
	      return this;
	    }
	
	    var shallowClone = (0, _loops.shallowCloneArray)(this);
	
	    return getSameCrioIfUnchanged(this, new CrioArray(_constants.ARRAY_PROTOTYPE.concat.apply(shallowClone, args)));
	  },
	
	
	  constructor: CrioArray,
	
	  /**
	   * return a new array with the appropriate arguments for copyWithin applied
	   *
	   * @param {array<*>} args
	   * @returns {CrioArray}
	   */
	  copyWithin: function copyWithin() {
	    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	      args[_key5] = arguments[_key5];
	    }
	
	    if (!args.length) {
	      return this;
	    }
	
	    var shallowClone = (0, _loops.shallowCloneArray)(this);
	    var copiedArray = _constants.ARRAY_PROTOTYPE.copyWithin.apply(shallowClone, args);
	
	    return getSameCrioIfUnchanged(this, new CrioArray(copiedArray));
	  },
	
	
	  /**
	   * return an array of [key, value] pairs for this
	   *
	   * @returns {array<array>}
	   */
	  entries: function entries() {
	    return OBJECT_ENTRIES(this);
	  },
	
	
	  /**
	   * does every item in this match the result of fn
	   *
	   * @param {function} fn
	   * @param {*} thisArg
	   * @returns {boolean}
	   */
	  every: function every(fn) {
	    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
	
	    return _constants.ARRAY_PROTOTYPE.every.call(this, fn, thisArg);
	  },
	
	
	  /**
	   * return a new array with the appropriate arguments for fill applied
	   *
	   * @param {array<*>} args
	   * @returns {CrioArray}
	   */
	  fill: function fill() {
	    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	      args[_key6] = arguments[_key6];
	    }
	
	    if (!args.length) {
	      return this;
	    }
	
	    var shallowClone = (0, _loops.shallowCloneArray)(this);
	    var filledArray = _constants.ARRAY_PROTOTYPE.fill.apply(shallowClone, args);
	
	    return getSameCrioIfUnchanged(this, new CrioArray(filledArray));
	  },
	
	
	  /**
	   * filter this based on truthy results from fn
	   *
	   * @param {function} fn
	   * @param {*} thisArg
	   * @returns {CrioArray}
	   */
	  filter: function filter(fn) {
	    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
	
	    var filteredArray = _constants.ARRAY_PROTOTYPE.filter.call(this, fn, thisArg);
	
	    return getSameCrioIfUnchanged(this, new CrioArray(filteredArray));
	  },
	
	
	  /**
	   * find the first item that returns truthy for fn
	   *
	   * @param {function} fn
	   * @param {*} thisArg
	   * @returns {*}
	   */
	  find: function find(fn) {
	    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
	
	    return _constants.ARRAY_PROTOTYPE.find.call(this, fn, thisArg);
	  },
	
	
	  /**
	   * find the index of the first item that returns truthy for fn
	   *
	   * @param {function} fn
	   * @param {*} thisArg
	   * @returns {number}
	   */
	  findIndex: function findIndex(fn) {
	    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
	
	    return _constants.ARRAY_PROTOTYPE.findIndex.call(this, fn, thisArg);
	  },
	
	
	  /**
	   * return the first X number of items, based on number
	   *
	   * @param {number} number
	   * @returns {CrioArray}
	   */
	  first: function first() {
	    var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	
	    if (number >= this.length) {
	      return this;
	    }
	
	    return this.slice(0, number);
	  },
	
	
	  /**
	   * loop over this, executing fn
	   *
	   * @param {function} fn
	   * @param {*} thisArg
	   */
	  forEach: function forEach(fn) {
	    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
	
	    _constants.ARRAY_PROTOTYPE.forEach.call(this, fn, thisArg);
	  },
	
	
	  /**
	   * does this have the value passed
	   *
	   * @param {*} value
	   * @returns {boolean}
	   */
	  includes: function includes(value) {
	    return _constants.ARRAY_PROTOTYPE.includes.call(this, value);
	  },
	
	
	  /**
	   * if the index of the value passed exists, return the
	   * first instance of it, else return -1
	   *
	   * @param {*} value
	   * @returns {number}
	   */
	  indexOf: function indexOf(value) {
	    return _constants.ARRAY_PROTOTYPE.indexOf.call(this, value);
	  },
	
	
	  /**
	   * combine the values in this, with separator as the separator
	   *
	   * @param {string} separator
	   * @returns {string}
	   */
	  join: function join() {
	    var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ',';
	
	    return _constants.ARRAY_PROTOTYPE.join.call(this, separator);
	  },
	
	
	  /**
	   * return the keys of this
	   *
	   * @returns {array<string>}
	   */
	  keys: function keys() {
	    return OBJECT_KEYS(this).map(_loops.convertToNumber);
	  },
	
	
	  /**
	   * return the last X number of items, based on number
	   *
	   * @param {number} number
	   * @returns {CrioArray}
	   */
	  last: function last() {
	    var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	
	    if (number >= this.length) {
	      return this;
	    }
	
	    return this.slice(this.length - number, this.length);
	  },
	
	
	  /**
	   * if the index of the value passed exists, return the
	   * last instance of it, else return -1
	   *
	   * @param {*} value
	   * @returns {number}
	   */
	  lastIndexOf: function lastIndexOf(value) {
	    return _constants.ARRAY_PROTOTYPE.lastIndexOf.call(this, value);
	  },
	
	
	  /**
	   * return the values mapped by fn as a new CrioArray
	   *
	   * @param {function} fn
	   * @param {*} thisArg
	   * @returns {CrioArray}
	   */
	  map: function map(fn) {
	    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
	
	    var mappedArray = _constants.ARRAY_PROTOTYPE.map.call(this, fn, thisArg);
	
	    return getSameCrioIfUnchanged(this, new CrioArray(mappedArray));
	  },
	
	
	  /**
	   * return a new CrioArray with the last item removed
	   *
	   * @returns {CrioArray}
	   */
	  pop: function pop() {
	    return this.slice(0, this.length - 1);
	  },
	
	
	  /**
	   * add items to the current CrioArray
	   *
	   * @param {array<*>} items
	   * @returns {CrioArray}
	   */
	  push: function push() {
	    for (var _len7 = arguments.length, items = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	      items[_key7] = arguments[_key7];
	    }
	
	    if (!items.length) {
	      return this;
	    }
	
	    return this.concat(items);
	  },
	
	
	  /**
	   * reduce the values in the array based on starting with defaultValue
	   *
	   * @param {function} fn
	   * @param {*} defaultValue
	   * @param {*} thisArg
	   * @returns {*}
	   */
	  reduce: function reduce(fn, defaultValue) {
	    var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
	
	    var reducedValue = _constants.ARRAY_PROTOTYPE.reduce.call(this, fn, defaultValue, thisArg);
	
	    return getSameCrioIfUnchanged(this, getCrioedValue(reducedValue));
	  },
	
	
	  /**
	   * reduce the values in the array based on starting with defaultValue,
	   * but starting from the end and working to the beginning
	   *
	   * @param {function} fn
	   * @param {*} defaultValue
	   * @param {*} thisArg
	   * @returns {*}
	   */
	  reduceRight: function reduceRight(fn, defaultValue) {
	    var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
	
	    var reducedValue = _constants.ARRAY_PROTOTYPE.reduceRight.call(this, fn, defaultValue, thisArg);
	
	    return getSameCrioIfUnchanged(this, getCrioedValue(reducedValue));
	  },
	
	
	  /**
	   * reverse the order of the CrioArray
	   *
	   * @returns {CrioArray}
	   */
	  reverse: function reverse() {
	    var newArray = [];
	
	    (0, _forEachRight2.default)(this, function (value) {
	      newArray.push(value);
	    });
	
	    return getSameCrioIfUnchanged(this, new CrioArray(newArray));
	  },
	
	
	  /**
	   * return the CrioArray with the first item removed
	   *
	   * @returns {CrioArray}
	   */
	  shift: function shift() {
	    return this.slice(1);
	  },
	
	
	  /**
	   * return the sliced version of the current CrioArray
	   *
	   * @param {array<*>} args
	   * @returns {CrioArray}
	   */
	  slice: function slice() {
	    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	      args[_key8] = arguments[_key8];
	    }
	
	    if (!args.length) {
	      return this;
	    }
	
	    var slicedArray = _constants.ARRAY_PROTOTYPE.slice.apply(this, args);
	
	    return getSameCrioIfUnchanged(this, new CrioArray(slicedArray));
	  },
	
	
	  /**
	   * does this return truthy for at least one of the returns of fn
	   *
	   * @param {function} fn
	   * @param {*} thisArg
	   * @returns {boolean}
	   */
	  some: function some(fn) {
	    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
	
	    return _constants.ARRAY_PROTOTYPE.some.call(this, fn, thisArg);
	  },
	
	
	  /**
	   * return a sorted version of the current CrioArray
	   *
	   * @param {function} fn
	   * @returns {CrioArray}
	   */
	  sort: function sort(fn) {
	    var shallowClone = (0, _loops.shallowCloneArray)(this);
	
	    return getSameCrioIfUnchanged(this, new CrioArray(shallowClone.sort(fn)));
	  },
	
	
	  /**
	   * return the spliced version of the current CrioArray
	   *
	   * @param {array<*>} args
	   * @returns {CrioArray}
	   */
	  splice: function splice() {
	    for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
	      args[_key9] = arguments[_key9];
	    }
	
	    if (!args.length) {
	      return this;
	    }
	
	    var shallowClone = (0, _loops.shallowCloneArray)(this);
	
	    _constants.ARRAY_PROTOTYPE.splice.apply(shallowClone, args);
	
	    return getSameCrioIfUnchanged(this, new CrioArray(shallowClone));
	  },
	
	
	  /**
	   * return the current CrioArray with the duplicate values removed
	   *
	   * @returns {CrioArray}
	   */
	  unique: function unique() {
	    var hashArray = [],
	        newArray = [],
	        hasHashCode = false,
	        hashCode = void 0;
	
	    var filteredCrioArray = this.filter(function (value) {
	      hashCode = value[_constants.CRIO_HASH_CODE];
	      hasHashCode = !(0, _isUndefined2.default)(hashCode);
	
	      if (!newArray.includes(value) && (!hasHashCode || !hashArray.includes(hashCode))) {
	        newArray.push(value);
	
	        if (hasHashCode) {
	          hashArray.push(hashCode);
	        }
	
	        return true;
	      }
	
	      return false;
	    });
	
	    return getSameCrioIfUnchanged(this, filteredCrioArray);
	  },
	
	
	  /**
	   * add the args passed to the current CrioArray
	   *
	   * @param {array<*>} args
	   * @returns {CrioArray}
	   */
	  unshift: function unshift() {
	    for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
	      args[_key10] = arguments[_key10];
	    }
	
	    if (!args.length) {
	      return this;
	    }
	
	    var unshiftedArray = _constants.ARRAY_PROTOTYPE.concat.apply(args, this);
	
	    return new getSameCrioIfUnchanged(this, new CrioArray(unshiftedArray));
	  },
	
	
	  /**
	   * get the values of this
	   *
	   * @returns {array<*>}
	   */
	  values: function values() {
	    return _constants.ARRAY_PROTOTYPE.values.call(this);
	  }
	}, _defineProperty(_CRIO_ARRAY_PROTOTYPE, _constants.CRIO_TYPE, _constants.CRIO_ARRAY), _defineProperty(_CRIO_ARRAY_PROTOTYPE, Symbol.iterator, _constants.ARRAY_PROTOTYPE[Symbol.iterator]), _CRIO_ARRAY_PROTOTYPE);
	
	CrioArray.prototype = OBJECT_CREATE(Crio.prototype, createPrototypeObject(CRIO_ARRAY_PROTOTYPE));
	
	/**
	 * create CrioObject class extending Crio with built prototype
	 */
	
	var CrioObject = function (_Crio2) {
	  _inherits(CrioObject, _Crio2);
	
	  function CrioObject(object) {
	    _classCallCheck(this, CrioObject);
	
	    return _possibleConstructorReturn(this, (CrioObject.__proto__ || Object.getPrototypeOf(CrioObject)).call(this, object));
	  }
	
	  return CrioObject;
	}(Crio);
	
	var CRIO_OBJECT_PROTOTYPE = (_CRIO_OBJECT_PROTOTYP = {
	  constructor: CrioObject,
	
	  /**
	   * get the entries of this
	   *
	   * @returns {array<array>}
	   */
	  entries: function entries() {
	    return OBJECT_ENTRIES(this);
	  },
	
	
	  /**
	   * filter the current CrioArray by the truthy return of fn
	   *
	   * @param {function} fn
	   * @param {*} thisArg
	   * @returns {CrioObject}
	   */
	  filter: function filter(fn) {
	    var _this6 = this;
	
	    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
	
	    var newObject = {};
	
	    this.forEach(function (value, key) {
	      if (fn.call(thisArg, value, key, _this6)) {
	        newObject[key] = value;
	      }
	    });
	
	    return getSameCrioIfUnchanged(this, new CrioObject(newObject));
	  },
	
	
	  /**
	   * find the value in this that yields a truthy return from fn
	   *
	   * @param {function} fn
	   * @param {*} thisArg
	   * @returns {*}
	   */
	  find: function find(fn) {
	    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
	
	    var keys = this.keys();
	    var length = keys.length;
	
	    var index = -1,
	        key = void 0;
	
	    while (++index < length) {
	      key = keys[index];
	
	      if (fn.call(thisArg, this[key], key, this)) {
	        return this[key];
	      }
	    }
	
	    return undefined;
	  },
	
	
	  /**
	   * find the key in this that yields a truthy return from fn
	   *
	   * @param {function} fn
	   * @param {*} thisArg
	   * @returns {*}
	   */
	  findKey: function findKey(fn) {
	    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
	
	    var keys = this.keys();
	    var length = keys.length;
	
	    var index = -1,
	        key = void 0;
	
	    while (++index < length) {
	      key = keys[index];
	
	      if (fn.call(thisArg, this[key], key, this)) {
	        return key;
	      }
	    }
	
	    return undefined;
	  },
	
	
	  /**
	   * loop over this, executing fn
	   *
	   * @param {function} fn
	   * @param {*} thisArg
	   */
	  forEach: function forEach(fn) {
	    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
	
	    (0, _loops.forEachObject)(this, fn, thisArg);
	  },
	
	
	  /**
	   * is this the prototype of the object passed
	   *
	   * @param {*} object
	   * @returns {boolean}
	   */
	  isPrototypeOf: function isPrototypeOf(object) {
	    return _constants.OBJECT_PROTOTYPE.isPrototypeOf.call(this, object);
	  },
	
	
	  /**
	   * get the keys of this
	   *
	   * @returns {array<string>}
	   */
	  keys: function keys() {
	    return OBJECT_KEYS(this);
	  },
	
	
	  /**
	   * return the new object based on the mapped values of this
	   *
	   * @param {function} fn
	   * @param {*} thisArg
	   * @returns {CrioObject}
	   */
	  map: function map(fn) {
	    var _this7 = this;
	
	    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
	
	    var newObject = {},
	        result = void 0;
	
	    this.forEach(function (value, key) {
	      result = fn.call(thisArg, value, key, _this7);
	
	      newObject[key] = getCrioedValue(result);
	    });
	
	    return getSameCrioIfUnchanged(this, new CrioObject(newObject));
	  },
	
	
	  /**
	   * is the property passed enumerable
	   *
	   * @param {string} property
	   * @returns {boolean}
	   */
	  propertyIsEnumerable: function propertyIsEnumerable(property) {
	    return _constants.OBJECT_PROTOTYPE.propertyIsEnumerable.call(this, property);
	  },
	
	
	  /**
	   * reduce the values in the object based on starting with defaultValue
	   *
	   * @param {function} fn
	   * @param {*} defaultValue
	   * @param {*} thisArg
	   * @returns {*}
	   */
	  reduce: function reduce(fn, defaultValue) {
	    var _this8 = this;
	
	    var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
	
	    var reducedValue = _constants.ARRAY_PROTOTYPE.reduce.call(this.keys(), function (accumulation, key) {
	      return fn.call(thisArg, accumulation, _this8[key], key, _this8);
	    }, defaultValue);
	
	    return getSameCrioIfUnchanged(this, getCrioedValue(reducedValue));
	  },
	
	
	  /**
	   * reduce the values in the array based on starting with defaultValue,
	   * but starting from the end and working to the beginning
	   *
	   * @param {function} fn
	   * @param {*} defaultValue
	   * @param {*} thisArg
	   * @returns {*}
	   */
	  reduceRight: function reduceRight(fn, defaultValue) {
	    var _this9 = this;
	
	    var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
	
	    var reducedValue = _constants.ARRAY_PROTOTYPE.reduceRight.call(this.keys(), function (accumulation, key) {
	      return fn.call(thisArg, accumulation, _this9[key], key, _this9);
	    }, defaultValue);
	
	    return getSameCrioIfUnchanged(this, getCrioedValue(reducedValue));
	  },
	
	
	  /**
	   * get the values for this
	   *
	   * @returns {array<*>}
	   */
	  values: function values() {
	    return _constants.OBJECT.values(this);
	  }
	}, _defineProperty(_CRIO_OBJECT_PROTOTYP, _constants.CRIO_TYPE, _constants.CRIO_OBJECT), _defineProperty(_CRIO_OBJECT_PROTOTYP, Symbol.iterator, function () {
	  var _this10 = this;
	
	  var keys = this.keys();
	
	  var index = 0,
	      key = void 0,
	      value = void 0;
	
	  return {
	    next: function next() {
	      key = keys[index];
	      value = _this10[key];
	
	      if (index < _this10.length) {
	        index++;
	
	        return {
	          done: false,
	          key: key,
	          value: value
	        };
	      } else {
	        return {
	          done: true
	        };
	      }
	    }
	  };
	}), _CRIO_OBJECT_PROTOTYP);
	
	CrioObject.prototype = OBJECT_CREATE(Crio.prototype, createPrototypeObject(CRIO_OBJECT_PROTOTYPE));
	
	exports.CrioArray = CrioArray;
	exports.CrioObject = CrioObject;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(68),
	    baseEach = __webpack_require__(69),
	    baseIteratee = __webpack_require__(88),
	    isArray = __webpack_require__(64);
	
	/**
	 * Iterates over elements of `collection` and invokes `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length"
	 * property are iterated like arrays. To avoid this behavior use `_.forIn`
	 * or `_.forOwn` for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @see _.forEachRight
	 * @example
	 *
	 * _.forEach([1, 2], function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `1` then `2`.
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forEach(collection, iteratee) {
	  var func = isArray(collection) ? arrayEach : baseEach;
	  return func(collection, baseIteratee(iteratee, 3));
	}
	
	module.exports = forEach;


/***/ },
/* 68 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEach;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(70),
	    createBaseEach = __webpack_require__(87);
	
	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);
	
	module.exports = baseEach;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(71),
	    keys = __webpack_require__(73);
	
	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}
	
	module.exports = baseForOwn;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(72);
	
	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	module.exports = baseFor;


/***/ },
/* 72 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;
	
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = createBaseFor;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(74),
	    baseKeys = __webpack_require__(83),
	    isArrayLike = __webpack_require__(78);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	
	module.exports = keys;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(75),
	    isArguments = __webpack_require__(76),
	    isArray = __webpack_require__(64),
	    isIndex = __webpack_require__(82);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];
	
	  var length = result.length,
	      skipIndexes = !!length;
	
	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = arrayLikeKeys;


/***/ },
/* 75 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	module.exports = baseTimes;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(77);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	module.exports = isArguments;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(78),
	    isObjectLike = __webpack_require__(81);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	module.exports = isArrayLikeObject;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(79),
	    isLength = __webpack_require__(80);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(65);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 80 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 81 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 82 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	module.exports = isIndex;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(84),
	    nativeKeys = __webpack_require__(85);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = baseKeys;


/***/ },
/* 84 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.exports = isPrototype;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(86);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);
	
	module.exports = nativeKeys;


/***/ },
/* 86 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	module.exports = overArg;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(78);
	
	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);
	
	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}
	
	module.exports = createBaseEach;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(89),
	    baseMatchesProperty = __webpack_require__(157),
	    identity = __webpack_require__(172),
	    isArray = __webpack_require__(64),
	    property = __webpack_require__(173);
	
	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}
	
	module.exports = baseIteratee;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(90),
	    getMatchData = __webpack_require__(154),
	    matchesStrictComparable = __webpack_require__(156);
	
	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}
	
	module.exports = baseMatches;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(91),
	    baseIsEqual = __webpack_require__(129);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;
	
	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];
	
	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}
	
	module.exports = baseIsMatch;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(92),
	    stackClear = __webpack_require__(100),
	    stackDelete = __webpack_require__(101),
	    stackGet = __webpack_require__(102),
	    stackHas = __webpack_require__(103),
	    stackSet = __webpack_require__(104);
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}
	
	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	module.exports = Stack;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(93),
	    listCacheDelete = __webpack_require__(94),
	    listCacheGet = __webpack_require__(97),
	    listCacheHas = __webpack_require__(98),
	    listCacheSet = __webpack_require__(99);
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	module.exports = ListCache;


/***/ },
/* 93 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}
	
	module.exports = listCacheClear;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(95);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}
	
	module.exports = listCacheDelete;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(96);
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	module.exports = assocIndexOf;


/***/ },
/* 96 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	module.exports = eq;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(95);
	
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  return index < 0 ? undefined : data[index][1];
	}
	
	module.exports = listCacheGet;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(95);
	
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	
	module.exports = listCacheHas;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(95);
	
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	module.exports = listCacheSet;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(92);
	
	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}
	
	module.exports = stackClear;


/***/ },
/* 101 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);
	
	  this.size = data.size;
	  return result;
	}
	
	module.exports = stackDelete;


/***/ },
/* 102 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}
	
	module.exports = stackGet;


/***/ },
/* 103 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}
	
	module.exports = stackHas;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(92),
	    Map = __webpack_require__(105),
	    MapCache = __webpack_require__(114);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}
	
	module.exports = stackSet;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(106),
	    root = __webpack_require__(110);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(107),
	    getValue = __webpack_require__(113);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(79),
	    isMasked = __webpack_require__(108),
	    isObject = __webpack_require__(65),
	    toSource = __webpack_require__(112);
	
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	
	module.exports = baseIsNative;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(109);
	
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());
	
	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}
	
	module.exports = isMasked;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(110);
	
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];
	
	module.exports = coreJsData;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(111);
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	module.exports = root;


/***/ },
/* 111 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	module.exports = freeGlobal;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 112 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}
	
	module.exports = toSource;


/***/ },
/* 113 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	
	module.exports = getValue;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(115),
	    mapCacheDelete = __webpack_require__(123),
	    mapCacheGet = __webpack_require__(126),
	    mapCacheHas = __webpack_require__(127),
	    mapCacheSet = __webpack_require__(128);
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	
	module.exports = MapCache;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(116),
	    ListCache = __webpack_require__(92),
	    Map = __webpack_require__(105);
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}
	
	module.exports = mapCacheClear;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(117),
	    hashDelete = __webpack_require__(119),
	    hashGet = __webpack_require__(120),
	    hashHas = __webpack_require__(121),
	    hashSet = __webpack_require__(122);
	
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	
	module.exports = Hash;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(118);
	
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}
	
	module.exports = hashClear;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(106);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.exports = nativeCreate;


/***/ },
/* 119 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}
	
	module.exports = hashDelete;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(118);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}
	
	module.exports = hashGet;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(118);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}
	
	module.exports = hashHas;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(118);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}
	
	module.exports = hashSet;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(124);
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}
	
	module.exports = mapCacheDelete;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(125);
	
	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}
	
	module.exports = getMapData;


/***/ },
/* 125 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}
	
	module.exports = isKeyable;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(124);
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}
	
	module.exports = mapCacheGet;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(124);
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}
	
	module.exports = mapCacheHas;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(124);
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;
	
	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}
	
	module.exports = mapCacheSet;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(130),
	    isObject = __webpack_require__(65),
	    isObjectLike = __webpack_require__(81);
	
	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqual;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(91),
	    equalArrays = __webpack_require__(131),
	    equalByTag = __webpack_require__(137),
	    equalObjects = __webpack_require__(142),
	    getTag = __webpack_require__(143),
	    isArray = __webpack_require__(64),
	    isTypedArray = __webpack_require__(149);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;
	
	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;
	
	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqualDeep;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(132),
	    arraySome = __webpack_require__(135),
	    cacheHas = __webpack_require__(136);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;
	
	  stack.set(array, other);
	  stack.set(other, array);
	
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}
	
	module.exports = equalArrays;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(114),
	    setCacheAdd = __webpack_require__(133),
	    setCacheHas = __webpack_require__(134);
	
	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}
	
	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	
	module.exports = SetCache;


/***/ },
/* 133 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}
	
	module.exports = setCacheAdd;


/***/ },
/* 134 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}
	
	module.exports = setCacheHas;


/***/ },
/* 135 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arraySome;


/***/ },
/* 136 */
/***/ function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}
	
	module.exports = cacheHas;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(138),
	    Uint8Array = __webpack_require__(139),
	    eq = __webpack_require__(96),
	    equalArrays = __webpack_require__(131),
	    mapToArray = __webpack_require__(140),
	    setToArray = __webpack_require__(141);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;
	
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;
	
	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');
	
	    case mapTag:
	      var convert = mapToArray;
	
	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);
	
	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;
	
	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	      stack['delete'](object);
	      return result;
	
	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}
	
	module.exports = equalByTag;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(110);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(110);
	
	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;
	
	module.exports = Uint8Array;


/***/ },
/* 140 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);
	
	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
	module.exports = mapToArray;


/***/ },
/* 141 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	module.exports = setToArray;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(73);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);
	
	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}
	
	module.exports = equalObjects;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(144),
	    Map = __webpack_require__(105),
	    Promise = __webpack_require__(145),
	    Set = __webpack_require__(146),
	    WeakMap = __webpack_require__(147),
	    baseGetTag = __webpack_require__(148),
	    toSource = __webpack_require__(112);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';
	
	var dataViewTag = '[object DataView]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;
	
	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;
	
	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}
	
	module.exports = getTag;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(106),
	    root = __webpack_require__(110);
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');
	
	module.exports = DataView;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(106),
	    root = __webpack_require__(110);
	
	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');
	
	module.exports = Promise;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(106),
	    root = __webpack_require__(110);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.exports = Set;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(106),
	    root = __webpack_require__(110);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.exports = WeakMap;


/***/ },
/* 148 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}
	
	module.exports = baseGetTag;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(150),
	    baseUnary = __webpack_require__(151),
	    nodeUtil = __webpack_require__(152);
	
	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	
	module.exports = isTypedArray;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(80),
	    isObjectLike = __webpack_require__(81);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	
	module.exports = baseIsTypedArray;


/***/ },
/* 151 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}
	
	module.exports = baseUnary;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(111);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;
	
	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}());
	
	module.exports = nodeUtil;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(153)(module)))

/***/ },
/* 153 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(155),
	    keys = __webpack_require__(73);
	
	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;
	
	  while (length--) {
	    var key = result[length],
	        value = object[key];
	
	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}
	
	module.exports = getMatchData;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(65);
	
	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}
	
	module.exports = isStrictComparable;


/***/ },
/* 156 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}
	
	module.exports = matchesStrictComparable;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(129),
	    get = __webpack_require__(158),
	    hasIn = __webpack_require__(169),
	    isKey = __webpack_require__(167),
	    isStrictComparable = __webpack_require__(155),
	    matchesStrictComparable = __webpack_require__(156),
	    toKey = __webpack_require__(168);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}
	
	module.exports = baseMatchesProperty;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(159);
	
	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}
	
	module.exports = get;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(160),
	    isKey = __webpack_require__(167),
	    toKey = __webpack_require__(168);
	
	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	module.exports = baseGet;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(64),
	    stringToPath = __webpack_require__(161);
	
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}
	
	module.exports = castPath;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(162),
	    toString = __webpack_require__(164);
	
	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  string = toString(string);
	
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});
	
	module.exports = stringToPath;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(163);
	
	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;
	
	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });
	
	  var cache = result.cache;
	  return result;
	}
	
	module.exports = memoizeCapped;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(114);
	
	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;
	
	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}
	
	// Expose `MapCache`.
	memoize.Cache = MapCache;
	
	module.exports = memoize;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(165);
	
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}
	
	module.exports = toString;


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(138),
	    isSymbol = __webpack_require__(166);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = baseToString;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(81);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	module.exports = isSymbol;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(64),
	    isSymbol = __webpack_require__(166);
	
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}
	
	module.exports = isKey;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(166);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = toKey;


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(170),
	    hasPath = __webpack_require__(171);
	
	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}
	
	module.exports = hasIn;


/***/ },
/* 170 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}
	
	module.exports = baseHasIn;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(160),
	    isArguments = __webpack_require__(76),
	    isArray = __webpack_require__(64),
	    isIndex = __webpack_require__(82),
	    isKey = __webpack_require__(167),
	    isLength = __webpack_require__(80),
	    toKey = __webpack_require__(168);
	
	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var index = -1,
	      length = path.length,
	      result = false;
	
	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}
	
	module.exports = hasPath;


/***/ },
/* 172 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(174),
	    basePropertyDeep = __webpack_require__(175),
	    isKey = __webpack_require__(167),
	    toKey = __webpack_require__(168);
	
	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}
	
	module.exports = property;


/***/ },
/* 174 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(159);
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}
	
	module.exports = basePropertyDeep;


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEachRight = __webpack_require__(177),
	    baseEachRight = __webpack_require__(178),
	    baseIteratee = __webpack_require__(88),
	    isArray = __webpack_require__(64);
	
	/**
	 * This method is like `_.forEach` except that it iterates over elements of
	 * `collection` from right to left.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.0.0
	 * @alias eachRight
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @see _.forEach
	 * @example
	 *
	 * _.forEachRight([1, 2], function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `2` then `1`.
	 */
	function forEachRight(collection, iteratee) {
	  var func = isArray(collection) ? arrayEachRight : baseEachRight;
	  return func(collection, baseIteratee(iteratee, 3));
	}
	
	module.exports = forEachRight;


/***/ },
/* 177 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEachRight` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEachRight(array, iteratee) {
	  var length = array ? array.length : 0;
	
	  while (length--) {
	    if (iteratee(array[length], length, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEachRight;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwnRight = __webpack_require__(179),
	    createBaseEach = __webpack_require__(87);
	
	/**
	 * The base implementation of `_.forEachRight` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEachRight = createBaseEach(baseForOwnRight, true);
	
	module.exports = baseEachRight;


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var baseForRight = __webpack_require__(180),
	    keys = __webpack_require__(73);
	
	/**
	 * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwnRight(object, iteratee) {
	  return object && baseForRight(object, iteratee, keys);
	}
	
	module.exports = baseForOwnRight;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(72);
	
	/**
	 * This function is like `baseFor` except that it iterates over properties
	 * in the opposite order.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseForRight = createBaseFor(true);
	
	module.exports = baseForRight;


/***/ },
/* 181 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_181__;

/***/ },
/* 182 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 *
	 * _.isUndefined(null);
	 * // => false
	 */
	function isUndefined(value) {
	  return value === undefined;
	}
	
	module.exports = isUndefined;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var OBJECT = Object;
	
	var ARRAY_PROTOTYPE = Array.prototype;
	var OBJECT_PROTOTYPE = OBJECT.prototype;
	
	var CRIO_CONSTRUCTOR = Symbol('constructor');
	var CRIO_HASH_CODE = Symbol('hashcode');
	var CRIO_TYPE = Symbol('type');
	
	var CRIO_ARRAY = 'CRIO_ARRAY';
	var CRIO_OBJECT = 'CRIO_OBJECT';
	
	var IS_PRODUCTION = !!(process && process.env && ("development") === 'production');
	
	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;
	
	exports.ARRAY_PROTOTYPE = ARRAY_PROTOTYPE;
	exports.OBJECT_PROTOTYPE = OBJECT_PROTOTYPE;
	exports.CRIO_ARRAY = CRIO_ARRAY;
	exports.CRIO_OBJECT = CRIO_OBJECT;
	exports.CRIO_CONSTRUCTOR = CRIO_CONSTRUCTOR;
	exports.CRIO_HASH_CODE = CRIO_HASH_CODE;
	exports.CRIO_TYPE = CRIO_TYPE;
	exports.IS_PRODUCTION = IS_PRODUCTION;
	exports.OBJECT = OBJECT;
	exports.REACT_ELEMENT_TYPE = REACT_ELEMENT_TYPE;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(184)))

/***/ },
/* 184 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
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
	    var timeout = runTimeout(cleanUpNextTick);
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
	    runClearTimeout(timeout);
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
	        runTimeout(drainQueue);
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
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.shallowCloneArray = exports.forEachObject = exports.createDeeplyNestedObject = exports.convertToNumber = undefined;
	
	var _forEach = __webpack_require__(67);
	
	var _forEach2 = _interopRequireDefault(_forEach);
	
	var _isNumber = __webpack_require__(186);
	
	var _isNumber2 = _interopRequireDefault(_isNumber);
	
	var _constants = __webpack_require__(183);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); } // external dependencies
	
	
	/**
	 * convert the value passed into its numeric form
	 *
	 * @param {*} value
	 * @returns {number}
	 */
	var convertToNumber = function convertToNumber(value) {
	  return +value;
	};
	
	/**
	 * forEach loop specific to objects
	 *
	 * @param {CrioObject} crio
	 * @param {function} fn
	 * @param {*} thisArg
	 */
	var forEachObject = function forEachObject(crio, fn, thisArg) {
	  (0, _forEach2.default)(crio.keys(), function (key) {
	    fn.call(thisArg, crio[key], key, crio);
	  });
	};
	
	/* eslint-disable valid-jsdoc */
	/**
	 * create a deeply-nested new object with value at last key location
	 *
	 * @param {string|number} key
	 * @param {array<string|number>} restOfKeys
	 * @param {number} restOfKeys.length
	 * @param {*} value
	 * @returns {array<*>|object}
	 */
	/* eslint-enable */
	var createDeeplyNestedObject = function createDeeplyNestedObject(_ref, value) {
	  var _ref2 = _toArray(_ref);
	
	  var key = _ref2[0];
	
	  var restOfKeys = _ref2.slice(1);
	
	  var isPlainItemArray = (0, _isNumber2.default)(key);
	  var plainObject = isPlainItemArray ? [] : {};
	
	  var valueToSave = restOfKeys.length ? createDeeplyNestedObject(restOfKeys, value) : value;
	
	  if (isPlainItemArray) {
	    plainObject.push(valueToSave);
	  } else {
	    plainObject[key] = valueToSave;
	  }
	
	  return plainObject;
	};
	
	/**
	 * shallowly clone an array
	 *
	 * @param {array<*>} array
	 * @returns {array<T>}
	 */
	var shallowCloneArray = function shallowCloneArray(array) {
	  return _constants.ARRAY_PROTOTYPE.map.call(array, function (value) {
	    return value;
	  });
	};
	
	exports.convertToNumber = convertToNumber;
	exports.createDeeplyNestedObject = createDeeplyNestedObject;
	exports.forEachObject = forEachObject;
	exports.shallowCloneArray = shallowCloneArray;

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(81);
	
	/** `Object#toString` result references. */
	var numberTag = '[object Number]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
	 * classified as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
	 * @example
	 *
	 * _.isNumber(3);
	 * // => true
	 *
	 * _.isNumber(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isNumber(Infinity);
	 * // => true
	 *
	 * _.isNumber('3');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' ||
	    (isObjectLike(value) && objectToString.call(value) == numberTag);
	}
	
	module.exports = isNumber;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isSameCrio = exports.isReactElement = exports.isCrio = undefined;
	
	var _isObject = __webpack_require__(65);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	var _isUndefined = __webpack_require__(182);
	
	var _isUndefined2 = _interopRequireDefault(_isUndefined);
	
	var _constants = __webpack_require__(183);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * determine if object passed is a Crio object
	 *
	 * @param {*} object
	 * @returns {boolean}
	 */
	var isCrio = function isCrio(object) {
	  return !!object && !(0, _isUndefined2.default)(object[_constants.CRIO_HASH_CODE]);
	};
	
	/**
	 * determine if object is a React element
	 *
	 * @param {any} object
	 * @param {string|symbol} object.$$typeof
	 * @return {boolean}
	 */
	// external dependencies
	var isReactElement = function isReactElement(object) {
	  return (0, _isObject2.default)(object) && object.$$typeof === _constants.REACT_ELEMENT_TYPE;
	};
	
	/**
	 * are the two objects passed the same crio in type and value
	 *
	 * @param {CrioArray|CrioObject} crio1
	 * @param {CrioArray|CrioObject} crio2
	 * @returns {boolean}
	 */
	var isSameCrio = function isSameCrio(crio1, crio2) {
	  return isCrio(crio1) && crio1.equals(crio2);
	};
	
	exports.isCrio = isCrio;
	exports.isReactElement = isReactElement;
	exports.isSameCrio = isSameCrio;

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stringifier = __webpack_require__(189);
	
	var _stringifier2 = _interopRequireDefault(_stringifier);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var STRINGIFIER_OPTIONS = {
	  maxDepth: 10,
	  indent: '  '
	};
	
	var stringify = (0, _stringifier2.default)(STRINGIFIER_OPTIONS);
	
	exports.default = stringify;
	module.exports = exports['default'];

/***/ },
/* 189 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_189__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=crio.js.map