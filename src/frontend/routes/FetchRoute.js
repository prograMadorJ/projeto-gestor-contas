const controller = require('../controllers/FetchController')
const Base = require('../routes/BaseRoute')

module.exports = Base([
    ['GET','/home',controller.UIHome]
])