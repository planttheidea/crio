import hashIt from 'hash-it';

import {
  ARRAY_CLASS_NAME,
  CRIO_ARRAY,
  CRIO_ARRAY_TYPE,
  CRIO_OBJECT,
  CRIO_OBJECT_TYPE,
  HASH_CODE_SYMBOL,
  OBJECT_CLASS_NAME,
  OBJECT_DEFINE_PROPERTY,
  OBJECT_FREEZE,
  OBJECT_KEYS,
  OBJECT_PROTOTYPE
} from './constants';

import {
  CRIO_ARRAY_PROTOTYPE,
  CRIO_OBJECT_PROTOTYPE
} from './prototypes';

const DEFAULT_PROPERTY_DESCRIPTOR = {
  configurable: true,
  enumerable: true,
  value: undefined,
  writable: true
};

const addLengthToObject = (object, length) => {
  OBJECT_DEFINE_PROPERTY(object, 'length', getPropertyDescriptor({
    enumerable: false,
    value: length
  }));
};

const toString = (object) => {
  return OBJECT_PROTOTYPE.toString.call(object);
};

/**
 * filter the array by values returned from each call of fn that are truthy
 *
 * @param {array<*>} array
 * @param {function} fn
 * @param {*} thisArg
 * @returns {CrioArray}
 */
const filterArray = (array, fn, thisArg) => {
  const crioArray = Array.prototype.filter.call(array, fn, thisArg);

  return OBJECT_FREEZE(new CrioArray(crioArray));
};

/**
 * filter the array by values returned from each call of fn that are truthy
 *
 * @param {object} object
 * @param {array<string>} keys
 * @param {function} fn
 * @param {*} thisArg
 * @param {number} index=0
 * @param {number} length=array.length
 * @param {array<T>} filteredObject={}
 * @returns {array<T>}
 */
const filterObject = (object, keys, fn, thisArg, index = 0, length = OBJECT_KEYS(object).length, filteredObject = {}) => {
  if (index === length) {
    const newCrio = new CrioObject(filteredObject);

    return OBJECT_FREEZE(newCrio);
  }

  const key = keys[index];
  const item = object[key];

  const updatedArray = !fn.call(thisArg, item, key, object) ? filteredObject : {
    ...filteredObject,
    [key]: item
  };

  return filterObject(object, keys, fn, thisArg, index + 1, length, updatedArray);
};


const forEach = (array, fn, thisArg) => {
  const length = array.length;

  let index = -1;

  while (++index < length) {
    fn.call(thisArg, array[index], index, array);
  }
};

const getPropertyDescriptor = (descriptorValues) => {
  return {
    ...DEFAULT_PROPERTY_DESCRIPTOR,
    ...descriptorValues
  };
};

const isArray = (object) => {
  return toString(object) === ARRAY_CLASS_NAME;
};

const isCrio = (object) => {
  return object[CRIO_OBJECT_TYPE] === CRIO_OBJECT || object[CRIO_ARRAY_TYPE] === CRIO_ARRAY;
};

const isObject = (object) => {
  return toString(object) === OBJECT_CLASS_NAME;
};

const mapArray = (array, fn, thisArg) => {
  const mappedArray = Array.prototype.map.call(array, fn, thisArg);

  return new CrioArray(mappedArray);
};

const mapObject = (object, fn, thisArg) => {
  const mappedArray = Array.prototype.map.call(OBJECT_KEYS(object), (key) => {
    return fn.call(thisArg, object[key], key, object);
  });

  return new CrioObject(mappedArray);
};

const returnCleanReducedValue = (reducedValue) => {
  if (isArray(reducedValue)) {
    return new CrioArray(reducedValue);
  }

  if (isObject(reducedValue)) {
    return new CrioObject(reducedValue);
  }

  return reducedValue;
};

/**
 * calculate reducedValue by looping incrementally over the array and executing fn for each item
 *
 * @param {array<*>} array
 * @param {function} fn
 * @param {*} reducedValue
 * @param {*} thisArg
 * @param {number} index=0
 * @param {number} length=array.length
 * @returns {*}
 */
const reduce = (array, fn, reducedValue, thisArg, index = 0, length = array.length) => {
  if (index === length) {
    return OBJECT_FREEZE(returnCleanReducedValue(reducedValue));
  }

  if (reducedValue === void 0) {
    return reduce(array, fn, array[0], index + 1);
  }

  return reduce(array, fn, fn.call(thisArg, reducedValue, array[index], index, array),  thisArg, index + 1, length);
};

/**
 * calculate reducedValue by looping decrementally over the array and executing fn for each item
 *
 * @param {array<*>} array
 * @param {function} fn
 * @param {*} reducedValue
 * @param {number} index=0
 * @param {number} length=array.length
 * @returns {*}
 */
const reduceRight = (array, fn, reducedValue, index = array.length - 1, length = array.length) => {
  if (index === -1) {
    return OBJECT_FREEZE(returnCleanReducedValue(reducedValue));
  }

  if (reducedValue === void 0) {
    return reduceRight(array, fn, array[0], index + 1);
  }

  return reduceRight(array, fn, fn(reducedValue, array[index], index, array), index - 1, length);
};

function CrioArray(array = []) {
  forEach(array, (item, index) => {
    this[index] = isCrio(item) ? item : createNewCrio(item);
  });

  addLengthToObject(this, array.length);

  OBJECT_DEFINE_PROPERTY(this, HASH_CODE_SYMBOL, getPropertyDescriptor({
    enumerable: false,
    value: hashIt(array)
  }));

  return this;
}

CrioArray.prototype = CRIO_ARRAY_PROTOTYPE;

function CrioObject(object = {}) {
  const keys = OBJECT_KEYS(object);
  const length = keys.length;

  let item;

  forEach(keys, (key) => {
    item = object[key];

    this[key] = isCrio(item) ? item : createNewCrio(item);
  });

  addLengthToObject(this, length);

  OBJECT_DEFINE_PROPERTY(this, HASH_CODE_SYMBOL, getPropertyDescriptor({
    enumerable: false,
    value: hashIt(object)
  }));

  return this;
}

CrioObject.prototype = CRIO_OBJECT_PROTOTYPE;

function createNewCrio(object) {
  if (isArray(object)) {
    return OBJECT_FREEZE(new CrioArray(object));
  }

  if (isObject(object)) {
    return OBJECT_FREEZE(new CrioObject(object));
  }

  return object;
}

createNewCrio.array = (array) => {
  return OBJECT_FREEZE(new CrioArray(array));
};

createNewCrio.object = (object) => {
  return OBJECT_FREEZE(new CrioArray(object));
};

export {CrioArray};
export {CrioObject};

export {addLengthToObject};
export {createNewCrio};
export {filterArray};
export {filterObject};
export {forEach};
export {getPropertyDescriptor};
export {isArray};
export {isObject};
export {mapArray};
export {mapObject};
export {reduce};
export {reduceRight};
export {toString};
