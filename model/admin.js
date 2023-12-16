import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        required: [true, "email is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    type: {
        type: Number,
        required: true,
        default: 0
    }
},
{
    timeStamps: true
})

export default mongoose.model('Admin', adminSchema)