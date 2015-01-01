# teasier

Generate random values &amp; make testing easier

## Install

> npm install teasier

## How to use ?

After installing the plugin, just include it and create a new instance like this :

```javascript
// Include this plugin
var Teasier = require("teasier");

// Create a new instance
var teasier = new Teasier();
```

Then you can call all the methods with ```teasier```.
You have two namespaces :
 - Generators: Including methods for generating random values
 - Helpers: Including helpers for testing and other utility functions

## Methods (Generators)

### teasier.generate.boolean
---
Generate a random boolean

``` teasier.generate.boolean(void); ```

Return values :
 - true
 - false

```javascript
// Alternate loading
var teasier = new (require("teasier"))();

var bool = teasier.generate.boolean();
console.log(bool); // true or false
```

### teasier.generate.integer
---
Generate a random integer

``` teasier.generate.integer(Int min, Int max); ```

Parameters:
  - (Integer or null) min: Minimum or equal value for the returned random int (greater than or equal)
  - (Integer or null) max: Maximum value for the returned random int (lower than only)

Return values :
 - integer

```javascript
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
number = teasier.generate.integer(-100, -97);
console.log(number); // can be -100 -> -98
```
### teasier.generate.name
---
Generate a random name

``` teasier.generate.name(String gender); ```

Parameters:
  - *(String or null)* gender: "m" for male - "f" for female - nothing for random gender

Return values :
 - *String* (name)

```javascript
// Alternate loading
var teasier = new (require("teasier"))();

var name = teasier.generate.name();
console.log(name); // "Johanna" for example
```

### teasier.generate.domain
---
Generate a random domain name (*like github.com* for example)

``` teasier.generate.domain(void); ```

Return values :
 - *String* (domain)

```javascript
// Alternate loading
var teasier = new (require("teasier"))();

var domain = teasier.generate.domain();
console.log(domain); // "github.fr" for example
```
### teasier.generate.email
---
Generate a random email

``` teasier.generate.email(String name, String lastname); ```

Parameters:
  - *(String or null)* name: name for email
  - *(String or null)* lastname: lastname for email

Return values :
 - *String* (email)

```javascript
// Alternate loading
var teasier = new (require("teasier"))();

var email = teasier.generate.email();
console.log(email); // "johanna.delaroche@github.com" for example
```

### teasier.generate.word
---
Generate a random word

``` teasier.generate.word(Integer length); ```

Parameters:
  - *(Integer or null)* length: Word length

Return values :
 - *String* (word)

```javascript
// Alternate loading
var teasier = new (require("teasier"))();

var word = teasier.generate.word();
console.log(word); // Random unreadable word
```

### teasier.generate.paragraph
---
Generate a random paragraph

``` teasier.generate.word(Integer words, Integer length); ```

Parameters:
  - *(Integer or null)* words: Number of words in the paragraph
  - *(Integer or null)* length: Max length of the paragraph

Return values :
 - *String* (paragraph ended by a dot)

```javascript
// Alternate loading
var teasier = new (require("teasier"))();

var paragraph = teasier.generate.paragraph();
console.log(paragraph); // Random unreadable paragaph with space and a final dot.
```

## Methods (Helpers)

### teasier.helpers.getPower
---
Get power of a number

``` teasier.helpers.getPower(Integer number, Integer base); ```

Parameters:
  -  [**required**]*(Integer)* number: Number
  -  [**default**: 10]*(Integer or null)* base: Base for number

Return values :
 - *Integer* (power)

```javascript
// Alternate loading
var teasier = new (require("teasier"))();

var power = teasier.helpers.getPower(10);
console.log(power); // 1

power = teasier.helpers.getPower(256, 16);
console.log(power); // 2
```

### teasier.helpers.getRandomItem
---
Get random item in an array

``` teasier.helpers.getRandomItem(Array arr); ```

Parameters:
  -  [**required**]*(Array)* arr: Array to pick random number from

Return values :
 - (a random value from this arrray)

```javascript
// Alternate loading
var teasier = new (require("teasier"))();

var val = teasier.helpers.getRandomItem(["Marty McFly", "Doc Brown", "Jennifer Parker"]);
console.log(val); // "Marty McFly"
```

## A note about generators

Some random generator might increase your test execution time a little bit.If you really want Mocha (or any testing tools) to give you the exact execution time of your test, generate the values outside the test.

```javascript
var teasier = new (require("teasier"))();

suite('User', function () {
    var User = {};
    test('generate values', function (done) {
        User.gender = (teasier.generate.boolean() ? 'm' : 'f');
        User.name = teasier.generate.name(User.gender);
        User.age = teasier.generate.integer(null, 90);
        User.email = teasier.generate.email(User.name);
        done();
    });
	test('register', function (done) {
	    // do your stuff here
	    done();
	});
```
