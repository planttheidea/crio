

// external dependencies
import deepFreeze from 'deep-freeze-strict';

// local partial imports
import {
    cloneObject
} from './recursiveObjectModifications';

const deepFreezeWithClone = (object: any, shouldClone: boolean = false) : any => {
    if (object) {
        return shouldClone ? cloneObject(object, true) : deepFreeze(object);
    }

    return object;
};

export default deepFreezeWithClone;