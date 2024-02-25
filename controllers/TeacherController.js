const { Teacher } = require('../models/models')
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class TeacherController {
    async create(req, res, next) {
        try {
            const { name, position, education, experience, description } = req.body
            // const teacher = await Teacher.create({ name, text })
            if (req.files && 'img' in req.files) {
                let { img } = req.files
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                const teacher = await Teacher.create({ name, position, education, experience, description, img: fileName })
                return res.json(teacher)
            } else {
                const teacher = await Teacher.create({ name, position, education, experience, description })
                return res.json(teacher)
            }
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const { id, name, position, education, experience, description } = req.body
            const teacher = await Teacher.findOne({ where: { id } })
            if (name) teacher.name = name
            if (position) teacher.position = position
            if (education) teacher.education = education
            if (experience) teacher.experience = experience
            if (description) teacher.description = description
            if (req.files && 'img' in req.files) {
                if (teacher.img) {
                    const filePath = path.resolve(__dirname, '..', 'static', teacher.img)
                    fs.unlink(filePath, (e) => {
                        if (e) {
                            console.log('Ошибка при удалении файла:', e)
                        } else {
                            console.log('Файл успешно удален')
                        }
                    })
                }
                let { img } = req.files
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                teacher.img = fileName
            }
            await teacher.save()
            return res.json(teacher)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const teachers = await Teacher.findAll()
            return res.json(teachers)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.query
            const teacher = await Teacher.findOne({ where: { id } })
            if (teacher.img) {
                const filePath = path.resolve(__dirname, '..', 'static', teacher.img)
                fs.unlink(filePath, (e) => {
                    if (e) {
                        console.log('Ошибка при удалении файла:', e)
                    } else {
                        console.log('Файл успешно удален')
                    }
                })
            }
            await teacher.destroy()
            return res.json(teacher)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new TeacherController()