# crio
Immutable JS objects with a natural API

#### Jump to the API
[API Documentation](API.md)

#### What is immutable?

When something is described as immutable, it means that it cannot change after it has been created. 

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
This is true of strings, undefined, and null, and is a naturally-expected behavior. The same idea, however, is not true for complex objects in JavaScfript. For example:
```
const emptyArray = [];
const populatedArray = emptyArray.push('foo');
```
The expectation is that you have pushed the value of "foo" into *emptyArray* and created a new array *populatedArray*, however in reality this is what happens:
```
const emptyArray = [];
const populatedArray = emptyArray.push('foo');

console.log(emptyArray); // ['foo']
console.log(populatedArray); // 0
```
Basically, you have mutated *emptyArray* so that it is no longer empty, and what the *.push()* method returns is actually the index of the item you just added. This double-standard of expectations creates a lot confusion from a development perspective, but also makes keeping track of the state of your application very difficult because there is no traceability of what transactions have occurred to create that state at any given point.

#### Enter crio

crio attempts to solve the problem by closing the "immutable loop", meaning it applies immutability to objects that are normally mutable by nature. As a point of reference:

*Naturally immutable objects*
* Numbers,
* Strings,
* undefined
* null

*Naturally mutable objects*
* Arrays
* Dates
* Objects

To create a new crio object, its pretty straightforward:
```
const crioDate = crio(new Date());
const crioList = crio([]);
const crioMap = crio({});
```
These are examples with empty objects, but you can pass in populated objects as well, or if you pass in nothing it will default to an object. What crio does is clone and freeze the object via [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze), and stores it with the new crio prototype. 

The [API](API.md) is the same as you already know working with those objects (and include polyfills for all ES6 and some ES7 functions), with the only difference is that each operation returns a new crio of the modified object. The native constructors are preserved, and so you can work with the objects as you normally would with other libraries (lodash, moment, etc.). Basically, you shouldn't even notice you aren't working with the native objects, save for the fact everything is immutable. The only requirement is that your browser has a proper ES5 environment, which you can mostly shim with something like [es5-shim](https://github.com/es-shims/es5-shim), however certain things like Object.defineProperty cannot be shimmed, so IE8 and below cannot be supported.

#### Why not just use X immutable library?

There are a bunch of ones out there, but the three that people usually gravitate towards:
* ImmutableJS
* mori
* seamless-immutable

ImmutableJS is quite nice, and their API also follows the object standard (in their case, Array and Map), however it creates a classed object that cannot be used with other external libraries. They have a good API, however inevitably the inability to use it like a native array felt like a hinderance.

Mori is the seasoned veteran, having been hardened via ClosureScript, and for many is the best option specifically because it does not try to immutabilize the default API methods. Personal taste, I wasn't interested in relearning an entirely new API (that for a person without a ClosureScript background is obtuse). Plus, it's not written in JavaScript ... its compiled to it.

seamless-immutable had great ideas, and I thought that could be the best option because they try to retain the native operations while leveraging Object.freeze, much like crio does. That said, they do not try to replace mutable methods with immutable ones, they just throw errors when you attempt them and its up to you to figure out the "right way".

Bottom line, I support each one of these projects to the fullest because they are trying to create immutability in JavaScript, just with different approaches.

#### Browser support
crio has been tested on the following browsers:
* Chrome
* Firefox
* Edge
* IE11

This is only because of the youth of the project, as the intended support should include Safari, Opera, and IE versions back to 9. Theoretically Opera should work out of the box, and the only thing that could impact Safari and IE9/10 is the setPrototypeOf polyfill that crio implements. Please report any issues that you encounter.
