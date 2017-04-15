const _ = require('lodash'),
  express = require('express'),
  bodyParser = require('body-parser'),
  api = require('./api.js')


module.exports.add = function (...args) {
  return args.reduce((acc, value) => {
    if (!_.isNumber(value))
      throw new Error('Invalid input')
    return acc + value
  }, 0)
}

module.exports.promiseSubstract = function (...args) {

  //This is an ugly promise :'(
  return new Promise((resolve, reject) => {
    return resolve(args.reduce((acc, value) => {
      if (!_.isNumber(value))
        reject(new Error('Invalid input'))
      return acc - value
    }, 0))
  })
}

module.exports.Server = class Server {
  constructor(port) {
    if (!port)
      throw new Exception('Must set port')
    this.port = port
    this.app = express()
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())
    api.init(this.app)
  }

  start() {
    return new Promise((resolve, reject) => {
      this.app.listen(() => {
        resolve('Listening' + this.port)
      })
    })
  }

}
