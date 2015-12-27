

// local imports
import {
    createNewCrioList
} from './utils/createNewCrio';
import CrioCollection from './CrioCollection';

// local partial imports
import {
    isArray,
    isNumber,
    isValueless
} from './utils/checkers';

import {
    isConvertibleToCrio,
    isCrio
} from './utils/crioCheckers';

import {
    coalesceCrioValue,
    getCrioInstance
} from './utils/crioFunctions';

import {
    forEach,
    forEachRight,
    splice
} from './utils/functions';

/**
 * Accepts sources of various types and converts them to an array of arrays
 *
 * @param sources<Array>
 * @returns {Array}
 */
const getCleanSources = (sources: Array) : Array => {
    let cleanSources: Array = [];

    forEach(sources, (source) => {
        if (!isArray(source)) {
            const cleanSource = isCrio(source) ? source.thaw() : source;

            cleanSources.push(isArray(cleanSource) ? cleanSource : [cleanSource]);
        } else {
            cleanSources.push(source);
        }
    });

    return cleanSources;
};

class CrioList extends CrioCollection {
    constructor(obj: Array) {
        // this converts array-like objects to actual arrays
        super(obj);
    }

    /**
     * Returns new array of object concatentation with sources
     *
     * @param sources<Array>
     * @returns {CrioList}
     */
    concat(...sources: Array) : CrioList {
        const arrays: Array = getCleanSources(sources);

        return getCrioInstance(this, createNewCrioList(this.object.concat(...arrays)));
    }

    /**
     * Returns true if every item in the array finds a match based on the return from the callback
     *
     * @param callback<Function>
     * @returns {boolean}
     */
    every(callback: Function) : boolean {
        return this.object.every(callback);
    }

    /**
     * Returns new CrioList with items at indices starting at start and prior to end replaced with fillValue
     *
     * @param fillValue
     * @param start
     * @param end
     * @returns {CrioCollection}
     */
    fill(fillValue: any, start: number = 0, end: number = this.size) : CrioList {
        let filledArray: Array = [];

        forEach(this.object, (value, index) => {
            filledArray[index] = index >= start && index < end ? fillValue : value;
        });

        return getCrioInstance(this, createNewCrioList(filledArray));
    }

    /**
     * Executes standard filter function (as filter returns new array)
     *
     * @param callback<Function>
     * @param args<Array>
     * @returns filteredArray<CrioList>
     */
    filter(callback: Function, ...args: Array) : CrioList {
        const values: Array = this.object.filter(callback, ...args);

        return getCrioInstance(this, createNewCrioList(values));
    }

    /**
     * Finds first item in array that returns a value, and returns a new Crio of it
     *
     * @param callback<Function>
     * @param thisArg<Object[optional]>
     * @returns {any}
     */
    find(callback: Function, thisArg: ?Object) : any {
        let match: any;

        forEach(this.object, (value, index, arr) => {
            if (callback.call(thisArg, value, index, arr)) {
                match = isConvertibleToCrio(value) ?
                    getCrioInstance(this, createNewCrioList(value)) :
                    value;

                return false;
            }
        });

        return match;
    }

    /**
     * Finds first item in array that returns a value, and returns index of it in array
     *
     * @param callback<Function>
     * @param thisArg<Object[optional]>
     * @returns {number}
     */
    findIndex(callback: Function, thisArg: ?Object) : number {
        let matchIndex: number = -1;

        forEach(this.object, (value, index, arr) => {
            if (callback.call(thisArg, value, index, arr)) {
                matchIndex = index;
                return false;
            }
        });

        return matchIndex;
    }

    /**
     * Returns mutable first item in the object
     *
     * @returns {CrioCollection}
     */
    first() : any {
        const firstObject: any = this.object[0];

        if (isArray(firstObject)) {
            return getCrioInstance(this, createNewCrioList(firstObject));
        }

        return firstObject;
    }

    /**
     * Convenience function for checking if array includes value or not
     *
     * @param value
     * @returns includesMatch<Boolean>
     */
    includes(value: any) : boolean {
        return this.indexOf(value) !== -1;
    }

    /**
     * Returns index of first matching element in this.object
     *
     * @param value<Any>
     * @returns indexOfMatch<Number>
     */
    indexOf(value: any) : number {
        if (isValueless(value)) {
            return -1;
        }

        return this.object.indexOf(value);
    }

    /**
     * Joins array values into string separated by joiner
     *
     * @param joiner<String>
     * @returns joinedArray<String>
     */
    join(joiner: string = ',') : string {
        return this.object.join(joiner);
    }

    /**
     * Returns mutable last item in the CrioList
     *
     * @returns {*}
     */
    last() : any {
        const lastObject: any = this.object[this.object.length - 1];

        if (isArray(lastObject)) {
            return getCrioInstance(this, createNewCrioList(lastObject));
        }

        return lastObject;
    }

    /**
     * Same as .indexOf(), except returns last item in array that matches instead of first
     *
     * @param value<Any>
     * @returns lastIndexMatch<Number>
     */
    lastIndexOf(value: any) : number {
        if (isValueless(value)) {
            return -1;
        }

        return this.object.lastIndexOf(value);
    }

