// external dependencies
import stringify from 'json-stringify-safe';
import hashIt from 'hash-it';
import {parse} from 'pathington';
import {get, has, merge, remove, set} from 'unchanged';

// classes
import CrioObject from './CrioObject';

// constants
import {ARRAY_FALLBACK_PROTOTYPE_METHODS, ARRAY_UNSCOPABLES} from './constants';

// is
import {isArray, isEqual, isUndefined} from './is';

// utils
import {
  createIterator,
  find,
  getCrioedObject,
  getEntries,
  getRelativeValue,
  getValues,
  thaw
} from './utils';

let hasAppliedPrototype = false;

class CrioArray extends Array {
  constructor(array) {
    super(isArray(array) ? array.length : array || 0);

    if (!hasAppliedPrototype) {
      applyPrototype();

      hasAppliedPrototype = true;
    }

    return isArray(array)
      ? array.reduce((crioArray, item, index) => {
          crioArray[index] = getCrioedObject(item);

          return crioArray;
        }, this)
      : this;
  }

  get hashCode() {
    return hashIt(this);
  }

  /**
   * @function clear
   * @memberof CrioArray
   *folder
   * @description
   * get a new empty array
   *
   * @returns {CrioArray} the empty array
   */
  clear() {
    return new CrioArray();
  }

  /**
   * @function compact
   * @memberof CrioArray
   *
   * @description
   * get a new array with values from the original array that are truthy
   *
   * @returns {CrioArray} the array with only truthy values
   */
  compact() {
    return this.filter((item) => {
      return !!item;
    });
  }

  /**
   * @function copyWithin
   *
   * @description
   * move values around within the array
   *
   * @param {number} targetIndex target to copy
   * @param {number} [startIndex=0] index to start copying to
   * @param {number} [endIndex=this.length] index to stop copying to
   * @returns {CrioArray} array with target copied in appropriate spots
   */
  copyWithin(targetIndex, startIndex = 0, endIndex = this.length) {
    const clone = [...this];
    const length = this.length >>> 0;

    let to = getRelativeValue(targetIndex >> 0, length),
      from = getRelativeValue(startIndex >> 0, length);

    const final = getRelativeValue(endIndex >> 0, length);

    let count = Math.min(final - from, length - to),
      direction = 1;

    if (from < to && to < from + count) {
      direction = -1;
      from += count - 1;
      to += count - 1;
    }

    while (count > 0) {
      if (from in clone) {
        clone[to] = clone[from];
      } else {
        delete clone[to];
      }

      from += direction;
      to += direction;
      count--;
    }

    return new this.constructor(clone);
  }

  /**
   * @function delete
   * @memberof CrioArray
   *
   * @description
   * delete the value in the array at key, either shallow or deep
   *
   * @param {Array<number|string>|number} key the key to delete
   * @returns {CrioArray} the array with the key deleted
   */
  delete(key) {
    return new CrioArray(remove(key, this));
  }

  /**
   * @function difference
   * @memberof CrioArray
   *
   * @description
   * find the values in this that do not exist in any of the arrays passed
   *
   * @param {...Array<Array<*>>} arrays arrays to get the difference of
   * @returns {CrioArray} array of items matching diffference criteria
   */
  difference(...arrays) {
    if (!arrays.length) {
      return this;
    }

    let indexOfItem;

    return new CrioArray(
      arrays.reduce((differenceArray, array) => {
        if (isArray(array)) {
          array.forEach((item) => {
            indexOfItem = differenceArray.indexOf(item);

            if (~indexOfItem) {
              differenceArray = differenceArray.splice(indexOfItem, 1);
            }
          });
        }

        return differenceArray;
      }, this.values())
    );
  }

  /**
   * @function entries
   * @memberof CrioArray
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
   * @memberof CrioArray
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
   * @function fill
   *
   * @description
   * fill the array at certain indices with the value passed
   *
   * @param {*} value the value to fill the indices with
   * @param {number} [startIndex=0] the starting index to fill
   * @param {number} [endIndex=this.length] the ending index to fill
   * @returns {CrioArray} array with values filled appropriately
   */
  fill(value, startIndex = 0, endIndex = this.length) {
    const from = startIndex < 0 ? this.length + startIndex : startIndex;
    const to = endIndex < 0 ? this.length + endIndex : endIndex;

    return this.map((item, index) => {
      return index >= from && index < to ? value : item;
    });
  }

