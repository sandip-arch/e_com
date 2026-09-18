const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User =require('../models/userSchema');




const register =async(req,res)=>{
    const {email,password,name}=req.body;
    if(!email||!password){
        return res.status(400).render('/error' , {error:{message:'email and password are required'}});
    }

    const userExists=await User.findOne({email});
    if(userExists){
        return res.status(400).render('/error' , {error:{message:'email is already in use'}});
    }   

    const salt =await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const user=new User({email,password:hashedPassword,name});
    await user.save();
    res.redirect('/login'); 
}

const login =async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).render('/error' , {error:{message:'email and password are required'}});
    }

    const userExists=await User.findOne({email});
    if(!userExists){
        return res.status(400).render('/error' , {error:{message:'email is not registered'}});
    }

    const isPasswordValid=await bcrypt.compare(password,userExists.password);
    if(!isPasswordValid){
        return res.status(400).render('/error' , {error:{message:'invalid password'}});
    }
    const token=jwt.sign({id:userExists._id},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.cookie('token',token,{
        httpOnly:true,
      
        maxAge:60*60*1000
    });
    res.redirect('/user');
}

module.exports={register,login};
