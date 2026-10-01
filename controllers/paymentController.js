const paymentService = require('../services/paymentService');

module.exports = {
    createPayment,
    renderPaymentPage
};
// Create payment session
const createPayment = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const paymentSession = await paymentService.createPaymentSession({
            userId: req.user.id,
            productId,
            quantity: Number(quantity)
        });

        return res.status(201).json({
            success: true,
            message: 'Payment session created',
            payment: paymentSession
        });

    } catch (error) {
        console.error('Payment creation error:', error);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Show payment page
const renderPaymentPage = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const Payment = require('../models/paymentModel');

        const payment = await Payment.findOne({
            sessionId,
            userId: req.user.id
        })
        .populate('productId');

        if (!payment) {
            return res.status(404).render('error', {
                error: {
                    message: 'Payment session not found.'
                }
            });
        }

        res.render('payment', {
            payment
        });

    } catch (error) {
        console.error('Payment page error:', error);

        return res.status(500).render('error', {
            error: {
                message: 'Unable to load payment page.'
            }
        });
    }
};


module.exports = {
    createPayment,
    renderPaymentPage
};