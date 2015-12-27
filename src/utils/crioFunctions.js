


// local imports
import {
    createNewCrio
} from './createNewCrio';
import CrioCollection from './../CrioCollection';

import {
    isArray,
    isDate,
    isNumber,
    isObject,
    isUndefined
} from './checkers';

import {
    isConvertibleToCrio,
    isCrioCollection,
    isCrioDate,
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
        const cleanObj = isCrioCollection(obj) ? obj.object : obj;

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

const convertToString = (obj: CrioCollection, isLocaleSpecific: boolean) : string => {
    const isThisObject = isObject(obj.object);
    const prefix = isThisObject ? 'CrioMap {' : 'CrioList [';
    const suffix = isThisObject ? '}' : ']';

    let stringReturn = '';

    obj.forEach((value, key) => {
        if (stringReturn !== '') {
            stringReturn += ', ';
        }

        if (isThisObject) {
            stringReturn += key + ': ';
        }

        if (isCrioCollection(value)) {
            stringReturn += convertToString(value, isLocaleSpecific);
        } else if (isLocaleSpecific && (isNumber(value) || isDate(value))) {
            stringReturn += value.toLocaleString();
        } else {
            stringReturn += value;
        }
    });

    stringReturn = prefix + stringReturn + suffix;

    return stringReturn;
};

/**
 * Helper function to return either the thawed Crio object or the object itself
 *
 * @param obj<any>
 * @returns {any}
 */
const getThawedObject = (obj: any) : any => {
    return isCrioCollection(obj) ? obj.thaw() : obj;
};

/**
 * Deeply merge objects or arrays
 *
 * @param target<any>
 * @param sources<Array>
 * @returns {*}
 */
const mergeObject = (target: any, ...sources: Array) => {
    target = getThawedObject(target);

    const isTargetArr = isArray(target);
    const isTargetObj = isObject(target);

    if (!isTargetArr && !isTargetObj) {
        return sources[sources.length - 1];
    }

    let dest: Array|Object = isTargetArr ? [] : {};

    forEach(sources, (source) => {
        const realSource = getThawedObject(source);

        if (isArray(realSource)) {
            target = target || [];
            dest = dest.concat(target);

            forEach(realSource, (item, i) => {
                const realItem =  getThawedObject(item);

                if (isUndefined(dest[i])) {
                    dest[i] = realItem;
                } else if (isObject(realItem)) {
                    dest[i] = mergeObject(target[i], realItem);
                } else {
                    if (target.indexOf(realItem) === -1) {
                        dest.push(realItem);
                    }
                }
            });
        } else {
            target = target || {};

            forOwn(target, (value, key) => {
                dest[key] = getThawedObject(value);
            });

            forOwn(realSource, (value, key) => {
                const realValue = getThawedObject(value);

                if (isObject(realValue)) {
                    dest[key] = mergeObject(target[key], realValue);
                }

                if (!isObject(realValue) || !realValue) {
                    dest[key] = realValue;
                } else if (!target[key]) {
                    dest[key] = realValue;
                }
            });
        }
    });

    return dest;
};

/**
 * Accepts any parameter, and if it is a Crio then return a cloned and unfrozen item
 *
 * @param obj<Any>
 * @returns {*}
 */
const thawCrio = (obj: any) : any => {
    if (isCrioCollection(obj)) {
        return cloneObject(obj.object);
    }

    if (isCrioDate(obj)) {
        return new Date(obj.object.valueOf());
    }

    if (Object.isFrozen(obj)) {
        return cloneObject(obj);
    }

    return obj;
};

const coalesceCrioValue = (Crio: CrioCollection, obj: any) => {
    if (isConvertibleToCrio(obj) && !isCrioCollection(obj)) {
        return getCrioInstance(Crio, createNewCrio(obj));
    }

    return obj;
};

export {cloneObject as cloneObject};
export {coalesceCrioValue as coalesceCrioValue};
export {convertToString as convertToString};
export {getCrioInstance as getCrioInstance};
export {mergeObject as merge};
export {thawCrio as thaw};

export default {
    cloneObject,
    coalesceCrioValue,
    convertToString,
    getCrioInstance,
    merge: mergeObject,
    thaw: thawCrio
};