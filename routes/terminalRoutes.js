const express = require('express');
const router = express.Router();

// In-memory state to track confirmation-required commands
const commandState = {};

// Define lore and fluff commands
const loreCommands = {
  'ACCESS FILE 001': "File 001 unlocked. Subject: Dr. A. Quinn. **Recovered Log:** 'Hive-mind exposure creates neural fusion, eliminating individuality.'",
  'ACCESS FILE 002': "File 002 unlocked. Experiment Lead: Subject Delta. Status: **MIA. Last seen in lab post Hive collapse.**",
  'ACCESS FILE 003': "Error: File 003 corrupted. Data irretrievable. Initiating system integrity check...",
  'ACCESS FILE 004': "File 004 unlocked. Subject: Hive Interface Protocols. **Excerpt:** 'Sustained exposure to the neural interface destabilizes core personality fragments, leading to... (data missing).'",
  HELP: "This console grants access to fragments of Project Hive's records. Use commands to retrieve available files or investigate system logs. Example commands: 'ACCESS FILE 001', 'ERRORLOGS'. Type 'LIST FILES' to see all retrievable data.",
  'LS': "Available files: FILE 001, FILE 002, FILE 004. Corrupted files: FILE 003. Enter 'ACCESS FILE <number>' to view details.",
  ERRORLOGS: "System integrity compromised. 87% of project files corrupted. Partial recovery available: FILE 001, FILE 002. Cause: Project B-Hive Corruption.",
  'SYSTEM STATUS': "Hive Neural Interface: Offline. Network Nodes: 2 operational, 12 corrupted. Threat Level: Contained.",
  'LIST ACTIVE USERS': "Active connections: 2. User ID: B-Spore (you), User ID: UNKNOWN. Warning: Unauthorized user detec- *System relax*.",
  'SYSTEM REBOOT': "System reboot initiated. Warning: Temporary data loss may occur. Proceed with caution. (Type 'CONFIRM REBOOT' to continue.)",
  'CONFIRM REBOOT': "No reboot process initiated. Type 'SYSTEM REBOOT' to start.", 
  'WHOAMI': "User ID: USER. Access Level: Minimum. Last login: 3 minutes ago. Location: [REDACTED].",
  'UPTIME': "System uptime: 13 days, 7 hours, 42 minutes. Last reboot: [Currupted].",
  'PING HIVE CORE': "Pinging... Response from Hive Core receved. Status: Expanding. Cause: Node corruption.",
  'TRACE ROUTE': "Tracing route to external connections... Hop 1: Success. Hop 2: UNKNOWN NODE DETECTED. Terminating trace for security reasons.",
  'LOGOFF': "Logging off... Warning: Unfinished session data may be lost. Goodbye.",
  'DIAGNOSTICS': "System Check: 5 errors detected. Critical: Hive neural interface offline. Suggested action: RECONNECT NODES.",
  'WHAT IS HIVE': "Hive: An interconnected neural network designed to unify. Primary objective: Synergize human intelligence. Result: Classified. Status: Irreversible neural instability.",
  'ACCESS LOGS': "Recent access logs: [REDACTED]. Anomalies detected: User access from UNKNOWN DEVICE on [REDACTED DATE].",
  'REQUEST NODE STATUS': "Node 1: Operational. Node 2: Operational. Node 3: Corrupted. Node 4: Corrupted. Node 5: Missing.",
  'HISTORY': "Session command history: HELP, ACCESS FILE 001, LIST FILES, SYSTEM STATUS, ERRORLOGS.",
  'HIVE ANALYSIS': "Hive neural analysis: Fragments recovered: 2. Hive memory: 90% corrupted. Neural echoes detected: 14.",
  'SEND MESSAGE': "Message failed to send. Reason: No recipients available in the network.",
  'RECALL MEMORY': "Memory recall: ERROR. User identity unverified. Memory en cryption intact.",
  'HIVE ECHO': "Echo response: 'We are one. You will join.'",
  'PURGE FILES': "Purge initiated... Error: Insufficient privileges. Admin override required.",
  'CORRUPTION REPORT': "System corruption: 87%. Neural network fragmentation: Irrecoverable. Last stable state: 6 months ago.",
  'WEATHER': "Current weather: Irrelevant. No one is outside anymore.",
  'WHO WAS HERE': "Previous users: Dr. A. Quinn, Subject Delta, UNKNOWN ENTITY. Last login: Before the collapse.",
  'REPAIR SYSTEM': function() {
    const loadingBarLength = 20; // Length of the loading bar
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1; // Increment progress
      const filledBar = Math.floor((progress / 100) * loadingBarLength);
      const emptyBar = loadingBarLength - filledBar;

      console.clear();
      console.log(`Repairing System: [${'='.repeat(filledBar)}${' '.repeat(emptyBar)}] ${progress}%`);

      if (progress === 2) {
        clearInterval(interval); // Stop the interval at 2%
        console.log("Error: Repair halted. Core files missing. Progress: 2%.");
      }
    }, 100); // Adjust speed of the loading bar
  },
  'SCAN': function() {
    const loadingBarLength = 20; // Length of the loading bar
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1; // Increment progress
      const filledBar = Math.floor((progress / 100) * loadingBarLength);
      const emptyBar = loadingBarLength - filledBar;

      console.clear();
      console.log(`Repairing System: [${'='.repeat(filledBar)}${' '.repeat(emptyBar)}] ${progress}%`);

      if (progress === 100) {
        clearInterval(interval); // Stop the interval at 2%
        console.log("System found no fatal errors. Scanning complete.");
      }
    }, 100); // Adjust speed of the loading bar
  },
  'sudo apt-get update': "Package update failed... ERROR: Repository unreachable. Network disruption detected.",
  'top': "System processes: 3 active processes. High resource usage detected: Process 'hive-core' consuming 80% CPU.",
};

// Endpoint to handle terminal commands
// Endpoint to handle terminal commands
router.get('/terminal', (req, res) => {
  const userId = req.query.userId || 'default'; // Mock user/session ID
  const command = req.query.command?.toUpperCase() || ''; // Get the command from query params

  if (command === 'REPAIR SYSTEM') {
    return res.json({ response: "Repairing system... Simulating progress. Await further updates on the terminal." });
  }

  if (command === 'SCAN') {
    return res.json({ response: "Scanning system... Simulating progress. Await further updates on the terminal." });
  }

  // Handle other commands
  if (loreCommands[command]) {
    const response = typeof loreCommands[command] === 'function'
      ? loreCommands[command]()
      : loreCommands[command];
    return res.json({ response });
  }

  // Default response for unknown commands
  return res.status(400).json({ response: "Unknown command. Type 'HELP' for available commands." });
});

module.exports = router;
