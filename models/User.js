import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        // required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profilepic: {
        type: String,
        // required: true
    },
    coverpic:{
        type: String,
        // required: true
    },
    razorpay_id: {
        type: String,
        // required: true
    },
    razorpay_secret: {
        type: String,
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.User || model('User', UserSchema);;