

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
    isSameCrio
} from './utils/crioCheckers';

import {
    coalesceCrioValue,
    getCrioInstance,
    merge,
    thaw
} from './utils/crioFunctions';

import {
    readonlyProperty,
    staticProperty
} from './utils/decorators';

import {
    forEach,
    forIn
} from './utils/functions';

import {
    hashObject
} from './utils/hash';

const isValidKey = (obj: any, index: number, length: number) : boolean => {
    return !isUndefined(obj) && index < length - 1;
};

class CrioCollection {
    constructor(obj) {
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
        return getCrioInstance(this, createNewCrio(isArray(this.object) ? [] : {}));
    }

    /**
     * Alias for Array.prototype.entries
     *
     * @returns {Iterator}
     */
    entries() {
        return this.thaw().entries();
    }

    /**
     * Tests if object passed is equal to the current Crio object
     *
     * @param crio2<Crio>
     * @returns {boolean}
     */
    equals(crio2: Object) {
        if (isValueless(crio2)) {
            return false;
        }

        return isSameCrio(this, crio2);
    }

    /**
     * Based on key(s) passed, retrieves value(s) associated. If multiple keys are passed,
     * a map of key:value pairs are returned, otherwise only the value is returned.
     *
     * @param keys<Array>
     * @returns {*}
     */
    get(...keys: Array) : any {
        if (keys.length === 0) {
            return this.object;
        }

        if (keys.length === 1) {
            return coalesceCrioValue(this, this.object[keys[0]]);
        }

        let keyMap = {};

        forEach(keys, (key) => {
            keyMap[key] = coalesceCrioValue(this, this.object[key]);
        });

        return keyMap;
    }

    /**
     * Returns value of deeply nested item in this.object based on keys array
     *
     * @param keys
     * @returns {Array|Object}
     */
    getIn(keys = []) {
        let retValue = this.thaw(),
            foundKeyMatch = true;

        forEach(keys, (key, index) => {
            if (!isValidKey(retValue[key], index, keys.length)) {
                foundKeyMatch = false;
                return false;
            }

            retValue = retValue[key];
        });

        if (foundKeyMatch) {
            return coalesceCrioValue(this, retValue);
        }

        return undefined;
    }

    /**
     * Returns true if size is 0
     *
     * @returns {boolean}
     */
    isEmpty() : boolean {
        return this.size === 0
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
        const mergedObject = merge(this.thaw(), ...sources);

        return getCrioInstance(this, createNewCrio(mergedObject));
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

        if (!isObject(key) && isUndefined(value)) {
            throw new TypeError('If you are going to use the single-key implementation of this method, ' +
                'you need to pass in a value to assign.');
        }

        let newValue: Array = this.thaw();

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

        let foundKeyMatch = true,
            checkObj = this.thaw();

        forEach(keys, (key, index) => {
            if (!isValidKey(checkObj[key], index, keys.length)) {
                foundKeyMatch = false;
                return false;
            }

            if (index === keys.length - 1) {
                checkObj[key] = value;
            } else {
                checkObj = checkObj[key];
            }
        });

        if (foundKeyMatch) {
            return getCrioInstance(this, createNewCrio(checkObj));
        }

        return undefined;
    }

    /**
     * Returns a new vanillaJS object of the Crio's object that has been unfrzon
     *
     * @returns thawedCrio<Array|Object>
     */
    thaw() : Array|Object {
        return thaw(this.object);
    }

    /**
     * Alias of Array.prototype.toLocaleString
     *
     * @returns {string}
     */
    toLocaleString() : string {
        return this.object.toLocaleString();
    }

    /**
     * Alias of Array.prototype.toString
     *
     * @returns {string}
     */
    toString() : string {
        return this.object.toString();
    }

    /**
     * Similar to .keys(), this will instead return an array of values. In the case of objects, the values
     * are plucked from the top-level mapping and returned as an array. In all other cases, this.object itself
     * is returned. In all scenarios, mutable is returned to the object.
     *
     * @returns {Array}
     */
    values() : Array {
        const thawedObject = this.thaw();

        let valueArray: Array = [];

        forIn(thawedObject, (value) => {
            valueArray.push(value);
        });

        return valueArray;
    }
}

export default CrioCollection;