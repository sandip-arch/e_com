const paymentService = require('../services/paymentServices');

const createPayment = async (req, res) => {

    try {

        const { productId, quantity } = req.body;

        const paymentSession =
            await paymentService.createPaymentSession({
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

module.exports = {
    createPayment
};