import {
  ARRAY_PROTOTYPE,
  CRIO_ARRAY,
  CRIO_ARRAY_TYPE,
  OBJECT_DEFINE_PROPERTY,
  OBJECT_ENTRIES,
  OBJECT_GET_OWN_PROPERTY_SYMBOLS,
  OBJECT_KEYS,
  OBJECT_VALUES
} from './constants';

import {
  filterArray,
  filterObject,
  forEach,
  mapArray,
  mapObject,
  reduce,
  reduceRight
} from './utils';

const entries = ARRAY_PROTOTYPE.entries;
const keys = ARRAY_PROTOTYPE.keys;
const values = ARRAY_PROTOTYPE.values;

const CRIO_ARRAY_PROTOTYPE_METHODS = {
  [CRIO_ARRAY_TYPE]: CRIO_ARRAY,

  entries() {
    return entries.call(this);
  },

  filter(fn, thisArg = this) {
    return filterArray(this, fn, thisArg);
  },

  forEach(fn, thisArg = this) {
    forEach(this, fn, thisArg);
  },

  keys() {
    return keys.call(this);
  },

  map(fn, thisArg = this) {
    return mapArray(this, fn, thisArg);
  },

  reduce(fn, defaultArgument, thisArg = this) {
    return reduce(this, fn, defaultArgument, thisArg);
  },

  reduceRight(fn, defaultArgument, thisArg = this) {
    return reduceRight(this, fn, defaultArgument, thisArg);
  },

  values() {
    return values.call(this);
  },

  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};

const CRIO_ARRAY_PROTOTYPE = ((methods) => {
  const crioArrayPrototype = OBJECT_KEYS(methods).reduce((prototype, key) => {
    return OBJECT_DEFINE_PROPERTY(prototype, key, {
      configurable: true,
      enumerable: false,
      value: methods[key],
      writable: true
    });
  }, Object.create(null));

  return OBJECT_GET_OWN_PROPERTY_SYMBOLS(methods).reduce((prototype, key) => {
    return OBJECT_DEFINE_PROPERTY(prototype, key, {
      configurable: true,
      enumerable: false,
      value: methods[key],
      writable: true
    });
  }, crioArrayPrototype);
})(CRIO_ARRAY_PROTOTYPE_METHODS);

const createObjectLoopHandler = (object, fn, thisArg) => {
  return (key) => {
    return fn.call(thisArg, object[key], key, object);
  };
};

const CRIO_OBJECT_PROTOTYPE_METHODS = {
  entries() {
    return OBJECT_ENTRIES(this);
  },

  filter(fn, thisArg = this) {
    return filterObject(this, this.keys(), fn.bind(thisArg), thisArg);
  },

  forEach(fn, thisArg = this) {
    forEach(this.keys(), createObjectLoopHandler(this, fn, thisArg), thisArg);
  },

  keys() {
    return OBJECT_KEYS(this);
  },

  map(fn, thisArg = this) {
    return mapObject(this, createObjectLoopHandler(this, fn, thisArg), thisArg);
  },

  reduce(fn, defaultArgument, thisArg = this) {
    return reduce(this.keys(), createObjectLoopHandler(this, fn, thisArg), defaultArgument, thisArg);
  },

  reduceRight(fn, defaultArgument, thisArg = this) {
    return reduceRight(this.keys(), createObjectLoopHandler(this, fn, thisArg), defaultArgument, thisArg);
  },

  values() {
    return OBJECT_VALUES(this);
  },

  [Symbol.iterator]() {
    const keys = this.keys();

    let index = 0;

    return {
      next: () => {
        const key = keys[index];
        const value = this[key];

        if (index < this.length) {
          index++;

          return {
            done: false,
            key,
            value
          };
        } else {
          return {
            done: true
          };
        }
      }
    };
  }
};

const CRIO_OBJECT_PROTOTYPE = ((methods) => {
  const crioArrayPrototype = OBJECT_KEYS(methods).reduce((prototype, key) => {
    return OBJECT_DEFINE_PROPERTY(prototype, key, {
      configurable: true,
      enumerable: false,
      value: methods[key],
      writable: true
    });
  }, Object.create(null));

  return OBJECT_GET_OWN_PROPERTY_SYMBOLS(methods).reduce((prototype, key) => {
    return OBJECT_DEFINE_PROPERTY(prototype, key, {
      configurable: true,
      enumerable: false,
      value: methods[key],
      writable: true
    });
  }, crioArrayPrototype);
})(CRIO_OBJECT_PROTOTYPE_METHODS);

export {CRIO_ARRAY_PROTOTYPE};
export {CRIO_OBJECT_PROTOTYPE};
