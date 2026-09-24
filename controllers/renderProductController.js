

const render_addProduct=(req,res)=>{
    res.render("product_page/add-product");
}



const render_productPage=(req,res)=>{

    res.render("/product_page/product-page");
}

module.exports={render_addProduct,render_productPage};