// external dependencies
import hashIt from 'hash-it';
import forEach from 'lodash/forEach';
import forEachRight from 'lodash/forEachRight';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isPlainObject from 'lodash/isPlainObject';
import isUndefined from 'lodash/isUndefined';

// utils
import {
  ARRAY_PROTOTYPE,
  CRIO_ARRAY,
  CRIO_OBJECT,
  CRIO_HASH_CODE,
  CRIO_TYPE,
  OBJECT,
  OBJECT_CREATE,
  OBJECT_ENTRIES,
  OBJECT_KEYS,
  OBJECT_PROTOTYPE
} from './utils/constants';
import {
  createPrototypeObject,
  freezeIfNotProduction,
  getCleanValue,
  getDeeplyNestedValue,
  getPlainObject,
  getSameCrioIfUnchanged,
  throwTypeErrorIfKeysInvalid
} from './utils/crio';
import {
  convertToNumber,
  createDeeplyNestedObject,
  forEachObject,
  mergeObjects,
  shallowCloneArray,
  shallowCloneArrayWithValue,
  shallowCloneObjectWithValue
} from './utils/loops';
import {
  isCrio,
  isCrioArray,
  isCrioObject,
  isReactElement
} from './utils/is';

import stringify from './utils/stringify';

/**
 * get the crioed value if it is an array or object,
 * else return the value itself
 *
 * @param {*} value
 * @returns {*}
 */
const getCrioedValue = (value) => {
  if (isCrio(value) || isReactElement(value)) {
    return value;
  }

  if (isArray(value)) {
    return new CrioArray(value);
  }

  if (isPlainObject(value)) {
    return new CrioObject(value);
  }

  return value;
};

/**
 * shallowly merge source arrays into target array
 * 
 * @param {Array<*>} target
 * @param {Array<array>} sources
 * @returns {Array<*>}
 */
const mergeArrays = (target, sources) => {
  return sources.reduce((plainObject, source) => {
    if (isArray(source)) {
      forEach(source, (value, index) => {
        plainObject[index] = getCrioedValue(value);
      });
    }

    return plainObject;
  }, [...target]);
};

/**
 * shallowly merge sources into target
 *
 * @param {CrioArray|CrioObject} target
 * @param {Array<array|Object>} sources
 * @returns {CrioArray|CrioObject}
 */
const mergeCrios = (target, ...sources) => {
  if (!sources.length) {
    return target;
  }

  const mergeFunction = isCrioObject(target) || isPlainObject(target) ? mergeObjects : mergeArrays;

  return getSameCrioIfUnchanged(target, mergeFunction(target, sources));
};

class Crio {
  /**
   * create based Crio class with a null prototype that will assign
   * the values passed to itself
   *
   * @param {Array<*>|Object} object
   * @param {string} hashCode=hashIt(object)
   * @return {CrioArray|CrioObject}
   */
  constructor(object, hashCode = hashIt(object)) {
    if (isCrio(object)) {
      return object;
    }

    let length = 0;

    forEach(object, (value, key) => {
      this[key] = getCrioedValue(value);

      length++;
    });

    OBJECT.defineProperties(this, {
      length: {
        enumerable: false,
        value: length
      },

      [CRIO_HASH_CODE]: {
        enumerable: false,
        value: hashCode
      }
    });

    return freezeIfNotProduction(this);
  }
}

