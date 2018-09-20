

const config = require('../config.js')
const utils = require('../helpers/utils.js')
const orderService = require('../services/orders.js')
const tokenService = require('../services/tokens.js')
const handlers = {}


handlers.orders = function(reqObj, callback){
  const allowedMethod = ['post']

  if(allowedMethod.indexOf(reqObj.method) >= 0){
    handlers._orders[reqObj.method](reqObj, callback)
  }
  else{
    callback(405, {message: `Method ${reqObj.method} is forbidden, allowed methods [${allowedMethod}]`})
  }
}

handlers._orders = {}


handlers._orders.post = function(data, callback){
  const pathParams = {
    id_user: data.pathParams[1]
  }
  let jsonObj = pathParams
  const status = utils.checkRequest(jsonObj, config.postOrderRequiredField, config.postOrderOptionalField)
  if(status.code === 200){
    let token = typeof(data.headerParams.token) === 'string' ? data.headerParams.token : false
    tokenService.verify(token, jsonObj.id_user, (valid) =>{
      if(valid){
        orderService.create(jsonObj, callback)
      }
      else{
        callback(403, {message: `Invalid token`})
      }
    })
  }
  else{
    callback(status.code, {message: status.message})
  }
}


module.exports = handlers
