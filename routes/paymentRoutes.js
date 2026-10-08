const router = require('express').Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
    createPayment,
    renderPaymentPage,
    processPayment
} = require('../controllers/paymentController');


// Create payment session
router.post(
    '/create',
    authMiddleware,
    createPayment
);

// Process payment
router.post(
    '/process',
    authMiddleware,
    processPayment
);

// Open payment page
router.get(
    '/:sessionId',
    authMiddleware,
    renderPaymentPage
);


module.exports = router;