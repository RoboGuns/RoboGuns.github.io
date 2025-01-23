const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser'); // Add this
const path = require('path');
const puzzleRoutes = require('./routes/puzzleRoutes'); // Import your puzzleRoutes
const terminalRoutes = require('./routes/terminalRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const roleRoutes = require('./routes/roleRoutes');
const sequenceRoutes = require('./routes/sequenceRoutes');
const app = express();
const port = process.env.PORT || 3000;

// Access the secret from environment variables
const mySecretKey = process.env.MY_SECRET_KEY;

// Middleware setup
app.use(cors({
  origin: 'https://roboguns.github.io',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true // Allow cookies to be sent
}));

app.set('trust proxy', 1); // Trust first proxy

app.use(cookieParser()); // Initialize cookie-parser
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret', // Always use environment variables
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // Must be true for SameSite=None
    httpOnly: true,
    sameSite: 'none', // Required for cross-origin cookies
    maxAge: 3600000 // 1 hour
  },
  proxy: true // Add this line for reverse proxy setups
}));

app.use(express.static('Hubish'));  // Serving static files
app.use(express.json());  // Middleware to parse JSON

// ==================== API Routes ====================

// Mount the puzzle-related API route before the wildcard
app.use('/api', puzzleRoutes);  // Make sure puzzleRoutes is handling /api/validate-sequence
app.use('/api', terminalRoutes);
app.use('/api', passwordRoutes); 
app.use('/api', sequenceRoutes); 
app.use('/api', roleRoutes); 
// Example route for search API
app.get('/api/search', (req, res) => {
  const query = req.query.q; // Get the search term from the query parameter
  if (query.toLowerCase() === 'apple') {
    res.json({ result: 'ryuk' });
  } else {
    res.json({ result: 'No match found' });
  }
});

// Example route to access the secret (for demonstration)
app.get('/api/secret', (req, res) => {
  res.json({ secret: mySecretKey });
});

// ==================== Wildcard Route ====================
// This route will only handle requests that don't match any API route
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
