const Router = require('express')
const router = new Router()
const rateController = require('../controllers/RateController')

router.post('/', rateController.create)
router.post('/update', rateController.update)
router.get('/', rateController.getAll)
router.delete('/', rateController.delete)

module.exports = router