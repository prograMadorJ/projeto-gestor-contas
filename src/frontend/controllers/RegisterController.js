const {
    view,
    render,
    pathView
} = require('./BaseController')

const orderBy = require('sort-by')

const categoryController = require('../../api/controllers/CategoryController')
const categoryRule = require('../../api/rules/CategoryRule')
const expenseController = require('../../api/controllers/ExpenseController')
const purchaseController = require('../../api/controllers/PurchaseController')
const consumerController = require('../../api/controllers/ConsumerController')

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

                return consumerController.api.fetch((err, consumers) => {

                    view('/cadastrar/categoria', {
                        title: 'Categorias',
                        activeOpc: 5,
                        consumers,
                        regex: categoryRule.regex
                    }, res, next)
                })



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

                    consumerController.api.fetch((err, consumers) => {

                        view('/cadastrar/despesa', {
                            title: 'Despesas',
                            activeOpc: 4,
                            categories,
                            consumers,
                            err
                        }, res, next)
                    })
                })

            case 'POST':

                expenseController.register(req, res, next)
        }

    },
    /**
     * UI Purchase
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {Callback} next 
     */
    UIPurchase(req, res, next) {

        switch (req.method) {

            case 'GET':

                return consumerController.api.fetch((err, consumers) => {

                    if (err) return next(new Error(err))

                    categoryController.api.fetch((err, categories) => {

                        categories = categories.sort(orderBy('name'))

                        view('/cadastrar/compra', {
                            title: 'Compras',
                            activeOpc: 3,
                            categories,
                            consumers,
                            err
                        }, res, next)
                    })
                })

            case 'POST':

                purchaseController.register(req, res, next)
        }

    }
}