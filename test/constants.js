// test
import test from 'ava';
import sinon from 'sinon';

// src
import * as constants from 'src/constants';
import * as utils from 'src/utils';

test('if every will call the every in utils with the object it is assigned to', (t) => {
  const object = {};

  object.every = constants.ARRAY_FALLBACK_PROTOTYPE_METHODS.every;

  const fn = () => {};

  const stub = sinon.stub(utils, 'every').returnsArg(0);

  const result = object.every(fn);

  t.true(stub.calledOnce);
  t.true(stub.calledWith(object, fn));

  stub.restore();

  t.is(result, object);
});

test('if find will call the find in utils with the object it is assigned to', (t) => {
  const object = {};

  object.find = constants.ARRAY_FALLBACK_PROTOTYPE_METHODS.find;

  const fn = () => {};

  const stub = sinon.stub(utils, 'find').returnsArg(0);

  const result = object.find(fn);

  t.true(stub.calledOnce);
  t.true(stub.calledWith(object, fn));

  stub.restore();

  t.is(result, object);
});

test('if findIndex will call the findIndex in utils with the object it is assigned to', (t) => {
  const object = {};

  object.findIndex = constants.ARRAY_FALLBACK_PROTOTYPE_METHODS.findIndex;

  const fn = () => {};

  const stub = sinon.stub(utils, 'find').returnsArg(0);

  const result = object.findIndex(fn);

  t.true(stub.calledOnce);
  t.true(stub.calledWith(object, fn, true));

  stub.restore();

  t.is(result, object);
});

test('if includes called indexOf on the object and returns true or false on the value returned', (t) => {
  const object = {
    indexOf: sinon
      .stub()
      .onFirstCall()
      .returns(-1)
      .onSecondCall()
      .returns(1),
  };

  object.includes = constants.ARRAY_FALLBACK_PROTOTYPE_METHODS.includes;

  const item = {};

  const falseResult = object.includes(item);

  t.true(object.indexOf.calledOnce);
  t.true(object.indexOf.calledWith(item));

  t.false(falseResult);

  object.indexOf.reset();

  const trueResult = object.includes(item);

  t.true(object.indexOf.calledOnce);
  t.true(object.indexOf.calledWith(item));

  t.true(trueResult);
});

test('if some will call the some in utils with the object it is assigned to', (t) => {
  const object = {};

  object.some = constants.ARRAY_FALLBACK_PROTOTYPE_METHODS.some;

  const fn = () => {};

  const stub = sinon.stub(utils, 'some').returnsArg(0);

  const result = object.some(fn);

  t.true(stub.calledOnce);
  t.true(stub.calledWith(object, fn));

  stub.restore();

  t.is(result, object);
});
