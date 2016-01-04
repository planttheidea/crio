

// local imports
import setPrototypeOf from './setPrototypeOf';

// local imports
import crioArrayPrototype from '../crio/crioArrayPrototype';
import crioDatePrototype from '../crio/crioDatePrototype';
import crioObjectPrototype from '../crio/crioObjectPrototype';

// local partial imports
import {
    isArray,
    isDate,
    isObject
} from './checkers';

const create = Object.create;
const freeze = Object.freeze;
const getOwnPropertyNames = Object.getOwnPropertyNames;
const isFrozen = Object.isFrozen;

const freezeIfApplicable = (obj: Array|Object, shouldFreeze: boolean) : Array|Object => {
    return shouldFreeze ? freeze(obj) : obj;
};

const cloneObj = (obj: any, visited: Object, shouldFreeze: boolean, shouldApplyPrototype: boolean) => {
    const isObjArray = isArray(obj);

    if (isObjArray || isObject(obj)) {
        let clonedObject: Array|Object = isObjArray ? [] : {};

        if (shouldApplyPrototype) {
            if (isObjArray) {
                setPrototypeOf(clonedObject, crioArrayPrototype);
            } else {
                clonedObject = create(crioObjectPrototype);
            }
        }

        if (isObjArray) {
            for (let i: number = 0, len = obj.length; i < len; i++) {
                const visitedIndex = visited.indexOf(obj[i]);

                clonedObject[i] = visitedIndex !== -1 ? visited[visitedIndex] :
                    pushToVisitedAndCloneNested(visited, i, obj[i],
                        i, isObjArray, shouldFreeze, shouldApplyPrototype);
            }
        } else {
            const propertyNames = getOwnPropertyNames(obj);

            for (let i: number = 0, len = propertyNames.length; i < len; i++) {
                const prop = propertyNames[i];
                const visitedIndex = visited.indexOf(obj[prop]);

                clonedObject[prop] = visitedIndex !== -1 ? visited[visitedIndex] :
                    pushToVisitedAndCloneNested(visited, prop, obj[prop],
                        prop, isObjArray, shouldFreeze, shouldApplyPrototype);
            }
        }

        return freezeIfApplicable(clonedObject, shouldFreeze);
    }

    if (isDate(obj)) {
        let newDate = new Date(obj.valueOf());

        if (shouldApplyPrototype) {
           setPrototypeOf(newDate, crioDatePrototype);
        }

        return freezeIfApplicable(newDate, shouldFreeze);
    }

    return obj;
};

const setProtos = (obj: Object, visited: Array, shouldFreeze: boolean) => {
    if (isFrozen(obj)) {
        return cloneObj(obj, visited, shouldFreeze, true);
    }

    if (isArray(obj)) {
        setPrototypeOf(obj, crioArrayPrototype);

        for (let i: number = 0, len = obj.length; i < len; i++) {
            if (visited.indexOf(obj[i]) === -1) {
                pushToVisitedAndCloneNested(visited, i, obj[i],
                    i, true, shouldFreeze, true);
            }
        }

        return freezeIfApplicable(obj, shouldFreeze);
    }

    if (isObject(obj)) {
        setPrototypeOf(obj, crioObjectPrototype);

        const propertyNames = getOwnPropertyNames(obj);

        for (let i: number = 0, len = propertyNames.length; i < len; i++) {
            if (visited.indexOf(obj[i]) === -1) {
                const prop = propertyNames[i];

                pushToVisitedAndCloneNested(visited, prop, obj[prop],
                    prop, false, shouldFreeze, true);
            }
        }

        return freezeIfApplicable(obj, shouldFreeze);
    }

    if (isDate(obj)) {
        setPrototypeOf(obj, crioDatePrototype);

        return freezeIfApplicable(obj, shouldFreeze);
    }

    return obj;
};

const pushToVisited = (visited: Object, value: any) => {
    visited[visited.length] = value;
};

const pushToVisitedAndCloneNested = (visited: Object, prop: number|string, value: any, key: number|string,
         isValueArray: boolean, shouldFreeze: boolean, shouldApplyPrototype: boolean, isClone: boolean = true) => {

    pushToVisited(visited, value);

    if (isClone) {
        return cloneObj(value, visited, shouldFreeze, shouldApplyPrototype);
    }

    return setProtos(value);
};

const cloneObject = (originalObj: any, shouldFreeze: boolean = false,
         shouldApplyPrototype: boolean = true) : any => {

    let visited: Array = [];

    return cloneObj(originalObj, visited, shouldFreeze, shouldApplyPrototype);
};

const setDeepPrototype = (obj: any, shouldFreeze: boolean = false) : any => {
    if (!isArray(obj) && !isDate(obj) && !isObject(obj)) {
        return obj;
    }

    let visited: Array = [];

    return setProtos(obj, visited, shouldFreeze);
};

export {cloneObject as cloneObject};
export {setDeepPrototype as setDeepPrototype};

export default {
    cloneObject,
    setDeepPrototype
};