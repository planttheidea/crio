// external dependencies
import stringify from 'json-stringify-safe';
import {parse} from 'pathington';
import hashIt from 'hash-it';
import {get, has, merge, remove, set} from 'unchanged';

// classes
import CrioArray from './CrioArray';

// constants
import {OBJECT_UNSCOPABLES} from './constants';

// is
import {isCrio, isEqual, isObject} from './is';

// utils
import {
  createIterator,
  getCrioedObject,
  getEntries,
  getValues,
  every,
  find,
  some,
  thaw
} from './utils';

let hasAppliedPrototype;

class CrioObject {
  constructor(object) {
    const objectKeys = isObject(object) ? Object.keys(object) : [];

    if (!hasAppliedPrototype) {
      applyPrototype();

      hasAppliedPrototype = true;
    }

    if (isCrio(object)) {
      return object.toObject();
    }

    return objectKeys.reduce((crioObject, key) => {
      crioObject[key] = getCrioedObject(object[key]);

      return crioObject;
    }, this);
  }

  get hashCode() {
    return hashIt(this);
  }

  get size() {
    return Object.keys(this).length;
  }

  /**
   * @function clear
   * @memberof CrioObject
   *
   * @description
   * get a new crio that is empty
   *
   * @returns {CrioObject} an empty object
   */
  clear() {
    return new CrioObject();
  }

  /**
   * @function compact
   * @memberof CrioObject
   *
   * @description
   * get a new object with values from the original array that are truthy
   *
   * @returns {CrioObject} the object with only truthy values
   */
  compact() {
    return this.filter((item) => {
      return !!item;
    });
  }

  /**
   * @function delete
   * @memberof CrioObject
   *
   * @description
   * delete the value in the object at key, either shallow or deep
   *
   * @param {Array<number|string>|sring} key the key to delete
   * @returns {CrioObject} the array with the key deleted
   */
  delete(key) {
    return remove(key, this);
  }

  /**
   * @function entries
   * @memberof CrioObject
   *
   * @description
   * get the pairs of [key, value] in the crio
   *
   * @returns {CrioArray} [key, value] pairs
   */
  entries() {
    return getEntries(this);
  }

  /**
   * @function equals
   * @memberof CrioObject
   *
   * @description
   * does the object passed equal the crio
   *
   * @param {*} object object to compare against the instance
   * @returns {boolean} is the object equivalent in value
   */
  equals(object) {
    return isEqual(this, object);
  }

  /**
   * @function every
   * @memberof CrioObject
   *
   * @description
   * does every instance in the object match
   *
   * @param {function} fn the function to test for matching
   * @returns {boolean} does every instance match
   */
  every(fn) {
    return every(this, fn);
  }

  /**
   * @function filter
   * @memberof CrioObject
   *
   * @description
   * filter the object based on the fn passed
   *
   * @param {function} fn function to test for if it should be included in the result set
   * @returns {CrioObject} new crio instance
   */
  filter(fn) {
    return new CrioObject(
      Object.keys(this).reduce((object, key) => {
        if (fn(this[key], key, object)) {
          object[key] = this[key];
        }

        return object;
      }, {})
    );
  }

  /**
   * @function find
   * @memberof CrioObject
   *
   * @description
   * find an item in the crio if it exists
   *
   * @param {function} fn function to test for finding the item
   * @param {string} [fromKey] key to start from when performing the find
   * @returns {*} found item or undefined
   */
  find(fn, fromKey) {
    return find(this, fn, fromKey);
  }

  /**
   * @function findKey
   * @memberof CrioObject
   *
   * @description
   * find the key of an item in the crio if it exists
   *
   * @param {function} fn function to test for finding the item
   * @param {number} [fromKey] key to start from when performing the find
   * @returns {number} index of match, or -1
   */
  findKey(fn, fromKey) {
    return find(this, fn, fromKey, true);
  }

  /**
   * @function findLast
   * @memberof CrioObject
   *
   * @description
   * find an item in the crio if it exists, starting from the end and iteratng to the start
   *
   * @param {function} fn function to test for finding the item
   * @param {number} [fromKey] key to start from when performing the find
   * @returns {*} found item or undefined
   */
  findLast(fn, fromKey) {
    return find(this, fn, fromKey, false, true);
  }

  /**
   * @function findLastKey
   * @memberof CrioObject
   *
   * @description
   * find the matching index based on truthy return from fn starting from end
   *
   * @param {function} fn function to use for test in iteration
   * @param {number} [fromKey] key to start from when performing the find
   * @returns {number} index of match, or -1
   */
  findLastKey(fn, fromKey) {
    return find(this, fn, fromKey, true, true);
  }

