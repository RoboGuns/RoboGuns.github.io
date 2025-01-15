const express = require('express');
const router = express.Router();

const correctOrder = ["top-left", "top-right", "bottom-left", "bottom-right"];

router.post('/validate-sequence', (req, res) => {
    const { sequence } = req.body;

    if (JSON.stringify(sequence) === JSON.stringify(correctOrder)) {
        return res.json({
            message: 'Correct sequence!',
            redirectUrl: 'https://example.com/success',
        });
    } else {
        return res.status(400).json({ message: 'Invalid sequence' });
    }
});

module.exports = router;
