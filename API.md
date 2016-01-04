# crio API

As most of these methods are either Native or polyfilled to replicate native functions, instead most will be links to MDN to get what the default behavior is. Where any differences from the default behavior exist, they will be called out.

## Arrays

#### ES5 Methods
* [concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
* [every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
* [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
* [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
    * Can break the forEach by returning false in the callback function
* [indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
* [join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
* [lastIndexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
* [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
* [pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) *returns new CrioArray with first item removed*
* [push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) *returns new CrioArray with new item added*
* [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
* [reduceRight](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)
* [reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
* [shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) *returns new CrioArray with last item removed*
* [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
* [some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
* [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) *returns new CrioArray sorted by either callback or default*
* [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) *returns new CrioArray with items added/removed based on splicing parameters*
* [toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)
* [toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString) *returns a string representation of console.log rather than list of values*
* [unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) *returns new CrioArray with new items added to beginning*

#### ES2015 Methods
* [copyWithin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)
* [entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)
* [fill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
* [find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
* [findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
* [keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)
* [values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values)
* [Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/%40%40iterator)

#### ES2016 Methods
* [includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

#### crio Methods
* equals *returns boolean*
    * Determines whether array is deeply equal in value to another by comparing hashCodes
* freeze *returns CrioArray*
    * Recursively freezes array deeply
* get *accepts number/array, returns any*
    * Retrieve value at index of *keys*, or if an array checks for deeply nested object
* hashCode *returns number*
    * Get unique hash of array
* isFrozen *returns boolean*
    * Is the crio array in a frozen state
* mutate *accepts callback function, returns any*
   * Callback function accepts two parameters: mutated (plain JS) array, and the original CrioArray
   * Whatever you return in the callback is what is returned, or if you return nothing it returns the original CrioArray
* set *accepts number/array, returns CrioArray*
    * Set value at index of *keys*, or if an array sets deeply nested object (will create if does not exist)
    * Returns new crio array with values post-set
* thaw *returns CrioArray*
    * Recursively thaws array deeply
* toObject *returns CrioObject*
    * Converts crio array to crio object of {index: value} structure
* toJS *returns array*
    * Converts crio array to plain JavaScript Array

## Objects

#### ES5 Methods
* [hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
* [isPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)
* [propertyIsEnumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
* [toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString)
* [toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) *returns a string representation of console.log rather than list of values*
* [valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)

#### ES2015 Methods
N/A

#### ES2016 Methods
* keys *returns Iterator of all properties in the object*
* values *returns Iterator of all values in the object*

#### crio Methods
* equals *returns boolean*
    * Determines whether object is deeply equal in value to another by comparing hashCodes
* freeze *returns CrioObject*
    * Recursively freezes object deeply
* get *accepts number/array, returns any*
    * Retrieve value at index of *keys*, or if an array checks for deeply nested object
* hashCode *returns number*
    * Get unique hash of object
* isFrozen *returns boolean*
    * Is the crio object in a frozen state
* mutate *accepts callback function, returns any*
   * Callback function accepts two parameters: mutated (plain JS) object, and the original CrioObject
   * Whatever you return in the callback is what is returned, or if you return nothing it returns the original CrioObject
* set *accepts number/array, returns CrioObject*
    * Set value at index of *keys*, or if an array sets deeply nested object (will create if does not exist)
    * Returns new crio object with values post-set
* thaw *returns CrioObject*
    * Recursively thaws object deeply
* toArray *returns CrioArray*
    * Converts crio object to crio array of values
* toJS *returns object*
    * Converts crio object to plain Object
    
## Dates

#### ES5 Methods
* [getDate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate)
* [getDay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay)
* [getFullYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear)
* [getHours](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours)
* [getMilliseconds](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMilliseconds)
* [getMinutes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes)
* [getMonth](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth)
* [getSeconds](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getSeconds)
* [getTime](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)
* [getTimezoneOffset](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)
* [getUTCDate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDate)
* [getUTCDay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDay)
* [getUTCFullYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear)
* [getUTCHours](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCHours)
* [getUTCMilliseconds](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMilliseconds)
* [getUTCMinutes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMinutes)
* [getUTCMonth](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMonth)
* [getUTCSeconds](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCSeconds)
* [getYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getYear)
* [setDate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate) *returns a new CrioDate with values set rather than mutating original date*
* [setDay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDay) *returns a new CrioDate with values set rather than mutating original date*
* [setFullYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear) *returns a new CrioDate with values set rather than mutating original date*
* [setHours](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours) *returns a new CrioDate with values set rather than mutating original date*
* [setMilliseconds](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMilliseconds) *returns a new CrioDate with values set rather than mutating original date*
* [setMinutes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMinutes) *returns a new CrioDate with values set rather than mutating original date*
* [setMonth](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) *returns a new CrioDate with values set rather than mutating original date*
* [setSeconds](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setSeconds) *returns a new CrioDate with values set rather than mutating original date*
* [setTime](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setTime) *returns a new CrioDate with values set rather than mutating original date*
* [setTimezoneOffset](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setTimezoneOffset) *returns a new CrioDate with values set rather than mutating original date*
* [setUTCDate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCDate) *returns a new date with values set rather than mutating original date*
* [setUTCDay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCDay) *returns a new CrioDate with values set rather than mutating original date*
* [setUTCFullYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCFullYear) *returns a new CrioDate with values set rather than mutating original date*
* [setUTCHours](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCHours) *returns a new CrioDate with values set rather than mutating original date*
* [setUTCMilliseconds](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCMilliseconds) *returns a new CrioDate with values set rather than mutating original date*
* [setUTCMinutes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCMinutes) *returns a new CrioDate with values set rather than mutating original date*
* [setUTCMonth](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCMonth) *returns a new CrioDate with values set rather than mutating original date*
* [setUTCSeconds](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCSeconds) *returns a new CrioDate with values set rather than mutating original date*
* [setYear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setYear) *returns a new CrioDate with values set rather than mutating original date*
* [toDateString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toDateString)
* [toISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
* [toJSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON)
* [toLocaleDateString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)
* [toLocaleFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleFormat)
* [toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)
* [toLocaleTimeString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString)
* [toTimeString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toTimeString)
* [toUTCString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString)
* [valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/valueOf)
* [valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/valueOf)

#### ES2015 Methods
* [toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toString)

#### ES2015 Methods
N/A

#### crio Methods

#### crio Methods
* equals *returns boolean*
    * Determines whether object is deeply equal in value to another by comparing hashCodes
* freeze *returns CrioDate*
    * Recursively freezes object deeply
* hashCode *returns number*
    * Get unique hash of object
* isFrozen *returns boolean*
    * Is the crio object in a frozen state
* thaw *returns CrioDate*
    * Recursively thaws object deeply
* toJS *returns date*
    * Converts crio object to plain Object
