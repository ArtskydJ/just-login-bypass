# just-login-bypass

> When developing an application that uses [Just Login][jlxyz], use this to bypass authentication during dev.

[![Build Status](https://travis-ci.org/ArtskydJ/just-login-bypass.svg?branch=master)](https://travis-ci.org/ArtskydJ/just-login-bypass)

A replacement for the [just-login-emailer][jle]. Instead of emailing you when you click 'Login', it will just log you in as whomever. Don't use this in production. :)

# api

```js
var bypass = require('just-login-bypass')
```

## `bypass(core, [...,] [cb])`

Takes a [just-login-core][jlc] object.

The last function passed in is used as a callback. If no callback is supplied, and an error occurs, it is ignored.

Any other options are ignored, so you can use it instead of the [just-login-emailer][jle].

# example

*index.js*
```js
var PROD = !!process.env.prod

var Level = require('level')
var JustLogin = require('just-login-core')
var emailer = require( PROD ? 'just-login-emailer' : 'just-login-bypass' )
var transportOpts = require('./transport-config.json')
var mailOpts = require('./mail-config.json')

var core = JustLogin(new Level('./database'))

function makeEmail(token) {
	return '<a href="http://example.com/login?token=' + token + '">Click me</a>'
}

emailer(core, makeEmail, transportOpts, mailOpts, function (err, info) {
	if (err) console.error(err)
})
```

# install

With [npm](https://nodejs.org/download) do:

```
npm install just-login-bypass
```


# license

[VOL](http://veryopenlicense.com)

[jlxyz]: http://justlogin.xyz
[jlc]: https://github.com/coding-in-the-wild/just-login-core
[jle]: https://github.com/coding-in-the-wild/just-login-emailer
