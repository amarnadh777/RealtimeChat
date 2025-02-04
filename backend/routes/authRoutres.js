const express = require('express')
const   router = express.Router()
const upload = require("../lib/mutler")
const {signup, signIn} = require("../controllers/aulthController")

router.post("/signup",upload.single("profileImg"), signup)
router.post("/signin",signIn)
module.exports = router
