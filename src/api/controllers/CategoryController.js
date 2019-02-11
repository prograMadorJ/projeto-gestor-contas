const Category = require('../models/Category')
const messages = require('../messages/CategoryMessages')
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

const validateGet = (req,callback) => {
    callback(req.query)
}

module.exports = Base(
    Category,
    messages,
    validateRegister,
    validateUpdate,
    validateDelete,
    validateGet
)
