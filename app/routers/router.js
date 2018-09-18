const main = require('../controllers/main.js')
const users = require('../controllers/users.js')
const tokens = require('../controllers/tokens.js')
const menus = require('../controllers/menus.js')
const orders = require('../controllers/orders.js')

const routers = {
  hello: main.hello,
  notFound: main.notFound,
  users: users.users,
  tokens: tokens.tokens,
  menus: menus.menus,
  orders: orders.orders
}

module.exports = routers
