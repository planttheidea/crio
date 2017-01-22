// external dependencies
import hashIt from 'hash-it';
import every from 'lodash/every';
import fill from 'lodash/fill';
import find from 'lodash/find';
import findKey from 'lodash/findKey';
import findLastKey from 'lodash/findLastKey';
import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import get from 'lodash/fp/get';
import keys from 'lodash/keys';
import map from 'lodash/map';
import merge from 'lodash/merge';
import reduce from 'lodash/reduce';
import reduceRight from 'lodash/reduceRight';
import reverse from 'lodash/fp/reverse';
import set from 'lodash/fp/set';
import slice from 'lodash/slice';
import some from 'lodash/some';
import sortBy from 'lodash/fp/sortBy';
import toPairs from 'lodash/toPairs';
import values from 'lodash/values';

// constants
import {
  CRIO_ARRAY_TYPE,
  CRIO_OBJECT_TYPE,
  CRIO_SYMBOL,
  CRIO_TYPE,
  ITERATOR_PROPERTY_DESCRIPTOR,
  UNSCOPABLES_PROPERTY_DESCRIPTOR
} from './constants';

// utils
import {
  createAssignToObject,
  freeze,
  getCorrectConstructor,
  getCrioValue,
  getKeysMetadata,
  getRelativeValue,
  getStandardValue,
  isCrio,
  isCrioArray,
  isEqual,
  stringify
} from './utils';

let assignToObject;

/**
 * @class Crio
 * @classdesc base crio class
 */
export class Crio {
  /**
   * @function constructor
   *
   * @description
   * add the items to the crio, and return a frozen version
   *
   * @param {Object} object object passed for crioing
   * @returns {Crio} crioed object
   */
  constructor(object) {
    forEach(object, assignToObject(this, getCrioValue));

    return freeze(this);
  }

  /**
   * @static
   */
  static get ['@@species']() {
    return this;
  }

  get [CRIO_SYMBOL]() {
    return true;
  }

  get hashCode() {
    return hashIt(this);
  }

  /**
   * @function clear
   *
   * @description
   * get a new crio that is empty
   *
   * @returns {Crio} new empty crio instance
   */
  clear() {
    return new this.constructor(this.isArray() ? [] : {});
  }

  /**
   * @function compact
   *
   * @description
   * remove all falsy values from the crio
   *
   * @returns {Crio} new crio instance
   */
  compact() {
    return this.filter((value) => {
      return !!value;
    });
  }

  /**
   * @function delete
   *
   * @description
   * remove an item from the crio
   *
   * @param {number|string} key the key to remove from the crio
   * @returns {Crio} new crio instance with item removed
   */
  delete(key) {
    let updated = {...this};

    delete updated[key];

    if (this.isArray()) {
      updated = map(updated);
    }

    return new this.constructor(updated);
  }

  /**
   * @function deleteIn
   *
   * @description
   * remove a nested item from the crio
   *
   * @param {Array<number|string>} keys the path of the item to remove
   * @returns {Crio} new crio instance with the item removed
   */
  deleteIn(keys) {
    if (!keys || !keys.length) {
      return this;
    }

    if (keys.length === 1) {
      return this.delete(keys[0]);
    }

    const {
      currentValue,
      lastIndex,
      parentKeys
    } = getKeysMetadata(keys, this);

    if (!isCrio(currentValue)) {
      return this;
    }

    const updated = currentValue.delete(keys[lastIndex]);

    return this.setIn(parentKeys, updated);
  }

  /**
   * @function entries
   *
   * @description
   * get the pairs of [key, value] in the crio
   *
   * @returns {Array<Array<string>>} [key, value] pairs
   */
  entries() {
    return toPairs(this);
  }

  /**
   * @function equals
   *
   * @description
   * does the object passed equal the crio
   *
   * @param {*} object object to compare against the instance
   * @returns {boolean} is the object equal
   */
  equals(object) {
    return isEqual(this, object);
  }

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
  every(fn, thisArg = this) {
    return every(this, fn, thisArg);
  }

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
  filter(fn, thisArg = this) {
    const updated = this.isArray() ?
      filter(this, fn, thisArg) :
      reduce(this, (updatedValue, value, key) => {
        if (fn.call(thisArg, value, key, this)) {
          updatedValue[key] = value;
        }

        return updatedValue;
      }, {});

    return new this.constructor(updated);
  }

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
  find(fn, fromKey) {
    return find(this, fn, fromKey);
  }

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
  forEach(fn, thisArg = this) {
    forEach(this, fn, thisArg);

    return this;
  }

  /**
   * @function get
   *
   * @description
   * get the item at key passed
   *
   * @param {number|string} key key to retrieve
   * @returns {*} item found at key
   */
  get(key) {
    return this[key];
  }

