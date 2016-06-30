# crio API

As most of these methods replicate (or just use) the native method, most will be links to MDN to better describe how to use them. Where any specific differences from the default behavior exist, they will be called out, however one broad difference is that all methods that are not getters which return primitive values are chainable.

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

#### crio Methods
* delete `{number}` *key*, returns `{CrioArray}`
   * Deletes the key provided from the crio object
* deleteIn `{array<number|string>}` *keys*, returns `{CrioArray}`
   * Deletes the final key based on the array of keys nested inside of the crio object
* equals returns `{boolean}`
   * Determines whether array is deeply equal in value to another by comparing hashCodes
* get `{number}` *key*, returns `{any}`
   * Retrieve value at key
* getIn `{array}` *keys*, returns `{any}`
   * Retrieve value in deeply nested object based on array of keys
* merge `{object[, object2, ..., objectN]}` *objects*, returns `{CrioArray}`
    * Shallow merge any number of items into existing crio
* mergeIn `{array}` *keys*, `{object[, object2, ..., objectN]}` *objects*, returns `{CrioArray}`
    * Shallow merge any number of items into value existing in deeply nested object based on array of keys
* mutate `{function(mutableCrio, originalCrio): any}` *callback*, returns `{CrioArray}`
   * Whatever you return in the callback is what is returned, or if you return nothing it returns the original `CrioArray`
* set `{number}` *key*, returns `{CrioArray}`
   * Sets value at key
* setIn `{array<number|string>}` *keys*, returns `{CrioArray}`
   * Sets value in deeply nested object based on array of keys
* thaw returns `{array<any>}`
   * Recursively thaws array deeply and returns standard object version of itself

## Objects

#### Default Methods
* [hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
* [isPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)
* [propertyIsEnumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
* [toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString)
* [toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
* [valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)

#### crio Methods
* delete `{tring}` *key*, returns `{CrioObject}`
   * Deletes the key provided from the crio object
* deleteIn `{array<number|string>}` *keys*, returns `{CrioObject}`
   * Deletes the final key based on the array of keys nested inside of the crio object
* equals returns `{boolean}`
   * Determines whether array is deeply equal in value to another by comparing hashCodes
* get `{string}` *key*, returns `{any}`
   * Retrieve value at key
* getIn `{array}` *keys*, returns `{any}`
   * Retrieve value in deeply nested object based on array of keys
* merge `{object[, object2, ..., objectN]}` *objects*, returns `{CrioObject}`
    * Shallow merge any number of items into existing crio
* mergeIn `{array}` *keys*, `{object[, object2, ..., objectN]}` *objects*, returns `{CrioObject}`
    * Shallow merge any number of items into value existing in deeply nested object based on array of keys
* mutate `{function(mutableCrio, originalCrio): any}` *callback*, returns `{CrioObject}`
   * Whatever you return in the callback is what is returned, or if you return nothing it returns the original `CrioOjbect`
* set `{string}` *key*, returns `{CrioObject}`
   * Sets value at key
* setIn `{array}` *keys*, returns `{CrioObject}`
   * Sets value in deeply nested object based on array of keys
* thaw returns `{object}`
   * Recursively thaws array deeply and returns standard object version of itself
