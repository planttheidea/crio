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

import {
  CrioArray,
  CrioObject
} from './classes';

import {
  isArray,
  isCrio,
  isObject
} from './utils/is';

/**
 * generate a new CrioArray or CrioObject
 *
 * @param {*} object
 * @returns {CrioArray|CrioObject|*}
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

createCrio.array = (array = []) => {
  return new CrioArray(array);
};

createCrio.object = (object = {}) => {
  return new CrioObject(object);
};

export default createCrio;

