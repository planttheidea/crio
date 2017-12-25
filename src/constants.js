// utils
import {every, find, some} from './utils';

/**
 * @constant {Object} ARRAY_UNSCOPABLES
 */
export const ARRAY_UNSCOPABLES = {
  copyWithin: true,
  entries: true,
  fill: true,
  find: true,
  findIndex: true,
  findLastIndex: true,
  includes: true,
  keys: true,
  values: true
};

/**
 * @constant {Object} ARRAY_FALLBACK_PROTOTYPE_METHODS
 */
export const ARRAY_FALLBACK_PROTOTYPE_METHODS = {
  /**
   * @function every
   *
   * @description
   * does every instance in the array match
   *
   * @param {function} fn the function to test for matching
   * @returns {boolean} does every instance match
   */
  every(fn) {
    return every(this, fn);
  },

  /**
   * @function find
   *
   * @description
   * find an item in the array if it exists
   *
   * @param {function} fn function to test for finding the item
   * @param {number} [fromIndex] key to start from when performing the find
   * @returns {*} found item or undefined
   */
  find(fn, fromIndex) {
    return find(this, fn, fromIndex);
  },

  /**
   * @function findIndex
   *
   * @description
   * find the index of an item in the array if it exists
   *
   * @param {function} fn function to test for finding the item
   * @param {number} [fromIndex] key to start from when performing the find
   * @returns {number} index of match, or -1
   */
  findIndex(fn, fromIndex) {
    return find(this, fn, fromIndex, true);
  },

  /**
   * @function includes
   *
   * @description
   * does the array have the item passed
   *
   * @param {*} item item to test for existence
   * @returns {boolean} does the item exist in the array
   */
  includes(item) {
    return !!~this.indexOf(item);
  },

  /**
   * @function some
   *
   * @description
   * does any item in the array match the result from fn
   *
   * @param {function} fn the function to test for matching
   * @returns {boolean} does any item match
   */
  some(fn) {
    return some(this, fn);
  }
};

/**
 * @constant {Object} ARRAY_UNSCOPABLES
 */
export const OBJECT_UNSCOPABLES = {
  entries: true,
  fill: true,
  find: true,
  findKey: true,
  findLastKey: true,
  includes: true,
  keys: true,
  values: true
};

/**
 * @constant {Symbol|number}
 */
export const REACT_ELEMENT_TYPE =
  typeof Symbol === 'function' && Symbol.for
    ? Symbol.for('react.element')
    : 0xeac7;
