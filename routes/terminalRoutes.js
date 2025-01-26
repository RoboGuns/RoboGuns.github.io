const express = require('express');
const router = express.Router();

// In-memory state to track confirmation-required commands
const commandState = {};

// Define lore and fluff commands
const loreCommands = {
  'ACCESS FILE 001': "File 001 unlocked. Subject: Dr. S. Quinn. **Recovered Log:** 'Exposing Flesh to the Spore seems to accelerate the process.'",
  'ACCESS FILE 002': "File 002 unlocked. Experiment Lead: Subject Dr. S. Quinn. Status: **MIA. Last seen in foe condition.**",
  'ACCESS FILE 003': "Error: File 003 corrupted. Data irretrievable. To attempt recovery, use 'RECOVER' command followed by file number.",
  'RECOVER 003': "File 003 recovery cannot be initiated. Please run the command again with proof of admin privileges.",
  'ADMIN RECOVER 003': "File 003 recovery initiated. File restored. 3 = WeShouldBeSharing",
  'TWTSASIT' : "id dont say blah blah blah, blah blah blah",
  'ACCESS FILE 004': "File 004 unlocked. Subject: Hive. **Excerpt:** 'Sustained exposure to the neural network destabilizes core personality fragments, leading to a uniform behavior among all subjects.'",
  HELP: "This console grants access to fragments of Project Hive's records. Use commands to retrieve available files or investigate system logs. Type 'HELP' to display this message.",
  'LS': "Available files: FILE 001, FILE 002, FILE 004. Corrupted files: FILE 003. Enter 'ACCESS FILE <number>' to view details.",
  ERRORLOGS: "System integrity compromised. 87% of project files corrupted. Partial recovery available: FILE 003. Cause: Project B-Hive Corruption.",
  'SYSTEM STATUS': "Hive Neural Interface: Offline. Network Nodes: 2 operational, 12 corrupted. Threat Level: Contained.",
  'LIST ACTIVE USERS': "Active connections: 2. User ID: B-Spore (you), User ID: UNKNOWN. Warning: Unauthorized user detec- *System relax*.",
  'SYSTEM REBOOT': "System reboot initiated. Warning: Temporary data loss may occur. Proceed with caution. (Type 'CONFIRM REBOOT' to continue.)",
  'CONFIRM REBOOT': "No reboot process initiated. Type 'SYSTEM REBOOT' to start.",
  'WHOAMI': (userId) => `User ID: ${userId}. Access Level: ${userId === 'admin' ? 'Admin' : 'User'}. Last login: 3 minutes ago. Location: [REDACTED].`,
  'UPTIME': "System uptime: 13 days, 7 hours, 42 minutes. Last reboot: [Corrupted].",
  'FUTURE': "https://roboguns.github.io/Hubish/Future.html",
  'PING HIVE CORE': "Pinging... Response from Hive Core received. Status: Expanding. Cause: Node corruption.",
  'TRACE ROUTE': "Tracing route to external connections... Hop 1: Success. Hop 2: UNKNOWN NODE DETECTED. Terminating trace for security reasons.",
  'LOGOFF': "Logging off... Warning: Unfinished session data may be lost. Goodbye.",
  'DIAGNOSTICS': "System Check: 5 errors detected. Critical: Hive neural interface offline.",
  'WHAT IS HIVE': "Hive: An interconnected neural network designed to unify. Primary objective: Synergize human intelligence. Result: Classified. Status: Irreversible neural instability.",
  'ACCESS LOGS': "Recent access logs: [REDACTED]. Anomalies detected: User access from UNKNOWN DEVICE on [REDACTED DATE].",
  'REQUEST NODE STATUS': "Node 1: Operational. Node 2: Operational. Node 3: Corrupted. Node 4: Corrupted. Node 5: Missing.",
  'HIVE ANALYSIS': "Hive neural analysis: Fragments recovered: 2. Hive memory: 90% corrupted. Neural echoes detected: 14.",
  'SEND MESSAGE': "Message failed to send. Reason: No recipients available in the network.",
  'RECALL MEMORY': "Memory recall: ERROR. User identity unverified. Memory encryption intact.",
  'HIVE ECHO': "Echo response: 'We are one. You will join us.'",
  'CORRUPTION REPORT': "System corruption: 87%. Neural network fragmentation: Irrecoverable. Last stable state: 6 months ago.",
  'WEATHER': "Current weather: Irrelevant. No one is outside anymore.",
  'WHO WAS HERE': "Previous users: Dr. S. Quinn, Subject Delta, UNKNOWN ENTITY. Last login: Before the HIVE.",
  'REPAIR SYSTEM': "Repair initiated... Progress: 2%. Error: Core files missing. Repair halted.",
  'TOP': "System processes: 3 active processes. High resource usage detected: Process 'hive-core' consuming 80% CPU.",
  'CD': "The hive is everything. There is no need to navigate.",
  'RM -RF': "Deleting files... Error: Insufficient permissions. File 'hive-core' cannot be deleted, it never will be.",
  'SUDO': "sudo not needed, you are the hive.",
};

