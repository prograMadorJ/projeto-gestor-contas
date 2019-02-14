const view = require('./BaseController').view
const pathView = require('./BaseController').pathView

module.exports = {
    home(req, res, next) {
        view('/home', {
            title: 'Home'
        }, res, next)
    }
}