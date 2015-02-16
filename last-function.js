require('array.prototype.find')

function lastFunction(args) {
	var arr = [].slice.call(args)
	return arr.reverse().find(function isFn(ele) {
		return typeof ele === 'function'
	})
}

module.exports = lastFunction
