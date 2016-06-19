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

  // Parse body before invoking the action.
  parseBody( req, res, () => {
    // Determine action searching for a matching route.
    const action = routes[ req.method ][ req.url ]

    // Invoke the action.
    action( req, res )
  })

  /**
   * Parses incoming data, then invokes the callback once it is all parsed.
   * @param  {Object} req
   * @param  {Object} res
   * @param  {Function} callback
   */
  function parseBody( req, res, callback ) {
    let body = []
    req.on( 'data', d => {
      body.push( d )
    })
    .on( 'end', () => {
      let queryString = Buffer.concat( body ).toString()
      console.log("Query string: %s", queryString)

      queryString.split( '&' ).forEach( paramItem => {
        // Create an array of key and value.
        let pair = paramItem.split( '=' )

        // Create a new object if `req.body` is not already defined.
        req.body = req.body || {}

        // Add the key value pair to `req.body`.
        req.body[ pair[ 0 ] ] = pair[ 1 ]
      })

      callback( req.body )
    })
  }
}

// Export an public API object that contains the listen method.
module.exports = () => {
  return {
    // Listen for the specified port.
    listen: ( port ) => {
      server.listen( port )
    },
    // Register the specified path and action for GET.
    get: ( path, callback ) => {
      routes.GET = routes.GET || {}
      routes.GET[ path ] = callback
    },
    post: ( path, callback ) => {
      routes.POST = routes.POST || {}
      routes.POST[ path ] = callback
    }
  }
}
