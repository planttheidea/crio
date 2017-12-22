var _Object$definePropert, _Object$definePropert2, _Object$definePropert3;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// external dependencies
import hashIt from 'hash-it';
import _every from 'lodash/every';
import _fill from 'lodash/fill';
import _find from 'lodash/find';
import _findKey from 'lodash/findKey';
import _findLastKey from 'lodash/findLastKey';
import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import _filter from 'lodash/filter';
import _forEach from 'lodash/forEach';
import get from 'lodash/fp/get';
import _map from 'lodash/map';
import _merge from 'lodash/merge';
import _reduce from 'lodash/reduce';
import _reduceRight from 'lodash/reduceRight';
import set from 'lodash/fp/set';
import _slice from 'lodash/slice';
import _some from 'lodash/some';
import toPairs from 'lodash/toPairs';
import _values from 'lodash/values';

// constants
import { CRIO_ARRAY_TYPE, CRIO_OBJECT_TYPE, CRIO_SYMBOL, CRIO_TYPE, ITERATOR_PROPERTY_DESCRIPTOR, UNSCOPABLES_PROPERTY_DESCRIPTOR } from './constants';

// utils
import { createAssignToObject, freeze, getCorrectConstructor, getCrioValue, getKeysMetadata, getRelativeValue, getStandardValue, hasOwnProperty, isCrio, isCrioArray, isEqual, keys as _keys, stringify } from './utils';

/**
 * @module Crio
 */

var assignToObject = void 0;

/**
 * @class Crio
 * @classdesc base crio class
 *
 * @memberof module:Crio
 */
