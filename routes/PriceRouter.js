const Router = require('express')
const router = new Router()
const priceController = require('../controllers/PriceController')

router.post('/', priceController.create)
router.post('/update', priceController.update)
router.get('/', priceController.getAll)
router.delete('/', priceController.delete)

module.exports = router