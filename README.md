# crio
Immutable JS objects with a natural API

#### Jump to the API
[API Documentation](API.md)

#### Installation
For built projects with webpack / browserify:
```
npm i crio --save
```
And to use in your file:
```
// CommonJS
var crio = require('crio');

// ES2015
import crio from 'crio';
```

For traditional inclusion of library by script tag (pulled from dist folder):
```
<script src="crio.min.js"></script>
```

#### What is immutable?

When something is described as immutable, it means that it cannot change after it has been created. In JavaScript terms, this means that any attempted change to an object results in a brand new object being created, without changing the original object.

#### Why do we need this in JavaScript?

The concept of immutability already exists in a lot of places in JavaScript, for example:
```
const two = 2;
const three = 3;
const five = two + three;
```
By adding together *two* and *three* you expect to get *five*, however you don't expect the value of *two* to change. You can continue working with it even after using it in an expression:
```
const two = 2;
const three = 3;
const five = two + three;
const four = two * two;
```
This is true of strings, numbers, undefined, and null, and is an expected behavior. The same idea, however, is not true for complex objects in JavaScfript. For example:
```
const foo = ['foo'];
const bar = foo.push('bar');
```
The expectation is that you have pushed the value of "bar" into *foo* and created a new array *bar* that contains "foo, bar", however in reality this is what happens:
```
const foo = ['foo'];
const bar = foo.push('bar');

console.log(foo); // ['foo', 'bar']
console.log(bar); // 1
```
Basically, you have mutated *foo* so that it is no longer empty, and what the *.push()* method returns is actually the index of the item you just added. This double-standard of expectations creates a lot confusion from a development perspective, but also makes keeping track of the state of your application very difficult because there is no traceability of what transactions have occurred to create that state at any given point.

#### Enter crio

crio attempts to solve the problem by closing the "immutable loop", meaning it applies immutability to objects that are normally mutable by nature by replacing mutating methods with immutable counterparts. As a point of reference:

*Naturally immutable objects*
* Numbers,
* Strings,
* undefined
* null

*Naturally mutable objects*
* Arrays
* Objects

To create a new crio object, its pretty straightforward:
```
const crioArray = crio([]);
const crioObject = crio({});
```
These are examples with empty objects, but you can pass in populated objects as well, or if you pass in nothing it will default to an object. What crio does is clone and freeze the object via [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze), and stores it with the new crio prototype. 

The [API](API.md) is the same as you already know working with those objects, and adds a few helpful crio-specific functions. The only difference is that any setting happens via .set() or .setIn() rather than direct index / property setting. The native constructors are preserved, and so you can work with the objects as you normally would with other libraries (lodash, moment, etc.). There is also no change to the prototypes of native objects, so you can apply this on your existing code go-forward. Basically, you shouldn't even notice you aren't working with the native objects, save for the fact everything is immutable. 

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

This is only because of the youth of the project, as the intended support includes Safari, Opera, and IE versions back to 9. Theoretically these should all work out of the box, just giving fair warning as that is unverified as-of yet. Please report any issues that you encounter.
