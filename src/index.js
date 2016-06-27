import 'core-js/fn/symbol';

import 'core-js/fn/object/entries';
import 'core-js/fn/object/keys';
import 'core-js/fn/object/values';

import {
    hash,
    isArray,
    isObject,
    isUndefined,
    returnObjectOnlyIfNew,
    setNonEnumerable,
    setReadOnly,
    setStandard
} from './utils';

const ARRAY_PROTOTYPE = Array.prototype;

const OBJECT_ENTRIES = Object.entries;
const OBJECT_FREEZE = Object.freeze;
const OBJECT_KEYS = Object.keys;
const OBJECT_OWN_PROPERTY_NAMES = Object.getOwnPropertyNames;
const OBJECT_PROTOTYPE = Object.prototype;
const OBJECT_VALUES = Object.values;

const NATIVE_KEYS = [
    '$$hashCode',
    '$$type',
    'length'
];

/**
 * is object a CrioArray or CrioObject
 *
 * @param {any} object
 * @returns {boolean}
 */
const isCrio = (object) => {
    return object instanceof CrioArray || object instanceof CrioObject;
};

/**
 * if the value is not a crio and is an array or object, convert
 * it to crio and return it, else just return it
 *
 * @param {any} value
 * @returns {any}
 */
const getRealValue = (value) => {
    if (!isCrio(value)) {
        if (isArray(value)) {
            return new CrioArray(value);
        }

        if (isObject(value)) {
            return new CrioObject(value);
        }
    }

    return value;
};

/**
 * on deep match via setIn or mergeIn, perform assignment
 *
 * @param {object} object
 * @param {array<string>} keys
 * @param {any} value
 * @param {boolean} isMerge=false
 * @returns {CrioArray|CrioObject}
 */
const assignOnDeepMatch = (object, keys, value, isMerge = false) => {
    const length = keys.length;
    const lastIndex = length - 1;
    const FinalCrio = isArray(object) ? CrioArray : CrioObject;

    let currentObject = object.thaw(),
        referenceToCurrentObject = currentObject,
        Crio;

    for (let index = 0; index < length; index++) {
        const key = keys[index] + '';
        const currentValue = currentObject[key];

        if (!isArray(currentValue) && !isObject(currentValue)) {
            currentObject[key] = {};
        }

        if (index === lastIndex) {
            Crio = isArray(currentObject) ? CrioArray : CrioObject;

            currentObject[key] = isMerge ? Crio.prototype.merge.apply(currentObject[key], value) : value;
        } else {
            currentObject = currentObject[key];
        }
    }

    const crioedObject = new FinalCrio(referenceToCurrentObject);

    return returnObjectOnlyIfNew(this, crioedObject);
};

class CrioArray {
    constructor(array) {
        if (isCrio(array)) {
            return array;
        }

        const length = array.length;

        for (let index = 0; index < length; index++) {
            const value = getRealValue(array[index]);

            setReadOnly(this, index, value, array.propertyIsEnumerable(index));
        }

        setNonEnumerable(this, 'length', length);

        return OBJECT_FREEZE(this);
    }

    /**
     * return unique hash of this values
     *
     * @return {number}
     */
    get $$hashCode() {
        return hash(this.toString());
    }

    /**
     * return type of CrioArray
     *
     * @return {string}
     */
    get $$type() {
        return 'CrioArray';
    }

    /**
     * based on items passed, combine with this to create new CrioArray
     *
     * @param {array<array>} arrays
     * @returns {CrioArray}
     */
    concat(...arrays) {
        if (!arrays.length) {
            return this;
        }

        let clone = [
            ...this
        ];

        arrays.forEach((array) => {
            if (isArray(array)) {
                clone = [
                    ...clone,
                    ...array
                ];
            }
        });

        return new CrioArray(clone);
    }

