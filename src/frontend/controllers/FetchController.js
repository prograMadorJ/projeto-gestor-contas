const {
    view,
    render,
    pathView
} = require('./BaseController')

const orderBy = require('sort-by')
const groupBy = require('group-by')

const categoryController = require('../../api/controllers/CategoryController')
const expenseController = require('../../api/controllers/ExpenseController')

module.exports = {
    /**
     * UI Home
     * 
     * @param {Request} req 
     * @param {Response} res  
     * @param {Callback} next 
     */
    UIHome(req, res, next) {
        view('/home', {
            title: 'Home',
            activeOpc: 1
        }, res, next)
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

            view('/categorias', {
                title: 'Categorias',
                activeOpc: 5,
                categories,
                err
            }, res, next)
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

            expenses = groupBy(expenses,'category.name')

            view('/despesas', {
                title: 'Despesas',
                activeOpc: 4,
                expenses,
                err
            }, res, next)
        })
    }
}