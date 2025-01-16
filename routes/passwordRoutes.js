const express = require('express');
const router = express.Router();

// Password for accessing the terminal
const PASSWORD = "hive2023";

// Password validation endpoint
router.post('/validate-password', (req, res) => {
  const { password } = req.body;

  if (password === PASSWORD) {
    res.json({ success: true, message: "Password is correct" });
  } else {
    res.status(401).json({ success: false, message: "Incorrect password" });
  }
});

module.exports = router;
