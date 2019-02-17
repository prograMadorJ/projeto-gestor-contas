const controller = require('../controllers/FetchController')
const Base = require('../routes/BaseRoute')

module.exports = Base([
    ['GET','/',controller.UIHome],
    ['GET', '/categorias', controller.UICategories],
    ['GET', '/despesas', controller.UIExpenses]
])