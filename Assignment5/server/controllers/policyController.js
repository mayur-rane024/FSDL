import Policy from '../models/Policy.js';

export const getPolicies = async (_req, res) => {
  const policies = await Policy.find({ isActive: true }).sort({ createdAt: -1 });
  return res.json(policies);
};

export const createPolicy = async (req, res) => {
  const policy = await Policy.create(req.body);
  return res.status(201).json(policy);
};

export const updatePolicy = async (req, res) => {
  const policy = await Policy.findById(req.params.id);
  if (!policy) return res.status(404).json({ message: 'Policy not found.' });

  Object.assign(policy, req.body);
  const updated = await policy.save();
  return res.json(updated);
};

export const deletePolicy = async (req, res) => {
  const policy = await Policy.findById(req.params.id);
  if (!policy) return res.status(404).json({ message: 'Policy not found.' });
  await policy.deleteOne();
  return res.json({ message: 'Policy deleted successfully.' });
};
