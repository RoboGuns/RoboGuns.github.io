const express = require('express');
const router = express.Router(); // Use a router, not an app

const CORRECT_PASSWORD = "CORRECT";

// Define the endpoint on the router
router.post('/validate-phrase', (req, res) => {
  const { password } = req.body;
  if (password === CORRECT_PASSWORD) {
    res.json({ success: true, message: "Access granted", redirectUrl: 'https://roboguns.github.io/Hubish/Newusersignup.html' });
  } else {
    res.status(401).json({ success: false, message: "Incorrect password" });
  }
});

module.exports = router; // Export the router