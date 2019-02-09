const controller = require('../controllers/ConsumerController')
const Base = require('./BaseRoute')

module.exports = Base('/api/consumer',controller)