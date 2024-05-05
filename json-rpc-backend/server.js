const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 3001;

let sphereRadius = 1;
let counter = 0;

// Enable CORS middleware to allow requests from frontend on port 3000
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Use bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define JSON-RPC methods
const methods = {
  // Method to set the radius of the sphere
  set_radius: (params, response) => {
    const radius = params[0];
    if (typeof radius !== 'number' || radius <= 0) {
      response({ code: -32602, message: 'Invalid params' });
    } else {
      sphereRadius = radius;
      response(null, 'Success');
    }
  },
  // Method to get the current radius of the sphere
  get_radius: (params, response) => {
    response(null, sphereRadius);
  },
  // Method to increment the counter
  increment: (params, response) => {
    counter++;
    response(null, 'Incremented');
  },
  // Method to decrement the counter
  decrement: (params, response) => {
    counter--;
    response(null, 'Decremented');
  },
  // Method to get the current value of the counter
  getCount: (params, response) => {
    response(null, counter);
  }
};

// JSON-RPC endpoint
app.post('/rpc', (req, res) => {
  const { jsonrpc, method, params, id } = req.body;
  if (jsonrpc !== '2.0' || !method || typeof methods[method] !== 'function') {
    return res.status(400).json({ error: { code: -32600, message: 'Invalid Request' } });
  }
  methods[method](params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: { code: -32000, message: 'Server Error' } });
    }
    res.json({ jsonrpc: '2.0', result, id });
  });
});

// Start the HTTP server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Initialize WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', ws => {
  console.log('WebSocket client connected');
  
  // Handle incoming messages
  ws.on('message', message => {
    console.log(`Received message: ${message}`);
    // Example: echo the message back to the client
    ws.send(`Echo: ${message}`);
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});
