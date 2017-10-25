# crio changelog

#### 4.1.0
* Add `es` transpilation in addition to standard `lib`, preserving ES2015 modules for [`pkg.module`](https://github.com/rollup/rollup/wiki/pkg.module)
* Fix issue related to spread operator used for shallow clones in node environment

#### 4.0.0
* Complete rewrite, leveraging lodash wherever possible
* Massive speed improvement (over 70% in certain cases)
* Added `findKey` and `findLastKey` for `CrioObject`s
* Breaking changes
  * `length` is now exclusive to `CrioArray`, `size` is the property on `CrioObject` (prevents lodash from incorrectly identifying it as an array)
  * `merge` and `mergeIn` are now recursive instead of shallow
  * `hashCode` is now computed at runtime based on current object
  * No reconciliation between pre- and post-transformation takes place now (always creates a new `Crio`)

#### 3.4.3
* Update hash-it dependency for faster hash creation

#### 3.4.2
* Failed publish

#### 3.4.1
* Add `lodash-webpack-plugin` for smaller `dist` builds

#### 3.4.0
* Add `every` and `some` for `CrioObject` (same as for Arrays, but for object collections)

#### 3.3.2
* Simplify shallow cloning with value assignment in `set` method (5-13% performance improvement)

#### 3.3.1
* Prevent `delete` and `deleteIn` from making clones when key being deleted does not exist
* Optimize `isReactElement` check
* Documentation to include `entries`, `keys`, and `values` for `CrioObject`

#### 3.3.0
* Added `difference`, `intersection`, and `xor` to the available methods for `CrioArray`

#### 3.2.0
* Added `hasIn` and `pluckIn` to the available methods for both `CrioArray` and `CrioObject`

#### 3.1.0
* Return `pluck` to prototypes
* Add `pluck` as available for `CrioObject`
* Add `isCrio`, `isArray`, and `isObject` method to main `crio` method

#### 3.0.0
* Complete rewrite for better performance, scalability, testability, and code management
* `compact`, `has`, `hasOwnProperty`, and `includes` now are available on both `CrioArray` and `CrioObject`
* More accurate implementation of `entries`, `keys`, `values`, and iterators
* Performance improvement of ~25% in high-volume scenarios
* Far superior test coverage

#### 2.8.2
* Fix issue where `hash-it` was not being included as a dependency
* Modify `forEach` and `forEachRight` to be recursive functions instead of `while` loops

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
