/**
 * Parses incoming data, then invokes the callback once it is all parsed.
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Function} callback
 */
 function bodyParser( req, res, next ) {

  // Temp storage for all the incoming data on the request.
  let temp = []

  // Listen for `data` event on the request.
  req.on( 'data', incomingData => {
    // Push it to the temp array.
    temp.push( incomingData )
  })
  // Once the request ends...
  .on( 'end', () => {
    // 1. Convert the chunk of data into string.
    let queryString = Buffer.concat( temp ).toString()
    console.log("Query string: %s", queryString)

    // 2. Convert the string into an object (key-value pairs).
    queryString.split( '&' ).forEach( paramItem => {
      // Create an array of key and value.
      let pair = paramItem.split( '=' )

      // Create a new object if `req.body` is not already defined.
      req.body = req.body || {}

      // Add the key value pair to `req.body`.
      req.body[ pair[ 0 ] ] = pair[ 1 ]
    })

    // 3. Invoke the callback function.
    next( req, res )
  })
}

module.exports = bodyParser
