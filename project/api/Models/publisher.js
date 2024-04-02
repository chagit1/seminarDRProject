const mongoose = require('mongoose')

const PublisherSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true,
        match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    enothrPhone: {
        type: String
    },
    apartments: [{
        type:  mongoose.Types.ObjectId,
        ref:'apaertment',
        // require: true
    }
]
})


module.exports = mongoose.model('publisher', PublisherSchema)