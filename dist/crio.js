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
	
	exports.__esModule = true;
	exports.CrioObject = exports.CrioArray = exports.mergeOnDeepMatch = exports.isCrio = exports.getRealValue = exports.deleteOnDeepMatch = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(2);
	
	__webpack_require__(56);
	
	__webpack_require__(59);
	
	__webpack_require__(63);
	
	var _hashIt = __webpack_require__(65);
	
	var _hashIt2 = _interopRequireDefault(_hashIt);
	
	var _utils = __webpack_require__(66);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var objectAssign = Object.assign;
	var objectEntries = Object.entries;
	var objectFreeze = Object.freeze;
	var objectKeys = Object.keys;
	var objectValues = Object.values;
	
	var ARRAY_PROTOTYPE = Array.prototype;
	var OBJECT_PROTOTYPE = Object.prototype;
	
	var IS_PRODUCTION = ("development") === 'production';
	
	/**
	 * if NODE_ENV is not production then don't freeze for
	 * performance reasons, else freeze the object
	 *
	 * @param {CrioArray|CrioObject} crio
	 * @returns {CrioArray|CrioObject}
	 */
	var freezeIfNotProduction = function freezeIfNotProduction(crio) {
	  return IS_PRODUCTION ? crio : objectFreeze(crio);
	};
	
	/**
	 * if the value is not a crio and is an array or object, convert
	 * it to crio and return it, else just return it
	 *
	 * @param {any} value
	 * @param {string} hashValue
	 * @returns {any}
	 */
	var getRealValue = function getRealValue(value, hashValue) {
	  if ((0, _utils.isCrio)(value) || (0, _utils.isReactElement)(value)) {
	    return value;
	  }
	
	  if ((0, _utils.isArray)(value)) {
	    return new CrioArray(value, hashValue);
	  }
	
	  if ((0, _utils.isObject)(value)) {
	    return new CrioObject(value, hashValue);
	  }
	
	  return value;
	};
	
	/**
	 * convenience function to get shallow clone of object
	 * based on whether its an array or object
	 *
	 * @param {CrioArray|CrioObject} object
	 * @return {array<any>|object}
	 */
	var getShallowClone = function getShallowClone(object) {
	  if ((0, _utils.isArray)(object)) {
	    return (0, _utils.shallowCloneArray)(object);
	  }
	
	  return (0, _utils.shallowCloneObject)(object);
	};
	
	/**
	 * based on the hashCode, return a new Crio if things have changed, else return the original crio
	 *
	 * @param {CrioArray|CrioObject} crio
	 * @param {array<any>|object} newObject
	 * @param {CrioArray|CrioObject} CrioConstructor
	 * @returns {CrioArray|CrioObject|array<any>|object}
	 */
	var returnCorrectObject = function returnCorrectObject(crio, newObject, CrioConstructor) {
	  var hashValue = (0, _utils.getHashIfChanged)(crio, newObject);
	
	  if (hashValue !== false) {
	    return new CrioConstructor(newObject, hashValue);
	  }
	
	  return crio;
	};
	
	/**
	 * on deep match via setIn or mergeIn, perform assignment
	 *
	 * @param {object} object
	 * @param {array<string>} keys
	 * @param {any} values
	 * @param {CrioArray|CrioObject} CrioConstructor
	 * @returns {CrioArray|CrioObject}
	 */
	var mergeOnDeepMatch = function mergeOnDeepMatch(object, keys, values, CrioConstructor) {
	  var lastIndex = keys.length - 1;
	
	  var currentObject = getShallowClone(object),
	      referenceToCurrentObject = currentObject,
	      currentValue = void 0;
	
	  (0, _utils.forEach)(keys, function (key, keyIndex) {
	    currentValue = currentObject[key];
	
	    if ((0, _utils.isCrio)(currentValue)) {
	      currentObject[key] = getShallowClone(currentValue);
	    } else {
	      currentObject[key] = {};
	    }
	
	    if (keyIndex === lastIndex) {
	      currentObject[key] = objectAssign.apply(undefined, [currentObject[key]].concat(values));
	    } else {
	      currentObject = currentObject[key];
	    }
	  });
	
	  return returnCorrectObject(object, referenceToCurrentObject, CrioConstructor);
	};
	
	/**
	 * delete key from object based on nested keys
	 *
	 * @param {CrioArray|CrioObject} object
	 * @param {array<string|number>} keys
	 * @param {CrioArray|CrioObject} CrioConstructor
	 * @return {CrioArray|CrioObject}
	 */
	var deleteOnDeepMatch = function deleteOnDeepMatch(object, keys, CrioConstructor) {
	  var length = keys.length;
	  var lastIndex = length - 1;
	
	  var currentObject = getShallowClone(object),
	      referenceToCurrentObject = currentObject,
	      currentValue = void 0;
	
	  var index = -1,
	      matchFound = false;
	
	  while (++index < length) {
	    var key = keys[index];
	
	    if (index === lastIndex) {
	      matchFound = true;
	
	      delete currentObject[key];
	    }
	
	    if ((0, _utils.isUndefined)(currentObject[key])) {
	      break;
	    }
	
	    currentValue = currentObject[key];
	
	    if ((0, _utils.isCrio)(currentValue)) {
	      currentObject[key] = getShallowClone(currentValue);
	    }
	
	    currentObject = currentObject[key];
	  }
	
	  if (matchFound) {
	    return returnCorrectObject(object, referenceToCurrentObject, CrioConstructor);
	  }
	
	  return object;
	};
	
	var CrioArray = function () {
	  function CrioArray(array, hashValue) {
	    var _this = this;
	
	    _classCallCheck(this, CrioArray);
	
	    if ((0, _utils.isCrio)(array)) {
	      return array;
	    }
	
	    (0, _utils.forEach)(array, function (item, index) {
	      _this[index] = getRealValue(item);
	    });
	
	    var hashCode = (0, _utils.isUndefined)(hashValue) ? (0, _hashIt2.default)(array) : hashValue;
	
	    (0, _utils.setNonEnumerable)(this, _utils.HASH_CODE_SYMBOL, hashCode);
	    (0, _utils.setNonEnumerable)(this, 'length', array.length);
	
	    return freezeIfNotProduction(this);
	  }
	
	  /**
	   * return type of CrioArray
	   *
	   * @return {string}
	   */
	
	
	  /**
	   * return empty CrioArray
	   * 
	   * @return {CrioArray}
	   */
	
	  CrioArray.prototype.clear = function clear() {
	    if (!this.length) {
	      return this;
	    }
	
	    return new CrioArray([]);
	  };
	
	  /**
	   * return new CrioArray with all falsy values removed
	   * 
	   * @return {CrioArray}
	   */
	
	
	  CrioArray.prototype.compact = function compact() {
	    return this.filter(function (value) {
	      return !!value;
	    });
	  };
	
	  /**
	   * based on items passed, combine with this to create new CrioArray
	   *
	   * @param {array<array>} arrays
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.concat = function concat() {
	    for (var _len = arguments.length, arrays = Array(_len), _key = 0; _key < _len; _key++) {
	      arrays[_key] = arguments[_key];
	    }
	
	    if (!arrays.length) {
	      return this;
	    }
	
	    var clone = (0, _utils.shallowCloneArray)(this);
	    var concattedArray = ARRAY_PROTOTYPE.concat.apply(clone, arrays);
	
	    return new CrioArray(concattedArray);
	  };
	
	  /**
	   * based on arguments passed, return new CrioArray with copyWithin applied
	   *
	   * @param {number} target
	   * @param {number} start=0
	   * @param {number} end=this.length
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.copyWithin = function copyWithin(target) {
	    var start = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    var end = arguments.length <= 2 || arguments[2] === undefined ? this.length : arguments[2];
	
	    if ((0, _utils.isUndefined)(target)) {
	      return this;
	    }
	
	    var replacements = ARRAY_PROTOTYPE.slice.call(this, start, end).filter(function () {
	      return true;
	    });
	
	    return this.splice.apply(this, [target, replacements.length].concat(replacements));
	  };
	
	  /**
	   * remove item from the array
	   *
	   * @param {number} key
	   * @return {CrioArray}
	   */
	
	
	  CrioArray.prototype.delete = function _delete(key) {
	    if (!this.has(key)) {
	      return this;
	    }
	
	    var index = +key;
	
	    var clone = [];
	
	    (0, _utils.forEach)(this, function (item, itemIndex) {
	      if (itemIndex !== index) {
	        clone.push(item);
	      }
	    });
	
	    return new CrioArray(clone);
	  };
	
	  /**
	   * delete deeply-nested key in this based on keys passed
	   *
	   * @param {array<string|number>} keys
	   * @return {CrioObject}
	   */
	
	
	  CrioArray.prototype.deleteIn = function deleteIn(keys) {
	    if (!(0, _utils.isArray)(keys)) {
	      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
	    }
	
	    if (!keys.length) {
	      return this;
	    }
	
	    return deleteOnDeepMatch(this, keys, CrioArray);
	  };
	
	  /**
	   * returns an oterable array of [index, value] pairs
	   *
	   * @returns {array<array>}
	   */
	
	
	  CrioArray.prototype.entries = function entries() {
	    var _this2 = this;
	
	    var entries = objectEntries(this);
	
	    var index = 0,
	        key = void 0,
	        value = void 0;
	
	    entries.next = function () {
	      key = index;
	      value = _this2[index];
	
	      if (index < _this2.length) {
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
	    };
	
	    return entries;
	  };
	
	  /**
	   * is the object passed equal in value to this
	   *
	   * @param {any} object
	   * @returns {boolean}
	   */
	
	
	  CrioArray.prototype.equals = function equals(object) {
	    if (!(0, _utils.isCrio)(object)) {
	      return false;
	    }
	
	    return this[_utils.HASH_CODE_SYMBOL] === object[_utils.HASH_CODE_SYMBOL];
	  };
	
	  /**
	   * does the function applied to every value in this return truthy
	   *
	   * @param {function} fn
	   * @param {any} thisArg
	   * @returns {boolean}
	   */
	
	
	  CrioArray.prototype.every = function every(fn) {
	    var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];
	
	    return ARRAY_PROTOTYPE.every.call(this, fn, thisArg);
	  };
	
	  /**
	   * fill this based on arguments and return new CrioArray
	   *
	   * @param {any} value
	   * @param {number} start=0
	   * @param {number} end=this.length
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.fill = function fill(value) {
	    var start = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    var end = arguments.length <= 2 || arguments[2] === undefined ? this.length : arguments[2];
	
	    var filledArray = ARRAY_PROTOTYPE.map.call(this, function (currentValue, index) {
	      if (index >= start && index < end) {
	        return value;
	      }
	
	      return currentValue;
	    });
	
	    return returnCorrectObject(this, filledArray, CrioArray);
	  };
	
	  /**
	   * based on return values of fn being truthy, return a new reduced CrioArray
	   * from this
	   *
	   * @param {function} fn
	   * @param {any} thisArg
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.filter = function filter(fn) {
	    var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];
	
	    var filteredArray = ARRAY_PROTOTYPE.filter.call(this, fn, thisArg);
	
	    return returnCorrectObject(this, filteredArray, CrioArray);
	  };
	
	  /**
	   * find a specific value in the CrioArray and return it, else return undefined
	   *
	   * @param {function} fn
	   * @param {any} thisArg
	   * @returns {any}
	   */
	
	
	  CrioArray.prototype.find = function find(fn) {
	    var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];
	
	    var index = -1,
	        value = void 0;
	
	    while (++index < this.length) {
	      value = this[index];
	
	      if (fn.call(this, value, index, thisArg)) {
	        return value;
	      }
	    }
	
	    return undefined;
	  };
	
	  /**
	   * find a specific value in the CrioArray and return its index, else return -1
	   *
	   * @param {function} fn
	   * @param {any} thisArg
	   * @returns {number}
	   */
	
	
	  CrioArray.prototype.findIndex = function findIndex(fn) {
	    var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];
	
	    var index = -1;
	
	    while (++index < this.length) {
	      if (fn.call(this, this[index], index, thisArg)) {
	        return index;
	      }
	    }
	
	    return -1;
	  };
	
	  /**
	   * get the first n number of values from the array
	   *
	   * @param {number} num=1
	   * @return {CrioArray}
	   */
	
	
	  CrioArray.prototype.first = function first() {
	    var num = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	
	    if (num === this.length) {
	      return this;
	    }
	
	    return this.slice(0, num);
	  };
	
	  /**
	   * iterate over this and execute fn for each value
	   *
	   * @param {function} fn
	   * @param {any} thisArg
	   */
	
	
	  CrioArray.prototype.forEach = function forEach(fn) {
	    var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];
	
	    ARRAY_PROTOTYPE.forEach.call(this, fn, thisArg);
	  };
	
	  /**
	   * retrieve the value at index from this
	   *
	   * @param {number} index
	   * @returns {any}
	   */
	
	
	  CrioArray.prototype.get = function get(index) {
	    return this[index];
	  };
	
	  /**
	   * return value at nested point based on keys in this
	   *
	   * @param {array<string|number>} keys
	   * @return {any}
	   */
	
	
	  CrioArray.prototype.getIn = function getIn(keys) {
	    if (!(0, _utils.isArray)(keys)) {
	      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
	    }
	
	    var length = keys.length;
	    var lastIndex = length - 1;
	
	    var currentObject = this,
	        index = -1,
	        key = void 0;
	
	    while (++index < length) {
	      key = keys[index];
	
	      if ((0, _utils.isUndefined)(currentObject[key]) || index === lastIndex) {
	        return currentObject[key];
	      }
	
	      currentObject = currentObject[key];
	    }
	  };
	
	  /**
	   * does the key passed exist in this
	   *
	   * @param {number} key
	   * @return {boolean}
	   */
	
	  CrioArray.prototype.has = function has(key) {
	    return OBJECT_PROTOTYPE.hasOwnProperty.call(this, key);
	  };
	
	  /**
	   * does this have a value of item contained in it
	   *
	   * @param {any} item
	   * @returns {boolean}
	   */
	
	
	  CrioArray.prototype.includes = function includes(item) {
	    return !!~this.indexOf(item);
	  };
	
	  /**
	   * what is the index of item in this (if not found, defaults to -1)
	   *
	   * @param {any} item
	   * @returns {number}
	   */
	
	
	  CrioArray.prototype.indexOf = function indexOf(item) {
	    return ARRAY_PROTOTYPE.indexOf.call(this, item);
	  };
	
	  /**
	   * joins this into string based on separator delimiting between values
	   *
	   * @param {string} separator
	   * @returns {string}
	   */
	
	
	  CrioArray.prototype.join = function join() {
	    var separator = arguments.length <= 0 || arguments[0] === undefined ? ',' : arguments[0];
	
	    return ARRAY_PROTOTYPE.join.call(this, separator);
	  };
	
	  /**
	   * returns keys of array (list of indices)
	   *
	   * @returns {array<string>}
	   */
	
	
	  CrioArray.prototype.keys = function keys() {
	    return objectKeys(this);
	  };
	
	  /**
	   * returns the last n number of items in the array
	   *
	   * @param {number} num=1
	   * @return {CrioArray}
	   */
	
	
	  CrioArray.prototype.last = function last() {
	    var num = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	
	    if (num === this.length) {
	      return this;
	    }
	
	    return this.slice(this.length - num, this.length);
	  };
	
	  /**
	   * last index of item in this
	   *
	   * @param {any} item
	   * @returns {number}
	   */
	
	
	  CrioArray.prototype.lastIndexOf = function lastIndexOf(item) {
	    return ARRAY_PROTOTYPE.lastIndexOf.call(this, item);
	  };
	
	  /**
	   * iterate over this and assign values returned from calling
	   * fn to a new CrioArray
	   *
	   * @param {function} fn
	   * @param {any} thisArg
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.map = function map(fn) {
	    var _this3 = this;
	
	    var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];
	
	    var mappedArray = new Array(this.length);
	
	    (0, _utils.forEach)(this, function (item, index) {
	      mappedArray[index] = fn.call(thisArg, _this3[index], index, _this3);
	    });
	
	    return returnCorrectObject(this, mappedArray, CrioArray);
	  };
	
	  /**
	   * shallowly merge each object into this
	   *
	   * @param {array<any>} objects
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.merge = function merge() {
	    var clone = (0, _utils.shallowCloneArray)(this);
	
	    for (var _len2 = arguments.length, objects = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      objects[_key2] = arguments[_key2];
	    }
	
	    (0, _utils.forEach)(objects, function (object) {
	      clone = clone.map(function (key, keyIndex) {
	        return object[keyIndex] || clone[keyIndex];
	      });
	    });
	
	    return returnCorrectObject(this, clone, CrioArray);
	  };
	
	  /**
	   * deeply merge all objects into location specified by keys
	   *
	   * @param {array<string|number>} keys
	   * @param {array<any>} objects
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.mergeIn = function mergeIn(keys) {
	    if (!(0, _utils.isArray)(keys)) {
	      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
	    }
	
	    for (var _len3 = arguments.length, objects = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      objects[_key3 - 1] = arguments[_key3];
	    }
	
	    if (!objects.length) {
	      return this;
	    }
	
	    return mergeOnDeepMatch(this, keys, objects, CrioArray);
	  };
	
	  /**
	   * convenience function to work with mutable version of this,
	   * in case many modifications need to be made and performance
	   * is paramount
	   *
	   * @param {function} fn
	   * @returns {any}
	   */
	
	
	  CrioArray.prototype.mutate = function mutate(fn) {
	    var result = fn.call(this, this.thaw(), this);
	    var hashValue = (0, _utils.getHashIfChanged)(this, result);
	
	    if (hashValue !== false) {
	      return getRealValue(result, hashValue);
	    }
	
	    return this;
	  };
	
	  /**
	   * return new CrioArray of values in collection for the property specified
	   * 
	   * @param {string} property
	   * @return {CrioArray}
	   */
	
	
	  CrioArray.prototype.pluck = function pluck(property) {
	    return this.map(function (item) {
	      if (!item) {
	        return undefined;
	      }
	
	      return item[property];
	    });
	  };
	
	  /**
	   * return array with last item removed
	   *
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.pop = function pop() {
	    return this.slice(0, this.length - 1);
	  };
	
	  /**
	   * return new CrioArray with items pushed to it
	   *
	   * @param {array<any>} items
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.push = function push() {
	    for (var _len4 = arguments.length, items = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	      items[_key4] = arguments[_key4];
	    }
	
	    return this.concat(items);
	  };
	
	  /**
	   * based on fn, reduce the CrioArray and return either the crio of the reduced object
	   * or the object itself
	   *
	   * @param {function} fn
	   * @param {any} object
	   * @param {any} thisArg
	   * @returns {any}
	   */
	
	
	  CrioArray.prototype.reduce = function reduce(fn, object) {
	    var thisArg = arguments.length <= 2 || arguments[2] === undefined ? this : arguments[2];
	
	    var reduction = ARRAY_PROTOTYPE.reduce.call(this, fn, object, thisArg);
	    var hashValue = (0, _utils.getHashIfChanged)(this, reduction);
	
	    if (hashValue !== false) {
	      return getRealValue(reduction, hashValue);
	    }
	
	    return this;
	  };
	
	  /**
	   * based on fn, reduceRight the CrioArray and return either the crio of the reduced object
	   * or the object itself
	   *
	   * @param {function} fn
	   * @param {any} object
	   * @param {any} thisArg
	   * @returns {any}
	   */
	
	
	  CrioArray.prototype.reduceRight = function reduceRight(fn, object) {
	    var thisArg = arguments.length <= 2 || arguments[2] === undefined ? this : arguments[2];
	
	    var reduction = ARRAY_PROTOTYPE.reduceRight.call(this, fn, object, thisArg);
	    var hashValue = (0, _utils.getHashIfChanged)(this, reduction);
	
	    if (hashValue !== false) {
	      return getRealValue(reduction, hashValue);
	    }
	
	    return this;
	  };
	
	  /**
	   * reverse the order of elements in the CrioArray
	   *
	   * @return {CrioArray}
	   */
	
	
	  CrioArray.prototype.reverse = function reverse() {
	    var clone = [];
	
	    (0, _utils.forEachRight)(this, function (value) {
	      clone.push(value);
	    });
	
	    return returnCorrectObject(this, clone, CrioArray);
	  };
	
	  /**
	   * set key to value in this and return new CrioArray
	   *
	   * @param {number} key
	   * @param {any} value
	   *
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.set = function set(key, value) {
	    var index = +key;
	
	    if (index > this.length) {
	      throw new Error('Cannot set a key for sparsed array on crio objects.');
	    }
	
	    var clone = [];
	
	    (0, _utils.forEach)(this, function (item, itemIndex) {
	      clone.push(index === itemIndex ? value : item);
	    });
	
	    return returnCorrectObject(this, clone, CrioArray);
	  };
	
	  /**
	   * deeply assign value to key in this and return new CrioArray
	   *
	   * @param {array<string|number>} keys
	   * @param {any} value
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.setIn = function setIn(keys, value) {
	    if (!(0, _utils.isArray)(keys)) {
	      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
	    }
	
	    var lastIndex = keys.length - 1;
	
	    var currentObject = (0, _utils.shallowCloneArray)(this),
	        referenceToCurrentObject = currentObject,
	        currentValue = void 0;
	
	    (0, _utils.forEach)(keys, function (key, keyIndex) {
	      if (keyIndex === lastIndex) {
	        currentObject[key] = value;
	      } else {
	        currentValue = currentObject[key];
	        currentObject[key] = (0, _utils.isCrio)(currentValue) ? getShallowClone(currentValue) : {};
	        currentObject = currentObject[key];
	      }
	    });
	
	    return returnCorrectObject(this, referenceToCurrentObject, CrioArray);
	  };
	
	  /**
	   * return this with first item removed as new CrioArray
	   *
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.shift = function shift() {
	    return this.slice(1, this.length);
	  };
	
	  /**
	   * return a section of this as a new CrioArray
	   *
	   * @param {array<number>} args
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.slice = function slice() {
	    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	      args[_key5] = arguments[_key5];
	    }
	
	    if (!args.length) {
	      return this;
	    }
	
	    return new CrioArray(ARRAY_PROTOTYPE.slice.apply(this, args));
	  };
	
	  /**
	   * does some of the returns from fn return truthy
	   *
	   * @param {function} fn
	   * @param {any} thisArg
	   * @returns {boolean}
	   */
	
	  CrioArray.prototype.some = function some(fn) {
	    var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];
	
	    return ARRAY_PROTOTYPE.some.call(this, fn, thisArg);
	  };
	
	  /**
	   * sort this and return it as a new CrioArray
	   *
	   * @param {function} fn
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.sort = function sort(fn) {
	    var clone = (0, _utils.shallowCloneArray)(this);
	    var sortedArray = ARRAY_PROTOTYPE.sort.call(clone, fn);
	
	    return returnCorrectObject(this, sortedArray, CrioArray);
	  };
	
	  /**
	   * based on args passed, splice this and return it as a new CrioArray
	   *
	   * @param {any} args
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.splice = function splice() {
	    var clone = (0, _utils.shallowCloneArray)(this);
	
	    clone.splice.apply(clone, arguments);
	
	    return returnCorrectObject(this, clone, CrioArray);
	  };
	
	  /**
	   * convert this back to a vanilla array
	   *
	   * @returns {array<any>}
	   */
	
	
	  CrioArray.prototype.thaw = function thaw() {
	    var array = [];
	
	    (0, _utils.forEach)(this, function (item, index) {
	      array[index] = (0, _utils.isCrio)(item) ? item.thaw() : item;
	    });
	
	    return array;
	  };
	
	  /**
	   * convert this to a locale-specific string
	   *
	   * @returns {string}
	   */
	
	
	  CrioArray.prototype.toLocaleString = function toLocaleString() {
	    return (0, _utils.stringify)(this);
	  };
	
	  /**
	   * convert this to an object of index: value pairs
	   *
	   * @return {CrioObject}
	   */
	
	
	  CrioArray.prototype.toObject = function toObject() {
	    return new CrioObject((0, _utils.shallowCloneObject)(this));
	  };
	
	  /**
	   * convert this to a string showing key: value pair combos
	   *
	   * @returns {string}
	   */
	
	
	  CrioArray.prototype.toString = function toString() {
	    return (0, _utils.stringify)(this);
	  };
	
	  /**
	   * get the unique values in the array and return new CrioArray of them
	   *
	   * @return {CrioArray}
	   */
	
	
	  CrioArray.prototype.unique = function unique() {
	    var valuesArray = [],
	        exists = false;
	
	    return this.filter(function (item) {
	      exists = !!~valuesArray.indexOf(item);
	
	      if (!exists) {
	        valuesArray.push(item);
	      }
	
	      return !exists;
	    });
	  };
	
	  /**
	   * add items to the beginning of this and return it as a new CrioArray
	   *
	   * @param {array<any>} items
	   * @returns {CrioArray}
	   */
	
	
	  CrioArray.prototype.unshift = function unshift() {
	    for (var _len6 = arguments.length, items = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	      items[_key6] = arguments[_key6];
	    }
	
	    if (!items.length) {
	      return this;
	    }
	
	    (0, _utils.forEach)(this, function (item) {
	      items.push(item);
	    });
	
	    return new CrioArray(items);
	  };
	
	  /**
	   * get the iterable array of values for this
	   *
	   * @returns {array<any>}
	   */
	
	
	  CrioArray.prototype.values = function values() {
	    return objectValues(this);
	  };
	
	  /**
	   * make CrioArray into an iterable
	   *
	   * @returns {{next: (function(): {value: any, done: boolean})}}
	   */
	
	
	  CrioArray.prototype[Symbol.iterator] = function () {
	    var _this4 = this;
	
	    var index = 0;
	
	    return {
	      next: function next() {
	        var key = index;
	        var value = _this4[index];
	
	        if (index < _this4.length) {
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
	  };
	
	  _createClass(CrioArray, [{
	    key: _utils.TYPE_SYMBOL,
	    get: function get() {
	      return _utils.CRIO_ARRAY_TYPE;
	    }
	  }]);
	
	  return CrioArray;
	}();
	
	var CrioObject = function () {
	  function CrioObject(object, hashValue) {
	    var _this5 = this;
	
	    _classCallCheck(this, CrioObject);
	
	    if ((0, _utils.isCrio)(object) || (0, _utils.isReactElement)(object)) {
	      return object;
	    }
	
	    var keys = objectKeys(object);
	
	    var length = 0;
	
	    (0, _utils.forEachRight)(keys, function (key) {
	      _this5[key] = getRealValue(object[key]);
	
	      length++;
	    });
	
	    var hashCode = (0, _utils.isUndefined)(hashValue) ? (0, _hashIt2.default)(object) : hashValue;
	
	    (0, _utils.setNonEnumerable)(this, _utils.HASH_CODE_SYMBOL, hashCode);
	    (0, _utils.setNonEnumerable)(this, 'length', length);
	
	    return freezeIfNotProduction(this);
	  }
	
	  /**
	   * return type of CrioObject
	   *
	   * @return {string}
	   */
	
	
	  /**
	   * return empty CrioObject
	   * 
	   * @return {CrioObject}
	   */
	
	  CrioObject.prototype.clear = function clear() {
	    if (!this.length) {
	      return this;
	    }
	
	    return new CrioObject({});
	  };
	
	  /**
	   * remove key from this
	   *
	   * @param {string} key
	   * @return {CrioObject}
	   */
	
	
	  CrioObject.prototype.delete = function _delete(key) {
	    var _this6 = this;
	
	    if (!this.hasOwnProperty(key)) {
	      return this;
	    }
	
	    var clone = {};
	
	    (0, _utils.forEachRight)(this.keys(), function (itemKey) {
	      if (itemKey !== key) {
	        clone[itemKey] = _this6[itemKey];
	      }
	    });
	
	    return new CrioObject(clone);
	  };
	
	  /**
	   * delete deeply-nested key in this based on keys passed
	   *
	   * @param {array<string>} keys
	   * @return {CrioObject}
	   */
	
	
	  CrioObject.prototype.deleteIn = function deleteIn(keys) {
	    if (!(0, _utils.isArray)(keys)) {
	      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
	    }
	
	    if (!keys.length) {
	      return this;
	    }
	
	    return deleteOnDeepMatch(this, keys, CrioObject);
	  };
	
	  /**
	   * return iterable array of keys in this
	   *
	   * @returns {array<string>}
	   */
	
	
	  CrioObject.prototype.entries = function entries() {
	    var _this7 = this;
	
	    var keys = objectKeys(this);
	    var entries = objectEntries(this);
	
	    var index = 0,
	        key = void 0,
	        value = void 0;
	
	    entries.next = function () {
	      key = keys[index];
	      value = _this7[key];
	
	      if (index < _this7.length) {
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
	    };
	
	    return entries;
	  };
	
	  /**
	   * is the object passed equal in value to this
	   *
	   * @param {any} object
	   * @returns {boolean}
	   */
	
	
	  CrioObject.prototype.equals = function equals(object) {
	    if (!(0, _utils.isCrio)(object)) {
	      return false;
	    }
	
	    return this[_utils.HASH_CODE_SYMBOL] === object[_utils.HASH_CODE_SYMBOL];
	  };
	
	  /**
	   * return value at key in this
	   *
	   * @param {string} key
	   * @returns {any}
	   */
	
	
	  CrioObject.prototype.get = function get(key) {
	    return this[key];
	  };
	
	  /**
	   * return value at nested point based on keys in this
	   *
	   * @param {array<string|number>} keys
	   * @return {any}
	   */
	
	
	  CrioObject.prototype.getIn = function getIn(keys) {
	    if (!(0, _utils.isArray)(keys)) {
	      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
	    }
	
	    var length = keys.length;
	    var lastIndex = length - 1;
	
	    var currentObject = this,
	        index = -1,
	        key = void 0;
	
	    while (++index < length) {
	      key = keys[index];
	
	      if ((0, _utils.isUndefined)(currentObject[key]) || index === lastIndex) {
	        return currentObject[key];
	      }
	
	      currentObject = currentObject[key];
	    }
	  };
	
	  /**
	   * does the key passed exist in this
	   *
	   * @param {number} key
	   * @return {boolean}
	   */
	
	  CrioObject.prototype.has = function has(key) {
	    return this.hasOwnProperty(key);
	  };
	
	  /**
	   * return if this has the property passed
	   *
	   * @param {string} property
	   * @returns {boolean}
	   */
	
	
	  CrioObject.prototype.hasOwnProperty = function hasOwnProperty(property) {
	    return OBJECT_PROTOTYPE.hasOwnProperty.call(this, property);
	  };
	
	  /**
	   * return if this has the prototype of object passed
	   *
	   * @param {any} object
	   * @returns {boolean}
	   */
	
	
	  CrioObject.prototype.isPrototypeOf = function isPrototypeOf(object) {
	    return OBJECT_PROTOTYPE.isPrototypeOf.call(this, object);
	  };
	
	  /**
	   * iterate over object and filter any returns from functions
	   * that are falsy
	   * 
	   * @param {function} fn
	   * @param {any} thisArg
	   * @return {CrioObject}
	   */
	
	
	  CrioObject.prototype.filter = function filter(fn) {
	    var _this8 = this;
	
	    var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];
	
	    var newObject = {},
	        result = void 0;
	
	    (0, _utils.forEach)(this.keys(), function (key) {
	      result = fn.call(thisArg, _this8[key], key, _this8);
	
	      if (!!result) {
	        newObject[key] = _this8[key];
	      }
	    });
	
	    return returnCorrectObject(this, newObject, CrioObject);
	  };
	
	  /**
	   * iterate over object executing fn
	   *
	   * @param {function} fn
	   * @param {any} thisArg
	   * @returns {CrioObject}
	   */
	
	
	  CrioObject.prototype.forEach = function forEach(fn) {
	    var _this9 = this;
	
	    var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];
	
	    (0, _utils.forEach)(this.keys(), function (key) {
	      fn.call(thisArg, _this9[key], key, _this9);
	    });
	
	    return this;
	  };
	
	  /**
	   * return iterable of keys in this
	   *
	   * @returns {array<string>}
	   */
	
	
	  CrioObject.prototype.keys = function keys() {
	    return objectKeys(this);
	  };
	
	  /**
	   * map results of function to new object and return it
	   * 
	   * @param {function} fn
	   * @param {any} thisArg
	   * @return {CrioObject}
	   */
	
	
	  CrioObject.prototype.map = function map(fn) {
	    var _this10 = this;
	
	    var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];
	
	    var newObject = {};
	
	    (0, _utils.forEach)(this.keys(), function (key) {
	      newObject[key] = fn.call(thisArg, _this10[key], key, _this10);
	    });
	
	    return returnCorrectObject(this, newObject, CrioObject);
	  };
	
	  /**
	   * shallowly merge all objects into this and return as new CrioObject
	   *
	   * @param {array<any>} objects
	   * @returns {CrioObject}
	   */
	
	
	  CrioObject.prototype.merge = function merge() {
	    var clone = (0, _utils.shallowCloneObject)(this);
	
	    for (var _len7 = arguments.length, objects = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	      objects[_key7] = arguments[_key7];
	    }
	
	    (0, _utils.forEach)(objects, function (object) {
	      objectAssign(clone, object);
	    });
	
	    return returnCorrectObject(this, clone, CrioObject);
	  };
	
	  /**
	   * deeply merge all objects into this at key value determined by keys,
	   * and return as a new CrioObject
	   *
	   * @param {array<string|number>} keys
	   * @param {array<any>} objects
	   * @returns {CrioObject}
	   */
	
	
	  CrioObject.prototype.mergeIn = function mergeIn(keys) {
	    if (!(0, _utils.isArray)(keys)) {
	      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
	    }
	
	    for (var _len8 = arguments.length, objects = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
	      objects[_key8 - 1] = arguments[_key8];
	    }
	
	    if (!objects.length) {
	      return this;
	    }
	
	    return mergeOnDeepMatch(this, keys, objects, CrioObject);
	  };
	
	  /**
	   * convenience function to work with mutable version of this,
	   * in case many modifications need to be made and performance
	   * is paramount
	   *
	   * @param {function} fn
	   * @returns {any}
	   */
	
	
	  CrioObject.prototype.mutate = function mutate(fn) {
	    var result = fn.call(this, this.thaw(), this);
	    var hashValue = (0, _utils.getHashIfChanged)(this, result);
	
	    if (hashValue !== false) {
	      return getRealValue(result, hashValue);
	    }
	
	    return this;
	  };
	
	  /**
	   * determine if property passed is enumerable in this
	   *
	   * @param {string} property
	   * @returns {boolean}
	   */
	
	
	  CrioObject.prototype.propertyIsEnumerable = function propertyIsEnumerable(property) {
	    return OBJECT_PROTOTYPE.propertyIsEnumerable.call(this, property);
	  };
	
	  /**
	   * set value at key in this
	   *
	   * @param {string} key
	   * @param {any} value
	   * @returns {CrioObject}
	   */
	
	
	  CrioObject.prototype.set = function set(key, value) {
	    var _this11 = this;
	
	    var clone = {};
	
	    (0, _utils.forEachRight)(this.keys(), function (currentKey) {
	      if (currentKey !== key) {
	        clone[currentKey] = _this11[currentKey];
	      }
	    });
	
	    clone[key] = value;
	
	    return returnCorrectObject(this, clone, CrioObject);
	  };
	
	  /**
	   * deeply set value at location determined by keys in this
	   *
	   * @param {array<string|number>} keys
	   * @param {any} value
	   * @returns {CrioObject}
	   */
	
	
	  CrioObject.prototype.setIn = function setIn(keys, value) {
	    if (!(0, _utils.isArray)(keys)) {
	      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
	    }
	
	    var lastIndex = keys.length - 1;
	
	    var currentObject = (0, _utils.shallowCloneObject)(this),
	        referenceToCurrentObject = currentObject,
	        currentValue = void 0;
	
	    (0, _utils.forEach)(keys, function (key, keyIndex) {
	      if (keyIndex === lastIndex) {
	        currentObject[key] = value;
	      } else {
	        currentValue = currentObject[key];
	        currentObject[key] = (0, _utils.isCrio)(currentValue) ? getShallowClone(currentValue) : {};
	        currentObject = currentObject[key];
	      }
	    });
	
	    return returnCorrectObject(this, referenceToCurrentObject, CrioObject);
	  };
	
	  /**
	   * convert this back to a vanilla array
	   *
	   * @returns {array<any>}
	   */
	
	
	  CrioObject.prototype.thaw = function thaw() {
	    var _this12 = this;
	
	    var propertyNames = objectKeys(this);
	
	    var object = {};
	
	    (0, _utils.forEachRight)(propertyNames, function (key) {
	      var value = _this12[key];
	      var cleanValue = (0, _utils.isCrio)(value) ? value.thaw() : value;
	
	      (0, _utils.setStandard)(object, key, cleanValue, _this12.propertyIsEnumerable(key));
	    });
	
	    return object;
	  };
	
	  /**
	   * convert the values in the object to an array
	   *
	   * @return {CrioArray}
	   */
	
	
	  CrioObject.prototype.toArray = function toArray() {
	    return new CrioArray(this.values());
	  };
	
	  /**
	   * convert this to a locale-specific string
	   *
	   * @returns {string}
	   */
	
	
	  CrioObject.prototype.toLocaleString = function toLocaleString() {
	    return (0, _utils.stringify)(this);
	  };
	
	  /**
	   * convert this to a string showing key: value pair combos
	   *
	   * @returns {string}
	   */
	
	
	  CrioObject.prototype.toString = function toString() {
	    return (0, _utils.stringify)(this);
	  };
	
	  /**
	   * get the valueOf for this
	   *
	   * @return {any}
	   */
	
	
	  CrioObject.prototype.valueOf = function valueOf() {
	    return OBJECT_PROTOTYPE.valueOf.call(this);
	  };
	
	  /**
	   * get the iterable array of values for this
	   *
	   * @returns {array<any>}
	   */
	
	
	  CrioObject.prototype.values = function values() {
	    return objectValues(this);
	  };
	
	  /**
	   * make CrioObject into an iterable
	   *
	   * @returns {{next: (function(): {value: any, done: boolean})}}
	   */
	
	
	  CrioObject.prototype[Symbol.iterator] = function () {
	    var _this13 = this;
	
	    var keys = objectKeys(this);
	
	    var index = 0,
	        key = void 0,
	        value = void 0;
	
	    return {
	      next: function next() {
	        key = keys[index];
	        value = _this13[key];
	
	        if (index < _this13.length) {
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
	  };
	
	  _createClass(CrioObject, [{
	    key: _utils.TYPE_SYMBOL,
	    get: function get() {
	      return _utils.CRIO_OBJECT_TYPE;
	    }
	  }]);
	
	  return CrioObject;
	}();
	
	/**
	 * entry function, assigning to either CrioArray or CrioObject or neither
	 *
	 * @param {any} object={}
	 * @return {any}
	 */
	
	
	var crio = function crio() {
	  var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  if ((0, _utils.isArray)(object)) {
	    return new CrioArray(object);
	  }
	
	  if ((0, _utils.isObject)(object)) {
	    return new CrioObject(object);
	  }
	
	  return object;
	};
	
	exports.deleteOnDeepMatch = deleteOnDeepMatch;
	exports.getRealValue = getRealValue;
	exports.isCrio = _utils.isCrio;
	exports.mergeOnDeepMatch = mergeOnDeepMatch;
	exports.CrioArray = CrioArray;
	exports.CrioObject = CrioObject;
	exports.default = crio;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(52);
	__webpack_require__(54);
	__webpack_require__(55);
	module.exports = __webpack_require__(9).Symbol;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(4)
	  , has            = __webpack_require__(5)
	  , DESCRIPTORS    = __webpack_require__(6)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(18)
	  , META           = __webpack_require__(22).KEY
	  , $fails         = __webpack_require__(7)
	  , shared         = __webpack_require__(23)
	  , setToStringTag = __webpack_require__(24)
	  , uid            = __webpack_require__(19)
	  , wks            = __webpack_require__(25)
	  , wksExt         = __webpack_require__(26)
	  , wksDefine      = __webpack_require__(27)
	  , keyOf          = __webpack_require__(29)
	  , enumKeys       = __webpack_require__(42)
	  , isArray        = __webpack_require__(45)
	  , anObject       = __webpack_require__(12)
	  , toIObject      = __webpack_require__(32)
	  , toPrimitive    = __webpack_require__(16)
	  , createDesc     = __webpack_require__(17)
	  , _create        = __webpack_require__(46)
	  , gOPNExt        = __webpack_require__(49)
	  , $GOPD          = __webpack_require__(51)
	  , $DP            = __webpack_require__(11)
	  , $keys          = __webpack_require__(30)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
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
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(50).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(44).f  = $propertyIsEnumerable;
	  __webpack_require__(43).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(28)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
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
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
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
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

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

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(7)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , core      = __webpack_require__(9)
	  , hide      = __webpack_require__(10)
	  , redefine  = __webpack_require__(18)
	  , ctx       = __webpack_require__(20)
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
/* 9 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(11)
	  , createDesc = __webpack_require__(17);
	module.exports = __webpack_require__(6) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(12)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , toPrimitive    = __webpack_require__(16)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(6) && !__webpack_require__(7)(function(){
	  return Object.defineProperty(__webpack_require__(15)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13)
	  , document = __webpack_require__(4).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(13);
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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , hide      = __webpack_require__(10)
	  , has       = __webpack_require__(5)
	  , SRC       = __webpack_require__(19)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(9).inspectSource = function(it){
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
/* 19 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(21);
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
/* 21 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(19)('meta')
	  , isObject = __webpack_require__(13)
	  , has      = __webpack_require__(5)
	  , setDesc  = __webpack_require__(11).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(7)(function(){
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).f
	  , has = __webpack_require__(5)
	  , TAG = __webpack_require__(25)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(23)('wks')
	  , uid        = __webpack_require__(19)
	  , Symbol     = __webpack_require__(4).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(25);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(4)
	  , core           = __webpack_require__(9)
	  , LIBRARY        = __webpack_require__(28)
	  , wksExt         = __webpack_require__(26)
	  , defineProperty = __webpack_require__(11).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(30)
	  , toIObject = __webpack_require__(32);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(31)
	  , enumBugKeys = __webpack_require__(41);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(5)
	  , toIObject    = __webpack_require__(32)
	  , arrayIndexOf = __webpack_require__(36)(false)
	  , IE_PROTO     = __webpack_require__(40)('IE_PROTO');
	
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(33)
	  , defined = __webpack_require__(35);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(34);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(32)
	  , toLength  = __webpack_require__(37)
	  , toIndex   = __webpack_require__(39);
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(38)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(23)('keys')
	  , uid    = __webpack_require__(19);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(30)
	  , gOPS    = __webpack_require__(43)
	  , pIE     = __webpack_require__(44);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 44 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(34);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(12)
	  , dPs         = __webpack_require__(47)
	  , enumBugKeys = __webpack_require__(41)
	  , IE_PROTO    = __webpack_require__(40)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(15)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(48).appendChild(iframe);
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(11)
	  , anObject = __webpack_require__(12)
	  , getKeys  = __webpack_require__(30);
	
	module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4).document && document.documentElement;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(32)
	  , gOPN      = __webpack_require__(50).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(31)
	  , hiddenKeys = __webpack_require__(41).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(44)
	  , createDesc     = __webpack_require__(17)
	  , toIObject      = __webpack_require__(32)
	  , toPrimitive    = __webpack_require__(16)
	  , has            = __webpack_require__(5)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(53)
	  , test    = {};
	test[__webpack_require__(25)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(18)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(34)
	  , TAG = __webpack_require__(25)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(27)('asyncIterator');

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(27)('observable');

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(57);
	module.exports = __webpack_require__(9).Object.entries;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(8)
	  , $entries = __webpack_require__(58)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(30)
	  , toIObject = __webpack_require__(32)
	  , isEnum    = __webpack_require__(44).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(60);
	module.exports = __webpack_require__(9).Object.keys;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(61)
	  , $keys    = __webpack_require__(30);
	
	__webpack_require__(62)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(35);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(8)
	  , core    = __webpack_require__(9)
	  , fails   = __webpack_require__(7);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	module.exports = __webpack_require__(9).Object.values;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(8)
	  , $values = __webpack_require__(58)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = undefined;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.stringifySerializerForHash = exports.stringify = exports.shallowCloneObject = exports.shallowCloneArray = exports.setStandard = exports.setNonEnumerable = exports.isUndefined = exports.isObject = exports.isReactElement = exports.isCrio = exports.isArray = exports.getHashIfChanged = exports.forEachRight = exports.forEach = exports.TYPE_SYMBOL = exports.HASH_CODE_SYMBOL = exports.CRIO_OBJECT_TYPE = exports.CRIO_ARRAY_TYPE = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _stringifier = __webpack_require__(67);
	
	var _stringifier2 = _interopRequireDefault(_stringifier);
	
	var _hashIt = __webpack_require__(65);
	
	var _hashIt2 = _interopRequireDefault(_hashIt);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CRIO_ARRAY_TYPE = 'CrioArray';
	var CRIO_OBJECT_TYPE = 'CrioObject';
	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;
	
	var STRINGIFIER_OPTIONS = {
	  maxDepth: 10,
	  indent: '  '
	};
	
	var stringify = (0, _stringifier2.default)(STRINGIFIER_OPTIONS);
	
	var ARRAY_TYPE = '[object Array]';
	var OBJECT_TYPE = '[object Object]';
	
	var HASH_CODE_SYMBOL = Symbol('hashCode');
	var TYPE_SYMBOL = Symbol('type');
	
	var reactElementCounter = -1;
	
	/**
	 * determine if object is array
	 *
	 * @param {any} object
	 * @return {boolean}
	 */
	var isArray = function isArray(object) {
	  if (!object) {
	    return false;
	  }
	
	  return toString(object) === ARRAY_TYPE || object[TYPE_SYMBOL] === CRIO_ARRAY_TYPE;
	};
	
	/**
	 * is object a CrioArray or CrioObject
	 *
	 * @param {any} object
	 * @returns {boolean}
	 */
	var isCrio = function isCrio(object) {
	  if (!object) {
	    return false;
	  }
	
	  return object[TYPE_SYMBOL] === CRIO_ARRAY_TYPE || object[TYPE_SYMBOL] === CRIO_OBJECT_TYPE;
	};
	
	/**
	 * determine if object is object
	 *
	 * @param {any} object
	 * @return {boolean}
	 */
	var isObject = function isObject(object) {
	  if (!object) {
	    return false;
	  }
	
	  if (object[TYPE_SYMBOL]) {
	    return object[TYPE_SYMBOL] === CRIO_OBJECT_TYPE;
	  }
	
	  return toString(object) === OBJECT_TYPE;
	};
	
	/**
	 * determine if object is a React element
	 *
	 * @param {any} object
	 * @return {boolean}
	 */
	var isReactElement = function isReactElement(object) {
	  return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	};
	
	/**
	 * determine if object is undefined
	 *
	 * @param {any} object
	 * @return {boolean}
	 */
	var isUndefined = function isUndefined(object) {
	  return object === void 0;
	};
	
	/**
	 * utility function (faster than native forEach)
	 *
	 * @param {array<any>} array
	 * @param {function} fn
	 * @param {any} thisArg
	 */
	var forEach = function forEach(array, fn, thisArg) {
	  var length = array.length;
	
	  var index = -1;
	
	  while (++index < length) {
	    fn.call(thisArg, array[index], index, array);
	  }
	};
	
	/**
	 * same as forEach but decrementing (used for objects because its
	 * faster than incrementing)
	 *
	 * @param {array<any>} array
	 * @param {function} fn
	 * @param {any} thisArg
	 */
	var forEachRight = function forEachRight(array, fn, thisArg) {
	  var index = array.length;
	
	  while (index--) {
	    fn.call(thisArg, array[index], index, array);
	  }
	};
	
	/**
	 * based on object passed, get its type in lowercase string format
	 *
	 * @param {any} object
	 * @return {string}
	 */
	var toString = function toString(object) {
	  return Object.prototype.toString.call(object);
	};
	
	/**
	 * convert functions using toString to get actual value for JSON.stringify
	 *
	 * @param {string} key
	 * @param {any} value
	 * @returns {string}
	 */
	var stringifySerializerForHash = function stringifySerializerForHash(key, value) {
	  return isReactElement(value) ? ++reactElementCounter : value;
	};
	
	/**
	 * determine if the values for newObject match those for the crioObject
	 *
	 * @param {CrioArray|CrioObject} crioObject
	 * @param {any} newObject
	 * @returns {boolean}
	 */
	var getHashIfChanged = function getHashIfChanged(crioObject, newObject) {
	  var hashValue = (0, _hashIt2.default)(newObject);
	
	  if (crioObject[HASH_CODE_SYMBOL] !== hashValue) {
	    return hashValue;
	  }
	
	  return false;
	};
	
	/**
	 * return a new array from the existing CrioArray
	 *
	 * @param {CrioArray} crioArray
	 * @param {number} [crioArray.length]
	 * @returns {array<any>}
	 */
	var shallowCloneArray = function shallowCloneArray(crioArray) {
	  var array = new Array(crioArray.length);
	
	  forEach(crioArray, function (item, index) {
	    array[index] = item;
	  });
	
	  return array;
	};
	
	/**
	 * return a new object from the existing CrioObject
	 *
	 * @param {CrioObject} crioObject
	 * @param {number} [crioObject.length]
	 * @returns {object}
	 */
	var shallowCloneObject = function shallowCloneObject(crioObject) {
	  var keys = Object.keys(crioObject);
	
	  var target = {};
	
	  forEachRight(keys, function (key) {
	    target[key] = crioObject[key];
	  });
	
	  return target;
	};
	
	/**
	 * set property in object to be non-enumerable
	 *
	 * @param {object} object
	 * @param {string} property
	 * @param {any} value
	 */
	var setNonEnumerable = function setNonEnumerable(object, property, value) {
	  Object.defineProperty(object, property, {
	    configurable: false,
	    enumerable: false,
	    value: value,
	    writable: false
	  });
	};
	
	/**
	 * set property in object to be standard (configurable and writable)
	 *
	 * @param {object} object
	 * @param {string} property
	 * @param {any} value
	 * @param {boolean} enumerable=true
	 */
	var setStandard = function setStandard(object, property, value) {
	  var enumerable = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
	
	  Object.defineProperty(object, property, {
	    configurable: true,
	    enumerable: enumerable,
	    value: value,
	    writable: true
	  });
	};
	
	exports.CRIO_ARRAY_TYPE = CRIO_ARRAY_TYPE;
	exports.CRIO_OBJECT_TYPE = CRIO_OBJECT_TYPE;
	exports.HASH_CODE_SYMBOL = HASH_CODE_SYMBOL;
	exports.TYPE_SYMBOL = TYPE_SYMBOL;
	exports.forEach = forEach;
	exports.forEachRight = forEachRight;
	exports.getHashIfChanged = getHashIfChanged;
	exports.isArray = isArray;
	exports.isCrio = isCrio;
	exports.isReactElement = isReactElement;
	exports.isObject = isObject;
	exports.isUndefined = isUndefined;
	exports.setNonEnumerable = setNonEnumerable;
	exports.setStandard = setStandard;
	exports.shallowCloneArray = shallowCloneArray;
	exports.shallowCloneObject = shallowCloneObject;
	exports.stringify = stringify;
	exports.stringifySerializerForHash = stringifySerializerForHash;

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = undefined;

/***/ }
/******/ ]);
//# sourceMappingURL=crio.js.map