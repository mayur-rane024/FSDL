import Application from '../models/Application.js';
import Policy from '../models/Policy.js';
import Revenue from '../models/Revenue.js';

export const applyPolicy = async (req, res) => {
  const { policyId } = req.body;
  const policy = await Policy.findById(policyId);
  if (!policy) return res.status(404).json({ message: 'Policy not found.' });

  const app = await Application.create({
    userId: req.user._id,
    policyId,
    documentPath: req.file ? `/uploads/${req.file.filename}` : '',
  });
  return res.status(201).json(app);
};

export const getMyApplications = async (req, res) => {
  const apps = await Application.find({ userId: req.user._id }).populate('policyId').sort({ createdAt: -1 });
  return res.json(apps);
};

export const getAllApplications = async (_req, res) => {
  const apps = await Application.find()
    .populate('policyId', 'name category premiumAmount')
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });
  return res.json(apps);
};

export const updateApplicationStatus = async (req, res) => {
  const app = await Application.findById(req.params.id);
  if (!app) return res.status(404).json({ message: 'Application not found.' });

  app.status = req.body.status || app.status;
  const updated = await app.save();
  return res.json(updated);
};

export const payPremium = async (req, res) => {
  const app = await Application.findById(req.params.id).populate('policyId');
  if (!app) return res.status(404).json({ message: 'Application not found.' });

  if (app.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'You can only pay for your own application.' });
  }
  if (app.paymentStatus === 'Paid') {
    return res.status(400).json({ message: 'Premium already paid for this application.' });
  }

  app.paymentStatus = 'Paid';
  app.status = 'Approved';
  app.amountPaid = app.policyId.premiumAmount;
  await app.save();

  await Revenue.create({
    userId: req.user._id,
    applicationId: app._id,
    amount: app.policyId.premiumAmount,
    source: 'Premium Payment',
  });

  return res.json({
    message: 'Payment successful. Application approved.',
    application: app,
  });
};
