

// local imports
import setCrioArrayOrObjectMethods from './setCrioArrayOrObjectMethods';

const PROTOTYPE_METHODS = [
    'entries',
    'filter',
    'forEach',
    'hasOwnProperty',
    'isPrototypeOf',
    'keys',
    'map',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf',
    'values'
];

const MUTABLE_METHODS = [];

let crioObjectPrototype = Object.create(Object.prototype);

export default setCrioArrayOrObjectMethods.call(crioObjectPrototype, Object, crioObjectPrototype,
    PROTOTYPE_METHODS, MUTABLE_METHODS);
