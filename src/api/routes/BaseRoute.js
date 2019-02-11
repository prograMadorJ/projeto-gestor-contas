const router = require('express').Router()

module.exports = (route, controller) => {

    router.get(route, controller.fetch)
    router.get(route.concat('/get'), controller.get)
    router.post(route, controller.register)
    router.put(route, controller.update)
    router.delete(route, controller.delete)

    return router
}