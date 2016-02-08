import CRIO_IDENTIFIER from './crioIdentifier';
import {
  coerceToInteger,
  getMutableObject,
  getRestOfObject,
  isArray,
  isEqual,
  isObject,
  isUndefined,
  setImmutable
} from './utils';

const immutableArrayMethods = {
  onlyApplyMethods: [
    'filter',
    'slice'
  ],
  fullCrio: [
    'join',
    'map',
    'reduce',
    'reduceRight'
  ]
};

const ASSIGN = Object.assign;
const CREATE = Object.create;
const DEFINE_PROPERTY = Object.defineProperty;
const FREEZE = Object.freeze;
const GET_OWN_PROPERTY_DESCRIPTOR = Object.getOwnPropertyDescriptor;
const GET_OWN_PROPERTY_NAMES = Object.getOwnPropertyNames;
const KEYS = Object.keys;

const isCrio = (object) => {
  return !!object[CRIO_IDENTIFIER];
};

const allAdditionalMethods = {
  delete(key) {
    if (isArray(this)) {
      return getRestOfObject(this, key);
    }

    return returnFrozenWithMethods({
      ...getRestOfObject(this, key)
    }, false);
  },

  deleteIn(keys) {
    if (!isArray(keys)) {
      return this;
    }

    const lastKeyIndex = keys.length - 1;

    let currentObject = this.thaw(),
        referenceToCurrentObject = currentObject;

    for (let keyIndex = 0, length = lastKeyIndex + 1; keyIndex < length; keyIndex++) {
      const key = keys[keyIndex];
      const currentValue = currentObject[key];

      if (keyIndex === lastKeyIndex) {
        delete currentObject[key];
        break;
      }

      if (!isArray(currentValue) && !isObject(currentValue)) {
        return this;
      }

      currentObject = currentObject[key];
    }

    return crio(referenceToCurrentObject);
  },

  equals(object) {
    return isEqual(this, object);
  },

  get(key) {
    return this[key];
  },

  getIn(keys) {
    if (!isArray(keys)) {
      return this;
    }

    const lastKeyIndex = keys.length - 1;

    let currentObject = this;

    for (let keyIndex = 0, length = lastKeyIndex + 1; keyIndex < length; keyIndex++) {
      const key = keys[keyIndex];

      if (isUndefined(currentObject[key]) || keyIndex === lastKeyIndex) {
        return currentObject[key];
      }

      currentObject = currentObject[key];
    }
  },

  log(title) {
    const thawed = this.thaw();

    if (title) {
      console.log(title, thawed);
    } else {
      console.log(thawed);
    }

    return this;
  },

  merge(...objects) {
    const isThisArray = isArray(this);

    let shallowClone = isThisArray ? [...this] : {...this};

    objects.forEach((object) => {
      for (let key in object) {
        shallowClone[key] = crio(object[key]);
      }
    });

    return returnFrozenWithMethods(shallowClone, isThisArray);
  },

  mergeIn(keys, ...objects) {
    if (!isArray(keys)) {
      return this;
    }

    const lastKeyIndex = keys.length - 1;

    let currentObject = this.thaw(),
        referenceToCurrentObject = currentObject;

    for (let keyIndex = 0, length = lastKeyIndex + 1; keyIndex < length; keyIndex++) {
      const key = keys[keyIndex];
      const currentValue = currentObject[key];

      if (!isArray(currentValue) && !isObject(currentValue)) {
        currentObject[key] = {};
      }

      if (keyIndex === lastKeyIndex) {
        currentObject[key] = this.merge.apply(currentObject[key], objects);
        break;
      }

      currentObject = currentObject[key];
    }

    return crio(referenceToCurrentObject, isArray(this));
  },

  mutate(mutateMapFunction) {
    const result = mutateMapFunction.call(this, this.thaw());

    return crio(result);
  },

  set(key, value) {
    if (!key) {
      return this;
    }

    const isThisArray = isArray(this);

    if (isThisArray) {
      return this.map((item, itemIndex) => {
        if (itemIndex === key) {
          return crio(value);
        }

        return item;
      });
    }

    return returnFrozenWithMethods({
      ...getRestOfObject(this, key),
      [key]: crio(value)
    }, isThisArray);
  },

  setIn(keys, value) {
    if (!isArray(keys)) {
      return this;
    }

    const lastKeyIndex = keys.length - 1;

    let currentObject = this.thaw(),
        referenceToCurrentObject = currentObject;

    for (let keyIndex = 0, length = lastKeyIndex + 1; keyIndex < length; keyIndex++) {
      const key = keys[keyIndex];
      const currentValue = currentObject[key];

      if (!isArray(currentValue) && !isObject(currentValue)) {
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

  thaw() {
    return getMutableObject(this);
  }
};
const arrayAdditionalMethods = {
  concat(...args) {
    args.forEach((arg, argIndex) => {
      args[argIndex] = crio(arg);
    });

    return returnFrozenWithMethods(Array.prototype.concat.apply(this, args), true);
  },

  copyWithin(targetIndex, startIndex, endIndex = this.length) {
    targetIndex = coerceToInteger(targetIndex);
    startIndex = coerceToInteger(startIndex);
    endIndex = coerceToInteger(endIndex);

    if (startIndex < 0) {
      startIndex = this.length + startIndex;
    }

    if (endIndex < 0) {
      endIndex = this.length + endIndex;
    }

    const copyValues = this.slice(startIndex, endIndex);

    let copyIndex = 0;

    return this.map((item, itemIndex) => {
      if (copyIndex === copyValues.length || itemIndex >= startIndex && itemIndex < endIndex) {
        return item;
      }

      copyIndex++;

      return copyValues[copyIndex - 1];
    });
  },

  fill(value, startIndex = 0, endIndex = this.length) {
    startIndex = coerceToInteger(startIndex);
    endIndex = coerceToInteger(endIndex);

    value = crio(value);

    if (startIndex < 0) {
      startIndex = this.length + startIndex;
    }

    if (endIndex < 0) {
      endIndex = this.length + endIndex;
    }

    let tempArray = [];

    this.forEach((item, itemIndex) => {
      if (itemIndex >= startIndex && itemIndex < endIndex) {
        tempArray[itemIndex] = value;
      } else {
        tempArray[itemIndex] = item;
      }
    });

    return returnFrozenWithMethods(tempArray, true);
  },

  forEach(forEachFunction) {
    for (let index = 0, length = this.length; index < length; index++) {
      const result = forEachFunction.call(this, this[index], index, this);

      if (result === false) {
        return this;
      }
    }
  },

  pop() {
    const tempArray = [
      ...this.slice(0, this.length - 1)
    ];

    return returnFrozenWithMethods(tempArray, true);
  },

  push(...args) {
    let tempArray = [...this],
        length = this.length;

    args.forEach((arg) => {
      setImmutable(tempArray, length, crio(arg));
      length++;
    });

    return returnFrozenWithMethods(tempArray, true);
  },

  reverse() {
    const tempArray = [...this].reverse();

    return returnFrozenWithMethods(tempArray, true);
  },

  shift() {
    const tempArray = [
      ...this.slice(1, this.length)
    ];

    return returnFrozenWithMethods(tempArray, true);
  },

  sort(sortFunction) {
    let tempArray = getMutableObject(this);

    tempArray.sort(sortFunction);

    return crioArray(tempArray);
  },

  splice(startIndex, deleteCount = 1, ...items) {
    startIndex = coerceToInteger(startIndex);
    deleteCount = coerceToInteger(deleteCount);

    items.forEach((item, itemIndex) => {
      items[itemIndex] = crio(item);
    });

    const tempArray = [
      ...this.slice(0, startIndex),
      ...items,
      ...this.slice(startIndex + deleteCount, this.length)
    ];

    return returnFrozenWithMethods(tempArray, true);
  },

  unshift(...args) {
    args.forEach((arg, argIndex) => {
      args[argIndex] = crio(arg);
    });

    const tempArray = [
      ...args,
      ...this
    ];

    return returnFrozenWithMethods(tempArray, true);
  }
};
const objectAdditionalMethods = {
  filter(filterFunction) {
    const thisProperties = GET_OWN_PROPERTY_NAMES(this);

    let newObject = addObjectPrototypeMethods({});

    for (let index = 0, length = thisProperties.length; index < length; index++) {
      const property = thisProperties[index];
      const descriptor = GET_OWN_PROPERTY_DESCRIPTOR(this, property);
      const result = filterFunction.call(this, this[property], property, this);

      if (result !== false && property !== CRIO_IDENTIFIER) {
        setImmutable(newObject, property, this[property], descriptor);
      }
    }

    return FREEZE(newObject);
  },

  forEach(forEachFunction) {
    const thisProperties = KEYS(this);

    for (let index = 0, length = thisProperties.length; index < length; index++) {
      const property = thisProperties[index];
      const result = forEachFunction.call(this, this[property], property, this);

      if (result === false) {
        break;
      }
    }

    return this;
  },

  map(mapFunction) {
    const thisProperties = GET_OWN_PROPERTY_NAMES(this);

    let newObject = addObjectPrototypeMethods({});

    for (let index = 0, length = thisProperties.length; index < length; index++) {
      const property = thisProperties[index];
      const descriptor = GET_OWN_PROPERTY_DESCRIPTOR(this, property);

      if (property !== CRIO_IDENTIFIER) {
        setImmutable(newObject, property, mapFunction.call(this, this[property], property, this), descriptor);
      }
    }

    return FREEZE(newObject);
  }
};

let arrayMethods = {
  ...allAdditionalMethods,
  ...arrayAdditionalMethods
};

immutableArrayMethods.onlyApplyMethods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    args.forEach((arg, argIndex) => {
      args[argIndex] = crio(arg);
    });

    return returnFrozenWithMethods(Array.prototype[method].apply(this, args), true);
  };
});

