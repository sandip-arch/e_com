const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer ID is required"],
      index: true,
    },
    distributorId: {
      type: Schema.Types.ObjectId,
      ref: "Distributor",
      required: [true, "Distributor ID is required"],
      index: true,
    },

    product: {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product ID is required"],
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      type: {
        type: String,
        default: "Product",
        trim: true,
      },
      image: {
        type: String,
        default: null,
      },
      unitPrice: {
        type: Number,
        required: true,
        min: [0, "Unit price cannot be negative"],
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"],
      },
    },

    deliveryAddress: {
      fullName: {
        type: String,
        required: [true, "Recipient name is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Email address is required"],
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
      },
      phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
      },
      pincode: {
        type: String,
        required: [true, "Pincode is required"],
        trim: true,
      },
      address: {
        type: String,
        required: [true, "Address line is required"],
        trim: true,
      },
      landmark: {
        type: String,
        default: "",
        trim: true,
      },
    },

    pricing: {
      subtotal: {
        type: Number,
        required: true,
        min: 0,
      },
      deliveryCharge: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalAmount: {
        type: Number,
        required: true,
        min: 0,
      },
    },

    payment: {
      status: {
        type: String,
        enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
        default: "PENDING",
      },
      method: {
        type: String,
        enum: ["ONLINE", "COD", "UPI", "CARD"],
        default: "ONLINE",
      },
      transactionId: {
        type: String,
        default: null,
      },
    },
    orderStatus: {
      type: String,
      enum: [
        "PLACED",
        "PROCESSING",
        "DISPATCHED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PLACED",
      index: true,
    },
  },
  {
    timestamps: true, 
  }
);


orderSchema.index({ distributorId: 1, orderStatus: 1 });
orderSchema.index({ customerId: 1, createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);