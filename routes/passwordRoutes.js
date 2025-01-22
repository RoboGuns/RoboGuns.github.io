const express = require('express');
const router = express.Router();

// Passwords for accessing the terminal
const USER_PASSWORD = "S-TACpass"; // Password for regular users
const ADMIN_PASSWORD = "ADMIN-ENTRY9490"; // Password for admins

// Password validation endpoint
router.post('/validate-password', (req, res) => {
  const { password } = req.body;

  if (password === USER_PASSWORD) {
    // Regular user
    res.json({ success: true, userId: 'user', role: 'user', message: "User access granted" });
  } else if (password === ADMIN_PASSWORD) {
    // Admin user
    res.json({ success: true, userId: 'admin', role: 'admin', message: "Admin access granted" });
  } else {
    // Incorrect password
    res.status(401).json({ success: false, message: "Incorrect password" });
  }
});

module.exports = router;