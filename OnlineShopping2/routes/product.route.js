const express = require("express")
const router = express.Router()
const product_controller = require("../controllers/product.controller")

// Add new product
router.post("/", product_controller.add)

// Delete product
router.delete("/:id", product_controller.delete)

// Update product
router.put("/:id", product_controller.update)

// Get all products
router.get("/", product_controller.listall)

module.exports = router