import test from 'ava';

import stringify from '../../src/utils/stringify';

test('if stringify for array works correctly', (t) => {
  const array = ['foo', 'bar'];
  const expectedString =
`[
  "foo",
  "bar"
]`;

  t.is(stringify(array), expectedString);
});

test('if stringify for object works correctly', (t) => {
  const object = {foo: 'bar'};
  const expectedString =
`Object{
  foo: "bar"
}`;

  t.is(stringify(object), expectedString);
});