  /**
   * @function findLast
   * @memberof CrioArray
   *
   * @description
   * find an item in the crio if it exists, starting from the end and iteratng to the start
   *
   * @param {function} fn function to test for finding the item
   * @param {number} [fromIndex] key to start from when performing the find
   * @returns {*} found item or undefined
   */
  findLast(fn, fromIndex) {
    return find(this, fn, fromIndex, false, true);
  }

  /**
   * @function findLastIndex
   * @memberof CrioArray
   *
   * @description
   * find the matching index based on truthy return from fn starting from end
   *
   * @param {function} fn function to use for test in iteration
   * @param {number} [fromIndex] key to start from when performing the find
   * @returns {number} index of match, or -1
   */
  findLastIndex(fn, fromIndex) {
    return find(this, fn, fromIndex, true, true);
  }

  /**
   * @function first
   * @memberof CrioArray
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
   * @function forEach
   * @memberof CrioArray
   *
   * @description
   * iterate over the array executing fn
   *
   * @param {function} fn the function to execute
   * @returns {CrioArray} the original array
   */
  forEach(fn) {
    Array.prototype.forEach.call(this, fn);

    return this;
  }

  /**
   * @function get
   * @memberof CrioArray
   *
   * @description
   * get the item at key passed, either shallow or deeply nested
   *
   * @param {Array<number|string>|number} key key to retrieve
   * @returns {*} item found at key
   */
  get(key) {
    return get(key, this);
  }

  /**
   * @function has
   * @memberof CrioArray
   *
   * @description
   * does the crio have the key passed, either shallow or deeply nested
   *
   * @param {Array<number|string>|number} key key to test
   * @returns {boolean} does the crio have the key
   */
  has(key) {
    return has(key, this);
  }

  /**
   * @function intersection
   * @memberof CrioArray
   *
   * @description
   * find the values in that exist in this and each of the arrays passed
   *
   * @param {...Array<Array>} arrays to find the intersecting values of
   * @returns {CrioArray} array of values that exist in all arrays
   */
  intersection(...arrays) {
    if (!arrays.length) {
      return this;
    }

    let indices = [],
      indexOfItem;

    const reducedArrays = [this, ...arrays].reduce((items, array) => {
      if (isArray(array)) {
        array.forEach((item) => {
          indexOfItem = items.indexOf(item);

          if (~indexOfItem) {
            return indices[indexOfItem]++;
          }

          indices[items.length] = 1;
          items.push(item);
        });
      }

      return items;
    }, []);

    const newLength = arrays.length + 1;

    return new CrioArray(
      reducedArrays.filter((itemIgnored, index) => {
        return indices[index] === newLength;
      })
    );
  }

  /**
   * @function isArray
   * @memberof CrioArray
   *
   * @description
   * is the crio an array
   *
   * @returns {boolean} is the crio an array
   */
  isArray() {
    return true;
  }

  /**
   * @function isObject
   * @memberof CrioArray
   *
   * @description
   * is the crio an object
   *
   * @returns {boolean} is the crio an object
   */
  isObject() {
    return false;
  }

  /**
   * @function join
   * @memberof CrioArray
   *
   * @description
   * join the values in the crio as a string, combined with separator
   *
   * @param {string} [separator] character(s) to place between strings in combination
   * @returns {string} parameters joined by separator in string
   */
  join(separator) {
    return this.thaw().join(separator);
  }

  /**
   * @function keys
   * @memberof CrioArray
   *
   * @description
   * get the keys of the crio
   *
   * @returns {CrioArray<number>} keys in the crio
   */
  keys() {
    return new CrioArray(Object.keys(this).map(Number));
  }

  /**
   * @function last
   * @memberof CrioArray
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
   * @function map
   * @memberof CrioArray
   *
   * @description
   * map over the array returning the mapped items
   *
   * @param {function} fn the function to map
   * @returns {CrioArray} the mapped array
   */
  map(fn) {
    return Array.prototype.map.call(this, (item, index) => {
      return getCrioedObject(fn(item, index, this));
    });
  }

