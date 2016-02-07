const DEFINE_PROPERTY = Object.defineProperty;
const GET_OWN_PROPERTY_NAMES = Object.getOwnPropertyNames;
const TO_STRING = Object.prototype.toString;

export const coerceToInteger = (value) => {
  return +value | 0;
};

export const isArray = (object) => {
  return TO_STRING.call(object) === '[object Array]';
};

export const isEqual = (object1, object2) => {
  if (object1 === object2) {
    return true;
  }

  if (!(isArray(object1) || isArray(object2)) && !(isObject(object1) || isObject(object2))) {
    return false;
  }

  if (object1.prototype !== object2.prototype) {
    return false;
  }

  const object1Properties = GET_OWN_PROPERTY_NAMES(object1);
  const object2Properties = GET_OWN_PROPERTY_NAMES(object2);
  const object1PropertiesLength = object1Properties.length;

  if (object1PropertiesLength !== object2Properties.length) {
    return false;
  }

  for (let index = 0; index < object1PropertiesLength; index++) {
    if (object1Properties[index] !== object2Properties[index]) {
      return false;
    }
  }

  return true;
};

export const isObject = (object) => {
  return TO_STRING.call(object) === '[object Object]' && !!object;
};

export const isUndefined = (object) => {
  return object === void 0;
};

export const getMutableObject = (object) => {
  let mutableObject = isArray(object) ? [] : {};

  GET_OWN_PROPERTY_NAMES(object).forEach((property) => {
    const value = object[property];

    if (isArray(value) || isObject(value)) {
      mutableObject[property] = getMutableObject(value);
    } else {
      const descriptor = Object.getOwnPropertyDescriptor(object, property);

      DEFINE_PROPERTY(mutableObject, property, {
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable,
        value,
        writable: descriptor.writable
      });
    }
  });

  return mutableObject;
};

export const getRestOfObject = (object, key) => {
  if (isArray(object)) {
    return object.filter((item, itemIndex) => {
      return itemIndex !== key;
    });
  }

  let tempObject = {...object};

  delete tempObject[key];

  return tempObject;
};

export const setImmutable = (object, property, value, descriptor = {}) => {
  DEFINE_PROPERTY(object, property, {
    get() {
      return value;
    },
    set() {
      throw new SyntaxError('Cannot set the value for this object property directly, please use either the .set() or .setIn() method.');
    },
    configurable: false,
    enumerable: descriptor.enumerable || true
  });

  return object[property];
};

export default {
  coerceToInteger,
  getMutableObject,
  getRestOfObject,
  isArray,
  isEqual,
  isObject,
  isUndefined,
  setImmutable
};