immutableArrayMethods.fullCrio.forEach((method) => {
  arrayMethods[method] = function (...args) {
    args.forEach((arg, argIndex) => {
      args[argIndex] = crio(arg);
    });

    return crio(Array.prototype[method].apply(this, args));
  };
});

const objectMethods = {
  ...Object.prototype,
  ...allAdditionalMethods,
  ...objectAdditionalMethods
};

const addArrayPrototypeMethods = (array) => {
  if (isCrio(array)) {
    return array;
  }

  let newArray = ASSIGN([], array, arrayMethods);

  setCrioIdentifier(newArray);

  return newArray;
};

const addObjectPrototypeMethods = (object) => {
  if (isCrio(object)) {
    return object;
  }

  let newObject = CREATE(objectMethods);

  setCrioIdentifier(newObject);

  GET_OWN_PROPERTY_NAMES(object).forEach((property) => {
    const descriptor = GET_OWN_PROPERTY_DESCRIPTOR(object, property);

    DEFINE_PROPERTY(newObject, property, descriptor);
  });

  return newObject;
};

const returnFrozenWithMethods = (object, isObjectArray) => {
  const addMethods = isObjectArray ? addArrayPrototypeMethods : addObjectPrototypeMethods;

  return FREEZE(addMethods(object));
};

