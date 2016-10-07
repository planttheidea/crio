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

export {isCrio};
export {isReactElement};
