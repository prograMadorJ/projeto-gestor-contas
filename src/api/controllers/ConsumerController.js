const Consumer = require('../models/Consumer')
const messages = require('../messages/ConsumerMessages')
const Base = require('./BaseController')


const validateRegister = (req, callback) => {
    callback(req.body)
}

const validateUpdate = (req,callback) => {
    callback(req.body.old,req.body.new)
}

const validateDelete = (req, callback) => {
    callback(req.body)
}

module.exports = Base(
    Consumer,
    messages,
    validateRegister,
    validateUpdate,
    validateDelete
)
