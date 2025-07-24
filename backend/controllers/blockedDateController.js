import BlockedDate from '../models/BlockedDate.js';

// Add a blocked date
export const addBlockedDate = async (req, res) => {
  try {
    const { type, date } = req.body;
    const existing = await BlockedDate.findOne({ type, date });
    if (existing) {
      return res.status(400).json({ error: 'Date already blocked.' });
    }
    const blockedDate = new BlockedDate({ type, date });
    await blockedDate.save();
    res.status(201).json(blockedDate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all blocked dates for a type
export const getBlockedDates = async (req, res) => {
  try {
    const list = await BlockedDate.find({ type: req.query.type });
    res.json(list); // ✅ Make sure this sends JSON
  } catch (err) {
    console.error('Error fetching blocked dates:', err);
    res.status(500).json({ error: err.message });
  }
};

// Delete a blocked date by ID
export const deleteBlockedDate = async (req, res) => {
  try {
    const { id } = req.params;
    await BlockedDate.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

