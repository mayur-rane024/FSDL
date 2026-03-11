import Claim from '../models/Claim.js';
import Application from '../models/Application.js';

export const submitClaim = async (req, res) => {
  const { applicationId, reason, amount } = req.body;

  const app = await Application.findById(applicationId);
  if (!app) return res.status(404).json({ message: 'Application not found.' });

  if (app.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'You can only claim your own policy.' });
  }
  if (app.paymentStatus !== 'Paid') {
    return res.status(400).json({ message: 'Claim allowed only after payment.' });
  }

  const claim = await Claim.create({
    userId: req.user._id,
    applicationId,
    reason,
    amount,
  });
  return res.status(201).json(claim);
};

export const getMyClaims = async (req, res) => {
  const claims = await Claim.find({ userId: req.user._id })
    .populate({
      path: 'applicationId',
      populate: { path: 'policyId' },
    })
    .sort({ createdAt: -1 });
  return res.json(claims);
};

export const getAllClaims = async (_req, res) => {
  const claims = await Claim.find()
    .populate('userId', 'name email')
    .populate({
      path: 'applicationId',
      populate: { path: 'policyId', select: 'name category' },
    })
    .sort({ createdAt: -1 });
  return res.json(claims);
};

export const updateClaimStatus = async (req, res) => {
  const claim = await Claim.findById(req.params.id);
  if (!claim) return res.status(404).json({ message: 'Claim not found.' });

  claim.status = req.body.status || claim.status;
  const updated = await claim.save();
  return res.json(updated);
};
