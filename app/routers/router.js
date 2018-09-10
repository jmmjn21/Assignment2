const main = require('../controllers/main.js')
const users = require('../controllers/users.js')
const tokens = require('../controllers/tokens.js')

const routers = {
  hello: main.hello,
  notFound: main.notFound,
  users: users.users,
  tokens: tokens.tokens
}

module.exports = routers
