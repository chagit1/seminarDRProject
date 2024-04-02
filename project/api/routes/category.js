const express = require('express')

const {
    createCategory,
    allCategory,
} = require('../controllers/category')
const { allowingAccess } = require('../middlewares')

const router = express.Router()

router.post('/createCategory',createCategory)
router.get('/allCategory', allCategory)

module.exports = router