'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFINE_PROPERTY = Object.defineProperty;
var GET_OWN_PROPERTY_NAMES = Object.getOwnPropertyNames;
var TO_STRING = Object.prototype.toString;

var coerceToInteger = exports.coerceToInteger = function coerceToInteger(value) {
  return +value | 0;
};

var isArray = exports.isArray = function isArray(object) {
  return TO_STRING.call(object) === '[object Array]';
};

var isEqual = exports.isEqual = function isEqual(object1, object2) {
  if (object1 === object2) {
    return true;
  }

  if (!(isArray(object1) || isArray(object2)) && !(isObject(object1) || isObject(object2))) {
    return false;
  }

  if (object1.prototype !== object2.prototype) {
    return false;
  }

  var object1Properties = GET_OWN_PROPERTY_NAMES(object1);
  var object2Properties = GET_OWN_PROPERTY_NAMES(object2);
  var object1PropertiesLength = object1Properties.length;

  if (object1PropertiesLength !== object2Properties.length) {
    return false;
  }

  for (var index = 0; index < object1PropertiesLength; index++) {
    if (object1Properties[index] !== object2Properties[index]) {
      return false;
    }
  }

  return true;
};

var isObject = exports.isObject = function isObject(object) {
  return TO_STRING.call(object) === '[object Object]' && !!object;
};

var isUndefined = exports.isUndefined = function isUndefined(object) {
  return object === void 0;
};

var getMutableObject = exports.getMutableObject = function getMutableObject(object) {
  var mutableObject = isArray(object) ? [] : {};

  GET_OWN_PROPERTY_NAMES(object).forEach(function (property) {
    var value = object[property];

    if (isArray(value) || isObject(value)) {
      mutableObject[property] = getMutableObject(value);
    } else {
      var descriptor = Object.getOwnPropertyDescriptor(object, property);

      DEFINE_PROPERTY(mutableObject, property, {
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable,
        value: value,
        writable: descriptor.writable
      });
    }
  });

  return mutableObject;
};

var getRestOfObject = exports.getRestOfObject = function getRestOfObject(object, key) {
  if (isArray(object)) {
    return object.filter(function (item, itemIndex) {
      return itemIndex !== key;
    });
  }

  var tempObject = _extends({}, object);

  delete tempObject[key];

  return tempObject;
};

var setImmutable = exports.setImmutable = function setImmutable(object, property, value) {
  var descriptor = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  DEFINE_PROPERTY(object, property, {
    get: function get() {
      return value;
    },
    set: function set() {
      throw new SyntaxError('Cannot set the value for this object property directly, please use either the .set() or .setIn() method.');
    },

    configurable: false,
    enumerable: descriptor.enumerable || true
  });

  return object[property];
};

exports.default = {
  coerceToInteger: coerceToInteger,
  getMutableObject: getMutableObject,
  getRestOfObject: getRestOfObject,
  isArray: isArray,
  isEqual: isEqual,
  isObject: isObject,
  isUndefined: isUndefined,
  setImmutable: setImmutable
};