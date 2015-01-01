var values = require('./values');
/*
	@desc: Bind all methods in object with context
	@return: Object with method binded
	@params: methods object, context (this)
*/
function _bindAll(methods, ctx) {
	var ret = {};
	for (var key in methods) {
		ret[key] = (typeof methods[key] !== "function" ? _bindAll(methods[key], ctx) : methods[key].bind(ctx));
	}
	return ret;
}

/*
	@desc: Constructor for Tester
	@return: new instance of module
	@params:
*/
function Tester() {
	this.exports = _bindAll(Tester.prototype, this);
	this.exports.values = values;
	return this.exports;
}

Tester.prototype.helpers = {
	/*
		@desc: Should return the power
		@return: true || false
		@params: number, base || 10 
	*/
	getPower: function (nb, base) {
		var pow = 0;
		base = base || 10;
		while (nb >= base) {
			nb = nb / base;
			++pow;
		}
		return pow;
	},
	/*
		@desc: Get a random item in array
		@return: One of the item
		@params: Array to get on item
	*/
	getRandomItem: function (arr) {
		return arr[this.exports.generate.integer(0, arr.length)];
	}
};

Tester.prototype.generate = {

	/*
		@desc: Return a random boolean
		@return: true || false
		@params: none
	*/
	boolean: function () {
		return ((Math.floor(Math.random() * 1000) % 2) ? true : false);
	},

	/*
		@desc: Return an integer
		@return: >= min && < max
		@params: min value, max value
	*/
	integer: function (min, max) {
		min = min || 0;
		max = max || Math.pow(10, (this.exports.helpers.getPower((min < 0 ? -min : min))) || 1);
		var number = min;
		var diff = -min + max - 1;
		var add = Math.floor(Math.random() * Math.pow(10, this.exports.helpers.getPower(max) + 1)) % diff;
		return number + add;
	},
	/*
		@desc: Generate a random name from value list
		@return: String
		@params: Gender (if any, taken randomly)
	*/
	name: function (gender) {
		gender = gender || (this.exports.generate.boolean() ? 'm' : 'f');
		return this.exports.helpers.getRandomItem(values.names[gender]);
	},
	/*
		@desc: Return a last name from value list
		@return: String
		@params: Gender (if any, taken randomly)
	*/
	lastName: function (gender) {
		return this.exports.helpers.getRandomItem(values.lastNames);
	},
	/*
		@desc: Return a valid email
		@return: String
		@params: none
	*/
	email: function () {
		var ret = this.exports.generate.name() + '.' + this.exports.generate.lastName() + '@' + this.exports.generate.domain();
		return ret.replace(/ /g, '').toLowerCase();
	},
	/*
		@desc: Return a domain from value list
		@return: String
		@params: None
	*/
	domain: function () {
		return this.exports.helpers.getRandomItem(values['domains']) + this.exports.helpers.getRandomItem(values['extensions']);
	},
	/*
		@desc: Return a website with www
		@return: String
		@params: None
	*/
	website: function () {
		return 'www.' + this.exports.generate.domain();
	},
	/*
		@desc: Return a word (unreadable, but still!)
		@return: String
		@params: Length of the word (if any, random);
	*/
	word: function (length) {
		length = length || this.exports.generate.integer(5,10);
		var word = '';
		for (var i = 0; i < length; ++i) {
			word += this.exports.helpers.getRandomItem(values['letters']);
		}
		return word;
	},
	/*
		@desc: Return a paragraph with random words
		@return: String
		@params: Words in paragraphs, Maximum length of paragraph
	*/
	paragraph: function (words, length) {
		words = words || this.exports.generate.integer(10, 52);
		var ret = this.exports.generate.word();
		for (var i = 0; i < words; ++i) {
			ret += ' ' + this.exports.generate.word();
			if (this.exports.generate.integer(0, 100) <= 10) {
				ret += '.';
			}
			else if (this.exports.generate.integer(0, 100) <= 20) {
				ret += ',';
			}
			if (ret.length + 10 >= length) {
				ret += ' ' + this.exports.generate.word((length - ret.length) - 2);
				break;
			}
		}
		ret += '.';
		return ret;
	}
};

module.exports = Tester;