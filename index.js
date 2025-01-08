const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;


app.use(cors({
  origin: 'https://roboguns.github.io',  
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.static('Hubish'));


app.use(express.json());  

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
const correctSequence = ['top-left', 'bottom-right', 'top-right', 'bottom-left'];

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

function protectHiddenPage(req, res, next) {
  if (req.session.solvedPuzzle) {
    next(); // Allow access
  } else {
    res.status(403).send('Access denied. Solve the puzzle to unlock this page.');
  }
}

app.get('/hidden', protectHiddenPage, (req, res) => {
  res.sendFile(path.join(__dirname, 'protected', 'hidden.html'));
});


app.get('*', (req, res, next) => {
  if (req.path === '/hidden.html') {
    res.status(403).send('Access denied.');
  } else {
    next(); // Allow other requests to continue
  }
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
