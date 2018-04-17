/**
 * Make a json async request
 * @param  {String} uri     API route
 * @param  {String} method  HTTP method
 * @param  {Object} options optional parameters
 * @return {Promise}
 */
const myFetch = (uri, method, body) => {
  const init = {
    headers: {
      'Content-type': 'application/json'
    },
    method
  }

  if (body) {
    init.body = JSON.stringify(body)
  }

  return fetch(uri, init)
}

module.exports = { myFetch }
