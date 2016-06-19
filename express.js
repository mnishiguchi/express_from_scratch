// A built-in module that does magic under the hood.
const http = require( 'http' )

// Create a HTTP server with a callback function that takes two arguments:
// request and response.
const server = http.createServer( router )

// Store a callback function for each combination of request method,
// path and callback.
// GET:
//   '/':      doWhat_1
//   '/greet': doWhat_2
const routes = {}

// A callback function that is passed into the server.
// The HTTP server will invoke this, passing req and res.
function router( req, res ) {

  /**
   * Sends the response with the specified data.
   * @param  {Any} data The data that is to be sent as a response.
   */
  res.send = ( data ) => {
    res.end( data )
  }

  /**
   * Sends the response with the specified data as JSON.
   * @param  {Any} data The data that is to be sent as a response.
   */
  res.json = ( data ) => {
    res.end( JSON.stringify( data ) )
  }

  // Determine action searching for a matching route.
  const action = routes[ req.method ][ req.url ]

  // Invoke the action
  action( req, res )
}

// Export an public API object that contains the listen method.
module.exports = function() {
  return {
    // Listen for the specified port.
    listen: function( port ) {
      server.listen( port )
    },
    // Register the specified path and action for GET.
    get: function( path, callback ) {
      routes.GET = routes.GET || {}
      routes.GET[ path ] = callback
    }
  }
}
