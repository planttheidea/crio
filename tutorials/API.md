# crio API

## Instantiation

* `crio(object: any): (CrioArray|CrioObject)`
  * Standard method, will `crio` the object passed if an array or object, else it will return the object itself

```javascript
const emptyObject = crio(); // {}
const populatedObject = crio({foo: 'bar'}); // {foo: 'bar'}
const populatedArray = crio(['foo', 'bar']); // ['foo', 'bar']
```

* `crio.array(object: Array<any>): CrioArray`
  * Shortcut method for `crio`ing array-specific values

```javascript
const empty = crio.array(); // []
const populated = crio.array(['foo']); // ['foo']
```

* `crio.object(object: Object): CrioObject`
  * Shortcut method for `crio`ing object-specific values

```javascript
const empty = crio.object(); // {}
const populated = crio.object({foo: 'bar'}); // {foo: 'bar'}
```

* `crio.isCrio(object: any): boolean`
  * Determine if the object passed is a `Crio`

```javascript
const normal = {foo: 'bar'};
const crioed = crio({foo: 'bar'});

console.log(crio.isCrio(normal)); // false
console.log(crio.isCrio(crioed)); // true
```

* `crio.isArray(object: any): boolean`
  * Determine if the object passed is a `CrioArray`

```javascript
const normal = ['foo'];
const croiedArray = crio(['foo']);
const crioedObject = crio({foo: 'bar'});

console.log(crio.isObject(normal)); // false
console.log(crio.isObject(croiedArray)); // true
console.log(crio.isObject(crioedObject)); // false
```

* `crio.isObject(object: any): boolean`
  * Determine if the object passed is a `CrioObject`

```javascript
const normal = {foo: 'bar'};
const croiedArray = crio(['foo']);
const crioedObject = crio({foo: 'bar'});

console.log(crio.isObject(normal)); // false
console.log(crio.isObject(croiedArray)); // false
console.log(crio.isObject(crioedObject)); // true
```

Methods with the same name as the native method will be a link to MDN, as they are meant to be as similar to the native method as possible, with the exception of accepting `thisArg`. Where any specific differences from the default behavior exist, the `crio`-specific behavior is mentioned.

## Arrays

* `clear(): CrioArray`
  * returns an empty `CrioArray`

```JavaScript
const populated = crio(['foo']);

console.log(populated.clear()); // []
```

* `compact(): CrioArray`
  * returns a new `CrioArray` with all falsy values filtered out

```javascript
const array = crio(['foo', false, 0, '', {}, [], null, undefined]);

console.log(array.compact()); // ['foo', {}, []]
```

