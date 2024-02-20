const Router = require('express')
const router = new Router()
const newsController = require('../controllers/NewsController')

router.post('/', newsController.create)
router.get('/', newsController.getAll)
router.delete('/', newsController.delete)

module.exports = router