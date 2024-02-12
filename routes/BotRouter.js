const Router = require('express')
const router = new Router()
const botController = require('../controllers/BotController')

router.post('/', botController.send)

module.exports = router