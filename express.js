// A built-in module that does magic under the hood.
const http = require( 'http' )

// Create a HTTP server with a callback function that takes two arguments:
// request and response.
const server = http.createServer( router )

// A storage for a callback function for each combination of request method,
// path and callback.
// GET:
//   '/':      doWhat_1
//   '/greet': doWhat_2
let routes = {}

// A queue for middlewares.
let middlewareQueue = []

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

  // Go through all the middlewares.
  // NOTE: In order to retain the original middleware queue intact,
  // make a copy of the queue. Otherwise, the queue would be undefined when
  // the function is invoked multiple times.
  when( [...middlewareQueue], () => {
    // Determine action searching for a matching route.
    const action = routes[ req.method ][ req.url ]

    // Invoke the action.
    action( req, res )
  })

  /**
   * Executes each middleware that is registered in the middeleware queue.
   * @param  {Array<Function>}   middlewareFuncs
   * @param  {Function} callback
   */
  function when( middlewareFuncs, callback ) {
    if ( middlewareFuncs.length ) { // Zero is falsey.
      // Invoke the first item.
      middlewareFuncs[ 0 ]( req, res, () => {
        // Pop the queue and call itself recursively.
        middlewareFuncs.shift()
        when( middlewareFuncs, callback )
      })

    } else {
      callback()
    }
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
    },
    use: func => {
      middlewareQueue.push( func )
    }
  }
}
