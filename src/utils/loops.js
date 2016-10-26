// external dependencies
import forEach from 'lodash/forEach';
import isNumber from 'lodash/isNumber';
import isPlainObject from 'lodash/isPlainObject';

import {
  ARRAY_PROTOTYPE
} from './constants';

/**
 * convert the value passed into its numeric form
 *
 * @param {*} value
 * @returns {number}
 */
const convertToNumber = (value) => {
  return +value;
};

/**
 * forEach loop specific to objects
 *
 * @param {CrioObject} crio
 * @param {Function} fn
 * @param {*} thisArg
 */
const forEachObject = (crio, fn, thisArg) => {
  forEach(crio.keys(), (key) => {
    fn.call(thisArg, crio[key], key, crio);
  });
};

/**
 * create a deeply-nested new object with value at last key location
 *
 * @param {Array<string|number>} keys
 * @param {*} value
 * @returns {Array<*>|object}
 */
const createDeeplyNestedObject = (keys, value) => {
  const [
    key,
    ...restOfKeys
  ] = keys;
  const valueToSave = restOfKeys.length ? createDeeplyNestedObject(restOfKeys, value) : value;

  return isNumber(key) ? [valueToSave] : {
    [key]: valueToSave
  };
};

/**
 * shallowly merge source objects into target object
 *
 * @param {Object} target
 * @param {Array<Object>} sources
 * @returns {Array<*>|Object}
 */
const mergeObjects = (target, sources) => {
  return sources.reduce((plainObject, source) => {
    if (isPlainObject(source)) {
      plainObject = {
        ...plainObject,
        ...source
      };
    }

    return plainObject;
  }, {...target});
};

/**
 * shallowly clone an array
 *
 * @param {Array<*>} array
 * @returns {Array<T>}
 */
const shallowCloneArray = (array) => {
  return ARRAY_PROTOTYPE.slice.call(array, 0, array.length);
};

/**
 * shallowly clone an object
 *
 * @param {Object} object
 * @returns {Object}
 */
const shallowCloneObject = (object) => {
  return {...object};
};

export {convertToNumber};
export {createDeeplyNestedObject};
export {forEachObject};
export {mergeObjects};
export {shallowCloneArray};
export {shallowCloneObject};
