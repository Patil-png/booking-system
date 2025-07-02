import express from 'express';
import { submitContactForm, getAllContacts, replyToContact } from '../controllers/contactController.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';
import Contact from '../models/Contact.js'; // Make sure you import the model

const router = express.Router();

// Existing routes
router.post('/contact', submitContactForm); // Public route
router.get('/admin/contacts', verifyAdmin, getAllContacts); // Admin only
router.post('/admin/contacts/reply', verifyAdmin, replyToContact);

// ✅ ADD THIS NEW DELETE ROUTE
router.delete('/admin/contacts/:id', verifyAdmin, async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

export default router;
