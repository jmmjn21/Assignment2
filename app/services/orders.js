
const config = require('../config.js')
const utils = require('../helpers/utils.js')
const dataService = require('./data.js')

var create = function(userNewData, callback){
  dataService.read('users', userNewData.email, (err, data) =>{
    if(err){
      callback(404, {message: `User not found`})
    }
    else{
      //TODO payment integration
      let orderId = utils.createRandomString(20)
      let total = 0;
      let menuView = data.cart.map(menu =>{
        total = total + menu.value
        return menu.id
      })

      let newOrder = {
        id: orderId,
        menus: menuView,
        total: total
      }
      data.cart = []
      data.orders.push(newOrder)
      dataService.update('users', userNewData.email, data, (err) =>{
        if(!err){
          //TODO e-mail notification integration
          callback(200, {message: `User updated succesfully`})
        }
        else{
          callback(500, {message: `Error updating user ${JSON.stringify(err)}`})
        }
      })
    }
  })
}


module.exports = {
  create
}
