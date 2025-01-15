const express = require('express');
const router = express.Router();

// Define the correct order
const correctOrder = ["top-left", "top-right", "bottom-left", "bottom-right"];

// POST route to validate the sequence
router.post('/validate-sequence', (req, res) => {
    const { sequence } = req.body;

    // Check if the sequence matches the correct order
    if (JSON.stringify(sequence) === JSON.stringify(correctOrder)) {
        return res.json({
            message: 'Correct sequence!',
            redirectUrl: 'https://example.com/success', // Replace with your actual success URL
        });
    } else {
        return res.status(400).json({ message: 'Invalid sequence' });
    }
});

module.exports = router;
