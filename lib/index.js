'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var immutableArrayMethods = {
  onlyApplyMethods: ['filter', 'slice'],
  fullCrio: ['concat', 'join', 'map', 'reduce']
};

var CREATE = Object.create;
var GET_OWN_PROPERTY_DESCRIPTOR = Object.getOwnPropertyDescriptor;
var GET_OWN_PROPERTY_NAMES = Object.getOwnPropertyNames;

var allAdditionalMethods = {
  delete: function _delete(key) {
    if ((0, _utils.isArray)(this)) {
      return (0, _utils.getRestOfObject)(this, key);
    }

    return addObjectPrototypeMethods(_extends({}, (0, _utils.getRestOfObject)(this, key)));
  },
  deleteIn: function deleteIn(keys) {
    if (!(0, _utils.isArray)(keys)) {
      return this;
    }

    return this;
  },
  equals: function equals(object) {
    return (0, _utils.isEqual)(this, object);
  },
  get: function get(key) {
    return this[key];
  },
  getIn: function getIn(keys) {
    if (!(0, _utils.isArray)(keys)) {
      return this;
    }

    var lastKeyIndex = keys.length - 1;

    var currentObject = this;

    for (var keyIndex = 0, length = lastKeyIndex + 1; keyIndex < length; keyIndex++) {
      var key = keys[keyIndex];

      if ((0, _utils.isUndefined)(currentObject[key]) || keyIndex === lastKeyIndex) {
        return currentObject[key];
      }

      currentObject = currentObject[key];
    }
  },
  log: function log(title) {
    var thawed = this.thaw();

    if (title) {
      console.log(title, thawed);
    } else {
      console.log(thawed);
    }

    return this;
  },
  merge: function merge() {
    var isThisArray = (0, _utils.isArray)(this);

    var shallowClone = isThisArray ? [].concat(_toConsumableArray(this)) : _extends({}, this);

    for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
      objects[_key] = arguments[_key];
    }

    objects.forEach(function (object) {
      for (var key in object) {
        shallowClone[key] = crio(object[key]);
      }
    });

    if (isThisArray) {
      return addArrayPrototypeMethods(shallowClone);
    }

    return addObjectPrototypeMethods(shallowClone);
  },
  mergeIn: function mergeIn(keys) {
    if (!(0, _utils.isArray)(keys)) {
      return this;
    }

    var lastKeyIndex = keys.length - 1;

    var currentObject = this.thaw(),
        referenceToCurrentObject = currentObject;

    for (var _len2 = arguments.length, objects = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      objects[_key2 - 1] = arguments[_key2];
    }

    for (var keyIndex = 0, length = lastKeyIndex + 1; keyIndex < length; keyIndex++) {
      var key = keys[keyIndex];
      var currentValue = currentObject[key];

      if (!(0, _utils.isArray)(currentValue) && !(0, _utils.isObject)(currentValue)) {
        currentObject[key] = {};
      }

      if (keyIndex === lastKeyIndex) {
        currentObject[key] = this.merge.apply(currentObject[key], objects);
        break;
      }

      currentObject = currentObject[key];
    }

    return crio(referenceToCurrentObject);
  },
  mutate: function mutate(mutateMapFunction) {
    return crio(this.map.call(this.thaw(), mutateMapFunction));
  },
  set: function set(key, value) {
    if (!key) {
      return this;
    }

    if ((0, _utils.isArray)(this)) {
      return this.map(function (item, itemIndex) {
        if (itemIndex === key) {
          return crio(value);
        }

        return item;
      });
    }

    return addObjectPrototypeMethods(_extends({}, (0, _utils.getRestOfObject)(this, key), _defineProperty({}, key, crio(value))));
  },
  setIn: function setIn(keys, value) {
    if (!(0, _utils.isArray)(keys)) {
      return this;
    }

    var lastKeyIndex = keys.length - 1;

    var currentObject = this.thaw(),
        referenceToCurrentObject = currentObject;

    for (var keyIndex = 0, length = lastKeyIndex + 1; keyIndex < length; keyIndex++) {
      var key = keys[keyIndex];
      var currentValue = currentObject[key];

      if (!(0, _utils.isArray)(currentValue) && !(0, _utils.isObject)(currentValue)) {
        currentObject[key] = {};
      }

      if (keyIndex === lastKeyIndex) {
        currentObject[key] = crio(value);
        break;
      }

      currentObject = currentObject[key];
    }

    return crio(referenceToCurrentObject);
  },
  thaw: function thaw() {
    return (0, _utils.getMutableObject)(this);
  }
};
var arrayAdditionalMethods = {
  copyWithin: function copyWithin(targetIndex, startIndex) {
    var endIndex = arguments.length <= 2 || arguments[2] === undefined ? this.length : arguments[2];

    targetIndex = (0, _utils.coerceToInteger)(targetIndex);
    startIndex = (0, _utils.coerceToInteger)(startIndex);
    endIndex = (0, _utils.coerceToInteger)(endIndex);

    if (startIndex < 0) {
      startIndex = this.length + startIndex;
    }

    if (endIndex < 0) {
      endIndex = this.length + endIndex;
    }

    var copyValues = this.slice(startIndex, endIndex);

    var copyIndex = 0;

    return this.map(function (item, itemIndex) {
      if (copyIndex === copyValues.length || itemIndex >= startIndex && itemIndex < endIndex) {
        return item;
      }

      copyIndex++;

      return copyValues[copyIndex - 1];
    });
  },
  fill: function fill(value) {
    var startIndex = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var endIndex = arguments.length <= 2 || arguments[2] === undefined ? this.length : arguments[2];

    startIndex = (0, _utils.coerceToInteger)(startIndex);
    endIndex = (0, _utils.coerceToInteger)(endIndex);

    value = crio(value);

    if (startIndex < 0) {
      startIndex = this.length + startIndex;
    }

    if (endIndex < 0) {
      endIndex = this.length + endIndex;
    }

    var tempArray = addArrayPrototypeMethods([]);

    this.forEach(function (item, itemIndex) {
      if (itemIndex >= startIndex && itemIndex < endIndex) {
        tempArray[itemIndex] = value;
      } else {
        tempArray[itemIndex] = item;
      }
    });

    return tempArray;
  },
  forEach: function forEach(forEachFunction) {
    for (var index = 0, length = this.length; index < length; index++) {
      var result = forEachFunction.call(this, this[index], index, this);

      if (result === false) {
        break;
      }
    }

    return this;
  },
  pop: function pop() {
    var tempArray = [].concat(_toConsumableArray(this.slice(0, this.length - 1)));

    return addArrayPrototypeMethods(tempArray);
  },
  push: function push() {
    var tempArray = addArrayPrototypeMethods([].concat(_toConsumableArray(this))),
        length = this.length;

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    args.forEach(function (arg) {
      (0, _utils.setImmutable)(tempArray, length, crio(arg));
      length++;
    });

    return tempArray;
  },
  reverse: function reverse() {
    var tempArray = [].concat(_toConsumableArray(this)).reverse();

    return addArrayPrototypeMethods(tempArray);
  },
  shift: function shift() {
    var tempArray = [].concat(_toConsumableArray(this.slice(1, this.length)));

    return addArrayPrototypeMethods(tempArray);
  },
  sort: function sort(sortFunction) {
    var tempArray = (0, _utils.getMutableObject)(this);

    tempArray.sort(sortFunction);

    return crioArray(tempArray);
  },
  splice: function splice(startIndex) {
    for (var _len4 = arguments.length, items = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
      items[_key4 - 2] = arguments[_key4];
    }

    var deleteCount = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

    startIndex = (0, _utils.coerceToInteger)(startIndex);
    deleteCount = (0, _utils.coerceToInteger)(deleteCount);

    items.forEach(function (item, itemIndex) {
      items[itemIndex] = crio(item);
    });

    var tempArray = [].concat(_toConsumableArray(this.slice(0, startIndex)), items, _toConsumableArray(this.slice(startIndex + deleteCount, this.length)));

    return addArrayPrototypeMethods(tempArray);
  },
  unshift: function unshift() {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    args.forEach(function (arg, argIndex) {
      args[argIndex] = crio(arg);
    });

    var tempArray = [].concat(args, _toConsumableArray(this));

    return addArrayPrototypeMethods(tempArray);
  }
};
var objectAdditionalMethods = {
  filter: function filter(filterFunction) {
    var thisProperties = GET_OWN_PROPERTY_NAMES(this);

    var newObject = addObjectPrototypeMethods({});

    for (var index = 0, length = thisProperties.length; index < length; index++) {
      var property = thisProperties[index];
      var descriptor = GET_OWN_PROPERTY_DESCRIPTOR(this, property);
      var result = filterFunction.call(this, this[property], property, this);

      if (result !== false) {
        (0, _utils.setImmutable)(newObject, property, result, descriptor);
      }
    }

    return newObject;
  },
  forEach: function forEach(forEachFunction) {
    var thisProperties = GET_OWN_PROPERTY_NAMES(this);

    for (var index = 0, length = thisProperties.length; index < length; index++) {
      var property = thisProperties[index];
      var result = forEachFunction.call(this, this[property], property, this);

      if (result === false) {
        break;
      }
    }

    return this;
  },
  map: function map(mapFunction) {
    var thisProperties = GET_OWN_PROPERTY_NAMES(this);

    var newObject = addObjectPrototypeMethods({});

    for (var index = 0, length = thisProperties.length; index < length; index++) {
      var property = thisProperties[index];
      var descriptor = GET_OWN_PROPERTY_DESCRIPTOR(this, property);

      (0, _utils.setImmutable)(newObject, property, mapFunction.call(this, this[property], property, this), descriptor);
    }

    return newObject;
  }
};