const CRIO_PROTOTYPE = {
  /**
   * return an empty crio
   *
   * @returns {CrioArray|CrioObject}
   */
  clear() {
    if (!this.length) {
      return this;
    }

    const plainObject = getPlainObject(this);

    return new this.constructor(plainObject);
  },

  /**
   * reduce the Crio to only having values that are truthy
   *
   * @returns {CrioArray|CrioObject}
   */
  compact() {
    const compactedCrio = this.filter((value) => {
      return !!value;
    });

    return this.equals(compactedCrio) ? this : compactedCrio;
  },

  constructor: Crio,

  /**
   * remove key from this
   *
   * @param {string|number} key
   * @returns {CrioArray|CrioObject}
   */
  delete(key) {
    if (!this.has(key)) {
      return this;
    }

    let plainObject = getPlainObject(this),
        isThisArray = isArray(plainObject);

    forEach(this.keys(), (currentKey) => {
      if (currentKey !== key) {
        if (isThisArray) {
          plainObject.push(this[currentKey]);
        } else {
          plainObject[currentKey] = this[currentKey];
        }
      }
    });

    return getSameCrioIfUnchanged(this, plainObject);
  },

  /**
   * remove deeply-nested key from this
   *
   * @param {Array<string|number>} keys
   * @returns {CrioArray|CrioObject}
   */
  deleteIn(keys) {
    throwTypeErrorIfKeysInvalid(keys);

    const length = keys.length;

    if (length === 1) {
      return this.delete(keys[0]);
    }

    if (!length) {
      return this;
    }

    const key = keys.shift();

    if (!this.has(key)) {
      return this;
    }

    let plainObject = getPlainObject(this),
        isTargetKey = false;

    this.forEach((currentValue, currentKey) => {
      isTargetKey = currentKey === key;
      currentValue = this[currentKey];

      if (isTargetKey) {
        if (isCrio(currentValue)) {
          plainObject[currentKey] = currentValue.deleteIn(keys);
        }
      } else {
        plainObject[currentKey] = currentValue;
      }
    });

    return getSameCrioIfUnchanged(this, plainObject);
  },

  /**
   * return an array of [key, value] pairs for this
   *
   * @returns {Array<array>}
   */
  entries() {
    return OBJECT_ENTRIES(this);
  },

  /**
   * determine if object passed is equal in value to this
   *
   * @param {CrioArray|CrioObject} object
   * @returns {boolean}
   */
  equals(object) {
    if (!isCrio(object)) {
      return false;
    }

    return this[CRIO_TYPE] === object[CRIO_TYPE] && this[CRIO_HASH_CODE] === object[CRIO_HASH_CODE];
  },

  /**
   * get the value that matches at key
   *
   * @param {string|number} key
   * @returns {*}
   */
  get(key) {
    return this[key];
  },

  /**
   * get the value that matches at the deeply nested location from keys
   *
   * @param {Array<string|number>} keys
   * @returns {*}
   */
  getIn(keys) {
    throwTypeErrorIfKeysInvalid(keys);

    const length = keys.length;

    if (length === 1) {
      return this[keys[0]];
    }

    if (!length) {
      return this;
    }

    let currentObject = this,
        index = -1,
        key;

    while (++index < length) {
      key = keys[index];

      if (isUndefined(currentObject[key])) {
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
   * @param {number|string} key
   * @returns {boolean}
   */
  has(key) {
    return this.hasOwnProperty(key);
  },

  /**
   * does this have the property deeply nested
   *
   * @param {Array<number|string>} keys
   * @returns {boolean}
   */
  hasIn(keys) {
    throwTypeErrorIfKeysInvalid(keys);

    const length = keys.length;

    if (keys.length === 1) {
      return this.has(keys[0]);
    }

    if (!length) {
      return false;
    }

    const [
      key,
      ...restOfKeys
    ] = keys;

    const target = this[key];

    if (isCrio(target)) {
      return target.hasIn(restOfKeys);
    }

    return false;
  },

  /**
   * does this have the property passed
   *
   * @param {number|string} key
   * @returns {boolean}
   */
  hasOwnProperty(key) {
    return OBJECT_PROTOTYPE.hasOwnProperty.call(this, key);
  },

  /**
   * does this include the value passed
   *
   * @param {*} value
   * @returns {boolean}
   */
  includes(value) {
    const keys = this.keys();
    const cleanValue = getCleanValue(value);

    let index = -1,
        currentKey;

    while (++index < this.length) {
      currentKey = keys[index];

      if (isEqual(getCleanValue(this[currentKey]), cleanValue)) {
        return true;
      }
    }

    return false;
  },

  /**
   * is the Crio a CrioArray
   *
   * @returns {boolean}
   */
  isArray() {
    return isCrioArray(this);
  },

  /**
   * is the Crio a CrioObject
   *
   * @returns {boolean}
   */
  isObject() {
    return isCrioObject(this);
  },

  /**
   * shallowly merge the objects passed with this
   *
   * @param {Array<Object>} objects
   * @returns {CrioObject}
   */
  merge(...objects) {
    return mergeCrios(this, ...objects);
  },

  /**
   * shallowly merge the objects passed with the deeply-nested location determined by keys
   *
   * @param {Array<string|number>} keys
   * @param {Array<Object>} objects
   * @returns {CrioObject}
   */
  mergeIn(keys, ...objects) {
    throwTypeErrorIfKeysInvalid(keys);

    const length = keys.length;

    if (length === 1) {
      const key = keys[0];

      if (isCrio(this[key])) {
        return this.set(key, mergeCrios(this[key], ...objects));
      }

      const [
        object,
        ...restOfObjects
      ] = objects;

      return this.set(key, mergeCrios(object, ...restOfObjects));
    }

    if (!length) {
      return this;
    }

    const [
      key,
      ...restOfKeys
    ] = keys;

    let plainObject = getPlainObject(this, false),
        isKeySet = false,
        isTargetKey = false;

    this.forEach((currentValue, currentKey) => {
      isTargetKey = currentKey === key;

      if (isTargetKey) {
        isKeySet = true;

        plainObject[currentKey] = isCrio(currentValue) ? currentValue.mergeIn(restOfKeys, ...objects) :
          createDeeplyNestedObject(restOfKeys, ...objects);
      } else {
        plainObject[currentKey] = currentValue;
      }
    });

    if (!isKeySet) {
      plainObject[key] = mergeCrios(...objects);
    }

    return getSameCrioIfUnchanged(this, plainObject);
  },

  /**
   * execute a function with the mutated value of this and return the re-crioed version
   *
   * @param {function} fn
   * @param {*} thisArg
   * @returns {*}
   */
  mutate(fn, thisArg = this) {
    const result = fn.call(thisArg, this.thaw(), this);
    const crioedValue = getCrioedValue(result);

    if (isCrio(crioedValue)) {
      return this.equals(crioedValue) ? this : crioedValue;
    }

    return crioedValue;
  },

  /**
   * return new CrioArray of values in collection for the property method
   *
   * @param {string} key
   * @returns {CrioArray}
   */
  pluck(key) {
    let array = [];

    this.forEach((value) => {
      if (value.hasOwnProperty(key)) {
        array.push(value[key]);
      }
    });

    return new CrioArray(array);
  },

  /**
   * pluck the deeply-nested value based on keys
   *
   * @param {Array<number|string>} keys
   * @returns {Array<*>}
   */
  pluckIn(keys) {
    throwTypeErrorIfKeysInvalid(keys);

    const length = keys.length;

    if (length === 1) {
      return this.pluck(keys[0]);
    }

    if (!length) {
      return this;
    }

    const [
      key,
      ...restOfKeys
    ] = keys;

    let array = [];

    this.forEach((value) => {
      if (value.hasOwnProperty(key) && isCrio(value[key])) {
        const deepValue = value[key].getIn(restOfKeys);

        if (!isUndefined(deepValue)) {
          array.push(deepValue);
        }
      }
    });

    return new CrioArray(array);
  },

  /**
   * set key in this to be value
   *
   * @param {string|number} key
   * @param {*} value
   * @returns {CrioArray|CrioObject}
   */
  set(key, value) {
    if (this[key] === value) {
      return this;
    }

    const shallowCloneWithValueFunction = isCrioArray(this) ? shallowCloneArrayWithValue : shallowCloneObjectWithValue;

    return getSameCrioIfUnchanged(this, shallowCloneWithValueFunction(this, key, value));
  },

  /**
   * set deeply-nested value in this based on keys
   *
   * @param {Array<string|number>} keys
   * @param {number} keys.length
   * @param {*} value
   * @returns {CrioArray|CrioObject}
   */
  setIn(keys, value) {
    throwTypeErrorIfKeysInvalid(keys);

    const length = keys.length;

    if (length === 1) {
      return this.set(keys[0], value);
    }

    if (!length) {
      return this;
    }

    const [
      key,
      ...restOfKeys
    ] = keys;

    if (!this[key]) {
      return this.set(key, createDeeplyNestedObject(restOfKeys, value));
    }

    let plainObject = getPlainObject(this, false);

    this.forEach((currentValue, currentKey) => {
      plainObject[currentKey] = getDeeplyNestedValue(currentValue, value, currentKey === key, restOfKeys);
    });

    return getSameCrioIfUnchanged(this, plainObject);
  },

  /**
   * return the non-crio version of the object
   *
   * @returns {Array<*>|Object}
   */
  thaw() {
    const plainObject = getPlainObject(this, false);

    this.forEach((value, key) => {
      plainObject[key] = isCrio(value) ? value.thaw() : value;
    });

    return plainObject;
  },

  /**
   * convert this to a CrioArray
   *
   * @returns {CrioArray}
   */
  toArray() {
    if (isCrioArray(this)) {
      return this;
    }

    return this.reduce((array, value) => {
      return array.concat([value]);
    }, []);
  },

  /**
   * get the stringified version of this
   *
   * @returns {string}
   */
  toLocaleString() {
    return stringify(this);
  },

  /**
   * convert this to a CrioObject
   *
   * @returns {CrioObject}
   */
  toObject() {
    if (isCrioObject(this)) {
      return this;
    }

    return this.reduce((object, value, index) => {
      object[index] = value;

      return object;
    }, {});
  },

  /**
   * get the stringified version of this
   *
   * @returns {string}
   */
  toString() {
    return stringify(this);
  },

  /**
   * get the valueOf for this
   *
   * @returns {CrioArray|CrioObject}
   */
  valueOf() {
    return this;
  },

  /**
   * get the values for this
   *
   * @returns {Array<*>}
   */
  values() {
    return OBJECT.values(this);
  }
};

Crio.prototype = OBJECT_CREATE(null, createPrototypeObject(CRIO_PROTOTYPE));

class CrioArray extends Crio {
  /**
   * create CrioArray class extending Crio with built prototype
   *
   * @param {Array<*>} array
   * @param {string} hashCode
   */
  constructor(array, hashCode) {
    super(array, hashCode);
  }
}

const CRIO_ARRAY_PROTOTYPE = {
  /**
   * concatenate the arguments passed with the current array
   *
   * @param {Array<*> } args
   * @returns {CrioArray}
   */
  concat(...args) {
    if (!args.length) {
      return this;
    }

    const shallowClone = shallowCloneArray(this);

    return getSameCrioIfUnchanged(this, ARRAY_PROTOTYPE.concat.apply(shallowClone, args));
  },

  constructor: CrioArray,

  /**
   * return a new array with the appropriate arguments for copyWithin applied
   *
   * @param {Array<*>} args
   * @returns {CrioArray}
   */
  copyWithin(...args) {
    if (!args.length) {
      return this;
    }

    const shallowClone = shallowCloneArray(this);
    const copiedArray = ARRAY_PROTOTYPE.copyWithin.apply(shallowClone, args);

    return getSameCrioIfUnchanged(this, copiedArray);
  },

  /**
   * find the values in this that do not exist in any of the arrays passed
   *
   * @param {Array<Array>} arrays
   * @returns {CrioArray}
   */
  difference(...arrays) {
    if (!arrays.length) {
      return this;
    }

    let indexOfValue;

    const shallowClone = arrays.reduce((differenceArray, array) => {
      if (isArray(array) || isCrioArray(array)) {
        forEach(array, (value) => {
          indexOfValue = differenceArray.indexOf(value);

          if (!!~indexOfValue) {
            differenceArray.splice(indexOfValue, 1);
          }
        });
      }

      return differenceArray;
    }, shallowCloneArray(this));

    return getSameCrioIfUnchanged(this, shallowClone);
  },

  /**
   * does every item in this match the result of fn
   *
   * @param {function} fn
   * @param {*} thisArg
   * @returns {boolean}
   */
  every(fn, thisArg = this) {
    return ARRAY_PROTOTYPE.every.call(this, fn, thisArg);
  },

  /**
   * return a new array with the appropriate arguments for fill applied
   *
   * @param {Array<*>} args
   * @returns {CrioArray}
   */
  fill(...args) {
    if (!args.length) {
      return this;
    }

    const shallowClone = shallowCloneArray(this);
    const filledArray = ARRAY_PROTOTYPE.fill.apply(shallowClone, args);

    return getSameCrioIfUnchanged(this, filledArray);
  },

  /**
   * filter this based on truthy results from fn
   *
   * @param {function} fn
   * @param {*} thisArg
   * @returns {CrioArray}
   */
  filter(fn, thisArg = this) {
    const filteredArray = ARRAY_PROTOTYPE.filter.call(this, fn, thisArg);

    return getSameCrioIfUnchanged(this, filteredArray);
  },

  /**
   * find the first item that returns truthy for fn
   *
   * @param {function} fn
   * @param {*} thisArg
   * @returns {*}
   */
  find(fn, thisArg = this) {
    return ARRAY_PROTOTYPE.find.call(this, fn, thisArg);
  },

  /**
   * find the index of the first item that returns truthy for fn
   *
   * @param {function} fn
   * @param {*} thisArg
   * @returns {number}
   */
  findIndex(fn, thisArg = this) {
    return ARRAY_PROTOTYPE.findIndex.call(this, fn, thisArg);
  },

  /**
   * return the first X number of items, based on number
   *
   * @param {number} number
   * @returns {CrioArray}
   */
  first(number = 1) {
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
  forEach(fn, thisArg = this) {
    ARRAY_PROTOTYPE.forEach.call(this, fn, thisArg);
  },

  /**
   * if the index of the value passed exists, return the
   * first instance of it, else return -1
   *
   * @param {*} value
   * @returns {number}
   */
  indexOf(value) {
    return ARRAY_PROTOTYPE.indexOf.call(this, value);
  },

  /**
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

    const intersectingValues = allArrays
      .reduce((values, array) => {
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
      }, [])
      .filter((value, index) => {
        return indices[index] === allArraysLength;
      });

    return getSameCrioIfUnchanged(this, intersectingValues);
  },

  /**
   * combine the values in this, with separator as the separator
   *
   * @param {string} separator
   * @returns {string}
   */
  join(separator = ',') {
    return ARRAY_PROTOTYPE.join.call(this, separator);
  },

  /**
   * return the keys of this
   *
   * @returns {Array<string>}
   */
  keys() {
    return OBJECT_KEYS(this).map(convertToNumber);
  },

  /**
   * return the last X number of items, based on number
   *
   * @param {number} number
   * @returns {CrioArray}
   */
  last(number = 1) {
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
  lastIndexOf(value) {
    return ARRAY_PROTOTYPE.lastIndexOf.call(this, value);
  },

  /**
   * return the values mapped by fn as a new CrioArray
   *
   * @param {function} fn
   * @param {*} thisArg
   * @returns {CrioArray}
   */
  map(fn, thisArg = this) {
    const mappedArray = ARRAY_PROTOTYPE.map.call(this, fn, thisArg);

    return getSameCrioIfUnchanged(this, mappedArray);
  },

  /**
   * return a new CrioArray with the last item removed
   *
   * @returns {CrioArray}
   */
  pop() {
    return this.slice(0, this.length - 1);
  },

  /**
   * add items to the current CrioArray
   *
   * @param {Array<*>} items
   * @returns {CrioArray}
   */
  push(...items) {
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
  reduce(fn, defaultValue, thisArg = this) {
    const reducedValue = ARRAY_PROTOTYPE.reduce.call(this, fn, defaultValue, thisArg);
    const crioedValue = getCrioedValue(reducedValue);

    if (isCrio(crioedValue)) {
      return this.equals(crioedValue) ? this : crioedValue;
    }

    return crioedValue;
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
  reduceRight(fn, defaultValue, thisArg = this) {
    const reducedValue = ARRAY_PROTOTYPE.reduceRight.call(this, fn, defaultValue, thisArg);
    const crioedValue = getCrioedValue(reducedValue);

    if (isCrio(crioedValue)) {
      return this.equals(crioedValue) ? this : crioedValue;
    }

    return crioedValue;
  },

  /**
   * reverse the order of the CrioArray
   *
   * @returns {CrioArray}
   */
  reverse() {
    let newArray = [];

    forEachRight(this, (value) => {
      newArray.push(value);
    });

    return getSameCrioIfUnchanged(this, newArray);
  },

  /**
   * return the CrioArray with the first item removed
   *
   * @returns {CrioArray}
   */
  shift() {
    return this.slice(1);
  },

  /**
   * return the sliced version of the current CrioArray
   *
   * @param {Array<*>} args
   * @returns {CrioArray}
   */
  slice(...args) {
    if (!args.length) {
      return this;
    }

    const slicedArray = ARRAY_PROTOTYPE.slice.apply(this, args);

    return getSameCrioIfUnchanged(this, slicedArray);
  },

  /**
   * does this return truthy for at least one of the returns of fn
   *
   * @param {function} fn
   * @param {*} thisArg
   * @returns {boolean}
   */
  some(fn, thisArg = this) {
    return ARRAY_PROTOTYPE.some.call(this, fn, thisArg);
  },

  /**
   * return a sorted version of the current CrioArray
   *
   * @param {function} fn
   * @returns {CrioArray}
   */
  sort(fn) {
    let shallowClone = shallowCloneArray(this);

    ARRAY_PROTOTYPE.sort.call(shallowClone, fn);

    return getSameCrioIfUnchanged(this, shallowClone);
  },

  /**
   * return the spliced version of the current CrioArray
   *
   * @param {Array<*>} args
   * @returns {CrioArray}
   */
  splice(...args) {
    if (!args.length) {
      return this;
    }

    let shallowClone = shallowCloneArray(this);

    ARRAY_PROTOTYPE.splice.apply(shallowClone, args);

    return getSameCrioIfUnchanged(this, shallowClone);
  },

  /**
   * return the current CrioArray with the duplicate values removed
   *
   * @returns {CrioArray}
   */
  unique() {
    let hashArray = [],
        newArray = [],
        hasHashCode = false,
        hashCode;

    const filteredCrioArray = this.filter((value) => {
      hashCode = value[CRIO_HASH_CODE];
      hasHashCode = !isUndefined(hashCode);

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
   * @param {Array<*>} args
   * @returns {CrioArray}
   */
  unshift(...args) {
    if (!args.length) {
      return this;
    }

    const unshiftedArray = ARRAY_PROTOTYPE.concat.apply(args, this);

    return getSameCrioIfUnchanged(this, unshiftedArray);
  },

  /**
   * find the values that are the symmetric difference of this and the arrays passed
   *
   * @param {Array<Array>} arrays
   * @returns {CrioArray}
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

    const xorValues = allArrays
      .reduce((values, array) => {
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
      }, [])
      .filter((value, index) => {
        return !~indicesToRemove.indexOf(index);
      });

    return getSameCrioIfUnchanged(this, xorValues);
  },

  [CRIO_TYPE]: CRIO_ARRAY,

  [Symbol.iterator]: ARRAY_PROTOTYPE[Symbol.iterator]
};

CrioArray.prototype = OBJECT_CREATE(Crio.prototype, createPrototypeObject(CRIO_ARRAY_PROTOTYPE));

class CrioObject extends Crio {
  /**
   * create CrioObject class extending Crio with built prototype
   *
   * @param {Object} object
   * @param {string} hashCode
   */
  constructor(object, hashCode) {
    super(object, hashCode);
  }
}

const CRIO_OBJECT_PROTOTYPE = {
  constructor: CrioObject,

  /**
   * filter the current CrioArray by the truthy return of fn
   *
   * @param {function} fn
   * @param {*} thisArg
   * @returns {CrioObject}
   */
  filter(fn, thisArg = this) {
    let value;

    const newObject = this.keys().reduce((object, key) => {
      value = this[key];

      if (fn.call(thisArg, value, key, this)) {
        object[key] = value;
      }

      return object;
    }, {});

    return getSameCrioIfUnchanged(this, newObject);
  },

  /**
   * find the value in this that yields a truthy return from fn
   *
   * @param {function} fn
   * @param {*} thisArg
   * @returns {*}
   */
  find(fn, thisArg = this) {
    const keys = this.keys();

    let index = -1,
        key;

    while (++index < this.length) {
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
  findKey(fn, thisArg = this) {
    const keys = this.keys();

    let index = -1,
        key;

    while (++index < this.length) {
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
  forEach(fn, thisArg = this) {
    forEachObject(this, fn, thisArg);
  },

  /**
   * is this the prototype of the object passed
   *
   * @param {*} object
   * @returns {boolean}
   */
  isPrototypeOf(object) {
    return OBJECT_PROTOTYPE.isPrototypeOf.call(this, object);
  },

  /**
   * get the keys of this
   *
   * @returns {Array<string>}
   */
  keys() {
    return OBJECT_KEYS(this);
  },

  /**
   * return the new object based on the mapped values of this
   *
   * @param {function} fn
   * @param {*} thisArg
   * @returns {CrioObject}
   */
  map(fn, thisArg = this) {
    let value, result;

    const newObject = this.keys().reduce((object, key) => {
      value = this[key];
      result = fn.call(thisArg, value, key, this);

      object[key] = getCrioedValue(result);

      return object;
    }, {});

    return getSameCrioIfUnchanged(this, newObject);
  },

  /**
   * is the property passed enumerable
   *
   * @param {string} property
   * @returns {boolean}
   */
  propertyIsEnumerable(property) {
    return OBJECT_PROTOTYPE.propertyIsEnumerable.call(this, property);
  },

  /**
   * reduce the values in the object based on starting with defaultValue
   *
   * @param {function} fn
   * @param {*} defaultValue
   * @param {*} thisArg
   * @returns {*}
   */
  reduce(fn, defaultValue, thisArg = this) {
    const reducedValue = this.keys().reduce((accumulation, key) => {
      return fn.call(thisArg, accumulation, this[key], key, this);
    }, defaultValue);
    const crioedValue = getCrioedValue(reducedValue);

    if (isCrio(crioedValue)) {
      return this.equals(crioedValue) ? this : crioedValue;
    }

    return crioedValue;
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
  reduceRight(fn, defaultValue, thisArg = this) {
    const reducedValue = this.keys().reduce((accumulation, key) => {
      return fn.call(thisArg, accumulation, this[key], key, this);
    }, defaultValue);
    const crioedValue = getCrioedValue(reducedValue);

    if (isCrio(crioedValue)) {
      return this.equals(crioedValue) ? this : crioedValue;
    }

    return crioedValue;
  },

  [CRIO_TYPE]: CRIO_OBJECT,

  [Symbol.iterator]() {
    let index = 0,
        key, value;

    return {
      next: () => {
        value = this[key];

        if (index < this.length) {
          index++;

          return {
            done: false,
            value
          };
        } else {
          return {
            done: true
          };
        }
      }
    };
  }
};

CrioObject.prototype = OBJECT_CREATE(Crio.prototype, createPrototypeObject(CRIO_OBJECT_PROTOTYPE));

export {getCrioedValue};
export {mergeArrays};
export {mergeCrios};

export {CrioArray};
export {CrioObject};
