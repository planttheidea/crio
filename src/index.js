// classes
import CrioArray from './CrioArray';
import CrioObject from './CrioObject';

// is
import {isArray, isCrio, isObject} from './is';

/**
 * @module crio
 */

/**
 * @function crio
 *
 * @description
 * build a new crio object based on the object passed
 *
 * @param {*} [object={}] object to convert to crio
 *
 * @returns {CrioArray|CrioObject} object that has been crioed
 */
const crio = (object = {}) => {
  if (isCrio(object)) {
    return object;
  }

  if (isArray(object)) {
    return new CrioArray(object);
  }

  if (isObject(object)) {
    return new CrioObject(object);
  }

  throw new TypeError('Object passed must be either an array or a plain object.');
};

/**
 * @function crio.array
 *
 * @description
 * convenience method for making crio arrays
 *
 * @param {Array<*>} array array to crio
 * @returns {CrioArray} crio array
 */
crio.array = (array = []) => {
  if (!isArray(array)) {
    throw new TypeError('Object passed must be an array.');
  }

  return crio(array);
};

/**
 * @function crio.isArray
 *
 * @description
 * check if object is a crio array
 *
 * @param {*} object object to test
 * @returns {boolean} is the object a crio array
 */
crio.isArray = (object) => {
  return isCrio(object) && object.isArray();
};

crio.isCrio = isCrio;

/**
 * @function crio.isObject
 *
 * @description
 * check if object is a crio object
 *
 * @param {*} object object to test
 * @returns {boolean} is the object a crio object
 */
crio.isObject = (object) => {
  return isCrio(object) && object.isObject();
};

/**
 * @function crio.object
 *
 * @description
 * convenience method for making crio objects
 *
 * @param {Object} object object to crio
 * @returns {CrioObject} crio object
 */
crio.object = (object = {}) => {
  if (!isObject(object)) {
    throw new TypeError('Object passed must be a plain object.');
  }

  return crio(object);
};

export default crio;
