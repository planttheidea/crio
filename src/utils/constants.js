const ARRAY_PROTOTYPE = Array.prototype;
const OBJECT_PROTOTYPE = Object.prototype;

const CRIO_CONSTRUCTOR = Symbol('constructor');
const CRIO_HASH_CODE = Symbol('hashcode');
const CRIO_TYPE = Symbol('type');

const CRIO_ARRAY = 'CRIO_ARRAY';
const CRIO_OBJECT = 'CRIO_OBJECT';

const REACT_ELEMENT_TYPE = (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) || 0xeac7;

export {ARRAY_PROTOTYPE};
export {OBJECT_PROTOTYPE};

export {CRIO_ARRAY};
export {CRIO_OBJECT};

export {CRIO_CONSTRUCTOR};
export {CRIO_HASH_CODE};
export {CRIO_TYPE};

export {REACT_ELEMENT_TYPE};
