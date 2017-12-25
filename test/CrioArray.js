// test
import test from 'ava';
import sinon from 'sinon';

// src
import CrioArray from 'src/CrioArray';
import CrioObject from 'src/CrioObject';

const isNewArray = (t, existing, result) => {
  t.true(result instanceof CrioArray);
  t.not(result, existing);
};

test('if the constructor will handle a CrioArray passed', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const result = new CrioArray(existing);

  t.is(result, existing);
});

test('if the constructor will handle a CrioObject passed', (t) => {
  const existing = new CrioObject({foo: 'bar', bar: 'baz'});

  const result = new CrioArray(existing);

  t.deepEqual(result, existing.toArray());
});

test('if clear will return an empty crio array', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const result = existing.clear();

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray([]));
});

test('if compact will return a filtered crio array to only truth values', (t) => {
  const existing = new CrioArray(['foo', '', null, undefined, 0]);

  const result = existing.compact();

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray(['foo']));
});

test('if copyWithin will return a new array with the values copied', (t) => {
  const existing = new CrioArray(['foo', 'bar', 'baz']);

  const result = existing.copyWithin(2, 0);

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray(['foo', 'bar', 'foo']));
});

test('if concat will return a new concatted array', (t) => {
  const existing = new CrioArray(['foo']);

  const result = existing.concat(['bar']);

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray(['foo', 'bar']));
});

test('if delete will return a new crio array with the value deleted shallowly', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const result = existing.delete(0);

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray(['bar']));
});

test('if delete will return a new crio array with the value deleted deeply', (t) => {
  const existing = new CrioArray([
    {
      deeply: {
        nested: ['value', 'otherValue']
      }
    },
    'bar'
  ]);

  const result = existing.delete([0, 'deeply', 'nested', 0]);

  isNewArray(t, existing, result);

  t.deepEqual(
    result,
    new CrioArray([
      {
        deeply: {
          nested: ['otherValue']
        }
      },
      'bar'
    ])
  );
});

test('if difference will get items that only exist in the first array', (t) => {
  const existing = new CrioArray(['foo', 1, true]);

  const result = existing.difference(['foo'], new CrioArray([true]));

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray([1]));
});

test('if difference will return the array when no values are passed', (t) => {
  const existing = new CrioArray(['foo', 1, true]);

  const result = existing.difference();

  t.is(result, existing);
});

test('if entries will get the [key, value] pairs in the array', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const result = existing.entries();

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray([[0, 'foo'], [1, 'bar']]));
});

test('if equals checks for value equality of objects', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const match = new CrioArray(['foo', 'bar']);
  const noMatch = new CrioArray(['bar', 'baz']);

  t.true(existing.equals(match));
  t.false(existing === match);
  t.false(existing.equals(noMatch));
});

test('if fill will creat a new array with the filled values', (t) => {
  const existing = new CrioArray(['foo', 'bar', 'baz']);

  const result = existing.fill('same');

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray(['same', 'same', 'same']));
});

test('if filter will return a new filtered array', (t) => {
  const existing = new CrioArray(['foo', {bar: 'baz'}]);

  const fn = ({bar}) => {
    return bar === 'baz';
  };

  const result = existing.filter(fn);

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray([{bar: 'baz'}]));
});

test('if findLast will find the last item in the array that matches the function', (t) => {
  const existing = new CrioArray([{foo: 'bar'}, null, {foo: 'bar'}]);

  const fn = ({foo} = {}) => {
    return foo === 'bar';
  };
  const fromIndex = undefined;

  const result = existing.findLast(fn, fromIndex);

  t.is(result, existing[2]);
});

test('if findLastIndex will find the last index in the array that matches the function', (t) => {
  const existing = new CrioArray([{foo: 'bar'}, null, {foo: 'bar'}]);

  const fn = ({foo} = {}) => {
    return foo === 'bar';
  };
  const fromIndex = undefined;

  const result = existing.findLastIndex(fn, fromIndex);

  t.is(result, 2);
});

