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
import isObject from 'lodash/isObject';

import {
  CrioArray,
  CrioObject
} from './classes';

import {
  isCrio
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
  if (isCrio(object)) {
    return object;
  }

  if (isArray(object)) {
    return new CrioArray(object);
  }

  if (isObject(object)) {
    return new CrioObject(object);
  }

  return object;
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

/**
 * create a new CrioObject
 *
 * @param {Object} object
 * @returns {CrioObject}
 */
createCrio.object = (object = {}) => {
  if (!isObject(object)) {
    throwTypeError('object');
  }

  return new CrioObject(object);
};

export default createCrio;

