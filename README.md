teasier
=======

Generate random values &amp; make testing easier

## Install

> npm install teasier

## How to use ?

After installing the plugin, just include it and create a new instance like this :

```
// Include this plugin
var Teasier = require("teasier");

// Create a new instance
var teasier = new Teasier();
```

Then you can call all the methods with ```teasier```.
You have two namespaces :
 - Generators: Including methods for generating random values
 - Helpers: Including helpers for testing and other utility functions

### Methods (Generators)

#### teasier.generate.boolean
Generate a random boolean

``` teasier.generate.boolean(void); ```

Return values :
 - true
 - false

```
// Alternate loading
var teasier = new (require("teasier"))();

var bool = teasier.generate.boolean();
console.log(bool); // true or false
```

#### teasier.generate.integer
Generate a random integer

``` teasier.generate.boolean(Int min, Int max); ```

Parameters:
  - (Integer or null) min: Minimum or equal value for the returned random int (greater than or equal)
  - (Integer or null) max: Maximum value for the returned random int (lower than only)

Return values :
 - integer

```
// Alternate loading
var teasier = new (require("teasier"))();

var number = teasier.generate.integer();
console.log(number); // Can be any number

number = teasier.generate.integer(2, 5);
console.log(number); // can be 2 -> 4

number = teasier.generate.integer(null, 5);
console.log(number); // can be * -> 4

number = teasier.generate.integer(null, 5);
console.log(number); // can be * -> 4

// You can also generate negative numbers
number = teasier.generate.integer(-500, 5);
console.log(number); // can be * -> 4
```
