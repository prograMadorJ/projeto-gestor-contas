const Category = require('../models/Category')
const messages = require('../messages/CategoryMessages')
const Base = require('./BaseController')
const rules = require('../rules/CategoryRule')

const validateRegister = rules.registerRule

const validateUpdate = rules.updateRule

const validateDelete = rules.deleteRule

const validateGet = rules.deleteRule

module.exports = Base(
    Category,
    messages,
    validateRegister,
    validateUpdate,
    validateDelete,
    validateGet
)

module.exports.api = Base.api(Category)