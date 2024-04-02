const mongoose = require('mongoose')

// const DirectionEnum = Object.freeze({
//     BB: 'BB',
//     VacationApartment: 'vacationApartment',
//     AccommodationApartment: 'AccommodationApartment',
    
// });

const CtegorySchema = mongoose.Schema({
    nameCategory: {
        type: String,
        required: true,
        // enum: Object.values(DirectionEnum)
    },

    apartments: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'apaertment',
            // require: true
        }
    ]
})

module.exports = mongoose.model('category', CtegorySchema)
// module.exports = mongoose.model('ame', Direction)
