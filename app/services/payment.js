
const config = require('../config.js')
const request = require('../helpers/request')
const querystring = require('querystring');

var pay = function(amount, currency){
  return new Promise ( (resolve, reject) => {
    const payload = {
      amount,
      currency
    };

    const payloadString = querystring.stringify(payload);

    const requestDetails = {
      'protocol' : 'https:',
      'hostname' : config.stripe.url,
      'method' : 'POST',
      'path' : config.stripe.path,
      'headers' : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : Buffer.byteLength(payloadString),
        'Authorization' : `Bearer ${config.stripe.apiKey}`
      }
    };
    request.sendRequest(requestDetails, payloadString)
    .then(res =>{
      resolve(res)
    })
    .catch(err =>{
      reject(err)
    })
  });
}


module.exports = {
  pay
}