  /**
   * @function forEach
   * @memberof CrioObject
   *
   * @description
   * iterate over the object calling fn
   *
   * @param {function} fn function to call in iteration
   * @returns {CrioObject} the original object
   */
  forEach(fn) {
    Object.keys(this).forEach((key) => {
      fn(this[key], key, this);
    });

    return this;
  }

  /**
   * @function get
   * @memberof CrioObject
   *
   * @description
   * get the item at key passed, either shallow or deeply nested
   *
   * @param {Array<number|string>|string} key key to retrieve
   * @returns {*} item found at key
   */
  get(key) {
    return get(key, this);
  }

  /**
   * @function has
   * @memberof CrioObject
   *
   * @description
   * does the crio have the key passed, either shallow or deeply nested
   *
   * @param {Array<number|string>|string} key key to test
   * @returns {boolean} does the crio have the key
   */
  has(key) {
    return has(key, this);
  }

  /**
   * @function includes
   * @memberof CrioObject
   *
   * @description
   * does the object have the item passed
   *
   * @param {*} item item to test for existence
   * @returns {boolean} does the item exist in the crio
   */
  includes(item) {
    return this.some((value) => {
      return value === item;
    });
  }

  /**
   * @function isArray
   * @memberof CrioObject
   *
   * @description
   * is the crio an array
   *
   * @returns {boolean} is the crio an array
   */
  isArray() {
    return false;
  }

  /**
   * @function isObject
   * @memberof CrioObject
   *
   * @description
   * is the crio an object
   *
   * @returns {boolean} is the crio an object
   */
  isObject() {
    return true;
  }

  /**
   * @function keyOf
   * @memberof CrioObject
   *
   * @description
   * get the key for the item passed
   *
   * @param {*} item the item to search for
   * @returns {string} the key of match, or undefined
   */
  keyOf(item) {
    return this.findKey((value) => {
      return value === item;
    });
  }

  /**
   * @function keys
   * @memberof CrioObject
   *
   * @description
   * get the keys of the crio
   *
   * @returns {CrioArray<string>} keys in the crio
   */
  keys() {
    return new CrioArray(Object.keys(this));
  }

  /**
   * @function lastKeyOf
   * @memberof CrioObject
   *
   * @description
   * get the key for the item passed, starting from the end of the array and iterating towards the start
   *
   * @param {*} item the item to search for
   * @returns {string} the key of match, or undefined
   */
  lastKeyOf(item) {
    return this.findLastKey((value) => {
      return value === item;
    });
  }

  /**
   * @function map
   * @memberof CrioObject
   *
   * @description
   * iterate over the object mapping the result of fn to the key
   *
   * @param {function} fn function to call on iteration
   * @returns {Crio} the mapped object
   */
  map(fn) {
    return Object.keys(this).reduce((object, key) => {
      object[key] = getCrioedObject(fn(this[key], key, this));

      return object;
    }, new CrioObject({}));
  }

  /**
   * @function merge
   * @memberof CrioObject
   *
   * @description
   * merge objects with the original object
   *
   * @param {Array<number|string>|number|null} key the key to merge into
   * @param {...Array<CrioObject>} objects objects to merge with the crio
   * @returns {CrioObject} new crio instance
   */
  merge(key, ...objects) {
    return objects.reduce((mergedObject, object) => {
      return merge(key, getCrioedObject(object), mergedObject);
    }, this);
  }

  /**
   * @function mutate
   * @memberof CrioObject
   *
   * @description
   * work with the object in a mutated way and return the crioed result of that call
   *
   * @param {function} fn function to apply to crio
   * @returns {*} crioed value resulting from the call
   */
  mutate(fn) {
    return getCrioedObject(fn(this.thaw(), this));
  }

  /**
   * @function pluck
   * @memberof CrioObject
   *
   * @description
   * get the values in each object in the collection at key, either shallow or deeply nested
   *
   * @param {string} key key to find value of in collection object
   * @returns {CrioArray} array of plucked values
   */
  pluck(key) {
    const parsedKey = parse(key);

    const objectToPluck = get(parsedKey.slice(0, parsedKey.length - 1), this);
    const finalKey = parsedKey.slice(-1);

    return objectToPluck
      .map((item) => {
        return get(finalKey, item);
      })
      .values();
  }