    /**
     * Executes standard map function (as map returns new array)
     *
     * @param callback<Function>
     * @param thisArg<Object[optional]>
     * @returns mappedArray<CrioList>
     */
    map(callback: Function, thisArg: ?Object) : CrioList {
        const values: Array = this.object.map(callback, thisArg);

        if (!isArray(values)) {
            throw new Error('You cannot change the type of object when mapping. If you want to do this, ' +
                'you can use the .mutate() method.');
        }

        return getCrioInstance(this, createNewCrioList(values));
    }

    /**
     * Alias function for pop
     *
     * @returns lastItemInArray<Any>
     */
    pop() : any {
        return this.splice(this.size - 1);
    }

    /**
     * Adds values passed to array at the back, after the existing items
     *
     * @param values<Array>
     * @returns {Crio}
     */
    push(...values: Array) : CrioList {
        let newValues: Array = [...this.object].concat(...values);

        return createNewCrioList(newValues);
    }

    /**
     * Based on action in callback, each item in array executes function to somehow modify
     * initialValue. If the resulting reduction is an array or an object, then return a new
     * Crio, otherwise return the reduction.
     *
     * @param callback<Function>
     * @param initialValue<any>
     * @returns {any}
     */
    reduce(callback: Function, initialValue: ?any = 0) : any {
        const reducedValue: any = this.object.reduce(callback, initialValue);

        return coalesceCrioValue(this, reducedValue);
    }

    /**
     * Identical to .reduce(), but performs action on the array from right to left.
     *
     * @param callback<Function>
     * @param initialValue<any>
     * @returns {any}
     */
    reduceRight(callback: Function, initialValue: ?any = 0) : any {
        return this.reverse().reduce(callback, initialValue);
    }

    /**
     * Reverses the order of the array in this.object and returns new Crio
     *
     * @returns reversedArray<CrioList>
     */
    reverse() : CrioList {
        const reversedArray: Array = [];

        forEachRight(this.object, (value) => {
            reversedArray.push(value);
        });

        return getCrioInstance(this, createNewCrioList(reversedArray));
    }

    /**
     * ALias for shift function
     *
     * @returns firstItemInArray<Any>
     */
    shift() : any{
        return this.splice(0);
    }

    /**
     * Returns an array of items that is a window of original array, from passed begin to passed end.
     * If no end is passed, then window is from begin to end of the original array.
     *
     * @param begin<Number>
     * @param end<Number[optional]>
     * @returns {CrioList}
     */
    slice(begin: ?number, end: ?number) : CrioList {
        if (isValueless(begin)) {
            return this;
        }

        const slicedArray: Array = [...this.object].slice(begin, end);

        return getCrioInstance(this, createNewCrioList(slicedArray));
    }

    /**
     * Returns true if any items in the array are a match, based on the return in the callback
     *
     * @param callback<Function>
     * @returns {boolean}
     */
    some(callback: Function) : boolean {
        return this.object.some(callback);
    }

    /**
     * Applies sort to object, and returns new CrioList with sorted objects
     *
     * @param fn<Function[optional]>
     * @returns {Crio}
     *
     * @todo Modify this so that it doesn't require thawing (for use with native sort it's necessary)
     */
    sort(fn: ?Function) : CrioList {
        const sortedObject = this.thaw().sort(fn);

        return getCrioInstance(this, createNewCrioList(sortedObject));
    }

    /**
     * Returns a new CrioList with an object including all values except that
     * of the key(s) passed.
     *
     * @param index<Number>
     * @param removeNum<Number>
     * @param itemsToAdd<Array>
     * @returns itemWithKeysRemoved<Crio>
     */
    splice(index: number, removeNum: number = 1, ...itemsToAdd: Array) : CrioList {
        if (!isNumber(index)) {
            return this;
        }

        return getCrioInstance(this, createNewCrioList(splice(this.object, index, removeNum, ...itemsToAdd)));
    }

    /**
     * Converts CrioList into CrioMap
     *
     * @returns {any}
     */
    toMap() : CrioCollection {
        return this.mutate((mutableList) => {
            let map: Object = {};

            forEach(mutableList, (value, index) => {
                map[index] = value;
            });

            return map;
        });
    }

    /**
     * Returns a unique list of all arrays passed concatenated with the original this.object
     *
     * @param sources<Array>
     * @returns {CrioList}
     */
    union(...sources: Array) : CrioList {
        const arrays: Array = getCleanSources(sources);

        return getCrioInstance(this, this.concat(...arrays).unique());
    }

    /**
     * Returns CrioList with only unique items in original CrioList
     *
     * @returns {CrioList}
     */
    unique() : CrioList {
        let uniqueList: Array = [];

        this.forEach((value) => {
            if (uniqueList.indexOf(value) === -1) {
                uniqueList.push(value);
            }
        });

        return getCrioInstance(this, createNewCrioList(uniqueList));
    }

    /**
     * Adds values passed to array at the front, before the existing items
     *
     * @param values<Array>
     * @returns {Crio}
     */
    unshift(...values: Array) : CrioList {
        let newValues: Array = [...values.reverse()].concat(...this.object);

        return createNewCrioList(newValues);
    }
}

export default CrioList;