  /**
   * @function getIn
   *
   * @description
   * get the nested item at the path passed
   *
   * @param {Array<number|string>} keys path to retrieve from
   * @returns {*} item found at nested path
   */
  getIn(keys) {
    if (!keys || !keys.length) {
      return this;
    }

    return get(keys, this);
  }

  /**
   * @function has
   *
   * @description
   * does the crio have the key passed
   *
   * @param {number|string} key key to test
   * @returns {boolean} does the crio have the key
   */
  has(key) {
    return this.hasOwnProperty(key);
  }

  /**
   * @function hasIn
   *
   * @description
   * does the crio have the nested key at the path passed
   *
   * @param {Array<number|string>} keys path to test
   * @returns {boolean} does the crio have the nested path
   */
  hasIn(keys) {
    if (!keys || !keys.length) {
      return false;
    }

    if (keys.length === 1) {
      return this.has(keys[0]);
    }

    const {
      currentValue,
      lastIndex
    } = getKeysMetadata(keys, this);

    return isCrio(currentValue) && currentValue.has(keys[lastIndex]);
  }

  /**
   * @function includes
   *
   * @description
   * does the crio have the value passed
   *
   * @param {*} value value to test for existence
   * @returns {boolean} does the value exist in the crio
   */
  includes(value) {
    return this.some((currentValue) => {
      return currentValue === value;
    });
  }

  /**
   * @function isArray
   *
   * @description
   * is the crio an array
   *
   * @returns {boolean} is the crio an array
   */
  isArray() {
    return this[CRIO_TYPE] === CRIO_ARRAY_TYPE;
  }

    /**
     * @function isObject
     *
     * @description
     * is the crio an object
     *
     * @returns {boolean} is the crio an object
     */
  isObject() {
    return this[CRIO_TYPE] === CRIO_OBJECT_TYPE;
  }

  /**
   * @function keys
   *
   * @description
   * get the keys of the crio
   *
   * @returns {Array<string>} keys in the crio
   */
  keys() {
    return keys(this);
  }

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
  map(fn, thisArg = this) {
    const updated = this.isArray() ?
      map(this, fn, thisArg) :
      reduce(this, (updatedValue, value, key) => {
        updatedValue[key] = fn.call(thisArg, value, key, this);

        return updatedValue;
      }, {});

    return new this.constructor(updated);
  }

  /**
   * @function merge
   *
   * @description
   * merge objects with crio
   *
   * @param {...Array<CrioArray|CrioObject|Object>} objects objects to merge with the crio
   * @returns {Crio} new crio instance
   */
  merge(...objects) {
    if (!objects.length) {
      return this;
    }

    const merged = merge({}, this.thaw(), ...objects);

    return new this.constructor(merged);
  }

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
  mergeIn(keys, ...objects) {
    if (!keys || !keys.length) {
      return this;
    }

    const valueToMerge = this.getIn(keys);

    if (!isCrio(valueToMerge)) {
      return this.setIn(keys, merge({}, ...objects));
    }

    const updated = this.setIn(keys, valueToMerge.merge(...objects));

    return new this.constructor(updated);
  }

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
  mutate(fn, thisArg = this) {
    const result = fn.call(thisArg, this.thaw(), this);

    return getCrioValue(result, getCorrectConstructor(result, CrioArray, CrioObject));
  }

  /**
   * @function pluck
   *
   * @description
   * get the values in each object in the collection at key
   *
   * @param {string} key key to find value of in collection object
   * @returns {Crio} new crio instance
   */
  pluck(key) {
    let plucked;

    return this.reduce((pluckedValues, value) => {
      plucked = !!(value && value.hasOwnProperty(key)) ? value[key] : undefined;

      return [
        ...pluckedValues,
        plucked
      ];
    }, []);
  }

    /**
     * @function pluckIn
     *
     * @description
     * get the values in each object in the collection at the nested path
     *
     * @param {Array<number|string>} keys keys to find value of in collection object
     * @returns {Crio} new crio instance
     */
  pluckIn(keys) {
    if (!keys || !keys.length) {
      return new CrioArray([]);
    }

    if (keys.length === 1) {
      return this.pluck(keys[0]);
    }

    const {
      currentValue,
      lastIndex
    } = getKeysMetadata(keys, this);

    if (!isCrio(currentValue)) {
      return this;
    }

    return currentValue.pluck(keys[lastIndex]);
  }

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
  reduce(fn, initialValue, thisArg = this) {
    const reducedValue = reduce(this, fn, initialValue, thisArg);

    return getCrioValue(reducedValue, getCorrectConstructor(reducedValue, CrioArray, CrioObject));
  }

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
  reduceRight(fn, initialValue, thisArg = this) {
    const reducedValue = reduceRight(this, fn, initialValue, thisArg);

    return getCrioValue(reducedValue, getCorrectConstructor(reducedValue, CrioArray, CrioObject));
  }

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
  set(key, value) {
    const updated = {
      ...this,
      [key]: value
    };

    return new this.constructor(updated);
  }

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
  setIn(keys, value) {
    if (!keys || !keys.length) {
      return this;
    }

    const updatedObject = set(keys, value, this);

    return new this.constructor(updatedObject);
  }

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
  some(fn, thisArg = this) {
    return some(this, fn, thisArg);
  }

