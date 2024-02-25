const { Intensive } = require('../models/models')
const ApiError = require('../error/apiError')

class IntensiveController {
    async create(req, res, next) {
        try {
            const { name, text, price } = req.body
            const item = await Intensive.create({ name, text, price })
            return res.json(item)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const { id, category_id, name, text, price } = req.body
            const item = await Intensive.findOne({ where: { id } })
            if (name) item.name = name
            if (text) item.text = text
            if (price) item.price = price
            await item.save()
            return res.json(item)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const items = await Intensive.findAll()
            return res.json(items)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.query
            const item = await Intensive.findOne({ where: { id } })
            await item.destroy()
            return res.json(item)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new IntensiveController()