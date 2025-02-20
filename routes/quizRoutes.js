const express = require('express');
const router = express.Router();

// Correct answers
const correctAnswers = {
  q1: 'C',
  q2: 'A',
  q3: 'C',
  q4: 'C',
  q5: 'C',
  q6: 'D',
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
    res.json({ success: true, message: "5 = AdaptOvercome" });
  } else {
    res.json({ success: false, message: "Some answers are incorrect. Try again!" });
  }
});

// Export the router
module.exports = router;