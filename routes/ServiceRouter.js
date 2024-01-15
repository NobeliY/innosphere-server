const Router = require('express')
const router = new Router()
const serviceController = require('../controllers/ServiceController')

router.post('/', serviceController.create)
router.post('/update', serviceController.update)
router.get('/', serviceController.getAll)
router.delete('/', serviceController.delete)

module.exports = router