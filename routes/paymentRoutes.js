const router = require('express').Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
    createPayment,
    renderPaymentPage
} = require('../controllers/paymentController');


// Create payment session
router.post(
    '/create',
    authMiddleware,
    createPayment
);


// Open payment page
router.get(
    '/:sessionId',
    authMiddleware,
    renderPaymentPage
);


module.exports = router;