  /**
   * @function merge
   * @memberof CrioArray
   *
   * @description
   * merge arrays with the original array
   *
   * @param {Array<number|string>|number|null} key the key to merge into
   * @param {...Array<CrioArray>} objects objects to merge with the crio
   * @returns {CrioArray} merged array
   */
  merge(key, ...objects) {
    return objects.reduce((mergedObject, object) => {
      return merge(key, getCrioedObject(object), mergedObject);
    }, this);
  }

  /**
   * @function mutate
   * @memberof CrioArray
   *
   * @description
   * work with the array in a mutated way and return the crioed result of that call
   *
   * @param {function} fn function to apply to crio
   * @returns {*} crioed value resulting from the call
   */
  mutate(fn) {
    return getCrioedObject(fn(this.thaw(), this));
  }

  /**
   * @function pluck
   * @memberof CrioArray
   *
   * @description
   * get the values in each object in the collection at key, either shallow or deeply nested
   *
   * @param {string} key key to find value of in collection object
   * @returns {CrioArray} array of plucked values
   */
  pluck(key) {
    const parsedKey = parse(key);

    const arrayToPluck = get(parsedKey.slice(0, parsedKey.length - 1), this);
    const finalKey = parsedKey.slice(-1);

    return new CrioArray(
      arrayToPluck.map((item) => {
        return get(finalKey, item);
      })
    );
  }

  /**
   * @function pop
   * @memberof CrioArray
   *
   * @description
   * get crio based on current crio with last item removed
   *
   * @returns {CrioArray} array with the last value removed
   */
  pop() {
    return this.slice(0, this.length - 1);
  }

  /**
   * @function push
   * @memberof CrioArray
   *
   * @description
   * push one to many items to the current crio
   *
   * @param {...Array<*>} items the items to add to the array
   * @returns {CrioArray} array with the values added
   */
  push(...items) {
    return items.length ? this.concat(items) : this;
  }

  /**
   * @function reverse
   * @memberof CrioArray
   *
   * @description
   * get the same values, but in reverse order
   *
   * @returns {CrioArray} array with the items reversed in order
   */
  reverse() {
    return new CrioArray([...this].reverse());
  }

  /**
   * @function set
   * @memberof CrioArray
   *
   * @description
   * set the value at the key passed
   *
   * @param {Array<number|string>|number} key key to assign value to
   * @param {*} value value to assign
   * @returns {CrioArray} array with value set at key
   */
  set(key, value) {
    return set(key, getCrioedObject(value), this);
  }

  /**
   * @function shift
   * @memberof CrioArray
   *
   * @description
   * get crio based on current crio with first item removed
   *
   * @returns {CrioArray} array with the first item removed
   */
  shift() {
    return this.slice(1);
  }

  /**
   * @function sort
   * @memberof CrioArray
   *
   * @description
   * sort the collection by the fn passed
   *
   * @param {function} fn the function to sort based on
   * @returns {CrioArray} array with the items sorted
   */
  sort(fn) {
    const clone = [...this];

    clone.sort(fn);

    return new CrioArray(clone);
  }

  /**
   * @function splice
   * @memberof CrioArray
   *
   * @description
   * splice the values into or out of the array
   *
   * @param {number} [start=0] starting index to splice
   * @param {number} [deleteCount=1] length from starting index to removes
   * @param {...Array<*>} items items to insert after delete is complete
   * @returns {CrioArray} array with the value spliced in / out
   */
  splice(...args) {
    const clone = [...this];

    clone.splice(...args);

    return new CrioArray(clone);
  }

  /**
   * @function thaw
   * @memberof CrioArray
   *
   * @description
   * create a plain JS version of the array
   *
   * @returns {Array<*>} plain JS version of the array
   */
  thaw() {
    return thaw(this);
  }

  /**
   * @function toArray
   * @memberof CrioArray
   *
   * @description
   * convert the array to an array
   *
   * @returns {CrioArray} the array
   */
  toArray() {
    return this;
  }