test('if first will return an array of the first item if no size is specified', (t) => {
  const existing = new CrioArray(['foo', 'bar', 'baz']);

  const result = existing.first();

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray(['foo']));
});

test('if first will return an array of the first n items if size is specified', (t) => {
  const existing = new CrioArray(['foo', 'bar', 'baz']);

  const result = existing.first(2);

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray(['foo', 'bar']));
});

test('if forEach will iterate over the method and return the original array', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  let count = 0;

  const fn = () => {
    count++;
  };

  const result = existing.forEach(fn);

  t.is(count, existing.length);
  t.is(result, existing);
});

test('if get will get the item from the top-level', (t) => {
  const existing = new CrioArray(['foo', {bar: 'baz'}]);

  const result = existing.get(1);

  t.is(result, existing[1]);
});

test('if get will get the item that is deeply-nested', (t) => {
  const existing = new CrioArray(['foo', {bar: 'baz'}]);

  const result = existing.get([1, 'bar']);

  t.is(result, existing[1].bar);
});

test('if has will return true when the item from the top-level exists', (t) => {
  const existing = new CrioArray(['foo', {bar: 'baz'}]);

  t.true(existing.has(1));
});

test('if has will return false when the item from the top-level does not exist', (t) => {
  const existing = new CrioArray(['foo', {bar: 'baz'}]);

  t.false(existing.has(2));
});

test('if has will return true when the item that is deeply-nested exists', (t) => {
  const existing = new CrioArray(['foo', {bar: 'baz'}]);

  t.true(existing.has([1, 'bar']));
});

test('if has will return false when the item that is deeply-nested does not exist', (t) => {
  const existing = new CrioArray(['foo', {bar: 'baz'}]);

  t.false(existing.has([1, 'baz']));
});

test('if intersection will find the items that exist in all arrays', (t) => {
  const existing = new CrioArray(['foo', 1, true]);

  const result = existing.intersection(['foo', 1], new CrioArray([1]));

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray([1]));
});

test('if intersection will return an empty array if no items exist in all arrays', (t) => {
  const existing = new CrioArray(['foo', 1, true]);

  const result = existing.intersection(['foo'], new CrioArray([true]));

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray([]));
});

test('if intersection will return the array when no values are passed', (t) => {
  const existing = new CrioArray(['foo', 1, true]);

  const result = existing.intersection();

  t.is(result, existing);
});

test('if isArray will return true', (t) => {
  const existing = new CrioArray(['foo']);

  t.true(existing.isArray());
});

test('if isObject will return false', (t) => {
  const existing = new CrioArray(['foo']);

  t.false(existing.isObject());
});

test('if join will thaw the array before applying the separator', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const result = existing.join();

  t.is(result, 'foo,bar');
});

test('if keys will produce a new array with the keys of the array', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const result = existing.keys();

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray([0, 1]));
});

test('if last will get the last item in the array when no size is specified', (t) => {
  const existing = new CrioArray(['foo', true, {bar: 'baz'}]);

  const result = existing.last();

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray([{bar: 'baz'}]));
});

test('if last will get the last n items in the array when size is specified', (t) => {
  const existing = new CrioArray(['foo', true, {bar: 'baz'}]);

  const result = existing.last(2);

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray([true, {bar: 'baz'}]));
});

test('if map will return a new deeply-crioed map of items', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const fn = (item) => {
    return {
      [item]: [item]
    };
  };

  const result = existing.map(fn);

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray([{foo: ['foo']}, {bar: ['bar']}]));
});

test('if merge will merge the objects on the top level', (t) => {
  const existing = new CrioArray(['foo']);

  const result = existing.merge(null, [{bar: 'baz'}], ['quz']);

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray(['foo', {bar: 'baz'}, 'quz']));
});