  /**
   * @function thaw
   *
   * @description
   * create a plain JS version of the crio
   *
   * @returns {Array<*>|Object} plain JS version of crio
   */
  thaw() {
    let returnValue = this.isArray() ? [] : {};

    forEach(this, assignToObject(returnValue, getStandardValue));

    return returnValue;
  }

  /**
   * @function toArray
   *
   * @description
   * convert the crio to an array if it isnt already
   *
   * @returns {CrioArray} new crio array instance
   */
  toArray() {
    if (this.isArray()) {
      return this;
    }

    return new CrioArray(this.values());
  }

  /**
   * @function toLocaleString
   *
   * @description
   * convert the crio to stringified form
   *
   * @returns {string} stringified crio
   */
  toLocaleString() {
    return this.toString();
  }

  /**
   * @function toObject
   *
   * @description
   * convert the crio to an object if it isnt already
   *
   * @returns {CrioObject} new crio object instance
   */
  toObject() {
    if (this.isObject()) {
      return this;
    }

    const updated = reduce(this, (object, value, key) => {
      object[key] = value;

      return object;
    }, {});

    return new CrioObject(updated);
  }

  /**
   * @function toLocaleString
   *
   * @description
   * convert the crio to stringified form
   *
   * @returns {string} stringified crio
   */
  toString() {
    return stringify(this);
  }

  /**
   * @function valueOf
   *
   * @description
   * noop for valueOf
   *
   * @returns {Crio} the same crio instance
   */
  valueOf() {
    return this;
  }

  /**
   * @function values
   *
   * @description
   * get the values of the crio as an array
   *
   * @returns {Array<*>} values in the crio
   */
  values() {
    return values(this);
  }
}

Object.defineProperties(Crio.prototype, {
  [Symbol.iterator]: ITERATOR_PROPERTY_DESCRIPTOR,
  [Symbol.unscopables]: UNSCOPABLES_PROPERTY_DESCRIPTOR
});

