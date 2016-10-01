import test from 'ava';

import crio from '../src';

import {
  CrioArray,
  CrioObject
} from '../src/classes';

const VALUES_NOT_CRIO = [
  true,
  1,
  'foo',
  null
];

test('if crio passed nothing returns an empty CrioObject', (t) => {
  const object = crio();

  t.true(object instanceof CrioObject);
});

test('if crio passed an array returns a CrioArray', (t) => {
  const object = crio([]);

  t.true(object instanceof CrioArray);
});

test('if crio passed an object returns a CrioObject', (t) => {
  const object = crio({});

  t.true(object instanceof CrioObject);
});

test('if crio passed a value that is not an array or object returns a itself', (t) => {
  VALUES_NOT_CRIO.forEach((value) => {
    t.is(crio(value), value);
  });
});

test('if crio passed a crio returns itself', (t) => {
  const object = crio({});

  t.is(crio(object), object);
});

test('if crio.array returns a CrioArray', (t) => {
  const array = crio.array();

  t.true(array instanceof CrioArray);
});

test('if crio.object returns a CrioObject', (t) => {
  const object = crio.object();

  t.true(object instanceof CrioObject);
});