    /**
     * based on arguments passed, return new CrioArray with copyWithin applied
     *
     * @param {array<any>} args
     * @returns {CrioArray}
     */
    copyWithin(...args) {
        const copiedClone = this.thaw().copyWithin(...args);
        const crioedClone = new CrioArray(copiedClone);

        return returnObjectOnlyIfNew(this, crioedClone);
    }

    /**
     * returns an oterable array of [index, value] pairs
     *
     * @returns {array<array>}
     */
    entries() {
        return OBJECT_ENTRIES(this.thaw());
    }

    /**
     * is the object passed equal in value to this
     *
     * @param {any} object
     * @returns {boolean}
     */
    equals(object) {
        if (!isCrio(object)) {
            return false;
        }

        return this.$$hashCode === object.$$hashCode;
    }

    /**
     * does the function applied to every value in this return truthy
     *
     * @param {function} fn
     * @param {any} thisArg
     * @returns {boolean}
     */
    every(fn, thisArg = this) {
        for (let index = 0, length = this.length; index < length; index++) {
            if (!fn.call(thisArg, this[index], index, this)) {
                return false;
            }
        }

        return true;
    }

    /**
     * fill this based on arguments and return new CrioArray
     *
     * @param {array<any>} args
     * @returns {CrioArray}
     */
    fill(...args) {
        const clone = this.thaw();

        clone.fill(...args);

        return new CrioArray(clone);
    }

    /**
     * based on return values of fn being truthy, return a new reduced CrioArray
     * from this
     *
     * @param {function} fn
     * @param {any} thisArg
     * @returns {CrioArray}
     */
    filter(fn, thisArg = this) {
        const filteredArray = OBJECT_KEYS(this).reduce((array, key) => {
            const result = fn.call(thisArg, this[key], +key, this);

            if (result) {
                return array.concat(this[key]);
            }

            return array;
        }, []);
        const crioedArray = new CrioArray(filteredArray);

        return returnObjectOnlyIfNew(this, crioedArray);
    }

    /**
     * find a specific value in the CrioArray and return it, else return undefined
     *
     * @param {function} fn
     * @param {any} thisArg
     * @returns {any}
     */
    find(fn, thisArg = this) {
        for (let index = 0; index < this.length; index++) {
            const value = this[index];

            if (fn.call(thisArg, value, index, this)) {
                return value;
            }
        }

        return undefined;
    }

    /**
     * find a specific value in the CrioArray and return its index, else return -1
     *
     * @param {function} fn
     * @param {any} thisArg
     * @returns {number}
     */
    findIndex(fn, thisArg = this) {
        for (let index = 0; index < this.length; index++) {
            if (fn.call(thisArg, this[index], index, this)) {
                return index;
            }
        }

        return -1;
    }

    /**
     * iterate over this and execute fn for each value
     *
     * @param {function} fn
     * @param {any} thisArg
     */
    forEach(fn, thisArg = this) {
        this.keys().forEach((key) => {
            fn.call(thisArg, this[key], +key, this);
        });
    }

    /**
     * retrieve the value at index from this
     *
     * @param {number} index
     * @returns {any}
     */
    get(index) {
        return this[index];
    }

    /**
     * return value at nested point based on keys in this
     *
     * @param {array<string|number>} keys
     * @return {any}
     */
    getIn(keys) {
        if (!isArray(keys)) {
            throw new Error ('Must provide keys as an array, such as ["foo", "bar"].');
        }

        const length = keys.length;
        const lastIndex = length - 1;

        let currentObject = this;

        for (let index = 0; index < length; index++) {
            const key = keys[index];

            if (isUndefined(currentObject[key]) || index === lastIndex) {
                return currentObject[key];
            }

            currentObject = currentObject[key];
        }
    };

    /**
     * does this have a value of item contained in it
     *
     * @param {any} item
     * @returns {boolean}
     */
    includes(item) {
        return !!~this.indexOf(item);
    }

    /**
     * what is the index of item in this (if not found, defaults to -1)
     *
     * @param {any} item
     * @returns {number}
     */
    indexOf(item) {
        return ARRAY_PROTOTYPE.indexOf.call(this, item);
    }

