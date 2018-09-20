

const config = require('../config.js')
const utils = require('../helpers/utils.js')
const tokenService = require('../services/tokens.js')
const userService = require('../services/users.js')
const handlers = {}


handlers.users = function(reqObj, callback){
  const allowedMethod = ['get', 'post', 'put', 'delete']

  if(allowedMethod.indexOf(reqObj.method) >= 0){
    handlers._users[reqObj.method](reqObj, callback)
  }
  else{
    callback(405, {message: `Method ${reqObj.method} is forbidden, allowed methods [${allowedMethod}]`})
  }
}

handlers._users = {}


handlers._users.post = function(data, callback){
  let jsonObj = data.body

  const status = utils.checkRequest(jsonObj, config.postUserRequiredField, config.postUserOptionalField)
  if(status.code === 200){
    jsonObj.cart = []
    jsonObj.orders = []
    userService.create(jsonObj, callback)
  }
  else{
    callback(status.code, {message: status.message})
  }
}

handlers._users.get = function(data, callback){
  const pathParams = {
    id_user: data.pathParams[1]
  }
  let jsonObj = pathParams
  const status = utils.checkRequest(jsonObj, config.getUserRequiredField, config.getUserOptionalField)
  if(status.code === 200){
    let token = typeof(data.headerParams.token) === 'string' ? data.headerParams.token : false
    tokenService.verify(token, jsonObj.id_user, (valid) =>{
      if(valid){
        userService.get(jsonObj.id_user, callback)
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

handlers._users.put = function(data, callback){
  let jsonObj = data.body
  const status = utils.checkRequest(jsonObj, config.putUserRequiredField, config.putUserOptionalField)
  if(status.code === 200){
    let token = typeof(data.headerParams.token) === 'string' ? data.headerParams.token : false
    tokenService.verify(token, jsonObj.email, (valid) =>{
      if(valid){
        userService.update(jsonObj, callback)
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

handlers._users.delete = function(data, callback){
  let jsonObj = data.queryParams
  const status = utils.checkRequest(jsonObj, config.deleteUserRequiredField, config.deleteUserOptionalField)
  if(status.code === 200){
    let token = typeof(data.headerParams.token) === 'string' ? data.headerParams.token : false
    tokenService.verify(token, jsonObj.email, (valid) =>{
      if(valid){
        userService.remove(jsonObj.email, callback)
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
