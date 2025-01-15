const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const puzzleRoutes = require('./routes/puzzleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', puzzleRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
