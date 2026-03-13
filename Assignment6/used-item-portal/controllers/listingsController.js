const mongoose = require('mongoose');
const Listing = require('../models/Listing');

const isValidId = (id) => mongoose.isValidObjectId(id);

// GET /api/listings - Get all listings (with optional filters)
const getListings = async (req, res) => {
  try {
    const { category, condition, minPrice, maxPrice, search, isSold } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (condition) filter.condition = condition;
    if (isSold !== undefined) filter.isSold = isSold === 'true';
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const listings = await Listing.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: listings.length, data: listings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/listings/:id - Get single listing
const getListingById = async (req, res) => {
  if (!isValidId(req.params.id))
    return res.status(400).json({ success: false, message: 'Invalid listing ID' });
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }
    res.json({ success: true, data: listing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/listings - Create a new listing
const createListing = async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json({ success: true, data: listing });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/listings/:id - Update a listing
const updateListing = async (req, res) => {
  if (!isValidId(req.params.id))
    return res.status(400).json({ success: false, message: 'Invalid listing ID' });
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }
    res.json({ success: true, data: listing });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/listings/:id - Delete a listing
const deleteListing = async (req, res) => {
  if (!isValidId(req.params.id))
    return res.status(400).json({ success: false, message: 'Invalid listing ID' });
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }
    res.json({ success: true, message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getListings, getListingById, createListing, updateListing, deleteListing };
