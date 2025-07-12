import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  try {
    console.log("Request received"); // Debug log
    
    // 1. Get parameters
    const { key, length = 12 } = req.query;
    
    // 2. Validate JWT_SECRET
    if (!process.env.JWT_SECRET) {
      throw new Error("Server Error: JWT_SECRET is not set");
    }
    
    // 3. Validate API Key
    if (!key) {
      return res.status(400).json({ error: "API key is required" });
    }
    
    // 4. Verify Key
    jwt.verify(key, process.env.JWT_SECRET);
    
    // 5. Generate Password
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    // 6. Send Success Response
    return res.status(200).json({ password });
    
  } catch (error) {
    console.error("Error:", error.message); // Debug log
    return res.status(500).json({ 
      error: error.message,
      solution: "Please check your API key and server configuration"
    });
  }
}
