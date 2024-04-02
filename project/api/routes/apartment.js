const express = require('express')

const {
    createApartment,
    update,
    remove,
    getAllApartment,
    getById,
    getByIdAndNumOfDay,
    getByCategoryId,
    getByCityId,
    getByPublisherId,
    getByNumOfBadGreader,
    getByNumOfBadLesser,
    getByNumOfBadEqual,
    getByNumOfPriceGreader,
    getByNumOfPriceLesser,
    getByNumOfPriceEqual
    
} = require('../controllers/apartment')
const { allowingAccess, upload } = require('../middlewares')

const router = express.Router()

router.post('/createApartment',upload.single('image'),createApartment)
router.put('/update/:_id', update)
router.delete('/remove/:_id', remove)
router.get('/getAllApartment' ,getAllApartment)
router.get('/getById/:_id', getById)
router.get('/getByIdAndNumOfDay/:_id/:numOfDays', getByIdAndNumOfDay)
router.get('/getByCategoryId/:_id', getByCategoryId)
router.get('/getByCityId/:_id',getByCityId)
router.get('/getByPublisherId/:_id',getByPublisherId)
router.get('/getByNumOfBadGreader/:numOfBed', getByNumOfBadGreader)
router.get('/getByNumOfBadLesser/:numOfBed', getByNumOfBadLesser)
router.get('/getByNumOfBadEqual/:numOfBed', getByNumOfBadEqual,allowingAccess)
router.get('/getByNumOfPriceGreader/:price', getByNumOfPriceGreader)
router.get('/getByNumOfPriceLesser/:price', getByNumOfPriceLesser)
router.get('/getByNumOfPriceEqual/:price', getByNumOfPriceEqual)



module.exports = router