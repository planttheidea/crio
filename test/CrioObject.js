// test
import test from 'ava';
import sinon from 'sinon';

// src
import CrioObject from 'src/CrioObject';
import CrioArray from 'src/CrioArray';

const isNewObject = (t, existing, result) => {
  t.true(result instanceof CrioObject);
  t.not(result, existing);
};

test('if the constructor will handle a CrioObject passed', (t) => {
  const existing = new CrioObject({foo: 'bar'});

  const result = new CrioObject(existing);

  t.is(result, existing);
});

test('if the constructor will handle a CrioArray passed', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const result = new CrioObject(existing);

  t.deepEqual(result, existing.toObject());
});

test('if clear will return an empty object', (t) => {
  const existing = new CrioObject({foo: 'bar'});

  const result = existing.clear();

  isNewObject(t, existing, result);
  t.deepEqual(result, new CrioObject({}));
});

test('if compact will return an object with only the truthy values', (t) => {
  const existing = new CrioObject({
    bar: null,
    baz: 0,
    foo: 'bar',
    quz: 'blah',
  });

  const result = existing.compact();

  isNewObject(t, existing, result);
  t.deepEqual(
    result,
    new CrioObject({
      foo: 'bar',
      quz: 'blah',
    })
  );
});

test('if delete will remove the value for the key shallowly', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const result = existing.delete('foo');

  isNewObject(t, existing, result);
  t.deepEqual(result, new CrioObject({bar: 'baz'}));
});

test('if delete will remove the value for the key deeply', (t) => {
  const existing = new CrioObject({
    bar: [
      {
        baz: 'quz',
      },
    ],
    foo: 'bar',
  });

  const result = existing.delete('bar[0].baz');

  isNewObject(t, existing, result);
  t.deepEqual(
    result,
    new CrioObject({
      bar: [{}],
      foo: 'bar',
    })
  );
});

test('if entries will get the [key, value] pairs in the array', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const result = existing.entries();

  t.true(result instanceof CrioArray);
  t.not(result, existing);
  t.deepEqual(result, new CrioArray([['bar', 'baz'], ['foo', 'bar']]));
});

test('if equals checks for value equality of objects', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const match = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });
  const noMatch = new CrioObject({
    bar: 'baz',
    baz: 'quz',
  });

  t.true(existing.equals(match));
  t.false(existing === match);
  t.false(existing.equals(noMatch));
});

test('if every returns true when all values match', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const fn = (value) => value.length === 3;

  t.true(existing.every(fn));
});

test('if every returns false when not all values match', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const fn = (value) => value === 'bar';

  t.false(existing.every(fn));
});

test('if every returns true when the object is empty', (t) => {
  const existing = new CrioObject({});

  const fn = (value) => value === 'never run';

  t.true(existing.every(fn));
});

test('if filter returns a new object filtered by the result of the fn', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const fn = (value) => value === 'bar';

  const result = existing.filter(fn);

  isNewObject(t, existing, result);
  t.deepEqual(result, new CrioObject({foo: 'bar'}));
});

test('if find will find the item in the object and return it', (t) => {
  const existing = new CrioObject({
    bar: null,
    baz: {bar: 'baz'},
    foo: {bar: 'baz'},
  });

  const fn = (item) => item && item.bar === 'baz';

  const result = existing.find(fn);

  t.is(result, existing.baz);
});

test('if find will return undefined if it cannot find the item in the object', (t) => {
  const existing = new CrioObject({
    bar: null,
    baz: {bar: 'baz'},
    foo: {bar: 'baz'},
  });

  const fn = (item) => item && item.bar === 'quz';

  const result = existing.find(fn);

  t.is(result, undefined);
});

test('if findKey will find the key in the object and return it', (t) => {
  const existing = new CrioObject({
    bar: null,
    baz: {bar: 'baz'},
    foo: {bar: 'baz'},
  });

  const fn = (item) => item && item.bar === 'baz';

  const result = existing.findKey(fn);

  t.is(result, 'baz');
});

test('if findKey will return undefined if it cannot find the key in the object', (t) => {
  const existing = new CrioObject({
    bar: null,
    baz: {bar: 'baz'},
    foo: {bar: 'baz'},
  });

  const fn = (item) => item && item.bar === 'quz';

  const result = existing.findKey(fn);

  t.is(result, undefined);
});

test('if findLast will find the item in the object and return it', (t) => {
  const existing = new CrioObject({
    bar: null,
    baz: {bar: 'baz'},
    foo: {bar: 'baz'},
  });

  const fn = (item) => item && item.bar === 'baz';

  const result = existing.findLast(fn);

  t.is(result, existing.foo);
});

test('if findLast will return undefined if it cannot find the item in the object', (t) => {
  const existing = new CrioObject({
    bar: null,
    baz: {bar: 'baz'},
    foo: {bar: 'baz'},
  });

  const fn = (item) => item && item.bar === 'quz';

  const result = existing.findLast(fn);

  t.is(result, undefined);
});

