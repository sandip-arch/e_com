const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User =require('../models/userSchema');
const sendResetEmail=require('../utils/utilsMailer');
const passwordReset=require('../models/passwordReset')


const register =async(req,res)=>{
    const {email,password,name}=req.body;
    if(!email||!password){
        return res.status(400).render('error' , {error:{message:'email and password are required'}});
    }

    const userExists=await User.findOne({email});
    if(userExists){
        return res.status(400).render('error' , {error:{message:'email is already in use'}});
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
        return res.status(400).render('error' , {error:{message:'email and password are required'}});
    }

    const userExists=await User.findOne({email});
    if(!userExists){
        return res.status(400).render('error' , {error:{message:'email is not registered'}});
    }

    const isPasswordValid=await bcrypt.compare(password,userExists.password);
    if(!isPasswordValid){
        return res.status(400).render('error' , {error:{message:'invalid password'}});
    }
    const token=jwt.sign({id:userExists._id},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.cookie('token',token,{
        httpOnly:true,
      
        maxAge:60*60*1000
    });
    res.redirect('/user');
}

const forgotPassword=async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.status(400).render('error' , {error:{message:'email is required'}});
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).render('error' , {error:{message:'email is not registered'}});
    }

    const otp=Math.floor(100000+Math.random()*900000);
    const userPass=new passwordReset({
        userId:user._id,
        email:email,
        otp:otp
    });
    await userPass.save();
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.cookie('token',token,{
        httpOnly:true,
        maxAge:60*60*1000
    });
    sendResetEmail(email,otp);
    res.redirect('/verifyOtp');
}
const verifyOtp=async(req,res)=>{
    const {otp}=req.body;
    if(!otp){
        return res.status(400).render('error' , {error:{message:'otp is required'}});
    }
    const userPass=await passwordReset.findOne({otp});
    if(!userPass){
        return res.status(400).render('error' , {error:{message:'invalid otp'}});
    }
    const user=await User.findById(userPass.userId);
    if(!user){
        return res.status(400).render('error' , {error:{message:'user not found'}});
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.cookie('token',token,{
        httpOnly:true,
        maxAge:60*60*1000
    });
    res.redirect('/changePassword');
}
const changePassword=async(req,res)=>{
    const {password,confirmPassword}=req.body;
    if(!password){
        return res.status(400).render('error' , {error:{message:'password is required'}});
    }
    if(password!==confirmPassword){
        return res.status(400).render('error' , {error:{message:'passwords do not match'}});
    }
    if(!req.cookies.token){
        return res.status(400).render('error' , {error:{message:'token not found'}});
    }
    const token=req.cookies.token;
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    
    const user=await User.findById(decoded.id);
    console.log(user);
    if(!user){
        return res.status(400).render('error' , {error:{message:'user not found'}});
    }
    const salt =await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    user.password=hashedPassword;
    await user.save();
    res.redirect('/login');
}
module.exports={register,login,forgotPassword,verifyOtp,changePassword};
