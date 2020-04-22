const mongoose = require('mongoose')
var Schema = mongoose.Schema
let sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }]
})

module.exports = mongoose.model("Seller", sellerSchema)