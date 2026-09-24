const express = require('express');
const router = express.Router();
const upload=require('../config/multer');
const { getAllProducts, getProductById,addProducts ,} = require('../controllers/productControler'); 
const {render_addProduct,render_productPage} = require('../controllers/renderProductController');
const authMiddleware=require('../middleware/authMiddleware');
router.get('/addProduct', render_addProduct);
router.get('/products', render_productPage);



router.post('/addProduct', authMiddleware,upload.single('image'),addProducts);

module.exports = router
