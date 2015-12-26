

const createTestArray = (size, start = 0, value) => {
    let testArray = [];

    for (let i = start, len = start + size; i < len; i++) {
        testArray.push(value || i);
    }

    return testArray;
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

export {createTestArray as createTestArray};
export {createTestObject as createTestObject};
export {getValidLoopSize as getValidLoopSize};

export default {
    createTestArray,
    createTestObject,
    getValidLoopSize
};