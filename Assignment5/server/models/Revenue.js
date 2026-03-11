import mongoose from 'mongoose';

const revenueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    source: {
      type: String,
      default: 'Premium Payment',
    },
  },
  { timestamps: true }
);

const Revenue = mongoose.model('Revenue', revenueSchema);
export default Revenue;