    /**
     * joins this into string based on separator delimiting between values
     *
     * @param {string} separator
     * @returns {string}
     */
    join(separator = ',') {
        let string = '';

        this.keys().forEach((key, keyIndex) => {
            if (keyIndex !== 0) {
                string += separator;
            }

            string += this[key].toString();
        });

        return string;
    }

    /**
     * returns keys of array (list of indices)
     *
     * @returns {array<string>}
     */
    keys() {
        return OBJECT_KEYS(this);
    }

    /**
     * last index of item in this
     *
     * @param {any} item
     * @returns {number}
     */
    lastIndexOf(item) {
        return ARRAY_PROTOTYPE.lastIndexOf.call(this, item);
    }

    /**
     * iterate over this and assign values returned from calling
     * fn to a new CrioArray
     *
     * @param {function} fn
     * @param {any} thisArg
     * @returns {CrioArray}
     */
    map(fn, thisArg = this) {
        const mappedArray = this.keys().map((key) => {
            return fn.call(thisArg, this[key], +key, this);
        });
        const crioedArray = new CrioArray(mappedArray);

        return returnObjectOnlyIfNew(this, crioedArray);
    }

    /**
     * shallowly merge each object into this
     *
     * @param {array<any>} objects
     * @returns {CrioArray}
     */
    merge(...objects) {
        let clone = isCrio(this) ? this.thaw() : this;

        objects.forEach((object) => {
            clone = clone.map((key, index) => {
                return object[index] || clone[index];
            });
        });

        const crioedArray = new CrioArray(clone);

        return returnObjectOnlyIfNew(this, crioedArray);
    }

    /**
     * deeply merge all objects into location specified by keys
     *
     * @param {array<string|number>} keys
     * @param {array<any>} objects
     * @returns {CrioArray}
     */
    mergeIn(keys, ...objects) {
        if (!isArray(keys)) {
            throw new Error ('Must provide keys as an array, such as ["foo", "bar"].');
        }

        if (!objects.length) {
            return this;
        }

        return assignOnDeepMatch(this, keys, objects, true);
    }

    /**
     * convenience function to work with mutable version of this,
     * in case many modifications need to be made and performance
     * is paramount
     *
     * @param {function} fn
     * @param {any} thisArg
     * @returns {any}
     */
    mutate(fn, thisArg = this) {
        const result = fn.call(thisArg, this.thaw(), this);
        const crioedValue = getRealValue(result);

        return returnObjectOnlyIfNew(this, crioedValue);
    }

    /**
     * return array with last item removed
     *
     * @returns {CrioArray}
     */
    pop() {
        return this.slice(0, this.length -1);
    }

    /**
     * return new CrioArray with items pushed to it
     *
     * @param {array<any>} items
     * @returns {CrioArray}
     */
    push(...items) {
        return this.concat(items);
    }

    /**
     * based on fn, reduce the CrioArray and return either the crio of the reduced object
     * or the object itself
     *
     * @param {function} fn
     * @param {any} object
     * @param {any} thisArg
     * @returns {any}
     */
    reduce(fn, object, thisArg = this) {
        const reduction = ARRAY_PROTOTYPE.reduce.call(this, fn, object, thisArg);
        const crioedReduction = getRealValue(reduction);

        return !crioedReduction || !crioedReduction.$$hashCode
            ? crioedReduction : returnObjectOnlyIfNew(this, crioedReduction);
    }

    /**
     * based on fn, reduceRight the CrioArray and return either the crio of the reduced object
     * or the object itself
     *
     * @param {function} fn
     * @param {any} object
     * @param {any} thisArg
     * @returns {any}
     */
    reduceRight(fn, object, thisArg = this) {
        const reduction = ARRAY_PROTOTYPE.reduceRight.call(this, fn, object, thisArg);
        const crioedReduction = getRealValue(reduction);

        return !crioedReduction || !crioedReduction.$$hashCode
            ? crioedReduction : returnObjectOnlyIfNew(this, crioedReduction);
    }

