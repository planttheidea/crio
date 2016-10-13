// external dependencies
import forEach from 'lodash/forEach';
import forEachRight from 'lodash/forEachRight';
import hashIt from 'hash-it';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isUndefined from 'lodash/isUndefined';

import {
  ARRAY_PROTOTYPE,
  CRIO_ARRAY,
  CRIO_OBJECT,
  CRIO_HASH_CODE,
  CRIO_TYPE,
  IS_PRODUCTION,
  OBJECT,
  OBJECT_PROTOTYPE
} from './utils/constants';

import {
  convertToNumber,
  createDeeplyNestedObject,
  forEachObject,
  shallowCloneArray,
  shallowCloneArrayWithValue,
  shallowCloneObjectWithValue
} from './utils/loops';

import {
  isCrio,
  isReactElement
} from './utils/is';

import stringify from './utils/stringify';

const OBJECT_CREATE = OBJECT.create;
const OBJECT_ENTRIES = OBJECT.entries;
const OBJECT_KEYS = OBJECT.keys;

/**
 * build prototype object to add to default prototype
 *
 * @param {Object} prototype
 * @returns {Object}
 */
const createPrototypeObject = (prototype) => {
  const keys = OBJECT_KEYS(prototype);
  const propertySymbols = OBJECT.getOwnPropertySymbols(prototype);
  const allPropertyItems = [
    ...keys,
    ...propertySymbols
  ];

  return allPropertyItems.reduce((accumulatedPrototype, key) => {
    const value = prototype[key];

    return {
      ...accumulatedPrototype,
      [key]: {
        enumerable: false,
        value
      }
    };
  }, {});
};

/**
 * run Object.freeze on the crio only in non-production environments
 *
 * @param {CrioArray|CrioObject} crio
 * @returns {CrioArray|CrioObject}
 */
