const mongoose = require('mongoose')
var Schema = mongoose.Schema
let userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order', required: true }]
})

module.exports = mongoose.model("User", userSchema)