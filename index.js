const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS) from the "Hubish" directory
app.use(express.static('Hubish'));

// Serve the SEARCHH.html when the root URL is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Hubish', 'SEARCHH.html'));
});

// API route to handle the search
app.get('/api/search', (req, res) => {
  const query = req.query.q;  // Get the search term from the query parameter
  
  if (query.toLowerCase() === 'apple') {
    res.json({ result: 'ryuk' });
  } else {
    res.json({ result: 'No match found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
