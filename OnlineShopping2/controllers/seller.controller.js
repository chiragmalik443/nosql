// status code ref : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

const Seller = require("../models/seller.model")
const Token = require("../models/token.model")
const Product = require("../models/product.model")
const PasswordHash = require("password-hash")

exports.signUp = async function (req, res) {
    // First check if account exists with this email id
    var user = await Seller.findOne({ email: req.body.email })
    if (user) {
        // 409 : Conflict
        return res.status(409).send({ message: "User already exists" })
    }

    // Create a new user with the data client has sent
    // Make sure to hash the password
    user = new Seller({
        email: req.body.email,
        password: PasswordHash.generate(req.body.password),
        name: req.body.name
    })

    // save user in database
    user = await user.save()

    // create new token
    var token = new Token({ userId: user._id })

    // save token in database
    token = await token.save()

    res.header("authorization", token._id)
    res.status(200).send({ message: "Account created successfully" })
}

exports.signIn = async function (req, res) {
    // First check if account exists with this email id
    var user = await Seller.findOne({ email: req.body.email })
    if (!user) {
        // 404 Not Found
        return res.status(404).send({ message: "Account does not exists" })
    }

    // verify password
    if (!PasswordHash.verify(req.body.password, user.password)) {
        // 403 : Forbidden
        return res.status(403).send({ message: "Invalid password" })
    }

    // create new token
    var token = new Token({ userId: user._id })

    // save token in database
    token = await token.save()

    res.header("authorization", token._id)
    res.status(200).send(user)
}

exports.signOut = async function (req, res) {
    // Remove token from database
    var token = await Token.findByIdAndDelete(req.token._id)
    console.log(token)
    res.status(200).send({ message: "Signout success" })
}

exports.signOutAll = async function (req, res) {
    // Remove all tokens associated with the userId
    var tokens = await Token.deleteMany({ userId: req.token.userId })
    console.log(tokens)
    res.status(200).send({ message: "Signout all success" })
}

exports.retrieveSeller = async function (req, res) {
    // Send user associated with userId
    var user = await Seller.findById(req.token.userId).populate("products")
    if (!user) {
        res.status(404).send({ message: "User not found" })
    }
    res.status(200).send(user)
}

exports.createProduct = async function (req, res) {
    var product = new Product(req.body)
    product = await product.save()

    await Seller.findByIdAndUpdate(req.token.userId, { "$push": { "products": product._id } }, { "new": true, "upsert": true })
    res.status(200).send(product)
}

exports.retrieveProducts = async function (req, res) {
    //TODO
}

exports.deleteProduct = async function (req, res) {
    //TODO
}

exports.updateProduct = async function (req, res) {
    //TODO
}
