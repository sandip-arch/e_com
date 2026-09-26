const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { renderCheckout } = require('../controllers/checkoutController');

router.get('/checkout', authMiddleware, renderCheckout);

module.exports = router;