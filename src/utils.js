// classes
import CrioArray from './CrioArray';
import CrioObject from './CrioObject';

// is
import {isArray, isCrio, isObject, isReactElement} from './is';

/**
 * @function createIterator
 *
 * @description
 * create a new iterator method
 *
 * @returns {function} the iterator method
 */
export const createIterator = () => {
  return function iterator() {
    const keys = this.keys();
    const length = keys.length;

    let index = 0,
      value;

    return {
      next: () => {
        if (index < length) {
          value = this[keys[index++]];

          return {
            done: false,
            value
          };
        }

        return {
          done: true
        };
      }
    };
  };
};

/**
 * @function every
 *
 * @description
 * does every result from calling fn match
 *
 * @param {CrioArray|CrioObject} object the object to test
 * @param {function} fn the function to perform the test on each item with
 * @returns {boolean} does every item match
 */
export const every = (object, fn) => {
  const objectKeys = object.keys();

  let key;

  for (let index = 0; index < objectKeys.length; index++) {
    key = objectKeys[index];

    if (!fn(object[key], key, object)) {
      return false;
    }
  }

  return true;
};

/**
 * @function find
 *
 * @description
 * find an item in the array if it exists
 *
 * @param {CrioArray|CrioObject} object the object to search
 * @param {function} fn function to test for finding the item
 * @param {boolean} [isKey] is the search for a key
 * @param {boolean} [isFromEnd] is the search for a key
 * @returns {*} found item or undefined
 */
export const find = (object, fn, isKey, isFromEnd) => {
  const objectKeys = isFromEnd ? object.keys().reverse() : object.keys();

  let key;

  for (let index = 0; index < objectKeys.length; index++) {
    key = objectKeys[index];

    if (fn(object[key], key, object)) {
      return isKey ? key : object[key];
    }
  }

  if (isKey) {
    return object.isArray() ? -1 : undefined;
  }

  return undefined;
};

/**
 * @function getCrioedObject
 *
 * @description
 * get the object converted to a CrioArray or CrioObject, if applicable
 *
 * @param {*} object the object to potentially crio
 * @returns {*} either the crioed object, or the object itself
 */
export const getCrioedObject = (object) => {
  if (!object || typeof object !== 'object') {
    return object;
  }

  if (isArray(object)) {
    return object instanceof CrioArray ? object : new CrioArray(object);
  }

  return isObject(object) ? new CrioObject(object) : object;
};

/**
 * @function getEntries
 *
 * @description
 * get the [key, value] pairs of the object
 *
 * @param {CrioArray|CrioObject} object the object to get the entries of
 * @returns {CrioArray} the entries of the object
 */
export const getEntries = (object) => {
  return object.keys().map((key) => {
    return [key, object[key]];
  });
};

/**
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
 * @function getValues
 *
 * @description
 * get the values of the object
 *
 * @param {CrioArray|CrioObject} object the object to get the values of
 * @returns {CrioArray} the values of the object
 */
export const getValues = (object) => {
  return object.keys().map((key) => {
    return object[key];
  });
};

/**
 * @function some
 *
 * @description
 * does any result from calling fn match
 *
 * @param {CrioArray|CrioObject} object the object to test
 * @param {function} fn the function to perform the test on each item with
 * @returns {boolean} does any item match
 */
export const some = (object, fn) => {
  const objectKeys = object.keys();

  let key;

  for (let index = 0; index < objectKeys.length; index++) {
    key = objectKeys[index];

    if (fn(object[key], key, object)) {
      return true;
    }
  }

  return false;
};

/**
 * @function thaw
 *
 * @description
 * convert the CrioArray or CrioObject passed to a plain JS object
 *
 * @param {CrioArray|CrioObject} object the object to convert
 * @returns {Array|Object} the plain JS version of the object passed
 */
export const thaw = (object) => {
  if (!isCrio(object)) {
    return object;
  }

  return object.isArray()
    ? [...object].map((item) => {
        return thaw(item);
      })
    : Object.keys(object).reduce((reducedObject, key) => {
        reducedObject[key] = thaw(object[key]);

        return reducedObject;
      }, {});
};
