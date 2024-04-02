const mongoose = require('mongoose')

const CitySchema = mongoose.Schema({
    nameCity: {
        type: String,
        require: true
    },
    apartments: [{
        type:  mongoose.Types.ObjectId,
        ref:'apaertment',
        // require: true
    }
]
})


module.exports = mongoose.model('city', CitySchema)