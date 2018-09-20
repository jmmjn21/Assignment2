
const config = require('../config.js')
const dataService = require('./data.js')
const utils = require('../helpers/utils.js')

var create = function(userData, callback){
  dataService.read('users', userData.email, (err, data) =>{
    if(err){
      let hasedPassword = utils.hash(userData.password)
      if(hasedPassword){
        userData.password = hasedPassword

        dataService.create('users', userData.email, userData, (err) =>{
          if(!err){
            callback(200, {id: userData.email})
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
      callback(400, {message: `User ${userData.email} already exists`})
    }
  })
}

var get = function(userId, callback){
  dataService.read('users', userId, (err, data) =>{
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
  dataService.read('users', userNewData.email, (err, data) =>{
    if(err){
      callback(404, {message: `User not found`})
    }
    else{
      const updateData = data
      if(userNewData.name) updateData.name = userNewData.name
      if(userNewData.street) updateData.street = userNewData.street
      if(userNewData.password) updateData.password = utils.hash(userNewData.password)
      if(userNewData.cart) updateData.cart = userNewData.cart
      if(userNewData.orders) updateData.orders = userNewData.orders

      dataService.update('users', userNewData.email, updateData, (err) =>{
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

var remove = function(userId, callback){
  dataService.read('users', userId, (err, data) =>{
    if(!err && data){
      dataService.delete('users', userId, (err) =>{
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
