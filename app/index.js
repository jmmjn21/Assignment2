
const http = require('http')
const config = require('./config.js')
const utils = require('./helpers/utils.js')
const router = require('./routers/router.js')


const server = http.createServer((req, res) =>{
  middleware(req, res)
})

server.listen(config.port, () =>{
  console.log(`<<< Server is listening in >>> ${config.port}`)
})


const middleware = function (req, res) {
  let reqObject
  let body

  req.on('data', (data) =>{
    body = data
  })

  req.on('end', () =>{
    reqObject = utils.getRequestObject(req, body)
    const chosenHandler =  router[choseRouter(reqObject.path)]
    chosenHandler(reqObject, (statusCode, response) =>{
      statusCode = typeof(statusCode) === 'number' ? statusCode : 400
      response = typeof(response) === 'object' ? response : {}
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(statusCode)
      res.end(JSON.stringify(response))
    })
  })
}

const choseRouter = function(path){
  const operationNames = Object.keys(router)
  let myRoute = 'notFound' //default
  operationNames.map(name =>{
    if(path.indexOf(name) >= 0){
      myRoute = name
    }
  })
  return myRoute
}
