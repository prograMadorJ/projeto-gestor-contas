const view = require('./BaseController').view
const pathView = require('./BaseController').pathView

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
            title: 'Home'
        }, res, next)
    }
}