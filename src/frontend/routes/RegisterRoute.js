const controller = require('../controllers/RegisterController')
const Base = require('../routes/BaseRoute')

module.exports = Base([
    ['GET', '/cadastrar/categoria', controller.UICategory],
    ['POST', '/cadastrar/categoria', controller.UICategory]
])