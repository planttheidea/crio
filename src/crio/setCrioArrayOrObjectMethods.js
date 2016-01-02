

// polyfills
import es6Array from 'core-js/es6/array';
import es6Symbol from 'core-js/es6/symbol';
import es7Array from 'core-js/es7/array';
import es6Object from 'core-js/es6/object';
import es7Object from 'core-js/es7/object';
import 'babel-regenerator-runtime';

// local imports
import coalesceCrio from './coalesceCrio';
import crioDefaultMethods from './crioDefaultMethods';
import crioHelperMethods from './crioHelperMethods';

// local partial imports
import {
    setCrioIdentifier
} from './crioIdentifier';

import {
    isArray,
    isObject,
    isFunction
} from '../utils/checkers';

import {
    setNonEnumerable,
    shallowClone
} from '../utils/functions';

import {
    iteratorFunction
} from './crioIterator';

type ArrayOrObject = Array|Object;

const CUSTOM_METHODS = [
    'entries',
    'filter',
    'forEach',
    'freeze',
    'get',
    'equals',
    'hashCode',
    'isFrozen',
    'keys',
    'map',
    'merge',
    'mutate',
    'set',
    'thaw',
    'toArray',
    'toJS',
    'toObject',
    'values'
];

const coalesceResultIfApplicable = (obj: any, result: any, prototype: Object) : any => {
    if (!!result) {
        if (obj.equals(result)) {
            return obj;
        }

        if (isArray(obj) || isObject(result)) {
            return coalesceCrio(obj, result, prototype);
        }
    }

    return result;
};

const setArrayOrObjectPrototypeMethods = (mainObject: Array|Object, prototype: Object,
        prototypeMethods: Array, mutableMethods: Array, customMethods: Array) : Object => {

    const isPrototypeForArray = mainObject === Array;
    const mainPrototype = mainObject.prototype;
    const es6 = isPrototypeForArray ? es6Array : es6Object;
    const es7 = isPrototypeForArray ? es7Array : es7Object;

    let customPrototype = {...crioDefaultMethods};

    prototypeMethods.splice(prototypeMethods.indexOf('constructor'), 1);

    prototypeMethods.slice().forEach((method) => {
        if (customMethods.indexOf(method) !== -1 || /__/.test(method) || /@@/.test(method)) {
            prototypeMethods.splice(prototypeMethods.indexOf(method), 1);
        }
    });

    customPrototype.entries = function entries() {
        return es6.entries(this);
    };

    customPrototype.filter = ((isThisArray, filterPrototype) => {
        const filterMethod = isThisArray ? crioHelperMethods.filterArray : crioHelperMethods.filterObject;

        return function filter(callback: Function) : ArrayOrObject {
            if (!callback) {
                return this;
            }

            return filterMethod.call(this, callback, filterPrototype);
        };
    })(isPrototypeForArray, prototype);

    customPrototype.forEach = isPrototypeForArray ? crioHelperMethods.forEachArray : crioHelperMethods.forEachObject;

    customPrototype.get = crioHelperMethods.get;

    customPrototype.keys = function keys() {
        return es6.keys(this);
    };

    customPrototype.map = ((isThisArray, mapPrototype) => {
        const mapMethod = isThisArray ? crioHelperMethods.mapArray : crioHelperMethods.mapObject;

        return function map(callback: Function) : ArrayOrObject {
            if (!callback) {
                return this;
            }

            return mapMethod.call(this, callback, mapPrototype);
        };
    })(isPrototypeForArray, prototype);

    customPrototype.merge = crioHelperMethods.merge;

    customPrototype.mutate = function mutate(callback: Function) : any {
        if (!callback) {
            return this;
        }

        return crioHelperMethods.mutate.call(this, callback);
    };

    customPrototype.set = ((newPrototype) => {
        return function (keys: Array|Object|string|number, value: any) {
            return crioHelperMethods.set.call(this, keys, value, newPrototype);
        };
    })(prototype);

    customPrototype.toArray = crioHelperMethods.toArray;

    customPrototype.toObject = crioHelperMethods.toObject;

    customPrototype.values = function values() {
        return (isPrototypeForArray ? es6 : es7).values(this);
    };

    CUSTOM_METHODS.forEach((method) => {
        setNonEnumerable(prototype, method, customPrototype[method]);
    });

    const hasSymbol = typeof Symbol !== 'undefined';
    const hasObjectSpecificIteratorFunction = hasSymbol && !!mainPrototype[Symbol.iterator];

    setNonEnumerable(
        prototype,
        hasSymbol ? Symbol.iterator : es6Symbol.iterator,
        hasObjectSpecificIteratorFunction ? mainPrototype[Symbol.iterator] :
            isPrototypeForArray ? es6Array.iterator : iteratorFunction
    );

    prototypeMethods.forEach((method) => {
        let newMethod: ?Function;

        if (mutableMethods.indexOf(method) !== -1) {
            if (mainPrototype[method]) {
                newMethod = function(...args) : ArrayOrObject {
                    const clone: ArrayOrObject = shallowClone(this);

                    mainPrototype[method].apply(clone, args);

                    return coalesceCrio(this, clone, prototype);
                };
            } else {
                const polyfilledMethod = es6[method] || es7[method];

                if (polyfilledMethod) {
                    newMethod = function(...args) : ArrayOrObject {
                        const clone: ArrayOrObject = shallowClone(this);

                        polyfilledMethod(clone, ...args);

                        return coalesceCrio(this, clone, prototype);
                    };
                }
            }
        } else {
            if (mainPrototype[method]) {
                newMethod = function(...args) : any {
                    const result: any = mainPrototype[method].apply(this, args);

                    if (!isArray(result) && !isObject(result)) {
                        return result;
                    }

                    return coalesceResultIfApplicable(this, result, prototype);
                };
            } else {
                const polyfilledMethod = es6[method] || es7[method];

                if (polyfilledMethod) {
                    newMethod = function (...args) : any {
                        const result: any = polyfilledMethod(this, ...args);

                        if (!isArray(result) && !isObject(result)) {
                            return result;
                        }

                        return coalesceResultIfApplicable(this, result, prototype);
                    };
                }
            }
        }

        if (isFunction(newMethod)) {
            setNonEnumerable(prototype, method, newMethod);
        }
    });

    setCrioIdentifier(prototype, mainObject);

    return prototype;
};

export default setArrayOrObjectPrototypeMethods;
