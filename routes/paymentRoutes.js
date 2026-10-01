const router = require('express').Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    createPayment
} = require('../controllers/paymentController');

router.post(
    '/create',
    authMiddleware,
    createPayment
);

module.exports = router;