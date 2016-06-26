# crio changelog

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