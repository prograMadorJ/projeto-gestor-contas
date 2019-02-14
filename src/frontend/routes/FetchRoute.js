const controller = require('../controllers/FetchController')
const Base = require('../routes/BaseRoute')

module.exports = Base([
    ['/',controller.home]
])