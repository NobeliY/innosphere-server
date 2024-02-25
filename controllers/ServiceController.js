const { Service } = require('../models/models')
const ApiError = require('../error/apiError')

class ServiceController {
    async create(req, res, next) {
        try {
            const { name, text } = req.body
            const service = await Service.create({ name, text })
            return res.json(service)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const { id, name, text } = req.body
            const service = await Service.findOne({ where: { id } })
            if (name) service.name = name
            if (text) service.text = text
            await service.save()
            return res.json(service)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const services = await Service.findAll()
            return res.json(services)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.query
            const service = await Service.findOne({ where: { id } })
            await service.destroy()
            return res.json(service)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ServiceController()