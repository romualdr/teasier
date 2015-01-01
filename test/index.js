var should = require('should');
var Tester = require('../index');
var tester;

suite('Initialization', function () {
	test('Should create an instance for this test', function (done) {
		tester = new Tester();
		done();
	});
});

suite('Helpers', function () {
	suite('helpers.getPower', function () {
		test('Should find power === 0', function (done) {
			var power = tester.helpers.getPower(0);
			power.should.eql(0);
			done();
		});
		test('Should find power === 1', function (done) {
			var power = tester.helpers.getPower(10);
			power.should.eql(1);
			done();
		});
		for (var i = 0; i < 10; ++i) {
			(function (i) {
				test('Should find (' + (5 * (Math.pow(10, i))) + ') power === ' + i, function (done) {
					var power = tester.helpers.getPower(5 * (Math.pow(10, i)));
					power.should.eql(i);
					done();
				});
			})(i);
		}
	});
	suite('helpers.getRandomItem', function () {
		test('Should get random item from arr', function (done) {
			var arr = ['apple', 'banana', 'orange', 'pear'];
			for (var i =0; i < 1000; ++i) {
				arr.should.containEql(tester.helpers.getRandomItem(arr));
			}
			done();
		});
	});
});

// return suite('SPECIAL', function () {
// 	suite('Special test case', function () {
// 		test('Should launch function', function (done) {
// 			var nb = 500;
// 			var ret = {};
// 			for (var i = 0; i < nb; ++i) {
// 				var result = tester.generate.integer(-10, 10);
// 				ret[result] = (ret[result] ? ret[result] + 1 : 1);
// 			}
// 			console.log(ret);
// 			done();
// 		});
// 	});
// });

suite('Generators', function () {

	suite('generate.boolean', function () {
		test('Generator should exist', function (done) {
			should.exist(tester.generate.boolean);
			done();
		});

		test('Should generate a false withing 50 iterations', function (done) {
			for (var i = 0; i < 50; ++i) {
				var _ret = tester.generate.boolean();
				(typeof _ret).should.eql('boolean');
				if (_ret === false)
					return done();
			}
			return (true).should.eql(false, 'No false value found.');
		});

		test('Should generate true within 50 iterations', function (done) {
			for (var i = 0; i < 50;++i) {
				var _ret = tester.generate.boolean();
				(typeof _ret).should.eql('boolean');
				if (_ret === true)
					return done();
			}
			return (false).should.eql(true, 'No true value found.');
		});
	});

	suite('generate.integer', function () {
		var _test;

		test('Generator should exist', function (done) {
			should.exist(tester.generate.integer);
			done();
		});

		test('Should generate a random number', function (done) {
			_test = tester.generate.integer();
			should.exist(_test);
			should.exist(_test);
			(typeof _test).should.eql("number");
			done();
		});

		test('Should generate another random number', function (done) {
			var nb = tester.generate.integer();
			should.exist(nb);
			(typeof nb).should.eql("number");
			done();
		});

		test('Should generate a random number min 1', function (done) {
			var nb = tester.generate.integer(1);
			(nb >= 1).should.be.true;
			done();
		});

		test('Should generate a random number max 10', function (done) {
			var nb = tester.generate.integer(null, 10);
			(nb < 10).should.be.true;
			done();
		});

		test('Should generate a random number between 5 and 7', function (done) {
			var nb = tester.generate.integer(5, 7);
			(nb >= 5 && nb < 7).should.be.true;
			done();
		});

		test('Should generate a 6 with 1000 iterations', function (done) {
			for (var i = 0; i < 1000; ++i) {
				var nb = tester.generate.integer(null, 10);
				if (nb === 6)
					return done();
			}
			(1).should.eql(0, 'No number 6 found.');
		});
		test('Should generate numbers without one being flooded', function (done) {
			var tests = {};
			for (var i = 0; i < 1000; ++i) {
				var ret = tester.generate.integer(0, 100);
				tests[ret] = (tests[ret] || 0) + 1;
			}
			for (var number in tests) {
				tests[number] = (100 * tests[number]) / 1000;
				tests[number].should.not.be.above(3);
			}
			done();
		});
	});

	suite('generate.name', function () {
		test('Should generate a random male name', function (done) {
			tester.values.names['m'].should.containEql(tester.generate.name('m'));
			done();
		});
		test('Should generate a random female name', function (done) {
			tester.values.names['f'].should.containEql(tester.generate.name('f'));
			done();
		});
		test('Should generate a random name', function (done) {
			var values = tester.values.names['f'].concat(tester.values.names['m']);
			for (var i = 0; i < 1200; ++i) {
				values.should.containEql(tester.generate.name());
			}
			done();
		});
	});

	suite('generate.domain', function () {
		var match = new RegExp(/([a-z0-9]{3,}\.[a-z]{2,3})/)
		test('RegExp test should be true', function (done) {
			match.test('google.com').should.be.true;
			done();
		});
		test('RegExp test should be false', function (done) {
			match.test('lol').should.be.false;
			done();
		});
		test('Should generate a domain', function (done) {
			for (var i = 0; i < 1000; ++i) {
				var reg = match.test(tester.generate.domain());
				reg.should.be.true;
			}
			done();
		});
	});

	suite('generate.email', function () {
		var match = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])");
		test('RegExp test should be true', function (done) {
			match.test('dafunix@gmail.com').should.be.true;
			done();
		});
		test('RegExp test should be false', function (done) {
			match.test('Salut').should.be.false;
			done();
		});
		test('Should generate a mail', function (done) {
			for (var i = 0; i < 1000; ++i) {
				var reg = match.test(tester.generate.email());
				reg.should.be.true;
			}
			done();
		});
	});

	suite('generate.word', function () {
		test('Should generate a word within length', function (done) {
			for (var i = 0; i < 1000; ++i) {
				var word = tester.generate.word(5);
				word.length.should.eql(5);
			}
			done();
		});
	});

	suite('generate paragraph', function () {
		test('Should generate a paragraph', function (done) {
			var par = tester.generate.paragraph(50, 50);
			par.length.should.eql(50);
			done();
		});
	});
});