// external dependencies
import isNumber from 'lodash/isNumber';

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
 * @param {object} object
 * @param {array<*>} keys
 * @param {function} fn
 * @param {*} thisArg
 * @param {number} length
 */
const forEachObject = (object, keys, fn, thisArg, length = Object.keys(object).length) => {
  let index = length,
      key;

  while (--index > -1) {
    key = keys[index];

    fn.call(thisArg, object[key], key, object);
  }
};

/* eslint-disable valid-jsdoc */
/**
 * create a deeply-nested new object with value at last key location
 *
 * @param {string|number} key
 * @param {array<string|number>} restOfKeys
 * @param {number} restOfKeys.length
 * @param {*} value
 * @returns {array<*>|object}
 */
/* eslint-enable */
const createDeeplyNestedObject = ([key, ...restOfKeys], value) => {
  const isPlainItemArray = isNumber(key);
  const plainObject = isPlainItemArray ? [] : {};

  const valueToSave = restOfKeys.length ? createDeeplyNestedObject(restOfKeys, value) : value;

  if (isPlainItemArray) {
    plainObject.push(valueToSave);
  } else {
    plainObject[key] = valueToSave;
  }

  return plainObject;
};

/**
 * shallowly clone an array
 *
 * @param {array<*>} array
 * @returns {array<T>}
 */
const shallowCloneArray = (array) => {
  return ARRAY_PROTOTYPE.map.call(array, (value) => {
    return value;
  });
};

export {convertToNumber};
export {createDeeplyNestedObject};
export {forEachObject};
export {shallowCloneArray};
