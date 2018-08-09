// unique id
const uuid = require('uuid')
// server.js

const express = require('express');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({
  server,
  path: "/websocket"
});

const createMessage = msg => ({
  type: "incomingMessage",
  data: {
    id: uuid(),
    username: msg.username,
    content: msg.message
  }
});

const createNotification = msg => ({
  type: "incomingNotification",
  content: msg.message,
});

wss.broadcast = (data, ws) => {
  wss.clients.forEach(client => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', data => {
      console.log("Message Received", data);
      const msg = JSON.parse(data);

      console.log('parsed', msg)

      switch (msg.type) {
        case "postMessage":
          const message = createMessage(msg);
          console.log('innnnfiltrated', message)

          wss.broadcast(JSON.stringify(message));
          break;
        case "postNotification":
          const notification = createNotification(msg)
          wss.broadcast(JSON.stringify(notification));
          break;
        default:
          throw new Error("Unknown event type " + msg.type);

      }

    }),

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => console.log('Client disconnected'));
});