const { Document } = require('../models/models')
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require('path')
const { Op } = require('sequelize')
const fs = require('fs')

class ImageController {
    async create(req, res, next) {
        try {
            const { name, text } = req.body
            if (req.files && 'file' in req.files) {
                const { file } = req.files
                let type = file.name.split('.').pop()
                console.log(type)
                let fileName = uuid.v4() + '.' + file.mimetype.split('/')[1]
                file.mv(path.resolve(__dirname, '..', 'static', fileName))
                const document = await Document.create({ name, document: fileName, text })
                return res.json(document)
            } else {
                return res.json(text)
            }
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const documents = await Document.findAll()
            return res.json(documents)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.query
            const document = await Document.findOne({ where: { id } })
            const filePath = path.resolve(__dirname, '..', 'static', document.document)
            fs.unlink(filePath, (e) => {
                if (e) {
                    console.log('Ошибка при удалении файла:', e)
                } else {
                    console.log('Файл успешно удален')
                }
            })
            await document.destroy()
            return res.json(document)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ImageController()