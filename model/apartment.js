import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    houseUrl: {
        type: String,
        required: [true, "house Url is required"],
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
    description: {
        type: String,
    },
    numberOfBedrooms: {
        type: Number,
    },
    stairs: {
        type: String,
        enum: ["upstairs", "downstairs"]
    },
    images: {
        type: [String]
    },
    isDeleted: {
        type: Number,
        min: 0,
        max: 1,
        default: 0
    }
},
{
    timeStamps: true
})

export default mongoose.model('Apartment', apartmentSchema)