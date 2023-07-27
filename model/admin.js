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
},
{
    timeStamps: true
})

export default mongoose.model('Admin', adminSchema)