const Router = require('express')
const router = new Router()
const newImagesController = require('../controllers/NewImagesController')

router.post('/', newImagesController.create)
router.get('/', newImagesController.getAll)
router.delete('/', newImagesController.delete)

module.exports = router