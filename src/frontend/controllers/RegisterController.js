const {
    view,
    render,
    pathView
} = require('./BaseController')

const categoryController = require('../../api/controllers/CategoryController')

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

    }
}