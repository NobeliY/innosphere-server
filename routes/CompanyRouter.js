const Router = require('express')
const router = new Router()
const companyController = require('../controllers/CompanyController')

router.post('/', companyController.create)
router.get('/', companyController.getAll)
router.delete('/', companyController.delete)

module.exports = router