const express = require('express');
const app = express();

// Use environment variable for the port, or fallback to 3000
const port = process.env.PORT || 3000;

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the Render backend!' });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
