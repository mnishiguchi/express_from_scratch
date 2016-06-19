// A built-in module that does magic under the hood.
var http = require( 'http' )

// Create a HTTP server with a callback function that takes two arguments:
// request and response.
var server = http.createServer( router )

// A callback function that is passed into the server.
function router( req, res ) {
  // End the response with the specified item.
  res.end( "Hello world\n" )
}

// Export an public API object that contains the listen method.
module.exports = function() {
  return {
    listen: function( port ) {
      server.listen( port )
    }
  }
}
