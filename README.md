# crio
Immutable JS objects with a natural API

<img src="https://img.shields.io/badge/build-passing-brightgreen.svg"/>
<img src="https://img.shields.io/badge/coverage-96.54%25-brightgreen.svg"/>
<img src="https://img.shields.io/badge/license-MIT-blue.svg"/>

#### Jump to the API
[API Documentation](https://github.com/planttheidea/crio/blob/master/tutorials/API.md)

#### Upgrade notice

If upgrading from `3.x.x` versions, please check the [changelog](CHANGELOG.md) for breaking changes.

#### Import into your project

```javascript
// ES2015
import crio from 'crio';

// CommonJS
const crio = require('crio');

// UMD
const crio = window.crio;
```

#### Usage

```javascript
// you can assign with crio() directly
const crioArray = crio(['foo']);
const crioObject = crio({foo: 'bar'});

// or use the convenience methods
const otherCrioArray = crio.array(['bar']);
const otherCrioObject = crio.object({bar: 'baz'});
```

#### What is immutable?

When something is described as immutable, it means that it cannot change after it has been created. In JavaScript terms, this means that any attempted change to an object results in a brand new object being created, without changing the original object.

#### Why do we need this in JavaScript?

The concept of immutability already exists in a lot of places in JavaScript, for example:

```javascript
const two = 2;
const three = 3;
const five = two + three;
```

By adding together *two* and *three* you expect to get *five*, however you don't expect the value of *two* to change. You can continue working with it even after using it in an expression:

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

The expectation is that you have pushed the value of "bar" into *foo* and created a new array *bar* that contains "foo, bar", however in reality this is what happens:

```javascript
const foo = ['foo'];
const fooBar = foo.push('bar');

console.log(foo); // ['foo', 'bar']
console.log(fooBar); // 1
```

Basically, you have mutated *foo* so that it is no longer empty, and what the *.push()* method returns is actually the index of the item you just added. This double-standard of expectations creates a lot confusion from a development perspective, but also makes keeping track of the state of your application very difficult because there is no traceability of what transactions have occurred to create that state at any given point.

#### Enter crio

crio attempts to solve the problem by closing the "immutable loop" on collection items, meaning it applies immutability to objects that are normally mutable by nature by replacing mutating methods with immutable counterparts. As a point of reference:

*Naturally immutable objects*
* Numbers
* Strings
* undefined
* null

*Naturally mutable objects*
* Arrays
* Dates (not covered by crio)
* Objects

To create a new crio object, its pretty straightforward:

```javascript
const crioArray = crio([]);
const crioObject = crio({}); // or just crio()
```

These are examples with empty objects, but you can pass in populated objects as well, or if you pass in nothing it will default to an object. What crio does is clone and freeze the object via [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze), and stores as a custom `CrioArray` or `CrioObject` with a prototypical methods that will return a new immutable version of the object with each update. Example:

```javascript
const foo = crio(['foo']);
const fooBar = foo.push('bar');

console.log(foo); // ['foo']
console.log(fooBar); // ['foo', 'bar']
```

The [API](tutorials/API.md) is the same as you already know working with those objects, and includes polyfills for all ES6 and some ES7 functions, as well as a few helpful crio-specific functions. The only difference is that any setting happens via .set() rather than direct index / property setting. You can work with the objects as you normally would with other libraries (lodash, for example). There is also no change to the protoypes of native objects, so you can apply this on your existing code go-forward. Basically, you shouldn't even notice you aren't working with the native objects, save for the fact everything is immutable.

#### Why not just use X immutable library?

There are a bunch of ones out there, but the two that people usually gravitate towards:
* [Immutable.js](https://github.com/facebook/immutable-js)
* [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)

`immutable` is quite nice, and very highly regarded by the community, however it creates an opaque object that cannot be used with other external libraries (namely lodash) without converting back to vanilla JS. Additionally, the object itself is not truly immutable, just constructed in a way that makes it incredibly difficult to alter outside of the API. This decision was likely made for performance reasons, but can cause unintended consequences (you can totally assign `foo.bar = 'baz'` and no error is thrown).

`seamless-immutable` has some great ideas, and I thought that could be the best option because they try to retain the native operations while leveraging Object.freeze, much like crio does. That said, they do not try to replace mutable methods with immutable ones, they just throw errors when you attempt them and its up to you to figure out the "right way". As such, it fell short of my expectations.

Bottom line, I support each of these projects to the fullest because they are trying to instill immutability in JavaScript practices; I just took a different approach that I consider the best of both worlds. :)

#### Browser support

The only requirement is that your browser has a proper ES5 environment, which you can mostly shim with something like [es5-shim](https://github.com/es-shims/es5-shim), however certain things like Object.defineProperty cannot be shimmed, so IE8 and below cannot be supported.

crio has been tested on the following browsers:
* Chrome
* Firefox
* Edge
* IE9

#### Performance

As of `4.0.0`, performance has substantially improved, and in many scenarios `crio` is more performant than `seamless-immutable` (in the case of `setIn`, by over **5x**). When it comes to `get` operations (either directly or nested), `crio` is identical to native in performance. See [the benchmark results](results.csv) if you want to see performance in node, or spin up the app locally if you want to see the performance in the browser.

#### Gotchas

**Recursive objects are not allowed**

Immutable objects with recursive values are basically impossible, and trying them will cause a stack overflow, so be mindful of that!

#### Development

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
