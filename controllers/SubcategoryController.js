const Subcategory = require('../models/Subcategories')

module.exports = class SubcategoryController {

    static async showSubcategories(req, res) {

        const subcategories = await Subcategory.findAll({ raw: true })

        res.render('subvategories/all', { subcategories })
    }

    static createSubcategory(req, res) {

        res.render('subcategories/create')
    }

    static async createSubcategorySave(req, res) {

        const subcategory = {
            name: req.body.name,
            categoryID: req.body.categoryID
        }

        await Subcategory.create(subcategory)

        res.redirect('/subcategories')
    }

    static async updateSubcategory(req, res) {

        const id = req.params.id

        const subcategory = await Subcategory.findOne({where: { id: id }, raw: true})

        res.render('subcategories/edit', { subcategory })
    }

    static async updateSubcategoryPost(req, res) {

        const id = req.body.id

        const subcategory = {
            name: req.body.name,
            categoryID: req.body.categoryID
        }

        await Subcategory.update(subcategory, {where: { id: id }})

        res.redirect('/subcategories')
    }

    static async removeSubcategory(req, res) {

        const id = req.body.id

        await Subcategory.destroy({where: { id: id }})

        res.redirect('/subcategories')
    }
}