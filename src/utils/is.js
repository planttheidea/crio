// external dependencies
import isObject from 'lodash/isObject';

import {
  CRIO_TYPE,
  REACT_ELEMENT_TYPE
} from './constants';

/**
 * determine if object passed is a Crio object
 *
 * @param {*} object
 * @returns {boolean}
 */
const isCrio = (object) => {
  return !!(object && object[CRIO_TYPE]);
};

/**
 * determine if object is a React element
 *
 * @param {any} object
 * @param {string|symbol} object.$$typeof
 * @return {boolean}
 */
const isReactElement = (object) => {
  return isObject(object) && object.$$typeof === REACT_ELEMENT_TYPE;
};

/**
 * are the two objects passed the same crio in type and value
 *
 * @param {CrioArray|CrioObject} crio1
 * @param {CrioArray|CrioObject} crio2
 * @returns {boolean}
 */
const isSameCrio = (crio1, crio2) => {
  return isCrio(crio1) && crio1.equals(crio2);
};

export {isCrio};
export {isReactElement};
export {isSameCrio};