const freezeIfNotProduction = (crio) => {
  if (IS_PRODUCTION) {
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
const getCrioedValue = (value) => {
  if (isCrio(value) || isReactElement(value)) {
    return value;
  }

  if (isArray(value)) {
    return new CrioArray(value);
  }

  if (isObject(value)) {
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
const getPlainObject = (crio) => {
  return crio[CRIO_TYPE] === CRIO_OBJECT ? {} : [];
};

/**
 * return the original object if the values have not changed
 *
 * @param {CrioArray|CrioObject} crio
 * @param {Array<*>|Object} potentialCrio
 * @returns {CrioArray|CrioObject}
 */
const getSameCrioIfUnchanged = (crio, potentialCrio) => {
  const hashCode = hashIt(potentialCrio);

  if (crio[CRIO_HASH_CODE] === hashCode) {
    return crio;
  }

  return new crio.constructor(potentialCrio, hashCode);
};

/**
 * shallowly merge source arrays into target array
 * 
 * @param {Array<*>} target
 * @param {Array<array>} sources
 * @returns {Array<*>}
 */
const mergeArrays = (target, sources) => {
  let plainObject = [];

  forEach(sources, (array) => {
    if (isArray(array)) {
      forEach(array, (value, index) => {
        plainObject[index] = getCrioedValue(value);
      });
    }
  });

  const targetLength = target.length;

  if (plainObject.length < targetLength) {
    let index = plainObject.length - 1;

    while (++index < targetLength) {
      plainObject[index] = target[index];
    }
  }

  return plainObject;
};

/**
 * shallowly merge source objects into target object
 *
 * @param {Object} target
 * @param {Array<Object>} sources
 * @param {boolean} isTargetCrio
 * @returns {Array<*>|Object}
 */
const mergeObjects = (target, sources, isTargetCrio) => {
  let plainObject = isTargetCrio ? {...target} : {};

  forEach(sources, (object) => {
    if (isObject(object)) {
      plainObject = {
        ...plainObject,
        ...object
      };
    }
  });

  return plainObject;
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

  const isTargetCrio = isCrio(target);

  if (!isTargetCrio || target[CRIO_TYPE] === CRIO_OBJECT) {
    return getSameCrioIfUnchanged(target, mergeObjects(target, sources, isTargetCrio));
  }

  return getSameCrioIfUnchanged(target, mergeArrays(target, sources));
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
    if (!keys.length) {
      return this;
    }

    const key = keys.shift();

    if (!keys.length) {
      return this.delete(key);
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
    const length = keys.length;

    if (length === 0) {
      return this;
    }

    if (length === 1) {
      return this[keys[0]];
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
   * @param {number|string} property
   * @returns {boolean}
   */
  has(property) {
    return this.hasOwnProperty(property);
  },

  /**
   * does this have the property passed
   *
   * @param {number|string} property
   * @returns {boolean}
   */
  hasOwnProperty(property) {
    return OBJECT_PROTOTYPE.hasOwnProperty.call(this, property);
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
    if (!keys.length) {
      return this;
    }

    const [
      key,
      ...restOfKeys
    ] = keys;

    if (!restOfKeys.length) {
      if (isCrio(this[key])) {
        return this.set(key, mergeCrios(this[key], ...objects));
      }

      const [
        object,
        ...restOfObjects
      ] = objects;

      return this.set(key, mergeCrios(object, ...restOfObjects));
    }

    let plainObject = getPlainObject(this),
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
      const [
        object,
        ...restOfObjects
      ] = objects;

      plainObject[key] = mergeCrios(object, ...restOfObjects);
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
   * set key in this to be value
   *
   * @param {string|number} key
   * @param {*} value
   * @returns {CrioArray|CrioObject}
   */
  set(key, value) {
    if (this.get(key) === value) {
      return this;
    }

    if (this[CRIO_TYPE] === CRIO_ARRAY) {
      return getSameCrioIfUnchanged(this, shallowCloneArrayWithValue(this, key, value));
    }

    return getSameCrioIfUnchanged(this, shallowCloneObjectWithValue(this, key, value));
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
    switch (keys.length) {
      case 1:
        return this.set(keys[0], value);

      case 0:
        return this;
    }

    const [
      key,
      ...restOfKeys
    ] = keys;

    if (!this.get(key)) {
      return this.set(key, createDeeplyNestedObject(restOfKeys, value));
    }

    let currentValue;

    const plainObject = this.keys().reduce((result, currentKey) => {
      currentValue = this.get(currentKey);

      if (currentKey === key) {
        result[currentKey] = isCrio(currentValue) ? currentValue.setIn(restOfKeys, value) :
          createDeeplyNestedObject(restOfKeys, value);
      } else {
        result[currentKey] = currentValue;
      }

      return result;
    }, getPlainObject(this));

    return getSameCrioIfUnchanged(this, plainObject);
  },

  /**
   * return the non-crio version of the object
   *
   * @returns {Array<*>|Object}
   */
  thaw() {
    const plainObject = getPlainObject(this);

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
    if (this[CRIO_TYPE] === CRIO_ARRAY) {
      return this;
    }

    let array = [];

    this.forEach((value) => {
      array.push(value);
    });

    return new CrioArray(array);
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
    if (this[CRIO_TYPE] === CRIO_OBJECT) {
      return this;
    }

    let object = {};

    this.forEach((value, index) => {
      object[index] = value;
    });

    return new CrioObject(object);
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
   * return an array of [key, value] pairs for this
   *
   * @returns {Array<array>}
   */
  entries() {
    return OBJECT_ENTRIES(this);
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
   * does this have the value passed
   *
   * @param {*} value
   * @returns {boolean}
   */
  includes(value) {
    return ARRAY_PROTOTYPE.includes.call(this, value);
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
    const shallowClone = shallowCloneArray(this);

    return getSameCrioIfUnchanged(this, shallowClone.sort(fn));
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
   * get the values of this
   *
   * @returns {Array<*>}
   */
  values() {
    return ARRAY_PROTOTYPE.values.call(this);
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
   * get the entries of this
   *
   * @returns {Array<array>}
   */
  entries() {
    return OBJECT_ENTRIES(this);
  },

  /**
   * filter the current CrioArray by the truthy return of fn
   *
   * @param {function} fn
   * @param {*} thisArg
   * @returns {CrioObject}
   */
  filter(fn, thisArg = this) {
    let newObject = {};

    this.forEach((value, key) => {
      if (fn.call(thisArg, value, key, this)) {
        newObject[key] = value;
      }
    });

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
    const length = keys.length;

    let index = -1,
        key;

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
  findKey(fn, thisArg = this) {
    const keys = this.keys();
    const length = keys.length;

    let index = -1,
      key;

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
    let newObject = {},
        result;

    this.forEach((value, key) => {
      result = fn.call(thisArg, value, key, this);

      newObject[key] = getCrioedValue(result);
    });

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
    const reducedValue = ARRAY_PROTOTYPE.reduce.call(this.keys(), (accumulation, key) => {
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
    const reducedValue = ARRAY_PROTOTYPE.reduceRight.call(this.keys(), (accumulation, key) => {
      return fn.call(thisArg, accumulation, this[key], key, this);
    }, defaultValue);
    const crioedValue = getCrioedValue(reducedValue);

    if (isCrio(crioedValue)) {
      return this.equals(crioedValue) ? this : crioedValue;
    }

    return crioedValue;
  },

  /**
   * get the values for this
   *
   * @returns {Array<*>}
   */
  values() {
    return OBJECT.values(this);
  },

  [CRIO_TYPE]: CRIO_OBJECT,

  [Symbol.iterator]() {
    const keys = this.keys();

    let index = 0,
        key, value;

    return {
      next: () => {
        key = keys[index];
        value = this[key];

        if (index < this.length) {
          index++;

          return {
            done: false,
            key,
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

export {CrioArray};
export {CrioObject};
