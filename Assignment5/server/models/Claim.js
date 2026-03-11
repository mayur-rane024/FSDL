import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema(
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
    reason: {
      type: String,
      required: [true, 'Claim reason is required'],
      minlength: 10,
    },
    amount: {
      type: Number,
      required: [true, 'Claim amount is required'],
      min: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

claimSchema.index({ status: 1 });

const Claim = mongoose.model('Claim', claimSchema);
export default Claim;