const setCrioIdentifier = (object) => {
  DEFINE_PROPERTY(object, CRIO_IDENTIFIER, {
    configurable: false,
    enumerable: false,
    value: true,
    writable: true
  });
};

const crioArray = (array) => {
  let crioedArray = addArrayPrototypeMethods([]);

  array.forEach((item, itemIndex) => {
    let itemValue = item;

    if (!isCrio(item)) {
      itemValue = crio(item);
    }

    setImmutable(crioedArray, itemIndex, itemValue);
  });

  setCrioIdentifier(crioedArray);

  return FREEZE(crioedArray);
};

const crioObject = (object) => {
  let crioedObject = CREATE(objectMethods);

  GET_OWN_PROPERTY_NAMES(object).forEach((property) => {
    let itemValue = object[property];

    if (!isCrio(itemValue)) {
      itemValue = crio(itemValue);
    }

    setCrioIdentifier(crioedObject);
    setImmutable(crioedObject, property, itemValue, GET_OWN_PROPERTY_DESCRIPTOR(object, property));
  });

  return FREEZE(crioedObject);
};

const crio = (object = {}) => {
  if (isCrio(object)) {
    return object;
  }

  if (isArray(object)) {
    return crioArray(object);
  }

  if (isObject(object)) {
    return crioObject(object);
  }

  return object;
};

crio.array = (array = []) => {
  return crioArray(array);
};

crio.array.from = (...args) => {
  return crioArray(args);
};

crio.object = (object = {}) => {
  return crioObject(object);
};

export default crio;
