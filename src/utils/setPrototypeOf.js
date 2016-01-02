

// local imports
import {
    isFunction
} from './checkers';

// polyfill for back to IE9 (since core-js doesn't do this)
const setDeprecatedProtoProperty = (obj, proto) => {
    obj.__proto__ = proto;
};

// really old fallback in case __proto__ property is unavailable
const assignProtoPropsDirectly = (obj, proto) => {
    for (var prop in proto) {
        if (proto.hasOwnProperty(prop)) {
            obj[prop] = proto[prop];
        }
    }
};

export default isFunction(Object.setPrototypeOf) ? Object.setPrototypeOf :
    {__proto__:[]} instanceof Array ? setDeprecatedProtoProperty : assignProtoPropsDirectly;