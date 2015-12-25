

// local imports
import {
    createNewCrioMap
} from './utils/createNewCrio';
import CrioCollection from './CrioCollection';

// local partial imports
import {
    getCrioInstance
} from './utils/crioFunctions';

import {
    forEach,
    forIn
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
            return createNewCrioMap();
        }

        let newValue: Object = this.thaw();

        forEach(keys, (key) => {
            delete newValue[key];
        });

        return getCrioInstance(this, createNewCrioMap(newValue));
    }

    /**
     * Executes for-in loop over values stored in this.object
     *
     * @param fn<Function>
     * @param thisArg<Object[optional]>
     * @returns {CrioMap}
     */
    forEach(fn: Function, thisArg: ?Object) {
        forIn(this.thaw(), fn, thisArg);

        return this;
    }

    /**
     * Alias for Object.prototype.hasOwnProperty
     *
     * @param prop<any>
     * @returns {boolean}
     */
    has(prop: any) : boolean {
        return this.object.hasOwnProperty(prop);
    }
}

export default CrioMap;