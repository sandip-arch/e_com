const User=require('../models/userSchema');
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




module.exports={render_index,render_login,render_register,render_user};