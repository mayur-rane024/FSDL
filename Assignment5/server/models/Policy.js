import mongoose from 'mongoose';

const policySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Policy name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Policy category is required'],
      enum: ['Life', 'Health', 'Vehicle', 'Home', 'Travel'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Policy description is required'],
      minlength: 20,
    },
    premiumAmount: {
      type: Number,
      required: [true, 'Premium amount is required'],
      min: 0,
    },
    coverageAmount: {
      type: Number,
      required: [true, 'Coverage amount is required'],
      min: 0,
    },
    durationInYears: {
      type: Number,
      required: [true, 'Duration is required'],
      min: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

policySchema.index({ category: 1 });

const Policy = mongoose.model('Policy', policySchema);
export default Policy;
