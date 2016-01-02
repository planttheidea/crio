

// polyfills
import es6Date from 'core-js/es6/date';
import es6Symbol from 'core-js/es6/symbol';
import 'babel-regenerator-runtime';

// local imports
import coalesceCrio from './coalesceCrio';
import crioDefaultMethods from './crioDefaultMethods';

// local partial imports
import {
    setCrioIdentifier
} from './crioIdentifier';

//import {
//    cloneObject
//} from '../utils/recursiveObjectModifications';

import {
    isDate,
    isFunction
} from '../utils/checkers';

import {
    setNonEnumerable
} from '../utils/functions';

const CUSTOM_METHODS = [
    'equals',
    'freeze',
    'hashCode',
    'isFrozen',
    'thaw',
    'toJS'
];

const toDatePrimitive = function(hint) {
    const hasToString = !!this.toString;
    const hasValueOf = !!this.valueOf;

    if (hint === 'number') {
        if (hasValueOf) {
            return this.valueOf();
        }

        if (hasToString) {
            return this.toString();
        }

        throw new TypeError('No valueOf or toString defined.');
    }

    if (hasToString) {
        return this.toString();
    }

    if (hasValueOf) {
        return this.valueOf();
    }

    throw new TypeError('No valueOf or toString defined.');
};

const setDateMethods = (prototype: Object,
      prototypeMethods: Array, mutableMethods: Array, customMethods: Array) : Object => {

    const mainPrototype = Date.prototype;
    
    let customPrototype = {...crioDefaultMethods};

    prototypeMethods.splice(prototypeMethods.indexOf('valueOf'), 1);

    prototypeMethods.slice().forEach((method) => {
        if (customMethods.indexOf(method) !== -1 || /__/.test(method) || /@@/.test(method)) {
            prototypeMethods.splice(prototypeMethods.indexOf(method), 1);
        }
    });

    CUSTOM_METHODS.forEach((method) => {
        setNonEnumerable(prototype, method, customPrototype[method]);
    });

    const hasSymbol = typeof Symbol !== 'undefined';
    const hasDateToPrimitive = !!mainPrototype[Symbol.toPrimitive];

    setNonEnumerable(
        prototype,
        hasSymbol ? Symbol.toPrimitive : es6Symbol.toPrimitive,
        hasDateToPrimitive ? mainPrototype[Symbol.toPrimitive] : toDatePrimitive
    );

    setNonEnumerable(prototype, 'valueOf', function valueOf() : number {
        return mainPrototype.valueOf.call(this);
    });

    prototypeMethods.forEach((method) => {
        let newMethod: ?Function;

        if (mutableMethods.indexOf(method) !== -1) {
            if (mainPrototype[method]) {
                newMethod = function(...args: Array) : Date {
                    const clone: Date = new Date(this.valueOf());

                    mainPrototype[method].apply(clone, args);

                    return coalesceCrio(this, clone, prototype);
                };
            } else {
                let polyfilledMethod = es6Date[method];

                if (polyfilledMethod) {
                    newMethod = function(...args: Array) : Date {
                        const clone: Date = new Date(this.valueOf());

                        console.log(this.isFrozen());

                        polyfilledMethod(clone, ...args);

                        return coalesceCrio(this, clone, prototype);
                    };
                }
            }
        } else {
            if (mainPrototype[method]) {
                newMethod = function(...args) : any {
                    const clone: Date = new Date(this.valueOf());
                    const result: any = mainPrototype[method].apply(clone, args);

                    if (!isDate(result)) {
                        return result;
                    }

                    return coalesceCrio(this, result, prototype);
                };
            } else {
                let polyfilledMethod = es6Date[method];

                if (polyfilledMethod) {
                    newMethod = function (...args) : any {
                        const clone: Date = new Date(this.valueOf());
                        const result: any = polyfilledMethod(clone, ...args);

                        if (!isDate(result)) {
                            return result;
                        }

                        return coalesceCrio(this, result, prototype);
                    };
                }
            }
        }

        if (isFunction(newMethod)) {
            setNonEnumerable(prototype, method, newMethod);
        }
    });

    setCrioIdentifier(prototype, Date);

    return prototype;
};

export default setDateMethods;
