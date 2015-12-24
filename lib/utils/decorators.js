"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var staticProperty = function staticProperty(obj, property, value) {
    Object.defineProperty(obj, property, {
        configurable: false,
        enumerable: false,
        value: value,
        writable: false
    });
};

var readonlyProperty = function readonlyProperty(obj, property, value) {
    Object.defineProperty(obj, property, {
        configurable: false,
        enumerable: true,
        value: value,
        writable: false
    });
};

exports.readonlyProperty = readonlyProperty;
exports.staticProperty = staticProperty;
exports.default = {
    readonlyProperty: readonlyProperty,
    staticProperty: staticProperty
};