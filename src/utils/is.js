import {
  CRIO_HASH_CODE,
  REACT_ELEMENT_TYPE
} from './constants';

/**
 * get the full object class name based on type passed
 *
 * @param {string} type
 * @returns {string}
 */
const getObjectClassName = (type) => {
  return `[object ${type}]`;
};

const ARRAY_CLASS = getObjectClassName('Array');
const NUMBER_CLASS = getObjectClassName('Number');
const OBJECT_CLASS = getObjectClassName('Object');

/**
 * get the object class of the object passed
 *
 * @param {*} object
 * @returns {string}
 */
const toString = (object) => {
  return Object.prototype.toString.call(object);
};

/**
 * determine if object passed is an array
 *
 * @param {*} object
 * @returns {boolean}
 */
const isArray = (object) => {
  return toString(object) === ARRAY_CLASS;
};

/**
 * determine if object passed is a Crio object
 *
 * @param {*} object
 * @returns {boolean}
 */
const isCrio = (object) => {
  return !!object && !isUndefined(object[CRIO_HASH_CODE]);
};

/**
 * determine if object passed is a number
 *
 * @param {*} object
 * @returns {boolean}
 */
const isNumber = (object) => {
  return toString(object) === NUMBER_CLASS;
};

/**
 * determine if object passed is an object
 *
 * @param {*} object
 * @returns {boolean}
 */
const isObject = (object) => {
  return !!object && toString(object) === OBJECT_CLASS;
};

/**
 * determine if object is a React element
 *
 * @param {any} object
 * @param {string|symbol} object.$$typeof
 * @return {boolean}
 */
const isReactElement = (object) => {
  return isObject(object) && object.$$typeof === REACT_ELEMENT_TYPE;
};

/**
 * are the two objects passed the same crio in type and value
 *
 * @param {CrioArray|CrioObject} crio1
 * @param {CrioArray|CrioObject} crio2
 * @returns {boolean}
 */
const isSameCrio = (crio1, crio2) => {
  return isCrio(crio1) && crio1.equals(crio2);
};

/**
 * determine if object passed is undefined
 *
 * @param {*} object
 * @returns {boolean}
 */
const isUndefined = (object) => {
  return object === void 0;
};

export {isArray};
export {isCrio};
export {isNumber};
export {isObject};
export {isReactElement};
export {isSameCrio};
export {isUndefined};