export var Crio = function () {
  /**
   * @function constructor
   *
   * @description
   * add the items to the crio, and return a frozen version
   *
   * @param {Object} object object passed for crioing
   * @returns {Crio} crioed object
   */
  function Crio(object) {
    _classCallCheck(this, Crio);

    _forEach(object, assignToObject(this, getCrioValue));

    return freeze(this);
  }

  /**
   * @static
   */


  /**
   * @function clear
   * @memberof! Crio#
   *
   * @description
   * get a new crio that is empty
   *
   * @returns {Crio} new empty crio instance
   */
  Crio.prototype.clear = function clear() {
    return new this.constructor(this.isArray() ? [] : {});
  };

  /**
   * @function compact
   *
   * @description
   * remove all falsy values from the crio
   *
   * @returns {Crio} new crio instance
   */


  Crio.prototype.compact = function compact() {
    return this.filter(function (value) {
      return !!value;
    });
  };

  /**
   * @function delete
   *
   * @description
   * remove an item from the crio
   *
   * @param {number|string} key the key to remove from the crio
   * @returns {Crio} new crio instance with item removed
   */


  Crio.prototype.delete = function _delete(key) {
    var deletedIgnored = this['' + key],
        updated = _objectWithoutProperties(this, ['' + key]);

    return new this.constructor(this.isArray() ? _values(updated) : updated);
  };

  /**
   * @function deleteIn
   *
   * @description
   * remove a nested item from the crio
   *
   * @param {Array<number|string>} keys the path of the item to remove
   * @returns {Crio} new crio instance with the item removed
   */


  Crio.prototype.deleteIn = function deleteIn(keys) {
    if (!keys || !keys.length) {
      return this;
    }

    if (keys.length === 1) {
      return this.delete(keys[0]);
    }

    var _getKeysMetadata = getKeysMetadata(keys, this),
        currentValue = _getKeysMetadata.currentValue,
        lastIndex = _getKeysMetadata.lastIndex,
        parentKeys = _getKeysMetadata.parentKeys;

    if (!isCrio(currentValue)) {
      return this;
    }

    return this.setIn(parentKeys, currentValue.delete(keys[lastIndex]));
  };

  /**
   * @function entries
   *
   * @description
   * get the pairs of [key, value] in the crio
   *
   * @returns {Array<Array<string>>} [key, value] pairs
   */


  Crio.prototype.entries = function entries() {
    return toPairs(this);
  };

  /**
   * @function equals
   *
   * @description
   * does the object passed equal the crio
   *
   * @param {*} object object to compare against the instance
   * @returns {boolean} is the object equal
   */


  Crio.prototype.equals = function equals(object) {
    return isEqual(this, object);
  };

  /**
   * @function every
   *
   * @description
   * does every instance in the crio match
   *
   * @param {function} fn the function to test for matching
   * @param {*} [thisArg=this] argument for "this" to use in the iteration
   * @returns {boolean} does every instance match
   */


  Crio.prototype.every = function every(fn) {
    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

    return _every(this, fn, thisArg);
  };

  /**
   * @function filter
   *
   * @description
   * get a reduced set from the crio
   *
   * @param {function} fn function to test for if it should be returned or not
   * @param {*} [thisArg=this] argument for "this" to use in the iteration
   * @returns {Crio} new crio instance
   */


  Crio.prototype.filter = function filter(fn) {
    var _this = this;

    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

    var updated = this.isArray() ? _filter(this, fn, thisArg) : _reduce(this, function (updatedValue, value, key) {
      if (fn.call(thisArg, value, key, _this)) {
        updatedValue[key] = value;
      }

      return updatedValue;
    }, {});

    return new this.constructor(updated);
  };

  /**
   * @function find
   *
   * @description
   * find an item in the crio if it exists
   *
   * @param {function} fn function to test for finding the item
   * @param {number} [fromKey] key to start from when performing the find
   * @returns {*} found item or undefined
   */


  Crio.prototype.find = function find(fn, fromKey) {
    return _find(this, fn, fromKey);
  };

  /**
   * @function forEach
   *
   * @description
   * iterate over the crio calling fn
   *
   * @param {function} fn function to call in iteration
   * @param {*} [thisArg=this] argument to use as "this" in the iteration
   * @returns {Crio} new crio instance
   */


  Crio.prototype.forEach = function forEach(fn) {
    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

    _forEach(this, fn, thisArg);

    return this;
  };

  /**
   * @function get
   *
   * @description
   * get the item at key passed
   *
   * @param {number|string} key key to retrieve
   * @returns {*} item found at key
   */


  Crio.prototype.get = function get(key) {
    return this[key];
  };

  /**
   * @function getIn
   *
   * @description
   * get the nested item at the path passed
   *
   * @param {Array<number|string>} keys path to retrieve from
   * @returns {*} item found at nested path
   */


  Crio.prototype.getIn = function getIn(keys) {
    return keys && keys.length ? get(keys, this) : this;
  };

  /**
   * @function has
   *
   * @description
   * does the crio have the key passed
   *
   * @param {number|string} key key to test
   * @returns {boolean} does the crio have the key
   */


  Crio.prototype.has = function has(key) {
    return hasOwnProperty.call(this, key);
  };

  /**
   * @function hasIn
   *
   * @description
   * does the crio have the nested key at the path passed
   *
   * @param {Array<number|string>} keys path to test
   * @returns {boolean} does the crio have the nested path
   */


  Crio.prototype.hasIn = function hasIn(keys) {
    if (!keys || !keys.length) {
      return false;
    }

    if (keys.length === 1) {
      return this.has(keys[0]);
    }

    var _getKeysMetadata2 = getKeysMetadata(keys, this),
        currentValue = _getKeysMetadata2.currentValue,
        lastIndex = _getKeysMetadata2.lastIndex;

    return isCrio(currentValue) && currentValue.has(keys[lastIndex]);
  };

  /**
   * @function includes
   *
   * @description
   * does the crio have the value passed
   *
   * @param {*} value value to test for existence
   * @returns {boolean} does the value exist in the crio
   */


  Crio.prototype.includes = function includes(value) {
    return this.some(function (currentValue) {
      return currentValue === value;
    });
  };

  /**
   * @function isArray
   *
   * @description
   * is the crio an array
   *
   * @returns {boolean} is the crio an array
   */


  Crio.prototype.isArray = function isArray() {
    return this[CRIO_TYPE] === CRIO_ARRAY_TYPE;
  };

  /**
   * @function isObject
   *
   * @description
   * is the crio an object
   *
   * @returns {boolean} is the crio an object
   */


  Crio.prototype.isObject = function isObject() {
    return this[CRIO_TYPE] === CRIO_OBJECT_TYPE;
  };

  /**
   * @function keys
   *
   * @description
   * get the keys of the crio
   *
   * @returns {Array<string>} keys in the crio
   */


  Crio.prototype.keys = function keys() {
    return _keys(this);
  };

  /**
   * @function map
   *
   * @description
   * iterate over the crio mapping the result of fn to the key
   *
   * @param {function} fn function to call on iteration
   * @param {*} [thisArg=this] argument to use as "this" in the iteration
   * @returns {Crio} new crio instance
   */


  Crio.prototype.map = function map(fn) {
    var _this2 = this;

    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

    var updated = this.isArray() ? _map(this, fn, thisArg) : _reduce(this, function (updatedValue, value, key) {
      updatedValue[key] = fn.call(thisArg, value, key, _this2);

      return updatedValue;
    }, {});

    return new this.constructor(updated);
  };

  /**
   * @function merge
   *
   * @description
   * merge objects with crio
   *
   * @param {...Array<CrioArray|CrioObject|Object>} objects objects to merge with the crio
   * @returns {Crio} new crio instance
   */


  Crio.prototype.merge = function merge() {
    for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
      objects[_key] = arguments[_key];
    }

    if (!objects.length) {
      return this;
    }

    return new this.constructor(_merge.apply(undefined, [{}, this.thaw()].concat(objects)));
  };

  /**
   * @function mergeIn
   *
   * @description
   * merge the objects passed at the nested path in the crioArray
   *
   * @param {Array<number|string>} keys path to merge into
   * @param {...Array<CrioArray|CrioObject|Object>} objects objects to merge with the crio
   * @returns {Crio} new crio instance
   */


  Crio.prototype.mergeIn = function mergeIn(keys) {
    if (!keys || !keys.length) {
      return this;
    }

    var valueToMerge = this.getIn(keys);

    for (var _len2 = arguments.length, objects = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      objects[_key2 - 1] = arguments[_key2];
    }

    if (!isCrio(valueToMerge)) {
      return this.setIn(keys, _merge.apply(undefined, [{}].concat(objects)));
    }

    return new this.constructor(this.setIn(keys, valueToMerge.merge.apply(valueToMerge, objects)));
  };

  /**
   * @function mutate
   *
   * @description
   * work with the object in a mutated way and return the crioed result of that call
   *
   * @param {function} fn function to apply to crio
   * @param {*} [thisArg=this] argument to use for "this" in the call
   * @returns {*} crioed value resulting from the call
   */


  Crio.prototype.mutate = function mutate(fn) {
    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

    var result = fn.call(thisArg, this.thaw(), this);

    return getCrioValue(result, getCorrectConstructor(result, CrioArray, CrioObject));
  };

  /**
   * @function pluck
   *
   * @description
   * get the values in each object in the collection at key
   *
   * @param {string} key key to find value of in collection object
   * @returns {Crio} new crio instance
   */


  Crio.prototype.pluck = function pluck(key) {
    return this.reduce(function (pluckedValues, value) {
      pluckedValues.push(value && hasOwnProperty.call(value, key) ? value[key] : undefined);

      return pluckedValues;
    }, []);
  };

  /**
   * @function pluckIn
   *
   * @description
   * get the values in each object in the collection at the nested path
   *
   * @param {Array<number|string>} keys keys to find value of in collection object
   * @returns {Crio} new crio instance
   */


  Crio.prototype.pluckIn = function pluckIn(keys) {
    if (!keys || !keys.length) {
      return new CrioArray([]);
    }

    if (keys.length === 1) {
      return this.pluck(keys[0]);
    }

    var _getKeysMetadata3 = getKeysMetadata(keys, this),
        currentValue = _getKeysMetadata3.currentValue,
        lastIndex = _getKeysMetadata3.lastIndex;

    return isCrio(currentValue) ? currentValue.pluck(keys[lastIndex]) : this;
  };

  /**
   * @function reduce
   *
   * @description
   * reduce the crio down to a single value, starting with initial value
   *
   * @param {function} fn the function to iterate with
   * @param {*} initialValue the initial value of the reduction
   * @param {*} [thisArg=this] argument to use for "this" in the call of fn
   * @returns {*} the reduced value
   */


  Crio.prototype.reduce = function reduce(fn, initialValue) {
    var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

    var reducedValue = _reduce.call(thisArg, this, fn, initialValue);

    return getCrioValue(reducedValue, getCorrectConstructor(reducedValue, CrioArray, CrioObject));
  };

  /**
   * @function reduceRight
   *
   * @description
   * reduce the crio down to a single value, starting with initial value, in reverse order
   *
   * @param {function} fn the function to iterate with
   * @param {*} initialValue the initial value of the reduction
   * @param {*} [thisArg=this] argument to use for "this" in the call of fn
   * @returns {*} the reduced value
   */


  Crio.prototype.reduceRight = function reduceRight(fn, initialValue) {
    var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

    var reducedValue = _reduceRight.call(thisArg, this, fn, initialValue);

    return getCrioValue(reducedValue, getCorrectConstructor(reducedValue, CrioArray, CrioObject));
  };

  /**
   * @function set
   *
   * @description
   * set the value at the key passed
   *
   * @param {number|string} key key to assign value to
   * @param {*} value value to assign
   * @returns {Crio} new crio instance
   */


  Crio.prototype.set = function set(key, value) {
    var _extends2;

    return new this.constructor(_extends({}, this, (_extends2 = {}, _extends2[key] = value, _extends2)));
  };

  /**
   * @function setIn
   *
   * @description
   * deeply set the value at the path passed
   *
   * @param {Array<number|string>} keys path to assign value to
   * @param {*} value value to assign
   * @returns {Crio} new crio instance
   */


  Crio.prototype.setIn = function setIn(keys, value) {
    return keys && keys.length ? new this.constructor(set(keys, value, this)) : this;
  };

  /**
   * @function some
   *
   * @description
   * do any of the items in crio match per the fn passed
   *
   * @param {function} fn fn to iterate with
   * @param {*} [thisArg=this] argument to use as "this" in the iteration
   * @returns {boolean} are there any matches
   */


  Crio.prototype.some = function some(fn) {
    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

    return _some(this, fn, thisArg);
  };

  /**
   * @function thaw
   *
   * @description
   * create a plain JS version of the crio
   *
   * @returns {Array<*>|Object} plain JS version of crio
   */


  Crio.prototype.thaw = function thaw() {
    var returnValue = this.isArray() ? [] : {};

    _forEach(this, assignToObject(returnValue, getStandardValue));

    return returnValue;
  };

  /**
   * @function toArray
   *
   * @description
   * convert the crio to an array if it isnt already
   *
   * @returns {CrioArray} new crio array instance
   */


  Crio.prototype.toArray = function toArray() {
    return this.isArray() ? this : new CrioArray(_values(this));
  };

  /**
   * @function toLocaleString
   *
   * @description
   * convert the crio to stringified form
   *
   * @returns {string} stringified crio
   */


  Crio.prototype.toLocaleString = function toLocaleString() {
    return this.toString();
  };

  /**
   * @function toObject
   *
   * @description
   * convert the crio to an object if it isnt already
   *
   * @returns {CrioObject} new crio object instance
   */


  Crio.prototype.toObject = function toObject() {
    return this.isObject() ? this : new CrioObject(_reduce(this, function (object, value, key) {
      object[key] = value;

      return object;
    }, {}));
  };

  /**
   * @function toLocaleString
   *
   * @description
   * convert the crio to stringified form
   *
   * @returns {string} stringified crio
   */


  Crio.prototype.toString = function toString() {
    return stringify(this);
  };

  /**
   * @function valueOf
   *
   * @description
   * noop for valueOf
   *
   * @returns {Crio} the same crio instance
   */


  Crio.prototype.valueOf = function valueOf() {
    return this;
  };

  /**
   * @function values
   *
   * @description
   * get the values of the crio as an array
   *
   * @returns {Array<*>} values in the crio
   */


  Crio.prototype.values = function values() {
    return _values(this);
  };

  _createClass(Crio, [{
    key: CRIO_SYMBOL,
    get: function get() {
      return true;
    }
  }, {
    key: 'hashCode',
    get: function get() {
      return hashIt(this);
    }
  }], [{
    key: '@@species',
    get: function get() {
      return this;
    }
  }]);

  return Crio;
}();

