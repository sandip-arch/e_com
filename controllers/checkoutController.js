const Product = require('../models/productModel');
const User = require('../models/userSchema');

const renderCheckout = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).render('error', {
                message: 'Product not found.'
            });
        }

        if (!product.quantity || product.quantity <= 0) {
            return res.status(400).render('error', {
                message: 'This product is currently out of stock.'
            });
        }
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.redirect('/login');
        }

        const deliveryCharge = 0;
        res.render('checkout', {
            product,
            user,
            deliveryCharge
        });

    } catch (error) {
        console.error('Checkout Error:', error);

        res.status(500).render('error', {
            message: 'Unable to load checkout page.'
        });
    }
};

module.exports = {
    renderCheckout
};