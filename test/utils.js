// test
import test from 'ava';
import React from 'react';
import sinon from 'sinon';

// src
import * as utils from 'src/utils';
import * as is from 'src/is';
import CrioArray from 'src/CrioArray';
import CrioObject from 'src/CrioObject';

test('if createIterator will create an iterator method', (t) => {
  const key = 'foo';
  const value = 'bar';

  const object = {
    [key]: value,
    keys() {
      return [key];
    }
  };

  const iterator = utils.createIterator();

  object.iterator = iterator;

  const iterable = object.iterator();

  t.deepEqual(iterable.next(), {
    done: false,
    value
  });

  t.deepEqual(iterable.next(), {
    done: true
  });
});

test('if every will return true when every result matches', (t) => {
  const key = 'foo';
  const value = 'bar';

  const otherKey = 'bar';
  const otherValue = value;

  const object = {
    [key]: value,
    [otherKey]: otherValue,
    keys() {
      return [key, otherKey];
    }
  };
  const fn = (item) => item === value;

  t.true(utils.every(object, fn));
});

test('if every will return false when not every result matches', (t) => {
  const key = 'foo';
  const value = 'bar';

  const otherKey = 'bar';
  const otherValue = 'baz';

  const object = {
    [key]: value,
    [otherKey]: otherValue,
    keys() {
      return [key, otherKey];
    }
  };
  const fn = (item) => item === value;

  t.false(utils.every(object, fn));
});

test('if every will return true when no keys exist', (t) => {
  const object = {
    keys() {
      return [];
    }
  };
  const fn = (item) => item === 'never run';

  t.true(utils.every(object, fn));
});

test('if find will find the value that exists in the object at key', (t) => {
  const key = 'foo';
  const value = 'bar';

  const otherKey = 'bar';
  const otherValue = value;

  const object = {
    [key]: value,
    [otherKey]: otherValue,
    keys() {
      return [key, otherKey];
    }
  };
  const fn = (item) => item === value;
  const isKey = false;
  const isFromEnd = false;

  const result = utils.find(object, fn, isKey, isFromEnd);

  t.is(result, value);
});

test('if find will return undefined if a match could not be found in the object at key', (t) => {
  const key = 'foo';
  const value = 'bar';

  const otherKey = 'bar';
  const otherValue = value;

  const object = {
    [key]: value,
    [otherKey]: otherValue,
    keys() {
      return [key, otherKey];
    }
  };
  const fn = (item) => item === 'quz';
  const isKey = false;
  const isFromEnd = false;

  const result = utils.find(object, fn, isKey, isFromEnd);

  t.is(result, undefined);
});

test('if find will find the key that exists in the object at key', (t) => {
  const key = 'foo';
  const value = 'bar';

  const otherKey = 'bar';
  const otherValue = value;

  const object = {
    [key]: value,
    [otherKey]: otherValue,
    keys() {
      return [key, otherKey];
    }
  };
  const fn = (item) => item === value;
  const isKey = true;
  const isFromEnd = false;

  const result = utils.find(object, fn, isKey, isFromEnd);

  t.is(result, key);
});

test('if find will return undefined when the key could not be found in the object at key', (t) => {
  const key = 'foo';
  const value = 'bar';

  const otherKey = 'bar';
  const otherValue = value;

  const object = {
    [key]: value,
    [otherKey]: otherValue,
    isArray() {
      return false;
    },
    keys() {
      return [key, otherKey];
    }
  };
  const fn = (item) => item === 'quz';
  const isKey = true;
  const isFromEnd = false;

  const result = utils.find(object, fn, isKey, isFromEnd);

  t.is(result, undefined);
});

test('if find will return undefined when the key could not be found in the array at key', (t) => {
  const key = 'foo';
  const value = 'bar';

  const otherKey = 'bar';
  const otherValue = value;

  const object = {
    [key]: value,
    [otherKey]: otherValue,
    isArray() {
      return true;
    },
    keys() {
      return [key, otherKey];
    }
  };
  const fn = (item) => item === 'quz';
  const isKey = true;
  const isFromEnd = false;

  const result = utils.find(object, fn, isKey, isFromEnd);

  t.is(result, -1);
});

