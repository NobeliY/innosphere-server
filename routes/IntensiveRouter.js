const Router = require('express')
const router = new Router()
const intensiveController = require('../controllers/IntensiveController')

router.post('/', intensiveController.create)
router.post('/update', intensiveController.update)
router.get('/', intensiveController.getAll)
router.delete('/', intensiveController.delete)

module.exports = router