const Consumer = require('../models/Consumer')
const messages = require('../messages/ConsumerMessages')
const Base = require('./BaseController')

//TODO: implementation validators

const validateRegister = (req, callback) => {
    callback(req.body)
}

const validateUpdate = (req,callback) => {
    callback(req.body.old,req.body.new)
}

const validateDelete = (req, callback) => {
    callback(req.body)
}

const validateGet = (req,callback) => {
    callback(req.query)
}

module.exports = Base(
    Consumer,
    messages,
    validateRegister,
    validateUpdate,
    validateDelete,
    validateGet
)

module.exports.api = Base.api(Consumer)
