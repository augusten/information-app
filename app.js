const express 	 = require( 'express' )
const fs	     = require( 'fs' )
const bodyParser = require( 'body-parser' )
const app 	     = express()

// include variable to parse input data!
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set( 'view engine', 'pug' )
app.set( 'views', __dirname + '/views' )

// GET request to list all the users in JSON file
app.get( '/users', ( request, response ) => {
	console.log( 'About to show users' )
	// response.render( 'index' )
	fs.readFile( __dirname + '/users.json', ( err, data ) => {
		if (err) throw err
		let parsedData = JSON.parse ( data )
		response.render( 'users', {data: parsedData})
	})
})

// GET request to search for use in JSON file
app.get( '/search', ( request, response ) => {
	console.log( 'Someone is about to search for a user' )
	fs.readFile( __dirname + '/users.json', ( err, data ) => {
		if (err) throw err
		let parsedData = JSON.parse ( data )
		response.render( 'search', {data: parsedData})
	})
})

// POST request to search for input in JSON file
app.post('/result', urlencodedParser, function (request, response) {
	fs.readFile( __dirname + '/users.json', ( err, data ) => {
		if (err) throw err
		let parsedData = JSON.parse ( data )
		response.render( 'result', { 
			data: parsedData, 
			inputData: [request.body.firstname, request.body.lastname] 
		})
	})

})

app.listen( 8000, () => {
	console.log( " I'm running" )
})