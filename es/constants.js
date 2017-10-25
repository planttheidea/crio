/**
 * @private
 *
 * @constant {boolean}
 * @default
 */
export var IS_PRODUCTION = !!(process && process.env && process.env.NODE_ENV === 'production');

/**
 * @private
 *
 * @constant {Symbol}
 */
export var CRIO_SYMBOL = Symbol('Crio');

/**
 * @private
 *
 * @constant {{configurable: boolean, enumerable: boolean, value: function(): Object, writable: boolean}}
 */
export var ITERATOR_PROPERTY_DESCRIPTOR = {
  configurable: false,
  enumerable: false,
  value: function iterator() {
    var _this = this;

    var keys = Object.getOwnPropertyNames(this);
    var length = keys.length;

    var index = -1,
        value = void 0;

    return {
      next: function next() {
        if (++index < length) {
          value = _this[keys[index]];

          return {
            done: false,
            value: value
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

/**
 * @private
 *
 * @constant {{configurable: boolean, enumerable: boolean, value: Object, writable: boolean}}
 */
export var UNSCOPABLES_PROPERTY_DESCRIPTOR = {
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

/**
 * @private
 *
 * @constant {Symbol}
 */
export var CRIO_TYPE = Symbol('Crio type');

/**
 * @private
 *
 * @constant {string}
 * @default
 */
export var CRIO_ARRAY_TYPE = 'CrioArray';

/**
 * @private
 *
 * @constant {string}
 * @default
 */
export var CRIO_OBJECT_TYPE = 'CrioObject';

/**
 * @private
 *
 * @constant {Symbol|number}
 */
export var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

/**
   * @private
   *
   * @constant {Object}
   */
export var STRINGIFIER_OPTIONS = {
  maxDepth: 10
};