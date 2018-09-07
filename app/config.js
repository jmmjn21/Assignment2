
const myEnvs = {};

myEnvs.dev = {
  port: 3000
}

myEnvs.pro = {
  port: 5000
}

const environment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : ''
const currentEnv = typeof(myEnvs[environment]) === 'object' ? myEnvs[environment] : myEnvs['dev']

module.exports = currentEnv
