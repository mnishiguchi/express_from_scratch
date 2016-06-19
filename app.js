// Require my own local express.js file (not third-party library)
var express = require( './express' )
var app = express()
app.listen( 3000 )

// Define static routes.
app.get( '/greet', function( req, res ) {
  res.send( 'hey there!\n' )
})

//---
// DONE
//---
// 1. hello world
// 2. static routes

//---
// TODO
//---
// 3. serve json
// 4. body parser
// 5. middleware
// 6. dynamic routes
