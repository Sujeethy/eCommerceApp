import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    cart: [
      {
        productId: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    orders: [
      {
        orderId: {
          type: String,
          required: true
        },
        products: [
          {
            productId: {
              type: Number,
              required: true
            },
            quantity: {
              type: Number,
              default: 1
            },
            price: {
              type: Number,
              required: true
            },
            name:{
              type: String,
              required: true
            }
          }
        ],
        total: {
          type: Number,
          required: true
        },
        payment: {
          paymentId: {
            type: String,
            required: true
          },
          paymentStatus: {
            type: String,
            required: true
          }
        },
        status: {
          type: String,
          default: 'pending'
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
    
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
