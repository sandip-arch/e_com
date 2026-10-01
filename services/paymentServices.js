const crypto = require('crypto');
const Payment = require('../models/paymentModel');
const Product = require('../models/productModel');

const DELIVERY_CHARGE = 50;

const createPaymentSession = async ({
    userId,
    productId,
    quantity
}) => {

    const product = await Product.findById(productId);

    if (!product) {
        throw new Error('Product not found');
    }

    // 2. Validate quantity
    if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error('Invalid quantity');
    }

    // 3. Check stock
    if (quantity > product.quantity) {
        throw new Error('Insufficient stock');
    }

    // 4. Calculate amount SERVER-SIDE
    const productAmount = product.price * quantity;

    const totalAmount =
        productAmount + DELIVERY_CHARGE;

    // 5. Generate unique IDs
    const transactionId =
        `TXN-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    const sessionId =
        `SES-${crypto.randomUUID()}`;

    // 6. Create payment record
    const payment = await Payment.create({
        transactionId,
        sessionId,
        userId,
        productId,
        amount: totalAmount,
        currency: 'INR',
        quantity,
        status: 'CREATED'
    });

    return {
        transactionId: payment.transactionId,
        sessionId: payment.sessionId,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status
    };
};

module.exports = {
    createPaymentSession
};