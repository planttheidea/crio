

// local imports
import setPrototypeOf from '../utils/setPrototypeOf';

// local partial imports
import {
    cloneObject,
    setDeepPrototype
} from '../utils/recursiveObjectModifications';

import {
    isArray,
    isFunction,
    isNumber,
    isObject,
    isString,
    isUndefined
} from '../utils/checkers';

import {
    forEach,
    forOwn,
    setDeeplyNested
} from '../utils/functions';

const OBJECT_CREATE = Object.create;

type ArrayOrObject = Array|Object;
type Keys = number|string|Array;

const compareNewToOriginal = (originalObj: ArrayOrObject, result: ArrayOrObject) : ArrayOrObject => {
    if (isFunction(originalObj.equals) && originalObj.equals(result)) {
        return originalObj;
    }
    
    return result;
};

const isSingleKey = (keys: Keys) => {
    return isNumber(keys) || isString(keys);
};

const filterArray = function(callback: Function, prototype: Object) : ArrayOrObject {
    const newArray: Array = [];

    forEach(this, (value, index) => {
        if (callback(value, index, this) !== false) {
            newArray[newArray.length] = value;
        }
    });

    setPrototypeOf(newArray, prototype);

    return compareNewToOriginal(this, newArray);
};

const filterObject = function(callback: Function, prototype: Object) : Object {
    const filteredIterable = filterGeneratorObject.call(this, callback);

    let filteredIterableObject: Object = OBJECT_CREATE(prototype);

    forEach([...filteredIterable], (filteredIterableArrayItem) => {
        const key = Object.keys(filteredIterableArrayItem)[0];

        filteredIterableObject[key] = filteredIterableArrayItem[key];
    });

    return compareNewToOriginal(this, filteredIterableObject);
};

const filterGeneratorObject = function * (callback: Function) : void {
    for (const {key, value} of this) {
        if (callback(value, key, this) !== false) {
            yield {[key]: value};
        }
    }
};

/**
 * Loops over the iterable, breaking when function returns false
 *
 * @param obj<Array|Object>
 * @param callback<Function>
 */
const forEachArray = function(callback: Function) : void {
    for (let index: number = 0, length: number = this.length; index < length; index++) {
        if (callback(this[index], index, this) === false) {
            break;
        }
    }
};

/**
 * Loops over the iterable, breaking when function returns false
 *
 * @param obj<Array|Object>
 * @param callback<Function>
 */
const forEachObject = function(callback: Function) : void {
    for (let {key, value} of this) {
        if (callback(value, key, this) === false) {
            break;
        }
    }
};

const get = function(keys: Keys) : any {
    if (isUndefined(keys)) {
        return this;
    }

    if (isSingleKey(keys)) {
        return this[keys];
    }

    if (isArray(keys)) {
        let retrievalObj: any = this,
            returnValue: any;

        forEach(keys, (key, index) => {
            if (isUndefined(retrievalObj[key])) {
                return false;
            }

            if (index === keys.length - 1) {
                returnValue = retrievalObj[key];
            } else {
                retrievalObj = retrievalObj[key];
            }
        });

        return returnValue;
    }

    return this;
};

const getThawedObject = (obj: any) => {
    if (obj.thaw) {
        return obj.thaw();
    }

    return obj;
};

const mapArray = function (callback: Function, prototype: Object) : ArrayOrObject {
    let mappedArray: Array = [];

    forEach(this, (value, index) => {
        mappedArray[index] = callback(value, index, this);
    });

    setPrototypeOf(mappedArray, prototype);

    return compareNewToOriginal(this, mappedArray);
};

const mapObject = function (callback: Function, prototype: Object) : Object {
    const mappedIterable = mapGeneratorObject.call(this, callback);

    let mappedIterableObject: Object = OBJECT_CREATE(prototype);

    forEach([...mappedIterable], (mappedIterableArrayItem) => {
        const key = Object.keys(mappedIterableArrayItem)[0];

        mappedIterableObject[key] = mappedIterableArrayItem[key];
    });

    return compareNewToOriginal(this, mappedIterableObject);
};

const mapGeneratorObject = function * (callback: Function) : ArrayOrObject {
    for (const {key, value} of this) {
        yield {[key]: callback(value, key, this)};
    }
};

/**
 * Deeply merge objects or arrays
 *
 * @param target<any>
 * @param sources<Array>
 * @returns {*}
 */
const merge = function(...sources): ArrayOrObject {
    if (sources.length === 0) {
        return this;
    }

    const target = getThawedObject(this);
    const isTargetArr = isArray(target);
    const isTargetObj = isObject(target);

    if (!isTargetArr && !isTargetObj) {
        return sources[sources.length - 1];
    }

    let dest: ArrayOrObject = isTargetArr ? [] : {};

    forEach(sources, (source) => {
        const realSource = getThawedObject(source);

        if (isArray(realSource)) {
            dest = dest.concat(target || []);

            forEach(realSource, (value, i) => {
                const realValue = getThawedObject(value);

                dest[i] = isObject(realValue) || isArray(realValue) ? merge(target[i], realValue) : realValue;
            });
        } else {
            dest = {...(target || {})};

            forOwn(realSource, (value, key) => {
                const realValue = getThawedObject(value);

                dest[key] = isObject(realValue) || isArray(realValue) ? merge(target[key], realValue) : realValue;
            });
        }
    });

    return compareNewToOriginal(this, setDeepPrototype(dest));
};

const mutate = function(callback: Function) : any {
    let result = callback.call(this, cloneObject(this, false), this);

    return compareNewToOriginal(this, setDeepPrototype(result));
};

const set = function(keys: Keys, value: any, prototype: Object) {
    if (isUndefined(keys)) {
        return this;
    }

    const isThisFrozen: boolean = this.isFrozen();

    let mutatedThis = isThisFrozen ? this.thaw() : this;

    if (isSingleKey(keys) || isObject(keys) || isArray(keys)) {
        let updatedObject: ?ArrayOrObject;

        if (isSingleKey(keys)) {
            mutatedThis[keys] = value;

            updatedObject = mutatedThis;
        }

        if (isObject(keys) || isArray(keys)) {
            updatedObject = setDeeplyNested(mutatedThis, keys, value, prototype);
        }

        return compareNewToOriginal(this, isThisFrozen ? updatedObject.freeze() : updatedObject);
    }
};

const toArray = function() : ArrayOrObject {
    if (isArray(this)) {
        return this;
    }

    return setDeepPrototype([...this.values()]);
};

const toObject = function() : ArrayOrObject {
    if (isObject(this)) {
        return this;
    }
    
    return setDeepPrototype({...this});
};

export {filterArray as filterArray};
export {filterObject as filterObject};
export {forEachArray as forEachArray};
export {forEachObject as forEachObject};
export {get as get};
export {mapArray as mapArray};
export {mapObject as mapObject};
export {merge as merge};
export {mutate as mutate};
export {set as set};
export {toArray as toArray};
export {toObject as toObject};

export default {
    filterArray,
    filterObject,
    forEachArray,
    forEachObject,
    get,
    mapArray,
    mapObject,
    merge,
    mutate,
    set,
    toArray,
    toObject
};