* [concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

```javascript
const array = crio(['foo']);

console.log(array.concat(['bar'])); // ['foo', 'bar']
```

* `delete(key: (Array<number|string>|number)): CrioArray`
  * Deletes the key provided from the `CrioArray`
  * Supports shallow or deep values via [array or dot-bracket syntax](https://github.com/planttheidea/pathington)

```javascript
const array = crio(['foo', {bar: 'baz', baz: 'quz'}]);

console.log(array.delete(1)); // ['foo']
console.log(array.delete('[1].bar')); // ['foo', {baz: 'quz'}]
```

* `difference(array1: Array<any>[, array2: Array<any>[, ...arrayN: Array<any>]]): CrioArray`
  * Returns a new array of the values that only exist in either the `CrioArray` or in one of the arrays passed

```javascript
const array = crio(['foo', true, 1]);

console.log(array.difference(['foo'], [true])); // [1]
```

* [copyWithin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)

```javascript
const array = crio(['foo', 'bar', 'baz']);

console.log(array.copyWithin(2, 0)); // ['foo', 'bar', 'foo']
```

* [entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)

```javascript
const array = crio(['foo', 'bar']);

console.log(array.entries()); // [[0, 'foo'], [1, 'bar']]
```

* `equals(object: any): boolean`
  * Determines whether `object` is deeply equal to the `CrioArray`

```javascript
const array = crio(['foo']);
const matchingArray = crio(['foo']);

console.log(array === matchingArray); // false
console.log(array.equals(matchingArray)); // true
console.log(array.equals(crio(['bar']))); // false
```

* [every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

```javascript
const array = crio(['foo', 'bar']);

console.log(array.every(value => value.length === 3)); // true
console.log(array.every(value => value === 'bar')); // false
```

* [fill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
  * Returns new `CrioArray` with items from `start` to `end` filled with `value`

```javascript
const array = crio(['foo', 'bar', 'baz']);

console.log(array.fill('same')); // ['same', 'same', 'same']
```

* [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

```javascript
const array = crio(['foo', 'bar', 'baz']);

console.log(array.filter(value => value[0] === 'b')); // ['bar', 'baz']
```

* [find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

```javascript
const array = crio(['foo', 'bar', 'baz']);

console.log(array.find(value => value[0] === 'b')); // 'bar'
```

* [findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

```javascript
const array = crio(['foo', 'bar', 'baz']);

console.log(array.find(value => value[0] === 'b')); // 1
```

* `findLast(fn: function(value: any, index: number, object: CrioArray)): any`
  * Find the value that matches the result of `fn` starting at the last `index` in the object

```javascript
const array = crio(['foo', 'bar', 'baz']);

console.log(array.find(value => value[0] === 'b')); // 'baz'
```

* `findLastIndex(fn: function): number`
  * Same as `findIndex` but starting from end and working to start

```javascript
const array = crio(['foo', 'bar', 'baz']);

console.log(array.find(value => value[0] === 'b')); // 2
```

* `first(size: number = 1): CrioArray`
  * Returns a new array of the first `size` number of items in the array

```javascript
const array = crio(['foo', 'bar', 'baz']);

console.log(array.first()); // ['foo']
console.log(array.first(2)); // ['foo', 'bar']
```

* [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

```javascript
const array = crio(['foo', 'bar']);

let count = 0;

console.log(array.forEach(() => count++)); // ['foo', 'bar']
console.log(count); // 2
```

* `get(key: (Array<number|string>|number)): any`
  * Retrieve value at `key`
  * Supports shallow or deep values via [array or dot-bracket syntax](https://github.com/planttheidea/pathington)

```javascript
const array = crio(['foo', {bar: 'baz'}]);

console.log(array.get(1)); // {bar: 'baz'}
console.log(array.get('[1].bar')); // 'baz'
```

* `has(key: (Array<number|string>|number)): boolean`
  * Does `key` exist in object
  * Supports shallow or deep values via [array or dot-bracket syntax](https://github.com/planttheidea/pathington)

```javascript
const array = crio(['foo', {bar: 'baz'}]);

console.log(array.has(1)); // true
console.log(array.has(6)); // false
console.log(array.has('[1].bar')); // true
console.log(array.has('[1].quz')); // false
```

* [includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

```javascript
const array = crio(['foo', 'bar']);

console.log(array.includes('foo')); // true
console.log(array.includes('baz')); // false
```

* `intersection(array1: Array<any>[, array2: Array<any>[, ...arrayN: Array<any>]]): CrioArray`
  * Returns a new `CrioArray` of the values that exist in all of the arrays

```javascript
const array = crio(['foo', 1, true]);

console.log(array.intersection(['foo', 1], [1])); // 1
```

* [indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

```javascript
const array = crio(['foo', 'bar', 'baz', 'bar']);

console.log(array.indexOf('bar')); // 1
```

* [join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

```javascript
const array = crio(['foo', 'bar']);

console.log(array.join()); // 'foo,bar'
console.log(array.join('|')); // 'foo|bar'
```

* [keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)

```javascript
const array = crio(['foo', 'bar']);

console.log(array.keys()); // [0, 1]
```

* `last(size: number = 1): CrioArray`
  * Returns a new `CrioArray` of the last _num_ number of items in the array

```javascript
const array = crio(['foo', 'bar', 'baz']);

console.log(array.last()); // ['baz']
console.log(array.last(2)); // ['bar', 'baz']
```

* [lastIndexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

```javascript
const array = crio(['foo', 'bar', 'baz', 'bar']);

console.log(array.indexOf('bar')); // 3
```

* [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

```javascript
const array = crio(['foo', 'bar']);

console.log(
  array.map(value =>
    value
      .slice('')
      .reverse()
      .join('')
  )
); // ['oof', 'rab']
```

* `merge(array1: Array<any>[, array2: Array<any>[, ...arrayN: Array<any>]]): CrioArray`
  * Merge any number of objects into existing crio
  * Supports shallow or deep key values via [array or dot-bracket syntax](https://github.com/planttheidea/pathington)

```javascript
const array = crio(['foo', {bar: 'baz'}]);

console.log(array.merge(null, ['quz'])); // ['foo', {bar: 'baz'}, 'quz']
console.log(array.merge('[0].bar', {baz: 'quz'})); // ['foo', {bar: {baz: 'quz'}}]
```

* `mutate(fn: function(array: Array<any>, crio: CrioArray)): any`
  * Whatever you return in the callback is what is returned (as a `CrioArray` or `CrioObject` if applicable)

```javascript
const array = crio([{foo: 'bar'}]);

const result = array.mutate(thawed => {
  thawed[0].foo = 'baz';
  thawed.push('bar');

  return thawed;
});

console.log(result); // [{foo: 'baz'}, 'bar']
```

* `pluck(key: (Array<number|string>|number)): CrioArray`
  * Iterates over the `CrioArray` and returns a new `CrioArray` of values where the `key` exists as a property on the collection item
  * Supports shallow or deep values via [array or dot-bracket syntax](https://github.com/planttheidea/pathington)

```javascript
const array = crio([{foo: 'bar'}, {bar: 'baz'}, {foo: 'quz'}]);

console.log(array.pluck('foo')); // ['bar', undefined, 'quz']

const deepArray = crio([
  [{foo: 'foo'}, {bar: 'baz'}, {foo: 'bar'}],
  [{foo: 'bar'}, {bar: 'baz'}, null, {foo: 'foo'}]
]);

console.log(array.pluck('[1].foo')); // ['bar', undefined, undefined, 'foo']
```

* [pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
  * Returns new `CrioArray` with first item removed

```javascript
const array = crio(['foo', 'bar']);

console.log(array.pop()); // ['foo']
```

* [push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
  * Returns new `CrioArray` with new item(s) added

```javascript
const array = crio(['foo']);

console.log(array.push('bar', 'baz')); // ['foo', 'bar', 'baz']
```

* [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

```javascript
const array = crio([1, 2, 3]);

const result = array.reduce(
  ({order, sum}, value) => {
    return {order: [...order, value], sum: sum + value};
  },
  {order: [], sum: 0}
);

console.log(result); // {order: [1, 2, 3], sum: 6}
```

* [reduceRight](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)

```javascript
const array = crio([1, 2, 3]);

const result = array.reduceRight(
  ({order, sum}, value) => {
    return {order: [...order, value], sum: sum + value};
  },
  {order: [], sum: 0}
);

console.log(result); // {order: [3, 2, 1], sum: 6}
```

* [reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
  * The original array's order is maintained (not mutated)

```javascript
const array = crio(['foo', 'bar', 'baz']);

console.log(array.reverse()); // ['baz', 'bar', 'foo']
```

* `set(key: (Array<number|string>|number), value: any): CrioArray`
  * Sets value at `key`
  * Supports shallow or deep values via [array or dot-bracket syntax](https://github.com/planttheidea/pathington)

```javascript
const array = crio(['foo', {bar: 'baz'}]);

console.log(array.set(1, 'quz')); // ['foo', 'quz']
console.log(array.set('[1].bar', 'quz')); // ['foo', {bar: 'quz'}]
```

* [shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
  * Returns new `CrioArray` with first item removed

```javascript
const array = crio(['foo', 'bar', 'baz']);

console.log(array.shift()); // ['bar', 'baz']
```

* [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

```javascript
const array = crio(['foo', 'bar']);

console.log(array.slice(1)); // ['bar']
```

* [some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

```javascript
const array = crio(['foo', 'bar', 'baz']);

console.log(array.some(value => value === 'bar')); // true
console.log(array.some(value => value === 'quz')); // false
```

* [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
  * Returns new `CrioArray` sorted by either callback or default

```javascript
const array = crio(['foo', 'bar', 'baz']);

console.log(array.sort()); // ['bar', 'baz', 'foo']
```

* [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
  * Returns new `CrioArray` with item(s) added/removed based on splicing parameters

```javascript
const array = crio(['foo', 'bar', 'baz']);

console.log(array.splice(1, 1)); // ['foo', 'baz']
```

* `thaw(): Array<any>`
  * Recursively thaws `CrioArray` deeply and returns standard array version of itself

```javascript
const array = crio(['foo', 'bar']);

console.log(array.thaw()); // ['foo', 'bar']
console.log(array.constructor === Array); // false
console.log(array.thaw().constructor === Array); // true
```

* `toObject(): CrioObject`
  * Converts `CrioArray` into a `CrioObject` of `{index: value}` pairs

```javascript
const array = crio(['foo', 'bar']);

console.log(array.toObject()); // {0: 'foo', 1: 'bar'}
```

* [toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)
  * Returns stringified version of `CrioArray`
  * Optionally accepts `serializer` and `indent` arguments, which are identical to those arguments for [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

```javascript
const array = crio(['foo', 'bar']);

console.log(array.toLocaleString()); // ["foo","bar"]
console.log(arrat.toLocaleString(null, 2));
/*
[
  "foo",
  "bar"
]
*/
```

* [toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)
  * Returns stringified version of `CrioArray`
  * Optionally accepts `serializer` and `indent` arguments, which are identical to those arguments for [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

```javascript
const array = crio(['foo', 'bar']);

console.log(array.toString()); // ["foo","bar"]
console.log(arrat.toString(null, 2));
/*
[
  "foo",
  "bar"
]
*/
```

* `unique(): CrioArray`
  * Returns a new `CrioArray` of values filtered down to only existing in the array once

```javascript
const array = crio(['foo', 'bar', 'foo', 'foo', 'bar']);

console.log(array.unique()); // ['foo', 'bar']
```

* [unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
  * Returns new `CrioArray` with new item(s) added to beginning

```javascript
const array = crio(['foo', 'bar']);

console.log(array.unshift('baz', 'quz')); // ['baz', 'quz', 'foo', 'bar']
```

* [values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values)

```javascript
const array = crio(['foo', 'bar']);

console.log(array.values()); // ['foo', 'bar']
```

* `xor(array1: Array<any>[, array2: Array<any>[, ...arrayN: Array<any>]]): CrioArray`
  * Returns a new `CrioArray` of the values that are the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference) of the `CrioArray` and the arrays passed

```javascript
const array = crio(['foo', 1, true]);

console.log(array.xor(['foo'], [true])); // [1]
```

## Objects

* `clear(): CrioObject`
  * returns an empty `CrioObject`

```javascript
const object = crio({foo: 'bar'});

console.log(object.clear());
```

* `compact(): CrioObject`
  * returns a new `CrioObject` with all falsy values filtered out

```javascript
const object = crio({
  string: 'foo',
  bool: false,
  num: 0,
  object: {},
  array: [],
  nul: null,
  undef: undefined
});

console.log(object.compact()); // {string: 'foo', object: {}, array: []}
```

* `delete(key: (Array<number|string>|string)): CrioObject`
  * Deletes the key provided from the `CrioObject`
  * Supports shallow or deep values via [array or dot-bracket syntax](https://github.com/planttheidea/pathington)

```javascript
const object = crio({foo: 'bar', bar: ['baz', 'quz']});

console.log(object.delete('bar')); // {foo; 'bar'}
console.log(object.delete('bar[0]')); // {foo: 'bar', bar: ['quz']}
```

* `entries(): CrioArray`
  * Gets an array of the `[key, value]` pairs in the `CrioObject`

```javascript
const object = crio({foo: 'bar', bar: 'baz'});

console.log(object.entries()); // [['foo', 'bar'], ['bar', 'baz']]
```

* `every(fn: function(value: any, key: string, object: CrioObject)): boolean`
  * Performs same function as `every` in `CrioArray`, but on the `CrioObject`

```javascript
const object = crio({foo: 'bar', bar: 'baz'});

console.log(object.every(value => value.length === 3)); // true
console.log(object.every(value => value === 'bar')); // false
```

* `forEach(fn: function(value: any, key: string, object: CrioObject)): CrioObject`
  * Iterates over object executing `fn` and returns the original `CrioObject`
  * Iteration order is not guaranteed (due to object key order not being guaranteed per the spec)

```javascript
const object = crio({foo: 'bar', bar: 'baz'});

let count = 0;

console.log(object.forEach(() => count++)); // {foo: 'bar', bar: 'baz'}
console.log(count); // 2
```

* `filter(fn: function(value: any, key: string, object: CrioObject)): CrioObject`
  * Iterates over object and filters out any returned values that are falsy
  * Iteration order is not guaranteed (due to object key order not being guaranteed per the spec)

```javascript
const object = crio({foo: 'bar', bar: 'baz', baz: 'quz'});

console.log(object.filter(value => value[0] === 'b')); // {foo: 'bar', bar: 'baz'}
```

* `find(fn: function(value: any, key: string, object: CrioObject)): any`
  * Same as `find` for `CrioArray` but on the `CrioObject`

```javascript
const object = crio({foo: 'bar', bar: 'baz'}, (baz: 'quz'));

console.log(object.find(value => value !== 'baz')); // 'bar'
```

* `findKey(fn: function(value: any, key: string, object: CrioObject)): string`
  * Same as `findIndex` for `CrioArray` but finding the appropriate `key`

```javascript
const object = crio({foo: 'bar', bar: 'baz'}, (baz: 'quz'));

console.log(object.findKey(value => value !== 'baz')); // 'foo'
```

* `findLast(fn: function(value: any, key: string, object: CrioObject)): any`
  * Find the value that matches the result of `fn` starting at the last key in the `CrioObject`

```javascript
const object = crio({foo: 'bar', bar: 'baz'}, (baz: 'quz'));

console.log(object.findLast(value => value !== 'baz')); // 'quz'
```

* `findLastKey(fn: function(value: any, key: string, object: CrioObject)): string`
  * Same as `findKey` but starting from end and working to start

```javascript
const object = crio({foo: 'bar', bar: 'baz'}, (baz: 'quz'));

console.log(object.findLastKey(value => value !== 'baz')); // 'baz'
```

* `get(key: (Array<number|string>|string)): any`
  * Retrieve value at `key`
  * Supports shallow or deep values via [array or dot-bracket syntax](https://github.com/planttheidea/pathington)

```javascript
const object = crio({foo: 'bar', bar: ['baz', 'quz']});

console.log(crio.get('bar')); // ['baz', 'quz']
console.log(crio.get('bar[0]')); // 'baz'
```

* `has(key: (Array<number|string>|string)): boolean`
  * Does `key` exist in object
  * Supports shallow or deep values via [array or dot-bracket syntax](https://github.com/planttheidea/pathington)

```javascript
const object = crio({foo: 'bar', bar: ['baz', 'quz']});

console.log(crio.has('bar')); // true
console.log(crio.has('baz')); // false
console.log(crio.has('bar[0]')); // true
console.log(crio.has('bar[6]')); // false
```

* [hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
  * Only supports shallow values

```javascript
const object = crio({foo: 'bar', bar: ['baz', 'quz']});

console.log(crio.hasOwnProperty('bar')); // true
console.log(crio.hasOwnProperty('baz')); // false
```

* `includes(item: any): boolean`
  * Determine if the `CrioObject` has a value that matches `value` in strict equality

```javascript
const object = crio({foo: 'bar', bar: 'baz'});

console.log(object.includes('baz')); // true
console.log(object.includes('quz')); // false
```

* `keyOf(item: any): string`
  * Get the key for the `item` passed starting with the first key in the `CrioObject`

```javascript
const object = crio({foo: 'bar', bar: 'baz', baz: 'bar'});

console.log(object.keyOf('bar')); // foo
```

* `keys(): CrioArray`
  * Returns an array of the keys in the `CrioObject`

```javascript
const object = crio({foo: 'bar', bar: 'baz'});

console.log(object.keys()); // ['foo', 'bar']
```

* `lastKeyOf(item: any): string`
  * Get the key for the `item` passed starting with the last key in the `CrioObject`

```javascript
const object = crio({foo: 'bar', bar: 'baz', baz: 'bar'});

console.log(object.keyOf('bar')); // baz
```

* `map(fn: function(value: any, key: string, object: CrioObject)): CrioObject`
  * Iterates over object and maps returned value to the respective `key`
  * Iteration order is not guaranteed (due to object key order not being guaranteed per the spec)

```javascript
const object = crio({foo: 'bar', bar: 'baz', baz: 'quz'});

console.log(
  object.map(value =>
    value
      .split('')
      .reverse()
      .join('')
  )
); // {foo: 'rab', bar: 'zab', baz: 'zuq'}
```

* `merge(object1: Object[, object2: Object[, ...objectN: Object]]): CrioObject`
  * Merge any number of objects into existing `CrioObject`
  * Supports shallow or deep values via [array or dot-bracket syntax](https://github.com/planttheidea/pathington)

```javascript
const object = crio({foo: 'bar', bar: ['baz', 'quz']});

console.log(object.merge(null, {baz: 'quz'})); // {foo: 'bar', bar: ['baz', 'quz'], baz: 'quz'}
console.log(object.merge('bar[0]', ['blah'])); // {foo: 'bar', bar: ['baz', 'quz', 'blah']};
```

* `mutate(fn: function(object: Object, crio: CrioObject)): any`
  * Whatever you return in the callback is what is returned (as a `CrioArray` or `CrioObject` if applicable)

```javascript
const object = crio({foo: ['bar', 'baz']});

const result = object.mutate(thawed => {
  thawed.foo.push('quz');
  thawed.bar = 'baz';

  return thawed;
});

console.log(result); // {foo: ['bar', 'baz', 'quz'], bar: 'baz'}
```

* `pluck(key: (Array<number|string>|string)): CrioArray`
  * Iterates over the `CrioObject` and returns a `CrioArray` of values where the `key` exists as a property on the collection item
  * Supports shallow or deep values via [array or dot-bracket syntax](https://github.com/planttheidea/pathington)
  * Iteration order is not guaranteed (due to object key order not being guaranteed per the spec)

```javascript
const object = crio({
  first: {foo: 'bar'},
  second: {bar: 'baz'},
  third: null,
  fourth: {foo: 'foo'}
});

console.log(object.pluck('foo')); // ['bar', undefined, undefined, 'foo']

const otherObject = crio({
  first: [{foo: 'foo'}, {bar: 'baz'}, {foo: 'bar'}],
  second: [{foo: 'bar'}, {bar: 'baz'}, null, {foo: 'foo'}]
});

console.log(otherObject.pluck('second.foo')); // ['bar', undefined, undefined, 'foo']
```

* `reduce(fn: function(accumulator: any, value: any, key: string, object:CrioObject)): any`
  * Performs same function as `reduce` in `CrioArray`, but on the `CrioObject`

```javascript
const object = crio({one: 1, two; 2, three: 3});

const result = object.reduce(({order, sum}, value) => {
  return {order: [...order, value], sum: sum + value};
}, {order: [], sum; 0});

console.log(result); // {order: [1, 2, 3], sum: 6}
```

* `reduceRight(fn: function(accumulator: any, value: any, key: string, object:CrioObject)): any`
  * Performs same function as `reduceRight` in `CrioArray`, but on the `CrioObject`

```javascript
const object = crio({one: 1, two; 2, three: 3});

const result = object.reduceRight(({order, sum}, value) => {
  return {order: [...order, value], sum: sum + value};
}, {order: [], sum; 0});

console.log(result); // {order: [3, 2, 1], sum: 6}
```

* `set(key: (Array<number|string>|string), value: any): CrioObject`
  * Sets value at `key`
  * Supports shallow or deep values via [array or dot-bracket syntax](https://github.com/planttheidea/pathington)

```javascript
const object = crio({foo: 'bar', bar: ['baz', 'quz']});

console.log(object.set('bar', 'baz')); // {foo: 'bar', bar: 'baz'}
console.log(object.set('bar[0]', {baz: 'blah'})); // {foo: 'bar', bar: [{baz: 'blah'}, 'quz']}
```

* `some(fn: function(value: any, key: string, object: CrioObject)): boolean`
  * Performs same function as `some` in `CrioArray`, but on the `CrioObject`

```javascript
const object = crio({foo: 'bar', bar: 'baz'});

console.log(object.some(value => value === 'baz')); // true
console.log(object.some(value => value === 'quz')); // false
```

* `toArray(): CrioArray`
  * Converts `CrioObject` to a `CrioArray` of the object's values

```javascript
const object = crio({foo: 'bar', bar: 'baz'});

console.log(object.toArray()); // ['bar', 'baz']
```

* [toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString)
  * Returns stringified version of `CrioObject`
  * Optionally accepts `serializer` and `indent` arguments, which are identical to those arguments for [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

```javascript
const object = crio({foo: 'bar', bar: 'baz'});

console.log(object.toLocaleString()); // {"foo":"bar","bar":"baz"}
console.log(object.toLocaleString(null, 2));
/*
{
  "foo": "bar",
  "bar": "baz"
}
*/
```

* [toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
  * Returns stringified version of `CrioObject`
  * Optionally accepts `serializer` and `indent` arguments, which are identical to those arguments for [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

```javascript
const object = crio({foo: 'bar', bar: 'baz'});

console.log(object.toString()); // {"foo":"bar","bar":"baz"}
console.log(object.toString(null, 2));
/*
{
  "foo": "bar",
  "bar": "baz"
}
*/
```

* `thaw(): Object`
  * Recursively thaws `CrioObject` deeply and returns standard object version of itself

```javascript
const object = crio({foo: 'bar', bar: 'baz'});

console.log(object.thaw()); // {foo: 'bar', bar: 'baz'}
console.log(object.constructor === Object); // false
console.log(object.thaw().constructor === Object); // true
```

* `values(): CrioObject`
  * Returns a `CrioArray` of the values in the `CrioObject`

```javascript
const object = crio({foo: 'bar', bar: 'baz'});

console.log(object.values()); // ['bar', 'baz']
```