    /**
     * set key to value in this and return new CrioArray
     *
     * @param {number} key
     * @param {any} value
     *
     * @returns {CrioArray}
     */
    set(key, value) {
        const index = +key;

        if (index > this.length) {
            throw new Error('Cannot set a key for sparsed array on crio objects.');
        }

        const clone = this.thaw();

        clone[index] = value;

        const crioedArray = new CrioArray(clone);

        return returnObjectOnlyIfNew(this, crioedArray);
    }

    /**
     * deeply assign value to key in this and return new CrioArray
     *
     * @param {array<string|number>} keys
     * @param {any} value
     * @returns {CrioArray}
     */
    setIn(keys, value) {
        if (!isArray(keys)) {
            throw new Error ('Must provide keys as an array, such as ["foo", "bar"].');
        }

        return assignOnDeepMatch(this, keys, value);
    }

    /**
     * return this with first item removed as new CrioArray
     *
     * @returns {CrioArray}
     */
    shift() {
        return this.slice(1, this.length);
    }

    /**
     * return a section of this as a new CrioArray
     *
     * @param {array<number>} args
     * @returns {CrioArray}
     */
    slice(...args) {
        if (!args.length) {
            return this;
        }

        return new CrioArray(ARRAY_PROTOTYPE.slice.call(this, ...args));
    };

    /**
     * does some of the returns from fn return truthy
     *
     * @param {function} fn
     * @param {any} thisArg
     * @returns {boolean}
     */
    some(fn, thisArg = this) {
        for (let index = 0, length = this.length; index < length; index++) {
            if (fn.call(thisArg, this[index], index, this)) {
                return true;
            }
        }

        return false;
    }

    /**
     * sort this and return it as a new CrioArray
     *
     * @param {function} fn
     * @returns {CrioArray}
     */
    sort(fn) {
        const sortedArray = this.thaw().sort(fn);
        const crioedArray = new CrioArray(sortedArray);

        return returnObjectOnlyIfNew(this, crioedArray);
    }

    /**
     * based on args passed, splice this and return it as a new CrioArray
     *
     * @param {any} args
     * @returns {CrioArray}
     */
    splice(...args) {
        const clone = this.thaw();

        clone.splice(...args);

        const crioedArray = new CrioArray(clone);

        return returnObjectOnlyIfNew(this, crioedArray);
    }

    /**
     * convert this back to a vanilla array
     *
     * @returns {array<any>}
     */
    thaw() {
        return ARRAY_PROTOTYPE.map.call(this, (item) => {
            return isCrio(item) ? item.thaw() : item;
        });
    }

    /**
     * convert this to a locale-specific string
     *
     * @returns {string}
     */
    toLocaleString() {
        return this.toString();
    }

    /**
     * convert this to a string showing key: value pair combos
     *
     * @returns {string}
     */
    toString() {
        let string = 'CrioArray {';

        this.keys().forEach((key, keyIndex) => {
            if (keyIndex !== 0) {
                string += ', ';
            }

            const value = this[key];
            const cleanValue = isCrio(value) ? value.toString() : `"${value}"`;

            string += `${key}: ${cleanValue}`;
        });

        string += '}';

        return string;
    }

    /**
     * add items to the beginning of this and return it as a new CrioArray
     *
     * @param {array<any>} items
     * @returns {CrioArray}
     */
    unshift(...items) {
        if (!items.length) {
            return this;
        }

        return new CrioArray([
            ...items,
            ...this
        ]);
    }

    /**
     * get the iterable array of values for this
     *
     * @returns {array<any>}
     */
    values() {
        return OBJECT_VALUES(this);
    }

