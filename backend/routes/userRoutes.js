const express = require('express')
const { getUserList } = require('../controllers/userControlles')
const router = express.Router()
router.post("/getusers",getUserList)

module.exports = router
