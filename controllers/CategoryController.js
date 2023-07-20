const Category = require('../models/Categories')

module.exports = class CategoryController {

    static async showCategories(req, res) {

        const categories = await Category.findAll({ raw: true })

        res.render('categories/all', { categories })
    }

    static createCategory(req, res) {

        res.render('categories/create')
    }

    static async createCategorySave(req, res) {

        const category = {
           photo: req.body.photo,
           name: req.body.name     
        }

        await Category.create(category)

        res.redirect('/categories')
    }

    static async updateCategory(req, res) {

        const id = req.params.id

        const category = await Category.findOne({where: { id: id }, raw: true})

        res.render('categories/edit', { category })
    }

    static async updateCategoryPost(req, res) {

        const id = req.body.id

        const category = {
            photo: req.body.photo,
            name: req.body.name
        }

        await Category.update(category, {where: { id: id }})

        res.redirect('/categories')
    }

    static async removeCategory(req, res) {

        const id = req.body.id

        await Category.destroy({where: { id: id }})

        res.redirect('/categories')
    }
}