var lastFunction = require('./last-function.js')

function bypass(core) {
	var cb = lastFunction(arguments) || function noop() {}
	core.on('authentication initiated', function authInit(credentials) {
		core.authenticate(credentials.token, cb)
	})
}

module.exports = bypass
