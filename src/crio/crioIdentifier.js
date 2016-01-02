

import {
    setReadonly
} from '../utils/functions';

const CRIO_IDENTIFIER = '$$crio';

const getCrioIdentifier = () : string => {
    return CRIO_IDENTIFIER;
};

const setCrioIdentifier = (obj: Object, type: Array|Date|Object) : void => {
    setReadonly(obj, CRIO_IDENTIFIER, type);
};

export {getCrioIdentifier as getCrioIdentifier};
export {setCrioIdentifier as setCrioIdentifier};

export default {
    getCrioIdentifier,
    setCrioIdentifier
};