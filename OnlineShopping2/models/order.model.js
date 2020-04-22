const mongoose = require('mongoose')
var Schema = mongoose.Schema
let orderSchema = new mongoose.Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    price: { type: Number, required: true },
    purchaseDate: { type: Date, required: true }
})
module.exports = mongoose.model("Order", orderSchema)