var arrayMethods = _extends({}, allAdditionalMethods, arrayAdditionalMethods);

immutableArrayMethods.onlyApplyMethods.forEach(function (method) {
  arrayMethods[method] = function () {
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    args.forEach(function (arg, argIndex) {
      args[argIndex] = crio(arg);
    });

    return addArrayPrototypeMethods(Array.prototype[method].apply(this, args));
  };
});

immutableArrayMethods.fullCrio.forEach(function (method) {
  arrayMethods[method] = function () {
    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    args.forEach(function (arg, argIndex) {
      args[argIndex] = crio(arg);
    });

    return crio(Array.prototype[method].apply(this, args));
  };
});

var objectMethods = _extends({}, Object.prototype, allAdditionalMethods, objectAdditionalMethods);

var addArrayPrototypeMethods = function addArrayPrototypeMethods(array) {
  return Object.assign([], array, arrayMethods);
};

var addObjectPrototypeMethods = function addObjectPrototypeMethods(object) {
  var newObject = CREATE(objectMethods);

  GET_OWN_PROPERTY_NAMES(object).forEach(function (property) {
    var descriptor = GET_OWN_PROPERTY_DESCRIPTOR(object, property);

    Object.defineProperty(newObject, property, descriptor);
  });

  return newObject;
};

