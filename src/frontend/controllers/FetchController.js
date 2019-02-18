const {
    view,
    render,
    pathView
} = require('./BaseController')

const orderBy = require('sort-by')
const groupBy = require('group-by')

const categoryController = require('../../api/controllers/CategoryController')
const expenseController = require('../../api/controllers/ExpenseController')
const purchaseController = require('../../api/controllers/PurchaseController')
const consumerController = require('../../api/controllers/ConsumerController')

module.exports = {
    /**
     * UI Home
     * 
     * @param {Request} req 
     * @param {Response} res  
     * @param {Callback} next 
     */
    UIHome(req, res, next) {

        consumerController.api.fetch((err, consumers) => {
            view('/home', {
                title: 'Home',
                activeOpc: 1,
                consumers
            }, res, next)
        })

    },
    /**
     * UI Categories
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {Callback} next 
     */
    UICategories(req, res, next) {

        categoryController.api.fetch((err, categories) => {

            categories = categories.sort(orderBy('name'))

            consumerController.api.fetch((err, consumers) => {

                view('/categorias', {
                    title: 'Categorias',
                    activeOpc: 5,
                    categories,
                    consumers,
                    err
                }, res, next)
            })
        })
    },
    /**
     * UI Expenses
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {Callback} next 
     */
    UIExpenses(req, res, next) {

        expenseController.api.fetch((err, expenses) => {

            expenses = expenses.sort(orderBy('-expiry'))

            expenses = groupBy(expenses, 'category.name')

            consumerController.api.fetch((err, consumers) => {
                view('/despesas', {
                    title: 'Despesas',
                    activeOpc: 4,
                    expenses,
                    consumers,
                    err
                }, res, next)
            })
        })
    },
    /**
     * UI Purchases
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {Callback} next 
     */
    UIPurchases(req, res, next) {

        const selectConsumer = req.query.consumer || 'TODOS'

        purchaseController.api.get(req.query, (err, purchase) => {

            if (err) return next(new Error(err))

            purchases = purchase.sort(orderBy('-datetime'))

            categories = groupBy(purchases, (purchase) =>
                purchase.category ? purchase.category.name : 'null'
            )

            payments = Object.keys(groupBy(purchase, 'payment'))

            purchases = {}

            Object.keys(categories).map(category => {

                group = groupBy(categories[category], 'payment')
                purchases[category] = group
            })

            // return res.send(payments)

            consumerController.api.fetch((err, consumers) => {

                view('/compras', {
                    title: 'Compras',
                    activeOpc: 3,
                    purchases,
                    payments,
                    consumers,
                    selectConsumer,
                    err
                }, res, next)
            })
        })
    }
}