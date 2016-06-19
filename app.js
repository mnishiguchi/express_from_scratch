// Require my own local express.js file (not third-party library)
const express = require( './express' )
const app = express()
app.listen( 3000 )

// Define static routes.
// GET /greet
app.get( '/greet', ( req, res ) => {
  res.send( 'hey there!\n' )
})

// Serve json.
// GET /api
app.get( '/api', ( req, res ) => {
  // We can pass in any object we want to serve as JSON.
  res.json({
    one: 1,
    two: 2
  })
})

// Body parser
// POST /post
app.post( '/post', ( req, res ) => {
  res.json( req.body )
})



//---
// DONE
//---
// 1. hello world
// 2. static routes
// 3. serve json
// 4. body parser

//---
// TODO
//---
// 5. middleware
// 6. dynamic routes
