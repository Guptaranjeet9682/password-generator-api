const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  // Generate a token that expires in 24 hours
  const token = jwt.sign(
    { exp: Math.floor(Date.now() / 1000) + 86400 },
    process.env.JWT_SECRET
  );
  
  res.status(200).json({ key: token });
};
