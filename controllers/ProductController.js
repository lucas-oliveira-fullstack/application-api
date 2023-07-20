const Product = require('../models/Products')

module.exports = class ProductController {

    static async showProducts(req, res) {

        const products = await Product.findAll({ raw: true })

        res.render('prodicts/all', { products })
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    static async createProductSave(req, res) {

        const product = {
            name: req.body.name,
            brand: req.body.brand,
            description: req.body.description,
            weight: req.body.weight,
            adults_product: req.body.adults_product,
            subcagoriesID: req.body.subcagoriesID
        }

        await Product.create(product)

        res.redirect('/products')
    }

    static async updateProduct(req, res) {

        const id = req.params.id

        const product = await Product.findOne({where: { id: id }, raw: true})

        res.render('markets/edit', { product })
    }

    static async updateProductPost(req, res) {

        const id = req.body.id

        const product = {
            name: req.body.name,
            brand: req.body.brand,
            description: req.body.description,
            weight: req.body.weight,
            adults_product: req.body.adults_product,
            subcagoriesID: req.body.subcagoriesID
        }

        await Product.update(product, {where: { id: id }})

        res.redirect('/products')
    }

    static async removeProduct(req, res) {

        const id = req.body.id

        await Product.destroy({where: { id: id }})

        res.redirect('/products')
    }
}