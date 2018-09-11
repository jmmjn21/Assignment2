
const config = require('../config.js')
const dataService = require('./data.js')
const utils = require('../helpers/utils.js')

var create = function(userData, callback){
  dataService.read('users', userData.phone, (err, data) =>{
    if(err){
      let hasedPassword = utils.hash(userData.password)
      if(hasedPassword){
        userData.password = hasedPassword

        dataService.create('users', userData.phone, userData, (err) =>{
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
      callback(400, {message: `User ${userData.phone} already exists`})
    }
  })
}

var get = function(userPhone, callback){
  dataService.read('users', userPhone, (err, data) =>{
    if(!err && data){
      delete data.password
      callback(200, data)
    }
    else{
      callback(404, {message: `User not found`})
    }
  })
}

var update = function(userNewData, callback){
  dataService.read('users', userNewData.phone, (err, data) =>{
    if(err){
      callback(404, {message: `User not found`})
    }
    else{
      const updateData = data
      if(userNewData.firstName) updateData.firstName = userNewData.firstName
      if(userNewData.lastName) updateData.lastName = userNewData.lastName
      if(userNewData.password) updateData.password = utils.hash(userNewData.password)

      dataService.update('users', userNewData.phone, updateData, (err) =>{
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

var remove = function(userPhone, callback){
  dataService.read('users', userPhone, (err, data) =>{
    if(!err && data){
      dataService.delete('users', userPhone, (err) =>{
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

module.exports = {
  create,
  get,
  update,
  remove
}
