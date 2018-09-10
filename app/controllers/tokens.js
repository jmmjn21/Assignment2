

const config = require('../config.js')
const _data = require('../services/data.js')
const utils = require('../helpers/utils.js')
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
    _data.read('users', jsonObj.phone, (err, data) =>{
      if(!err && data){
        let hasedPassword = utils.hash(jsonObj.password)
        if(hasedPassword == data.password){
          let tokenId = utils.createRandomString(20)
          const expires = Date.now() + 1000 * 60 * 60
          const tokenObj = {
            phone: jsonObj.phone,
            id: tokenId,
            expires: expires
          }
          _data.create('tokens', tokenId, tokenObj, (err) =>{
            if(!err){
              callback(200, tokenObj)
            }
            else{
              callback(500, {message: `Error creating token`})
            }
          })
        }
        else{
          callback(401, {message: `Incorrect password`})
        }
      }
      else{
        callback(400, {message: `User ${jsonObj.phone} not found`})
      }
    })
  }
  else{
    callback(status.code, {message: status.message})
  }
}

handlers._tokens.get = function(data, callback){
  let jsonObj = data.queryParams
  const status = utils.checkRequest(jsonObj, config.getTokenRequiredField, config.getTokenOptionalField)
  if(status.code === 200){
    _data.read('tokens', jsonObj.id, (err, data) =>{
      if(!err && data){
        callback(200, data)
      }
      else{
        callback(404, {message: `Token not found`})
      }
    })
  }
  else{
    callback(status.code, {message: status.message})
  }
}

handlers._tokens.put = function(data, callback){
  let jsonObj = data.body
  const status = utils.checkRequest(jsonObj, config.putTokenRequiredField, config.putTokenOptionalField)
  if(status.code === 200){
    _data.read('tokens', jsonObj.id, (err, data) =>{
      if(err){
        callback(404, {message: `Token not found`})
      }
      else{
        if(data.expires > Date.now()){
          data.expires = Date.now() + 1000 * 60 * 60
          const updateData = data
          _data.update('tokens', jsonObj.id, data, (err) =>{
            if(!err){
              callback(200, {message: `Token extended succesfully`})
            }
            else{
              callback(500, {message: `Error extending token ${JSON.stringify(err)}`})
            }
          })
        }
        else{
          callback(400, {message: `The token can not be extended`})
        }
      }
    })
  }
  else{
    callback(status.code, {message: status.message})
  }
}

handlers._tokens.delete = function(data, callback){
  let jsonObj = data.queryParams
  const status = utils.checkRequest(jsonObj, config.deleteTokenRequiredField, config.deleteTokenOptionalField)
  if(status.code === 200){
    _data.read('tokens', jsonObj.id, (err, data) =>{
      if(!err && data){
        _data.delete('tokens', jsonObj.id, (err) =>{
          if(!err){
            callback(200, {message: `Token deleted succesfully`})
          }
          else{
            callback(500, {message: `Error deleting token`})
          }
        })
      }
      else{
        callback(404, {message: `Token not found`})
      }
    })
  }
  else{
    callback(status.code, {message: status.message})
  }
}

handlers._tokens.verifyToken = function(id, phone, callback){
  _data.read('tokens', id, (err, data) =>{
    if(!err && data){
      if(data.phone === phone && data.expires > Date.now()){
        callback(true)
      }
      else{
        callback(false)
      }
    }
    else{
      callback(false)
    }
  })
}


module.exports = handlers
