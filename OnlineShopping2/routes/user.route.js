const express = require("express")
const router = express.Router()
const user_controller = require("../controllers/user.controller")
const auth = require("../middlewares/auth")

router.post("/signup", user_controller.signup)

router.post("/signin", user_controller.signin)

router.post("/signout", auth, user_controller.signout)

router.post("/signoutall", auth, user_controller.signoutall)

router.get("/", auth, user_controller.retrieveuser)

// Create new order
router.post("/orders", auth, user_controller.createOrder)

// Retrive all orders
router.get("/orders", auth, user_controller.retrieveOrders)

module.exports = router
