const express = require("express")
const router = express.Router()
const seller_controller = require("../controllers/seller.controller")
const auth = require("../middlewares/auth")

// Sign up
router.post("/signup", seller_controller.signUp)

// Sign in
router.post("/signin", seller_controller.signIn)

// Sign out
router.post("/signout", auth, seller_controller.signOut)

// Sign out all
router.post("/signoutall", auth, seller_controller.signOutAll)

// Retrieve seller
router.get("/", auth, seller_controller.retrieveSeller)

// Create new product
router.post("/products", auth, seller_controller.createProduct)

// Retrive all products
router.get("/products", auth, seller_controller.retrieveProducts)

// Delete product
router.delete("/products/:id", auth, seller_controller.deleteProduct)

// Update product
router.put("/products/:id", auth, seller_controller.updateProduct)

module.exports = router