  /**
   * @function toLocaleString
   * @memberof CrioArray
   *
   * @description
   * convert the array to stringified form
   *
   * @param {function} [serializer] the serialization method to use
   * @param {number} [indent] the number of spaces to indent the values
   * @returns {string} stringified array
   */
  toLocaleString(serializer, indent) {
    return this.toString(serializer, indent);
  }

  /**
   * @function toObject
   * @memberof CrioArray
   *
   * @description
   * convert the crio to an object if it isnt already
   *
   * @returns {CrioObject} new object from the array
   */
  toObject() {
    return new CrioObject(
      this.reduce((object, item, index) => {
        object[index] = item;

        return object;
      }, {})
    );
  }

  /**
   * @function toString
   * @memberof CrioArray
   *
   * @description
   * convert the array to stringified form
   *
   * @param {function} [serializer] the serialization method to use
   * @param {number} [indent] the number of spaces to indent the values
   * @returns {string} stringified array
   */
  toString(serializer, indent) {
    return stringify(this, serializer, indent);
  }

  /**
   * @function unique
   * @memberof CrioArray
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
      hashCode,
      storeValue;

    return this.filter((item) => {
      hashCode = item ? item.hashCode : undefined;
      hasHashCode = !isUndefined(hashCode);
      storeValue =
        !~newArray.indexOf(item) &&
        (!hasHashCode || !~hashArray.indexOf(hashCode));

      if (storeValue) {
        newArray.push(item);

        if (hasHashCode) {
          hashArray.push(hashCode);
        }
      }

      return storeValue;
    });
  }

  /**
   * @function unshift
   * @memberof CrioArray
   *
   * @description
   * add items passed to the beginning of the crio array
   *
   * @param {...Array<*>} items items to prepend to the array
   * @returns {CrioArray} array with the items prepended
   */
  unshift(...items) {
    return items.length ? new CrioArray([...items, ...this]) : this;
  }

  /**
   * @function valueOf
   * @memberof CrioArray
   *
   * @description
   * get the array value
   *
   * @returns {CrioArray} the array
   */
  valueOf() {
    return this;
  }

  /**
   * @function values
   * @memberof CrioArray
   *
   * @description
   * get the values of the array as an array
   *
   * @returns {CrioArray} values in the array
   */
  values() {
    return getValues(this);
  }

  /**
   * @function xor
   * @memberof CrioArray
   *
   * @description
   * find the values that are the symmetric difference of this and the arrays passed
   *
   * @param {Array<Array>} arrays arrays to find symmetric values in
   * @returns {CrioArray} array of the symmetric differences of all the arrays
   */
  xor(...arrays) {
    if (!arrays.length) {
      return this;
    }

    let indicesToRemove = [],
      indexOfItem;

    const reducedItems = [this, ...arrays].reduce((items, array) => {
      if (isArray(array)) {
        array.forEach((item) => {
          indexOfItem = items.indexOf(item);

          if (~indexOfItem) {
            indicesToRemove.push(indexOfItem);
          } else {
            items.push(item);
          }
        });
      }

      return items;
    }, []);

    return new CrioArray(
      reducedItems.filter((itemIgnored, index) => {
        return !~indicesToRemove.indexOf(index);
      })
    );
  }
}

Object.keys(ARRAY_FALLBACK_PROTOTYPE_METHODS).forEach((key) => {
  if (typeof Array.prototype[key] !== 'function') {
    CrioArray.prototype[key] = function(...args) {
      return ARRAY_FALLBACK_PROTOTYPE_METHODS[key](this, ...args);
    };
  }
});

export function applyPrototype() {
  if (typeof Symbol === 'function') {
    if (Symbol.species) {
      Object.defineProperty(CrioArray, Symbol.species, {
        configurable: false,
        enumerable: false,
        get() {
          return CrioArray;
        }
      });
    }

    if (Symbol.iterator) {
      Object.defineProperty(CrioArray.prototype, Symbol.iterator, {
        configurable: false,
        enumerable: false,
        value: createIterator(),
        writable: false
      });
    }

    if (Symbol.unscopables) {
      Object.defineProperty(CrioArray.prototype, Symbol.unscopables, {
        configurable: false,
        enumerable: false,
        value: ARRAY_UNSCOPABLES,
        writable: false
      });
    }
  }
}

export default CrioArray;
