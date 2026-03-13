const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      enum: ['car', 'bike', 'other'],
      default: 'other',
    },
    brand: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear() + 1,
    },
    kmDriven: {
      type: Number,
      min: 0,
    },
    condition: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor'],
      default: 'good',
    },
    fuelType: {
      type: String,
      enum: ['petrol', 'diesel', 'electric', 'hybrid', 'cng', 'other'],
    },
    location: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    sellerName: {
      type: String,
      required: [true, 'Seller name is required'],
      trim: true,
    },
    sellerContact: {
      type: String,
      required: [true, 'Seller contact is required'],
      trim: true,
    },
    isSold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Listing', listingSchema);
