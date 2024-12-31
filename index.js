const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// Enable CORS for the front-end domain (replace 'https://roboguns.github.io' with your actual front-end domain)
app.use(cors({
  origin: 'https://roboguns.github.io',  // Replace with your actual front-end domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Serve static files (HTML, CSS, JS) from the "Hubish" directory
app.use(express.static('Hubish'));

// Parse incoming JSON requests
app.use(express.json());  // This is necessary for parsing POST requests with JSON bodies

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
  res.json({ sequence: correctSequence });
});

// API route to get a specific sequence (added the missing route)
app.get('/api/get-sequence', (req, res) => {
  res.json({ sequence: correctSequence });
});

// API route to validate the user's sequence
app.post('/api/validate-sequence', (req, res) => {
  const userSequence = req.body.sequence;
  if (JSON.stringify(userSequence) === JSON.stringify(correctSequence)) {
    req.session.solvedPuzzle = true;
    res.json({ success: true });
  } else {
    res.json({ success: false });
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

// ==================== Wildcard Route Fix ====================
// This is where the fix needs to go. If you're using a wildcard route, make sure it doesn't conflict with API routes.
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next(); // Allow API routes to pass through
  res.sendFile(path.join(__dirname, 'Hubish', 'SEARCHH.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