test('if find will find the value that exists in the object at key starting from the end', (t) => {
  const key = 'foo';
  const value = 'bar';

  const otherKey = 'bar';
  const otherValue = value;

  const object = {
    [key]: value,
    [otherKey]: otherValue,
    keys() {
      return [key, otherKey];
    }
  };
  const fn = (item) => item === value;
  const isKey = false;
  const isFromEnd = true;

  const result = utils.find(object, fn, isKey, isFromEnd);

  t.is(result, otherValue);
});

test('if find will find the key that exists in the object at key starting from the end', (t) => {
  const key = 'foo';
  const value = 'bar';

  const otherKey = 'bar';
  const otherValue = value;

  const object = {
    [key]: value,
    [otherKey]: otherValue,
    keys() {
      return [key, otherKey];
    }
  };
  const fn = (item) => item === value;
  const isKey = true;
  const isFromEnd = true;

  const result = utils.find(object, fn, isKey, isFromEnd);

  t.is(result, otherKey);
});

test('if getCrioedObject will return the object if it is falsy', (t) => {
  const object = null;

  const isArraySpy = sinon.spy(is, 'isArray');
  const isObjectSpy = sinon.spy(is, 'isObject');

  const result = utils.getCrioedObject(object);

  t.is(result, object);

  t.true(isArraySpy.notCalled);

  isArraySpy.restore();

  t.true(isObjectSpy.notCalled);

  isObjectSpy.restore();
});

test('if getCrioedObject will return the object if it is not typeof object', (t) => {
  const object = 'foo';

  const isArraySpy = sinon.spy(is, 'isArray');
  const isObjectSpy = sinon.spy(is, 'isObject');

  const result = utils.getCrioedObject(object);

  t.is(result, object);

  t.true(isArraySpy.notCalled);

  isArraySpy.restore();

  t.true(isObjectSpy.notCalled);

  isObjectSpy.restore();
});

test('if getCrioedObject will return the object if it is a CrioArray', (t) => {
  const object = new CrioArray([]);

  const isArraySpy = sinon.spy(is, 'isArray');
  const isObjectSpy = sinon.spy(is, 'isObject');

  const result = utils.getCrioedObject(object);

  t.is(result, object);

  t.true(isArraySpy.calledOnce);
  t.true(isArraySpy.calledWith(object));

  isArraySpy.restore();

  t.true(isObjectSpy.notCalled);

  isObjectSpy.restore();
});

test('if getCrioedObject will return the object if it is a CrioObject', (t) => {
  const object = new CrioObject({});

  const isArraySpy = sinon.spy(is, 'isArray');
  const isObjectSpy = sinon.spy(is, 'isObject');

  const result = utils.getCrioedObject(object);

  t.is(result, object);

  t.true(isArraySpy.calledOnce);
  t.true(isArraySpy.calledWith(object));

  isArraySpy.restore();

  t.true(isObjectSpy.calledOnce);
  t.true(isObjectSpy.calledWith(object));

  isObjectSpy.restore();
});

test('if getCrioedObject will return the object if it is a react element', (t) => {
  const object = <div />;

  const isArraySpy = sinon.spy(is, 'isArray');
  const isObjectSpy = sinon.spy(is, 'isObject');

  const result = utils.getCrioedObject(object);

  t.is(result, object);

  t.true(isArraySpy.calledOnce);
  t.true(isArraySpy.calledWith(object));

  isArraySpy.restore();

  t.true(isObjectSpy.calledOnce);
  t.true(isObjectSpy.calledWith(object));

  isObjectSpy.restore();
});

test('if getCrioedObject will return the CrioArray if it is an array', (t) => {
  const object = ['foo'];

  const isArraySpy = sinon.spy(is, 'isArray');
  const isObjectSpy = sinon.spy(is, 'isObject');

  const result = utils.getCrioedObject(object);

  t.deepEqual(result, new CrioArray(object));

  t.true(isArraySpy.called);
  t.deepEqual(isArraySpy.args[0], [object]);

  isArraySpy.restore();

  t.true(isObjectSpy.notCalled);

  isObjectSpy.restore();
});

