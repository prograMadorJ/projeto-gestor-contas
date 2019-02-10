const controller = require('../controllers/ExpenseController')
const Base = require('./BaseRoute')

module.exports = Base('/api/expense',controller)