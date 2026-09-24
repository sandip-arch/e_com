const Product = require('../models/productModel');
const User=require('../models/userSchema');



const addProducts = async (req, res) => {
    const user=await User.findById(req.user.id);
    if (user.role !== 'distributer') {
        return res.render('error', { message: 'You are not distributor to add products.' });
    }
     try {
        if (!req.file) {
            return res.status(400).send('Please upload an image.');
        }
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            type: req.body.type,
            quantity: req.body.quantity,
            image: `/uploads/${req.file.filename}`,
            description: req.body.description,
            distributerId: req.user._id 
        });

        await newProduct.save();
        res.send('Product added successfully!');
        
    } catch (error) {
       
        res.render('error', { message: 'Error adding product. Please try again.' });
    }

   
}

const getAllProducts = async (req, res) => {


}

const getProductById = async (req, res) => {

}

module.exports = { addProducts, getAllProducts, getProductById };