test('if getCrioedObject will return the CrioObject if it is an object', (t) => {
  const object = {foo: 'bar'};

  const isArraySpy = sinon.spy(is, 'isArray');
  const isObjectSpy = sinon.spy(is, 'isObject');

  const result = utils.getCrioedObject(object);

  t.deepEqual(result, new CrioObject(object));

  t.true(isArraySpy.called);
  t.deepEqual(isArraySpy.args[0], [object]);

  isArraySpy.restore();

  t.true(isObjectSpy.called);
  t.deepEqual(isObjectSpy.args[0], [object]);

  isObjectSpy.restore();
});

test('if getCrioedObject will return the object if no matches', (t) => {
  const object = /foo/;

  const isArraySpy = sinon.spy(is, 'isArray');
  const isObjectSpy = sinon.spy(is, 'isObject');

  const result = utils.getCrioedObject(object);

  t.is(result, object);

  t.true(isArraySpy.called);
  t.deepEqual(isArraySpy.args[0], [object]);

  isArraySpy.restore();

  t.true(isObjectSpy.called);
  t.deepEqual(isObjectSpy.args[0], [object]);

  isObjectSpy.restore();
});

test('if getEntries will map the keys and values as pairs', (t) => {
  const key = 'foo';
  const value = 'bar';

  const otherKey = 'bar';
  const otherValue = 'baz';

  const object = {
    [key]: value,
    [otherKey]: otherValue,
    keys() {
      return new CrioArray([key, otherKey]);
    }
  };

  const result = utils.getEntries(object);

  t.true(result instanceof CrioArray);
  t.deepEqual(result.thaw(), [[key, value], [otherKey, otherValue]]);
});

test('if getRelativeValue will return the max of the length + value and 0 if less than 0', (t) => {
  const value = -1;
  const length = 2;

  const result = utils.getRelativeValue(value, length);

  t.is(result, length + value);
});

test('if getRelativeValue will return the min of the value and length if greater than 0', (t) => {
  const value = 4;
  const length = 2;

  const result = utils.getRelativeValue(value, length);

  t.is(result, length);
});

test('if getValues will map the values', (t) => {
  const key = 'foo';
  const value = 'bar';

  const otherKey = 'bar';
  const otherValue = 'baz';

  const object = {
    [key]: value,
    [otherKey]: otherValue,
    keys() {
      return new CrioArray([key, otherKey]);
    }
  };

  const result = utils.getValues(object);

  t.true(result instanceof CrioArray);
  t.deepEqual(result.thaw(), [value, otherValue]);
});

test('if some will return true when any result matches', (t) => {
  const key = 'foo';
  const value = 'bar';

  const otherKey = 'bar';
  const otherValue = 'baz';

  const object = {
    [key]: value,
    [otherKey]: otherValue,
    keys() {
      return [key, otherKey];
    }
  };
  const fn = (item) => item === value;

  t.true(utils.some(object, fn));
});

test('if some will return false when no result matches', (t) => {
  const key = 'foo';
  const value = 'bar';

  const otherKey = 'bar';
  const otherValue = 'baz';

  const object = {
    [key]: value,
    [otherKey]: otherValue,
    keys() {
      return [key, otherKey];
    }
  };
  const fn = (item) => item === 'quz';

  t.false(utils.some(object, fn));
});

test('if some will return false when no keys exist', (t) => {
  const object = {
    keys() {
      return [];
    }
  };
  const fn = (item) => item === 'never run';

  t.false(utils.some(object, fn));
});

test('if thaw will return the deeply-uncrioed version of all the objects', (t) => {
  const rawObject = [
    {
      some: [
        {
          deep: 'nesting'
        }
      ]
    }
  ];

  const crio = new CrioArray(rawObject);

  const result = utils.thaw(crio);

  t.not(result instanceof CrioArray);
  t.not(result, rawObject);
  t.deepEqual(result, rawObject);
});
