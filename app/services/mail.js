
const config = require('../config.js')
const request = require('../helpers/request')
const querystring = require('querystring');

var sendEmail = function(to, subject, text) {
  return new Promise ( (resolve, reject) => {
    const payload = {
      from: 'mxa.eu.mailgun.org',
      to,
      subject,
      text
    };

    const payloadString = querystring.stringify(payload);

    const requestDetails = {
      protocol : 'https:',
      hostname : config.mailgun.url,
      method : 'POST',
      path : `/v3/${config.mailgun.domain}/messages`,
      auth : `api:${config.mailgun.apiKey}`,
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : Buffer.byteLength(payloadString)
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
};


module.exports = {
  sendEmail
}
