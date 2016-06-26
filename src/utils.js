import murmurHash3 from 'murmurhash3js';

const HASH_SEED = 13;

/**
 * apply Object's prototypical toString to object
 *
 * @param {any} object
 * @return {string}
 */
const toString = (object) => {
    return Object.prototype.toString.call(object);
};

/**
 * hash string using murmur3 hashing algorithm
 *
 * @param {string} string
 * @returns {string}
 */
const hash = (string) => {
    return murmurHash3.x86.hash32(string, HASH_SEED);
};

/**
 * determine if object is array
 *
 * @param {any} object
 * @return {boolean}
 */
const isArray = (object) => {
    return toString(object) === '[object Array]' ||
        !!(object && object.$$type === 'CrioArray');
};

/**
 * determine if object is object
 *
 * @param {any} object
 * @return {boolean}
 */
const isObject = (object) => {
    return toString(object) === '[object Object]' && !!object && object.$$type !== 'CrioArray' ||
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
 * set property in object to be readonly (not configurable or writable)
 *
 * @param {object} object
 * @param {string} property
 * @param {any} value
 * @param {boolean} enumerable=true
 */
const setReadOnly = (object, property, value, enumerable = true) => {
    Object.defineProperty(object, property, {
        configurable: false,
        enumerable,
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

export {hash};
export {isArray};
export {isObject};
export {isUndefined};
export {returnObjectOnlyIfNew};
export {setNonEnumerable};
export {setReadOnly};
export {setStandard};
