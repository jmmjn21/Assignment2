

const config = require('../config.js')
const utils = require('../helpers/utils.js')
const tokenService = require('../services/tokens.js')
const handlers = {}


handlers.tokens = function(reqObj, callback){
  const allowedMethod = ['get', 'post', 'put', 'delete']

  if(allowedMethod.indexOf(reqObj.method) >= 0){
    handlers._tokens[reqObj.method](reqObj, callback)
  }
  else{
    callback(405, {message: `Method ${reqObj.method} is forbidden, allowed methods [${allowedMethod}]`})
  }
}

handlers._tokens = {}


handlers._tokens.post = function(data, callback){
  const jsonObj = data.body
  const status = utils.checkRequest(jsonObj, config.postTokenRequiredField, config.postTokenOptionalField)
  if(status.code === 200){
    tokenService.create(jsonObj, callback)
  }
  else{
    callback(status.code, {message: status.message})
  }
}

handlers._tokens.get = function(data, callback){
  let jsonObj = data.queryParams
  const status = utils.checkRequest(jsonObj, config.getTokenRequiredField, config.getTokenOptionalField)
  if(status.code === 200){
    tokenService.get(jsonObj.id, callback)
  }
  else{
    callback(status.code, {message: status.message})
  }
}

handlers._tokens.put = function(data, callback){
  let jsonObj = data.body
  const status = utils.checkRequest(jsonObj, config.putTokenRequiredField, config.putTokenOptionalField)
  if(status.code === 200){
    tokenService.update(jsonObj.id, callback)
  }
  else{
    callback(status.code, {message: status.message})
  }
}

handlers._tokens.delete = function(data, callback){
  const pathParams = {
    id_token: data.pathParams[1]
  }
  let jsonObj = pathParams
  const status = utils.checkRequest(jsonObj, config.deleteTokenRequiredField, config.deleteTokenOptionalField)
  if(status.code === 200){
    tokenService.remove(jsonObj.id_token, callback)
  }
  else{
    callback(status.code, {message: status.message})
  }
}


module.exports = handlers
