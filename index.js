const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS) from the "public" directory
app.use(express.static('public'));

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
