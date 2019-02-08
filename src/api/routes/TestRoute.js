const router = require('express').Router()
const controller = require('../controllers/TestController')

const root = uri => '/api'.concat(uri)

router.get(root('/test'),controller.test)
router.get(root('/test/params'),controller.testParams)
router.post(root('/test/post'),controller.testPost)

module.exports = router