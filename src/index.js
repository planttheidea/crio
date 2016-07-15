import 'core-js/fn/symbol';

import 'core-js/fn/object/entries';
import 'core-js/fn/object/keys';
import 'core-js/fn/object/values';

import {
  CRIO_ARRAY_TYPE,
  CRIO_OBJECT_TYPE,
  forEach,
  forEachRight,
  getHashIfChanged,
  hash,
  isArray,
  isCrio,
  isReactElement,
  isObject,
  isUndefined,
  setNonEnumerable,
  setStandard,
  shallowCloneArray,
  shallowCloneObject,
  stringify
} from './utils';

const objectAssign = Object.assign;
const objectEntries = Object.entries;
const objectFreeze = Object.freeze;
const objectKeys = Object.keys;
const objectValues = Object.values;

const ARRAY_PROTOTYPE = Array.prototype;
const OBJECT_PROTOTYPE = Object.prototype;

const NATIVE_KEYS = {
  $$hashCode: true,
  $$type: true,
  length: true
};

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * if NODE_ENV is not production then don't freeze for
 * performance reasons, else freeze the object
 *
 * @param {CrioArray|CrioObject} crio
 * @returns {CrioArray|CrioObject}
 */
const freezeIfNotProduction = (crio) => {
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
const getRealValue = (value, hashValue) => {
  if (isCrio(value) || isReactElement(value)) {
    return value;
  }

  if (isArray(value)) {
    return new CrioArray(value, hashValue);
  }

  if (isObject(value)) {
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
const getShallowClone = (object) => {
  if (isArray(object)) {
    return shallowCloneArray(object);
  }

  return shallowCloneObject(object);
};

/**
 * based on the hashCode, return a new Crio if things have changed, else return the original crio
 *
 * @param {CrioArray|CrioObject} crio
 * @param {array<any>|object} newObject
 * @param {CrioArray|CrioObject} CrioConstructor
 * @param {boolean} needsReplacer
 * @returns {CrioArray|CrioObject|array<any>|object}
 */
const returnCorrectObject = (crio, newObject, CrioConstructor, needsReplacer) => {
  const hashValue = getHashIfChanged(crio, newObject, needsReplacer);

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
const mergeOnDeepMatch = (object, keys, values, CrioConstructor) => {
  const lastIndex = keys.length - 1;

  let currentObject = getShallowClone(object),
      referenceToCurrentObject = currentObject,
      currentValue;

  forEach(keys, (key, keyIndex) => {
    currentValue = currentObject[key];

    if (isCrio(currentValue)) {
      currentObject[key] = getShallowClone(currentValue);
    } else {
      currentObject[key] = {};
    }

    if (keyIndex === lastIndex) {
      currentObject[key] = objectAssign(currentObject[key], ...values);
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
const deleteOnDeepMatch = (object, keys, CrioConstructor) => {
  const length = keys.length;
  const lastIndex = length - 1;

  let currentObject = getShallowClone(object),
      referenceToCurrentObject = currentObject,
      currentValue;

  let index = -1,
      matchFound = false;

  while (++index < length) {
    const key = keys[index];

    if (index === lastIndex) {
      matchFound = true;

      delete currentObject[key];
    }

    if (isUndefined(currentObject[key])) {
      break;
    }

    currentValue = currentObject[key];

    if (isCrio(currentValue)) {
      currentObject[key] = getShallowClone(currentValue);
    }

    currentObject = currentObject[key];
  }

  if (matchFound) {
    return returnCorrectObject(object, referenceToCurrentObject, CrioConstructor);
  }

  return object;
};

const getNeedsReplacer = (item, object = item) => {
  if (!item && !object) {
    return false;
  }

  return isReactElement(item) || !!object.$$needsReplacer;
};

class CrioArray {
  constructor(array, hashValue) {
    if (isCrio(array)) {
      return array;
    }

    let needsReplacer = false;

    forEach(array, (item, index) => {
      this[index] = getRealValue(item);

      if (!needsReplacer) {
        needsReplacer = getNeedsReplacer(this[index]);
      }
    });

    const hashCode = isUndefined(hashValue) ? hash(array, needsReplacer) : hashValue;

    setNonEnumerable(this, '$$hashCode', hashCode);
    setNonEnumerable(this, '$$needsReplacer', needsReplacer);
    setNonEnumerable(this, 'length', array.length);

    return freezeIfNotProduction(this);
  }

  /**
   * return type of CrioArray
   *
   * @return {string}
   */
  get $$type() {
    return CRIO_ARRAY_TYPE;
  }

  /**
   * return empty CrioArray
   * 
   * @return {CrioArray}
   */
  clear() {
    if (!this.length) {
      return this;
    }
    
    return new CrioArray([]);
  }

  /**
   * return new CrioArray with all falsy values removed
   * 
   * @return {CrioArray}
   */
  compact() {
    return this.filter((value) => {
      return !!value;
    });
  }

  /**
   * based on items passed, combine with this to create new CrioArray
   *
   * @param {array<array>} arrays
   * @returns {CrioArray}
   */
  concat(...arrays) {
    if (!arrays.length) {
      return this;
    }

    const clone = shallowCloneArray(this);
    const concattedArray = ARRAY_PROTOTYPE.concat.apply(clone, arrays);

    return new CrioArray(concattedArray);
  }

  /**
   * based on arguments passed, return new CrioArray with copyWithin applied
   *
   * @param {number} target
   * @param {number} start=0
   * @param {number} end=this.length
   * @returns {CrioArray}
   */
  copyWithin(target, start = 0, end = this.length) {
    if (isUndefined(target)) {
      return this;
    }

    const replacements = ARRAY_PROTOTYPE.slice.call(this, start, end).filter(() => {
      return true;
    });

    return this.splice(target, replacements.length, ...replacements);
  }

  /**
   * remove item from the array
   *
   * @param {number} key
   * @return {CrioArray}
   */
  delete(key) {
    if (!this.has(key)) {
      return this;
    }

    const index = +key;

    let clone = [];

    forEach(this, (item, itemIndex) => {
      if (itemIndex !== index) {
        clone.push(item);
      }
    });

    return new CrioArray(clone);
  }

  /**
   * delete deeply-nested key in this based on keys passed
   *
   * @param {array<string|number>} keys
   * @return {CrioObject}
   */
  deleteIn(keys) {
    if (!isArray(keys)) {
      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
    }

    if (!keys.length) {
      return this;
    }

    return deleteOnDeepMatch(this, keys, CrioArray);
  }

  /**
   * returns an oterable array of [index, value] pairs
   *
   * @returns {array<array>}
   */
  entries() {
    return objectEntries(this);
  }

  /**
   * is the object passed equal in value to this
   *
   * @param {any} object
   * @returns {boolean}
   */
  equals(object) {
    if (!isCrio(object)) {
      return false;
    }

    return this.$$hashCode === object.$$hashCode;
  }

  /**
   * does the function applied to every value in this return truthy
   *
   * @param {function} fn
   * @param {any} thisArg
   * @returns {boolean}
   */
  every(fn, thisArg = this) {
    return ARRAY_PROTOTYPE.every.call(this, fn, thisArg);
  }

  /**
   * fill this based on arguments and return new CrioArray
   *
   * @param {any} value
   * @param {number} start=0
   * @param {number} end=this.length
   * @returns {CrioArray}
   */
  fill(value, start = 0, end = this.length) {
    const filledArray = ARRAY_PROTOTYPE.map.call(this, (currentValue, index) => {
      if (index >= start && index < end) {
        return value;
      }

      return currentValue;
    });

    return returnCorrectObject(this, filledArray, CrioArray);
  }

  /**
   * based on return values of fn being truthy, return a new reduced CrioArray
   * from this
   *
   * @param {function} fn
   * @param {any} thisArg
   * @returns {CrioArray}
   */
  filter(fn, thisArg = this) {
    const filteredArray = ARRAY_PROTOTYPE.filter.call(this, fn, thisArg);

    return returnCorrectObject(this, filteredArray, CrioArray, this.$$needsReplacer);
  }

  /**
   * find a specific value in the CrioArray and return it, else return undefined
   *
   * @param {function} fn
   * @param {any} thisArg
   * @returns {any}
   */
  find(fn, thisArg = this) {
    let index = -1,
        value;

    while (++index < this.length) {
      value = this[index];

      if (fn.call(this, value, index, thisArg)) {
        return value;
      }
    }

    return undefined;
  }

  /**
   * find a specific value in the CrioArray and return its index, else return -1
   *
   * @param {function} fn
   * @param {any} thisArg
   * @returns {number}
   */
  findIndex(fn, thisArg = this) {
    let index = -1;

    while (++index < this.length) {
      if (fn.call(this, this[index], index, thisArg)) {
        return index;
      }
    }

    return -1;
  }

  /**
   * get the first n number of values from the array
   *
   * @param {number} num=1
   * @return {CrioArray}
   */
  first(num = 1) {
    if (num === this.length) {
      return this;
    }

    return this.slice(0, num);
  }

  /**
   * iterate over this and execute fn for each value
   *
   * @param {function} fn
   * @param {any} thisArg
   */
  forEach(fn, thisArg = this) {
    ARRAY_PROTOTYPE.forEach.call(this, fn, thisArg);
  }

  /**
   * retrieve the value at index from this
   *
   * @param {number} index
   * @returns {any}
   */
  get(index) {
    return this[index];
  }

  /**
   * return value at nested point based on keys in this
   *
   * @param {array<string|number>} keys
   * @return {any}
   */
  getIn(keys) {
    if (!isArray(keys)) {
      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
    }

    const length = keys.length;
    const lastIndex = length - 1;

    let currentObject = this,
        index = -1,
        key;

    while (++index < length) {
      key = keys[index];

      if (isUndefined(currentObject[key]) || index === lastIndex) {
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
  has(key) {
    return OBJECT_PROTOTYPE.hasOwnProperty.call(this, key);
  }

  /**
   * does this have a value of item contained in it
   *
   * @param {any} item
   * @returns {boolean}
   */
  includes(item) {
    return !!~this.indexOf(item);
  }

  /**
   * what is the index of item in this (if not found, defaults to -1)
   *
   * @param {any} item
   * @returns {number}
   */
  indexOf(item) {
    return ARRAY_PROTOTYPE.indexOf.call(this, item);
  }

  /**
   * joins this into string based on separator delimiting between values
   *
   * @param {string} separator
   * @returns {string}
   */
  join(separator = ',') {
    return ARRAY_PROTOTYPE.join.call(this, separator);
  }

  /**
   * returns keys of array (list of indices)
   *
   * @returns {array<string>}
   */
  keys() {
    return objectKeys(this);
  }

  /**
   * returns the last n number of items in the array
   *
   * @param {number} num=1
   * @return {CrioArray}
   */
  last(num = 1) {
    if (num === this.length) {
      return this;
    }

    return this.slice(this.length - num, this.length);
  }

  /**
   * last index of item in this
   *
   * @param {any} item
   * @returns {number}
   */
  lastIndexOf(item) {
    return ARRAY_PROTOTYPE.lastIndexOf.call(this, item);
  }

  /**
   * iterate over this and assign values returned from calling
   * fn to a new CrioArray
   *
   * @param {function} fn
   * @param {any} thisArg
   * @returns {CrioArray}
   */
  map(fn, thisArg = this) {
    let mappedArray = new Array(this.length),
        needsReplacer = false,
        result;

    forEach(this, (item, index) => {
      result = fn.call(thisArg, this[index], index, this);

      if (!needsReplacer) {
        needsReplacer = getNeedsReplacer(result);
      }

      mappedArray[index] = result;
    });

    return returnCorrectObject(this, mappedArray, CrioArray);
  }

  /**
   * shallowly merge each object into this
   *
   * @param {array<any>} objects
   * @returns {CrioArray}
   */
  merge(...objects) {
    let clone = shallowCloneArray(this),
        needsReplacer = false,
        value;

    forEach(objects, (object) => {
      clone = clone.map((key, keyIndex) => {
        value = object[keyIndex] || clone[keyIndex];

        if (!needsReplacer) {
          needsReplacer = getNeedsReplacer(value);
        }

        return value;
      });
    });

    return returnCorrectObject(this, clone, CrioArray, needsReplacer);
  }

  /**
   * deeply merge all objects into location specified by keys
   *
   * @param {array<string|number>} keys
   * @param {array<any>} objects
   * @returns {CrioArray}
   */
  mergeIn(keys, ...objects) {
    if (!isArray(keys)) {
      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
    }

    if (!objects.length) {
      return this;
    }

    return mergeOnDeepMatch(this, keys, objects, CrioArray);
  }

  /**
   * convenience function to work with mutable version of this,
   * in case many modifications need to be made and performance
   * is paramount
   *
   * @param {function} fn
   * @returns {any}
   */
  mutate(fn) {
    const result = fn.call(this, this.thaw(), this);
    const hashValue = getHashIfChanged(this, result, getNeedsReplacer(result));

    if (hashValue !== false) {
      return getRealValue(result, hashValue);
    }

    return this;
  }

  /**
   * return new CrioArray of values in collection for the property specified
   * 
   * @param {string} property
   * @return {CrioArray}
   */
  pluck(property) {
    return this.map((item) => {
      if (!item) {
        return undefined;
      }
      
      return item[property];
    });
  }

  /**
   * return array with last item removed
   *
   * @returns {CrioArray}
   */
  pop() {
    return this.slice(0, this.length - 1);
  }

  /**
   * return new CrioArray with items pushed to it
   *
   * @param {array<any>} items
   * @returns {CrioArray}
   */
  push(...items) {
    return this.concat(items);
  }

  /**
   * based on fn, reduce the CrioArray and return either the crio of the reduced object
   * or the object itself
   *
   * @param {function} fn
   * @param {any} object
   * @param {any} thisArg
   * @returns {any}
   */
  reduce(fn, object, thisArg = this) {
    const reduction = ARRAY_PROTOTYPE.reduce.call(this, fn, object, thisArg);
    const hashValue = getHashIfChanged(this, reduction, getNeedsReplacer(reduction));

    if (hashValue !== false) {
      return getRealValue(reduction, hashValue);
    }

    return this;
  }

  /**
   * based on fn, reduceRight the CrioArray and return either the crio of the reduced object
   * or the object itself
   *
   * @param {function} fn
   * @param {any} object
   * @param {any} thisArg
   * @returns {any}
   */
  reduceRight(fn, object, thisArg = this) {
    const reduction = ARRAY_PROTOTYPE.reduceRight.call(this, fn, object, thisArg);
    const hashValue = getHashIfChanged(this, reduction, getNeedsReplacer(reduction));

    if (hashValue !== false) {
      return getRealValue(reduction, hashValue);
    }

    return this;
  }

  /**
   * reverse the order of elements in the CrioArray
   *
   * @return {CrioArray}
   */
  reverse() {
    let clone = [];

    forEachRight(this, (value) => {
      clone.push(value);
    });

    return returnCorrectObject(this, clone, CrioArray, this.$$needsReplacer);
  }

  /**
   * set key to value in this and return new CrioArray
   *
   * @param {number} key
   * @param {any} value
   *
   * @returns {CrioArray}
   */
  set(key, value) {
    const index = +key;

    if (index > this.length) {
      throw new Error('Cannot set a key for sparsed array on crio objects.');
    }

    let clone = [];

    forEach(this, (item, itemIndex) => {
      clone.push(index === itemIndex ? value : item);
    });

    return returnCorrectObject(this, clone, CrioArray, getNeedsReplacer(value, this));
  }

  /**
   * deeply assign value to key in this and return new CrioArray
   *
   * @param {array<string|number>} keys
   * @param {any} value
   * @returns {CrioArray}
   */
  setIn(keys, value) {
    if (!isArray(keys)) {
      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
    }

    const lastIndex = keys.length - 1;

    let currentObject = shallowCloneArray(this),
        referenceToCurrentObject = currentObject,
        needsReplacer = getNeedsReplacer(value, this),
        currentValue;

    forEach(keys, (key, keyIndex) => {
      if (keyIndex === lastIndex) {
        currentObject[key] = value;
      } else {
        currentValue = currentObject[key];
        currentObject[key] = isCrio(currentValue) ? getShallowClone(currentValue) : {};
        currentObject = currentObject[key];
      }
    });

    return returnCorrectObject(this, referenceToCurrentObject, CrioArray, needsReplacer);
  }

  /**
   * return this with first item removed as new CrioArray
   *
   * @returns {CrioArray}
   */
  shift() {
    return this.slice(1, this.length);
  }

  /**
   * return a section of this as a new CrioArray
   *
   * @param {array<number>} args
   * @returns {CrioArray}
   */
  slice(...args) {
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
  some(fn, thisArg = this) {
    return ARRAY_PROTOTYPE.some.call(this, fn, thisArg);
  }

  /**
   * sort this and return it as a new CrioArray
   *
   * @param {function} fn
   * @returns {CrioArray}
   */
  sort(fn) {
    const clone = shallowCloneArray(this);
    const sortedArray = ARRAY_PROTOTYPE.sort.call(clone, fn);

    return returnCorrectObject(this, sortedArray, CrioArray, this.$$needsReplacer);
  }

  /**
   * based on args passed, splice this and return it as a new CrioArray
   *
   * @param {any} args
   * @returns {CrioArray}
   */
  splice(...args) {
    let clone = shallowCloneArray(this);

    clone.splice(...args);

    return returnCorrectObject(this, clone, CrioArray);
  }

  /**
   * convert this back to a vanilla array
   *
   * @returns {array<any>}
   */
  thaw() {
    let array = [];

    forEach(this, (item, index) => {
      array[index] = isCrio(item) ? item.thaw() : item;
    });

    return array;
  }

  /**
   * convert this to a locale-specific string
   *
   * @returns {string}
   */
  toLocaleString() {
    return stringify(this);
  }

  /**
   * convert this to an object of index: value pairs
   *
   * @return {CrioObject}
   */
  toObject() {
    return new CrioObject(shallowCloneObject(this));
  }

  /**
   * convert this to a string showing key: value pair combos
   *
   * @returns {string}
   */
  toString() {
    return stringify(this);
  }

  /**
   * get the unique values in the array and return new CrioArray of them
   *
   * @return {CrioArray}
   */
  unique() {
    let valuesArray = [],
        exists = false;
    
    return this.filter((item) => {
      exists = !!~valuesArray.indexOf(item);
      
      if (!exists) {
        valuesArray.push(item);
      }
      
      return !exists;
    });
  }

  /**
   * add items to the beginning of this and return it as a new CrioArray
   *
   * @param {array<any>} items
   * @returns {CrioArray}
   */
  unshift(...items) {
    if (!items.length) {
      return this;
    }

    forEach(this, (item) => {
      items.push(item);
    });

    return new CrioArray(items);
  }

  /**
   * get the iterable array of values for this
   *
   * @returns {array<any>}
   */
  values() {
    return objectValues(this);
  }

  /**
   * make CrioArray into an iterable
   *
   * @returns {{next: (function(): {value: any, done: boolean})}}
   */
  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        const value = this[index];
        const done = index >= this.length;

        index++;

        return {
          value,
          done
        };
      }
    };
  }
}

class CrioObject {
  constructor(object, hashValue) {
    if (isCrio(object) || isReactElement(object)) {
      return object;
    }

    const keys = objectKeys(object);

    let length = 0,
        needsReplacer = false;

    forEachRight(keys, (key) => {
      if (!NATIVE_KEYS[key]) {
        this[key] = getRealValue(object[key]);

        if (!needsReplacer) {
          needsReplacer = getNeedsReplacer(this[key]);
        }

        length++;
      }
    });

    const hashCode = isUndefined(hashValue) ? hash(object, needsReplacer) : hashValue;

    setNonEnumerable(this, '$$hashCode', hashCode);
    setNonEnumerable(this, '$$needsReplacer', needsReplacer);
    setNonEnumerable(this, 'length', length);

    return freezeIfNotProduction(this);
  }

  /**
   * return type of CrioObject
   *
   * @return {string}
   */
  get $$type() {
    return CRIO_OBJECT_TYPE;
  }

  /**
   * return empty CrioObject
   * 
   * @return {CrioObject}
   */
  clear() {
    if (!this.length) {
      return this;
    }
    
    return new CrioObject({});
  }

  /**
   * remove key from this
   *
   * @param {string} key
   * @return {CrioObject}
   */
  delete(key) {
    if (!this.hasOwnProperty(key)) {
      return this;
    }

    let clone = {};

    forEachRight(this.keys(), (itemKey) => {
      if (itemKey !== key) {
        clone[itemKey] = this[itemKey];
      }
    });

    return new CrioObject(clone);
  }

  /**
   * delete deeply-nested key in this based on keys passed
   *
   * @param {array<string>} keys
   * @return {CrioObject}
   */
  deleteIn(keys) {
    if (!isArray(keys)) {
      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
    }

    if (!keys.length) {
      return this;
    }

    return deleteOnDeepMatch(this, keys, CrioObject);
  }

  /**
   * return iterable array of keys in this
   *
   * @returns {array<string>}
   */
  entries() {
    return objectEntries(this);
  }

  /**
   * is the object passed equal in value to this
   *
   * @param {any} object
   * @returns {boolean}
   */
  equals(object) {
    if (!isCrio(object)) {
      return false;
    }

    return this.$$hashCode === object.$$hashCode;
  }

  /**
   * return value at key in this
   *
   * @param {string} key
   * @returns {any}
   */
  get(key) {
    return this[key];
  }

  /**
   * return value at nested point based on keys in this
   *
   * @param {array<string|number>} keys
   * @return {any}
   */
  getIn(keys) {
    if (!isArray(keys)) {
      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
    }

    const length = keys.length;
    const lastIndex = length - 1;

    let currentObject = this,
        index = -1,
        key;

    while (++index < length) {
      key = keys[index];

      if (isUndefined(currentObject[key]) || index === lastIndex) {
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
  has(key) {
    return this.hasOwnProperty(key);
  }

  /**
   * return if this has the property passed
   *
   * @param {string} property
   * @returns {boolean}
   */
  hasOwnProperty(property) {
    return OBJECT_PROTOTYPE.hasOwnProperty.call(this, property);
  }

  /**
   * return if this has the prototype of object passed
   *
   * @param {any} object
   * @returns {boolean}
   */
  isPrototypeOf(object) {
    return OBJECT_PROTOTYPE.isPrototypeOf.call(this, object);
  }

  /**
   * iterate over object and filter any returns from functions
   * that are falsy
   * 
   * @param {function} fn
   * @param {any} thisArg
   * @return {CrioObject}
   */
  filter(fn, thisArg = this) {
    let newObject = {},
        result;

    forEach(this.keys(), (key) => {
      result = fn.call(thisArg, this[key], key, this);

      if (!!result) {
        newObject[key] = this[key];
      }
    });

    return returnCorrectObject(this, newObject, CrioObject, this.$$needsReplacer);
  }

  /**
   * iterate over object executing fn
   *
   * @param {function} fn
   * @param {any} thisArg
   * @returns {CrioObject}
   */
  forEach(fn, thisArg = this) {
    forEach(this.keys(), (key) => {
      fn.call(thisArg, this[key], key, this);
    });

    return this;
  }

  /**
   * return iterable of keys in this
   *
   * @returns {array<string>}
   */
  keys() {
    return objectKeys(this);
  }

  /**
   * map results of function to new object and return it
   * 
   * @param {function} fn
   * @param {any} thisArg
   * @return {CrioObject}
   */
  map(fn, thisArg = this) {
    let newObject = {},
        needsReplacer = false;

    forEach(this.keys(), (key) => {
      newObject[key] = fn.call(thisArg, this[key], key, this);

      if (!needsReplacer) {
        needsReplacer = getNeedsReplacer(newObject[key]);
      }
    });

    return returnCorrectObject(this, newObject, CrioObject);
  }

  /**
   * shallowly merge all objects into this and return as new CrioObject
   *
   * @param {array<any>} objects
   * @returns {CrioObject}
   */
  merge(...objects) {
    const clone = shallowCloneObject(this);

    let needsReplacer = this.$$needsReplacer;

    forEach(objects, (object) => {
      objectAssign(clone, object);

      forEach(objectKeys(object), (key) => {
        if (!needsReplacer) {
          needsReplacer = getNeedsReplacer(object[key]);
        }
      });
    });

    return returnCorrectObject(this, clone, CrioObject, needsReplacer);
  }

  /**
   * deeply merge all objects into this at key value determined by keys,
   * and return as a new CrioObject
   *
   * @param {array<string|number>} keys
   * @param {array<any>} objects
   * @returns {CrioObject}
   */
  mergeIn(keys, ...objects) {
    if (!isArray(keys)) {
      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
    }

    if (!objects.length) {
      return this;
    }

    return mergeOnDeepMatch(this, keys, objects, CrioObject);
  }

  /**
   * convenience function to work with mutable version of this,
   * in case many modifications need to be made and performance
   * is paramount
   *
   * @param {function} fn
   * @returns {any}
   */
  mutate(fn) {
    const result = fn.call(this, this.thaw(), this);
    const hashValue = getHashIfChanged(this, result, getNeedsReplacer(result));

    if (hashValue !== false) {
      return getRealValue(result, hashValue);
    }

    return this;
  }

  /**
   * determine if property passed is enumerable in this
   *
   * @param {string} property
   * @returns {boolean}
   */
  propertyIsEnumerable(property) {
    return OBJECT_PROTOTYPE.propertyIsEnumerable.call(this, property);
  }

  /**
   * set value at key in this
   *
   * @param {string} key
   * @param {any} value
   * @returns {CrioObject}
   */
  set(key, value) {
    let clone = {},
        needsReplacer = false;

    forEachRight(this.keys(), (currentKey) => {
      if (currentKey !== key) {
        clone[currentKey] = this[currentKey];

        if (!needsReplacer) {
          needsReplacer = getNeedsReplacer(this[currentKey]);
        }
      }
    });

    clone[key] = value;

    if (!needsReplacer) {
      needsReplacer = getNeedsReplacer(value);
    }

    return returnCorrectObject(this, clone, CrioObject, needsReplacer);
  }

  /**
   * deeply set value at location determined by keys in this
   *
   * @param {array<string|number>} keys
   * @param {any} value
   * @returns {CrioObject}
   */
  setIn(keys, value) {
    if (!isArray(keys)) {
      throw new Error('Must provide keys as an array, such as ["foo", "bar"].');
    }

    const lastIndex = keys.length - 1;

    let currentObject = shallowCloneObject(this),
        referenceToCurrentObject = currentObject,
        needsReplacer = getNeedsReplacer(value, this),
        currentValue;

    forEach(keys, (key, keyIndex) => {
      if (keyIndex === lastIndex) {
        currentObject[key] = value;
      } else {
        currentValue = currentObject[key];
        currentObject[key] = isCrio(currentValue) ? getShallowClone(currentValue) : {};
        currentObject = currentObject[key];
      }
    });

    return returnCorrectObject(this, referenceToCurrentObject, CrioObject, needsReplacer);
  }

  /**
   * convert this back to a vanilla array
   *
   * @returns {array<any>}
   */
  thaw() {
    const propertyNames = objectKeys(this);

    let object = {};

    forEachRight(propertyNames, (key) => {
      if (!NATIVE_KEYS[key]) {
        const value = this[key];
        const cleanValue = isCrio(value) ? value.thaw() : value;

        setStandard(object, key, cleanValue, this.propertyIsEnumerable(key));
      }
    });

    return object;
  }

  /**
   * convert the values in the object to an array
   *
   * @return {CrioArray}
   */
  toArray() {
    return new CrioArray(this.values());
  }

  /**
   * convert this to a locale-specific string
   *
   * @returns {string}
   */
  toLocaleString() {
    return stringify(this);
  }

  /**
   * convert this to a string showing key: value pair combos
   *
   * @returns {string}
   */
  toString() {
    return stringify(this);
  }

  /**
   * get the valueOf for this
   *
   * @return {any}
   */
  valueOf() {
    return OBJECT_PROTOTYPE.valueOf.call(this);
  }

  /**
   * get the iterable array of values for this
   *
   * @returns {array<any>}
   */
  values() {
    return objectValues(this);
  }

  /**
   * make CrioObject into an iterable
   *
   * @returns {{next: (function(): {value: any, done: boolean})}}
   */
  [Symbol.iterator]() {
    const keys = objectKeys(this);

    let index = 0;

    return {
      next: () => {
        const key = keys[index];
        const value = this[key];
        const done = index >= this.length;

        index++;

        return {
          value,
          done
        };
      }
    };
  }
}

/**
 * entry function, assigning to either CrioArray or CrioObject or neither
 *
 * @param {any} object={}
 * @return {any}
 */
const crio = (object = {}) => {
  if (isArray(object)) {
    return new CrioArray(object);
  }

  if (isObject(object)) {
    return new CrioObject(object);
  }

  return object;
};

export {deleteOnDeepMatch};
export {getNeedsReplacer};
export {getRealValue};
export {isCrio};
export {mergeOnDeepMatch};

export {CrioArray};
export {CrioObject};

export default crio;
