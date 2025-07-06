// controllers/optionController.js
import Option from '../models/Option.js';

// GET all options
export const getOptions = async (req, res) => {
  try {
    const options = await Option.find();
    res.json(options);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get options' });
  }
};

// CREATE new option
export const createOption = async (req, res) => {
  const { type, name, price, members } = req.body;

  if (!type || !name || price == null || members == null) {
    return res.status(400).json({ error: 'All fields (type, name, price, members) are required' });
  }

  try {
    const option = new Option({
      type,
      name,
      price: Number(price),
      members: Number(members), // ✅ explicitly convert to number
    });

    await option.save();
    res.status(201).json(option);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE option
export const updateOption = async (req, res) => {
  const { type, name, price, members } = req.body;

  if (!type || !name || price == null || members == null) {
    return res.status(400).json({ error: 'All fields (type, name, price, members) are required' });
  }

  try {
    const option = await Option.findByIdAndUpdate(
      req.params.id,
      {
        type,
        name,
        price: Number(price),
        members: Number(members), // ✅ explicitly update
      },
      { new: true }
    );

    if (!option) return res.status(404).json({ error: 'Option not found' });
    res.json(option);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE option
export const deleteOption = async (req, res) => {
  try {
    const deleted = await Option.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Option not found' });
    res.json({ message: 'Option deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
  