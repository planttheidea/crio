# crio
Immutable JS objects with a natural API

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
These are examples with empty objects, but you can pass in populated objects as well. What crio does is freeze the object via [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze), and stores it with some metadata. For Dates and Arrays, the API is the same as you already know working with those objects, with the only difference is that each operation returns a new crio of the modified object. In the case of Objects, the API follows the [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) API, and also returns a new crio after each operation.

