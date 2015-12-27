

// local imports
import {
    createNewCrio
} from './utils/createNewCrio';

// local partial imports
import {
    isArray,
    isObject,
    isUndefined,
    isValueless
} from './utils/checkers';

import {
    isConvertibleToCrio,
    isCrio,
    isSameCrio
} from './utils/crioCheckers';

import {
    coalesceCrioValue,
    convertToString,
    getCrioInstance,
    merge,
    thaw
} from './utils/crioFunctions';

import {
    readonlyProperty,
    staticProperty
} from './utils/decorators';

import {
    entries,
    forEach,
    forIn,
    setDeeplyNested
} from './utils/functions';

import {
    hashObject
} from './utils/hash';

const isInvalidKey = (obj: any, index: number, length: number) : boolean => {
    return index !== length - 1 && isUndefined(obj);
};

type ArrayOrObject = Array|Object;

class CrioCollection {
    constructor(obj: ArrayOrObject) {
        staticProperty(this, 'hashCode', hashObject(obj));
        readonlyProperty(this, 'object', obj);
        readonlyProperty(this, 'size', isArray(obj) ? obj.length : Object.getOwnPropertyNames(obj).length);
    }

    /**
     * Creates empty CrioMap
     *
     * @returns {CrioMap}
     */
    clear() : CrioCollection {
        const newObject: ArrayOrObject = isArray(this.object) ? [] : {};

        return getCrioInstance(this, createNewCrio(newObject));
    }

    /**
     * Alias for Array.prototype.entries
     *
     * @returns {Iterator}
     */
    entries() {
        return entries(this.object);
    }

    /**
     * Tests if object passed is equal to the current Crio object
     *
     * @param crio2<Crio>
     * @returns {boolean}
     */
    equals(crio2: Object) : boolean {
        if (isValueless(crio2)) {
            return false;
        }

        return isSameCrio(this, crio2);
    }

    /**
     * Executes forEach over values stored in this.object
     *
     * @param fn<Function>
     * @param thisArg<Object[optional]>
     * @returns {CrioList}
     */
    forEach(fn: Function, thisArg: ?Object) {
        const loopFunction: Function = isArray(this.object) ? forEach : forIn;

        loopFunction(this.object, fn, thisArg);

        return this;
    }

    /**
     * Based on key(s) passed, retrieves value(s) associated. If multiple keys are passed,
     * a CrioMap of key:value pairs are returned, otherwise the value itself is returned. If the value
     * is an array or object, then it is returned as a CrioList or CrioMap to allow for chaining.
     *
     * @param keys<Array>
     * @returns {*}
     */
    get(...keys: Array) : any {
        if (keys.length === 0) {
            return this;
        }

        if (keys.length === 1) {
            const value: any = this.object[keys[0]];

            if (isConvertibleToCrio(value)) {
                return coalesceCrioValue(this, createNewCrio(this.object[keys[0]]));
            }

            return value;
        }

        let keyMap: CrioCollection = createNewCrio({});

        forEach(keys, (key) => {
            keyMap = keyMap.set(key, this.object[key]);
        });

        return coalesceCrioValue(this, keyMap);
    }

    /**
     * Returns value of deeply nested item in this.object based on keys array. if value is an
     * array or object, then a CrioList or CrioMap is returned to allow for chaining.
     *
     * @param keys
     * @returns {Array|Object}
     */
    getIn(keys = []) {
        let retValue: any = this.object,
            foundKeyMatch: boolean = true;

        forEach(keys, (key, index) => {
            const value = retValue[key];

            if (isInvalidKey(value, index, keys.length)) {
                foundKeyMatch = false;
                return false;
            }

            retValue = isCrio(value) ? value.object : value;
        });

        if (foundKeyMatch) {
            if (isConvertibleToCrio(retValue)) {
                return coalesceCrioValue(this, createNewCrio(retValue));
            }

            return retValue;
        }

        return undefined;
    }

    /**
     * Returns true if size is 0
     *
     * @returns {boolean}
     */
    isEmpty() : boolean {
        return this.size === 0;
    }

    /**
     * Retrieves an array of the keys for this.object
     *
     * @returns {Array}
     */
    keys() {
        return Object.keys(this.object);
    }

