
const https = require('https')
const querystring = require('querystring');
const config = require('../config.js')

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

    const req = https.request(requestDetails, res => {
      const status = res.statusCode;

      let responseBodyString = '';
      res.on('data', chunk => {
        responseBodyString += chunk;
        if (status == 200 || status == 201) {
          resolve(JSON.parse(responseBodyString));
        } else {
          resolve(JSON.parse(responseBodyString)); //error parameter missing source or customer
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(payloadString);

    req.end();
  });
}


module.exports = {
  pay
}