export class CrioArray extends Crio {
  get length() {
    return Object.keys(this).length;
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
  concat(items) {
    return new CrioArray([
      ...this,
      ...items
    ]);
  }

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
  copyWithin(target, start = 0, end = this.length) {
    const copiedArray = [...this];
    const length = this.length >>> 0;

    let to = getRelativeValue(target >> 0, length),
        from = getRelativeValue(start >> 0, length);

    const final = getRelativeValue(end >> 0, length);

    let count = Math.min(final - from, length - to),
        direction = 1;

    if (from < to && to < (from + count)) {
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
  }

  /**
   * @function difference
   *
   * @description
   * find the values in this that do not exist in any of the arrays passed
   *
   * @param {Array<Array>} arrays arrays to get the difference of
   * @returns {CrioArray} array of items matching diffference criteria
   */
  difference(...arrays) {
    if (!arrays.length) {
      return this;
    }

    let indexOfValue;

    const difference = reduce(arrays, (differenceArray, array) => {
      if (isArray(array) || isCrioArray(array)) {
        forEach(array, (value) => {
          indexOfValue = differenceArray.indexOf(value);

          if (!!~indexOfValue) {
            differenceArray.splice(indexOfValue, 1);
          }
        });
      }

      return differenceArray;
    }, [...this]);

    return new CrioArray(difference);
  }

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
  fill(value, start = 0, end = this.length) {
    const filled = fill(this.thaw(), value, start, end);

    return new CrioArray(filled, this);
  }

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
  findIndex(fn, thisArg = this) {
    const index = findKey(this, (value, index) => {
      return fn.call(thisArg, value, +index, this);
    });

    return isUndefined(index) ? -1 : +index;
  }

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
  findLastIndex(fn, thisArg = this) {
    const index = findLastKey(this, (value, index) => {
      return fn.call(thisArg, value, +index, this);
    });

    return isUndefined(index) ? -1 : +index;
  }

  /**
   * @function first
   *
   * @description
   * take the first n number of items in the array
   *
   * @param {number} [size=1] size of elements to take from beginning of array
   * @returns {CrioArray}
   */
  first(size = 1) {
    return this.slice(0, size);
  }

  /**
   * @function indexOf
   *
   * @description
   * get the index of the value passed
   *
   * @param {*} value value to find in crio
   * @returns {number} index of match, or -1
   */
  indexOf(value) {
    return this.findIndex((thisValue) => {
      return thisValue === value;
    });
  }

  /**
   * @function intersection
   *
   * @description
   * find the values in that exist in this and each of the arrays passed
   *
   * @param {Array<Array>} arrays
   * @returns {CrioArray}
   */
  intersection(...arrays) {
    if (!arrays.length) {
      return this;
    }

    const allArrays = [
      this,
      ...arrays
    ];
    const allArraysLength = allArrays.length;

    let indices = [],
        indexOfValue;

    const reducedArrays = reduce(allArrays, (values, array) => {
      if (isArray(array) || isCrioArray(array)) {
        forEach(array, (value) => {
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
    const filteredArrays = filter(reducedArrays, (value, index) => {
      return indices[index] === allArraysLength;
    });

    return new CrioArray(filteredArrays);
  }

  /**
   * @function join
   *
   * @description
   * join the values in the crio as a string, combined with separator
   *
   * @param {string} [separator=','] character(s) to place between strings in combination
   * @returns {string} parameters joined by separator in string
   */
  join(separator = ',') {
    return [...this].join(separator);
  }

  /**
   * @function last
   *
   * @description
   * take the last n number of items in the array
   *
   * @param {number} [size=1] size of elements to take from end of array
   * @returns {CrioArray}
   */
  last(size = 1) {
    return this.slice(this.length - size);
  }

  /**
   * @function lastIndexOf
   *
   * @description
   * get the last index of the value passed
   *
   * @param {*} value value to find in crio
   * @returns {number} index of match, or -1
   */
  lastIndexOf(value) {
    return this.findLastIndex((thisValue) => {
      return thisValue === value;
    });
  }

  /**
   * @function pop
   *
   * @description
   * get crio based on current crio with last item removed
   *
   * @returns {CrioArray} new crio array instance
   */
  pop() {
    return this.slice(0, this.length - 1);
  }

  /**
   * @function reverse
   *
   * @description
   * get the same values, but in reverse order
   *
   * @returns {CrioArray} new crio array instance
   */
  reverse() {
    const reversed = reverse(this);

    return new CrioArray(reversed);
  }

  /**
   * @function shift
   *
   * @description
   * get crio based on current crio with first item removed
   *
   * @returns {CrioArray} new crio array instance
   */
  shift() {
    return this.slice(1);
  }

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
  slice(start = 0, end = this.length) {
    const sliced = slice(this, start, end);

    return new CrioArray(sliced);
  }

  /**
   * @function sort
   *
   * @description
   * sort the collection by the fn passed
   *
   * @param {function} fn the function to sort based on
   * @returns {CrioArray} new crio array instance
   */
  sort(fn) {
    const sorted = sortBy(fn, this);

    return new CrioArray(sorted);
  }

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
  splice(start = 0, deleteCount = 1, ...items) {
    let spliced = [...this];

    spliced.splice(start, deleteCount, ...items);

    return new CrioArray(spliced);
  }

  /**
   * @function unique
   *
   * @description
   * return the current CrioArray with the duplicate values removed
   *
   * @returns {CrioArray} new crio instance
   */
  unique() {
    let hashArray = [],
        newArray = [],
        hasHashCode = false,
        hashCode, storeValue;

    return this.filter((value) => {
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
  }

  unshift(...items) {
    if (!items.length) {
      return this;
    }

    return new CrioArray([
      ...items,
      ...this
    ]);
  }

  /**
   * @function xor
   *
   * @description
   * find the values that are the symmetric difference of this and the arrays passed
   *
   * @param {Array<Array>} arrays arrays to find symmetric values in
   * @returns {CrioArray} new crio array instance
   */
  xor(...arrays) {
    if (!arrays.length) {
      return this;
    }

    const allArrays = [
      this,
      ...arrays
    ];

    let indicesToRemove = [],
        indexOfValue;

    const reducedValues = reduce(allArrays, (values, array) => {
      if (isArray(array) || isCrioArray(array)) {
        forEach(array, (value) => {
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
    const xorValues = filter(reducedValues, (value, index) => {
      return !~indicesToRemove.indexOf(index);
    });

    return new CrioArray(xorValues);
  }
}

Object.defineProperties(CrioArray.prototype, {
  [CRIO_TYPE]: {
    configurable: false,
    enumerable: false,
    value: CRIO_ARRAY_TYPE,
    writable: false
  }
});

export class CrioObject extends Crio {
  get size() {
    return Object.keys(this).length;
  }

  findKey(fn) {
    return findKey(this, fn);
  }

  findLastKey(fn) {
    return findLastKey(this, fn);
  }
}

Object.defineProperties(CrioObject.prototype, {
  [CRIO_TYPE]: {
    configurable: false,
    enumerable: false,
    value: CRIO_OBJECT_TYPE,
    writable: false
  }
});

assignToObject = createAssignToObject(CrioArray, CrioObject);
