var test = require('tap').test
var bypass = require('../index.js')
var EventEmitter = require('events').EventEmitter

function begin(core) {
	core.emit('authentication initiated', { token: 'token' })
}

test('bypass works', function (t) {
	t.plan(1)
	var core = new EventEmitter
	core.authenticate = function goodToken2(token, cb){
		t.equal(token, 'token', 'token looks good')
		t.end()
	}
	bypass(core)
	begin(core)
})

function FakeCore() {
	var core = new EventEmitter()
	core.authenticate = function auth(token, cb) {
		cb(null, { sessionId: 'whatever', token: token })
	}
	return core
}

function goodToken(t) {
	return function (err, cred) {
		t.notOk(err, 'no error')
		t.equal(cred.token, 'token', 'token looks good')
		t.end()
	}
}

test('callback works', function (t) {
	var core = FakeCore(t)
	t.plan(2)
	bypass(core, goodToken(t))
	begin(core)
})

test('callback works with functions between', function (t) {
	var core = FakeCore()
	t.plan(2)
	function fail() { t.fail('should not call this') }
	bypass(core, fail, fail, fail, goodToken(t))
	begin(core)
})
