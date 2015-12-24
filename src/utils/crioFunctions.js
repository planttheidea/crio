


// local imports
import createNewCrio from './createNewCrio';
import CrioCollection from './../CrioCollection';

import {
    isArray,
    isObject
} from './checkers';

import {
    isCrioList,
    isCrioMap,
    isSameCrio
} from './crioCheckers';

import {
    forEach,
    forOwn
} from './functions';

/**
 * If the Crio values are equal, then return the original instance, else return the new instance
 *
 * @param crio1<Object>
 * @param crio2<Object>
 * @returns isSameCrio<Boolean>
 */
const getCrioInstance = (crio1: CrioCollection, crio2: CrioCollection) : CrioCollection => {
    return isSameCrio(crio1, crio2) ? crio1 : crio2;
};

/**
 * Deep clone object passed, returning configurability and enumerabity back to it
 *
 * @param originalObj<Any>
 * @returns {*}
 */
const cloneObject = (originalObj: any) : any => {
    let visited: Array = [originalObj],
        circularSet: Array = [
            {
                base:originalObj
            }
        ];

    const pushToCircularSet = (base, index, isValueArray) => {
        let newBase = base[index] = isValueArray ? [] : {};

        circularSet.push({
            up: base,
            value: newBase
        });
    };

    const cloneObj = (obj) => {
        const cleanObj = isCrioList(obj) || isCrioMap(obj) ? obj.object : obj;

        let base: Array = [];

        if (isArray(cleanObj)) {
            let clonedArray: Array = [];

            forEach(cleanObj, (value, index) => {
                const visitedIndex = visited.indexOf(value);

                if (visitedIndex === -1) {
                    const isValueArray = isArray(value);

                    if (isValueArray || isObject(value)) {
                        visited.push(value);

                        pushToCircularSet(base, index, isValueArray);

                        clonedArray.push(cloneObject(value));
                    } else {
                        clonedArray.push(value);
                    }
                } else {
                    clonedArray.push(circularSet[visitedIndex].value);
                }
            });

            return clonedArray;
        }

        if (isObject(cleanObj)) {
            let clonedObject = {};

            forOwn(cleanObj, (value, key) => {
                const visitedIndex = visited.indexOf(value);

                if (visitedIndex === -1) {
                    const isValueArray = isArray(value);

                    if (isValueArray || isObject(value)) {
                        visited.push(value);

                        pushToCircularSet(base, key, isValueArray);

                        value = cloneObject(value);
                    }

                    Object.defineProperty(clonedObject, key, {
                        configurable:true,
                        enumerable:cleanObj.propertyIsEnumerable(key),
                        value,
                        writable:true
                    });
                } else {
                    clonedObject[key] = circularSet[visitedIndex].value;
                }
            });

            return clonedObject;
        }
    };

    return cloneObj(originalObj);
};

/**
 * Accepts any parameter, and if it is a Crio then return a cloned and unfrozen item
 *
 * @param obj<Any>
 * @returns {*}
 */
const thawCrio = (obj: any) : any => {
    if (isCrioList(obj) || isCrioMap(obj)) {
        return cloneObject(obj.object);
    }

    if (Object.isFrozen(obj)) {
        return cloneObject(obj);
    }

    return obj;
};

const coalesceCrioValue = (Crio: CrioCollection, obj: any) => {
    if (isArray(obj) || (isObject(obj) && !isCrioList(obj) && !isCrioMap(obj))) {
        return getCrioInstance(Crio, createNewCrio(obj));
    }

    return obj;
};

export {cloneObject as cloneObject};
export {coalesceCrioValue as coalesceCrioValue};
export {getCrioInstance as getCrioInstance};
export {thawCrio as thaw};

export default {
    cloneObject,
    coalesceCrioValue,
    getCrioInstance,
    thaw: thawCrio
};