Object.defineProperties(Crio.prototype, (_Object$definePropert = {}, _Object$definePropert[Symbol.iterator] = ITERATOR_PROPERTY_DESCRIPTOR, _Object$definePropert[Symbol.unscopables] = UNSCOPABLES_PROPERTY_DESCRIPTOR, _Object$definePropert));

/**
 * @class CrioArray
 * @classdesc extension of Crio class specific to arrays
 *
 * @memberof module:Crio
 */
export var CrioArray = function (_Crio) {
  _inherits(CrioArray, _Crio);

  function CrioArray() {
    _classCallCheck(this, CrioArray);

    return _possibleConstructorReturn(this, _Crio.apply(this, arguments));
  }

  /**
   * @function concat
   *
   * @description
   * append the items passed to the crio
   *
   * @param {...Array<*>} items items to append to the crio
   * @returns {CrioArray} new crio array instance
   */
  CrioArray.prototype.concat = function concat(items) {
    var concatted = [].concat(_values(this), items);

    return new CrioArray(concatted);
  };

  /**
   * @function copyWithin
   *
   * @description
   * move values around within the array
   *
   * @param {number} target target to copy
   * @param {number} [start=0] index to start copying to
   * @param {number} [end=this.length] index to stop copying to
   * @returns {CrioArray} new crio array instance
   */


  CrioArray.prototype.copyWithin = function copyWithin(target) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.length;

    var copiedArray = _values(this);
    var length = this.length >>> 0;

    var to = getRelativeValue(target >> 0, length),
        from = getRelativeValue(start >> 0, length);

    var final = getRelativeValue(end >> 0, length);

    var count = Math.min(final - from, length - to),
        direction = 1;

    if (from < to && to < from + count) {
      direction = -1;
      from += count - 1;
      to += count - 1;
    }

    while (count > 0) {
      if (from in copiedArray) {
        copiedArray[to] = copiedArray[from];
      } else {
        delete copiedArray[to];
      }

      from += direction;
      to += direction;
      count--;
    }

    return new CrioArray(copiedArray);
  };

  /**
   * @function difference
   *
   * @description
   * find the values in this that do not exist in any of the arrays passed
   *
   * @param {Array<Array>} arrays arrays to get the difference of
   * @returns {CrioArray} array of items matching diffference criteria
   */


  CrioArray.prototype.difference = function difference() {
    for (var _len3 = arguments.length, arrays = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      arrays[_key3] = arguments[_key3];
    }

    if (!arrays.length) {
      return this;
    }

    var indexOfValue = void 0;

    var difference = _reduce(arrays, function (differenceArray, array) {
      if (isArray(array) || isCrioArray(array)) {
        _forEach(array, function (value) {
          indexOfValue = differenceArray.indexOf(value);

          if (!!~indexOfValue) {
            differenceArray.splice(indexOfValue, 1);
          }
        });
      }

      return differenceArray;
    }, this.isArray ? _values(this) : _extends({}, this));

    return new CrioArray(difference);
  };

  /**
   * @function fill
   *
   * @description
   * fill the array at certain indices with the value passed
   *
   * @param {*} value the value to fill the indices with
   * @param {number} [start=0] the starting index to fill
   * @param {number} [end=this.length] the ending index to fill
   * @returns {CrioArray} new crio array instance
   */


  CrioArray.prototype.fill = function fill(value) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.length;

    var filled = _fill(_values(this), value, start, end);

    return new CrioArray(filled, this);
  };

  /**
   * @function findIndex
   *
   * @description
   * find the matching index based on truthy return from fn
   *
   * @param {function} fn function to use for test in iteration
   * @param {*} [thisArg=this] argument to use as "this" in fn call
   * @returns {number} index of match, or -1
   */


  CrioArray.prototype.findIndex = function findIndex(fn) {
    var _this4 = this;

    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

    var index = _findKey(this, function (value, key) {
      return fn.call(thisArg, value, +key, _this4);
    });

    return isUndefined(index) ? -1 : +index;
  };

  /**
   * @function findLastIndex
   *
   * @description
   * find the matching index based on truthy return from fn starting from end
   *
   * @param {function} fn function to use for test in iteration
   * @param {*} [thisArg=this] argument to use as "this" in fn call
   * @returns {number} index of match, or -1
   */


  CrioArray.prototype.findLastIndex = function findLastIndex(fn) {
    var _this5 = this;

    var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

    var index = _findLastKey(this, function (value, key) {
      return fn.call(thisArg, value, +key, _this5);
    });

    return isUndefined(index) ? -1 : +index;
  };

  /**
   * @function first
   *
   * @description
   * take the first n number of items in the array
   *
   * @param {number} [size=1] size of elements to take from beginning of array
   * @returns {CrioArray}
   */


  CrioArray.prototype.first = function first() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    return this.slice(0, size);
  };

  /**
   * @function indexOf
   *
   * @description
   * get the index of the value passed
   *
   * @param {*} value value to find in crio
   * @returns {number} index of match, or -1
   */


  CrioArray.prototype.indexOf = function indexOf(value) {
    return this.findIndex(function (thisValue) {
      return thisValue === value;
    });
  };

  /**
   * @function intersection
   *
   * @description
   * find the values in that exist in this and each of the arrays passed
   *
   * @param {Array<Array>} arrays
   * @returns {CrioArray}
   */


  CrioArray.prototype.intersection = function intersection() {
    for (var _len4 = arguments.length, arrays = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      arrays[_key4] = arguments[_key4];
    }

    if (!arrays.length) {
      return this;
    }

    var allArrays = [this].concat(arrays);
    var allArraysLength = allArrays.length;

    var indices = [],
        indexOfValue = void 0;

    var reducedArrays = _reduce(allArrays, function (values, array) {
      if (isArray(array) || isCrioArray(array)) {
        _forEach(array, function (value) {
          indexOfValue = values.indexOf(value);

          if (!!~indexOfValue) {
            indices[indexOfValue]++;
          } else {
            indices[values.length] = 1;
            values.push(value);
          }
        });
      }

      return values;
    }, []);
    var filteredArrays = _filter(reducedArrays, function (value, index) {
      return indices[index] === allArraysLength;
    });

    return new CrioArray(filteredArrays);
  };

  /**
   * @function join
   *
   * @description
   * join the values in the crio as a string, combined with separator
   *
   * @param {string} [separator=','] character(s) to place between strings in combination
   * @returns {string} parameters joined by separator in string
   */


  CrioArray.prototype.join = function join() {
    var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ',';

    return this.thaw().join(separator);
  };

  /**
   * @function last
   *
   * @description
   * take the last n number of items in the array
   *
   * @param {number} [size=1] size of elements to take from end of array
   * @returns {CrioArray}
   */


  CrioArray.prototype.last = function last() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    return this.slice(this.length - size);
  };

  /**
   * @function lastIndexOf
   *
   * @description
   * get the last index of the value passed
   *
   * @param {*} value value to find in crio
   * @returns {number} index of match, or -1
   */


  CrioArray.prototype.lastIndexOf = function lastIndexOf(value) {
    return this.findLastIndex(function (thisValue) {
      return thisValue === value;
    });
  };

  /**
   * @function pop
   *
   * @description
   * get crio based on current crio with last item removed
   *
   * @returns {CrioArray} new crio array instance
   */


  CrioArray.prototype.pop = function pop() {
    return this.slice(0, this.length - 1);
  };

  /**
   * @function push
   *
   * @description
   * push one to many items to the current crio
   *
   * @param {...Array<*>} items the items to add to the array
   * @returns {CrioArray} the new crio array instance
   */


  CrioArray.prototype.push = function push() {
    for (var _len5 = arguments.length, items = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      items[_key5] = arguments[_key5];
    }

    return this.concat(items);
  };

  /**
   * @function reverse
   *
   * @description
   * get the same values, but in reverse order
   *
   * @returns {CrioArray} new crio array instance
   */


  CrioArray.prototype.reverse = function reverse() {
    var reversed = _values(this);

    reversed.reverse();

    return new CrioArray(reversed);
  };

  /**
   * @function shift
   *
   * @description
   * get crio based on current crio with first item removed
   *
   * @returns {CrioArray} new crio array instance
   */


  CrioArray.prototype.shift = function shift() {
    return this.slice(1);
  };

  /**
   * @function slice
   *
   * @description
   * get a new crio array based on a subset of the current crio
   *
   * @param {number} [start=0] first index to include
   * @param {number} [end=this.length] size of array from first index
   * @returns {CrioArray} new crio array instance
   */


  CrioArray.prototype.slice = function slice() {
    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;

    var sliced = _slice(this, start, end);

    return new CrioArray(sliced);
  };

  /**
   * @function sort
   *
   * @description
   * sort the collection by the fn passed
   *
   * @param {function} fn the function to sort based on
   * @returns {CrioArray} new crio array instance
   */


  CrioArray.prototype.sort = function sort(fn) {
    var sorted = _values(this);

    sorted.sort(fn);

    return new CrioArray(sorted);
  };

  /**
   * @function splice
   *
   * @description
   * splice the values into or out of the array
   *
   * @param {number} [start=0] starting index to splice
   * @param {number} [deleteCount=1] length from starting index to removes
   * @param {...Array<*>} items items to insert after delete is complete
   * @returns {CrioArray} new crio array instance
   */


  CrioArray.prototype.splice = function splice() {
    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var deleteCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var spliced = _values(this);

    for (var _len6 = arguments.length, items = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
      items[_key6 - 2] = arguments[_key6];
    }

    spliced.splice.apply(spliced, [start, deleteCount].concat(items));

    return new CrioArray(spliced);
  };

  /**
   * @function unique
   *
   * @description
   * return the current CrioArray with the duplicate values removed
   *
   * @returns {CrioArray} new crio instance
   */


  CrioArray.prototype.unique = function unique() {
    var hashArray = [],
        newArray = [],
        hasHashCode = false,
        hashCode = void 0,
        storeValue = void 0;

    return this.filter(function (value) {
      hashCode = !!value ? value.hashCode : undefined;
      hasHashCode = !isUndefined(hashCode);
      storeValue = !~newArray.indexOf(value) && (!hasHashCode || !~hashArray.indexOf(hashCode));

      if (storeValue) {
        newArray.push(value);

        if (hasHashCode) {
          hashArray.push(hashCode);
        }
      }

      return storeValue;
    });
  };

  /**
   * @function unshift
   *
   * @description
   * add items passed to the beginning of the crio array
   *
   * @param {...Array<*>} items items to prepend to the array
   * @returns {CrioArray} new crio array instance
   */


  CrioArray.prototype.unshift = function unshift() {
    for (var _len7 = arguments.length, items = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      items[_key7] = arguments[_key7];
    }

    return items.length ? new CrioArray([].concat(items, _values(this))) : this;
  };

  /**
   * @function xor
   *
   * @description
   * find the values that are the symmetric difference of this and the arrays passed
   *
   * @param {Array<Array>} arrays arrays to find symmetric values in
   * @returns {CrioArray} new crio array instance
   */


  CrioArray.prototype.xor = function xor() {
    for (var _len8 = arguments.length, arrays = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      arrays[_key8] = arguments[_key8];
    }

    if (!arrays.length) {
      return this;
    }

    var allArrays = [this].concat(arrays);

    var indicesToRemove = [],
        indexOfValue = void 0;

    var reducedValues = _reduce(allArrays, function (values, array) {
      if (isArray(array) || isCrioArray(array)) {
        _forEach(array, function (value) {
          indexOfValue = values.indexOf(value);

          if (!!~indexOfValue) {
            indicesToRemove.push(indexOfValue);
          } else {
            values.push(value);
          }
        });
      }

      return values;
    }, []);
    var xorValues = _filter(reducedValues, function (value, index) {
      return !~indicesToRemove.indexOf(index);
    });

    return new CrioArray(xorValues);
  };

  _createClass(CrioArray, [{
    key: 'length',
    get: function get() {
      return _keys(this).length;
    }
  }]);

  return CrioArray;
}(Crio);

