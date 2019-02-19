const Category = require('../models/Category')
const messages = require('../messages/CategoryMessages')
const Base = require('./BaseController')
const rules = require('../rules/CategoryRule')

//TODO: implementation validators

const validateRegister = rules.registerRule

const validateUpdate = (req, callback) => {
    callback(req.body.old, req.body.new)
}

const validateDelete = (req, callback) => {
    callback(req.body)
}

const validateGet = (req, callback) => {
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

module.exports.api = Base.api(Category)