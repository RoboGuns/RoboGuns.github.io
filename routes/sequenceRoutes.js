const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Hardcoded correct password
const CORRECT_PASSWORD = "CORRECT"; // The correct password for the puzzle

// Password validation endpoint
app.post('/validate-phrase', (req, res) => {
  const { password } = req.body;

  if (password === CORRECT_PASSWORD) {
    // Correct password
    res.json({ success: true, message: "Access granted", redirectUrl: 'https://example.com/next-page' }); // Replace with your next page URL
  } else {
    // Incorrect password
    res.status(401).json({ success: false, message: "Incorrect password" });
  }
});

// Serve the static HTML file
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});