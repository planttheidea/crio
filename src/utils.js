import stringifier from 'stringifier';
import hashIt from 'hash-it';

const CRIO_ARRAY_TYPE = 'CrioArray';
const CRIO_OBJECT_TYPE = 'CrioObject';
const REACT_ELEMENT_TYPE = (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) || 0xeac7;

const STRINGIFIER_OPTIONS = {
  maxDepth: 10,
  indent: '  '
};

const stringify = stringifier(STRINGIFIER_OPTIONS);

const ARRAY_TYPE = '[object Array]';
const OBJECT_TYPE = '[object Object]';

const HASH_CODE_SYMBOL = Symbol('hashCode');
const TYPE_SYMBOL = Symbol('type');

let reactElementCounter = -1;

/**
 * determine if object is array
 *
 * @param {any} object
 * @return {boolean}
 */
const isArray = (object) => {
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
const isCrio = (object) => {
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
const isObject = (object) => {
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
const isReactElement = (object) => {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

/**
 * determine if object is undefined
 *
 * @param {any} object
 * @return {boolean}
 */
const isUndefined = (object) => {
  return object === void 0;
};

/**
 * utility function (faster than native forEach)
 *
 * @param {array<any>} array
 * @param {function} fn
 * @param {any} thisArg
 * @param {number} index=0
 * @param {number} length=array.length
 */
const forEach = (array, fn, thisArg, index = 0, length = array.length) => {
  if (index === length) {
    return;
  }

  fn.call(thisArg, array[index], index, array);

  forEach(array, fn, thisArg, index + 1, length);
};

/**
 * same as forEach but decrementing (used for objects because its
 * faster than incrementing)
 *
 * @param {array<any>} array
 * @param {function} fn
 * @param {any} thisArg
 * @param {number} index=0
 */
const forEachRight = (array, fn, thisArg, index = array.length - 1) => {
  if (index === -1) {
    return;
  }

  fn.call(thisArg, array[index], index, array);

  forEachRight(array, fn, thisArg, index - 1);
};

/**
 * based on object passed, get its type in lowercase string format
 *
 * @param {any} object
 * @return {string}
 */
const toString = (object) => {
  return Object.prototype.toString.call(object);
};

/**
 * convert functions using toString to get actual value for JSON.stringify
 *
 * @param {string} key
 * @param {any} value
 * @returns {string}
 */
const stringifySerializerForHash = (key, value) => {
  return isReactElement(value) ? ++reactElementCounter : value;
};

/**
 * determine if the values for newObject match those for the crioObject
 *
 * @param {CrioArray|CrioObject} crioObject
 * @param {any} newObject
 * @returns {boolean}
 */
const getHashIfChanged = (crioObject, newObject) => {
  const hashValue = hashIt(newObject);

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
const shallowCloneArray = (crioArray) => {
  let array = new Array(crioArray.length);

  forEach(crioArray, (item, index) => {
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
const shallowCloneObject = (crioObject) => {
  const keys = Object.keys(crioObject);

  let target = {};

  forEachRight(keys, (key) => {
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
const setNonEnumerable = (object, property, value) => {
  Object.defineProperty(object, property, {
    configurable: false,
    enumerable: false,
    value,
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
const setStandard = (object, property, value, enumerable = true) => {
  Object.defineProperty(object, property, {
    configurable: true,
    enumerable,
    value,
    writable: true
  });
};

export {CRIO_ARRAY_TYPE};
export {CRIO_OBJECT_TYPE};
export {HASH_CODE_SYMBOL};
export {TYPE_SYMBOL};
export {forEach};
export {forEachRight};
export {getHashIfChanged};
export {isArray};
export {isCrio};
export {isReactElement};
export {isObject};
export {isUndefined};
export {setNonEnumerable};
export {setStandard};
export {shallowCloneArray};
export {shallowCloneObject};
export {stringify};
export {stringifySerializerForHash};
