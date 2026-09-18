const express =require('express');
const dotenv=require('dotenv');
const path=require('path');
const cookieParser=require('cookie-parser');
const connectDB=require('./config/db');
const authRoutes=require('./routes/authRoutes');
const app=express();
dotenv.config();
connectDB();
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(cookieParser());


app.use('/',authRoutes);


app.listen(process.env.PORT,()=> console.log(`http://localhost:${process.env.PORT}`));