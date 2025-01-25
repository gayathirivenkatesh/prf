import verify from 'jsonwebtoken';

// Admin Authentication Middleware
const adminAuth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    // Verify the token
    const verified = verify(token, process.env.JWT_SECRET);

    // Check if the user's role is "admin"
    if (verified.role === 'admin') {
      req.user = verified; // Attach verified user info to the request object
      next(); // Continue to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'Access Denied. Admins only.' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token.' });
  }
};

// Student Authentication Middleware
const studentAuth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    // Verify the token
    const verified = verify(token, process.env.JWT_SECRET);

    // Check if the user's role is "student"
    if (verified.role === 'student') {
      req.user = verified; // Attach verified user info to the request object
      next(); // Continue to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'Access Denied. Students only.' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token.' });
  }
};

export { adminAuth, studentAuth };
