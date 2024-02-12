const Router = require('express')
const router = new Router()
const serviceRouter = require('./ServiceRouter')
const priceRouter = require('./PriceRouter')
const intensiveRouter = require('./IntensiveRouter')
const imageRouter = require('./ImageRouter')
const rateRouter = require('./RateRouter')
const botRouter = require('./BotRouter')


router.use('/service', serviceRouter)
router.use('/price', priceRouter)
router.use('/intensive', intensiveRouter)
router.use('/image', imageRouter)
router.use('/rate', rateRouter)
router.use('/bot', botRouter)

module.exports = router