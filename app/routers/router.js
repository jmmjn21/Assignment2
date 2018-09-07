const controller = require('../controllers/main.js')

const routers = {
  hello: controller.hello,
  notFound: controller.notFound
}

module.exports = routers
