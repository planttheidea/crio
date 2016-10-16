// external dependencies
import hashIt from 'hash-it';

// utils
import {
  CRIO_HASH_CODE,
  IS_PRODUCTION,
  OBJECT,
  OBJECT_KEYS
} from './constants';
import {
  isCrio,
  isCrioArray
} from './is';
import {
  createDeeplyNestedObject
} from './loops';

/**
 * build prototype object to add to default prototype
 *
 * @param {Object} prototype
 * @returns {Object}
 */
const createPrototypeObject = (prototype) => {
  const keys = OBJECT_KEYS(prototype);
  const propertySymbols = OBJECT.getOwnPropertySymbols(prototype);
  const allPropertyItems = [
    ...keys,
    ...propertySymbols
  ];

  return allPropertyItems.reduce((accumulatedPrototype, key) => {
    const value = prototype[key];

    return {
      ...accumulatedPrototype,
      [key]: {
        configurable: true,
        enumerable: false,
        value,
        writable: true
      }
    };
  }, {});
};

/**
 * run Object.freeze on the crio only in non-production environments
 *
 * @param {CrioArray|CrioObject} crio
 * @returns {CrioArray|CrioObject}
 */
const freezeIfNotProduction = (crio) => {
  if (IS_PRODUCTION) {
    return crio;
  }

  return Object.freeze(crio);
};

/**
 * get the plain object version of the value passed
 *
 * @param {Array<*>|Object|CrioArray|CrioObject} value
 * @returns {Array<*>|Object}
 */
const getCleanValue = (value) => {
  return isCrio(value) ? value.thaw() : value;
};

/**
 * get the value for setIn
 *
 * @param {*} currentValue
 * @param {*} value
 * @param {boolean} isMatchingKey
 * @param {Array<string>} restOfKeys
 * @returns {*}
 */
const getDeeplyNestedValue = (currentValue, value, isMatchingKey, restOfKeys) => {
  if (!isMatchingKey) {
    return currentValue;
  }

  return isCrio(currentValue) ? currentValue.setIn(restOfKeys, value) :
    createDeeplyNestedObject(restOfKeys, value);
};

/**
 * get the plain object version of the crio type
 *
 * @param {CrioArray|CrioObject} crio
 * @param {number} crio.length
 * @param {boolean} isDynamicLength=true
 * @returns {Array|Object}
 */
const getPlainObject = (crio, isDynamicLength = true) => {
  if (isCrioArray(crio)) {
    return isDynamicLength ? [] : new Array(crio.length);
  }

  return {};
};

/**
 * return the original object if the values have not changed
 *
 * @param {CrioArray|CrioObject} crio
 * @param {Array<*>|Object} potentialCrio
 * @returns {CrioArray|CrioObject}
 */
const getSameCrioIfUnchanged = (crio, potentialCrio) => {
  const hashCode = hashIt(potentialCrio);

  if (crio[CRIO_HASH_CODE] === hashCode) {
    return crio;
  }

  return new crio.constructor(potentialCrio, hashCode);
};

export {createPrototypeObject};
export {freezeIfNotProduction};
export {getCleanValue};
export {getDeeplyNestedValue};
export {getPlainObject};
export {getSameCrioIfUnchanged};
