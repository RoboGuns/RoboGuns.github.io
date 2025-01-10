const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// Access the secret from environment variables
const mySecretKey = process.env.MY_SECRET_KEY;

app.use(cors({
  origin: 'https://roboguns.github.io',  
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.static('Hubish'));

app.use(express.json());  

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

// Example of using the secret in the app
app.get('/api/secret', (req, res) => {
  res.json({ secret: mySecretKey }); // Just for demonstration purposes
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
