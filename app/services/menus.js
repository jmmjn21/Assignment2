
const config = require('../config.js')
const utils = require('../helpers/utils.js')
const menuExpect = require('../expectations/menus.js')

var get = function(callback){
  let jsonMenu = menuExpect.menus
  callback(200, jsonMenu)
}


module.exports = {
  get
}
