const Router = require('express')
const router = new Router()
const teacherController = require('../controllers/TeacherController')

router.post('/', teacherController.create)
router.post('/update', teacherController.update)
router.get('/', teacherController.getAll)
router.delete('/', teacherController.delete)

module.exports = router