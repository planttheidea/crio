// constants
import {
  CRIO_ARRAY,
  CRIO_OBJECT,
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
 * determine if object passed is a CrioArray
 *
 * @param {*} object
 * @returns {boolean}
 */
const isCrioArray = (object) => {
  return isCrio(object) && object[CRIO_TYPE] === CRIO_ARRAY;
};

/**
 * determine if object passed is a CrioObject
 *
 * @param {*} object
 * @returns {boolean}
 */
const isCrioObject = (object) => {
  return isCrio(object) && object[CRIO_TYPE] === CRIO_OBJECT;
};

/**
 * determine if object is a React element
 *
 * @param {any} object
 * @param {string|Symbol} object.$$typeof
 * @return {boolean}
 */
const isReactElement = (object) => {
  return !!object && object.$$typeof === REACT_ELEMENT_TYPE;
};

export {isCrio};
export {isCrioArray};
export {isCrioObject};
export {isReactElement};
