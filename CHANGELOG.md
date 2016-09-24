# crio changelog

#### 2.8.2
* Fix issue where `hash-it` was not being included as a dependency

#### 2.8.1
* Fix a couple issues centered around `.entries()` for both `CrioArray` and `CrioObject`

#### 2.8.0
* Switch to using `Symbol` instead of string key creation for internal `hashCode` and `type` properties to prevent potential naming conflicts

#### 2.7.1
* Update `hash-it` dependency

#### 2.7.0
* Replace native hashing with [hash-it](https://github.com/planttheidea/hash-it)

#### 2.6.1
* Updates to reduce the filesize of dist files
* Use standard source map for dev dist file

#### 2.6.0
* Add `first` and `last` functions to `CrioArray`
* Hashing optimizations by only using replacer function if ReactElement is included
* Fix a couple typos in README

#### 2.5.5
* Improve performance of `deleteIn`

#### 2.5.4
* Remove try / catch from hash function (performance improvement of ~11% across the board)
* Change native key checker to use map instead of array to avoid usage of indexOf

#### 2.5.3
* Micro-optimizations for cloning / merging arrays and objects

#### 2.5.2
* Improve performance of mapping ReactElements by not attempting to stringify it (recursive object, just assume its always new)

#### 2.5.1
* Fix ReactElements not being treated as immutable and attempting to be crioed

#### 2.5.0
* Add `forEach` to `CrioObject` API

#### 2.4.0
* Add `clear` to both `CrioArray` and `CrioObject` APIs
* Add `compact`, `pluck`, `toObject`, and `unique` to `CrioArray` API
* Add `filter`, `map`, and `toArray` to `CrioObject` API

#### 2.3.2
* Remove unneeded shallow clones for each instance of `mergeIn`

#### 2.3.1
* Performance improvements centered around `setIn`
* Fix `delete` / `deleteIn` bug when `NODE_ENV=production`

#### 2.3.0
* Add `delete` and `deleteIn` functions for both `CrioArray` and `CrioObject`
* Add `has` function for both `CrioArray` and `CrioObject` (checks if key passed exists in the object)

#### 2.2.2
* Apply polyfills for `copyWithin` and `fill` (before they only leveraged the existing prototype method, which failed on IE)
* Apparently `reverse` for `CrioArray`s got lost? Adding it back in

#### 2.2.1
* Prevent double-hashing when existing objects have changed
* Improve deep setting / merging function
* Fix several confusions with this vs thisArg in applied methods
* Improve speed of bitwise hashing mechanism

#### 2.2.0
* Turn of Object.freeze when NODE_ENV=production (performance)

#### 2.1.3
* Use try / catch with JSON.stringify for fastest and most consistent object-to-string conversion, will fallback to use stringifier when recursive
* Write more tests for new functions

#### 2.1.2
* Convert hash to use hashCode mechanism from Java (simpler, faster)

#### 2.1.1
* Version tick for update to README

#### 2.1.0
* Performance improvements
* Make hash SHA1-based

#### 2.0.2
* Fix behavior difference between .concat() and .push()

#### 2.0.1
* Switch `CrioArray.prototype.includes` to use bitwise operation instead of index !== -1 (performance)

#### 2.0.0
* Complete rewrite for performance and sustainability
* Full code coverage with AVA

#### 1.0.1
* Improve bug in .equals() to be recursive
* Change object to recursively apply crio rather than only for Arrays and Objects (for future state)
* Update tests for reduce and reduceRight

#### 1.0.0
* Initial release!
