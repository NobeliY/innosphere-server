const { Company } = require('../models/models')
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require('path')
const { Op } = require('sequelize')
const fs = require('fs')

class CompanyController {
    async create(req, res, next) {
        try {
            const { text } = req.body
            if (req.files && 'img' in req.files) {
                const { img } = req.files
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                const image = await Company.create({ name: fileName, text })
                return res.json(image)
            } else {
                return res.json(text)
            }
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const images = await Company.findAll()
            return res.json(images)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.query
            const image = await Company.findOne({ where: { id } })
            const filePath = path.resolve(__dirname, '..', 'static', image.name)
            fs.unlink(filePath, (e) => {
                if (e) {
                    console.log('Ошибка при удалении файла:', e)
                } else {
                    console.log('Файл успешно удален')
                }
            })
            await image.destroy()
            return res.json(image)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new CompanyController()