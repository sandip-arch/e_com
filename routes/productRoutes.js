const express = require('express');
const router = express.Router();
const upload=require('../config/multer');
const { getAllProducts, getProductById,addProducts } = require('../controllers/productControler'); 
const {render_addProduct} = require('../controllers/renderProductController');

router.get('/addProduct', render_addProduct);




router.post('/addProduct', upload.single('image'),addProducts);

module.exports = router
