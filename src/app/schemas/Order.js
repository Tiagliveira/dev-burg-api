import mongoose from 'mongoose';
import { number } from 'yup';

const OrderSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    products: [
      {
        id: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        observation: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      required: true,
    },
    observation: {
      type: String,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: false,
    },
    isRated: {
      type: Boolean,
      default: false,
    },
    orderType: {
      type: String,
      required: true,
      enum: ['delivery', 'takeout'],
      default: 'delivery',
    },
    deliveryFee: {
      type: Number,
    },
    address: {
      cep: {type: String},
      street: { type: String},
      number: { type: String},
      neighborhood: { type: String},
      city: { type: String},
      complement: { type: String},
    },
    messages: [
      {
        userName: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', OrderSchema);
