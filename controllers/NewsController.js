const { News, NewsImages } = require('../models/models')
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class PriceController {
    async create(req, res, next) {
        try {
            const { text } = req.body
            const item = await News.create({ text })
            if (req.files && 'img' in req.files) {
                let { img } = req.files
                if (!Array.isArray(img)) img = [img]
                for (let i of img) {
                    let fileName = uuid.v4() + ".jpg"
                    i.mv(path.resolve(__dirname, '..', 'static', fileName))
                    await NewsImages.create({ name: fileName, news_code: item.id })
                }
                return res.json(item)
            } else {
                return res.json(item)
            }

            // return res.json(item)
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

    async getImages(req, res, next) {
        try {
            const images = await NewsImages.findAll()
            console.log(images)
            return res.json(images)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.query
            const item = await News.findOne({ where: { id } })
            const images = await NewsImages.findAll({ where: { news_code: item.id.toString() } })
            if (images) {
                for (let i of images) {
                    const filePath = path.resolve(__dirname, '..', 'static', i.name)
                    fs.unlink(filePath, (e) => {
                        if (e) {
                            console.log('Ошибка при удалении файла:', e)
                        } else {
                            console.log('Файл успешно удален')
                        }
                    })
                    await i.destroy()
                }
            }
            await item.destroy()
            return res.json(item)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new PriceController()