// ✅ middleware/verifyAdmin.js
import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Forbidden - Not an admin" });
    }

    req.user = decoded; // Optional
    next(); // ✅ Proceed to the actual controller
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};



// import jwt from 'jsonwebtoken';

// export const verifyAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ email });
//     if (!admin) return res.status(404).json({ message: 'Admin not found' });

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = jwt.sign(
//       {
//         id: admin._id,
//         isAdmin: true, // ✅ This must be included
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     res.status(200).json({ token });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// import jwt from 'jsonwebtoken';

// export const verifyAdmin = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized: No token provided' });
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded.isAdmin) return res.status(403).json({ message: 'Forbidden: Not an admin' });

//     req.admin = decoded;
//     next();
//   } catch (err) {
//     res.status(403).json({ message: 'Forbidden: Invalid token' });
//   }
// };


// // 📁 middleware/verifyAdmin.js
// import jwt from 'jsonwebtoken';

// export const verifyAdmin = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Debug (optional)
//     console.log("Decoded token:", decoded);

//     if (!decoded.isAdmin) {
//       return res.status(403).json({ message: "Forbidden: Not an admin" });
//     }

//     req.admin = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Forbidden: Invalid token" });
//   }
// };
