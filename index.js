const express = require('express');
const app = express();

// Use the environment variable PORT (Render provides this) or fallback to 3000 for local development
const port = process.env.PORT || 3000;

// Serve static files (if you have any, like HTML, CSS, etc.)
app.use(express.static('public'));  // Make sure your static files are in the 'public' directory

// Example API route
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the Render backend!' });
});

// Root route (e.g., a homepage route)
app.get('/', (req, res) => {
  res.send('Welcome to RoboGuns Backend!');
});

// Start the server and listen on the dynamic port
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
