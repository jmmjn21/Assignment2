
const https = require('https')
const querystring = require('querystring');
const config = require('../config.js')

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

    const req = https.request(requestDetails, res => {
      // grab response status
      const status = res.statusCode;

      let responseBodyString = '';
      res.on('data', chunk => {
        responseBodyString += chunk;
        if (status == 200 || status == 201) {
          resolve({'success' : true, 'responseBody' : JSON.parse(responseBodyString)});
        } else {
          resolve({'success' : false, 'responseBody' : JSON.parse(responseBodyString)});
        }
      });
    });

    // Bind request to err event
    req.on('error', (err) => {
      reject(err);
    });

    req.write(payloadString);

    req.end();

  });
};


module.exports = {
  sendEmail
}