    /**
     * make CrioArray into an iterable
     *
     * @returns {{next: (function(): {value: any, done: boolean})}}
     */
    [Symbol.iterator]() {
        let index = 0;

        return {
            next: () => {
                const value = this[index];
                const done = index >= this.length;

                index++;

                return {
                    value,
                    done
                };
            }
        };
    }
}

class CrioObject {
    constructor(object) {
        if (isCrio(object)) {
            return object;
        }

        const keys = OBJECT_OWN_PROPERTY_NAMES(object).filter((key) => {
            return NATIVE_KEYS.indexOf(key) === -1;
        });
        const length = keys.length;

        for (let index = 0; index < length; index++) {
            const key = keys[index];
            const value = getRealValue(object[key]);

            setReadOnly(this, key, value, object.propertyIsEnumerable(key));
        }

        return OBJECT_FREEZE(this);
    }

    /**
     * return unique hash of this values
     *
     * @return {number}
     */
    get $$hashCode() {
        return hash(this.toString());
    }

    /**
     * return type of CrioObject
     *
     * @return {string}
     */
    get $$type() {
        return 'CrioObject';
    }

    /**
     * return number of keys in object (getter here because it will show up in console,
     * whereas for CrioArray it is an expected property and is appropriately hidden)
     *
     * @return {number}
     */
    get length() {
        const keys = OBJECT_OWN_PROPERTY_NAMES(this).filter((key) => {
            return NATIVE_KEYS.indexOf(key) === -1;
        });

        return keys.length;
    }

    /**
     * return iterable array of keys in this
     *
     * @returns {array<string>}
     */
    entries() {
        return OBJECT_ENTRIES(this);
    }

    /**
     * is the object passed equal in value to this
     *
     * @param {any} object
     * @returns {boolean}
     */
    equals(object) {
        if (!isCrio(object)) {
            return false;
        }

        return this.$$hashCode === object.$$hashCode;
    }

    /**
     * return value at key in this
     *
     * @param {string} key
     * @returns {any}
     */
    get(key) {
        return this[key.toString()];
    }

    /**
     * return value at nested point based on keys in this
     * 
     * @param {array<string|number>} keys
     * @return {any}
     */
    getIn(keys) {
        if (!isArray(keys)) {
            throw new Error ('Must provide keys as an array, such as ["foo", "bar"].');
        }

        const length = keys.length;
        const lastIndex = length - 1;

        let currentObject = this;

        for (let index = 0; index < length; index++) {
            const key = keys[index];

            if (isUndefined(currentObject[key]) || index === lastIndex) {
                return currentObject[key];
            }

            currentObject = currentObject[key];
        }
    };

    /**
     * return if this has the property passed
     *
     * @param {string} property
     * @returns {boolean}
     */
    hasOwnProperty(property) {
        return OBJECT_PROTOTYPE.hasOwnProperty.call(this, property);
    }

    /**
     * return if this has the prototype of object passed
     *
     * @param {any} object
     * @returns {boolean}
     */
    isPrototypeOf(object) {
        return OBJECT_PROTOTYPE.isPrototypeOf.call(this, object);
    }

    /**
     * return iterable of keys in this
     *
     * @returns {array<string>}
     */
    keys() {
        return OBJECT_KEYS(this);
    }

    /**
     * shallowly merge all objects into this and return as new CrioObject
     *
     * @param {array<any>} objects
     * @returns {CrioObject}
     */
    merge(...objects) {
        const clone = isCrio(this) ? this.thaw() : this;

        objects.forEach((object) => {
            Object.assign(clone, object);
        });

        const crioedObject = new CrioObject(clone);

        return returnObjectOnlyIfNew(this, crioedObject);
    }

    /**
     * deeply merge all objects into this at key value determined by keys,
     * and return as a new CrioObject
     *
     * @param {array<string|number>} keys
     * @param {array<any>} objects
     * @returns {CrioObject}
     */
    mergeIn(keys, ...objects) {
        if (!isArray(keys)) {
            throw new Error ('Must provide keys as an array, such as ["foo", "bar"].');
        }

        if (!objects.length) {
            return this;
        }

        return assignOnDeepMatch(this, keys, objects, true);
    }

