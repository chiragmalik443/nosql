const Product = require("../models/product.model")

exports.add = async (req, res) => {
    var product = new Product(req.body)
    product = await product.save()
    res.status(200).send(product)
}

exports.delete = async function (req, res) {
    var product = Product.findByIdAndDelete(req.params.id)
    if (!product) {
        res.status(404).send(`Product with id ${req.params.id} doesn't exist`)
    }

    res.status(200).send({ message: "Deleted" })
}

exports.update = async (req, res) => {
    var product = Product.findByIdAndUpdate(req.params.id, { price: req.body.price })
    if (!product) {
        res.status(404).send(`Product with id ${req.params.id} doesn't exist`)
    }

    res.status(200).send({ message: "Updated" })
    res.send()
}

exports.listall = async (req, res) => {
    var products = await Product.find()
    res.status(200).send(products)
}