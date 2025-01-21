const express = require('express');
const bodyParser = require('body-parser');

// Create a new router for the validation pattern logic
const router = express.Router();

// Correct URL sequence (adjust as needed)
const correctSequence = [
  'https://example.com/page1',
  'https://example.com/page2',
  'https://example.com/page3',
  'https://example.com/page4'
];

router.use(bodyParser.json());

router.post('/validate-pattern', (req, res) => {
  const { urls } = req.body;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ success: false, message: 'Invalid input format.' });
  }

  // Check if the input sequence matches the correct sequence
  const isValid = JSON.stringify(urls) === JSON.stringify(correctSequence);

  if (isValid) {
    res.json({ success: true, message: 'Correct sequence! You have solved the puzzle.' });
  } else {
    res.json({ success: false, message: 'Incorrect sequence. Try again!' });
  }
});

module.exports = router;
