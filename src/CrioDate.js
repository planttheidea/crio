

// local imports
import deepFreeze from './utils/deepFreeze';

// local partial imports
import {
    isDate,
    isValueless
} from './utils/checkers';

import {
    isSameCrio
} from './utils/crioCheckers';

import {
    thaw
} from './utils/crioFunctions';

import {
    forEach
} from './utils/functions';

import {
    readonlyProperty,
    staticProperty
} from './utils/decorators';

import {
    hashString
} from './utils/hash';

const MUTABLE_METHODS = [
    'setTime',
    'setMilliseconds',
    'setUTCMilliseconds',
    'setSeconds',
    'setUTCSeconds',
    'setMinutes',
    'setUTCMinutes',
    'setHours',
    'setUTCHours',
    'setDate',
    'setUTCDate',
    'setMonth',
    'setUTCMonth',
    'setFullYear',
    'setUTCFullYear',
    'setYear'
];

class CrioDate {
    constructor(obj: Date) {
        staticProperty(this, 'hashCode', hashString(obj));
        readonlyProperty(this, 'object', obj);
        readonlyProperty(this, 'size', 1);
    }

    /**
     * Tests if object passed is equal to the current Crio object
     *
     * @param crio2<Crio>
     * @returns {boolean}
     */
    equals(crio2: Object) : boolean {
        if (isValueless(crio2)) {
            return false;
        }

        return isSameCrio(this, crio2);
    }

    thaw() : Date {
        return thaw(this);
    }
}

const addPrototypeMethod = (method: string) => {
    if (MUTABLE_METHODS.indexOf(method) === -1) {
        /**
         * Accepts standard Date parameters and returns a CrioDate created with the
         * existing immutable Date prototype functions.
         *
         * @param args<Array>
         * @returns {CrioDate}
         */
        return function (...args: Array) : CrioDate|number|string {
            const result: Date|number|string = Date.prototype[method].apply(this.object, args);

            if (isDate(result)) {
                const newDate: Date = new Date(result.valueOf());

                return new CrioDate(deepFreeze(newDate));
            }

            return result;
        };
    }

    /**
     * Accepts standard Date parameters and returns a CrioDate created with a cloned version
     * of the original date with the mutation applied
     *
     * @param args<Array>
     * @returns {CrioDate}
     */
    return function (...args: Array) : CrioDate {
        const cloneDate: Date = new Date(this.object.valueOf());

        Date.prototype[method].apply(cloneDate, args);

        return new CrioDate(deepFreeze(cloneDate));
    };
};

let prototypeMethods: Array = Object.getOwnPropertyNames(Date.prototype);

prototypeMethods.splice(prototypeMethods.indexOf('constructor'), 1);

forEach(prototypeMethods, (method) => {
    CrioDate.prototype[method] = addPrototypeMethod(method);
});

export default CrioDate;