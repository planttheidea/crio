// external dependencies
import every from 'lodash/every';
import fill from 'lodash/fill';
import find from 'lodash/find';
import findKey from 'lodash/findKey';
import findLastKey from 'lodash/findLastKey';
import hashIt from 'hash-it';
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
  createReturnForMap,
  freeze,
  getConstructor,
  getCrioValue,
  getKeysMetadata,
  getStandardValue,
  isCrio,
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
   * @returns {Crio}
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

  map(fn, thisArg = this) {
    const getValue = createReturnForMap(this, fn);
    const updated = this.isArray() ?
      map(this, getValue, thisArg) :
      reduce(this, (updatedValue, value, key) => {
        updatedValue[key] = getValue(value, key, this);

        return updatedValue;
      }, {});

    return new this.constructor(updated);
  }

  merge(...objects) {
    const merged = merge({}, this.thaw(), ...objects);

    return new this.constructor(merged);
  }

  mergeIn(keys, ...objects) {
    if (!keys || !keys.length) {
      return this;
    }

    const {
      currentValue,
      lastIndex,
      parentKeys
    } = getKeysMetadata(keys, this);

    if (!isCrio(currentValue)) {
      return this;
    }

    const updated = this.setIn(parentKeys, currentValue.merge(keys[lastIndex], ...objects));

    return new this.constructor(updated);
  }

  mutate(fn, thisArg = this) {
    const result = fn.call(thisArg, this.thaw(), this);

    return getCrioValue(result);
  }

  pluck(key) {
    return this.reduce((pluckedValues, value) => {
      return !value.hasOwnProperty(key) ? pluckedValues : [
        ...pluckedValues,
        value[key]
      ];
    }, []);
  }

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

  reduce(fn, initialValue, thisArg = this) {
    const reducedValue = reduce(this, fn, initialValue, thisArg);

    return getCrioValue(reducedValue, getConstructor(this));
  }

  reduceRight(fn, initialValue, thisArg = this) {
    const reducedValue = reduceRight(this, fn, initialValue, thisArg);

    return getCrioValue(reducedValue, getConstructor(this));
  }

  set(key, value) {
    const updated = {
      ...this,
      [key]: value
    };

    return new this.constructor(updated);
  }

  setIn(keys, value) {
    if (!keys || !keys.length) {
      return this;
    }

    const updatedObject = set(keys, value, this);

    return new this.constructor(updatedObject);
  }

  some(fn, thisArg = this) {
    return some(this, fn, thisArg);
  }

  sort(fn) {
    const sorted = sortBy(fn, this);

    return new CrioArray(sorted);
  }

  thaw() {
    let returnValue = this.isArray() ? [] : {};

    forEach(this, assignToObject(returnValue, getStandardValue));

    return returnValue;
  }

  toArray() {
    if (this.isArray()) {
      return this;
    }

    return new CrioArray(this.values());
  }

  toLocaleString() {
    return this.toString();
  }

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

  toString() {
    return stringify(this);
  }

  valueOf() {
    return this;
  }

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

  concat(items) {
    return new CrioArray([
      ...this,
      ...items
    ]);
  }

  copyWithin(target, start = 0, end = this.length) {
    const replacements = this
      .slice(start, end)
      .compact();

    return this.splice(target, replacements.length, ...replacements);
  }

  fill(value, start = 0, end = this.length) {
    const filled = fill(this, value, start, end);

    return new CrioArray(filled, this);
  }

  findIndex(fn) {
    return findKey(this, fn);
  }

  findLastIndex(fn) {
    return findLastKey(this, fn);
  }

  indexOf(value) {
    return this.findIndex((thisValue) => {
      return thisValue === value;
    });
  }

  join(separator = ',') {
    return [...this].join(separator);
  }

  pop() {
    return this.slice(0, this.length - 1);
  }

  reverse() {
    const reversed = reverse(this);

    return new CrioArray(reversed);
  }

  shift() {
    return this.slice(1);
  }

  slice(start = 0, end = this.length) {
    const sliced = slice(this, start, end);

    return new CrioArray(sliced);
  }

  splice(start = 0, deleteCount = 1, ...items) {
    let spliced = [...this];

    spliced.splice(start, deleteCount, ...items);

    return new CrioArray(spliced);
  }

  unshift(...items) {
    if (!items.length) {
      return this;
    }

    return this.concat(items);
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
