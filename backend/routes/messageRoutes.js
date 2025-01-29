const express = require('express')
const { sendMessage, getMessageBtw } = require('../controllers/messageControlles')
const router = express.Router()
router.post("/send",sendMessage)
router.post("/getmeesage",getMessageBtw)
module.exports = router
