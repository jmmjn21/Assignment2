
const config = require('../config.js')
const queryString = require('querystring')
const https = require('https')

var sendMessage = function(phone, msg, callback){
  phone = typeof(phone) === 'string' && phone.trim().length() === 10 ? phone.trim() : false
  msg = typeof(msg) === 'string' && msg.trim().length() > 0 ? msg.trim() : false

  if(phone && msg){
    const payload = {
      From: config.twilio.from,
      To: `+1${phone}`,
      Body: msg
    }

    var strPayload = queryString.stringify(payload)

    const requestDetails = {
      protocol: 'https:',
      hostname: 'api.twilio.com',
      method: 'POST',
      path: `/2010-04-01/Accounts/${config.twilio.id}/Messages.json`,
      auth: `${config.twilio.id}:${config.twilio.token}`,
      headers: {
        Content-Type: 'application/x-www-form-urlencoded',
        Content-Length: Buffer.byteLength(strPayload)
      }
    }

    const req = https.request(requestDetails,(res) =>{
      const status = res.statusCode
      if(status === 200 || status === 201){
        callback(false)
      }
      else{
        callback(`Status code ->> ${status}`)
      }
    })

    req.on('error', e =>{
      callback(e)
    })

    req.write(strPayload)
    req.end()

  }
  else{
    callback(`Invalid parameters`)
  }
}

module.exports = {

}
