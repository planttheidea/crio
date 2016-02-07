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
    'concat',
    'join',
    'map',
    'reduce'
  ]
};

const CREATE = Object.create;
const GET_OWN_PROPERTY_DESCRIPTOR = Object.getOwnPropertyDescriptor;
const GET_OWN_PROPERTY_NAMES = Object.getOwnPropertyNames;

const allAdditionalMethods = {
  delete(key) {
    if (isArray(this)) {
      return getRestOfObject(this, key);
    }

    return addObjectPrototypeMethods({
      ...getRestOfObject(this, key)
    });
  },

  deleteIn(keys) {
    if (!isArray(keys)) {
      return this;
    }

    return this;
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

    if (isThisArray) {
      return addArrayPrototypeMethods(shallowClone);
    }

    return addObjectPrototypeMethods(shallowClone);
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

    return crio(referenceToCurrentObject);
  },

  mutate(mutateMapFunction) {
    return crio(this.map.call(this.thaw(), mutateMapFunction));
  },

  set(key, value) {
    if (!key) {
      return this;
    }

    if (isArray(this)) {
      return this.map((item, itemIndex) => {
        if (itemIndex === key) {
          return crio(value);
        }

        return item;
      });
    }

    return addObjectPrototypeMethods({
      ...getRestOfObject(this, key),
      [key]: crio(value)
    });
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

    let tempArray = addArrayPrototypeMethods([]);

    this.forEach((item, itemIndex) => {
      if (itemIndex >= startIndex && itemIndex < endIndex) {
        tempArray[itemIndex] = value;
      } else {
        tempArray[itemIndex] = item;
      }
    });

    return tempArray;
  },

  forEach(forEachFunction) {
    for (let index = 0, length = this.length; index < length; index++) {
      const result = forEachFunction.call(this, this[index], index, this);

      if (result === false) {
        break;
      }
    }

    return this;
  },

  pop() {
    const tempArray = [
      ...this.slice(0, this.length - 1)
    ];

    return addArrayPrototypeMethods(tempArray);
  },

  push(...args) {
    let tempArray = addArrayPrototypeMethods([...this]),
        length = this.length;

    args.forEach((arg) => {
      setImmutable(tempArray, length, crio(arg));
      length++;
    });

    return tempArray;
  },

  reverse() {
    const tempArray = [...this].reverse();

    return addArrayPrototypeMethods(tempArray);
  },

  shift() {
    const tempArray = [
      ...this.slice(1, this.length)
    ];

    return addArrayPrototypeMethods(tempArray);
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

    return addArrayPrototypeMethods(tempArray);
  },

  unshift(...args) {
    args.forEach((arg, argIndex) => {
      args[argIndex] = crio(arg);
    });

    const tempArray = [
      ...args,
      ...this
    ];

    return addArrayPrototypeMethods(tempArray);
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

      if (result !== false) {
        setImmutable(newObject, property, result, descriptor);
      }
    }

    return newObject;
  },

  forEach(forEachFunction) {
    const thisProperties = GET_OWN_PROPERTY_NAMES(this);

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

      setImmutable(newObject, property, mapFunction.call(this, this[property], property, this), descriptor);
    }

    return newObject;
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

    return addArrayPrototypeMethods(Array.prototype[method].apply(this, args));
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
  return Object.assign([], array, arrayMethods);
};

const addObjectPrototypeMethods = (object) => {
  let newObject = CREATE(objectMethods);

  GET_OWN_PROPERTY_NAMES(object).forEach((property) => {
    const descriptor = GET_OWN_PROPERTY_DESCRIPTOR(object, property);

    Object.defineProperty(newObject, property, descriptor);
  });

  return newObject;
};

const crioArray = (array) => {
  let crioedArray = addArrayPrototypeMethods([]);

  array.forEach((item, itemIndex) => {
    let itemValue = item;

    if (isArray(item)) {
      itemValue = crioArray(item);
    } else if (isObject(item)) {
      itemValue = crioObject(item);
    }

    setImmutable(crioedArray, itemIndex, itemValue);
  });

  return crioedArray;
};

const crioObject = (object) => {
  let crioedObject = CREATE(objectMethods);

  GET_OWN_PROPERTY_NAMES(object).forEach((property) => {
    let itemValue = object[property];

    if (isArray(itemValue)) {
      itemValue = crioArray(itemValue);
    } else if (isObject(itemValue)) {
      itemValue = crioObject(itemValue);
    }

    setImmutable(crioedObject, property, itemValue, GET_OWN_PROPERTY_DESCRIPTOR(object, property));
  });

  return crioedObject;
};

const crio = (object = {}) => {
  if (isArray(object)) {
    return crioArray(object);
  }

  if (isObject(object)) {
    return crioObject(object);
  }

  return object;
};

export default crio;
