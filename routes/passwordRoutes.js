const express = require('express');
const router = express.Router();

// Hardcoded passwords (for demo/ARG purposes only)
const USER_PASSWORD = "S-TACpass"; // Regular user password
const ADMIN_PASSWORD = "6559"; // Admin password (hardcoded)

// Password validation endpoint
router.post('/validate-password', (req, res) => {
  const { password } = req.body;

  if (password === USER_PASSWORD) {
    // Regular user
    res.json({ success: true, userId: 'user', role: 'user', message: "User access granted" });
  } else if (password === ADMIN_PASSWORD) {
    // Admin user
    req.session.userId = 'admin'; // Save admin status in session
    res.json({ success: true, userId: 'admin', role: 'admin', message: "Admin access granted" });
  } else {
    // Incorrect password
    res.status(401).json({ success: false, message: "Incorrect password" });
  }
});

module.exports = router;