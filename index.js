const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const puzzleRoutes = require('./routes/puzzleRoutes'); // Import your puzzleRoutes
const terminalRoutes = require('./routes/terminalRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const roleRoutes = require('./routes/roleRoutes');
const webRoutes = require('./routes/webRoutes');
const app = express();
const port = process.env.PORT || 3000;

// Access the secret from environment variables
const mySecretKey = process.env.MY_SECRET_KEY;

app.use(cors({
  origin: 'https://roboguns.github.io',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.static('Hubish'));  // Serving static files

app.use(express.json());  // Middleware to parse JSON

// ==================== API Routes ====================

// Mount the puzzle-related API route before the wildcard
app.use('/api', puzzleRoutes);  // Make sure puzzleRoutes is handling /api/validate-sequence
app.use('/api', terminalRoutes);
app.use('/api', passwordRoutes);  
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
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Hubish', 'SEARCHH.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
