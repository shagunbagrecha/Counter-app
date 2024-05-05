import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import Counter from './components/Counter';
import Sphere from './components/Sphere';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [radius, setRadius] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket('ws://localhost:3001');
    setSocket(ws);

    // Event listener for incoming WebSocket messages
    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
    };

    // Cleanup function to close WebSocket connection
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    // Call JSON-RPC method to set the sphere radius
    fetch('http://localhost:3001/rpc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'set_radius',
        params: [0.5], // Set radius to 5 (example value)
        id: 1
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Set radius response:', data);
      })
      .catch(error => {
        console.error('Error setting radius:', error);
      });

    // Call JSON-RPC method to get the sphere radius
    fetch('http://localhost:3001/rpc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'get_radius',
        id: 2
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Get radius response:', data);
        // Update the state with the retrieved radius
        setRadius(data.result);
      })
      .catch(error => {
        console.error('Error getting radius:', error);
      });
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/sphere" element={<Sphere />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
