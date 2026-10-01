const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        transactionId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        sessionId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        currency: {
            type: String,
            default: 'INR'
        },

        quantity: {
            type: Number,
            required: true
        },

        paymentMethod: {
            type: String,
            default: null
        },

        status: {
            type: String,
            enum: [
                'CREATED',
                'PENDING',
                'PROCESSING',
                'SUCCESS',
                'FAILED',
                'EXPIRED',
                'REFUNDED'
            ],
            default: 'CREATED'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Payment', paymentSchema);