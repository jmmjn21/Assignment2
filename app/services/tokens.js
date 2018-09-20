
const config = require('../config.js')
const dataService = require('./data.js')
const utils = require('../helpers/utils.js')

var create = function(userData, callback){
  dataService.read('users', userData.email, (err, data) =>{
    if(!err && data){
      let hasedPassword = utils.hash(userData.password)
      if(hasedPassword == data.password){
        let tokenId = utils.createRandomString(20)
        const expires = Date.now() + 1000 * 60 * 60
        const tokenObj = {
          email: userData.email,
          id: tokenId,
          expires: expires
        }
        dataService.create('tokens', tokenId, tokenObj, (err) =>{
          if(!err){
            callback(200, {token: tokenId})
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
      callback(400, {message: `User ${userData.email} not found`})
    }
  })
}

var get = function(tokenId, callback){
  dataService.read('tokens', tokenId, (err, data) =>{
    if(!err && data){
      callback(200, data)
    }
    else{
      callback(404, {message: `Token not found`})
    }
  })
}

var update = function(tokenId, callback){
  dataService.read('tokens', tokenId, (err, data) =>{
    if(err){
      callback(404, {message: `Token not found`})
    }
    else{
      if(data.expires > Date.now()){
        data.expires = Date.now() + 1000 * 60 * 60
        const updateData = data
        dataService.update('tokens', tokenId, data, (err) =>{
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

var remove = function(tokenId, callback){
  dataService.read('tokens', tokenId, (err, data) =>{
    if(!err && data){
      dataService.delete('tokens', tokenId, (err) =>{
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

var verify = function(id, email, callback){
  dataService.read('tokens', id, (err, data) =>{
    if(!err && data){
      if(data.email === email && data.expires > Date.now()){
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

module.exports = {
  create,
  get,
  update,
  remove,
  verify
}
