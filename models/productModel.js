const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    price:{
        type:Number,
    },
    type:{
        type:String,
        enum:['clothes','cosmetics','electronics','food'],
    },
    quantity:{
        type:Number,
    },
    image:{     
        type:String,
    },
    description:{
        type:String,
    },
    distributerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
});
module.exports=mongoose.model('Product', productSchema);