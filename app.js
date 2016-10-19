// Add some requirements to the file

const express 	 = require( 'express' )
const fs	     = require( 'fs' )
const bodyParser = require( 'body-parser' )
const objInList  = require( __dirname + '/user-exist' )
const app 	     = express()

// include variable to parse input data
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set( 'view engine', 'pug' )
app.set( 'views', __dirname + '/views' )

// GET request to list all the users in JSON file
app.get( '/users', ( request, response ) => {
	console.log( 'About to show users' )
	fs.readFile( __dirname + '/users.json', ( err, data ) => {
		if (err) throw err
		let parsedData = JSON.parse ( data )
		response.render( 'users', {data: parsedData, message: "Welcome to a random user list"})
	})
})

// GET request to search for use in JSON file
app.get( '/search', ( request, response ) => {
	response.render( 'search') //{data: parsedData}
	console.log( 'Someone is about to search for a user' )

})

// POST request to search for input in JSON file
app.post('/result', urlencodedParser, function (request, response) {
	fs.readFile( __dirname + '/users.json', ( err, data ) => {
		if (err) throw err
		let matches = []
		let parsedData = JSON.parse ( data )
		response.render( 'result', { 
			data: parsedData, 
			inputData: [request.body.firstname, request.body.lastname] 
		})
	})

})

// app.get to show a form 
app.get( '/create', ( req, res ) => {
	res.render( 'createuser' )
})

// POST when the addition of a user is made
app.post( '/users', urlencodedParser, ( req, res ) => {
	fs.readFile( __dirname + '/users.json', ( err, data ) => {
		if (err) throw err
		let parsedData = JSON.parse ( data )
		let newUser = { 
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email }
		// add condition to add user only if they are not in the JSON file yet
		if ( objInList ( newUser, parsedData ) )
		{
			console.log('the user exists')
			res.render( 'users', {data: parsedData, message: "The user already exists!"} )
		} else {
			parsedData.push( newUser )
			fs.writeFile( 'users.json', JSON.stringify( parsedData ))
			res.render( 'users', {data: parsedData, message: "you were successfully added!"} )
		}
	})
})

app.listen( 8000, () => {
	console.log( " I'm running" )
})