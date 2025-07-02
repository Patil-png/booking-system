import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // ✅ Add `isAdmin: true` to token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// import Admin from '../models/Admin.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// export const loginAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     const valid = await bcrypt.compare(password, admin.password);
//     if (!valid) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
//       expiresIn: '2d',
//     });

//     res.status(200).json({ token });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };