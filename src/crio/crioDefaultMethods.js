

// local imports
import deepFreeze from '../utils/deepFreeze';

// local partial imports
import {
    getCrioIdentifier
} from './crioIdentifier';

import {
    hashObject
} from '../utils/hash';

import {
    cloneObject
} from '../utils/recursiveObjectModifications';

type Crio = Array|Date|Object;

const CRIO_IDENTIFIER = getCrioIdentifier();

const equals = function(obj: any) : boolean {
    if (obj[CRIO_IDENTIFIER]) {
        return this.hashCode() === obj.hashCode();
    }

    return false;
};

const freeze = function() : Crio {
    return deepFreeze(this);
};

const hashCode = function() : number {
    return hashObject(this);
};

const isFrozen = function() : boolean {
    return Object.isFrozen(this);
};

const thaw = function() : Crio {
    return cloneObject(this);
};

const toJS = function() : Crio {
    return cloneObject(this, false, false);
};

export {equals as equals};
export {freeze as freeze};
export {hashCode as hashCode};
export {isFrozen as isFrozen};
export {thaw as thaw};
export {toJS as toJS};

export default {
    equals,
    freeze,
    hashCode,
    isFrozen,
    thaw,
    toJS
};