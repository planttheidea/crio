(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("hash-it"), require("stringifier"));
	else if(typeof define === 'function' && define.amd)
		define("crio", ["hash-it", "stringifier"], factory);
	else if(typeof exports === 'object')
		exports["crio"] = factory(require("hash-it"), require("stringifier"));
	else
		root["crio"] = factory(root["hashIt"], root["stringifier"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_65__, __WEBPACK_EXTERNAL_MODULE_71__) {
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
	
	var _classes = __webpack_require__(64);
	
	var _is = __webpack_require__(69);
	
	/**
	 * generate a new CrioArray or CrioObject
	 *
	 * @param {*} object
	 * @returns {CrioArray|CrioObject|*}
	 */
	
	
	// ESNext
	var createCrio = function createCrio() {
	  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  if ((0, _is.isCrio)(object)) {
	    return object;
	  }
	
	  if ((0, _is.isArray)(object)) {
	    return new _classes.CrioArray(object);
	  }
	
	  if ((0, _is.isObject)(object)) {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CrioObject = exports.CrioArray = undefined;
	
	var _CRIO_ARRAY_PROTOTYPE, _CRIO_OBJECT_PROTOTYP;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _hashIt = __webpack_require__(65);
	
	var _hashIt2 = _interopRequireDefault(_hashIt);
	
	var _constants = __webpack_require__(66);
	
	var _loops = __webpack_require__(68);
	
	var _is = __webpack_require__(69);
	
	var _stringify = __webpack_require__(70);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
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
	
	  if ((0, _is.isArray)(value)) {
	    return new CrioArray(value);
	  }
	
	  if ((0, _is.isObject)(value)) {
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
	
	    (0, _loops.forEachArray)(sources, function (object) {
	      if ((0, _is.isObject)(object)) {
	        plainObject = _extends({}, plainObject, object);
	      }
	    });
	
	    return getSameCrioIfUnchanged(target, new CrioObject(plainObject));
	  }
	
	  plainObject = [];
	
	  (0, _loops.forEachArray)(sources, function (array) {
	    if ((0, _is.isArray)(array)) {
	      (0, _loops.forEachArray)(array, function (value, index) {
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
	
	  var isThisObject = (0, _is.isObject)(object);
	
	  var length = 0;
	
	  (0, _loops.forEach)(object, function (value, key) {
	    _this[key] = getCrioedValue(value);
	
	    length++;
	  }, this, isThisObject);
	
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
	        isThisArray = (0, _is.isArray)(plainObject);
	
	    (0, _loops.forEachArray)(this.keys(), function (currentKey) {
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
	
	      if ((0, _is.isUndefined)(currentObject[key])) {
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
	    var plainObject = getPlainObject(this),
	        isKeySet = false,
	        isTargetKey = false;
	
	    this.forEach(function (currentValue, currentKey) {
	      isTargetKey = currentKey === key;
	
	      if (isTargetKey) {
	        isKeySet = true;
	      }
	
	      plainObject[currentKey] = isTargetKey ? value : currentValue;
	    });
	
	    if (!isKeySet) {
	      plainObject[key] = value;
	    }
	
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
	
	    var plainObject = getPlainObject(this),
	        isKeySet = false;
	
	    this.forEach(function (currentValue, currentKey) {
	      if (currentKey === key) {
	        isKeySet = true;
	
	        plainObject[currentKey] = (0, _is.isCrio)(currentValue) ? currentValue.setIn(restOfKeys, value) : (0, _loops.createDeeplyNestedObject)(restOfKeys, value);
	      } else {
	        plainObject[currentKey] = currentValue;
	      }
	    });
	
	    if (!isKeySet) {
	      plainObject[key] = (0, _is.isCrio)(value) ? value : (0, _loops.createDeeplyNestedObject)(restOfKeys, value);
	    }
	
	    return getSameCrioIfUnchanged(this, new this.constructor(plainObject));
	  },
	
	
	  /**
	   * return the non-crio version of the object
	   *
	   * @returns {array<*>|object}
	   */
	  thaw: function thaw() {
	    var plainObject = getPlainObject(this);
	
	    (0, _loops.forEach)(this, function (value, key) {
	      plainObject[key] = (0, _is.isCrio)(value) ? value.thaw() : value;
	    }, this, (0, _is.isObject)(plainObject));
	
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
	
	    (0, _loops.forEachArrayRight)(this, function (value) {
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
	
	    this.forEach(function (value) {
	      hashCode = value[_constants.CRIO_HASH_CODE];
	      hasHashCode = !(0, _is.isUndefined)(hashCode);
	
	      if (!newArray.includes(value) && (!hasHashCode || !hashArray.includes(hashCode))) {
	        newArray.push(value);
	
	        if (hasHashCode) {
	          hashArray.push(hashCode);
	        }
	      }
	    });
	
	    return getSameCrioIfUnchanged(this, new CrioArray(newArray));
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
	
	    (0, _loops.forEachObject)(this, this.keys(), function (value, key) {
	      if (fn.call(thisArg, value, key, _this6)) {
	        newObject[key] = value;
	      }
	    }, this.length);
	
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
	
	    (0, _loops.forEachObject)(this, this.keys(), fn, thisArg, this.length);
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
	
	    (0, _loops.forEachObject)(this, this.keys(), function (value, key) {
	      result = fn.call(thisArg, value, key, _this7);
	
	      newObject[key] = getCrioedValue(result);
	    }, this.length);
	
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
/* 65 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_65__;

/***/ },
/* 66 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)))

/***/ },
/* 67 */
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.shallowCloneArray = exports.forEachObject = exports.forEachArrayRight = exports.forEachArray = exports.forEach = exports.createDeeplyNestedObject = exports.convertToNumber = undefined;
	
	var _constants = __webpack_require__(66);
	
	var _is = __webpack_require__(69);
	
	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }
	
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
	 * forEach loop specific to arrays
	 *
	 * @param {array<*>} array
	 * @param {function} fn
	 * @param {*} thisArg
	 * @param {number} length
	 */
	var forEachArray = function forEachArray(array, fn, thisArg) {
	  var length = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : array.length;
	
	  var index = -1;
	
	  while (++index < length) {
	    fn.call(thisArg, array[index], index, array);
	  }
	};
	
	/**
	 * forEach loop specific to arrays, but in descending order
	 *
	 * @param {array<*>} array
	 * @param {function} fn
	 * @param {*} thisArg
	 * @param {number} length
	 */
	var forEachArrayRight = function forEachArrayRight(array, fn, thisArg) {
	  var length = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : array.length;
	
	  var index = length;
	
	  while (--index > -1) {
	    fn.call(thisArg, array[index], index, array);
	  }
	};
	
	/**
	 * forEach loop specific to objects
	 *
	 * @param {object} object
	 * @param {array<*>} keys
	 * @param {function} fn
	 * @param {*} thisArg
	 * @param {number} length
	 */
	var forEachObject = function forEachObject(object, keys, fn, thisArg) {
	  var length = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Object.keys(object).length;
	
	  var index = length,
	      key = void 0;
	
	  while (--index > -1) {
	    key = keys[index];
	
	    fn.call(thisArg, object[key], key, object);
	  }
	};
	
	/**
	 *
	 *
	 * @param {array<*>|object} object
	 * @param {function} fn
	 * @param {*} thisArg
	 * @param {boolean} isItemObject=false
	 */
	var forEach = function forEach(object, fn) {
	  var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : object;
	  var isItemObject = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	
	  if (isItemObject) {
	    var keys = Object.keys(object);
	
	    forEachObject(object, keys, fn, thisArg, keys.length);
	  } else {
	    forEachArray(object, fn, thisArg, object.length);
	  }
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
	
	  var isPlainItemArray = (0, _is.isNumber)(key);
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
	exports.forEach = forEach;
	exports.forEachArray = forEachArray;
	exports.forEachArrayRight = forEachArrayRight;
	exports.forEachObject = forEachObject;
	exports.shallowCloneArray = shallowCloneArray;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isUndefined = exports.isSameCrio = exports.isReactElement = exports.isObject = exports.isNumber = exports.isCrio = exports.isArray = undefined;
	
	var _constants = __webpack_require__(66);
	
	/**
	 * get the full object class name based on type passed
	 *
	 * @param {string} type
	 * @returns {string}
	 */
	var getObjectClassName = function getObjectClassName(type) {
	  return '[object ' + type + ']';
	};
	
	var ARRAY_CLASS = getObjectClassName('Array');
	var NUMBER_CLASS = getObjectClassName('Number');
	var OBJECT_CLASS = getObjectClassName('Object');
	
	/**
	 * get the object class of the object passed
	 *
	 * @param {*} object
	 * @returns {string}
	 */
	var toString = function toString(object) {
	  return Object.prototype.toString.call(object);
	};
	
	/**
	 * determine if object passed is an array
	 *
	 * @param {*} object
	 * @returns {boolean}
	 */
	var isArray = function isArray(object) {
	  return toString(object) === ARRAY_CLASS;
	};
	
	/**
	 * determine if object passed is a Crio object
	 *
	 * @param {*} object
	 * @returns {boolean}
	 */
	var isCrio = function isCrio(object) {
	  return !!object && !isUndefined(object[_constants.CRIO_HASH_CODE]);
	};
	
	/**
	 * determine if object passed is a number
	 *
	 * @param {*} object
	 * @returns {boolean}
	 */
	var isNumber = function isNumber(object) {
	  return toString(object) === NUMBER_CLASS;
	};
	
	/**
	 * determine if object passed is an object
	 *
	 * @param {*} object
	 * @returns {boolean}
	 */
	var isObject = function isObject(object) {
	  return !!object && toString(object) === OBJECT_CLASS;
	};
	
	/**
	 * determine if object is a React element
	 *
	 * @param {any} object
	 * @param {string|symbol} object.$$typeof
	 * @return {boolean}
	 */
	var isReactElement = function isReactElement(object) {
	  return isObject(object) && object.$$typeof === _constants.REACT_ELEMENT_TYPE;
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
	
	/**
	 * determine if object passed is undefined
	 *
	 * @param {*} object
	 * @returns {boolean}
	 */
	var isUndefined = function isUndefined(object) {
	  return object === void 0;
	};
	
	exports.isArray = isArray;
	exports.isCrio = isCrio;
	exports.isNumber = isNumber;
	exports.isObject = isObject;
	exports.isReactElement = isReactElement;
	exports.isSameCrio = isSameCrio;
	exports.isUndefined = isUndefined;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stringifier = __webpack_require__(71);
	
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
/* 71 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_71__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=crio.js.map