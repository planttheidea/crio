// external dependencies
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';

// Crio
import {
  CrioArray,
  CrioObject
} from './Crio';

// utils
import {
  isCrio
} from './utils';

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
  if (isArray(object)) {
    return new CrioArray(object);
  }

  if (isPlainObject(object)) {
    return new CrioObject(object);
  }

  if (isCrio(object)) {
    return object;
  }

  throw new TypeError('Object passed must be either an array or a plain object.');
};

export default crio;
