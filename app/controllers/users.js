

const config = require('../config.js')
const _data = require('../services/data.js')
const utils = require('../helpers/utils.js')
const tokens = require('./tokens.js')
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
  const jsonObj = data.body
  const status = utils.checkRequest(jsonObj, config.postUserRequiredField, config.postUserOptionalField)
  if(status.code === 200){
    _data.read('users', jsonObj.phone, (err, data) =>{
      if(err){
        let hasedPassword = utils.hash(jsonObj.password)
        if(hasedPassword){
          jsonObj.password = hasedPassword

          _data.create('users', jsonObj.phone, jsonObj, (err) =>{
            if(!err){
              callback(200, {message: `User created succesfully`})
            }
            else{
              callback(500, {message: `Error creating user ${JSON.stringify(err)}`})
            }
          })
        }
        else{
          callback(500, {message: `Error hasing the password`})
        }
      }
      else{
        callback(400, {message: `User ${jsonObj.phone} already exists`})
      }
    })
  }
  else{
    callback(status.code, {message: status.message})
  }
}

handlers._users.get = function(data, callback){
  let jsonObj = data.queryParams
  const status = utils.checkRequest(jsonObj, config.getUserRequiredField, config.getUserOptionalField)
  if(status.code === 200){
    let token = typeof(data.headerParams.token) === 'string' ? data.headerParams.token : false
    tokens._tokens.verifyToken(token, jsonObj.phone, (valid) =>{
      if(valid){
        _data.read('users', jsonObj.phone, (err, data) =>{
          if(!err && data){
            delete data.password
            callback(200, data)
          }
          else{
            callback(404, {message: `User not found`})
          }
        })
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
    tokens._tokens.verifyToken(token, jsonObj.phone, (valid) =>{
      if(valid){
        _data.read('users', jsonObj.phone, (err, data) =>{
          if(err){
            callback(404, {message: `User not found`})
          }
          else{
            const updateData = data
            if(jsonObj.firstName) updateData.firstName = jsonObj.firstName
            if(jsonObj.lastName) updateData.lastName = jsonObj.lastName
            if(jsonObj.password) updateData.password = utils.hash(jsonObj.password)

            _data.update('users', jsonObj.phone, updateData, (err) =>{
              if(!err){
                callback(200, {message: `User updated succesfully`})
              }
              else{
                callback(500, {message: `Error updating user ${JSON.stringify(err)}`})
              }
            })
          }
        })
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
    tokens._tokens.verifyToken(token, jsonObj.phone, (valid) =>{
      if(valid){
        _data.read('users', jsonObj.phone, (err, data) =>{
          if(!err && data){
            _data.delete('users', jsonObj.phone, (err) =>{
              if(!err){
                callback(200, {message: `User deleted succesfully`})
              }
              else{
                callback(500, {message: `Error deleting user`})
              }
            })
          }
          else{
            callback(404, {message: `User not found`})
          }
        })
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
