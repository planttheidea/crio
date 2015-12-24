

const staticProperty = (obj, property, value) => {
    Object.defineProperty(obj, property, {
        configurable:false,
        enumerable:false,
        value,
        writable:false
    });
};

const readonlyProperty = (obj, property, value) => {
    Object.defineProperty(obj, property, {
        configurable:false,
        enumerable:true,
        value,
        writable:false
    });
};

export {readonlyProperty as readonlyProperty};
export {staticProperty as staticProperty};

export default {
    readonlyProperty,
    staticProperty
};