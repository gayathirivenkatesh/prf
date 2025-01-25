import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};
