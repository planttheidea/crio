// external dependencies
import deepFreeze from 'deep-freeze-strict';
import identity from 'lodash/identity';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import stringifier from 'stringifier';

// constants
import { CRIO_SYMBOL, IS_PRODUCTION, REACT_ELEMENT_TYPE, STRINGIFIER_OPTIONS } from './constants';

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
export var freeze = function (isProduction) {
  return isProduction ? identity : deepFreeze;
}(IS_PRODUCTION);

export var hasOwnProperty = Object.prototype.hasOwnProperty;

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
export var isComplexObject = function isComplexObject(object) {
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
export var isCrio = function isCrio(object) {
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
export var isCrioArray = function isCrioArray(object) {
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
export var isEqual = function isEqual(crio, object) {
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
export var isReactElement = function isReactElement(object) {
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
export var getCorrectConstructor = function getCorrectConstructor(object, CrioArray, CrioObject) {
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
export var getCrioValue = function getCrioValue(object, Constructor) {
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
export var getKeysMetadata = function getKeysMetadata(keys, instance) {
  var lastIndex = keys.length - 1;
  var parentKeys = keys.slice(0, lastIndex);
  var currentValue = instance.getIn(parentKeys);

  return {
    currentValue: currentValue,
    lastIndex: lastIndex,
    parentKeys: parentKeys
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
export var getRelativeValue = function getRelativeValue(value, length) {
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
export var getStandardValue = function getStandardValue(object) {
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
export var createAssignToObject = function createAssignToObject(CrioArray, CrioObject) {
  return function (object, getValue) {
    return function (value, key) {
      object[key] = getValue(value, getCorrectConstructor(value, CrioArray, CrioObject));
    };
  };
};

export var keys = function keys(object) {
  var ownKeys = [];

  for (var key in object) {
    if (hasOwnProperty.call(object, key)) {
      ownKeys.push(key);
    }
  }

  return ownKeys;
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
export var stringify = stringifier(STRINGIFIER_OPTIONS);