test('if findLastKey will find the key in the object and return it', (t) => {
  const existing = new CrioObject({
    bar: null,
    baz: {bar: 'baz'},
    foo: {bar: 'baz'},
  });

  const fn = (item) => item && item.bar === 'baz';

  const result = existing.findLastKey(fn);

  t.is(result, 'foo');
});

test('if findLastKey will return undefined if it cannot find the key in the object', (t) => {
  const existing = new CrioObject({
    bar: null,
    baz: {bar: 'baz'},
    foo: {bar: 'baz'},
  });

  const fn = (item) => item && item.bar === 'quz';

  const result = existing.findLastKey(fn);

  t.is(result, undefined);
});

test('if forEach will iterate over the object calling fn and return the object', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  let count = 0;

  const fn = () => {
    count++;
  };

  const result = existing.forEach(fn);

  t.is(result, existing);
  t.is(count, existing.size);
});

test('if get will get the item at key shallowly', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const result = existing.get('foo');

  t.is(result, existing.foo);
});

test('if get will return undefined if it cannot find the value at key shallowly', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const result = existing.get('baz');

  t.is(result, undefined);
});

test('if get will get the item at key deeply', (t) => {
  const existing = new CrioObject({
    foo: [
      {
        bar: [{baz: 'quz'}],
      },
    ],
  });

  const result = existing.get('foo[0].bar[0].baz');

  t.is(result, existing.foo[0].bar[0].baz);
});

test('if get will return undefined if it cannot find the value at key deeply', (t) => {
  const existing = new CrioObject({
    foo: [
      {
        bar: [{baz: 'quz'}],
      },
    ],
  });

  const result = existing.get('foo[0].bar[0].quz');

  t.is(result, undefined);
});

test('if has will return true if the item exists at key shallowly', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  t.true(existing.has('foo'));
});

test('if has will return false if the item does not exist at key shallowly', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  t.false(existing.has('baz'));
});

test('if has will return true if the item exists at key deeply', (t) => {
  const existing = new CrioObject({
    foo: [
      {
        bar: [{baz: 'quz'}],
      },
    ],
  });

  t.true(existing.has('foo[0].bar[0].baz'));
});

test('if has will return false if the item does not exist at key deeply', (t) => {
  const existing = new CrioObject({
    foo: [
      {
        bar: [{baz: 'quz'}],
      },
    ],
  });

  t.false(existing.has('foo[0].bar[0].quz'));
});

test('if includes returns true if the object contains the value', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  t.true(existing.includes('bar'));
});

test('if includes returns false if the object does not contain the value', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  t.false(existing.includes('quz'));
});

test('if isArray will return false', (t) => {
  const existing = new CrioObject({foo: 'bar'});

  t.false(existing.isArray());
});

test('if isObject will return true', (t) => {
  const existing = new CrioObject({foo: 'bar'});

  t.true(existing.isObject());
});

test('if keyOf will return the key with the given value', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    baz: 'bar',
    foo: 'bar',
  });

  const result = existing.keyOf('bar');

  t.is(result, 'baz');
});

test('if keys will return an array of the object keys', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const result = existing.keys();

  t.deepEqual(result, new CrioArray(['bar', 'foo']));
});

test('if lastKeyOf will return the key with the given value starting from the end and working forward', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    baz: 'bar',
    foo: 'bar',
  });

  const result = existing.lastKeyOf('bar');

  t.is(result, 'foo');
});

test('if map will return a new object mapped with the values', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const result = existing.map((value) => ({
    [value]: [value],
  }));

  isNewObject(t, existing, result);
  t.deepEqual(
    result,
    new CrioObject({
      bar: {baz: ['baz']},
      foo: {bar: ['bar']},
    })
  );
});

test('if merge will merge the objects on the top level', (t) => {
  const existing = new CrioObject({foo: 'bar'});

  const result = existing.merge(null, {bar: 'baz'}, {foo: {bar: 'baz'}});

  isNewObject(t, existing, result);

  t.deepEqual(
    result,
    new CrioObject({
      foo: {bar: 'baz'},
      // eslint-disable-next-line rapid7/sort-object-keys
      bar: 'baz',
    })
  );
});

test('if merge will merge the objects deeply', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: [{bar: {baz: 'quz'}}],
  });

  const result = existing.merge(['foo', 0, 'bar'], {
    baz: 'nope',
    quz: 'blah',
  });

  isNewObject(t, existing, result);
  t.deepEqual(
    result,
    new CrioObject({
      bar: 'baz',
      foo: [
        {
          bar: {
            baz: 'nope',
            quz: 'blah',
          },
        },
      ],
    })
  );
});

test('if mutate will allow mutation of a thawed version of the array and return a crioed version of the result', (t) => {
  const existing = new CrioObject({foo: [{bar: 'baz'}]});

  const object = {
    fn(thawed, original) {
      t.deepEqual(thawed, {foo: [{bar: 'baz'}]});
      t.is(original, existing);

      return thawed.foo.map(({bar}) => ({
        [bar]: bar,
      }));
    },
  };

  const spy = sinon.spy(object, 'fn');

  const result = existing.mutate(object.fn);

  t.true(spy.calledOnce);

  t.true(result instanceof CrioArray);
  t.deepEqual(result, new CrioArray([{baz: 'baz'}]));
});

