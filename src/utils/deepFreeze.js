

// local imports
import {
    createNewCrio
} from './createNewCrio';

// local partial imports
import {
    isConvertibleToCrio
} from './checkers';

import {
    forEach
} from './functions';

const deepFreeze = (obj: any) : any => {
    const propNames: Array = Object.getOwnPropertyNames(obj);

    forEach(propNames, (name) => {
        let value: any = obj[name];

        if (isConvertibleToCrio(value)) {
            obj[name] = createNewCrio(value);
        }
    });

    return Object.freeze(obj);
};

export default deepFreeze;