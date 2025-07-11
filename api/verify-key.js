const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const { key } = req.query;
  
  try {
    const decoded = jwt.verify(key, process.env.JWT_SECRET);
    const expiresIn = decoded.exp * 1000 - Date.now();
    
    res.status(200).json({ 
      valid: true,
      expiresIn: `${Math.floor(expiresIn/3600000)} hours ${Math.floor((expiresIn%3600000)/60000)} minutes`
    });
  } catch (e) {
    res.status(200).json({ valid: false, error: e.message });
  }
};
