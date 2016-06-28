# crio
Immutable JS objects with a natural API

#### Jump to the API
[API Documentation](API.md)

#### Usage

```javascript
// ES2015
import crio from 'crio';

// CommonJS
const crio = require('crio').default;

// UMD
const crio = window.crio;
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
* Numbers,
* Strings,
* undefined
* null

*Naturally mutable objects*
* Arrays
* Dates (not covered by crio)
* Objects

To create a new crio object, its pretty straightforward:
```javascript
const crioArray = crio([]);
const crioObject = crio({});
```
These are examples with empty objects, but you can pass in populated objects as well, or if you pass in nothing it will default to an object. What crio does is clone and freeze the object via [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze), and stores as a custom `CrioArray` or `CrioObject` with a prototypical methods that will return a new immutable version of the object with each update. Example:

```javascript
const foo = crio(['foo']);
const fooBar = foo.push('bar');

console.log(foo); // ['foo']
console.log(fooBar); // ['foo', 'bar']
```

The [API](API.md) is the same as you already know working with those objects, and includes polyfills for all ES6 and some ES7 functions, as well as a few helpful crio-specific functions. The only difference is that any setting happens via .set() rather than direct index / property setting. You can work with the objects as you normally would with other libraries (lodash, for example). There is also no change to the protoypes of native objects, so you can apply this on your existing code go-forward. Basically, you shouldn't even notice you aren't working with the native objects, save for the fact everything is immutable. 

#### Why not just use X immutable library?

There are a bunch of ones out there, but the three that people usually gravitate towards:
* [Immutable.js](https://github.com/facebook/immutable-js)
* [mori](https://github.com/swannodette/mori)
* [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)

**Immutable** is quite nice, and their API also follows the object standard (in their case, Array and Map), however it creates a classed object that cannot be used with other external libraries (namely lodash) without converting back and forth. They have a great thing going, however inevitably the inability to use objects like their native counterparts felt like a hinderance.

**mori** is the seasoned veteran, having been hardened via ClosureScript, and for many is chosen specifically because it does not try to immutabilize the default API methods. Personal taste, I wasn't interested in relearning an entirely new API (that for a person without a ClosureScript background is obtuse). Plus, it's not written in JavaScript ... its compiled to it, which just felt wrong to a JavaScript devout like me.

**seamless-immutable** had great ideas, and I thought that could be the best option because they try to retain the native operations while leveraging Object.freeze, much like crio does. That said, they do not try to replace mutable methods with immutable ones, they just throw errors when you attempt them and its up to you to figure out the "right way". As such, it fell short of my expectations

Bottom line, I support each one of these projects to the fullest because they are trying to create immutability in JavaScript, just with different approaches.

#### Browser support

The only requirement is that your browser has a proper ES5 environment, which you can mostly shim with something like [es5-shim](https://github.com/es-shims/es5-shim), however certain things like Object.defineProperty cannot be shimmed, so IE8 and below cannot be supported.

crio has been tested on the following browsers:
* Chrome
* Firefox
* Edge
* IE11

This is only because of the youth of the project, as the intended support should include Safari, Opera, and IE versions back to 9. Theoretically all of these browsers should work out of the box, I just have not verified it. Please report any issues that you encounter.

#### Performance

There has been a lot of performance tuning (and hopefully more to come), however because new objects are being instantiated with each creation then inevitably things will be slower than the native methods. Additionally, because objects are frozen upon creation, the only way to produce a new object is to clone the existing object, so doing a bunch of assignment operations in a loop can add up. We're still talking milliseconds here (and [it probably won't be noticeable to you anyway](https://blog.getify.com/sanity-check-object-creation-performance/)), but who knows ... maybe 51ms to create an array of 1000 unique objects is way too slow for your application.

Basically, if you're noticing a perceivable slowdown, check the implementation method. The majority of processing time is spent in the construction of the CrioArray / CrioObject, so optimizing for that will keep things performant.

A silly and unrealistic example that micro-optimizers love to use:

```javascript

let crioArray = crio([]),
    index = -1;
    
while (++index < 100000) {
    crioArray = crioArray.push(index);
}
```

This will take a while, but a small tweak makes it much faster:

```javascript

let array = [],
    index = -1;
    
while (++index < 100000) {
    array.push(index);
}

const crioArray = crio(array);
```

The difference here is we created the `CrioArray` in a single shot, whereas before a new `CrioArray` was instantiated with each `.push()`. Focusing your code on optimizing for the creation will keep things nice and snappy.

Additionally, if you plan to do a bunch of manipulations to it, you can always use the `.mutate()` method:

```javascript
const crioObject = crioArray.mutate((array) => {
    let object = {};
    
    array.forEach((item, index) => {
        object[index] = item;
    });
    
    return object;
});
```

This is a simple example, but `mutate` will allow you to work with the standard (mutable) JS objects and maximize performance.

#### Development

Standard stuff, clone the repo and `npm install` dependencies. The npm scripts available:
* `build` => run webpack to build crio.js with NODE_ENV=development
* `build-minifed` => run webpack to build crio.min.js with NODE_ENV=production
* `dev` => run webpack dev server to run example app (playground!)
* `lint` => run ESLint against all files in the `src` folder
* `prepublish` => run `lint`, `test`, `transpile`, `build`, and `build-minified`
* `test` => run AVA test functions
* `test:watch` => same as `test`, but runs persistent watcher
* `transpile` => run babel against all files in `src` to create files in `lib`
