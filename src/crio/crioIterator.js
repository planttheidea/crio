

// polyfills
import es6Array from 'core-js/es6/array';

// local partial imports
import {
    isArray
} from '../utils/checkers';

type ArrayOrObject = Array|Object;

const iteratorFunction = function() {
    const self = this;
    const isObjArray = isArray(this);
    const keys: Array = Object.getOwnPropertyNames(this);
    const length: number = isObjArray ? this.length : keys.length;

    let index: number = 0;

    return {
        next() {
            const key = isObjArray ? index : keys[index];
            const value = isObjArray ? self[index] : self[keys[index]];

            let returnValue: Object = {};

            if (index === length) {
                returnValue = {
                    done: true
                };
            } else {
                returnValue = {
                    done: false,
                    value: {
                        key,
                        value
                    }
                };
            }

            index++;

            return returnValue;
        }
    };
};

const createIterator = (obj: ArrayOrObject) : ArrayOrObject => {
    const symbolIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : es6Array.iterator;

    obj[symbolIterator] = iteratorFunction;

    return obj;
};

export {createIterator as createIterator};
export {iteratorFunction as iteratorFunction};

export default {
    createIterator,
    iteratorFunction
};