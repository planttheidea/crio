

// local imports
import {
    cloneObject
} from './utils/recursiveObjectModifications';

import {
    isArray,
    isArrayLike,
    isCrio,
    isDate,
    isObject
} from './utils/checkers';

let defaults = {
    autoFreeze: true
};

const crio = (obj: any = {}) : any => {
    if (isCrio(obj)) {
        return obj;
    }

    if (isArray(obj) || isObject(obj) || isDate(obj)) {
        const cleanedObj = isArrayLike(obj) ? [...obj] : obj;

        return cloneObject(cleanedObj, defaults.autoFreeze);
    }

    return obj;
};

crio.array = (obj: Array = []) : Array => {
    if (isCrio(obj)) {
        return obj;
    }

    if (isArray(obj) || isArrayLike(obj)) {
        return crio(obj);
    }

    throw new TypeError('Value passed to crio.array is not an Array.');
};

crio.array.from = (...args) => {
    return crio.array(args);
};

crio.date = (obj: Date|Object = new Date()) : Date|Object => {
    if (isCrio(obj)) {
        return obj;
    }

    if (isDate(obj)) {
        return crio(obj);
    }

    throw new TypeError('Value passed to crio.date is not a Date.');
};

crio.date.from = (...args) => {
    return crio.date(new Date(...args));
};

crio.date.utc = (...args) => {
    if (isDate(args[0])) {
        return crio.date(new Date(Date.UTC(args[0])));
    }

    return crio.date(new Date(Date.UTC(...args)));
};

crio.object = (obj: Object = {}) : Object => {
    if (isCrio(obj)) {
        return obj;
    }

    if (isObject(obj)) {
        return crio(obj);
    }

    throw new TypeError('Value passed to crio.object is not an Object.');
};

crio.setDefaults = (newDefaults: Object) => {
    if (!isObject(newDefaults)) {
        return;
    }

    defaults = {
        ...defaults,
        ...newDefaults
    };
};
export default crio;