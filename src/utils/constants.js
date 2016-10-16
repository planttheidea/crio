const OBJECT = Object;

const OBJECT_CREATE = OBJECT.create;
const OBJECT_ENTRIES = OBJECT.entries;
const OBJECT_KEYS = OBJECT.keys;

const ARRAY_PROTOTYPE = Array.prototype;
const OBJECT_PROTOTYPE = OBJECT.prototype;

const CRIO_CONSTRUCTOR = Symbol('constructor');
const CRIO_HASH_CODE = Symbol('hashcode');
const CRIO_TYPE = Symbol('type');

const CRIO_ARRAY = 'CRIO_ARRAY';
const CRIO_OBJECT = 'CRIO_OBJECT';

const IS_PRODUCTION = !!(process && process.env && process.env.NODE_ENV === 'production');

const REACT_ELEMENT_TYPE = (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) || 0xeac7;

export {ARRAY_PROTOTYPE};
export {OBJECT_PROTOTYPE};

export {CRIO_ARRAY};
export {CRIO_OBJECT};

export {CRIO_CONSTRUCTOR};
export {CRIO_HASH_CODE};
export {CRIO_TYPE};

export {IS_PRODUCTION};

export {OBJECT};
export {OBJECT_CREATE};
export {OBJECT_ENTRIES};
export {OBJECT_KEYS};

export {REACT_ELEMENT_TYPE};
