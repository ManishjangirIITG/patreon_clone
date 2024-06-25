import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    to_user: {
        type: String,
        required: true
    },
    order_id: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'pending'
    },
});

export default mongoose.models.Payment || model('Payment', PaymentSchema);;