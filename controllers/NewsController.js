const { News } = require('../models/models')
const ApiError = require('../error/apiError')

class PriceController {
    async create(req, res, next) {
        try {
            const { text } = req.body
            const item = await News.create({ text })
            return res.json(item)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const { id, text } = req.body
            const item = await News.findOne({ where: { id } })
            if (text) item.text = text
            await item.save()
            return res.json(item)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const items = await News.findAll()
            return res.json(items)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.query
            const item = await News.findOne({ where: { id } })
            await item.destroy()
            return res.json(item)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new PriceController()