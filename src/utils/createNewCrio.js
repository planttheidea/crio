

// local imports
import CrioDate from './../CrioDate';
import CrioList from './../CrioList';
import CrioMap from './../CrioMap';
import deepFreeze from './deepFreeze';

// local partial imports
import {
    isArray,
    isArrayLike,
    isDate,
    isObject
} from './checkers';

import {
    isCrioList,
    isCrioMap
} from './crioCheckers';

import {
    cloneObject
} from './crioFunctions';

/**
 * Creates new CrioDate from passed object
 *
 * @param obj<Date>
 * @returns {CrioDate}
 */
const createNewCrioDate = (obj: Date) : CrioDate => {
    return Object.freeze(new CrioDate(deepFreeze(obj)));
};

/**
 * Creates new CrioList from passed object
 *
 * @param obj<Date>
 * @returns {CrioList}
 */
const createNewCrioList = (obj: Object) : CrioList => {
    return Object.freeze(new CrioList(deepFreeze(obj)));
};

/**
 * Creates new CrioMap from passed object
 *
 * @param obj<Date>
 * @returns {CrioMap}
 */
const createNewCrioMap = (obj: Object) : CrioMap => {
    return Object.freeze(new CrioMap(deepFreeze(obj)));
};

/**
 * Creates new Crio from passed object
 *
 * @param obj<Array|Object>
 * @returns {Array|Object}
 */
const createNewCrio = (obj: any = {}) : any => {
    const isObjArray = isArray(obj);
    const cleanObj = !isObjArray && isArrayLike(obj) ? Array.prototype.slice.call(obj) : obj;

    if (isObjArray) {
        return createNewCrioList(cleanObj);
    }

    if (isDate(obj)) {
        return createNewCrioDate(cleanObj);
    }

    if (isObject(obj)) {
        return createNewCrioMap(cleanObj);
    }

    return obj;
};

/**
 * Creates new CrioDate from passed object
 *
 * @param obj<Date>
 * @returns {CrioDate}
 */
createNewCrio.date = (obj: any) : any => {
    return createNewCrioDate(obj);
};

/**
 * Creates new CrioDate from arguments passed
 *
 * @param args<Array>
 * @returns {CrioDate}
 */
createNewCrio.date.from = (...args: Array) => {
    return createNewCrioDate(new Date(...args));
};

/**
 * Creates new UTC-based CrioDate from arguments passed
 *
 * @param args<Array>
 * @returns {CrioDate}
 */
createNewCrio.date.utc = (...args: Array) => {
    if (args.length === 1 && isDate(args[0])) {
        const date = args[0];

        return createNewCrio(new Date(Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds(),
            date.getUTCMilliseconds()
        )));
    }

    return createNewCrio(new Date(Date.UTC(...args)));
};

/**
 * Recursively freezes object passed to it
 *
 * @param obj<any>
 * @returns {any}
 */
createNewCrio.freeze = (obj: any) : any => {
    return deepFreeze(obj);
};

/**
 * Returns true if object passed is frozen
 *
 * @param obj<any>
 * @returns {boolean}
 */
createNewCrio.isFrozen = (obj: any) : boolean => {
    return Object.isFrozen(obj);
};

createNewCrio.isList = isCrioList;
createNewCrio.isMap = isCrioMap;

createNewCrio.list = createNewCrioList;

/**
 * Creates new CrioList from passed object
 *
 * @param items<Date>
 * @returns {CrioList}
 */
createNewCrio.list.of = (...items: Array) => {
    return createNewCrioList(deepFreeze(items));
};

createNewCrio.map = createNewCrioMap;

/**
 * Returns mutable copy of the object that was Crio
 *
 * @param obj<any>
 * @returns {any}
 */
createNewCrio.thaw = (obj: any) : any => {
    if (isCrioList(obj) || isCrioMap(obj)) {
        return obj.thaw();
    }

    if (this.isFrozen(obj)) {
        return cloneObject(obj);
    }

    return obj;
};

export {createNewCrio as createNewCrio};
export {createNewCrioList as createNewCrioList};
export {createNewCrioMap as createNewCrioMap};

export default {
    createNewCrio,
    createNewCrioList,
    createNewCrioMap
};