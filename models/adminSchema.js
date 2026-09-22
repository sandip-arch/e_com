const mongoosse=require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role:{
    type:String,
    default:'admin',
    enum:['admin','super_admin']
  },
  permissions: [{ type: String }] 
}, { timestamps: true });

module.exports=mongoose.model('Admin',AdminSchema);