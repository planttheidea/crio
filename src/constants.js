export const IS_PRODUCTION = !!(process && process.env && process.env.NODE_ENV === 'production');

export const CRIO_SYMBOL = Symbol('Crio');

export const ITERATOR_PROPERTY_DESCRIPTOR = {
  configurable: false,
  enumerable: false,
  value: function iterator() {
    const keys = Object.getOwnPropertyNames(this);
    const length = keys.length;

    let index = -1,
        value;

    return {
      next: () => {
        if (++index < length) {
          value = this[keys[index]];

          return {
            done: false,
            value
          };
        } else {
          return {
            done: true
          };
        }
      }
    };
  },
  writable: true
};

export const UNSCOPABLES_PROPERTY_DESCRIPTOR = {
  configurable: true,
  enumerable: false,
  value: {
    copyWithin: true,
    entries: true,
    fill: true,
    find: true,
    findIndex: true,
    includes: true,
    keys: true
  },
  writable: false
};

export const CRIO_TYPE = Symbol('Crio type');
export const CRIO_ARRAY_TYPE = 'CrioArray';
export const CRIO_OBJECT_TYPE = 'CrioObject';

export const REACT_ELEMENT_TYPE = (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) || 0xeac7;
