const User=require('../models/userSchema');
const mongoose=require('mongoose');
const Product = require('../models/productModel');
const render_index=(req,res)=>{
    res.render("index");
}

const render_login=(req,res)=>{ 
    res.render("login");
};

const render_register=(req,res)=>{
    res.render("register");
}

const render_user=async(req,res)=>{
    console.log(req.user);
    const user=await User.findById(req.user.id);
    const products = await Product.find({});
    res.render("user",{user:user,products:products});
    //
    res.render("user",{user:user});
}
const render_forgotPassword=(req,res)=>{
    res.render("forgot-password");
}
const render_verifyOtp=(req,res)=>{
    res.render("verify-otp");
}
const render_changePassword=(req,res)=>{
    res.render("change-password");
}



module.exports={render_index,render_login,render_register,render_user,render_forgotPassword,render_verifyOtp,render_changePassword};