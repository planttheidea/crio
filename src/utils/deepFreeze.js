

// local imports
import {
    createNewCrio
} from './createNewCrio';

// local partial imports
import {
    isDate
} from './checkers';

import {
    isConvertibleToCrio
} from './crioCheckers';

import {
    cloneObject
} from './crioFunctions';

import {
    forEach
} from './functions';

const deepFreeze = (obj: any) : any => {
    let clonedObj = cloneObject(obj);

    if (isDate(obj)) {
        return Object.freeze(obj);
    }

    const propNames: Array = Object.getOwnPropertyNames(obj);

    forEach(propNames, (name) => {
        let value: any = clonedObj[name];

        if (isConvertibleToCrio(value)) {
            clonedObj[name] = createNewCrio(value);
        }
    });

    return Object.freeze(clonedObj);
};

export default deepFreeze;