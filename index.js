const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Serve static files (HTML, CSS, JS) from the "Hubish" directory
app.use(express.static('Hubish'));

// Serve the SEARCHH.html when the root URL is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Hubish', 'SEARCHH.html'));
});

// API route to handle the search
app.get('/api/search', (req, res) => {
  const query = req.query.q; // Get the search term from the query parameter
  if (query.toLowerCase() === 'apple') {
    res.json({ result: 'ryuk' });
  } else {
    res.json({ result: 'No match found' });
  }
});

// ==================== Puzzle Functionality ====================

// Session setup for tracking puzzle progress
app.use(
  session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure: true in production with HTTPS
  })
);

// Define the correct sequence for the puzzle
const correctSequence = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

// API route to get the puzzle sequence
app.get('/api/puzzle-sequence', (req, res) => {
  const puzzleSequence = ['top-left', 'bottom-right', 'top-right', 'bottom-left'];
  res.json({ sequence: puzzleSequence });
});


// API route to validate the user's sequence
app.post('/api/validate-puzzle', (req, res) => {
  const { userSequence } = req.body; // Expected user sequence from the client.
  const correctSequence = ['top-left', 'bottom-right', 'top-right', 'bottom-left'];

  if (JSON.stringify(userSequence) === JSON.stringify(correctSequence)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
  // Check if the sequence matches
  const isCorrect = JSON.stringify(userSequence) === JSON.stringify(correctSequence);
  if (isCorrect) {
    req.session.solvedPuzzle = true; // Mark the puzzle as solved in the session
    return res.json({ success: true, redirectUrl: '/hidden.html' });
  } else {
    return res.json({ success: false, message: 'Incorrect sequence. Try again.' });
  }
});

// Middleware to protect the hidden page
function protectHiddenPage(req, res, next) {
  if (req.session.solvedPuzzle) {
    next();
  } else {
    res.status(403).send('Access denied. Solve the puzzle to unlock this page.');
  }
}

// Serve the hidden page
app.get('/hidden.html', protectHiddenPage, (req, res) => {
  res.sendFile(path.join(__dirname, 'Hubish', 'hidden.html'));
});

// ==================== End of Puzzle Functionality ====================

// Start the server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
