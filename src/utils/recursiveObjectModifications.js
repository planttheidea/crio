

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

const cloneObj = (obj: any, visited: Object, circularSet: Array,
      shouldFreeze: boolean, shouldApplyPrototype: boolean) => {
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
                clonedObject[i] = pushToCircularSetAndVisited(visited, i, circularSet, obj[i],
                    [], i, isObjArray, shouldFreeze, shouldApplyPrototype);
            }
        } else {
            const propertyNames = getOwnPropertyNames(obj);

            for (let i: number = 0, len = propertyNames.length; i < len; i++) {
                const prop = propertyNames[i];
                const visitedIndex = visited.indexOf(obj[i]);

                if (visitedIndex !== -1) {
                    return visited[visitedIndex];
                }

                clonedObject[i] = pushToCircularSetAndVisited(visited, prop, circularSet, obj[prop],
                    {}, prop, isObjArray, shouldFreeze, shouldApplyPrototype);
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

const setProtos = (obj: Object, visited: Array, circularSet: Array, shouldFreeze: boolean) => {
    if (isFrozen(obj)) {
        return cloneObj(obj, visited, circularSet, shouldFreeze, true);
    }

    if (isArray(obj)) {
        setPrototypeOf(obj, crioArrayPrototype);

        for (let i: number = 0, len = obj.length; i < len; i++) {
            if (visited.indexOf(obj[i]) === -1) {
                pushToCircularSetAndVisited(visited, i, circularSet, obj[i],
                    [], i, true, shouldFreeze, true);
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

                pushToCircularSetAndVisited(visited, prop, circularSet, obj[prop],
                    {}, prop, false, shouldFreeze, true);
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

const pushToCircularSet = (circularSet: Array, base: Array|Object, key: number|string, isValueArray: boolean) => {
    let newBase = base[key] = isValueArray ? [] : {};

    circularSet[circularSet.length] = {
        up: base,
        value: newBase
    };
};

const pushToVisited = (visited: Object, prop: number|string, value: any) => {
    visited[visited.length] = value;
};

const pushToCircularSetAndVisited = (visited: Object, prop: number|string, circularSet: Array, value: any,
     base: Array|Object, key: number|string, isValueArray: boolean,
     shouldFreeze: boolean, shouldApplyPrototype: boolean, isClone: boolean = true) => {

    pushToVisited(visited, prop, value);
    pushToCircularSet(circularSet, base, key, isValueArray);

    if (isClone) {
        return cloneObj(value, visited, circularSet, shouldFreeze, shouldApplyPrototype);
    }

    return setProtos(value);
};

const cloneObject = (originalObj: any, shouldFreeze: boolean = false,
         shouldApplyPrototype: boolean = true) : any => {

    let visited: Array = [],
        circularSet: Array = [
            {base: originalObj}
        ];

    return cloneObj(originalObj, visited, circularSet, shouldFreeze, shouldApplyPrototype);
};

const setDeepPrototype = (obj: any, shouldFreeze: boolean = false) : any => {
    if (!isArray(obj) && !isDate(obj) && !isObject(obj)) {
        return obj;
    }

    let visited: Array = [],
        circularSet: Array = [
            {base: obj}
        ];

    return setProtos(obj, visited, circularSet, shouldFreeze);
};

export {cloneObject as cloneObject};
export {setDeepPrototype as setDeepPrototype};

export default {
    cloneObject,
    setDeepPrototype
};