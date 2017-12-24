// classes
import CrioArray from './CrioArray';

// utils
import {every, find, getRelativeValue, some} from './utils';

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
   * @function copyWithin
   *
   * @description
   * move values around within the array
   *
   * @param {number} targetIndex target to copy
   * @param {number} [startIndex=0] index to start copying to
   * @param {number} [endIndex=this.length] index to stop copying to
   * @returns {CrioArray} array with target copied in appropriate spots
   */
  copyWithin(targetIndex, startIndex = 0, endIndex = this.length) {
    const clone = [...this];
    const length = this.length >>> 0;

    let to = getRelativeValue(targetIndex >> 0, length),
        from = getRelativeValue(startIndex >> 0, length);

    const final = getRelativeValue(endIndex >> 0, length);

    let count = Math.min(final - from, length - to),
        direction = 1;

    if (from < to && to < from + count) {
      direction = -1;
      from += count - 1;
      to += count - 1;
    }

    while (count > 0) {
      if (from in clone) {
        clone[to] = clone[from];
      } else {
        delete clone[to];
      }

      from += direction;
      to += direction;
      count--;
    }

    return new CrioArray(clone);
  },

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
   * @function fill
   *
   * @description
   * fill the array at certain indices with the value passed
   *
   * @param {*} value the value to fill the indices with
   * @param {number} [startIndex=0] the starting index to fill
   * @param {number} [endIndex=this.length] the ending index to fill
   * @returns {CrioArray} array with values filled appropriately
   */
  fill(value, startIndex = 0, endIndex = this.length) {
    const from = startIndex < 0 ? this.length + startIndex : startIndex;
    const to = endIndex < 0 ? this.length + endIndex : endIndex;

    return this.map((item, index) => {
      return index >= from && index < to ? value : item;
    });
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
export const REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for ? Symbol.for('react.element') : 0xeac7;
