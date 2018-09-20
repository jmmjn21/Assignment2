
const config = require('../config.js')
const utils = require('../helpers/utils.js')
const dataService = require('./data.js')
const paymentService = require('./payment.js')
const mailService = require('./mail.js')

var create = function(userNewData, callback){
  dataService.read('users', userNewData.id_user, (err, data) =>{
    if(err){
      callback(404, {message: `User not found`})
    }
    else{
      let orderId = utils.createRandomString(20)
      let total = 0;
      let menuView = data.cart.map(menu =>{
        total = total + menu.value
        return menu.id
      })

      let newOrder = {
        id: orderId,
        menus: menuView,
        total: total,
        currency: 'EUR'
      }
      paymentService.pay(newOrder.total, newOrder.currency)
      .then(() =>{
        data.cart = []
        data.orders.push(newOrder)
        dataService.update('users', userNewData.id_user, data, (err) =>{
          if(!err){
            mailService.sendEmail('test@gmail.com', 'testing', 'saludando')
            callback(200, {message: `Orderder processed succesfully`})
          }
          else{
            callback(500, {message: `Error updating user ${JSON.stringify(err)}`})
          }
        })
      })
      .catch(err =>{
        console.log(err)
        callback(500, {message: `Error with the payment ${JSON.stringify(err)}`})
      })
    }
  })
}


module.exports = {
  create
}
