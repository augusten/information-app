// Add some requirements to the file

const express 	 = require( 'express' )
const fs	     = require( 'fs' )
const bodyParser = require( 'body-parser' )
const objInList  = require( __dirname + '/created_modules/user-exist' )
const app 	     = express()
const path 		 = require( 'path' )

// include variable to parse input data
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set( 'view engine', 'pug' )
app.set( 'views', __dirname + '/views' )

//added to use static files, like css
app.use( express.static( 'includes' ) )

// GET request to list all the users in JSON file
app.get( '/users', ( req, res ) => {
	fs.readFile( __dirname + '/users.json', ( err, data ) => {
		if (err) throw err
		let parsedData = JSON.parse ( data )
		res.render( 'users', {data: parsedData, message: "Welcome to a random user list"})
	})
})

// GET request to search for use in JSON file
app.get( '/search', ( req, res ) => {
	res.render( 'search')
})


app.post( '/givethisback', urlencodedParser, ( req, res ) => {
	fs.readFile( __dirname + '/users.json', ( err, data ) => {
		if ( err ) throw err
		var input = req.body.data
		res.send(input)
	})
})


// POST request to search for input in JSON file
app.post('/result', urlencodedParser, function (req, res) {
	fs.readFile( __dirname + '/users.json', ( err, data ) => {
		if (err) throw err
		let matches = []
		let parsedData = JSON.parse ( data )
		res.render( 'result', { 
			data: parsedData, 
			inputData: [req.body.firstname, req.body.lastname] 
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
			res.redirect( 418, 'users' )
			// the below code changes the message for the user to see
			// res.render( 'users', {data: parsedData, message: "The user already exists!"} )
		} else {
			parsedData.push( newUser )
			fs.writeFile( 'users.json', JSON.stringify( parsedData ))
			res.redirect( 'users' )
			// the below code changes the message for the user to see
			// res.render( 'users', {data: parsedData, message: "You were successfully added!"} )
		}
	})
})

app.listen( 8000, () => {
	console.log( " I'm running" )
})

let obj = {name: "Guga", }