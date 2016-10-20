# crio API

## Instantiation

* crio `{any}`, returns *CrioArray|CrioObject*
    * Standard method, will `crio` the object passed if an array or object, else it will return the object itself
* crio.array `{Array<any>}`, returns *CrioArray*
    * Shortcut method for `crio`ing array-specific values
* crio.object `{Object}`, returns *CrioObject*
    * Shortcut method for `crio`ing object-specific values
* crio.isCrio `{any}`, returns *boolean*
    * Determine if the object passed is a `Crio`
* crio.isArray `{any}`, returns *boolean*
    * Determine if the object passed is a `CrioArray`
* crio.isObject `{any}`, returns *boolean*
    * Determine if the object passed is a `CrioObject`

Methods with the same name as the native method will be a link to MDN, as they are meant to be as similar to the native method as possible. Where any specific differences from the default behavior exist, they will be called out, however one broad difference is that all methods that are not getters which return primitive values are chainable.

## Arrays

#### Default Methods
* [concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
* [copyWithin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)
* [entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)
* [every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
* [fill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
    * Returns new crio with items from *start* to *end* filled with *value*
* [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
* [find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
* [findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
* [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
* [includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
    * Does a deep value equality comparison (rather than strict equality), so you can do things like `crioArray.includes({foo: 'bar'})`
* [indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
* [join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
* [keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)
* [lastIndexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
* [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
* [pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
    * Returns new crio with first item removed
* [push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
    * Returns new crio with new item added
* [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
* [reduceRight](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)
* [reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
* [shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
    * Returns new crio with last item removed
* [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
* [some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
* [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
    * Returns new crio sorted by either callback or default
* [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 
    * Returns new crio with items added/removed based on splicing parameters
* [toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)
* [toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)
* [unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) 
    * Returns new crio with new items added to beginning
* [values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values) 

#### Added crio Methods
* first `{number}` *num*, returns `{CrioArray}`
    * Returns a new array of the first *num* number of items in the array
* last `{number}` *num*, returns `{CrioArray}`
    * Returns a new array of the last *num* number of items in the array
* unique, returns `{CrioArray}`
    * Returns a new `CrioArray` of values filtered down to only existing in the array once

## Objects

#### Default Methods
* [hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
* [isPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)
* [propertyIsEnumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
* [toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString)
* [toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
* [valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)

#### Added crio Methods
* forEach `{function}` *fn*, `{any}` *thisArg*, returns `{CrioObject}`
    * Iterates over object executing *fn*
    * Iteration order is not guaranteed
* filter `{function}` *fn*, `{any}` *thisArg*, returns `{CrioObject}`
    * Iterates over object and filters out any returned values that are falsy
    * Iteration order is not guaranteed
* includes `{any}` *value*, returns `{boolean}`
    * Determine if the `CrioObject` has a value that deeply matches `value` in equality
* map `{function}` *fn*, `{any}` *thisArg*, returns `{CrioObject}`
    * Iterates over object and maps returned value to the respective key
    * Iteration order is not guaranteed
* reduce `{function(accumulatedObject, value, key): any}` *fn*, `{any}` *thisArg*, returns `{any}`
    * Performs same function as `reduce` in the `Array` prototype, but on the `CrioObject`
* reduceRight `{function(accumulatedObject, value, key): any}` *fn*, `{any}` *thisArg*, returns `{any}`
    * Performs same function as `reduceRight` in the `Array` prototype, but on the `CrioObject`
    
There are also a number of additional `crio`-specific methods that are available on both `CrioArray` and `CrioObject`.

#### Shared Methods
* clear, returns `{CrioArray|CrioObject}`
    * returns an empty `Crio`
* compact, returns `{CrioArray|CrioObject}`
    * returns a new `Crio` with all falsy values filtered out
* delete `{number}` *key*, returns `{CrioArray|CrioObject}`
    * Deletes the key provided from the crio object
* deleteIn `{Array<number|string>}` *keys*, returns `{CrioArray|CrioObject}`
    * Deletes the final key based on the array of keys nested inside of the crio object
* equals `{CrioArray|CrioObject}` *crioArrayToCompare*, returns `{boolean}`
    * Determines whether array is deeply equal in value to another by comparing hashCodes
* get `{number}` *key*, returns `{any}`
    * Retrieve value at key
* getIn `{Array<number|string>}` *keys*, returns `{any}`
    * Retrieve value in deeply nested object based on array of keys
* has `{string}` *key*, returns `{boolean}`
    * Alias for `hasOwnProperty`
* hasIn `{Array<number|string>}` *keys*, returns `{boolean}`
    * Does the `Crio` have the combination of *keys* assigned deeply
* hasOwnProperty `{string}` *key*, returns `{boolean}`
    * Does the `Crio` have the *key* assigned
* merge `{Object[, Object2, ..., ObjectN]}` *objects*, returns `{CrioArray|CrioObject}`
    * Shallow merge any number of items into existing crio
* mergeIn `{Array<number|string>}` *keys*, `{Object[, Object2, ..., ObjectN]}` *objects*, returns `{CrioArray|CrioObject}`
    * Shallow merge any number of items into value existing in deeply nested object based on array of keys
* mutate `{function(mutableCrio, originalCrio): any}` *callback*, returns `{CrioArray|CrioObject}`
    * Whatever you return in the callback is what is returned, or if you return nothing it returns the original `Crio`
* pluck `{number|string}` *key*, returns `{CrioArray|CrioObject}`
    * Iterates over `Crio` and returns an array of values where the *key* exists as a property on the collection item
* pluckIn `{Array<number|string}` *keys*, returns `{CrioArray|CrioObject}`
    * Iterates over `Crio` and returns an array of values where the *keys* map to a deeply-nested property on the collection item
* set `{number}` *key*, returns `{CrioArray|CrioObject}`
    * Sets value at key
* setIn `{Array<number|string>}` *keys*, returns `{CrioArray|CrioObject}`
    * Sets value in deeply nested object based on array of keys
* toArray, returns `{CrioArray}`
    * Converts `CrioObject` to a `CrioArray` of the object's values
* toObject, returns `{CrioObject}`
    * Converts `CrioArray` into a `CrioObject` of index: value pairs
* thaw, returns `{Array<any>}`
    * Recursively thaws array deeply and returns standard object version of itself
