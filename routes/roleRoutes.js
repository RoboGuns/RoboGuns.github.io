const express = require('express');
const router = express.Router();

// Define a set of keywords and their associated responses
const keywordResponses = {
  "HELLO": "Greetings, user! How can I assist you today?",
  "ACCESS FILE 001": "File 001 unlocked. Subject: Dr. S. Quinn. **Recovered Log:** 'Exposing Flesh to the Spore seems to accelerate the process.'",
  "ACCESS FILE 002": "File 002 unlocked. Experiment Lead: Subject Dr. S. Quinn. Status: **MIA. Last seen in foe condition.**",
  "SYSTEM STATUS": "Hive Neural Interface: Offline. Network Nodes: 2 operational, 12 corrupted. Threat Level: Contained.",
  "HELP": "This system responds to specific commands. Available commands: HELLO, ACCESS FILE 001, SYSTEM STATUS. Type your command to proceed.",
};

// Endpoint to handle keyword responses
router.post('/keyword', (req, res) => {
  const { keyword } = req.body; // Get the keyword from the request body
  const response = keywordResponses[keyword?.toUpperCase()] || "Unknown keyword. Type 'HELP' for available commands.";
  res.json({ response });
});

// Express app setup
const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use('/api', router); // Use the router for API routes

