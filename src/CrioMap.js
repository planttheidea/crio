

// local imports
import {
    isString
} from './utils/checkers';

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
    constructor(obj: Object) {
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

        let newValue: Object = {...this.object};

        forEach(keys, (key) => {
            delete newValue[key];
        });

        return getCrioInstance(this, createNewCrioMap(newValue));
    }

    /**
     * Alias for Object.prototype.hasOwnProperty
     *
     * @param
     * @returns {boolean}prop<any>
     */
    has(prop: any) : boolean {
        if (!isString(prop)) {
            prop = prop.toString();
        }

        return this.object.hasOwnProperty(prop);
    }

    /**
     * Converts CrioMap to a CrioList, where each item is a value from the key:value pairs
     * in the original map
     *
     * @returns {CrioCollection}
     */
    toList() : CrioCollection {
        return this.mutate((mutableObject) => {
            let list = [];

            forIn(mutableObject, (value) => {
                list.push(value);
            });

            return list;
        });
    }
}

export default CrioMap;