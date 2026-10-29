const paymentService = require('../services/paymentServices');
const Payment = require('../models/paymentModel');

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
//process payment 
const processPayment = async (req, res) => {
         console.log('🔥 /payment/process HIT');

    console.log('User:', req.user);

    console.log('Body:', req.body);
    try {

        const { sessionId, paymentMethod } = req.body;


        // Validate input

        if (!sessionId) {

            return res.status(400).json({
                success: false,
                message: 'Payment session ID is required'
            });

        }


        if (!paymentMethod) {

            return res.status(400).json({
                success: false,
                message: 'Payment method is required'
            });

        }


        // Allowed payment methods

        const allowedMethods = [
            'UPI',
            'CARD',
            'NET_BANKING',
            'WALLET'
        ];


        if (!allowedMethods.includes(paymentMethod)) {

            return res.status(400).json({
                success: false,
                message: 'Invalid payment method'
            });

        }


        // Find payment belonging to logged-in user

        const payment = await Payment.findOne({

            sessionId: sessionId,

            userId: req.user.id

        });
        console.log('Payment found:', payment);

        if (!payment) {

            return res.status(404).json({
                success: false,
                message: 'Payment session not found'
            });

        }


        // Payment must still be CREATED

        if (payment.status !== 'CREATED') {

            return res.status(400).json({

                success: false,

                message:
                    `Payment cannot be processed because its status is ${payment.status}`

            });

        }


        payment.paymentMethod = paymentMethod;


        // Move payment to PROCESSING

        payment.status = 'PROCESSING';


        await payment.save();


        payment.status = 'SUCCESS';

        await payment.save();
        console.log('Payment updated:', payment);

       return res.status(200).json({
    success: true,
    message: 'Payment processed successfully',
    payment: {
        transactionId: payment.transactionId,
        sessionId: payment.sessionId,
        amount: payment.amount,
        currency: payment.currency,
        paymentMethod: payment.paymentMethod,
        status: payment.status

            }

        });


    } catch (error) {

        console.error(
            'Payment processing error:',
            error
        );


        return res.status(500).json({

            success: false,

            message: 'Payment processing failed'

        });

    }

};

module.exports = {
    createPayment,
    renderPaymentPage,
    processPayment
};