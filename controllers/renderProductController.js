
const Product = require('../models/productModel');

const render_addProduct=async (req,res)=>{
    res.render("product_page/add-product");
}



const render_productPage=async (req,res)=>{
const user = req.user; 
        const products = await Product.find({}); 
console.log(products);
        res.render('user', {
            user,
          products
        });
}


module.exports={render_addProduct,render_productPage};