const controller = require('../controllers/PurchaseController')
const Base = require('./BaseRoute')

module.exports = Base('/api/purchase',controller)