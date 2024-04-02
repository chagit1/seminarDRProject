const express = require('express')

const {
    signUp,
    signIn,
} = require('../controllers/client')
// const { allowingAccess } = require('../middlewares')
// const { allowingAccess } = require('../middlewares')

const router = express.Router()

router.post('/signUp', signUp)
router.post('/signIn',signIn)

module.exports = router