var crioArray = function crioArray(array) {
  var crioedArray = addArrayPrototypeMethods([]);

  array.forEach(function (item, itemIndex) {
    var itemValue = item;

    if ((0, _utils.isArray)(item)) {
      itemValue = crioArray(item);
    } else if ((0, _utils.isObject)(item)) {
      itemValue = crioObject(item);
    }

    (0, _utils.setImmutable)(crioedArray, itemIndex, itemValue);
  });

  return crioedArray;
};

var crioObject = function crioObject(object) {
  var crioedObject = CREATE(objectMethods);

  GET_OWN_PROPERTY_NAMES(object).forEach(function (property) {
    var itemValue = object[property];

    if ((0, _utils.isArray)(itemValue)) {
      itemValue = crioArray(itemValue);
    } else if ((0, _utils.isObject)(itemValue)) {
      itemValue = crioObject(itemValue);
    }

    (0, _utils.setImmutable)(crioedObject, property, itemValue, GET_OWN_PROPERTY_DESCRIPTOR(object, property));
  });

  return crioedObject;
};

var crio = function crio() {
  var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  if ((0, _utils.isArray)(object)) {
    return crioArray(object);
  }

  if ((0, _utils.isObject)(object)) {
    return crioObject(object);
  }

  return object;
};

exports.default = crio;
module.exports = exports['default'];