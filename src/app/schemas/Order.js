import mongoose from 'mongoose';

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
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', OrderSchema);
