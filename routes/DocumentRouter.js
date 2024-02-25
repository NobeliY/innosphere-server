const Router = require('express')
const router = new Router()
const documentController = require('../controllers/DocumentController')

router.post('/', documentController.create)
router.get('/', documentController.getAll)
router.delete('/', documentController.delete)

module.exports = router