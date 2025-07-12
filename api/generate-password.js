import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const { key, length = 12 } = req.query;
  
  try {
    jwt.verify(key, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).json({ error: "Invalid key" });
  }
  
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  res.status(200).json({ password });
}
