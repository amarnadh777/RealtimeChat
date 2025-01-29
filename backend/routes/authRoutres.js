const express = require('express')
const router = express.Router()
const {signup, signIn} = require("../controllers/aulthController")
router.post("/signup",signup)
router.post("/signin",signIn)
module.exports = router
