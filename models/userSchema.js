const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        sparse: true,
        default:null,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        default: null
    },pincode:{
        type: Number,
        default: null
    },
    nearest_landmark:{
        type: String,
        default: null
    },
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user", "seller"]
    },dob:{
    type: Date,
   default:null
}
},{ timestamps: true }
)

module.exports = mongoose.model("User", userSchema);
