const express = require('express');
const router = express.Router();

// Define lore commands
const loreCommands = {
  'ACCESS FILE 001': "File 001 unlocked. Subject: Dr. A. Quinn. **Recovered Log:** 'Hive-mind exposure creates neural fusion, eliminating individuality.'",
  'ACCESS FILE 002': "File 002 unlocked. Experiment Lead: Subject Delta. Status: **MIA. Last seen in lab post Hive collapse.**",
  HELP: "Available commands: 'ACCESS FILE 001', 'ACCESS FILE 002', 'LIST FILES'.",
  'LIST FILES': "Available files: FILE 001, FILE 002. Enter 'ACCESS FILE <number>' to view details.",
  EXIT: "Session terminated. Goodbye.",
};

// Endpoint to handle terminal commands
router.get('/terminal', (req, res) => {
  const command = req.query.command?.toUpperCase() || ''; // Get the command from query params
  const response = loreCommands[command] || "Unknown command. Type 'HELP' for a list of commands.";
  res.json({ response });
});

module.exports = router;
