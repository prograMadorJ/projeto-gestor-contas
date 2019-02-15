const router = require('express').Router()

module.exports = (routeController) => {

    routeController.map(item => router[item[0].toLowerCase()](item[1], item[2]))

    return router
}