# just-login-bypass

[![Build Status](https://travis-ci.org/ArtskydJ/just-login-bypass.svg?branch=master)](https://travis-ci.org/ArtskydJ/just-login-bypass)
[![Dependency Status](https://david-dm.org/artskydj/just-login-bypass.svg)](https://david-dm.org/artskydj/just-login-bypass)
[![devDependency Status](https://david-dm.org/artskydj/just-login-bypass/dev-status.svg)](https://david-dm.org/artskydj/just-login-bypass#info=devDependencies)

When developing an application that uses [Just Login][jlxyz], use this to bypass authentication in dev

A replacement for the [just-login-emailer][jle]. Instead of emailing you when you click 'Login', it will just log you in as whomever. Don't use this in production. :)

With npm do:

```
npm install just-login-bypass
```

# api

```js
var bypass = require('just-login-bypass')
```

## bypass(core, [...,] [cb])

Takes a [just-login-core][jlc] object.

The last function passed in is used as a callback.

Any other options are ignored, so you can use it instead of the [just-login-emailer][jle].

# example

*index.js*
```js
var PROD = !(process.env.dev || process.argv[2] === '--dev')

var Level = require('level')
var JustLogin = require('just-login-core')
var customEmails = require('./custom-emailer-opts.js')
var emailer = require( PROD ? 'just-login-emailer' : 'just-login-bypass' )

var db = new Level('./database')
var core = JustLogin(db)

customEmails(core, emailer)
```

*custom-emailer-opts.js*
```js
module.exports = function customEmails(core, emailer) {
	function makeEmail(token) {
		return 'Copy & paste this into your browser: ' +
			'http://example.com/login?token=' + token
	}
	var transportOpts = {
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: { user: "sender@gmail.com", pass: "pass" }
	}

	var mailOpts = { from: 'sender@gmail.com', subject: 'sign in' }

	emailer(core, makeEmail, transportOpts, mailOpts, function (err, info) {
		if (err) console.error(err)
	})
}
```


# license

[VOL][vol]

[jlxyz]: http://justlogin.xyz
[jlc]: https://github.com/coding-in-the-wild/just-login-core
[jle]: https://github.com/coding-in-the-wild/just-login-emailer
[vol]: http://veryopenlicense.com
