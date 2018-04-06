// classes
import CrioArray from './CrioArray';
import CrioObject from './CrioObject';

// constants
import {REACT_ELEMENT_TYPE} from './constants';

/**
 * @function isArray
 *
 * @description
 * is the object passed an array
 *
 * @param {*} object the object to test
 * @returns {boolean} is the object an array
 */
export const isArray = Array.isArray;

/**
 * @function isCrio
 *
 * @description
 * is the object passed a CrioArray or CrioObject
 *
 * @param {*} object the object to test
 * @returns {boolean} is the object a Crio*
 */
export const isCrio = (object) => object instanceof CrioArray || object instanceof CrioObject;

/**
 * @function isEqual
 *
 * @description
 * are the crio objects equal
 *
 * @param {CrioArray|CrioObject} crio crio object to test against
 * @param {*} object object to test equality with crio object for
 * @returns {boolean} are the objects equal
 */
export const isEqual = (crio, object) => isCrio(object) && crio.hashCode === object.hashCode;

/**
 * @function isFunction
 *
 * @description
 * is the object passed a function
 *
 * @param {*} object the object to test
 * @returns {boolean} is the object a function
 */
export const isFunction = (object) => typeof object === 'function';

/**
 * @function isNumber
 *
 * @description
 * is the object passed a number
 *
 * @param {*} object the object to test
 * @returns {boolean} is the object a number
 */
export const isNumber = (object) => typeof object === 'number';

/**
 * @function isReactElement
 *
 * @description
 * is the object passed a react element
 *
 * @param {*} object the object to test
 * @returns {boolean} is the object a react element
 */
export const isReactElement = (object) => !!object && object.$$typeof === REACT_ELEMENT_TYPE;

/**
 * @function isObject
 *
 * @description
 * is the object passed a plain object
 *
 * @param {*} object the object to test
 * @returns {boolean} is the object a  plain object
 */
export const isObject = (object) => !!object && object.constructor === Object && !isReactElement(object);

/**
 * @function isString
 *
 * @description
 * is the object passed a string
 *
 * @param {*} object the object to test
 * @returns {boolean} is the object a string
 */
export const isString = (object) => typeof object === 'string';

/**
 * @function isUndefined
 *
 * @description
 * is the object passed undefined
 *
 * @param {*} object the object to test
 * @returns {boolean} is the object undefined
 */
export const isUndefined = (object) => object === void 0;