test('if merge will merge the objects deeply', (t) => {
  const existing = new CrioArray([{foo: {bar: 'baz'}}]);

  const result = existing.merge([0, 'foo'], {baz: 'quz'});

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray([{foo: {bar: 'baz', baz: 'quz'}}]));
});

test('if mutate will allow mutation of a thawed version of the array and return a new crioed version of the result', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const object = {
    fn(thawed, original) {
      t.deepEqual(thawed, ['foo', 'bar']);
      t.is(original, existing);

      thawed.sort();

      return thawed;
    }
  };

  const spy = sinon.spy(object, 'fn');

  const result = existing.mutate(object.fn);

  t.true(spy.calledOnce);

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray(['bar', 'foo']));
});

test('if pluck will return the set of values matching in the collection shallowly', (t) => {
  const existing = new CrioArray([
    {foo: 'bar'},
    {bar: 'baz'},
    null,
    {foo: 'foo'}
  ]);

  const result = existing.pluck('foo');

  isNewArray(t, existing, result);
  t.deepEqual(result, new CrioArray(['bar', undefined, undefined, 'foo']));
});

test('if pluck will return the set of values matching in the collection deeply', (t) => {
  const existing = new CrioArray([
    [{foo: 'foo'}, {bar: 'baz'}, {foo: 'bar'}],
    [{foo: 'bar'}, {bar: 'baz'}, null, {foo: 'foo'}]
  ]);

  const result = existing.pluck([1, 'foo']);

  isNewArray(t, existing, result);
  t.deepEqual(result, new CrioArray(['bar', undefined, undefined, 'foo']));
});

test('if pop will remove the last item from the array', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const result = existing.pop();

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray(['foo']));
});

test('if push will add the items to the array', (t) => {
  const existing = new CrioArray(['foo']);

  const result = existing.push('bar', 'baz');

  isNewArray(t, existing, result);

  t.deepEqual(result, new CrioArray(['foo', 'bar', 'baz']));
});

test('if push will return the original array if no items are passed', (t) => {
  const existing = new CrioArray(['foo']);

  const result = existing.push();

  t.is(result, existing);
});

test('if reduce will reduce the values and return the crioed version of the object', (t) => {
  const existing = new CrioArray([1, 2, 3]);

  const result = existing.reduce((sum, amount) => {
    return sum.concat([amount]);
  }, []);

  isNewArray(t, existing, result);
  t.deepEqual(result, new CrioArray([1, 2, 3]));
});

test('if reduceRight will reduce the values and return the crioed version of the object', (t) => {
  const existing = new CrioArray([1, 2, 3]);

  const result = existing.reduceRight((sum, amount) => {
    return sum.concat([amount]);
  }, []);

  isNewArray(t, existing, result);
  t.deepEqual(result, new CrioArray([3, 2, 1]));
});

test('if reverse will reverse the order of items in the array', (t) => {
  const existing = new CrioArray(['foo', 'bar', 'baz']);

  const result = existing.reverse();

  isNewArray(t, existing, result);
  t.deepEqual(result, new CrioArray(['baz', 'bar', 'foo']));
});

test('if set will set the value on the top level', (t) => {
  const existing = new CrioArray(['foo']);

  const result = existing.set(0, 'bar');

  isNewArray(t, existing, result);
  t.deepEqual(result, new CrioArray(['bar']));
});

test('if set will set the value deeply', (t) => {
  const existing = new CrioArray(['foo', {bar: 'baz'}]);

  const result = existing.set([1, 'bar'], 'quz');

  isNewArray(t, existing, result);
  t.deepEqual(result, new CrioArray(['foo', {bar: 'quz'}]));
});

test('if shift will return the array minus the first item', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const result = existing.shift();

  isNewArray(t, existing, result);
  t.deepEqual(result, new CrioArray(['bar']));
});

test('if sort will return a new sorted array', (t) => {
  const existing = new CrioArray(['foo', 'bar', 'baz']);

  const result = existing.sort();

  isNewArray(t, existing, result);
  t.deepEqual(result, new CrioArray(['bar', 'baz', 'foo']));
});

