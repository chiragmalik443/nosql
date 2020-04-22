const express = require("express")
const router = express.Router()
const sellerpage_controller = require("../controllers/sellerpage.controller")

router.get("/", sellerpage_controller.homepage)

router.get("/signin", sellerpage_controller.signinpage)

router.get("/signup", sellerpage_controller.signuppage)

module.exports = router