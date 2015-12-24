

// local imports
import createNewCrio from './utils/createNewCrio';
import CrioCollection from './CrioCollection';

// local partial imports
import {
    getCrioInstance
} from './utils/crioFunctions';

import {
    forEach,
    forIn,
    forOwn
} from './utils/functions';

class CrioMap extends CrioCollection {
    constructor(obj) {
        super(obj);
    }

    /**
     * Returns a new Crio with an object including all values except that
     * of the key(s) passed.
     *
     * @param keys<Array>
     * @returns itemWithKeysRemoved<Crio>
     */
    delete(...keys: Array) : CrioMap {
        if (keys.length === 0) {
            return createNewCrio();
        }

        let newValue: Object = this.thaw();

        forEach(keys, (key) => {
            delete newValue[key];
        });

        return getCrioInstance(this, createNewCrio(newValue));
    }

    /**
     * Executes for-in loop over values stored in this.object
     *
     * @param fn<Function>
     * @param thisArg<Object[optional]>
     */
    forIn(fn: Function, thisArg: ?Object) {
        forIn(this.thaw(), fn, thisArg);

        return this;
    }

    /**
     * Executes loop over own properties (including non-enumerables) to get values stored in this.object
     *
     * @param fn<Function>
     * @param thisArg<Object[optional]>
     */
    forOwn(fn: Function, thisArg: ?Object) {
        forOwn(this.thaw(), fn, thisArg);

        return this;
    }

    /**
     * Alias for Object.prototype.hasOwnProperty
     *
     * @param prop<any>
     * @returns {boolean}
     */
    hasOwnProperty(prop: any) : boolean {
        return this.object.hasOwnProperty(prop);
    }

    /**
     * Alias for Object.prototype.isPrototypeOf
     *
     * @param obj<any>
     * @returns {boolean}
     */
    isPrototypeOf(obj: Object) : boolean {
        return this.object.isPrototypeOf(obj);
    }

    /**
     * Alias for Object.prototype.propertyIsEnumerable
     *
     * @param prop<any>
     * @returns {boolean}
     */
    propertyIsEnumerable(prop: any) : boolean {
        return this.object.propertyIsEnumerable(prop);
    }

    /**
     * Alias of Object.prototype.valueOf
     *
     * @returns {string}
     */
    valueOf() {
        return this.object.valueOf();
    }
}

export default CrioMap;