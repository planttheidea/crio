

// local imports
import CrioList from './../CrioList';
import CrioMap from './../CrioMap';
import deepFreeze from './deepFreeze';

// local partial imports
import {
    isArray,
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
 * Creates new Crio from passed object
 *
 * @param obj<Array|Object>
 * @returns {Array|Object}
 */
const createNewCrio = (obj: any) : CrioList|CrioMap => {
    const frozenObj = deepFreeze(obj);

    if (isArray(obj)) {
        return new CrioList(frozenObj);
    }

    if (isObject(obj)) {
        return new CrioMap(frozenObj);
    }

    throw new TypeError('Cannot create a Crio for standard objects, such as Strings, Numbers, Dates, etc. They ' +
        'are already immutable!');
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

export default createNewCrio;