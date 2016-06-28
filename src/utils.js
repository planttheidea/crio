import stringifier from 'stringifier';

const STRINGIFIER_HASH_OPTIONS = {
  handlers: {
    'function': ({value}) => {
      return value.toString();
    }
  },
  maxDepth: 10
};
const STRINGIFIER_OPTIONS = {
  maxDepth: 10,
  indent: '  '
};

const stringify = stringifier(STRINGIFIER_OPTIONS);
const stringifyForHash = stringifier(STRINGIFIER_HASH_OPTIONS);

const ARRAY_TYPE = '[object Array]';
const OBJECT_TYPE = '[object Object]';

/**
 * determine if object is array
 *
 * @param {any} object
 * @return {boolean}
 */
const isArray = (object) => {
  return toString(object) === ARRAY_TYPE || !!(object && object.$$type === 'CrioArray');
};

/**
 * is object a CrioArray or CrioObject
 *
 * @param {any} object
 * @returns {boolean}
 */
const isCrio = (object) => {
  return !!(object && object.$$type);
};

/**
 * determine if object is object
 *
 * @param {any} object
 * @return {boolean}
 */
const isObject = (object) => {
  return toString(object) === OBJECT_TYPE && !!object && object.$$type !== 'CrioArray'
    || !!(object && object.$$type === 'CrioObject');
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
 */
const forEach = (array, fn, thisArg) => {
  const length = array.length;

  let index = -1;

  while (++index < length) {
    fn.call(thisArg, array[index], index, array);
  }
};

/**
 * same as forEach but decrementing (used for objects because its
 * faster than incrementing)
 *
 * @param {array<any>} array
 * @param {function} fn
 * @param {any} thisArg
 */
const forEachRight = (array, fn, thisArg) => {
  let index = array.length;

  while (index--) {
    fn.call(thisArg, array[index], index, array);
  }
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
  if (typeof value === 'function') {
    return value.toString();
  }

  return value;
};

/**
 * convert object into unique hash value
 *
 * @param {CrioArray|CrioObject|array|object} object
 * @return {string}
 */
const hash = (object) => {
  let string;

  try {
    string = JSON.stringify(object, stringifySerializerForHash);
  } catch (exception) {
    string = stringifyForHash(object);
  }

  let hashValue = 5381,
      index = string.length;

  while (index) {
    hashValue = (hashValue * 33) ^ string.charCodeAt(--index);
  }

  return hashValue >>> 0;
};

/**
 * determine if the values for newObject match those for the crioObject
 *
 * @param {CrioArray|CrioObject} crioObject
 * @param {any} newObject
 * @returns {boolean}
 */
const getHashIfChanged = (crioObject, newObject) => {
  const hashValue = hash(newObject);

  if (crioObject.$$hashCode !== hashValue) {
    return hashValue;
  }

  return false;
};

/**
 * return a new array from the existing CrioArray
 *
 * @param {CrioArray} crioArray
 * @returns {array<any>}
 */
const shallowCloneArray = (crioArray) => {
  let array = [];

  forEach(crioArray, (item, index) => {
    array[index] = item;
  });

  return array;
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

export {forEach};
export {forEachRight};
export {getHashIfChanged};
export {hash};
export {isArray};
export {isCrio};
export {isObject};
export {isUndefined};
export {setNonEnumerable};
export {setStandard};
export {shallowCloneArray};
export {stringify};
export {stringifySerializerForHash};
