const { Schema, model } = require('mongoose');

const parkingSchema = new Schema({
    coordinates: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    address: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true,
        trim: true,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

const Parking = new model('Parking', parkingSchema);

module.exports = Parking;