    /**
     * convenience function to work with mutable version of this,
     * in case many modifications need to be made and performance
     * is paramount
     *
     * @param {function} fn
     * @param {any} thisArg
     * @returns {any}
     */
    mutate(fn, thisArg = this) {
        const result = fn.call(thisArg, this.thaw(), this);
        const crioedValue = getRealValue(result);

        return returnObjectOnlyIfNew(this, crioedValue);
    }

    /**
     * determine if property passed is enumerable in this
     *
     * @param {string} property
     * @returns {boolean}
     */
    propertyIsEnumerable(property) {
        return OBJECT_PROTOTYPE.propertyIsEnumerable.call(this, property);
    }

    /**
     * set value at key in this
     *
     * @param {string} key
     * @param {any} value
     * @returns {CrioObject}
     */
    set(key, value) {
        const clone = this.thaw();

        clone[key] = value;

        const crioedObject = new CrioObject(clone);

        return returnObjectOnlyIfNew(this, crioedObject);
    }

    /**
     * deeply set value at location determined by keys in this
     *
     * @param {array<string|number>} keys
     * @param {any} value
     * @returns {CrioObject}
     */
    setIn(keys, value) {
        if (!isArray(keys)) {
            throw new Error ('Must provide keys as an array, such as ["foo", "bar"].');
        }

        return assignOnDeepMatch(this, keys, value);
    }

    /**
     * convert this back to a vanilla array
     *
     * @returns {array<any>}
     */
    thaw() {
        return OBJECT_OWN_PROPERTY_NAMES(this).reduce((object, key) => {
            if (NATIVE_KEYS.indexOf(key) === -1) {
                const value = this[key];
                const cleanValue = isCrio(value) ? value.thaw() : value;

                setStandard(object, key, cleanValue, this.propertyIsEnumerable(key));
            }

            return object;
        }, {});
    }

    /**
     * convert this to a locale-specific string
     *
     * @returns {string}
     */
    toLocaleString() {
        return this.toString();
    }

    /**
     * convert this to a string showing key: value pair combos
     *
     * @returns {string}
     */
    toString() {
        const startString = 'CrioObject {';

        let string = startString;

        OBJECT_OWN_PROPERTY_NAMES(this).forEach((key) => {
            if (NATIVE_KEYS.indexOf(key) === -1) {
                if (string !== startString) {
                    string += ', ';
                }

                const value = this[key];
                const cleanValue = isCrio(value) ? value.toString() : `"${value}"`;

                string += `"${key}": ${cleanValue}`;
            }
        });

        string += '}';

        return string;
    }

    /**
     * get the valueOf for this
     *
     * @return {any}
     */
    valueOf() {
        return OBJECT_PROTOTYPE.valueOf.call(this);
    }

    /**
     * get the iterable array of values for this
     *
     * @returns {array<any>}
     */
    values() {
        return OBJECT_VALUES(this);
    }

    /**
     * make CrioObject into an iterable
     *
     * @returns {{next: (function(): {value: any, done: boolean})}}
     */
    [Symbol.iterator]() {
        const keys = OBJECT_KEYS(this);

        let index = 0;

        return {
            next: () => {
                const key = keys[index];
                const value = this[key];
                const done = index >= this.length;

                index++;

                return {
                    value,
                    done
                };
            }
        };
    }
}

/**
 * entry function, assigning to either CrioArray or CrioObject or neither
 *
 * @param {any} object
 * @return {any}
 */
const crio = (object) => {
    if (isArray(object)) {
        return new CrioArray(object);
    }

    if (isObject(object)) {
        return new CrioObject(object);
    }

    return object;
};

export {assignOnDeepMatch};
export {getRealValue};
export {isCrio};

export {CrioArray};
export {CrioObject};

export default crio;
