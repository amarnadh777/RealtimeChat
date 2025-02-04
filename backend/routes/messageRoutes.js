const express = require('express')
const { sendMessage, getMessageBtw } = require('../controllers/messageControlles')
const upload = require("../lib/mutler")
const router = express.Router()
router.post("/send",upload.single('image'),sendMessage)
router.post("/getmeesage",getMessageBtw)
module.exports = router