    /**
     * Accepts any number of parameters and merges them into a new object / array
     *
     * @param sources<Array>
     * @returns {CrioCollection}
     */
    merge(...sources: Array) : CrioCollection {
        const mergedObject: ArrayOrObject = merge(this.object, ...sources);

        return getCrioInstance(this, createNewCrio(mergedObject));
    }

    /**
     * Accepts any number of parameters and merges them into a new object / array retrieved
     * based on the keys passed
     *
     * @param keys<Array>
     * @param sources<Array>
     * @returns {CrioCollection}
     */
    mergeIn(keys: Array, ...sources: Array) : CrioCollection {
        if (keys.length === 0) {
            return this.merge(...sources);
        }

        const objectToMerge: ArrayOrObject = this.getIn(keys).object;

        let objectToSet: ArrayOrObject = merge(...sources);

        if (isConvertibleToCrio(objectToMerge)) {
            objectToSet = merge(objectToMerge, objectToSet);
        }

        return getCrioInstance(this, this.setIn(keys, merge(objectToMerge, objectToSet)));
    }

    /**
     * Accepts a function which will receive single parameter of a thawed Crio object. This allows
     * working with the object in a standard mutable way, and whatever you return in the function will
     * be either be converted back to a CrioCollection (if array or object) or simply returned.
     *
     * @param callback<Function>
     * @returns {any}
     */
    mutate(callback: Function) : any {
        const thawedObject: ArrayOrObject = this.thaw();
        const mutatedThis: any = callback(thawedObject) || thawedObject;

        if (isConvertibleToCrio(mutatedThis)) {
            return getCrioInstance(this, createNewCrio(mutatedThis));
        }

        return mutatedThis;
    }

    /**
     * Based on values in this.object, sets the values called out by key and returns a new CrioList.
     * If key is a string or number, then the value where the property / index is equal to key is updated
     * to value. If key is an object, then each property in the object will set the equivalent property
     * in this.object to the value in the key object.
     *
     * @param key<Array|String>
     * @param value<Any[optional]>
     * @returns {Object}
     */
    set(key: Object|string|number, value: ?any) {
        if (isUndefined(key)) {
            throw new TypeError('The set method requires a key.');
        }

        let newValue: ArrayOrObject = this.thaw();

        if (isObject(key)) {
            forIn(key, (value, index) => {
                newValue[index] = value;
            });
        } else {
            newValue[key] = value;
        }

        return getCrioInstance(this, createNewCrio(newValue));
    }

    /**
     * Based on array of keys, sets deeply-nested value in object
     *
     * @param keys<Array>
     * @param value<any>
     * @returns {Object}
     */
    setIn(keys: Array = [], value: any) : ?CrioCollection {
        if (isUndefined(value)) {
            throw new TypeError('You need to pass in a value to apply for the key.');
        }

        const updatedObject = setDeeplyNested(this.thaw(), keys, value);

        return getCrioInstance(this, createNewCrio(updatedObject));
    }

    /**
     * Returns a new vanillaJS object of the Crio's object that has been unfrzon
     *
     * @returns thawedCrio<Array|Object>
     */
    thaw() : Array|Object {
        return thaw(this);
    }

    /**
     * Converts CrioCollection to a CrioList, where each item is a key:value object from the original map
     *
     * @returns {CrioCollection}
     */
    toCollection() : CrioCollection {
        return this.mutate((mutableObject) => {
            let collection: Array = [];

            forIn(mutableObject, (value, key) => {
                collection.push({
                    [key]:value
                });
            });

            return collection;
        });
    }

    /**
     * Alias of Array.prototype.toLocaleString
     *
     * @returns {string}
     */
    toLocaleString() : string {
        return convertToString(this, true);
    }

    /**
     * Alias of Array.prototype.toString
     *
     * @returns {string}
     */
    toString() : string {
        return convertToString(this, false);
    }

    /**
     * Similar to .keys(), this will instead return an array of values. In the case of objects, the values
     * are plucked from the top-level mapping and returned as an array. In all other cases, this.object itself
     * is returned. In all scenarios, mutable is returned to the object.
     *
     * @returns {Array}
     */
    values() : Array {
        let valueArray: Array = [];

        forIn(this.object, (value) => {
            valueArray.push(value);
        });

        return valueArray;
    }
}

export default CrioCollection;