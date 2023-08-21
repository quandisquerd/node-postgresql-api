const express = require("express")
const router = express.Router()

const authController = require("../controllers/auth")

router.post("/users/signup", authController.signup)
router.post("/users/signin", authController.signin)
router.delete("/users/:id", authController.remove)

module.exports = router