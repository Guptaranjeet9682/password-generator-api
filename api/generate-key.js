import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const token = jwt.sign(
    { exp: Math.floor(Date.now() / 1000) + 86400 },
    process.env.JWT_SECRET
  );
  
  res.status(200).json({ key: token });
}
