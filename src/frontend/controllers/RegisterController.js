const {
    view,
    render,
    pathView
} = require('./BaseController')

const orderBy = require('sort-by')

const categoryController = require('../../api/controllers/CategoryController')
const expenseController = require('../../api/controllers/ExpenseController')

module.exports = {
    /**
     * UI Categories
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {Callback} next 
     */
    UICategory(req, res, next) {

        switch (req.method) {

            case 'GET':

                return view('/cadastrar/categoria', {
                    title: 'Categorias',
                    activeOpc: 5
                }, res, next)


            case 'POST':

                categoryController.register(req, res, next)
        }

    },
    /**
     * UI Expense
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {Callback} next 
     */
    UIExpense(req, res, next) {

        switch (req.method) {

            case 'GET':

                return categoryController.api.fetch((err, categories) => {

                    categories = categories.sort(orderBy('name'))

                    view('/cadastrar/despesa', {
                        title: 'Despesas',
                        activeOpc: 4,
                        categories,
                        err
                    }, res, next)
                })

            case 'POST':

                expenseController.register(req, res, next)
        }

    }
}