const express = require('express');
const router = express.Router();

// Correct answers
const correctAnswers = {
  q1: 'B',
  q2: 'B',
  q3: 'B',
  q4: 'B',
  q5: 'B',
};

// Quiz validation endpoint
router.post('/validate-quiz', (req, res) => {
  const userAnswers = req.body;
  let isCorrect = true;

  // Check each answer
  for (const question in correctAnswers) {
    if (userAnswers[question] !== correctAnswers[question]) {
      isCorrect = false;
      break;
    }
  }

  // Send response
  if (isCorrect) {
    res.json({ success: true, message: "Congratulations! You got all the answers correct!" });
  } else {
    res.json({ success: false, message: "Some answers are incorrect. Try again!" });
  }
});

// Export the router
module.exports = router;