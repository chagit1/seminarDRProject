const express = require('express')

const {
    createCity,
    allCity,
    // weatherByIdCity,
    weatherByIdCityFunc,
    weatherForNextFewDays
} = require('../controllers/city')
const { allowingAccess } = require('../middlewares')

const router = express.Router()

router.post('/createCity', createCity)
router.get('/allCity', allCity)
// router.get('/weatherByIdCity', weatherByIdCity)
router.get('/weatherByIdCityFunc/:_id', weatherByIdCityFunc)
router.get('/weatherForNextFewDays/:_id/:numOfDays', weatherForNextFewDays)

module.exports = router