

const config = require('../config.js')
const utils = require('../helpers/utils.js')
const menuService = require('../services/menus.js')
const tokenService = require('../services/tokens.js')
const handlers = {}


handlers.menus = function(reqObj, callback){
  const allowedMethod = ['get']

  if(allowedMethod.indexOf(reqObj.method) >= 0){
    handlers._menus[reqObj.method](reqObj, callback)
  }
  else{
    callback(405, {message: `Method ${reqObj.method} is forbidden, allowed methods [${allowedMethod}]`})
  }
}

handlers._menus = {}


handlers._menus.get = function(data, callback){
  const pathParams = {
    id_user: data.pathParams[1]
  }
  let jsonObj = pathParams
  const status = utils.checkRequest(jsonObj, config.getUserRequiredField, config.getUserOptionalField)
  if(status.code === 200){
    let token = typeof(data.headerParams.token) === 'string' ? data.headerParams.token : false
    tokenService.verify(token, jsonObj.id_user, (valid) =>{
      if(valid){
        menuService.get(callback)
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
