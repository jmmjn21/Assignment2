
const fs = require('fs')
const path = require('path')
const utils = require('../helpers/utils.js')

const baseDir = path.join(__dirname, '../.data')

var lib = {}

lib.create = function(dir, file, data, callback){
  fs.open(`${baseDir}/${dir}/${file}.json`, 'wx', (err, descriptor) =>{
    if(!err && descriptor){
      var stringData = JSON.stringify(data)
      fs.writeFile(descriptor, stringData, (err) =>{
        if(!err){
          fs.close(descriptor, (err) =>{
            if(!err){
              callback(false)
            }
            else{
              callback(`<<< Error closing the file >>> ${file}`)
            }
          })
        }
        else{
          callback(`<<< Error writing the file  ${file }>>> ${err}`)
        }
      })
    }
    else{
      callback(`<<< Error creating the file ${file} >>> ${err}`)
    }
  })
}

lib.read = function(dir, file, callback){
  fs.readFile(`${baseDir}/${dir}/${file}.json`, 'utf-8', (err, data) =>{
    if(!err){
      callback(false, utils.parseJsonToObj(data))
    }
    else{
      callback(err, data)
    }
  })
}

lib.update = function(dir, file, data, callback){
  fs.open(`${baseDir}/${dir}/${file}.json`, 'r+', (err, descriptor) =>{
    if(!err && descriptor){
      var stringData = JSON.stringify(data)
      fs.truncate(descriptor, (err) =>{
        if(!err){
          fs.writeFile(descriptor, stringData, (err) =>{
            if(!err){
              fs.close(descriptor, (err) =>{
                if(!err){
                  callback(false)
                }
                else{
                  callback(`<<< Error closing the file >>> ${file}`)
                }
              })
            }
            else{
              callback(`<<< Error writing the file >>> ${file}`)
            }
          })
        }
        else{
          callback(`<<< Error truncating the file  ${file }>>> ${err}`)
        }
      })
    }
    else{
      callback(`<<< Error opening the file ${file} >>> ${err}`)
    }
  })
}

lib.delete = function(dir, file, callback){
  fs.unlink(`${baseDir}/${dir}/${file}.json`, (err) =>{
    if(!err){
      callback(false)
    }
    else{
      callback(`<<< Error deleting the file ${file} >>> ${err}`)
    }
  })
}

module.exports = lib
