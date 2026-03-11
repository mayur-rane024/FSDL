import User from '../models/User.js';
import Policy from '../models/Policy.js';
import Application from '../models/Application.js';
import Claim from '../models/Claim.js';
import Revenue from '../models/Revenue.js';

export const getAdminStats = async (_req, res) => {
  const [
    totalUsers,
    totalPolicies,
    totalApplications,
    totalClaims,
    revenueAgg,
    monthlyRegistrations,
    policiesByCategory,
    claimsByStatus,
  ] = await Promise.all([
    User.countDocuments({ role: 'user' }),
    Policy.countDocuments(),
    Application.countDocuments(),
    Claim.countDocuments(),
    Revenue.aggregate([{ $group: { _id: null, totalRevenue: { $sum: '$amount' } } }]),
    User.aggregate([
      { $match: { role: 'user' } },
      { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
    Policy.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Claim.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
  ]);

  return res.json({
    totalUsers,
    totalPolicies,
    totalApplications,
    totalClaims,
    totalRevenue: revenueAgg[0]?.totalRevenue || 0,
    monthlyRegistrations,
    policiesByCategory,
    claimsByStatus,
  });
};

export const getUsers = async (_req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  return res.json(users);
};

export const exportReport = async (_req, res) => {
  const [users, policies, applications, claims] = await Promise.all([
    User.countDocuments(),
    Policy.countDocuments(),
    Application.countDocuments(),
    Claim.countDocuments(),
  ]);

  const csv = [
    'metric,value',
    `totalUsers,${users}`,
    `totalPolicies,${policies}`,
    `totalApplications,${applications}`,
    `totalClaims,${claims}`,
  ].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=\"safelife-report.csv\"');
  return res.send(csv);
};
