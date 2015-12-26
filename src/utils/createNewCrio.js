

// local imports
import CrioList from './../CrioList';
import CrioMap from './../CrioMap';
import deepFreeze from './deepFreeze';

// local partial imports
import {
    isArray,
    isArrayLike,
    isObject
} from './checkers';

import {
    isCrioList,
    isCrioMap
} from './crioCheckers';

import {
    cloneObject
} from './crioFunctions';

const createNewCrioList = (obj: Object) : CrioList => {
    return Object.seal(new CrioList(obj));
};

const createNewCrioMap = (obj: Object) : CrioMap => {
    return Object.seal(new CrioMap(obj));
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
    const frozenObj = deepFreeze(cleanObj);

    if (isObjArray) {
        return createNewCrioList(frozenObj);
    }

    if (isObject(obj)) {
        return createNewCrioMap(frozenObj);
    }

    return obj;
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
createNewCrio.list.of = (...items) => {
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