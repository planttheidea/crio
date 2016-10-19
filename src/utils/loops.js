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

/* eslint-disable valid-jsdoc */
/**
 * create a deeply-nested new object with value at last key location
 *
 * @param {string|number} key
 * @param {Array<string|number>} restOfKeys
 * @param {number} restOfKeys.length
 * @param {*} value
 * @returns {Array<*>|object}
 */
/* eslint-enable */
const createDeeplyNestedObject = ([key, ...restOfKeys], value) => {
  const isPlainItemArray = isNumber(key);
  const valueToSave = restOfKeys.length ? createDeeplyNestedObject(restOfKeys, value) : value;
  const plainObject = isPlainItemArray ? [] : {};

  if (isPlainItemArray) {
    plainObject.push(valueToSave);
  } else {
    plainObject[key] = valueToSave;
  }

  return plainObject;
};

/**
 * shallowly merge source objects into target object
 *
 * @param {Object} target
 * @param {Array<Object>} sources
 * @returns {Array<*>|Object}
 */
const mergeObjects = (target, sources) => {
  let plainObject = {...target};

  forEach(sources, (object) => {
    if (isPlainObject(object)) {
      plainObject = {
        ...plainObject,
        ...object
      };
    }
  });

  return plainObject;
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
 * shallowly clone an array, but setting the value at indexToSet
 *
 * @param {CrioArray} crioArray
 * @param {number} indexToSet
 * @param {*} valueToSet
 * @returns {Array<*>}
 */
const shallowCloneArrayWithValue = (crioArray, indexToSet, valueToSet) => {
  return [
    ...ARRAY_PROTOTYPE.slice.call(crioArray, 0, indexToSet),
    valueToSet,
    ...ARRAY_PROTOTYPE.slice.call(crioArray, indexToSet + 1)
  ];
};

/**
 * shallowly clone an object, but setting the value at key
 *
 * @param {CrioObject} crioObject
 * @param {string} key
 * @param {*} value
 * @returns {Object}
 */
const shallowCloneObjectWithValue = (crioObject, key, value) => {
  let plainObject = {
    [key]: value
  };

  forEach(crioObject.keys(), (currentKey) => {
    if (currentKey !== key) {
      plainObject[currentKey] = crioObject[currentKey];
    }
  });

  return plainObject;
};

export {convertToNumber};
export {createDeeplyNestedObject};
export {forEachObject};
export {mergeObjects};
export {shallowCloneArray};
export {shallowCloneArrayWithValue};
export {shallowCloneObjectWithValue};
