// A module with a function that checks if an object exists
// in a list. Returns either true of false

function objectExistInArray ( obj, array ) {
	for (var i = array.length - 1; i >= 0; i--) {
		// check if objects are equal
		if ( JSON.stringify(array[i]) == JSON.stringify(obj) ) {
			console.log('it is trueeeee')
			return true
		}
	}
	return false
}

module.exports = objectExistInArray