  /**
   * @function reduce
   * @memberof CrioObject
   *
   * @description
   * reduce the crio down to a single value, starting with initial value
   *
   * @param {function} fn the function to iterate with
   * @param {*} initialValue the initial value of the reduction
   * @returns {*} the reduced value
   */
  reduce(fn, initialValue) {
    return getCrioedObject(
      Object.keys(this).reduce((value, key) => {
        return fn(value, this[key], key, this);
      }, initialValue)
    );
  }

  /**
   * @function reduceRight
   * @memberof CrioObject
   *
   * @description
   * reduce the crio down to a single value, starting with initial value, starting from the end of the array
   * and iterating to the start
   *
   * @param {function} fn the function to iterate with
   * @param {*} initialValue the initial value of the reduction
   * @returns {*} the reduced value
   */
  reduceRight(fn, initialValue) {
    return getCrioedObject(
      Object.keys(this)
        .reverse()
        .reduce((value, key) => {
          return fn(value, this[key], key, this);
        }, initialValue)
    );
  }

  /**
   * @function set
   * @memberof CrioObject
   *
   * @description
   * set the value at the key passed
   *
   * @param {Array<number|string>|string} key key to assign value to
   * @param {*} value value to assign
   * @returns {CrioObject} object with value set at key
   */
  set(key, value) {
    return set(key, getCrioedObject(value), this);
  }

  /**
   * @function some
   * @memberof CrioObject
   *
   * @description
   * does any item in the object match the result from fn
   *
   * @param {function} fn the function to test for matching
   * @returns {boolean} does any item match
   */
  some(fn) {
    return some(this, fn);
  }

  /**
   * @function sort
   * @memberof CrioObject
   *
   * @description
   * sort the collection by the fn passed
   *
   * @param {function} fn the function to sort based on
   * @returns {CrioObject} object with the items sorted
   */
  sort(fn) {
    return new CrioObject(
      Object.keys(this)
        .sort(fn)
        .reduce((object, key) => {
          object[key] = this[key];

          return object;
        }, {})
    );
  }

  /**
   * @function thaw
   * @memberof CrioObject
   *
   * @description
   * create a plain JS version of the object
   *
   * @returns {Object} plain JS version of the object
   */
  thaw() {
    return thaw(this);
  }

  /**
   * @function toArray
   * @memberof CrioObject
   *
   * @description
   * convert the object to an array
   *
   * @returns {CrioArray} the object converted to an array of its values
   */
  toArray() {
    return this.values();
  }

  /**
   * @function toLocaleString
   * @memberof CrioObject
   *
   * @description
   * convert the object to stringified form
   *
   * @param {function} [serializer] the serialization method to use
   * @param {number} [indent] the number of spaces to indent the values
   * @returns {string} stringified object
   */
  toLocaleString(serializer, indent) {
    return this.toString(serializer, indent);
  }

  /**
   * @function toObject
   * @memberof CrioObject
   *
   * @description
   * convert the object to an objectobject
   *
   * @returns {CrioObject} the object
   */
  toObject() {
    return this;
  }

  /**
   * @function toString
   * @memberof CrioObject
   *
   * @description
   * convert the object to stringified form
   *
   * @param {function} [serializer] the serialization method to use
   * @param {number} [indent] the number of spaces to indent the values
   * @returns {string} stringified object
   */
  toString(serializer, indent) {
    return stringify(this, serializer, indent);
  }

  /**
   * @function valueOf
   * @memberof CrioObject
   *
   * @description
   * get the object value
   *
   * @returns {CrioObject} the object
   */
  valueOf() {
    return this;
  }

  /**
   * @function values
   * @memberof CrioObject
   *
   * @description
   * get the values of the object as an array
   *
   * @returns {CrioObject} values in the object
   */
  values() {
    return getValues(this);
  }
}

export function applyPrototype() {
  if (typeof Symbol === 'function') {
    if (Symbol.species) {
      Object.defineProperty(CrioObject, Symbol.species, {
        configurable: false,
        enumerable: false,
        get() {
          return CrioObject;
        }
      });
    }

    if (Symbol.iterator) {
      Object.defineProperty(CrioObject.prototype, Symbol.iterator, {
        configurable: false,
        enumerable: false,
        value: createIterator(),
        writable: false
      });
    }

    if (Symbol.unscopables) {
      Object.defineProperty(CrioObject.prototype, Symbol.unscopables, {
        configurable: false,
        enumerable: false,
        value: OBJECT_UNSCOPABLES,
        writable: false
      });
    }
  }
}

export default CrioObject;
