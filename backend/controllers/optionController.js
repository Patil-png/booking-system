// controllers/optionController.js
import Option from '../models/Option.js';

export const getOptions = async (req, res) => {
  try {
    const options = await Option.find();
    res.json(options);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get options' });
  }
};

export const createOption = async (req, res) => {
  try {
    const option = new Option(req.body);
    await option.save();
    res.status(201).json(option);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateOption = async (req, res) => {
  try {
    const option = await Option.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(option);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteOption = async (req, res) => {
  try {
    await Option.findByIdAndDelete(req.params.id);
    res.json({ message: 'Option deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
