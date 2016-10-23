// ES2015
import 'core-js/modules/es6.array.copy-within';
import 'core-js/modules/es6.array.every';
import 'core-js/modules/es6.array.fill';
import 'core-js/modules/es6.array.find';
import 'core-js/modules/es6.array.find-index';
import 'core-js/modules/es6.array.iterator';
import 'core-js/modules/es6.array.some';

// ESNext
import 'core-js/modules/es7.array.includes';
import 'core-js/modules/es7.object.enumerable-entries';
import 'core-js/modules/es7.object.enumerable-keys';
import 'core-js/modules/es7.object.enumerable-values';

// external dependencies
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';

import {
  CrioArray,
  CrioObject,
  getCrioedValue
} from './classes';

import {
  isCrio,
  isCrioArray,
  isCrioObject
} from './utils/is';

const throwTypeError = (type) => {
  throw new TypeError(`Must pass ${type} to crio.${type}.`);
};

/**
 * generate a new CrioArray or CrioObject
 *
 * @param {*} object
 * @returns {CrioArray|CrioObject|Array<*>|Object|*}
 */
const createCrio = (object = {}) => {
  return getCrioedValue(object);
};

/**
 * create a new CrioArray
 *
 * @param {Array<*>} array
 * @returns {CrioArray}
 */
createCrio.array = (array = []) => {
  if (!isArray(array)) {
    throwTypeError('array');
  }
  
  return new CrioArray(array);
};

createCrio.isArray = isCrioArray;
createCrio.isCrio = isCrio;
createCrio.isObject = isCrioObject;

/**
 * create a new CrioObject
 *
 * @param {Object} object
 * @returns {CrioObject}
 */
createCrio.object = (object = {}) => {
  if (!isPlainObject(object)) {
    throwTypeError('object');
  }

  return new CrioObject(object);
};

export default createCrio;

