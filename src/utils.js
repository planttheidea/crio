// external dependencies
import deepFreeze from 'deep-freeze-strict';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import stringifier from 'stringifier';

// constants
import {
  CRIO_SYMBOL,
  IS_PRODUCTION,
  REACT_ELEMENT_TYPE
} from './constants';

const STRINGIFIER_OPTIONS = {
  maxDepth: 10
};

/**
 * @private
 *
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
 * @private
 *
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
 * @private
 *
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
 * @private
 *
 * @function isCrioArray
 *
 * @description
 * is the object a crio array
 *
 * @param {*} object object to test
 * @returns {boolean} is the object a crio array
 */
export const isCrioArray = (object) => {
  return isCrio && object.isArray();
};

/**
 * @private
 *
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
 * @private
 *
 * @function isReactElement
 *
 * @description
 * is the object passed a react element
 *
 * @param {*} object object to test
 * @returns {boolean} is object a react element
 */
export const isReactElement = (object) => {
  return !!object && object.$$typeof === REACT_ELEMENT_TYPE;
};

/**
 * @private
 *
 * @function getCorrectConstructor
 *
 * @description
 * get the constructor that is valid for the object type passed
 *
 * @param {*} object object to test
 * @param {CrioArray} CrioArray constructor for CrioArray class
 * @param {CrioObject} CrioObject constructor for CrioObject class
 * @returns {CrioArray|CrioObject} constructor correct for object
 */
export const getCorrectConstructor = (object, CrioArray, CrioObject) => {
  return isArray(object) ? CrioArray : CrioObject;
};

/**
 * @private
 *
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
  if (isCrio(object) || isReactElement(object)) {
    return object;
  }

  if (isComplexObject(object)) {
    return new Constructor(object);
  }

  return object;
};

/**
 * @private
 *
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
 * @private
 *
 * @function getRelativeValue
 *
 * @description
 * get the relative value used in copyWithin
 *
 * @param {number} value value used as baseline
 * @param {number} length the length of the crio
 * @returns {number} the relative number value
 */
export const getRelativeValue = (value, length) => {
  return value < 0 ? Math.max(length + value, 0) : Math.min(value, length);
};

/**
 * @private
 *
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
 * @private
 *
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
      object[key] = getValue(value, getCorrectConstructor(value, CrioArray, CrioObject));
    };
  };
};

/**
 * @private
 *
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
