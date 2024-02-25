const { Rate } = require('../models/models')
const ApiError = require('../error/apiError')

class RateController {
    async create(req, res, next) {
        try {
            const { date, name, text } = req.body
            const item = await Rate.create({ date, name, text })
            return res.json(item)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const { id, date, name, text } = req.body
            const item = await Rate.findOne({ where: { id } })
            if (date) item.date = date
            if (name) item.name = name
            if (text) item.text = text
            await item.save()
            return res.json(item)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const items = await Rate.findAll()
            return res.json(items)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.query
            const item = await Rate.findOne({ where: { id } })
            await item.destroy()
            return res.json(item)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new RateController()