const express = require("express")
const router = express.Router()
const index_controller = require("../controllers/index.controller")

router.get("/", index_controller.homepage)

router.get("/signin", index_controller.signinpage)

router.get("/signup", index_controller.signuppage)

module.exports = router
