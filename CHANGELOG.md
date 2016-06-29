# crio changelog

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