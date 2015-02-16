var test = require('tap').test
var lastFunction = require('../last-function.js')


test('last-function.js works with an array', function (t) {
	function no() { t.fail('this should not get called') }
	function yes() { t.pass('this should get called') }
	t.plan(1)
	lastFunction([ null, no, yes, { wat: no } ])()
	t.end()
})


test('last-function.js works with an array-like object', function (t) {
	function no() { t.fail('this should not get called') }
	function yes() { t.pass('this should get called') }
	t.plan(1)
	lastFunction({ '0': null, '1': no, '2': yes, '3': { wat: no }, length: 5 })()
	t.end()
})


test('last-function.js works with arguments object', function (t) {
	function no() { t.fail('this should not get called') }
	function yes() { t.pass('this should get called') }
	t.plan(1)
	;(function(){ lastFunction(arguments)() })(null, no, yes, { wat: no })
	t.end()
})
