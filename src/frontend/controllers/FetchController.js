const {
    view,
    render,
    pathView
} = require('./BaseController')

const orderBy = require('sort-by')

const categoryController = require('../../api/controllers/CategoryController')

module.exports = {
    /**
     * UI Home
     * 
     * @param {Request} req 
     * @param {Response} res             -webkit-transform: translateX(-50%);
        transform: translateX(-50%);    -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
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
    }
}