test('if pluck will return the set of values matching in the collection shallowly', (t) => {
  const existing = new CrioObject({
    first: {foo: 'bar'},
    fourth: {foo: 'foo'},
    second: {bar: 'baz'},
    third: null,
  });

  const result = existing.pluck('foo');

  t.true(result instanceof CrioArray);
  t.deepEqual(result, new CrioArray(['bar', 'foo', undefined, undefined]));
});

test('if pluck will return the set of values matching in the collection deeply', (t) => {
  const existing = new CrioObject({
    first: [{foo: 'foo'}, {bar: 'baz'}, {foo: 'bar'}],
    second: [{foo: 'bar'}, {bar: 'baz'}, null, {foo: 'foo'}],
  });

  const result = existing.pluck(['second', 'foo']);

  t.true(result instanceof CrioArray);
  t.deepEqual(result, new CrioArray(['bar', undefined, undefined, 'foo']));
});

test('if reduce will reduce the values and return the crioed version of the object', (t) => {
  const existing = new CrioObject({
    bar: 2,
    baz: 3,
    foo: 1,
  });

  const result = existing.reduce(
    (sum, amount) => ({
      total: sum.total.concat([amount]),
    }),
    {total: []}
  );

  isNewObject(t, existing, result);
  t.deepEqual(result, new CrioObject({total: [2, 3, 1]}));
});

test('if reduceRight will reduce the values and return the crioed version of the object', (t) => {
  const existing = new CrioObject({
    bar: 2,
    baz: 3,
    foo: 1,
  });

  const result = existing.reduceRight(
    (sum, amount) => ({
      total: sum.total.concat([amount]),
    }),
    {total: []}
  );

  isNewObject(t, existing, result);
  t.deepEqual(result, new CrioObject({total: [1, 3, 2]}));
});

test('if set will set the value at key shallowly', (t) => {
  const existing = new CrioObject({foo: 'bar'});

  const result = existing.set('bar', 'baz');

  isNewObject(t, existing, result);
  t.deepEqual(
    result,
    new CrioObject({
      foo: 'bar',
      // eslint-disable-next-line rapid7/sort-object-keys
      bar: 'baz',
    })
  );
});

test('if set will set the value at key deeply', (t) => {
  const existing = new CrioObject({foo: [{bar: 'baz'}]});

  const result = existing.set('foo[0].bar', 'quz');

  isNewObject(t, existing, result);
  t.deepEqual(result, new CrioObject({foo: [{bar: 'quz'}]}));
});

test('if some returns true when any values match', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const fn = (value) => value === 'bar';

  t.true(existing.some(fn));
});

test('if some returns false when no values match', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const fn = (value) => value.length === 2;

  t.false(existing.some(fn));
});

test('if some returns false when the object is empty', (t) => {
  const existing = new CrioObject({});

  const fn = (value) => value === 'never run';

  t.false(existing.some(fn));
});

test('if sort will sort the object keys (not guaranteed)', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    baz: 'quz',
    foo: 'bar',
  });

  const result = existing.sort();

  isNewObject(t, result, existing);
  t.deepEqual(
    result,
    new CrioObject({
      bar: 'baz',
      baz: 'quz',
      foo: 'bar',
    })
  );
});

test('if toArray will conver the object to an array', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const result = existing.toArray();

  t.true(result instanceof CrioArray);
  t.deepEqual(result, new CrioArray(['baz', 'bar']));
});

test('if toLocaleString will serialize the array', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const result = existing.toLocaleString();

  t.is(result, '{"bar":"baz","foo":"bar"}');
});

test('if toLocaleString will serialize the array with custom arguments', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo() {},
  });

  const serializer = (key, value) => (typeof value === 'function' ? value.toString() : value);

  const result = existing.toLocaleString(
    serializer,
    2
  );

  t.is(
    result,
    `{
  "bar": "baz",
  "foo": "${function foo() {}}"
}`
  );
});

test('if toObject returns the object', (t) => {
  const existing = new CrioObject({foo: 'bar'});

  const result = existing.toObject();

  t.is(result, existing);
});

test('if toString will serialize the array', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const result = existing.toString();

  t.is(result, '{"bar":"baz","foo":"bar"}');
});

test('if toString will serialize the array with custom arguments', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo() {},
  });

  const serializer = (key, value) => (typeof value === 'function' ? value.toString() : value);

  const result = existing.toString(
    serializer,
    2
  );

  t.is(
    result,
    `{
  "bar": "baz",
  "foo": "${function foo() {}}"
}`
  );
});

test('if valueOf returns the object', (t) => {
  const existing = new CrioObject({foo: 'bar'});

  const result = existing.valueOf();

  t.is(result, existing);
});

test('if values returns an array of the object values', (t) => {
  const existing = new CrioObject({
    bar: 'baz',
    foo: 'bar',
  });

  const result = existing.values();

  t.true(result instanceof CrioArray);
  t.deepEqual(result, new CrioArray(['baz', 'bar']));
});

test('if Symbol.species will return the CrioObject constructor', (t) => {
  t.is(CrioObject[Symbol.species], CrioObject);
});
