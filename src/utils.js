// external dependencies
import deepFreeze from 'deep-freeze-strict';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import stringifier from 'stringifier';

const STRINGIFIER_OPTIONS = {
  maxDepth: 10
};

// constants
import {
  CRIO_SYMBOL,
  IS_PRODUCTION
} from './constants';

/**
 * @function freeze
 *
 * @description
 * freeze the object if it is production
 *
 * @param {CrioArray|CrioObject} crio object to freeze
 *
 * @returns {T} frozen object
 */
export const freeze = ((isProduction) => {
  if (isProduction) {
    return (object) => {
      return object;
    };
  }

  return (object) => {
    return deepFreeze(object);
  };
})(IS_PRODUCTION);

/**
 * @function isComplexObject
 *
 * @description
 * is the object an array or plain object
 *
 * @param  {*} object object to test
 *
 * @returns {boolean} is the object a complex object
 */
export const isComplexObject = (object) => {
  return isArray(object) || isPlainObject(object);
};

/**
 * @function isCrio
 *
 * @description
 * is the object a crio object or not
 *
 * @param {*} object object to test
 *
 * @returns {boolean} is the object a crio
 */
export const isCrio = (object) => {
  return !!(object && object[CRIO_SYMBOL]);
};

/**
 * @function isEqual
 *
 * @description
 * are the crio objects equal
 *
 * @param {CrioArray|CrioObject} crio crio object to test against
 * @param {*} object object to test equality with crio object for
 *
 * @returns {boolean} are the objects equal
 */
export const isEqual = (crio, object) => {
  return isCrio(object) && crio.hashCode === object.hashCode;
};

/**
 * @function getConstructor
 *
 * @description
 * get the constructor of the instance
 *
 * @param {CrioArray|CrioObject} instance crio object
 *
 * @returns {Function} constructor of the instance
 */
export const getConstructor = (instance) => {
  return instance.constructor;
};

/**
 * @function getCrioValue
 *
 * @description
 * get the value based on its type
 *
 * @param {*} object object to get value of
 * @param {Function} Constructor function to call new of if object is complex
 *
 * @returns {*} object with clean value
 */
export const getCrioValue = (object, Constructor) => {
  if (isCrio(object)) {
    return object;
  }

  if (isComplexObject(object)) {
    return new Constructor(object);
  }

  return object;
};

/**
 * @function getKeysMetadata
 *
 * @description
 * get the value at the parent key location
 *
 * @param {Array<number|string>} keys keys to get value of
 * @param {CrioArray|CrioObject} instance crio instance
 *
 * @returns {{currentValue: *, lastIndex: number}} parent key metadata
 */
export const getKeysMetadata = (keys, instance) => {
  const lastIndex = keys.length - 1;
  const parentKeys = keys.slice(0, lastIndex);
  const currentValue = instance.getIn(parentKeys);

  return {
    currentValue,
    lastIndex,
    parentKeys
  };
};

/**
 * @function getStandardValue
 *
 * @description
 * get the standard value (thawed if crio)
 *
 * @param {*} object object to get standard version of
 *
 * @returns {*} standard version of object
 */
export const getStandardValue = (object) => {
  return isCrio(object) ? object.thaw() : object;
};

/**
 * @function createAssignToObject
 *
 * @description
 * create a function that will assign a value to an object
 *
 * @param {Function} CrioArray constructor for crio arrays
 * @param {Function} CrioObject constructor for crio objects
 *
 * @returns {function((Array<*>|Object), function): function(*, string): void} assignment function
 */
export const createAssignToObject = (CrioArray, CrioObject) => {
  return (object, getValue) => {
    return (value, key) => {
      object[key] = getValue(value, isArray(value) ? CrioArray : CrioObject);
    };
  };
};

/**
 * @function stringify
 *
 * @description
 * convert object to string
 *
 * @param {*} object object to stringify
 *
 * @returns {string} stringified version of object
 */
export const stringify = stringifier(STRINGIFIER_OPTIONS);
