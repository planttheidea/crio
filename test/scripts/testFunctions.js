

const cloneDate = (date) => {
    return new Date(date.valueOf());
};

const createTestArray = (size, start = 0, value) => {
    let testArray = [];

    for (let i = start, len = start + size; i < len; i++) {
        testArray.push(value || i);
    }

    return testArray;
};

const createTestDate = (...args) => {
    return new Date(...args);
};

const createTestObject = (size, start = 0, value) => {
    let testMap = {};

    for (let i = start, len = start + size; i < len; i++) {
        testMap[i] = value || i;
    }

    return testMap;
};

const getValidLoopSize = (min, size) => {
    const loopSize = Math.floor(Math.random() * size);

    if (loopSize < min) {
        return getValidLoopSize(min, size);
    }

    return loopSize;
};

export {cloneDate as cloneDate};
export {createTestArray as createTestArray};
export {createTestDate as createTestDate};
export {createTestObject as createTestObject};
export {getValidLoopSize as getValidLoopSize};

export default {
    cloneDate,
    createTestArray,
    createTestDate,
    createTestObject,
    getValidLoopSize
};