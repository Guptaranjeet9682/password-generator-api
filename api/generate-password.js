import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  try {
    const { key, length = 12 } = req.query;

    // 1. Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      throw new Error("Server error: JWT_SECRET not configured");
    }

    // 2. Check if key is provided
    if (!key) {
      return res.status(400).json({ error: "API key is required" });
    }

    // 3. Verify the key
    jwt.verify(key, process.env.JWT_SECRET);

    // 4. Generate password
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
    let password = "";
    
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // 5. Send response
    return res.status(200).json({ password });

  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ 
      error: error.message,
      hint: "Check if your API key is valid and JWT_SECRET is configured"
    });
  }
}