test('if splice will return a new array with the item removed', (t) => {
  const existing = new CrioArray(['foo', 'bar', 'baz']);

  const result = existing.splice(1, 1);

  isNewArray(t, existing, result);
  t.deepEqual(result, new CrioArray(['foo', 'baz']));
});

test('if thaw will return the plain JS version of the array', (t) => {
  const existing = new CrioArray(['foo', ['bar', {baz: 'quz'}]]);

  const result = existing.thaw();

  t.not(result instanceof CrioArray);
  t.not(result, existing);
  t.deepEqual(result, ['foo', ['bar', {baz: 'quz'}]]);
});

test('if toArray returns the array', (t) => {
  const existing = new CrioArray(['foo']);

  const result = existing.toArray();

  t.is(result, existing);
});

test('if toLocaleString will serialize the array', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const result = existing.toLocaleString();

  t.is(result, '["foo","bar"]');
});

test('if toLocaleString will serialize the array with custom arguments', (t) => {
  const existing = new CrioArray([function foo() {}, 'bar']);

  const serializer = (key, value) => {
    return typeof value === 'function' ? value.toString() : value;
  };

  const result = existing.toLocaleString(serializer, 2);

  t.is(
    result,
    `[
  "${function foo() {}}",
  "bar"
]`
  );
});

test('if toObject will convert the array to an object', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const result = existing.toObject();

  t.true(result instanceof CrioObject);
  t.not(result, existing);
  t.deepEqual(result, new CrioObject({0: 'foo', 1: 'bar'}));
});

test('if toString will serialize the array', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const result = existing.toString();

  t.is(result, '["foo","bar"]');
});

test('if toString will serialize the array with custom arguments', (t) => {
  const existing = new CrioArray([function foo() {}, 'bar']);

  const serializer = (key, value) => {
    return typeof value === 'function' ? value.toString() : value;
  };

  const result = existing.toString(serializer, 2);

  t.is(
    result,
    `[
  "${function foo() {}}",
  "bar"
]`
  );
});

test('if unique returns a new CrioArray with only unique values', (t) => {
  const existing = new CrioArray([
    'foo',
    'foo',
    'bar',
    'foo',
    'bar',
    {foo: 'bar'},
    {foo: 'bar'}
  ]);

  const result = existing.unique();

  isNewArray(t, existing, result);
  t.deepEqual(result, new CrioArray(['foo', 'bar', {foo: 'bar'}]));
});

test('if unshift will add the passed values to the beginning of a new CrioArray', (t) => {
  const existing = new CrioArray(['foo', 'bar']);

  const result = existing.unshift('baz', ['quz']);

  isNewArray(t, existing, result);
  t.deepEqual(result, new CrioArray(['baz', ['quz'], 'foo', 'bar']));
});

test('if valueOf returns the array', (t) => {
  const existing = new CrioArray(['foo']);

  const result = existing.valueOf();

  t.is(result, existing);
});

test('if values returns a new array of the values', (t) => {
  const existing = new CrioArray(['foo', {bar: 'baz'}, ['quz']]);

  const result = existing.values();

  isNewArray(t, existing, result);
  t.deepEqual(result, new CrioArray(['foo', {bar: 'baz'}, ['quz']]));
});

test('if xor will return the array when no values are passed', (t) => {
  const existing = new CrioArray(['foo', 1, true]);

  const result = existing.xor();

  t.is(result, existing);
});

test('if xor produces a new array with the values that exist in only one array', (t) => {
  const existing = new CrioArray(['foo', 1, true]);

  const result = existing.xor(['foo'], new CrioArray([true]));

  isNewArray(t, existing, result);
  t.deepEqual(result, new CrioArray([1]));
});

test('if Symbol.species will return the CrioArray constructor', (t) => {
  t.is(CrioArray[Symbol.species], CrioArray);
});
