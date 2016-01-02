

// local imports
import deepFreeze from '../utils/deepFreeze';
import setPrototypeOf from '../utils/setPrototypeOf';

type ArrayOrObject = Array|Object;

const coalesceCrio = (obj: ArrayOrObject, newObj: ArrayOrObject,
         prototype: Object = {}, applyPrototype: boolean = true) : ArrayOrObject => {

    if (applyPrototype) {
        setPrototypeOf(newObj, prototype);
    }

    if (obj.equals(newObj)) {
        return obj;
    }

    return obj.isFrozen() ? deepFreeze(newObj, false) : newObj;
};

export default coalesceCrio;