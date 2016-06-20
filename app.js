// Require my own local express.js file (not third-party library)
const express = require( './express' )
const app = express()
const bodyParser = require( './body-parser' )

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
  console.log( req.pizza );
  res.json( req.body )
})

// Middleware
// Each middleware must invoke its next callback.
app.use( bodyParser )
app.use( ( req, res, next ) => {
  req.pizza = "Yummy"
  next()
})



//---
// DONE
//---
// 1. hello world
// 2. static routes
// 3. serve json
// 4. body parser
// 5. middleware

//---
// TODO
//---
// 6. dynamic routes
