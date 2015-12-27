

// local imports
import CrioCollection from './../CrioCollection';
import CrioDate from './../CrioDate';

// local partial imports
import {
    isArray,
    isDate,
    isObject
} from './checkers';

/**
 * Returns true if object passed is either an array or object
 *
 * @param obj<any>
 * @returns {boolean}
 */
const isConvertibleToCrio = (obj: any) : boolean => {
    return !isCrioCollection(obj) && !isCrioDate(obj) && (isArray(obj) || isObject(obj) || isDate(obj));
};

const isCrioCollection = (obj: any) : boolean => {
    return obj instanceof CrioCollection;
};

/**
 * Returns true if object passed is CrioDate
 *
 * @param obj<Any>
 * @returns {boolean}
 */
const isCrioDate = (obj: any) : boolean => {
    return obj instanceof CrioDate;
};

/**
 * Returns true if object passed is CrioList
 *
 * @param obj<Any>
 * @returns {boolean}
 */
const isCrioList = (obj: any) : boolean => {
    return isCrioCollection(obj) && isArray(obj.object);
};

/**
 * Returns true if object passed is CrioMap
 *
 * @param obj<Any>
 * @returns {boolean}
 */
const isCrioMap = (obj: any) : boolean => {
    return isCrioCollection(obj) && isObject(obj.object);
};

/**
 * Returns true if both objects passed are Crio and are equal to one another
 *
 * @param obj1<Any>
 * @param obj2<Any>
 * @returns {boolean}
 */
const isSameCrio = (obj1: CrioCollection|CrioDate, obj2: CrioCollection|CrioDate) : boolean => {
    if ((isCrioDate(obj1) && isCrioDate(obj2)) || (isCrioList(obj1) && isCrioList(obj2)) ||
        (isCrioMap(obj1) && isCrioMap(obj2))) {
        return obj1.hashCode === obj2.hashCode;
    }

    return false;
};

export {isConvertibleToCrio as isConvertibleToCrio};
export {isCrioCollection as isCrioCollection};
export {isCrioDate as isCrioDate};
export {isCrioList as isCrioList};
export {isCrioMap as isCrioMap};
export {isSameCrio as isSameCrio};

export default {
    isConvertibleToCrio,
    isCrioCollection,
    isCrioDate,
    isCrioList,
    isCrioMap,
    isSameCrio
};