Object.defineProperties(CrioArray.prototype, (_Object$definePropert2 = {}, _Object$definePropert2[CRIO_TYPE] = {
  configurable: false,
  enumerable: false,
  value: CRIO_ARRAY_TYPE,
  writable: false
}, _Object$definePropert2));

/**
 * @class CrioObject
 * @classdesc extension of Crio class specific to objects
 *
 * @memberof module:Crio
 */
export var CrioObject = function (_Crio2) {
  _inherits(CrioObject, _Crio2);

  function CrioObject() {
    _classCallCheck(this, CrioObject);

    return _possibleConstructorReturn(this, _Crio2.apply(this, arguments));
  }

  /**
   * @function findKey
   *
   * @description
   * find a specific key based on a matching function
   *
   * @param {function} fn function to match
   * @returns {string|undefined} key matching fn
   */
  CrioObject.prototype.findKey = function findKey(fn) {
    return _findKey(this, fn);
  };

  /**
   * @function findLastKey
   *
   * @description
   * find a specific key based on a matching function, starting from the end
   *
   * @param {function} fn function to match
   * @returns {string|undefined} key matching fn
   */


  CrioObject.prototype.findLastKey = function findLastKey(fn) {
    return _findLastKey(this, fn);
  };

  _createClass(CrioObject, [{
    key: 'size',
    get: function get() {
      return _keys(this).length;
    }
  }]);

  return CrioObject;
}(Crio);

Object.defineProperties(CrioObject.prototype, (_Object$definePropert3 = {}, _Object$definePropert3[CRIO_TYPE] = {
  configurable: false,
  enumerable: false,
  value: CRIO_OBJECT_TYPE,
  writable: false
}, _Object$definePropert3));

assignToObject = createAssignToObject(CrioArray, CrioObject);