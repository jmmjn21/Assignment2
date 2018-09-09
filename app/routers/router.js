const main = require('../controllers/main.js')
const users= require('../controllers/users.js')

const routers = {
  hello: main.hello,
  notFound: main.notFound,
  users: users.users
}

module.exports = routers
