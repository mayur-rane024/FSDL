import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    policyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Policy',
      required: true,
    },
    documentPath: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid'],
      default: 'Pending',
    },
    amountPaid: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

applicationSchema.index({ userId: 1 });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
