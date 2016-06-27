import murmurHash3 from 'murmurhash3js';
import stringifier from 'stringifier';

const HASH_SEED = 13;
const STRINGIFIER_OPTIONS = {
    maxDepth: 2
};
const STRINGIFIER_PRETTY_OPTIONS = {
    ...STRINGIFIER_OPTIONS,
    indent: '  '
};

const stringifyForHash = stringifier(STRINGIFIER_OPTIONS);
const stringify = stringifier(STRINGIFIER_PRETTY_OPTIONS);

/**
 * utility function (faster than native forEach)
 * 
 * @param {array<any>} array
 * @param {function} fn
 * @param {any} thisArg
 */
const forEach = (array, fn, thisArg) => {
  for (let index = 0, length = array.length; index < length; index++) {
      fn.call(thisArg, array[index], index, array);
  }  
};

/**
 * based on object passed, get its type in lowercase string format
 *
 * @param {any} object
 * @return {string}
 */
const getType = (object) => {
    return Object.prototype.toString.call(object).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
};

/**
 * hash string using murmur3 hashing algorithm
 *
 * @param {object} object
 * @returns {string}
 */
const hash = (object) => {
    const string = stringifyForHash(object);

    return murmurHash3.x86.hash32(string, HASH_SEED);
};

/**
 * determine if object is array
 *
 * @param {any} object
 * @return {boolean}
 */
const isArray = (object) => {
    return getType(object) === 'array' ||
        !!(object && object.$$type === 'CrioArray');
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
    return getType(object) === 'object' && !!object && object.$$type !== 'CrioArray' ||
        !!(object && object.$$type === 'CrioObject');
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
export {hash};
export {isArray};
export {isCrio};
export {isObject};
export {isUndefined};
export {returnObjectOnlyIfNew};
export {setNonEnumerable};
export {setStandard};
export {stringify};
