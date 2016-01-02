

// local imports
import setCrioArrayOrObjectMethods from './setCrioArrayOrObjectMethods';

const PROTOTYPE_METHODS = [
    'concat',
    'copyWithin',
    'entries',
    'every',
    'fill',
    'filter',
    'find',
    'findIndex',
    'forEach',
    'includes',
    'indexOf',
    'join',
    'keys',
    'lastIndexOf',
    'map',
    'pop',
    'push',
    'reduce',
    'reduceRight',
    'reverse',
    'shift',
    'slice',
    'some',
    'sort',
    'splice',
    'toLocaleString',
    'toString',
    'unshift',
    'values'
];

const MUTABLE_METHODS = [
    'fill',
    'pop',
    'push',
    'reverse',
    'shift',
    'sort',
    'splice',
    'unshift'
];

const CUSTOM_METHODS = [
    'entries',
    'filter',
    'forEach',
    'keys',
    'map',
    'values'
];

let crioArrayPrototype = Object.create(Array.prototype);

export default setCrioArrayOrObjectMethods.call(crioArrayPrototype, Array, crioArrayPrototype,
    PROTOTYPE_METHODS, MUTABLE_METHODS, CUSTOM_METHODS);
