import stringifier from 'stringifier';

const STRINGIFIER_OPTIONS = {
  maxDepth: 25,
  indent: '  '
};

const stringify = stringifier(STRINGIFIER_OPTIONS);

const ARRAY_TYPE = '[object Array]';
const OBJECT_TYPE = '[object Object]';

/**
 * convert object to readable string
 * 
 * @param {any} object
 * @return {string}
 */
const buildStringForHash = (object) => {
  if (!isArray(object) && !isObject(object)) {
    return object.toString();
  }

  const keys = Object.keys(object);

  let string = '',
      length = keys.length,
      index = -1,
      elements,
      key,
      value,
      valueLength,
      valueIndex;

  while (++index < length) {
    key = keys[index];
    value = object[key];

    if (isObject(value)) {
      string += `|${key}:${buildStringForHash(value)}|`;
    } else if (isArray(value)) {
      elements = [];
      valueLength = value.length;
      valueIndex = -1;

      while (++valueIndex < valueLength) {
        elements.push(buildStringForHash(value[valueIndex]));
      }

      if (elements.length > 0) {
        string += `${key}:[${elements.join(',')}]`;
      }
    } else {
      string += `|${key}:${value}|`;
    }
  }

  return string;
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
 * based on object passed, get its type in lowercase string format
 *
 * @param {any} object
 * @return {string}
 */
const toString = (object) => {
  return Object.prototype.toString.call(object);
};

/**
 * determine if the values for newObject match those for the crioObject
 *
 * @param {CrioArray|CrioObject} crioObject
 * @param {any} newObject
 * @returns {boolean}
 */
const hasChanged = (crioObject, newObject) => {
  const hashCode = hash(newObject);

  return crioObject.$$hashCode !== hashCode;
};

/**
 * convert object into unique hash value
 *
 * @param {CrioArray|CrioObject|array|object} object
 * @return {string}
 */
const hash = (object) => {
  const string = buildStringForHash(object);
  const length = string.length;

  if (length === 0) {
    return 0;
  }

  let hash = 0,
      index = -1;

  while (++index < length) {
    hash = ((hash << 5) - hash) + string.charCodeAt(index);
    hash = hash & hash;
  }

  return hash;
};

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
 * based on hashCodes, either return the current object or the newly generated on
 *
 * @param {object} currentObject={}
 * @param {object} newObject={}
 * @return {object<T>}
 */
const returnObjectOnlyIfNew = (currentObject = {}, newObject = {}) => {
  if (currentObject.$$hashCode !== newObject.$$hashCode) {
    return newObject;
  }

  return currentObject;
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
  }, crioArray);

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
export {hasChanged};
export {hash};
export {isArray};
export {isCrio};
export {isObject};
export {isUndefined};
export {returnObjectOnlyIfNew};
export {setNonEnumerable};
export {setStandard};
export {shallowCloneArray};
export {stringify};
