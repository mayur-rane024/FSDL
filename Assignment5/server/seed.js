import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import Policy from './models/Policy.js';
import Application from './models/Application.js';
import Claim from './models/Claim.js';
import Revenue from './models/Revenue.js';

dotenv.config();

const seedPolicies = [
  {
    name: 'SafeLife Term Secure',
    category: 'Life',
    description: 'Affordable long-term life cover designed to protect your family income and liabilities.',
    premiumAmount: 1200,
    coverageAmount: 1500000,
    durationInYears: 20,
  },
  {
    name: 'SafeHealth Prime',
    category: 'Health',
    description: 'Comprehensive hospitalization and critical illness cover with cashless network support.',
    premiumAmount: 950,
    coverageAmount: 500000,
    durationInYears: 1,
  },
  {
    name: 'AutoShield Plus',
    category: 'Vehicle',
    description: 'Vehicle insurance covering own damage, third-party liability, and roadside assistance.',
    premiumAmount: 700,
    coverageAmount: 300000,
    durationInYears: 1,
  },
  {
    name: 'HomeGuard Elite',
    category: 'Home',
    description: 'Home structure and content protection against natural disasters, theft, and fire.',
    premiumAmount: 1100,
    coverageAmount: 800000,
    durationInYears: 5,
  },
  {
    name: 'TravelSure Global',
    category: 'Travel',
    description: 'Travel insurance with emergency medical support, baggage protection, and trip cancellation.',
    premiumAmount: 450,
    coverageAmount: 200000,
    durationInYears: 1,
  },
];

const seed = async () => {
  try {
    await connectDB();

    await Promise.all([
      User.deleteMany(),
      Policy.deleteMany(),
      Application.deleteMany(),
      Claim.deleteMany(),
      Revenue.deleteMany(),
    ]);

    await User.create({
      name: 'SafeLife Admin',
      email: 'admin@safelife.com',
      password: 'admin123',
      role: 'admin',
    });

    await Policy.insertMany(seedPolicies);

    console.log('[Seed] Admin user and 5 sample policies inserted.');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`[Seed] Failed: ${error.message}`);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seed();
