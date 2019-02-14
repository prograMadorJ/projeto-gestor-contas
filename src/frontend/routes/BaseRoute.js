const router = require('express').Router()

module.exports = (routeController) => {

    routeController.map(item => router.get(item[0], item[1]))

    return router
}