// Admin commands that require special privileges
const adminCommands = ['ADMIN RECOVER 003', 'ADMIN DECRYPT 003'];

// Function to check if the user is an admin
function isAdmin(userId) {
  return userId === 'admin';
}

// Endpoint to handle terminal commands
router.post('/terminal', (req, res) => {
  const userId = req.session.userId || 'default';
  const command = req.body.command?.toUpperCase() || '';
  
  // Check if the user has pending confirmation for 'CONFIRM REBOOT'
  if (command === 'CONFIRM REBOOT' && commandState[userId]?.pendingReboot) {
    delete commandState[userId]; // Clear pending state
    return res.json({ response: "Rebooting system... Error: Core files missing. Reboot failed." });
  }

  // Handle 'SYSTEM REBOOT' to set pending state
  if (command === 'SYSTEM REBOOT') {
    commandState[userId] = { pendingReboot: true };
    return res.json({ response: loreCommands['SYSTEM REBOOT'] });
  }

  // Handle 'TWTSASIT' command to redirect to a new page
  if (command === 'TWTSASIT') {
    return res.json({ 
      response: "Redirecting...", 
      redirect: "https://roboguns.github.io/Hubish/TheEnd....html" 
      });
  }

  // Admin check
  if (adminCommands.includes(command) && !isAdmin(userId)) {
    return res.status(403).json({ response: "Admin privileges required." });
  }

  // Handle 'REPAIR SYSTEM' command
  if (command === 'REPAIR SYSTEM') {
    let progress = 0;
    const loadingBarLength = 20; // Length of the loading bar
    const loadingInterval = setInterval(() => {
      progress += 1; // Increment progress
      const filledBar = Math.floor((progress / 100) * loadingBarLength);
      const emptyBar = loadingBarLength - filledBar;

      // Construct loading bar string
      const loadingBar = `[${'='.repeat(filledBar)}${' '.repeat(emptyBar)}] ${progress}%`;

      // Stop the loading bar at 2% and send an error message
      if (progress === 2) {
        clearInterval(loadingInterval);
        res.json({ response: `Repairing System: ${loadingBar}\nError: Repair halted. Core files missing.` });
      } else {
        // Continue updating the client
        res.json({ response: `Repairing System: ${loadingBar}` });
      }
    }, 100); // Adjust speed as needed
    return;
  }

  // Handle 'SCAN' command
  if (command === 'SCAN') {
    let progress = 0;
    const loadingBarLength = 20; // Length of the loading bar
    const loadingInterval = setInterval(() => {
      progress += 5; // Increment progress
      const filledBar = Math.floor((progress / 100) * loadingBarLength);
      const emptyBar = loadingBarLength - filledBar;

      // Construct loading bar string
      const loadingBar = `[${'='.repeat(filledBar)}${' '.repeat(emptyBar)}] ${progress}%`;

      // Stop the loading bar at 100% and send a completion message
      if (progress >= 100) {
        clearInterval(loadingInterval);
        res.json({ response: `Scanning System: ${loadingBar}\nScan Complete: No fatally corrupted files found.` });
      } else {
        // Continue updating the client
        res.json({ response: `Scanning System: ${loadingBar}` });
      }
    }, 100); // Adjust speed as needed
    return;
  }

  // Handle other commands
  if (loreCommands[command]) {
    const response = typeof loreCommands[command] === 'function'
      ? loreCommands[command](userId) // ✅ Pass userId
      : loreCommands[command];
    return res.json({ response });
  }

  // Default response for unknown commands
  return res.status(400).json({ response: "Unknown command. Type 'HELP' for available commands." });
});

module.exports = router;