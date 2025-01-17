const express = require('express');
const router = express.Router();

// In-memory state to track confirmation-required commands
const commandState = {};

// Define lore and fluff commands
const loreCommands = {
  'ACCESS FILE 001': "File 001 unlocked. Subject: Dr. S. Quinn. **Recovered Log:** 'Exposing Flesh to the Spore seems to accelerate the process.'",
  'ACCESS FILE 002': "File 002 unlocked. Experiment Lead: Subject Dr. S. Quinn. Status: **MIA. Last seen in foe condition.**",
  'ACCESS FILE 003': "Error: File 003 corrupted. Data irretrievable. To attempt recovery, use 'RECOVER' command followed by file number.",
  'RECOVER 003': "File 003 recovery cannot be initiated. please run the command again with proof of admin privileges.",
  'ACCESS FILE 004': "File 004 unlocked. Subject: Hive. **Excerpt:** 'Sustained exposure to the neural network destabilizes core personality fragments, leading to a uniform behavior among all subjects.'",
  HELP: "This console grants access to fragments of Project Hive's records. Use commands to retrieve available files or investigate system logs. Type 'HELP' to display this message.",
  'LS': "Available files: FILE 001, FILE 002, FILE 004. Corrupted files: FILE 003. Enter 'ACCESS FILE <number>' to view details.",
  ERRORLOGS: "System integrity compromised. 87% of project files corrupted. Partial recovery available: FILE 003. Cause: Project B-Hive Corruption.",
  'SYSTEM STATUS': "Hive Neural Interface: Offline. Network Nodes: 2 operational, 12 corrupted. Threat Level: Contained.",
  'LIST ACTIVE USERS': "Active connections: 2. User ID: B-Spore (you), User ID: UNKNOWN. Warning: Unauthorized user detec- *System relax*.",
  'SYSTEM REBOOT': "System reboot initiated. Warning: Temporary data loss may occur. Proceed with caution. (Type 'CONFIRM REBOOT' to continue.)",
  'CONFIRM REBOOT': "No reboot process initiated. Type 'SYSTEM REBOOT' to start.", 
  'WHOAMI': "User ID: USER. Access Level: Minimum. Last login: 3 minutes ago. Location: [REDACTED].",
  'UPTIME': "System uptime: 13 days, 7 hours, 42 minutes. Last reboot: [Currupted].",
  'PING HIVE CORE': "Pinging... Response from Hive Core receved. Status: Expanding. Cause: Node corruption.",
  'TRACE ROUTE': "Tracing route to external connections... Hop 1: Success. Hop 2: UNKNOWN NODE DETECTED. Terminating trace for security reasons.",
  'LOGOFF': "Logging off... Warning: Unfinished session data may be lost. Goodbye.",
  'DIAGNOSTICS': "System Check: 5 errors detected. Critical: Hive neural interface offline.",
  'WHAT IS HIVE': "Hive: An interconnected neural network designed to unify. Primary objective: Synergize human intelligence. Result: Classified. Status: Irreversible neural instability.",
  'ACCESS LOGS': "Recent access logs: [REDACTED]. Anomalies detected: User access from UNKNOWN DEVICE on [REDACTED DATE].",
  'REQUEST NODE STATUS': "Node 1: Operational. Node 2: Operational. Node 3: Corrupted. Node 4: Corrupted. Node 5: Missing.",
  'HISTORY': "Session command history: HELP, ACCESS FILE 001, LIST FILES, SYSTEM STATUS, ERRORLOGS.",
  'HIVE ANALYSIS': "Hive neural analysis: Fragments recovered: 2. Hive memory: 90% corrupted. Neural echoes detected: 14.",
  'SEND MESSAGE': "Message failed to send. Reason: No recipients available in the network.",
  'RECALL MEMORY': "Memory recall: ERROR. User identity unverified. Memory encryption intact.",
  'HIVE ECHO': "Echo response: 'We are one. You will join us.'",
  'CORRUPTION REPORT': "System corruption: 87%. Neural network fragmentation: Irrecoverable. Last stable state: 6 months ago.",
  'WEATHER': "Current weather: Irrelevant. No one is outside anymore.",
  'WHO WAS HERE': "Previous users: Dr. S. Quinn, Subject Delta, UNKNOWN ENTITY. Last login: Before the collapse.",
  'REPAIR SYSTEM': "Repair initiated... Progress: 2%. Error: Core files missing. Repair halted.",
  'sudo apt-get update': "Package update failed... ERROR: Repository unreachable. Network disruption detected.",
  'top': "System processes: 3 active processes. High resource usage detected: Process 'hive-core' consuming 80% CPU.",
  'cd': "The hive is everything. there is no need to navigate.",
  'rm': "Deleting files... Error: Insufficient permissions. File 'hive-core' cannot be deleted, it never will be.",
  'sudo': "sudo not needed, you are the hive.",
};

// Endpoint to handle terminal commands
router.get('/terminal', (req, res) => {
  const userId = req.query.userId || 'default'; // Mock user/session ID
  const command = req.query.command?.toUpperCase() || ''; // Get the command from query params

  // Check if the user has pending confirmation for 'CONFIRM REBOOT'
  if (command === 'CONFIRM REBOOT' && commandState[userId]?.pendingReboot) {
    delete commandState[userId]; // Clear pending state
    return res.json({ response: "Rebooting system... Error: Core files missing. Reboot failed." });
  }
  if (command === 'TIME') {
    const currentCETTime = new Date().toLocaleString("en-GB", { timeZone: "Europe/Berlin", hour12: false });
    return res.json({ response: `System time (CET): ${currentCETTime}` });
  }
  // Handle 'SYSTEM REBOOT' to set pending state
  if (command === 'SYSTEM REBOOT') {
    commandState[userId] = { pendingReboot: true };
    return res.json({ response: loreCommands['SYSTEM REBOOT'] });
  }
  if (command === 'LOGOFF') {
    return res.json({ response: loreCommands.LOGOFF, logoff: true });
  }
  // Fallback to regular commands
  const response = loreCommands[command] || "Unknown command. Type 'HELP' for a list of commands.";
  res.json({ response });
});

module.exports = router;