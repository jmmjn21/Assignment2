
const myEnvs = {};

myEnvs.dev = {
  port: 3000,
  //users
  postUserRequiredField: ['name', 'email', 'street', 'password'],
  postUserOptionalField: [],
  getUserRequiredField: ['id_user'],
  getUserOptionalField: [],
  putUserRequiredField: ['email'],
  putUserOptionalField: ['name', 'street', 'password', 'cart'],
  deleteUserRequiredField: ['email'],
  deleteUserOptionalField: [],
  //tokens
  possibleChar: 'abcdefghijklmnopqrstuvwxyz0123456789',
  postTokenRequiredField: ['email', 'password'],
  postTokenOptionalField: [],
  getTokenRequiredField: ['id'],
  getTokenOptionalField: [],
  putTokenRequiredField: ['id', 'extend'],
  putTokenOptionalField: [],
  deleteTokenRequiredField: ['id_token'],
  deleteTokenOptionalField: [],
  //orders
  postOrderRequiredField: ['id_user'],
  postOrderOptionalField: [],
  twilio: {
    id: '',
    token: '',
    from: ''
  },
  stripe: {
    url: 'api.stripe.com',
    path: '/v1/charges',
    apiKey: 'sk_test_********'
  },
  mailgun: {
    url: 'api.mailgun.net',
    domain: '********.com',
    apiKey: '***********-0e6e8cad-3cd17d86'
  },
  secret: 'test'
}

myEnvs.pro = {
  port: 5000,
  //users
  postUserRequiredField: ['name', 'email', 'street', 'password'],
  postUserOptionalField: [],
  getUserRequiredField: ['id_user'],
  getUserOptionalField: [],
  putUserRequiredField: ['email'],
  putUserOptionalField: ['name', 'street', 'password', 'cart'],
  deleteUserRequiredField: ['email'],
  deleteUserOptionalField: [],
  //tokens
  possibleChar: 'abcdefghijklmnopqrstuvwxyz0123456789',
  postTokenRequiredField: ['email', 'password'],
  postTokenOptionalField: [],
  getTokenRequiredField: ['id'],
  getTokenOptionalField: [],
  putTokenRequiredField: ['id', 'extend'],
  putTokenOptionalField: [],
  deleteTokenRequiredField: ['id_token'],
  deleteTokenOptionalField: [],
  //orders
  postOrderRequiredField: ['id_user'],
  postOrderOptionalField: [],
  twilio: {
    id: '',
    token: '',
    from: ''
  },
  stripe: {
    url: 'api.stripe.com',
    path: '/v1/charges',
    apiKey: 'sk_test_Wh************8m'
  },
  mailgun: {
    url: 'api.mailgun.net',
    domain: '********.com',
    apiKey: '**********-***-**'
  },
  secret: 'testPro'
}

const environment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : ''
const currentEnv = typeof(myEnvs[environment]) === 'object' ? myEnvs[environment] : myEnvs['dev']

module.exports = currentEnv
