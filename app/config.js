
const myEnvs = {};

myEnvs.dev = {
  port: 3000,
  //users
  postUserRequiredField: ['firstName', 'lastName', 'phone', 'password', 'tosAgreement'],
  postUserOptionalField: [],
  getUserRequiredField: ['phone'],
  getUserOptionalField: [],
  putUserRequiredField: ['phone'],
  putUserOptionalField: ['firstName', 'lastName', 'password'],
  deleteUserRequiredField: ['phone'],
  deleteUserOptionalField: [],
  secret: 'test'
}

myEnvs.pro = {
  port: 5000,
  //users
  postUserRequiredField: ['firstName', 'lastName', 'phone', 'password', 'tosAgreement'],
  postUserOptionalField: [],
  getUserRequiredField: ['phone'],
  getUserOptionalField: [],
  putUserRequiredField: ['phone'],
  putUserOptionalField: ['firstName', 'lastName', 'password'],
  deleteUserRequiredField: ['phone'],
  deleteUserOptionalField: [],
  secret: 'testPro'
}

const environment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : ''
const currentEnv = typeof(myEnvs[environment]) === 'object' ? myEnvs[environment] : myEnvs['dev']

module.exports = currentEnv