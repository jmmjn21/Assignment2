
const https = require('https')


var sendRequest = function(requestDetails, payload){
  return new Promise((resolve, reject) =>{
    const req = https.request(requestDetails, res => {
      // grab response status
      const status = res.statusCode;

      let responseBodyString = '';
      res.on('data', chunk => {
        if (status == 200 || status == 201) {
          resolve({'success' : true});
        } else {
          resolve({'success' : false});
        }
      });
    });

    // Bind request to err event
    req.on('error', (err) => {
      reject(err);
    });

    req.write(payload);

    req.end();
  })
}


module.exports = {
  sendRequest
}
