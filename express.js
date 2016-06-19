// A built-in module that does magic under the hood.
var http = require( 'http' )

// Create a HTTP server with a callback function that takes two arguments:
// request and response.
var server = http.createServer( router )

// Store a callback function for each combination of request method,
// path and callback.
// GET:
//   '/':      doWhat_1
//   '/greet': doWhat_2
var routes = {}

// A callback function that is passed into the server.
// The HTTP server will invoke this, passing req and res.
function router( req, res ) {

  // Obtain information about the request.
  var method = req.method
  var url    = req.url

  // Determine the action based on the request's route.
  var action = routes[ method ][ url ]
  action( req, res )

  /**
   * Sends the response with the specified data.
   * @param  {Any} data The data that is to be sent as a response.
   */
  res.send = function( data ) {
    res.end( data )
  }
}

// Export an public API object that contains the listen method.
module.exports = function() {
  return {
    listen: function( port ) {
      server.listen( port )
    },
    get: function( path, callback ) {
      // Register the specified path and action for GET.
      routes.GET = routes.GET || {}
      routes.GET[ path ] = callback
    }
  }
}
