
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder


var getRequestObject = function (req, data){
  const parsedUrl = url.parse(req.url, true)
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g,'')
  const method = req.method.toLowerCase()
  const queryParams = parsedUrl.query
  const pathParams = path.split('/')
  const headerParams = req.headers
  const decoder = new StringDecoder('utf-8', true)
  let body = ''
  data = typeof(data) !== 'undefined' ? data : ''
  body += decoder.write(data)

  let outputObject = {
    path: path,
    method: method,
    queryParams: queryParams,
    pathParams: pathParams,
    headerParams: headerParams,
    body: body
  }
  return outputObject
}

module.exports = {
  getRequestObject
}
