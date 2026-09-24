const User=require('../models/userSchema');
const { getCheckoutUser } = require('../temp/checkout'); //just from temporary
const mongoose=require('mongoose');
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
const render_checkout = async (req, res) => {

    try {

        const user = await getCheckoutUser(req.user.id);

        res.render('checkout', {
            user
        });

    } catch (error) {

        console.error(error);

        res.status(500).send('Unable to load checkout information');

    }

};


module.exports={render_index,render_login,render_register,render_user,render_forgotPassword,render_verifyOtp,render_changePassword};