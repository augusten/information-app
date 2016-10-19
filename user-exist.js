// A module with a function that checks if an object exists
// in a list. Returns either true of false

function objectExistInArray ( obj, array ) {
	for (var i = array.length - 1; i >= 0; i--) {
		if ( JSON.stringify(array[i]) == JSON.stringify(obj) ) {
			console.log('it is trueeeee')
			return true
		}
		// console.log(array[i])
		// console.log(typeof(array[i]))
		// console.log(obj)
		// console.log(typeof(obj))
	}
	// console.log(typeof(obj))
	// console.log(array[0])
	return false
}

module.exports = objectExistInArray