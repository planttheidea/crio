# crio

Immutable JS objects with a natural API

<img src="https://img.shields.io/badge/build-passing-brightgreen.svg"/>
<img src="https://img.shields.io/badge/coverage-98.55%25-brightgreen.svg"/>
<img src="https://img.shields.io/badge/license-MIT-blue.svg"/>

## Jump to the API

[API Documentation](https://github.com/planttheidea/crio/blob/master/tutorials/API.md)

## Upgrade notice

If upgrading from `4.x.x` and earlier versions, please check the [changelog](CHANGELOG.md) for breaking changes.

## Import

```javascript
// ES2015
import crio from 'crio';

// CommonJS
const crio = require('crio').default;

// UMD
const crio = window.crio;
```

## Usage

```javascript
// you can assign with crio() directly
const crioArray = crio(['foo']);
const updatedCrioArray = crioArray.push('bar');

const crioObject = crio({foo: 'bar'});
const updatedCrioObject = crioObject.set('bar', 'baz');

// or use the convenience methods
const otherCrioArray = crio.array(['bar']);
const updatedOtherCrioArray = otherCrioArray.push('bar');

const otherCrioObject = crio.object({bar: 'baz'});
const updatedOtherCrioObject = otherCrioObject.set('bar', 'baz');
```

## What is immutable?

When something is described as immutable, it means that it cannot change after it has been created. In JavaScript terms, this means that any attempted change to an object results in a brand new object being created, without changing the original object.

## Why is this helpful?

The concept of immutability already exists in a lot of places in JavaScript, for example:

```javascript
const two = 2;
const three = 3;
const five = two + three;
```

By adding together _two_ and _three_ you expect to get _five_, however you don't expect the value of _two_ to change. You can continue working with it even after using it in an expression:

```javascript
const two = 2;
const three = 3;
const five = two + three;
const four = two * two;
```

This is true of strings, numbers, undefined, and null, and is an expected behavior. The same idea, however, is not true for complex objects in JavaScript. For example:

```javascript
const foo = ['foo'];
const fooBar = foo.push('bar');
```

The expectation is that you have pushed the value of "bar" into _foo_ and created a new array _bar_ that contains "foo, bar", however in reality this is what happens:

```javascript
const foo = ['foo'];
const fooBar = foo.push('bar');

console.log(foo); // ['foo', 'bar']
console.log(fooBar); // 1
```

Basically, you have mutated _foo_ so that it is no longer empty, and what the _.push()_ method returns is actually the index of the item you just added. This double-standard of expectations creates a lot confusion from a development perspective, but also makes keeping track of the state of your application very difficult because there is no traceability of what transactions have occurred to create that state at any given point. This can create a lot of difficult-to-diagnose bugs and potential future regression points.

## Enter crio

crio attempts to solve the problem by closing the "immutable loop" on collection items, meaning it applies immutability to objects that are normally mutable by nature by replacing mutating methods with immutable counterparts. As a point of reference:

_Naturally immutable objects_

* Numbers
* Strings
* undefined
* null

_Naturally mutable objects_

* Arrays
* Dates (not covered by crio)
* Objects

The [API](tutorials/API.md) is the same as you already know working with those objects, as well as several helpful `crio`-specific functions. You can work with the objects as you normally would with other libraries (`lodash`, for example) with the exception that any setting happens via `.set()` rather than direct index / property setting. There is also no change to the protoypes of native objects, so you can apply this on your existing code go-forward. Basically, you shouldn't even notice you aren't working with the native objects, save for the fact everything is immutable.

## Why not just use X immutable library?

[`immutable`](https://github.com/facebook/immutable-js) is quite nice, and very highly regarded by the community, however it creates an opaque object that cannot be used with other external libraries (namely `lodash`) without converting back to vanilla JS. This lack of interoperability creates a lot of hoops to jump through at certain points of development, and also trains you to not necessarily think in JS, but in the library.

[`seamless-immutable`](https://github.com/rtfeldman/seamless-immutable) has some great ideas, but they do not try to replace mutable methods with immutable ones, they just throw errors when you attempt them and its up to you to figure out the "right way". Also, it can be quite slow for certain operations.

Bottom line, I support each of these projects because they are trying to instill immutability in JavaScript practices, but I took a different approach that I consider the best of both worlds. :)

## Browser support

* Chrome (all versions)
* Firefox (all versions)
* Edge (all versions)
* Opera 15+
* IE 11+
* Safari 8+
* iOS 8+
* Android 4+

## Node support

* 4+

## Gotchas

**Recursive objects are not allowed**

Immutable objects with recursive values are basically impossible, and trying them will cause a stack overflow, so be mindful of that!

## Development

Standard stuff, clone the repo and `npm install` dependencies. The npm scripts available:

* `benchmark` => run benchmarks in node
* `benchmark:watch` => run `benchmark` with persistent watcher for changes
* `build` => run webpack to build crio.js with NODE_ENV=development
* `build:minifed` => run webpack to build crio.min.js with NODE_ENV=production
* `compile-for-publish` => run `lint`, `test`, `transpile`, `dist`
* `dev` => run webpack dev server to run example app (playground!)
* `dev:production` => runs `dev` but with NODE_ENV=production
* `dist` => runs `build` and `build-minified`
* `lint` => run ESLint against all files in the `src` folder
* `prepublish` => runs `compile-for-publish`
* `test` => run AVA test functions with `NODE_ENV=test`
* `test:watch` => same as `test`, but runs persistent watcher
* `transpile` => run babel against all files in `src` to create files in `lib`
