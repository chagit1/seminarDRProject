const mongoose = require('mongoose')

const ApartmentSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String,
        require: true,

    },
    image: {
        type: String,
        require: true

    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        require: true

        },
    cityId: {
        type: mongoose.Types.ObjectId,
        ref: 'city',
        require: true

    },
    address: {
        type: String,
        require: true

    },
    numOfBed: {
        type: Number,
        require: true

    },
    price:{
        type: Number,
        require: true
    },
    publisherId: {
        type: mongoose.Types.ObjectId,
        ref: 'publisher',
        require: true
    }
})

module.exports = mongoose.model('apaertment', ApartmentSchema)