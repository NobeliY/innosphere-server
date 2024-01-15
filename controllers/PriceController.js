const {Price} = require('../models/models')
const ApiError = require('../error/apiError')

class PriceController {
    async create(req, res, next) {
        try {
            const {category_id, name, text, price} = req.body
            const item = await Price.create({category_id, name, text, price})
            return res.json(item)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id, category_id, name, text, price} = req.body
            const item = await Price.findOne({where: {id}})
            if (category_id) item.category_id = category_id
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
            const items = await Price.findAll()
            return res.json(items)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.query
            const item = await Price.findOne({where: {id}})
            await item.destroy()            
            return res.json(item)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new PriceController()