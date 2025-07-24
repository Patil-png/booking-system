import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

export const replyToContact = async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Gouri Inn Admin" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: `<div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fa; padding: 32px;">
        <div style="max-width: 520px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); overflow: hidden;">
          <div style="background: linear-gradient(90deg, #10b981 0%, #2563eb 100%); padding: 24px 32px; text-align: center;">
            <img src='https://i.imgur.com/8Km9tLL.png' alt='Gouri Inn Logo' style='width: 56px; height: 56px; border-radius: 12px; margin-bottom: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);' />
            <h1 style="color: #fff; margin: 0; font-size: 2rem; letter-spacing: 1px;">🏨 Gouri Inn</h1>
            <p style="color: #e0f2fe; margin: 8px 0 0; font-size: 1.1rem;">Admin Reply</p>
          </div>
          <div style="padding: 32px;">
            <h2 style="color: #2563eb; margin-bottom: 16px; font-size: 1.3rem;">Message from Gouri Inn</h2>
            <div style="font-size: 1.1rem; color: #222; margin-bottom: 24px;">${message}</div>
            <div style="color: #888; font-size: 0.95rem; text-align: center;">
              <p style="margin: 0;">Gouri Inn, Your Comfort is Our Priority</p>
              <p style="margin: 0;">Contact: +91 8799866811 | Email: gouriinn@example.com</p>
            </div>
          </div>
        </div>
      </div>`
    });

    res.status(200).json({ message: "Reply sent successfully" });
  } catch (error) {
    console.error("Error sending reply email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};


export const submitContactForm = async (req, res) => {
  const { name, email, phone, inquiryType, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    await Contact.create({ name, email, phone, inquiryType, message, ip: userIP });
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching contacts' });
  }
};


// import Contact from "../models/Contact.js";  // Use ES Module import

// // Submit a contact form
// export const submitContactForm = async (req, res) => {
//   const { name, email, phone, inquiryType, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     // Capture IP address
//     const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

//     // Save form data + IP to database
//     await Contact.create({ name, email, phone, inquiryType, message, ip: userIP });

//     res.status(201).json({ message: 'Message sent successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error', details: err.message });
//   }
// };

// // Get all contacts
// export const getAllContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.status(200).json(contacts);
//   } catch (err) {
//     res.status(500).json({ message: "Server error fetching contacts" });
//   }
// };



// // Delete a contact by ID
// export const deleteContact = async (req, res) => {
//   try {
//     const { id } = req.params; // Assuming the contact ID is passed as a route parameter

//     // Find and delete the contact by its ID
//     const contact = await Contact.findByIdAndDelete(id);

//     if (!contact) {
//       return res.status(404).json({ message: "Contact not found" });
//     }

//     res.status(200).json({ message: "Contact deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting contact:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Update a contact by ID
// export const updateContact = async (req, res) => {
//   try {
//     const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updated);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to update contact' });
//   }
// };

// // Export functions for use in routes
// export default { submitContactForm, getAllContacts, updateContact, deleteContact };



// import Contact from '../models/Contact.js';
// import rateLimit from 'express-rate-limit';

// export const submitContactForm = async (req, res) => {
//   const { name, email, phone, inquiryType, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }
//   try {
//     // ✅ Capture IP address
//     const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

//     // ✅ Save form data + IP to database
//     await Contact.create({ name, email, phone, inquiryType, message, ip: userIP });

//     res.status(201).json({ message: 'Message sent successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error', details: err.message });
//   }
// };

// export const getAllContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.status(200).json(contacts); 
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch contacts' });
//   }
// };

// export const deleteContact = async (req, res) => {
//   try {
//     await Contact.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Deleted successfully' });
//   } catch {
//     res.status(400).json({ error: 'Failed to delete contact' });
//   }
// };

// export const updateContact = async (req, res) => {
//   try {
//     const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updated);
//   } catch {
//     res.status(400).json({ error: 'Failed to update contact' });
//   }
// };




// /////////////////////////////////////////////////////////// Main Perfect file///////////////////////////////////////////////////


// // import Contact from '../models/Contact.js';
// // import rateLimit from 'express-rate-limit';

// // export const submitContactForm = async (req, res) => {
// //   const { name, email, phone, inquiryType, message } = req.body;

// //   if (!name || !email || !message) {
// //     return res.status(400).json({ error: 'Missing required fields' });
// //   }
// //   try {
// //     // ✅ Capture IP address
// //     const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

// //     // ✅ Save form data + IP to database
// //     await Contact.create({ name, email, phone, inquiryType, message, ip: userIP });

// //     res.status(201).json({ message: 'Message sent successfully' });
// //   } catch (err) {
// //     res.status(500).json({ error: 'Server error', details: err.message });
// //   }
// // };

// // export const getAllContacts = async (req, res) => {
// //   try {
// //     const contacts = await Contact.find().sort({ createdAt: -1 });
// //     res.status(200).json(contacts);
// //   } catch (err) {
// //     res.status(500).json({ error: 'Failed to fetch contacts' });
// //   }
// // };
